import { z } from "zod";

// DTO para criação de usuário
export const createUserDto = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido").optional().nullable(),
  district: z.string().min(1, "Bairro é obrigatório"),
  phone: z
    .string()
    .min(10, "Telefone deve ter pelo menos 10 caracteres")
    .max(15, "Telefone deve ter no máximo 15 caracteres"),
});

export type CreateUserInput = z.infer<typeof createUserDto>;


export const getAllUsersDto = z.object({
  name: z.array(z.string().min(1)),
  email: z.array(z.string().email("Email inválido").optional().nullable()),
  district: z.array(z.string().min(1)),
  phone: z.array(z.string().min(10).max(15)),
});

export type GetAllUsersPayload = z.infer<typeof getAllUsersDto>;
