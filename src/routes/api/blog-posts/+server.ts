import type { BlogPost } from "$lib/types";
import { json } from '@sveltejs/kit';

const getPosts = async () => {
	let posts: BlogPost[] = [];

	const paths = import.meta.glob("/src/lib/posts/*.svx", { eager: true });

	for(const path in paths) {
		const file = paths[path];
		const slug = path.split("/").at(-1)?.replace(".svx", "");

		if (file && typeof file === "object" && "metadata" in file && slug) {
			const metadata = file.metadata as Omit<BlogPost, "slug">;
			const post = { ...metadata, slug } satisfies BlogPost;

			post.isPublished && posts.push(post);
		}
	}

	posts = posts.sort((first, second) =>
    new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
};

export const GET = async () => {
	const posts = await getPosts();

	return json(posts);
};
