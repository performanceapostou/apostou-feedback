import { InferSelectModel } from "drizzle-orm";
import { Question } from "@/database/schema";

export type QuestionEntity = InferSelectModel<typeof Question>;
