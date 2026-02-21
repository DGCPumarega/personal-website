import type { PageServerLoad, Actions } from './$types';
import type { BlogPost } from "$lib/types";
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { formSchema } from '$lib/components/home-sections/GuestbookSchema';

export const load: PageServerLoad = async ({ fetch }) => {
  let blogPostsResponse = await fetch("/api/blog-posts");
  let blogPosts: BlogPost[] = await blogPostsResponse.json();

  let guestbookGetMessagesResponse = await fetch("/api/guestbook/get-messages");
  let guestbookMessages = await guestbookGetMessagesResponse.json();

  return {
    blogPosts: blogPosts,
    guestbookMessages: guestbookMessages,
    form: await superValidate(zod4(formSchema)),
  };
}

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod4(formSchema));
    console.log(form)

    if(!form.valid) { 
      return fail(400, { form });
    }

    return { form };
  }
}
