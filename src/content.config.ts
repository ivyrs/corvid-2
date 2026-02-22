import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Blog collection
const blog = defineCollection({
  loader: glob({ pattern: ["*.md", "*.mdx"], base: "content/blog" }),
  schema: z.object({
    date: z.date(),
    title: z.string(),
    tags: z.array(z.string()).optional(),
    tldr: z.string().optional(),
    publish: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: ["*.md", "*.mdx"], base: "content/pages" }),
  schema: z.object(
    {
      date: z.date().optional(),
      title: z.string().optional(),
      desc: z.string().optional(),
      hide: z.boolean().default(false),
      icon: z.string().default("fa-solid fa-star")
    }
  )
});

const now = defineCollection({
  loader: glob({ pattern: ["*.md", "*.mdx"], base: "content/now" })
})

// 4. Export a single `collections` object to register your collection(s)
export const collections = { blog, pages, now };
