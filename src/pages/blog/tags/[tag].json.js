import { blogFeedResponse, getTagFeedStaticPaths } from "~/lib/feeds";

export async function GET({ params }) {
	return blogFeedResponse("json", params.tag);
}

export const getStaticPaths = getTagFeedStaticPaths;
