import { blogFeedResponse } from "~/lib/feeds";

export async function GET() {
	return blogFeedResponse("json");
}
