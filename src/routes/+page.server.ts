import type { PageServerLoad } from './$types';
import type { Post } from "$lib/types";
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '$lib/components/home-sections/GuestbookSchema';
import { zod4 } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ fetch }) => {
  let response = await fetch("/api/blog-posts");
  let posts: Post[] = await response.json();

  return {
    posts: posts,
    form: await superValidate(zod4(formSchema)),
  };
}