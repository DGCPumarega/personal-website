import type { GuestbookMessage } from "$lib/types";
import { db } from "$lib/server/db";
import { messages } from "$lib/server/db/schema";
import { desc } from "drizzle-orm";

export const getGuestbookMessages = async () => {
  let savedMessages = await db
  .select({
    username: messages.username,
    createdAt: messages.createdAt,
    content: messages.content,
  })
  .from(messages)
  .orderBy(desc(messages.createdAt));

  return savedMessages;
};

export const postGuestbookMessage = async (message: Omit<GuestbookMessage, "createdAt">) => {
  return await db.insert(messages).values(message).returning({ id: messages.id });
};
