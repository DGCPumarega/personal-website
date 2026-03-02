ALTER TABLE "tokens" ADD COLUMN "access_token" text;--> statement-breakpoint
ALTER TABLE "tokens" ADD COLUMN "token_type" text;--> statement-breakpoint
ALTER TABLE "tokens" ADD COLUMN "expires_in" integer;--> statement-breakpoint
ALTER TABLE "tokens" ADD COLUMN "refresh_token" text;--> statement-breakpoint
ALTER TABLE "tokens" ADD COLUMN "scope" text;--> statement-breakpoint
ALTER TABLE "tokens" DROP COLUMN "data";