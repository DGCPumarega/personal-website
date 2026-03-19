import type { RequestHandler } from "./$types";
import type { GuestbookMessage, GuestbookReply } from "$lib/types";
import { drizzle } from "drizzle-orm/d1";
import { messages, replies } from "$lib/server/db/schema";
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ platform }) => {
  if(!platform) { return new Response(null, { status: 500 }); }

  const db = drizzle(platform.env.D1_DATABASE);
  const messagesQueryResults = await db.select().from(messages);
  let repliesQueryResults = await db.select().from(replies);

  let guestbookMessages: GuestbookMessage[] = messagesQueryResults.map(result => {
    return {
      id: result.id,
      username: result.username,
      content: result.content,
      website: result.website,
      replies: [] as GuestbookReply[],
      createdAt: new Date(result.createdAt),
    };
  });

  let guestbookReplies: GuestbookReply[] = repliesQueryResults.map(result => {
    return {
      id: result.id,
      messageId: result.messageId,
      username: result.username,
      content: result.content,
      createdAt: new Date(result.createdAt),
    };
  });

  guestbookMessages.forEach(message => {
    guestbookReplies.forEach(reply => {
      if(reply.messageId === message.id) { message.replies.push(reply); }
    });

    message.replies.sort((first, second) =>
      first.createdAt.getTime() - second.createdAt.getTime()
    );
  });

  guestbookMessages.sort((first, second) =>
    second.createdAt.getTime() - first.createdAt.getTime()
  );

  return json({ messages: guestbookMessages }, { status: 200 });
}
