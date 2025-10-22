// lib/external/lastfm.ts
// works with last.fm api
// https://lastfm-docs.github.io/api-docs/
import SimpleFM from "@solely/simple-fm";

const apiKey = import.meta.env.LASTFM_API_KEY;
const ivy = "lxjv"; // my last.fm username
// TODO: put this ^^^ into author
// also change last.fm username
// or make grammo a thing

export const lastfm = new SimpleFM(apiKey);

export async function recentTracks(limit?: number) {
	return await lastfm.user.getRecentTracks({ username: ivy, limit: limit });
}

// async function lfmAPIRequest(
// 	method: string,
// 	limit?: number,
// 	overrideUser?: string,
// ): Promise<Response> {
// 	let user = "lxjv"; // my last.fm uname
// 	if (overrideUser) user = overrideUser;
//
// 	const req = await fetch(
// 		`https://ws.audioscrobbler.com/2.0/?api_key=${apiKey}&method=${method}&user=${user}&format=json${limit && `&limit=${limit}`}`,
// 	);
// 	return req;
// }
//
// export async function lfmGetTracks() {
// 	const req = await lfmAPIRequest("User.getrecenttracks", 1);
// 	console.log(req);
// }
