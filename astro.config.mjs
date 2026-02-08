// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';

import mdx from '@astrojs/mdx';
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["turing"] // so i can use tailscale magicDNS
    }
  },

  experimental: {
  },

  integrations: [svelte(), mdx(), icon()],

  markdown: {
    shikiConfig: {
      theme: "catppuccin-mocha"
    },
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          content: {
            type: 'raw',
            value: '<i class="fa-solid fa-link"></i>',
          },
          headingProperties: {
            className: ['anchor'],
          },
          properties: {
            className: ['ml-2', 'text-sm', 'anchor-link'],
          },
        },
      ],
    ],
  },
  redirects: {
		"/cv": "https://example.com",
		"/_index": "/"
	}
});