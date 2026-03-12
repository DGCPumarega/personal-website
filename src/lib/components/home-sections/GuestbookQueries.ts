import type { GuestbookMessage, GuestbookReply } from "$lib/types";
import { db } from "$lib/server/db";
import { messages, replies } from "$lib/server/db/schema";
import { desc } from "drizzle-orm";

export const getGuestbookMessages = async () => {
  let messagesQueryResult = await db
    .select()
    .from(messages)
    .orderBy(desc(messages.createdAt)) as GuestbookMessage[];
  
  let repliesQueryResult = await db
    .select()
    .from(replies)
    .orderBy(desc(replies.createdAt)) as GuestbookReply[];

  let guestbookMessages: GuestbookMessage[] = [];
  messagesQueryResult.forEach((message) => {
    message.replies = [];
    repliesQueryResult.forEach((reply) => {
      if(reply.messageId === message.id) { message.replies.push(reply); }
    });
    message.replies.sort((first, second) =>
      new Date(first.createdAt).getTime() - new Date(second.createdAt).getTime()
    );
    guestbookMessages.push(message);
  });

  return guestbookMessages;
};

export const postGuestbookMessage = async (message: Omit<GuestbookMessage, "id" | "createdAt">) => {
  return await db.insert(messages).values(message).returning({ id: messages.id });
};

export const postGuestbookReply = async (reply: Omit<GuestbookReply, "id" | "createdAt">) => {
  return await db.insert(replies).values(reply).returning({ id: replies.id });
}
