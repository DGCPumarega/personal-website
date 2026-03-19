import type { PageServerLoad } from "./$types";
import type { SpotifyToken } from "$lib/types";
import { env } from "$env/dynamic/private";
import { redirect, error } from "@sveltejs/kit";
import { base64encode } from "$lib/utils";

const CLIENT_ID = env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = env.SPOTIFY_REDIRECT_URI_DEV;

export const load: PageServerLoad = async ({ url, platform }) => {
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

    if(!platform) { 
      console.error("Unable to Access KV Store");
      return error(500, "Unable to Access KV Store");
    }

    if(isToken(data)) {
      const token = data as SpotifyToken;

      await platform.env.KV_STORE.put("spotify_access_token", token.access_token, { expirationTtl: token.expires_in });
      await platform.env.KV_STORE.put("spotify_refresh_token", token.refresh_token);
    }
  }

  redirect(301, "/");
}
