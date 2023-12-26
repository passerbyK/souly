import { NextResponse, type NextRequest } from "next/server";

import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { postsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import type { Post } from "@/lib/types/db";
import { postSchema } from "@/validators/post";

// POST /api/paint/:userId
export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      userId: string;
      topic: string;
      description: string;
      image: string;
    };
  },
) {
  try {
    // Get user from session
    const session = await auth();
    if (!session || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the request body
    const reqBody = await req.json();
    let validatedReqBody: Pick<
      Post,
      "userId" | "topic" | "description" | "image"
    >;
    try {
      validatedReqBody = postSchema.parse(reqBody);
    } catch (error) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    // Post message
    await db
      .insert(postsTable)
      .values({
        userId: params.userId,
        topic: validatedReqBody.topic,
        description: validatedReqBody.description,
        image: validatedReqBody.image,
      })
      .execute();

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// GET /api/paint/:userId
export async function GET(
    _: NextRequest,
    {
      params,
    }: {
      params: {
        userId: string;
      };
    },
  ) {
    try {
      // Get user from session
      const session = await auth();
      if (!session || !session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      // Get the post, if any
      const post = await db.query.postsTable.findFirst({
        where: and(eq(postsTable.userId, params.userId)),
      });

      if (!post) {
        return NextResponse.json(
          {
            posted: false
          },
          { status: 200 },
        );
      }

      if (Date.now() - post?.createdAt.getTime() > 24 * 60 * 60 * 1000) {
        return NextResponse.json(
          {
            posted: false
          },
          { status: 200 },
        );
      }
  
      return NextResponse.json(
        {
          posted: true
        },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.json(
        {
          error: "Internal Server Error",
        },
        {
          status: 500,
        },
      );
    }
  }