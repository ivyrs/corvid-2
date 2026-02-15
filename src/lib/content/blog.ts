import { getCollection } from "astro:content";

export async function getBlogPosts() {
  const posts = await getCollection("blog", ({ data }) => {
    return import.meta.env.PROD ? data.publish !== false : true;
  });
  return posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
}
