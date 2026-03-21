import type { RequestHandler } from "./$types";
import type { SpotifyToken } from "$lib/types";
import { json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { base64encode } from "$lib/utils";

export const GET: RequestHandler = async ({ platform }) => {
  if(!platform) { return new Response(null, { status: 503 }); }

  const CLIENT_ID = env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;

  const refreshToken = await platform.env.KV_STORE.get("spotify_refresh_token");
  if(!refreshToken ) { return new Response(null, { status: 500 }); }

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
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const data = await response.json();
  const isToken = (data: any) => {
    return (
      typeof data.access_token === "string" &&
      typeof data.token_type === "string" &&
      typeof data.expires_in === "number" &&
      typeof data.scope === "string"
    );
  };

  if(isToken(data)) {
    const token = data as SpotifyToken;
    await platform.env.KV_STORE.put("spotify_access_token", token.access_token, { expirationTtl: token.expires_in });

    return json({ accessToken: token.access_token }, { status: 201 });
  }

  return new Response(null, { status: 500 });
}
