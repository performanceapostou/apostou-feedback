import { relations } from "drizzle-orm";
import { pgTable, text, bigint, pgEnum, timestamp } from "drizzle-orm/pg-core";

// Enums
export const questionType = pgEnum("type", [
  "multiple_choice",
  "text",
  "range",
]);

// Tabelas
export const User = pgTable("User", {
  id: bigint("id", { mode: "number" })
    .generatedAlwaysAsIdentity()
    .primaryKey()
    .notNull(),
  name: text("name").notNull().unique(),
  email: text("email"),
  district: text("district"),
  phone: text("phone").notNull().unique(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export const Question = pgTable("Question", {
  id: bigint("id", { mode: "number" })
    .generatedAlwaysAsIdentity()
    .primaryKey()
    .notNull(),
  title: text("title").notNull(),
  type: questionType("type").notNull(),
});

export const Answer = pgTable("Answer", {
  id: bigint("id", { mode: "number" })
    .generatedAlwaysAsIdentity()
    .primaryKey()
    .notNull(),
  answer: text("answer").notNull(),
  user_id: bigint("user_id", { mode: "number" })
    .notNull()
    .references(() => User.id),
  question_id: bigint("question_id", { mode: "number" })
    .notNull()
    .references(() => Question.id),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

// Relações
export const usersRelations = relations(User, ({ many }) => ({
  answers: many(Answer),
}));

export const answersRelations = relations(Answer, ({ one }) => ({
  user: one(User, {
    fields: [Answer.user_id],
    references: [User.id],
  }),
  question: one(Question, {
    fields: [Answer.question_id],
    references: [Question.id],
  }),
}));

export const questionsRelations = relations(Question, ({ many }) => ({
  answers: many(Answer),
}));
