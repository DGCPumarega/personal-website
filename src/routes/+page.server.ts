import type { PageServerLoad, Actions } from './$types';
import type { BlogPost, GuestbookMessage } from "$lib/types";
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { formSchema } from '$lib/components/home-sections/GuestbookSchema';
import { getGuestbookMessages, postGuestbookMessage } from '$lib/components/home-sections/GuestbookQueries';

export const load: PageServerLoad = async ({ fetch }) => {
  let blogPostsResponse = await fetch("/api/blog-posts");
  let blogPosts: BlogPost[] = await blogPostsResponse.json();

  let guestbookMessages = await getGuestbookMessages();

  return {
    blogPosts: blogPosts,
    guestbookMessages: guestbookMessages,
    form: await superValidate(zod4(formSchema)),
  };
}

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod4(formSchema));

    if(!form.valid) { 
      return fail(400, { form });
    }
    else {
      let message: Omit<GuestbookMessage, "createdAt"> = {
        username: form.data.username,
        content: form.data.message,
        email: form.data.email,
      };

      await postGuestbookMessage(message);
    }

    return { form };
  }
}
