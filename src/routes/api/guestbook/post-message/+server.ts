import type { RequestHandler } from "./$types";
import { drizzle } from "drizzle-orm/d1";
import { messages } from "$lib/server/db/schema";

export const POST: RequestHandler = async ({ platform, request }) => {
  if(!platform) { return new Response(null, { status: 500 }); }

  const data: any = await request.json();
  const db = drizzle(platform.env.D1_DATABASE);

  const result = await db.insert(messages).values(data).returning({ id: messages.id });
  if(result) { return new Response(null, { status: 201 }); }

  return new Response(null, { status: 500 });
}
