import type { PageLoad } from "./$types";
import type { BlogPost } from "$lib/types";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ params, fetch }) => {
  let response = await fetch("/api/blog-posts");
  let posts: BlogPost[] = await response.json();

	try {
		const post = await import(`../../../lib/posts/${params.slug}.svx`)

		return {
			content: post.default,
			meta: post.metadata,
			slug: params.slug,
			posts: posts,
		}
	} catch (e) { error(404, `Unable to Load Blog Post ${params.slug}`) }
}