import type { SpotifyTrack } from "$lib/types";
import { env } from "$env/dynamic/private";
import { desc } from "drizzle-orm";
import { db } from "$lib/server/db";
import { tokens } from "$lib/server/db/schema";
import { base64encode } from "$lib/utils";

const CLIENT_ID = env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;

const getTokens = async () => {
  let { accessToken, refreshToken, createdAt, expiresIn } = (await db
    .select({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      createdAt: tokens.createdAt,
      expiresIn: tokens.expiresIn,
    })
    .from(tokens)
    .orderBy(desc(tokens.createdAt))
    .limit(1)
  )[0];

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    createdAt: createdAt,
    expiresIn: expiresIn,
  };
};

const reauthenticate = async (refreshToken: string) => {
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
    let result = await db
      .insert(tokens)
      .values({
          accessToken: data.access_token as string,
          tokenType: data.token_type as string,
          expiresIn: data.expires_in as number,
          refreshToken: refreshToken,
          scope: data.scope as string,
      })
      .returning({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        createdAt: tokens.createdAt,
        expiresIn: tokens.expiresIn,
      });

    return result[0];
  }
  else { return null; }
};

const getNowPlaying = async (accessToken: string) => {
  const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { "Authorization": `Bearer ${accessToken}` }
  });

  if(response.status === 200) {
    const data = await response.json();

    let artistsData: Array<{ name: string, _: any }> = data.item.artists;
    let artists: string[] = artistsData.map(x => x.name);

    let coversData: Array<{ url: string, _: any }> = data.item.album.images;
    let covers: string[] = coversData.map(x => x.url);

    return {
      id: data.item.id,
      name: data.item.name,
      artists: artists,
      album: data.item.album.name,
      covers: covers,
    } as SpotifyTrack;
  }
  else { return null; }
}

const getRecentTracks = async (accessToken: string, limit: number = 10) => {
  const response = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`, {
    headers: { "Authorization": `Bearer ${accessToken}` }
  });
  
  if(response.status === 200) {
    const data = await response.json();
    const items: Array<{
      track: {
        id: string,
        name: string,
        album: {
          name: string,
          images: Array<{ url: string, [key: string]: any }>,
          [key: string]: any
        },
        artists: Array<{ name: string, [key: string]: any }>,
        [key: string]: any
      },
      [key: string]: any
    }> = data.items;

    let tracks: SpotifyTrack[] = []
    items.forEach(item => {
      tracks.push({
        id: item.track.id,
        name: item.track.name,
        album: item.track.album.name,
        artists: item.track.artists.map(x => x.name),
        covers: item.track.album.images.map(x => x.url),
      })
    });

    return tracks;
  }
  else { return null; }
}

const getTopTracks = async (accessToken: string, limit: number = 10) => {
  const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=${limit}`, {
    headers: { "Authorization": `Bearer ${accessToken}` }
  });

  if(response.status === 200) {
    const data = await response.json();
    const items: Array<{
      id: string,
      name: string,
      album: {
        name: string,
        images: Array<{ url: string, [key: string]: any }>,
        [key: string]: any,
      },
      artists: Array<{ name: string, [key: string]: any }>,
      [key: string]: any,
    }> = data.items;

    let tracks: SpotifyTrack[] = []
    items.forEach(item => {
      tracks.push({
        id: item.id,
        name: item.name,
        album: item.album.name,
        artists: item.artists.map(x => x.name),
        covers: item.album.images.map(x => x.url),
      })
    });

    return tracks;
  }
  else { return null; }
}

export const loadSpotifyData = async () => {
  let { accessToken, refreshToken, createdAt, expiresIn } = await getTokens();
  let tokenAge = (Date.now() - createdAt.getTime()) / 1000;

  if(tokenAge >= (expiresIn - 10)) {
    let result = await reauthenticate(refreshToken);

    if(result) {
      accessToken = result.accessToken;
      refreshToken = result.refreshToken;
      createdAt = result.createdAt;
      expiresIn = result.expiresIn;
    }
  }

  let nowPlaying = await getNowPlaying(accessToken);
  let recentTracks = await getRecentTracks(accessToken);
  let topTracks = await getTopTracks(accessToken);

  return {
    nowPlaying: nowPlaying,
    recentTracks: recentTracks,
    topTracks: topTracks,
  };
};
