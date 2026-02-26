import { pgTable, serial, integer, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const messages = pgTable('messages', {
	id: serial('id').primaryKey(),
	username: text().notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	email: text(),
	content: text().notNull(),
});

export const replies = pgTable('replies', {
	id: serial('id').primaryKey(),
	messageId: integer().references(() => messages.id).notNull(),
	username: text().notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	content: text().notNull(),
});

export const messagesRelations = relations(messages, ({ many }) => ({
	replies: many(replies),
}));

export const repliesRelations = relations(replies, ({ one }) => ({
	messages: one(messages, {
		fields: [replies.messageId],
		references: [messages.id]
	}),
}))


// KV Store
export const tokens = pgTable('tokens', {
	id: serial('id').primaryKey(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	data: jsonb('data').notNull(),
});
