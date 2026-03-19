import type { PageServerLoad, Actions } from './$types';
import type { BlogPost, GuestbookMessage, GuestbookReply, SpotifyTrack } from "$lib/types";
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { messageFormSchema, replyFormSchema } from '$lib/components/home-sections/GuestbookSchema';

export const load: PageServerLoad = async ({ fetch }) => {
  let blogPostsResponse = await fetch("/api/blog-posts");
  let blogPosts: BlogPost[] = await blogPostsResponse.json();

  let guestbookMessages: GuestbookMessage[] | null = null;

  let guestbookGetMessagesResponse = await fetch("api/guestbook/get-messages");
  if(guestbookGetMessagesResponse.status === 200) {
    let data: { messages: GuestbookMessage[] } = await guestbookGetMessagesResponse.json();
    guestbookMessages = data.messages;
  }

  let statusCafeResponse = await fetch("https://status.cafe/users/dgcpumarega/status.json")
  let status = await statusCafeResponse.json();

  let nowPlaying: SpotifyTrack | null = null;
  let recentTracks: SpotifyTrack[] | null = null;
  let topTracks: SpotifyTrack[] | null = null;

  let spotifyGetDataResponse = await fetch("/api/spotify/get-data");
  if(spotifyGetDataResponse.status === 200) {
    let spotifyData: {
      nowPlaying: SpotifyTrack | null,
      recentTracks: SpotifyTrack[] | null,
      topTracks: SpotifyTrack[] | null
    } = await spotifyGetDataResponse.json();

    nowPlaying = spotifyData.nowPlaying;
    recentTracks = spotifyData.recentTracks;
    topTracks = spotifyData.topTracks;
  }

  return {
    blogPosts: blogPosts,
    guestbookMessages: guestbookMessages,
    messageForm: await superValidate(zod4(messageFormSchema)),
    replyForm: await superValidate(zod4(replyFormSchema)),
    status: status,
    nowPlaying: nowPlaying,
    recentTracks: recentTracks,
    topTracks: topTracks,
  };
};

export const actions: Actions = {
  message: async (event) => {
    const messageForm = await superValidate(event, zod4(messageFormSchema));

    if(!messageForm.valid) { 
      return fail(400, { messageForm });
    }

    // let message: Omit<GuestbookMessage, "id" | "createdAt"> = {
    //   username: messageForm.data.username,
    //   content: messageForm.data.content,
    //   website: (messageForm.data.website ? messageForm.data.website : null),
    //   replies: [],
    // };

    const response = await event.fetch("api/guestbook/post-message", {
      method: "POST",
      body: JSON.stringify({
        username: messageForm.data.username,
        content: messageForm.data.content,
        website: messageForm.data.website,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if(response.status >= 500) { console.error("Unable to Post Message"); }

    return { messageForm };
  },
  reply: async (event) => {
    const replyForm = await superValidate(event, zod4(replyFormSchema));

    if(!replyForm.valid) {
      return fail(400, { replyForm });
    }

    // let reply: Omit<GuestbookReply, "id" | "createdAt"> = {
    //   messageId: replyForm.data.messageId,
    //   username: replyForm.data.username,
    //   content: replyForm.data.content,
    // };

    const response = await event.fetch("api/guestbook/post-reply", {
      method: "POST",
      body: JSON.stringify({
        messageId: replyForm.data.messageId,
        username: replyForm.data.username,
        content: replyForm.data.content,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if(response.status >= 500) { console.error("Unable to Post Reply"); }

    return { replyForm };
  },
};
