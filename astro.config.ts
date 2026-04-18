// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { rehypeFootnoteHr } from "~/lib/rehype";
// https://astro.build/config
export default defineConfig({
	site: "https://ivy.rs",

	integrations: [svelte(), mdx(), icon()],
	vite: {
		plugins: [tailwindcss()],
		server: {
			allowedHosts: ["turing"], // so i can use tailscale magicDNS
		},
	},

	trailingSlash: "never",

	markdown: {
		shikiConfig: {
			theme: "catppuccin-mocha",
		},
		remarkRehype: { footnoteLabel: "footnotes", footnoteLabelTagName: 'h3', footnoteBackLabel: "Back to reference 1" },
		rehypePlugins: [
			rehypeSlug,
			rehypeFootnoteHr,
			[
  				rehypeAutolinkHeadings,
  				{
    				behavior: "append",
    				content: {
      					type: "raw",
      					value: '<i class="fa-solid fa-link"></i>',
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
	},

	experimental: {
		rustCompiler: true,
		contentIntellisense: true,
	},
});
