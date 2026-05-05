import { site } from "~/site.config";
import { currentEnv } from "./utils";

function showDev(): string {
	return currentEnv().dev ? " (dev)" : "";
}

export function titleConstructor(i: string | undefined): string {
	return i ? `${i} | ${site.title + showDev()}` : site.title + showDev();
}

export function descriptionConstructor(i: string): string {
	return i ? i : site.desc;
}
