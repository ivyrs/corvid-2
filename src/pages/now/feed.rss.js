import rss from "@astrojs/rss";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

import { site } from "~/site.config";
import { getCollection } from "astro:content";

export async function GET() {
	const blog = await getCollection("now");
	return rss({
		title: site.title,
		description: site.desc,
		site: site.url,

		items: blog.map((post) => ({
			title: post.id,
			pubDate: post.id,
			description: post.body,
			link: `/now#${post.id}`,
			content: sanitizeHtml(parser.render(post.body), {
				allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
			}),
		})),
		customData: `<language>en-gb</language>`,
		trailingSlash: false,
	});
}
