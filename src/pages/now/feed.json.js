import { nowFeedResponse } from "~/lib/feeds";

export async function GET() {
	return nowFeedResponse("json");
}
