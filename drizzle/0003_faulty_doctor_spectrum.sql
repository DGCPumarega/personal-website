CREATE TABLE "tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"data" jsonb NOT NULL
);
