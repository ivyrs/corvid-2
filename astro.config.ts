// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";

import { unified } from "@astrojs/markdown-remark";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
// import { rehypeFootnoteHr } from "~/lib/rehype";

export default defineConfig({
	site: "https://ivyro.se",

	integrations: [svelte(), mdx(), icon()],
	vite: {
		plugins: [tailwindcss()],
		server: {
			allowedHosts: ["aspen", "alder", "alder.ocelot-perch.ts.net"], // so i can use tailscale magicDNS
		},
	},

	trailingSlash: "never",

	markdown: {
		processor: unified({
			remarkRehype: {
				footnoteLabel: "footnotes",
				footnoteLabelTagName: "h3",
				footnoteBackLabel: "Back to reference 1",
			},
			rehypePlugins: [
				rehypeSlug,
				// rehypeFootnoteHr,
				[
					rehypeAutolinkHeadings,
					{
						behavior: "append",
						content: {
							type: "element",
							tagName: "i",
							properties: { className: ["fa-solid", "fa-link"] },
							children: [],
						},
						headingProperties: {
							className: ["anchor", "group"],
						},
						properties: {
							className: [
								"ml-3",
								"text-base",
								"anchor-link",
								"opacity-0",
								"group-hover:opacity-100",
								"transition-opacity",
								"duration-100",
							],
						},
					},
				],
			],
		}),
		shikiConfig: {
			theme: "catppuccin-mocha",
		},
	},

	experimental: {
		contentIntellisense: true,
	},
});
