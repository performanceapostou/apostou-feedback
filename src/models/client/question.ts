import { z } from "zod";
import { questionMapper } from "../server/mappers";

export type Question = z.infer<typeof questionMapper>;
