// lib/external/wf.ts
// deals with the WriteFreely API

async function wfAPIRequest(route: string): Promise<Response> {
	const res = await fetch(`https://inr-wf.houseplants.cloud/api/${route}`, {
		headers: {
			Authorization: "Token " + import.meta.env.WF_KEY,
			"Content-Type": "application/json",
		},
	});
	if (!res.ok) {
		throw new Error(`WF API error ${res.status}: ${await res.text()}`);
	}
	return res;
}

/** Fetches & parses the JSON for posts */
export async function getWFPosts(): Promise<any> {
	const res = await wfAPIRequest("me/posts");
	const posts = await res.json();
	return posts.data;
}
