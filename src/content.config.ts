import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const pattern = ["*.md", "*.mdx"];
const p = "content/";

const blog = defineCollection({
	loader: glob({ pattern: pattern, base: p + "blog" }),
	schema: z.object({
		date: z.coerce.date(),
		title: z.string(),
		tags: z.array(z.string()).optional(),
		desc: z.string().optional(),
		publish: z.boolean().default(false),
		icon: z.string().default("fa-solid fa-signature").optional(),
		cw: z.string().optional(),
	}),
});

const pages = defineCollection({
	loader: glob({ pattern: ["**/*.md", "**/*.mdx"], base: p + "pages" }),
	schema: z.object({
		hide: z.boolean().optional().default(false), // hides from /more
		collection: z.boolean().optional().default(false), // shows on /collections instead
		title: z.string().optional(),
		desc: z.string().optional(),
		date: z.date().optional(),
		icon: z.string().optional().default("fa-solid fa-star"),
		related: z.array(z.string()).optional(), // ids of other pages to link at the bottom
	}),
});

const now = defineCollection({
	loader: glob({ pattern: pattern, base: p + "now" }),
});

export const collections = { blog, pages, now };
