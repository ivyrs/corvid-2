import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentials
export const ghostClient = new GhostContentAPI({
	url: import.meta.env.GHOST_API_HOST,
	key: import.meta.env.GHOST_API_KEY,
	version: "v5.0",
});

export async function inrPosts() {
	return await ghostClient.posts
		.browse({
			limit: "all",
		})
		.catch((err) => {
			console.error(err);
		});
}
