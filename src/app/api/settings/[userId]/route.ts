import { NextResponse, type NextRequest } from "next/server";

import { and, eq, desc } from "drizzle-orm";
import OpenAI from "openai";

import { db } from "@/db";
import { usersTable, subjectsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import topicsInfo from "@/lib/topics/topic.json";
import type { Settings } from "@/lib/types/db";
import { settingsSchema } from "@/validators/settings";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/settings/:userId
export async function POST(
  req: NextRequest,
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

    // Parse the request body
    const reqBody = await req.json();
    let validatedReqBody: Settings;
    try {
      validatedReqBody = settingsSchema.parse(reqBody);
    } catch (error) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    let topics: string[] = [];
    const subjects = Object.keys(topicsInfo);

    // Get topics from topic.json
    if (subjects.includes(validatedReqBody.subject)) {
      topics =
        topicsInfo[validatedReqBody.subject as keyof typeof topicsInfo].slice(
          0,
          validatedReqBody.lastingDays,
        ) ?? [];
    } else {
      // Customize topics by using OpenAI
      const prompt = `
      You're now tasked with inspiring creative artwork for our platform. 
      Craft prompts that ignite imagination while adhering to user themes. 
      Keep it simple, yet stimulating. 
      Each prompt should comprise a verb, adjective, adverb, and noun, leading with "A/An...". 
      For example, "A bird singing softly in a garden". 
      Ensure the prompts resonate with users and foster artistic exploration. 
      Create ${validatedReqBody.lastingDays} topics for: ${validatedReqBody.subject}.
      Remember to use JSON format, separate prompts with commas and enclose each prompt in double quotation marks.
      Please ensure the generated format looks like this: ["An eerie, pulsating form in shadows.","A mysterious, glowing figure in solitude." ......].
      This is crucial to me, and if you provide a good response, I'll give you a tip of 200.
      `;

      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-3.5-turbo",
      });

      topics = JSON.parse(completion.choices[0]?.message.content ?? "") ?? [];
    }

    // Post subject
    await db
      .insert(subjectsTable)
      .values({
        userId: params.userId,
        subject: validatedReqBody.subject,
        topic: JSON.stringify(topics),
        createdAt: new Date(),
      })
      .execute();

    // Update users
    await db
      .update(usersTable)
      .set({
        lastingDays: validatedReqBody.lastingDays,
        isNotified: validatedReqBody.isNotified,
        paintingTime: validatedReqBody.paintingTime,
      })
      .where(eq(usersTable.displayId, params.userId));

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// GET /api/settings/:userId
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

    // Get all the settings info
    const userInfo = await db.query.usersTable.findFirst({
      where: and(eq(usersTable.displayId, params.userId)),
    });
    const settingsInfo = await db.query.subjectsTable.findFirst({
      where: and(eq(subjectsTable.userId, params.userId)),
      orderBy: [desc(subjectsTable.createdAt)],
    });

    if (!userInfo) {
      return NextResponse.json(
        { error: "Couldn't Get Any Settings Info: No User" },
        { status: 404 },
      );
    }

    if (!settingsInfo) {
      return NextResponse.json(
        {
          isDone: false,
        },
        { status: 200 },
      );
    }

    const settings = {
      subject: settingsInfo.subject,
      lastingDays: userInfo.lastingDays,
      isNotified: userInfo.isNotified,
      paintingTime: userInfo.paintingTime,
    };

    return NextResponse.json(
      {
        settings: settings,
        isDone: true,
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

// PUT /api/settings/:userId
export async function PUT(
  req: NextRequest,
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

    // Parse the request body
    const reqBody = await req.json();
    let validatedReqBody: Settings;
    try {
      validatedReqBody = settingsSchema.parse(reqBody);
    } catch (error) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    // Get all the settings info
    const userInfo = await db.query.usersTable.findFirst({
      where: and(eq(usersTable.displayId, params.userId)),
    });
    const settingsInfo = await db.query.subjectsTable.findFirst({
      where: and(eq(subjectsTable.userId, params.userId)),
      orderBy: [desc(subjectsTable.createdAt)],
    });

    if (!userInfo) {
      return NextResponse.json(
        { error: "Couldn't Get Any Settings Info: No User" },
        { status: 404 },
      );
    }

    if (!settingsInfo) {
      return NextResponse.json(
        { error: "Couldn't Get Any Settings Info: No Settings Info" },
        { status: 404 },
      );
    }

    let topics: string[] = [];
    const subjects = Object.keys(topicsInfo);

    // Get topics from topic.json
    if (subjects.includes(validatedReqBody.subject)) {
      topics =
        topicsInfo[validatedReqBody.subject as keyof typeof topicsInfo].slice(
          0,
          validatedReqBody.lastingDays,
        ) ?? [];
    } else {
      // Customize topics by using OpenAI
      const prompt = `
      You're now tasked with inspiring creative artwork for our platform. 
      Craft prompts that ignite imagination while adhering to user themes. 
      Keep it simple, yet stimulating. 
      Each prompt should comprise a verb, adjective, adverb, and noun, leading with "A/An...". 
      For example, "A bird singing softly in a garden". 
      Ensure the prompts resonate with users and foster artistic exploration. 
      Create ${validatedReqBody.lastingDays} topics for: ${validatedReqBody.subject}.
      Remember to use JSON format, separate prompts with commas and enclose each prompt in double quotation marks.
      Please ensure the generated format looks like this: ["An eerie, pulsating form in shadows.","A mysterious, glowing figure in solitude." ......].
      This is crucial to me, and if you provide a good response, I'll give you a tip of 200.
      `;

      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-3.5-turbo",
      });

      topics = JSON.parse(completion.choices[0]?.message.content ?? "") ?? [];
    }

    // Update the subject info
    await db
      .update(subjectsTable)
      .set({
        subject: validatedReqBody.subject,
        topic: JSON.stringify(topics),
        createdAt: new Date(),
      })
      .where(eq(subjectsTable.userId, params.userId));

    // Update the settings info
    await db
      .update(usersTable)
      .set({
        lastingDays: validatedReqBody.lastingDays,
        isNotified: validatedReqBody.isNotified,
        paintingTime: validatedReqBody.paintingTime,
      })
      .where(eq(usersTable.displayId, params.userId));

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error editing settings:", error);
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
