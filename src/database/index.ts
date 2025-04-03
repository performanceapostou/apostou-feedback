// Core
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Database
import * as schema from "./schema";

// Enviornment
import { env } from "@/lib/env";

const DATABASE_URL =
  process.env.NODE_ENV === "production"
    ? env.DATABASE_URL
    : env.DATABASE_URL_UNPOOLED;

export const client = postgres(DATABASE_URL, {
  ssl: "require",
  max: 10,
  idle_timeout: 30,
  connect_timeout: 5,
});

export const db = drizzle(client, { schema, logger: true });
