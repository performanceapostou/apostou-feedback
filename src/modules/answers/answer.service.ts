import { db } from "@/database";
import { Answer, Question, User, questionType } from "@/database/schema";
import { ilike, and, eq, inArray, or } from "drizzle-orm";
import { CreateAnswerPayload, GetAllAnswersPayload } from "./answer.dto";

export async function createAnswer(
  data: CreateAnswerPayload | CreateAnswerPayload[]
) {
  const payloads = Array.isArray(data) ? data : [data];

  return await db.transaction(async (tx) => {
    if (payloads.length === 0) return [];

    // 🔒 NOVA VALIDAÇÃO: repetições dentro do próprio payload
    const seenPairs = new Set<string>();
    const duplicatedLocal: string[] = [];

    for (const { user_id, question_id } of payloads) {
      const key = `${user_id}-${question_id}`;
      if (seenPairs.has(key)) {
        duplicatedLocal.push(key);
      } else {
        seenPairs.add(key);
      }
    }

    if (duplicatedLocal.length > 0) {
      const msg = duplicatedLocal
        .map((k) => {
          const [u, q] = k.split("-");
          return `usuário ${u} → questão ${q}`;
        })
        .join(", ");
      throw new Error(`Payload duplicado: ${msg}`);
    }

    // 🔍 VERIFICAÇÃO NO BANCO
    const conditions = payloads.map((item) =>
      and(
        eq(Answer.user_id, item.user_id),
        eq(Answer.question_id, item.question_id)
      )
    );

    const existing = await tx
      .select({
        user_id: Answer.user_id,
        question_id: Answer.question_id,
      })
      .from(Answer)
      .where(conditions.length > 0 ? or(...conditions) : undefined);

    const existingPairs = new Set(
      existing.map((a) => `${a.user_id}-${a.question_id}`)
    );

    const duplicated = payloads.filter((item) =>
      existingPairs.has(`${item.user_id}-${item.question_id}`)
    );

    if (duplicated.length > 0) {
      const msg = duplicated
        .map((a) => `usuário ${a.user_id} → questão ${a.question_id}`)
        .join(", ");
      throw new Error(`Respostas já existentes detectadas: ${msg}`);
    }

    const inserted = await tx.insert(Answer).values(payloads).returning({
      id: Answer.id,
      answer: Answer.answer,
      created_at: Answer.createdAt,
      user_id: Answer.user_id,
      question_id: Answer.question_id,
    });

    return inserted;
  });
}

export async function getAllAnswers(query: GetAllAnswersPayload) {
  const conditions = [];
  // Filtro por texto (busca parcial)
  if (query.answer.length > 0) {
    const titles = query.answer;

    for (const title of titles) {
      conditions.push(ilike(Answer.answer, `%${title}%`));
    }
  }

  // Filtro por tipo de questão (enum em Question.type)
  if (query.question_type.length > 0) {
    conditions.push(
      inArray(
        Question.type,
        query.question_type as typeof questionType.enumValues
      )
    );
  }

  const answers = db
    .select({
      id: Answer.id,
      answer: Answer.answer,
      created_at: Answer.createdAt,
      user: {
        id: User.id,
        name: User.name,
        email: User.email,
        phone: User.phone,
      },
      question: {
        id: Question.id,
        title: Question.title,
        type: Question.type,
      },
    })
    .from(Answer)
    .innerJoin(User, eq(User.id, Answer.user_id))
    .innerJoin(Question, eq(Question.id, Answer.question_id));

  if (conditions.length > 0) {
    answers.where(and(...conditions));
  }

  return await answers;
}
