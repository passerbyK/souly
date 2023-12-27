import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import Diary from "./_compoments/Diary";
import { db } from "@/db";
import { eq, desc, sql } from "drizzle-orm";
import { postsTable, likesTable } from "@/db/schema";

async function PersonalPage() {
  const session = await auth();
  if (!session) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const id = session.user?.id;

  const likesSubquery = db.$with("likes_count").as(
    db
      .select({
        postId: likesTable.postId,
        likes: sql<number | null>`count(*)`.mapWith(Number).as("likes"),
      })
      .from(likesTable)
      .groupBy(likesTable.postId),
  );

  const posts = await db
    .with(likesSubquery)
    .select({
      id: postsTable.id,
      displayId: postsTable.displayId,
      topic: postsTable.topic,
      image: postsTable.image,
      createdAt: postsTable.createdAt,
      likes: likesSubquery.likes,
    })
    .from(postsTable)
    .orderBy(desc(postsTable.createdAt))
    .leftJoin(likesSubquery, eq(postsTable.displayId, likesSubquery.postId))
    .where(eq(postsTable.userId, id??" "))
    .execute();

  return (
    <>
      {posts.map((post) => (
          <Diary
            key={post.id}
            id={post.displayId}
            createdAt={new Date(post.createdAt)}
            topic={post.topic}
            image="/logo.png"
            likes={post.likes}
          />
        ))}
    </>
  );
}

export default PersonalPage;
