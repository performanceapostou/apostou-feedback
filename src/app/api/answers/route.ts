// Error
import { ErrorResponse } from "@/models/server";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

// Helpers
import { isPostgresError } from "@/lib/utils/is-postgres-error";

// Modules
import { createAnswer, getAllAnswers } from "@/modules/answers/answer.service";
import {
  createAnswerDto,
  CreateAnswerPayload,
} from "@/modules/answers/answer.dto";
import { answerMapper, simplifiedAnswerMapper } from "@/models/server/mappers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!Array.isArray(body)) throw new Error("Payload must be an array");

    let parsed: CreateAnswerPayload[];

    parsed = createAnswerDto.array().parse(body);

    const answer = await createAnswer(parsed);

    const answerMapped = simplifiedAnswerMapper.array().parse(answer);

    return NextResponse.json(answerMapped, { status: 200 });
  } catch (error: any) {
    let message: ErrorResponse[] = [{ message: "Erro interno" }];
    let status = 500;

    if (error instanceof ZodError) {
      message = error.errors.map((err) => ({
        message: err.message,
        code: err.code,
        column: [err.path.join(".")],
      }));
      status = 400;
    } else if (isPostgresError(error)) {
      console.log(error.code);
      switch (error.code) {
        case "23505": {
          status = 409; // conflict
          const key = error.constraint_name?.split("_")[1] || "";
          message = [
            {
              message: `${key} was already registered`,
              code: "23505",
              column: [key],
            },
          ];
          break;
        }
        case "23503": {
          status = 409; // conflict
          const key = error.constraint_name?.split("_")[1] || "";
          const id = error.detail?.split(" ")[1]?.split("=")[1] || "";
          message = [
            {
              message: `this ${key} = ${id} does not exist`,
              code: "23505",
              column: [key],
            },
          ];
          break;
        }
        default:
          message = [{ message: "Database error" }];
      }
    } else message = [error.message];

    return NextResponse.json({ errors: message }, { status });
  }
}

export async function GET(req: Request) {
  try {
    const queryParams = new URL(req.url).searchParams;

    const answer = queryParams.getAll("answer");
    const question_type = queryParams.getAll("question_type");

    const answers = await getAllAnswers({ answer, question_type });

    const answersMapped = answerMapper.array().parse(answers);

    return NextResponse.json(answersMapped, { status: 200 });
  } catch (error: any) {
    console.log(error);

    let message: ErrorResponse[] = [{ message: "Erro interno" }];
    let status = 500;

    if (error instanceof ZodError) {
      message = error.errors.map((err) => ({
        message: err.message,
        code: err.code,
        column: [err.path.join(".")],
      }));
      status = 400;
    } else if (isPostgresError(error)) {
      switch (error.code) {
        case "23505": {
          status = 409; // conflict
          const key = error.constraint_name?.split("_")[1] || "";
          message = [
            {
              message: `${key} was already registered`,
              code: "23505",
              column: [key],
            },
          ];
        }
      }
    } else message = [error.message];

    return NextResponse.json({ errors: message }, { status });
  }
}
