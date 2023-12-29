import { and, eq, ne, inArray, sql, desc } from "drizzle-orm";

import { db } from "@/db";
import {
  likesTable,
  postsTable,
  relationsTable,
  usersTable,
  usersToRelationsTable,
} from "@/db/schema";

export const requestFriend = async (userId: string, otheruserEmail: string) => {
  "use server";
  console.log("[requestFriend]");

  // get userId of other user
  const otheruser = await db
    .select({ id: usersTable.displayId })
    .from(usersTable)
    .where(eq(usersTable.email, otheruserEmail))
    .execute();
  if (otheruser.length == 0) return null;
  const otheruserId = otheruser[0].id;

  // check if the two user have existed relationship
  const existedRelation = await findExistedRelation(userId, otheruserId);
  if (existedRelation) {
    return null;
  }

  const newRelationId = await db.transaction(async (tx) => {
    const [newRelation] = await tx
      .insert(relationsTable)
      .values({
        userId,
      })
      .returning();
    await tx.insert(usersToRelationsTable).values({
      userId: userId,
      relationId: newRelation.displayId,
    });
    await tx.insert(usersToRelationsTable).values({
      userId: otheruserId,
      relationId: newRelation.displayId,
    });
    return newRelation.displayId;
  });
  return newRelationId;
};

export const addFriend = async (userId: string, otheruserId: string) => {
  "use server";
  console.log("[addRelation]");

  const relationId = await findExistedRelation(userId, otheruserId);
  if (!relationId) {
    return null;
  }

  await db
    .update(usersToRelationsTable)
    .set({
      status: "accepted",
      acceptedAt: sql`now()`,
    })
    .where(eq(usersToRelationsTable.relationId, relationId))
    .execute();

  return otheruserId;
};

export const getAddedFriends = async (userId: string) => {
  "use server";
  console.log("[getFriends]");

  const relations = await getAcceptedRelations(userId);
  const relationsId = relations.map((relation) => relation.id);

  if (relationsId.length == 0) {
    return;
  }

  const friends = await db.query.usersToRelationsTable.findMany({
    where: and(
      inArray(usersToRelationsTable.relationId, relationsId),
      ne(usersToRelationsTable.userId, userId),
    ),
    orderBy: [desc(usersToRelationsTable.acceptedAt)],
    with: {
      user: {
        columns: {
          id: true,
          displayId: true,
          username: true,
        },
      },
    },
  });

  return friends;
};

// export const getAddedFriends_search = async (userId: string, search: string) => {
//   "use server";
//   console.log("[searchFriends]");

//   const relations = await getAcceptedRelations(userId);
//   const relationsId = relations.map((relation) => relation.id);

//   if (relationsId.length == 0) {
//     return;
//   }

//   const allFriends = await db.query.usersToRelationsTable.findMany({
//     where: and(
//       inArray(usersToRelationsTable.relationId, relationsId),
//       ne(usersToRelationsTable.userId, userId),
//     ),
//     orderBy: [desc(usersToRelationsTable.acceptedAt)],
//     with: {
//       user: {
//         columns: {
//           id: true,
//           displayId: true,
//           username: true,
//         },
//       },
//     },
//   });

//   const friends = allFriends.filter((friend) =>
//     friend.user.username.includes(search)
//   );

//   return friends;
// };

export const getRequestedUser = async (userId: string) => {
  "use server";
  console.log("[getRequestUsers]");

  const relations = await getPendingRelations(userId);
  if (relations == null) {
    return;
  }
  const relationsId = relations.map((relation) => relation.id);
  if (relationsId.length == 0) {
    return;
  }

  const users = await db.query.usersToRelationsTable.findMany({
    where: and(
      inArray(usersToRelationsTable.relationId, relationsId),
      ne(usersToRelationsTable.userId, userId),
    ),
    orderBy: [desc(usersToRelationsTable.createdAt)],
    with: {
      user: {
        columns: {
          id: true,
          displayId: true,
          username: true,
        },
      },
    },
  });

  return users;
};

export const deleteFriend = async (userId: string, friendId: string) => {
  "use server";
  console.log("[deleteFriend]");

  const existedRelationId = await findExistedRelation(userId, friendId);
  if (!existedRelationId) {
    return null;
  }

  await db
    .delete(relationsTable)
    .where(eq(relationsTable.displayId, existedRelationId));
  return;
};

export const getRelations = async (userId: string) => {
  "use server";

  const relations = await db
    .select({ id: usersToRelationsTable.relationId })
    .from(usersToRelationsTable)
    .where(eq(usersToRelationsTable.userId, userId))
    .execute();

  return relations;
};

export const getPendingRelations = async (userId: string) => {
  "use server";

  const allRelations = await db
    .select({ id: usersToRelationsTable.relationId })
    .from(usersToRelationsTable)
    .where(
      and(
        eq(usersToRelationsTable.userId, userId),
        eq(usersToRelationsTable.status, "pending"),
      ),
    )
    .execute();

  const relationsId = allRelations.map((relation) => relation.id);
  if (relationsId.length == 0) {
    return;
  }

  const relations = await db
    .select({ id: relationsTable.displayId })
    .from(relationsTable)
    .where(
      and(
        inArray(relationsTable.displayId, relationsId),
        ne(relationsTable.userId, userId),
      ),
    )
    .execute();

  return relations;
};

export const getAcceptedRelations = async (userId: string) => {
  "use server";

  const relations = await db
    .select({ id: usersToRelationsTable.relationId })
    .from(usersToRelationsTable)
    .where(
      and(
        eq(usersToRelationsTable.userId, userId),
        eq(usersToRelationsTable.status, "accepted"),
      ),
    )
    .execute();

  return relations;
};

export const findExistedRelation = async (userId: string, friendId: string) => {
  "use server";

  const userRelations = await getRelations(userId);
  const friendRelations = await getRelations(friendId);
  const relationship = userRelations.find((userRelation) =>
    friendRelations.some(
      (friendRelation) => userRelation.id === friendRelation.id,
    ),
  );

  return relationship?.id;
};

export const getFriend = async (friendId: string) => {
  "use server";

  const friend = await db
    .select({ name: usersTable.username })
    .from(usersTable)
    .where(eq(usersTable.displayId, friendId))
    .execute();

  return friend;
};

export const getFriendPost = async (userId: string) => {
  "use server";

  const post = await db.query.postsTable.findFirst({
    where: eq(postsTable.userId, userId),
  });

  return post;
};

export const getLikes = async (postId: string) => {
  "use server";

  const likes = await db
    .select({ likesId: likesTable.id })
    .from(likesTable)
    .where(eq(likesTable.postId, postId))
    .execute();

  return likes.length;
};

export const getLiked = async (userId: string, postId: string) => {
  "use server";

  const liked = await db
    .select({ likesId: likesTable.id })
    .from(likesTable)
    .where(and(eq(likesTable.postId, postId), eq(likesTable.userId, userId)))
    .execute();

  return liked.length == 0 ? false : true;
};

export const getNotifications = async (userId: string) => {
  "use server";

  const posts = await db
    .select({ id: postsTable.displayId })
    .from(postsTable)
    .where(eq(postsTable.userId, userId))
    .execute();

  if (posts == null) {
    return;
  }
  const postsId = posts.map((post) => post.id);
  if (postsId.length == 0) {
    return;
  }

  const likes = await db
    .select({
      id: likesTable.id,
      postId: likesTable.postId,
      userId: likesTable.userId,
    })
    .from(likesTable)
    .where(inArray(likesTable.postId, postsId))
    .orderBy(desc(likesTable.createdAt))
    .execute();

  return likes;
};

export const getPost = async (postId: string) => {
  "use server";

  const post = await db
    .select({ date: postsTable.createdAt })
    .from(postsTable)
    .where(eq(postsTable.displayId, postId))
    .execute();

  if (post) {
    const Date = post[0].date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      weekday: "short",
    });
    const [weekday, date] = Date.split(", ");
    const [month, day, year] = date.split("/");
    const outputDate = `${year}/${month}/${day}(${weekday})`;

    return outputDate;
  }

  return;
};

export const getUser = async (userId: string) => {
  "use server";

  const user = await db
    .select({ name: usersTable.username })
    .from(usersTable)
    .where(eq(usersTable.displayId, userId))
    .execute();

  return user[0].name;
};
