import { and, eq, ne, inArray, sql, desc } from "drizzle-orm";

import { db } from "@/db";
import { relationsTable, usersTable, usersToRelationsTable } from "@/db/schema";

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
