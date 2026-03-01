import { getCollection } from "astro:content";

export async function getBlogPosts(tag?: string) {
  const posts = await getCollection("blog", ({ data }) => {
    const isPublished =
      import.meta.env.PROD ? data.publish !== false : true;

    const matchesTag = tag
      ? data.tags?.includes(tag)
      : true;

    return isPublished && matchesTag;
  });

  return posts.sort(
    (a, b) =>
      new Date(b.data.date).getTime() -
      new Date(a.data.date).getTime()
  );
}

export async function getLatestPost(tag?: string) {
  const posts = await getBlogPosts(tag);
  return posts[0] ?? null;
}