// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';

import mdx from '@astrojs/mdx';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [svelte(), mdx()],

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
  }
});