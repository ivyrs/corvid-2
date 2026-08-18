import rss from "@astrojs/rss";
import { getBlogPosts, getAllTags } from "~/lib/blog";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

import { site } from "~/site.config";

export async function GET({ params }) {
	const blog = await getBlogPosts(params.tag);
	return rss({
		title: site.title,
		description: site.desc,
		site: site.url,

		items: blog.map((post) => ({
			title: post.data.title,
			pubDate: post.data.date,
			description: post.data.desc,
			link: `/blog/${post.id}`,
			content: sanitizeHtml(
				(post.data.cw ? `<p>cw: ${post.data.cw}</p>` : "") + parser.render(post.body),
				{
					allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
				},
			),
		})),
		customData: `<language>en-gb</language>`,
		trailingSlash: false,
	});
}

export async function getStaticPaths() {
	const tags = await getAllTags();
	return tags.map((tag) => ({
		params: { tag },
	}));
}
