const apiKey = import.meta.env.MINIFLUX_KEY;

async function minifluxAPIRequest(route: string): Promise<Response> {
	if (!apiKey) console.error("NO API KEY FOR MINIFLUX");
	const req = await fetch(`https://rss.houseplants.cloud/v1/${route}`, {
		headers: {
			"X-Auth-Token": import.meta.env.MINIFLUX_KEY,
		},
	});
	return req;
}

export async function getMinifluxFeedCount(): Promise<number> {
	const feeds = await minifluxAPIRequest("feeds");

	const feedData = await feeds.json();
	return feedData.length;
}

export async function getFeedsByCategory(id: number): Promise<Object> {
	return Promise<{}>; //! get to this later
}
