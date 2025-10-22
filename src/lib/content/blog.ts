import { getCollection } from "astro:content";

export async function getBlogPosts() {
  const posts = await getCollection("blog");
  return posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
}
