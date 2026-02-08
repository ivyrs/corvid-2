import rss from '@astrojs/rss';
import { getBlogPosts } from '~/lib/content/blog';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

import { site } from '~/site.config';

export async function GET(context) {
  const blog = await getBlogPosts();
  return rss({
    title: site.title,
    description: site.desc,
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.id}/`,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
      }),
    })),
    customData: `<language>en-gb</language>`,
  });
}