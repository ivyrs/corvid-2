import { getCollection } from "astro:content";

export async function getNowPosts() {
	const posts = await getCollection("now");

	return posts.sort(
		(a, b) => new Date(b.id).getTime() - new Date(a.id).getTime(),
	);
}
