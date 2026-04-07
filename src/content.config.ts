import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const pattern = ["*.md", "*.mdx"];
const p = "content/";

const blog = defineCollection({
	loader: glob({ pattern: pattern, base: p + "blog" }),
	schema: z.object({
		date: z.date(),
		title: z.string(),
		tags: z.array(z.string()).optional(),
		tldr: z.string().optional(),
		publish: z.boolean().default(false),
		icon: z.string().optional().default("fa-solid fa-signature"),
	}),
});

const pages = defineCollection({
	loader: glob({ pattern: pattern, base: p + "pages" }),
	schema: z.object({
		date: z.date().optional(),
		title: z.string().optional(),
		desc: z.string().optional(),
		hide: z.boolean().default(false), // hides from /more
		icon: z.string().optional().default("fa-solid fa-star"),
		prefix: z.string().optional().default("/"),
		prefixmeta: z.boolean().optional().default(true),
	}),
});

// const now = defineCollection({
//     loader: glob({ pattern: pattern, base: p + "now" }),
// });

export const collections = { blog, pages /* now */ };
