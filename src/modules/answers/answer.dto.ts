import { z } from "zod";

export const createAnswerDto = z.object({
  answer: z.string().min(1),
  user_id: z.number().min(1),
  question_id: z.number().min(1),
});

export type CreateAnswerPayload = z.infer<typeof createAnswerDto>;

export const getAllAnswersDto = z.object({
  answer: z.array(z.string()),
  question_type: z.array(z.string()),
});

export type GetAllAnswersPayload = z.infer<typeof getAllAnswersDto>;
