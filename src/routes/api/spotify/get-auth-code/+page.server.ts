import type { PageServerLoad } from "./$types";
import { env } from "$env/dynamic/private";
import { redirect } from "@sveltejs/kit";
import { generateRandomString } from "$lib/utils";

const CLIENT_ID = env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = env.SPOTIFY_REDIRECT_URI;

export const load: PageServerLoad = () => {
  const scopes = "user-read-currently-playing user-read-recently-played user-top-read"
  const state = generateRandomString(16);
  const authUrlParams = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: scopes,
    redirect_uri: REDIRECT_URI,
    state: state,
  });
  
  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.search = authUrlParams.toString();
  
  redirect(302, authUrl);
}
