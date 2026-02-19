ALTER TABLE "messages" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "replies" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;