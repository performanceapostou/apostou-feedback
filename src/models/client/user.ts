import { z } from "zod";
import { userMapper } from "../server/mappers";

export type User = z.infer<typeof userMapper>;
