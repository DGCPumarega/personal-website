import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`../../../lib/posts/${params.slug}.svx`)

		return {
			content: post.default,
			meta: post.metadata
		}
	} catch (e) { error(404, `Unable to Load Blog Post ${params.slug}`) }
}