import { feedResponse, type Feed, type FeedFormat } from "@ivyrose/feed";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

import { getBlogPosts, getAllTags } from "~/lib/blog";
import { getNowPosts } from "~/lib/now";
import { author, site } from "~/site.config";

const markdown = new MarkdownIt();
const allowedTags = sanitizeHtml.defaults.allowedTags.concat(["img"]);

function absoluteUrl(path: string): string {
	return new URL(path, site.url).href;
}

function renderContent(body: string, contentWarning?: string): string {
	const warning = contentWarning ? `<p>cw: ${contentWarning}</p>` : "";
	return sanitizeHtml(warning + markdown.render(body), { allowedTags });
}

function feedAuthor() {
	return { name: author.name, url: site.url };
}

export async function createBlogFeed(tag?: string): Promise<Feed> {
	const posts = await getBlogPosts(tag);
	const homePath = tag ? `/blog/tags/${encodeURIComponent(tag)}` : "/blog";

	return {
		id: absoluteUrl(homePath),
		title: tag ? `${site.title} - posts tagged ${tag}` : site.title,
		description: tag ? `posts tagged ${tag} from ${site.title}` : site.desc,
		homePageUrl: absoluteUrl(homePath),
		language: "en-GB",
		authors: [feedAuthor()],
		icon: "/img/web-app-manifest-512x512.png",
		favicon: "/img/favicon-96x96-lm.png",
		items: posts.map((post) => ({
			id: absoluteUrl(`/blog/${post.id}`),
			url: absoluteUrl(`/blog/${post.id}`),
			title: post.data.title,
			summary: post.data.desc,
			content: {
				type: "html",
				value: renderContent(post.body ?? "", post.data.cw),
			},
			datePublished: post.data.date,
			tags: post.data.tags,
		})),
	};
}

export async function createNowFeed(): Promise<Feed> {
	const posts = await getNowPosts();

	return {
		id: absoluteUrl("/now"),
		title: `${site.title} - now`,
		description: "what ivy is focused on",
		homePageUrl: absoluteUrl("/now"),
		language: "en-GB",
		authors: [feedAuthor()],
		icon: "/img/web-app-manifest-512x512.png",
		favicon: "/img/favicon-96x96-lm.png",
		items: posts.map((post) => ({
			id: absoluteUrl(`/now#${post.id}`),
			url: absoluteUrl(`/now#${post.id}`),
			title: post.id,
			summary: post.body,
			content: { type: "html", value: renderContent(post.body ?? "") },
			datePublished: post.id,
		})),
	};
}

function formatExtension(format: FeedFormat): string {
	return format === "json" ? "json" : format;
}

export async function blogFeedResponse(format: FeedFormat, tag?: string): Promise<Response> {
	const extension = formatExtension(format);
	const path = tag
		? `/blog/tags/${encodeURIComponent(tag)}.${extension}`
		: `/blog/feed.${extension}`;
	return feedResponse(await createBlogFeed(tag), {
		format,
		feedUrl: absoluteUrl(path),
	});
}

export async function nowFeedResponse(format: FeedFormat): Promise<Response> {
	return feedResponse(await createNowFeed(), {
		format,
		feedUrl: absoluteUrl(`/now/feed.${formatExtension(format)}`),
	});
}

export async function getTagFeedStaticPaths() {
	return (await getAllTags()).map((tag) => ({ params: { tag } }));
}
