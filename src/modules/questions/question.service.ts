import { db } from "@/database";
import { Question, questionType } from "@/database/schema";
import { CreateQuestionPayload, GetAllQuestionsPayload } from "./question.dto";
import { ilike, inArray, and } from "drizzle-orm";
import { z } from "zod";

export async function createQuestion(data: CreateQuestionPayload) {
  const [inserted] = await db.insert(Question).values(data).returning();
  return inserted;
}

export async function getAllQuestions(query: GetAllQuestionsPayload) {
  const conditions = [];

  // Filtro por tipo (enum)
  if (query.type.length > 0) {
    let types: string[] = [];

    const isTypes = z.enum([...questionType.enumValues]);
    types = query.type.filter((t) => isTypes.safeParse(t).success);

    conditions.push(
      inArray(Question.type, types as typeof questionType.enumValues)
    );
  }

  // Filtro por título (busca parcial)
  if (query.title.length > 0) {
    const titles = query.title;

    for (const title of titles) {
      conditions.push(ilike(Question.title, `%${title}%`));
    }
  }

  const questions = db.select().from(Question);

  if (conditions.length > 0) {
    questions.where(and(...conditions));
  }

  return await questions;
}
