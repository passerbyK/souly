import { NextResponse, type NextRequest } from "next/server";

import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { likesTable } from "@/db/schema";

const likePostRequestSchema = z.object({
  postId: z.string(),
  userId: z.string(),
});

type LikePostRequest = z.infer<typeof likePostRequestSchema>;

export async function POST(request: NextRequest) {
  // console.log("hi, finally like");
  const data = await request.json();

  try {
    likePostRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { postId, userId } = data as LikePostRequest;

  try {
    await db
      .insert(likesTable)
      .values({
        postId,
        userId,
      })
      .onConflictDoNothing()
      .execute();
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return new NextResponse("OK", { status: 200 });
}

export async function DELETE(request: NextRequest) {
  // console.log("hi, finally unlike");
  const data = await request.json();

  try {
    likePostRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { postId, userId } = data as LikePostRequest;

  try {
    await db
      .delete(likesTable)
      .where(and(eq(likesTable.postId, postId), eq(likesTable.userId, userId)))
      .execute();
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return new NextResponse("OK", { status: 200 });
}
