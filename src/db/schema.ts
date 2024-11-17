import { pgTable, pgEnum } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const employeesTable = pgTable(
  "employees",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    name: t.varchar({ length: 255 }).notNull(),
  }
);

export const customersTable = pgTable(
  "customers",
  {
    id: t.serial().primaryKey(),
    name: t.varchar({ length: 255 }).notNull(),
  }
);

export const UserRole = pgEnum("userRole", ["ADMIN", "BASIC"]);

export const usersTable = pgTable(
  "users",
  {
    id: t.uuid("id").primaryKey().defaultRandom(),
    name: t.varchar("name", { length: 255 }).notNull(),
    age: t.integer("age").notNull(),
    // age: t.integer("age").notNull().array(), // array of integers
    // age: t.integer("age").notNull().$type<12 | 24>(), // must be 12 or 24
    // age: t.integer("age").notNull().$default(() => Math.floor(Math.random() * 100)), // generate random number
    email: t.varchar("email", { length: 255 }).notNull().unique(),
    role: UserRole("role").default("BASIC").notNull(),
  },
  (table) => {
    return {
      emailIndex: t.uniqueIndex("emailIndex").on(table.email),
      uniqueNameAndAge: t.unique("uniqueNameAndAge").on(table.name, table.age),
    }
  }
);

export const userPreferencesTable = pgTable(
  "user_preferences",
  {
    id: t.uuid("id").primaryKey().defaultRandom(),
    emailUpdates: t.boolean("emailUpdates").notNull().default(false),
    userId: t.uuid("userId")
      .references(() => usersTable.id,
        // {
        //   onDelete: "cascade",
        // }
      )
      .notNull(),
  }
);

export const postsTable = pgTable(
  "posts",
  {
    id: t.uuid("id").primaryKey().defaultRandom(),
    title: t.varchar("title", { length: 255 }).notNull(),
    averageRating: t.real("averageRating").notNull().default(0),
    createdAt: t.timestamp("createdAt").notNull().defaultNow(),
    updatedAt: t.timestamp("updatedAt").notNull().defaultNow(),
    authorId: t.uuid("authorId").references(() => usersTable.id).notNull(),
  }
);

export const categoriesTable = pgTable(
  "categories",
  {
    id: t.uuid("id").primaryKey().defaultRandom(),
    name: t.varchar("name", { length: 255 }).notNull(),
  }
);

export const postsCategoriesTable = pgTable(
  "posts_categories",
  {
    postId: t.uuid("postId").references(() => postsTable.id).notNull(),
    categoryId: t.uuid("categoryId").references(() => categoriesTable.id).notNull(),
  },
  (table) => {
    return {
      pk: t.primaryKey({ columns: [table.postId, table.categoryId] }),
    }
  }
);

// RELATIONSHIPS

export const usersTableRelationships = relations(usersTable, ({ one, many }) => ({
  preferences: one(userPreferencesTable),
  posts: many(postsTable),
}));

export const userPreferencesTableRelationships = relations(userPreferencesTable, ({ one }) => {
  return {
    user: one(usersTable, {
      fields: [userPreferencesTable.userId],
      references: [usersTable.id]
    }),
  }
});

export const postsTableRelationships = relations(postsTable, ({ one, many }) => ({
  author: one(usersTable, {
    fields: [postsTable.authorId],
    references: [usersTable.id]
  }),
  postsCategories: many(postsCategoriesTable),
}));

export const categoriesTableRelationships = relations(categoriesTable, ({ many }) => ({
  postsCategories: many(postsCategoriesTable),
}));

export const postsCategoriesTableRelationships = relations(postsCategoriesTable, ({ one }) => ({
  post: one(postsTable, {
    fields: [postsCategoriesTable.postId],
    references: [postsTable.id]
  }),
  category: one(categoriesTable, {
    fields: [postsCategoriesTable.categoryId],
    references: [categoriesTable.id]
  }),
}));