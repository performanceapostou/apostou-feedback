import { db } from "@/database"; // ajuste o caminho conforme necessário
import { User } from "@/database/schema";
import { CreateUserInput, GetAllUsersPayload } from "./user.dto";
import { and, ilike } from "drizzle-orm";

export async function createUser(data: CreateUserInput) {
  const [inserted] = await db.insert(User).values(data).returning();
  return inserted;
}

export async function getAllUsers(query: GetAllUsersPayload) {
  const conditions = [];

  // Filtro por cpf (busca parcial)
  if (query.email.length > 0) {
    const emails = query.email;

    for (const email of emails) {
      conditions.push(ilike(User.email, `%${email}%`));
    }
  }

  // Filtro por nome (busca parcial)
  if (query.name.length > 0) {
    const names = query.name;

    for (const name of names) {
      conditions.push(ilike(User.name, `%${name}%`));
    }
  }

  // Filtro por número de telefone (busca parcial)
  if (query.phone.length > 0) {
    const phones = query.phone;

    for (const phone of phones) {
      conditions.push(ilike(User.phone, `%${phone}%`));
    }
  }

  const users = db.select().from(User);

  if (conditions.length > 0) {
    users.where(and(...conditions));
  }

  return await users;
}
