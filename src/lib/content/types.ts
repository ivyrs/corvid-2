/** biome-ignore-all lint/style/useTemplate: it feels more correct idk */
import { mediaTypeComment, mediaTypeIcon } from "./media";

// change border on <main> depending on a path
export function setTypeBorder(input: string) {
	const personal = ["hello", "contact", "about", "now", "donate"];
	const pathSegment = input.split("/")[1];
	const border = "border-l-8 border-double "
	
	if (personal.includes(pathSegment)) {
		return border + "border-l-ml-lavender";
	}

	switch (pathSegment) {
		case "status":
			return border + "border-l-light-bl dark:border-l-dark-bl";
		case "links":
			return border + "border-l-light-cy";
		case "media":
			return border + "border-l-light-re dark:border-l-dark-re";
		case "blog":
			return border + "border-l-light-or dark:border-l-dark-or";
		default:
			return border;
	}
}

// Get type-specific styling
export const getTypeStyles = (type: string) => {
	switch (type) {
		case "status":
			return "border-l-light-bl dark:border-l-dark-bl";
		case "media":
			return "border-l-light-re dark:border-l-dark-re";
		case "link":
			return "border-l-light-cy dark:border-l-dark-cy";
		default:
			return "border-l-gray";
	}
};

export const getTypeComment = (type: string, mediaType: string | undefined) => {
	switch (type) {
		case "status":
			return "A status...";
		case "link":
			return "A link...";
		case "media":
			return mediaTypeComment(mediaType);
		default:
			return "oh no, type comment is broken";
	}
};

export const getTypeIcon = (
	type: string,
	mediaType: string | undefined,
	icon: string,
) => {
	if (icon && icon !== "fa-solid fa-star") return icon;
	switch (type) {
		case "status":
			return "fa-solid fa-comment";
		case "media":
			return mediaTypeIcon(mediaType);
		case "link":
			return "fa-solid fa-link";
		default:
			return icon;
	}
};

export const getTypeLink = (type: string) => {
	switch (type) {
		case "status":
			return "status";
		case "media":
			return "media";
		case "link":
			return "links";
		default:
			return "fuck";
	}
};
