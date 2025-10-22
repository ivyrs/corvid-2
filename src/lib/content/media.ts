export function mediaTypeIcon(type: string | undefined): string {
	switch (type) {
		case "liked-song":
			return "fa-solid fa-heart";
		case "movie":
			return "fa-solid fa-clapperboard";
		case "album":
			return "fa-solid fa-album";
		case "book":
			return "fa-solid fa-book";
		case "crucial-track": 
			return "fa-solid fa-compact-disc";
		default:
			return "fa-solid fa-play";
	}
}

export function mediaTypeComment(type: string | undefined): string {
	switch (type) {
    case "liked-song":
      return "I liked a song...";
    case "movie":
      return "I watched...";
    case "album":
      return "I listened to...";
    case "book":
      return "I read...";
    case "crucial-track":
      return "New Crucial Track!";

    default:
      return "media journal entry";
  }
}
