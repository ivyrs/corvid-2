import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const pattern = ["*.md", "*.mdx"]
const path = "content/"

const blog = defineCollection({
  loader: glob({ pattern: pattern, base: path + "blog" }),
  schema: z.object({
    date: z.date(),
    title: z.string(),
    tags: z.array(z.string()).optional(),
    tldr: z.string().optional(),
    publish: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: pattern, base: path + "pages" }),
  schema: z.object(
    {
      date: z.date().optional(),
      title: z.string().optional(),
      desc: z.string().optional(),
      hide: z.boolean().default(false), // hides from /more
      icon: z.string().default("fa-solid fa-star")
    }
  )
});

const now = defineCollection({
  loader: glob({ pattern: pattern, base: path + "now" })
})

export const collections = { blog, pages, now };
