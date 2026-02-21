import type { GuestbookMessage } from "$lib/types";
import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { messages, replies } from "$lib/server/db/schema";

const getGuestbookMessages = async () => {
  let savedMessages = await db
  .select({
    username: messages.username,
    createdAt: messages.createdAt,
    content: messages.content,
  })
  .from(messages);
  
  savedMessages = savedMessages.sort((first, second) =>
    new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime()
	);

  return savedMessages;
};

export const GET = async () => {
  const guestbookMessages = await getGuestbookMessages();

  return json(guestbookMessages);
};

