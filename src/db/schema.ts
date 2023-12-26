import { sql, relations } from "drizzle-orm";
import {
  index,
  text,
  pgTable,
  serial,
  uuid,
  varchar,
  unique,
  boolean,
  timestamp,
  integer,
  pgEnum,
  customType
} from "drizzle-orm/pg-core";

// Checkout the many-to-many relationship in the following tutorial:
// https://orm.drizzle.team/docs/rqb#many-to-many

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    username: varchar("username", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    hashedPassword: varchar("hashed_password", { length: 100 }),
    provider: varchar("provider", {
      length: 100,
      enum: ["github", "credentials"],
    })
      .notNull()
      .default("credentials"),
    isNotified: boolean("is_notified").notNull().default(false),
    paintingTime: varchar("painting_time", { length: 100 })
      .notNull()
      .default(""),
    createdAt: timestamp("created_at").notNull().default(sql`now()`),
    lastingDays: integer("lasting_days").notNull().default(21), // default 21 days
    photo: varchar("photo").notNull(),
    isDeveloper: boolean("is_developer").notNull().default(false),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    emailIndex: index("email_index").on(table.email),
  }),
);

export const postsTable = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    topic: varchar("topic", { length: 100 }).notNull(),
    description: text("description").notNull().default(""),
    image: varchar("image").notNull(),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    imageIndex: index("image_index").on(table.image),
  }),
);

export const subjectsTable = pgTable(
  "subjects",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    subject: varchar("subject", { length: 100 }).notNull(),
    topic: varchar("topic").notNull().default("[]"),
    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

export const friendEnum = pgEnum("friend_status", ["pending", "accepted"]);

export const friendsTable = pgTable(
  "friends",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.displayId, {}),
    friendId: uuid("friend_id")
      .notNull()
      .references(() => usersTable.displayId, {}),
    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
    status: friendEnum("status").notNull().default("pending"),
  },
  (table) => ({
    userIdIndex: index("user_id_index").on(table.userId),
  }),
);

export const likesTable = pgTable(
  "likes",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.displayId, {}),
    postId: uuid("post_id")
      .notNull()
      .references(() => postsTable.displayId, {}),
    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
  },
  (table) => ({
    postIdIndex: index("post_id_index").on(table.postId),
  }),
);

export const usersRelations = relations(usersTable, ({ many }) => ({
  usersToSubjectsTable: many(usersToSubjectsTable),
  usersToFriendsTable: many(usersToFriendsTable),
  postsTable: many(postsTable),
}));

export const postsRelations = relations(postsTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [postsTable.userId],
    references: [usersTable.displayId],
  }),
  likes: many(likesTable),
}));

export const likesRelations = relations(likesTable, ({ one }) => ({
  likes: one(postsTable, {
    fields: [likesTable.postId],
    references: [postsTable.displayId],
  }),
}));

export const subjectsRelations = relations(subjectsTable, ({ many }) => ({
  usersToSubjectsTable: many(usersToSubjectsTable),
}));

export const usersToSubjectsTable = pgTable(
  "users_to_subjects",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    subjectId: uuid("subject_id")
      .notNull()
      .references(() => subjectsTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    userAndSubjectIndex: index("user_and_subject_index").on(
      table.userId,
      table.subjectId,
    ),
    uniqCombination: unique().on(table.subjectId, table.userId),
  }),
);

export const usersToSubjectsRelations = relations(
  usersToSubjectsTable,
  ({ one }) => ({
    subject: one(subjectsTable, {
      fields: [usersToSubjectsTable.subjectId],
      references: [subjectsTable.displayId],
    }),
    user: one(usersTable, {
      fields: [usersToSubjectsTable.userId],
      references: [usersTable.displayId],
    }),
  }),
);

export const friendsRelations = relations(usersTable, ({ many }) => ({
  usersToFriendsTable: many(usersToFriendsTable),
}));

export const usersToFriendsTable = pgTable(
  "users_to_friends",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.displayId, {}),
    friendId: uuid("friend_id")
      .notNull()
      .references(() => usersTable.displayId, {}), // it seems strange here.
  },
  (table) => ({
    userAndFriendIndex: index("user_and_friend_index").on(
      table.userId,
      table.friendId,
    ),
    uniqCombination: unique().on(table.friendId, table.userId),
  }),
);

export const usersToFriendsRelations = relations(
  usersToFriendsTable,
  ({ one }) => ({
    friend: one(friendsTable, {
      fields: [usersToFriendsTable.friendId],
      references: [friendsTable.friendId],
    }),
    user: one(usersTable, {
      fields: [usersToFriendsTable.userId],
      references: [usersTable.displayId],
    }),
  }),
);
