import { redirect } from "next/navigation";

import { eq, desc, sql } from "drizzle-orm";

import { db } from "@/db";
import { postsTable, likesTable, usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import Diary from "./_compoments/Diary";

async function PersonalPage() {
  const session = await auth();
  if (!session) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const id = session.user?.id;

  const [user] = await db
    .select({
      name: usersTable.username,
    })
    .from(usersTable)
    .where(eq(usersTable.displayId, id ?? " "));

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
    .where(eq(postsTable.userId, id ?? " "))
    .execute();

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="mb-2 flex justify-center rounded-2xl bg-description/40 p-2 px-4 md:text-2xl">
          Hi {user.name} !
        </div>
      </div>
      <hr />
      {posts.length === 0 ? (
        <div className="flex w-full items-center justify-center">
          <p className="pt-6 text-center text-2xl font-semibold text-bdr_3">
            hasn't painted yet, go paint one!
          </p>
        </div>
      ) : (
        <></>
      )}
      <div className="flex justify-center md:justify-start md:w-full flex-wrap gap-4 ">

        {posts.map((post) => (
          <Diary
            key={post.id}
            id={post.displayId}
            createdAt={new Date(post.createdAt)}
            topic={post.topic}
            image={post.image}
            likes={post.likes}
          />
        ))}
      </div>
    </>
  );
}

export default PersonalPage;
