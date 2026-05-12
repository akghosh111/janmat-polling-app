import { pgTable, uuid, varchar, text, boolean, timestamp, integer } from 'drizzle-orm/pg-core'


export const usersTable = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    firstName: varchar('first_name', { length: 45 }).notNull(),
    lastName: varchar('last_name', { length: 45 }),
    email: varchar('email', { length: 322 }).notNull().unique(),
    emailVerified: boolean('email_verified').default(false).notNull(),
    password: varchar('password', { length: 66 }),
    salt: text('salt'),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
})

export const polls = pgTable("polls", {
  id: uuid("id").primaryKey().defaultRandom(),

  creatorId: uuid("creator_id")
    .notNull()
    .references(() => usersTable.id),

  title: text("title").notNull(),

  description: text("description"),

  isAnonymous: boolean("is_anonymous")
    .default(true)
    .notNull(),

  isPublished: boolean("is_published")
    .default(false)
    .notNull(),

  expiresAt: timestamp("expires_at"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

export const questions = pgTable("questions", {
  id: uuid("id").primaryKey().defaultRandom(),

  pollId: uuid("poll_id")
    .notNull()
    .references(() => polls.id, {
      onDelete: "cascade",
    }),

  question: text("question").notNull(),

  required: boolean("required")
    .default(false)
    .notNull(),

  order: integer("order").notNull(),
});

export const options = pgTable("options", {
  id: uuid("id").primaryKey().defaultRandom(),

  questionId: uuid("question_id")
    .notNull()
    .references(() => questions.id, {
      onDelete: "cascade",
    }),

  text: text("text").notNull(),
});

export const responses = pgTable("responses", {
  id: uuid("id").primaryKey().defaultRandom(),

  pollId: uuid("poll_id")
    .notNull()
    .references(() => polls.id),

  respondentId: uuid("respondent_id")
    .references(() => usersTable.id),

  submittedAt: timestamp("submitted_at")
    .defaultNow()
    .notNull(),
});

export const answers = pgTable("answers", {
  id: uuid("id").primaryKey().defaultRandom(),

  responseId: uuid("response_id")
    .notNull()
    .references(() => responses.id, {
      onDelete: "cascade",
    }),

  questionId: uuid("question_id")
    .notNull()
    .references(() => questions.id),

  optionId: uuid("option_id")
    .notNull()
    .references(() => options.id),
});