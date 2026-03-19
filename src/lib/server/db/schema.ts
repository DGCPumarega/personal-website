import { sqliteTable, integer, text, } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';

export const messages = sqliteTable('messages', {
	id: integer('id').primaryKey(),
	username: text().notNull(),
	createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
	website: text(),
	content: text().notNull(),
});

export const replies = sqliteTable('replies', {
	id: integer('id').primaryKey(),
	messageId: integer('message_id').references(() => messages.id).notNull(),
	username: text().notNull(),
	createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
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
