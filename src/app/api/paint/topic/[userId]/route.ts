import { NextResponse, type NextRequest } from "next/server";

import { and, eq, desc } from "drizzle-orm";

import { db } from "@/db";
import { usersTable, subjectsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

// GET /api/paint/topic/:userId
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

    // Get the topic
    const subject = await db.query.subjectsTable.findFirst({
      where: and(eq(subjectsTable.userId, params.userId)),
      orderBy: [desc(subjectsTable.createdAt)],
    });
    const user = await db.query.usersTable.findFirst({
      where: and(eq(usersTable.displayId, params.userId)),
    });

    if (!user) {
      return NextResponse.json(
        { error: "Couldn't Get Any Topics: No User" },
        { status: 404 },
      );
    }

    const createdTime = subject?.createdAt.setHours(0, 0, 0, 0); // default 00:00
    if (!createdTime) {
      return NextResponse.json(
        { error: "Couldn't Get Any Topics: Subject Created Time" },
        { status: 404 },
      );
    }

    const targetDay = Date.now() - createdTime;
    const dayIndex = Math.floor(targetDay / (24 * 60 * 60 * 1000));

    if (dayIndex > user?.lastingDays) {
      return NextResponse.json(
        { error: "Couldn't Get Any Topics: No Topics Now" },
        { status: 404 },
      );
    }

    const topic = subject?.topic ?? "[]";
    const topicArray = JSON.parse(topic);
    if (!topicArray) {
      return NextResponse.json(
        { error: "Couldn't Get Any Topics: Topic Lists" },
        { status: 404 },
      );
    }

    const targetElement: string = topicArray[dayIndex];
    if (!targetElement) {
      return NextResponse.json(
        { error: "Couldn't Get Any Topics: Target Element" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        topic: targetElement,
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
