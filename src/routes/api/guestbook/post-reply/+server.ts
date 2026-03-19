import type { RequestHandler } from "./$types";
import { drizzle } from "drizzle-orm/d1";
import { replies } from "$lib/server/db/schema";

export const POST: RequestHandler = async ({ platform, request }) => {
  if(!platform) { return new Response(null, { status: 500 }); }

  const data: any = await request.json();
  const db = drizzle(platform.env.D1_DATABASE);

  const result = await db.insert(replies).values(data).returning({ id: replies.id });
  if(result) { return new Response(null, { status: 201 }); }

  return new Response(null, { status: 500 });
}

