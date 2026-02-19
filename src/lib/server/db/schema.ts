import { pgTable, serial, integer, text, timestamp } from 'drizzle-orm/pg-core';

export const messages = pgTable('messages', {
	id: serial('id').primaryKey(),
	username: text().notNull(),
	createdAt: timestamp().notNull().defaultNow(),
	email: text(),
	content: text().notNull(),
});

export const replies = pgTable('replies', {
	id: serial('id').primaryKey(),
	messageId: integer().references(() => messages.id),
	username: text().notNull(),
	createdAt: timestamp().notNull().defaultNow(),
	content: text().notNull(),
});
