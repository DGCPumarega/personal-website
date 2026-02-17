import type { PageServerLoad } from './$types';
import type { Post } from "$lib/types";

export const load: PageServerLoad = async ({ fetch }) => {
  let response = await fetch("/api/blog-posts");
  let posts: Post[] = await response.json();

  return { posts: posts}
}