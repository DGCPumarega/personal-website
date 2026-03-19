CREATE TABLE `messages` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`website` text,
	`content` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `replies` (
	`id` integer PRIMARY KEY NOT NULL,
	`message_id` integer NOT NULL,
	`username` text NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`content` text NOT NULL,
	FOREIGN KEY (`message_id`) REFERENCES `messages`(`id`) ON UPDATE no action ON DELETE no action
);
