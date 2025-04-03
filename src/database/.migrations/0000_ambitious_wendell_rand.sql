CREATE TYPE "public"."type" AS ENUM('multiple_choice', 'text', 'range');--> statement-breakpoint
CREATE TABLE "Answer" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Answer_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"answer" text NOT NULL,
	"user_id" bigint NOT NULL,
	"question_id" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Question" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Question_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"type" "type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "User_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"cpf" text NOT NULL,
	"phone" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "User_name_unique" UNIQUE("name"),
	CONSTRAINT "User_cpf_unique" UNIQUE("cpf"),
	CONSTRAINT "User_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_question_id_Question_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."Question"("id") ON DELETE no action ON UPDATE no action;