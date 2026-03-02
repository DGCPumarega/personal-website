ALTER TABLE "tokens" ALTER COLUMN "access_token" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tokens" ALTER COLUMN "token_type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tokens" ALTER COLUMN "expires_in" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tokens" ALTER COLUMN "refresh_token" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tokens" ALTER COLUMN "scope" SET NOT NULL;