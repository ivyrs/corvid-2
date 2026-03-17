import { site } from "~/site.config";
import { currentEnv } from "./utils";

function showDev(): string {
	if (currentEnv().dev == true) return " (DEV)";
	return "";
}

export function titleConstructor(input: string | undefined): string {
	if (!input) return site.title + showDev();
	return `${input} | ${site.title + showDev()}`;
}

export function descriptionConstructor(description: string) {
	if (!description) return site.desc;
	return `${description}`;
}
