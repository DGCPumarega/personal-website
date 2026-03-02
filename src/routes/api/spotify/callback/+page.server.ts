import type { PageServerLoad } from "./$types";
import { env } from "$env/dynamic/private";
import { redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { tokens } from "$lib/server/db/schema";
import { base64encode } from "$lib/utils";

const CLIENT_ID = env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = env.SPOTIFY_REDIRECT_URI_DEV;

export const load: PageServerLoad = async ({ url }) => {
  const code = url.searchParams.get("code");

  if(code) {
    let b64ClientDetails = base64encode(
      new TextEncoder().encode(`${CLIENT_ID}:${CLIENT_SECRET}`).buffer
    );

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${b64ClientDetails}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
        code,
      }),
    });

    const data = await response.json();

    const isToken = (data: any) => {
      return (
        typeof data.access_token === "string" &&
        typeof data.token_type === "string" &&
        typeof data.expires_in === "number" &&
        typeof data.refresh_token === "string" &&
        typeof data.scope === "string"
      );
    };

    if(isToken(data)) {
      await db
        .insert(tokens)
        .values({
          accessToken: data.access_token as string,
          tokenType: data.token_type as string,
          expiresIn: data.expires_in as number,
          refreshToken: data.refresh_token as string,
          scope: data.scope as string,
        })
        .returning({ id: tokens.id });
    }
  }

  redirect(301, "/");
}
