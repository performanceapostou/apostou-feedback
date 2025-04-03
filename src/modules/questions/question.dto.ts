import { questionType } from "@/database/schema";
import { z } from "zod";

export const createQuestionDto = z.object({
  title: z.string().min(1),
  type: z.enum([...questionType.enumValues]),
});

export type CreateQuestionPayload = z.infer<typeof createQuestionDto>;

export const getAllQuestionsDto = z.object({
  type: z.array(z.string()),
  title: z.array(z.string()),
});

export type GetAllQuestionsPayload = z.infer<typeof getAllQuestionsDto>;
