// src/lib/rss-helpers.ts
import { render } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { marked } from "marked";
import { formattedDate } from "../time";

marked.setOptions({
	breaks: true,
	gfm: true,
});

export function createRSSItem(note: CollectionEntry<"notes">, baseUrl: string) {
	const contentHtml = marked.parse(note.body);

	return {
		title:
			note.data.title ||
			`A status update from ${formattedDate(note.data.date, false)}`,
		pubDate: note.data.date,
		description: contentHtml,
		link: `${baseUrl}/notes/${note.id}/`,
		content: contentHtml,
		categories: note.data.tags || [],
	};
}
