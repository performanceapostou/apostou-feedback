// Error
import { ErrorResponse } from "@/models/server";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

// Helpers
import { isPostgresError } from "@/lib/utils/is-postgres-error";
import { questionMapper } from "@/models/server/mappers";

// Modules
import { createQuestionDto } from "@/modules/questions/question.dto";
import {
  createQuestion,
  getAllQuestions,
} from "@/modules/questions/question.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = createQuestionDto.parse(body);

    const question = await createQuestion(parsed);

    const questionMapped = questionMapper.parse(question);

    return NextResponse.json(questionMapped, { status: 200 });
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

export async function GET(req: Request) {
  try {
    const queryParams = new URL(req.url).searchParams;

    const type = queryParams.getAll("type");
    const title = queryParams.getAll("title");

    const questions = await getAllQuestions({ type, title });

    const questionsMapped = questionMapper.array().parse(questions);

    return NextResponse.json(questionsMapped, { status: 200 });
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
