import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Base schema for common fields
const baseSchema = z.object({
  date: z.date(),
  tags: z.array(z.string()).optional(),
  icon: z.string().optional().default("fa-solid fa-star"),
  title: z.string().optional(),
  source: z
    .object({
      url: z.string().url().optional(),
      text: z.string(),
    })
    .optional(),
});

// // Status collection
// const status = defineCollection({
//   loader: glob({ pattern: "*.md", base: "content/status" }),
//   schema: baseSchema.extend({
//     mood: z.string().optional(),
//     location: z.string().optional(),
//   }),
// });

// // Media collection
// const media = defineCollection({
//   loader: glob({ pattern: "*.md", base: "content/media" }),
//   schema: baseSchema.extend({
//     type: z.enum(["movie", "book", "album", "liked-song"]),
//   }),
// });

// // Links collection
// const links = defineCollection({
//   loader: glob({ pattern: "*.md", base: "content/links" }),
//   schema: baseSchema.extend({
//     url: z.string().url(),
//     linkTitle: z.string().optional(), // domain name
//     archive: z.string().url().optional(), // archive.org link
//   }),
// });

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

const slash = defineCollection({
  loader: glob({ pattern: ["*.md", "*.mdx"], base: "content/pages" }),
  schema: z.object(
    {
      date: z.date().optional(),
      title: z.string().optional(),
      desc: z.string().optional()
    }
  )
})

// 4. Export a single `collections` object to register your collection(s)
export const collections = { blog, slash };
