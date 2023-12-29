import { eq, desc } from "drizzle-orm";

import { db } from "@/db";
import { postsTable, likesTable, usersTable } from "@/db/schema";

import DiaryBig from "./_components/DiaryBig";

type PostPageProps = {
  params: {
    diary: string;
  };
};

async function PersonalPage({ params: { diary } }: PostPageProps) {
  const likes = await db
    .select({
      name: usersTable.username ?? "user",
    })
    .from(likesTable)
    .leftJoin(usersTable, eq(likesTable.userId, usersTable.displayId))
    .where(eq(likesTable.postId, diary))
    .execute();
  const likeslist = likes.map((like) => like.name!);

  const [post] = await db
    .select({
      id: postsTable.id,
      displayId: postsTable.displayId,
      topic: postsTable.topic,
      image: postsTable.image,
      createdAt: postsTable.createdAt,
      description: postsTable.description,
    })
    .from(postsTable)
    .orderBy(desc(postsTable.createdAt))
    .where(eq(postsTable.displayId, diary))
    .execute();

  return (
    <>
      <DiaryBig
        key={post.id}
        createdAt={new Date(post.createdAt)}
        topic={post.topic}
        description={post.description}
        likes={likes.length ?? "0"}
        likeslist={likeslist}
        image={post.image}
      />
    </>
  );
}

export default PersonalPage;
