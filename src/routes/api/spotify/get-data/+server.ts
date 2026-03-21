import type { RequestHandler } from "./$types";
import type { SpotifyTrack } from "$lib/types";
import { json } from "@sveltejs/kit";

const getNowPlaying = async (accessToken: string) => {
  const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { "Authorization": `Bearer ${accessToken}` }
  });

  if(response.status === 200) {
    const data: any = await response.json();

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

const getRecentTracks = async (accessToken: string, limit: number = 11) => {
  const response = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`, {
    headers: { "Authorization": `Bearer ${accessToken}` }
  });
  
  if(response.status === 200) {
    const data: any = await response.json();
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

const getTopTracks = async (accessToken: string, limit: number = 16) => {
  const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=${limit}`, {
    headers: { "Authorization": `Bearer ${accessToken}` }
  });

  if(response.status === 200) {
    const data: any = await response.json();
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

export const GET: RequestHandler = async ({ platform, fetch }) => {
  if(!platform) { return new Response(null, { status: 500 }); }

  let accessToken = await platform.env.KV_STORE.get("spotify_access_token");

  if(!accessToken) {
    let response = await fetch("/api/spotify/reauthenticate");
    if(response.status >= 500) { return new Response(null, { status: 500 }); }

    let data: { accessToken: string } = await response.json();
    accessToken = data.accessToken;
  }

  let nowPlaying = await getNowPlaying(accessToken!);
  let recentTracks = await getRecentTracks(accessToken!);
  let topTracks = await getTopTracks(accessToken!);

  return json({
    nowPlaying: nowPlaying,
    recentTracks: recentTracks,
    topTracks: topTracks,
  }, { status: 200 });
}
