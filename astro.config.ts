// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";

import mdx from "@astrojs/mdx";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import icon from "astro-icon";

import { h } from 'hastscript';

function rehypeFootnoteHr() {
  return (tree) => {
    const { children } = tree;
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      if (
        node.type === 'element' &&
        node.tagName === 'section' &&
        node.properties?.dataFootnotes !== undefined
      ) {
        children.splice(i, 0, h('hr', { class: 'footnotes-sep' }));
        break;
      }
    }
  };
}

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
