import type { 
  PageServerLoad,
  Actions
} from './$types';
import type {
  BlogPost,
  GuestbookMessage,
  GuestbookReply,
} from "$lib/types";
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import {
  messageFormSchema,
  replyFormSchema,
} from '$lib/components/home-sections/GuestbookSchema';
import {
  getGuestbookMessages,
  postGuestbookMessage,
  postGuestbookReply,
} from '$lib/components/home-sections/GuestbookQueries';
import { loadSpotifyData } from '$lib/components/home-sections/SpotifyDataLoader';

export const load: PageServerLoad = async ({ fetch }) => {
  let blogPostsResponse = await fetch("/api/blog-posts");
  let blogPosts: BlogPost[] = await blogPostsResponse.json();

  let guestbookMessages = await getGuestbookMessages() as GuestbookMessage[];

  let statusCafeResponse = await fetch("https://status.cafe/users/dgcpumarega/status.json")
  let status = await statusCafeResponse.json();

  let { nowPlaying, recentTracks, topTracks } = await loadSpotifyData();

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

    let message: Omit<GuestbookMessage, "id" | "createdAt"> = {
      username: messageForm.data.username,
      content: messageForm.data.content,
      website: (messageForm.data.website ? messageForm.data.website : null),
      replies: [],
    };

    await postGuestbookMessage(message);
    return { messageForm };
  },
  reply: async (event) => {
    const replyForm = await superValidate(event, zod4(replyFormSchema));

    if(!replyForm.valid) {
      return fail(400, { replyForm });
    }

    let reply: Omit<GuestbookReply, "id" | "createdAt"> = {
      messageId: replyForm.data.messageId,
      username: replyForm.data.username,
      content: replyForm.data.content,
    };

    await postGuestbookReply(reply);
    return { replyForm };
  },
};
