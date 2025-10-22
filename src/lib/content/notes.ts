// src/lib/content.ts
import { getCollection, type CollectionEntry } from "astro:content";

// Individual collection getters
export async function getStatusNotes(
	limit?: number,
): Promise<CollectionEntry<"status">[]> {
	const notes = await getCollection("status");
	const sorted = notes.sort(
		(a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
	);
	return limit ? sorted.slice(0, limit) : sorted;
}

export async function getMediaNotes(
	limit?: number,
): Promise<CollectionEntry<"media">[]> {
	const notes = await getCollection("media");
	const sorted = notes.sort(
		(a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
	);
	return limit ? sorted.slice(0, limit) : sorted;
}

export async function getLinkNotes(
	limit?: number,
): Promise<CollectionEntry<"links">[]> {
	const notes = await getCollection("links");
	const sorted = notes.sort(
		(a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
	);
	return limit ? sorted.slice(0, limit) : sorted;
}

// Combined getter for all notes
export async function getAllNotes(limit?: number) {
	const [statusNotes, mediaNotes, linkNotes] = await Promise.all([
		getStatusNotes(),
		getMediaNotes(),
		getLinkNotes(),
	]);

	// Combine and add type info
	const allNotes = [
		...statusNotes.map((note) => ({ ...note, type: "status" as const })),
		...mediaNotes.map((note) => ({ ...note, type: "media" as const })),
		...linkNotes.map((note) => ({ ...note, type: "links" as const })),
	];

	// Sort by date
	const sorted = allNotes.sort(
		(a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
	);

	return limit ? sorted.slice(0, limit) : sorted;
}

// Type-specific helper
export type NoteType = "status" | "media" | "links";
export type AnyNote =
	| CollectionEntry<"status">
	| CollectionEntry<"media">
	| CollectionEntry<"links">;
