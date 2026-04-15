import pkg from "../../package.json";

export function currentEnv(): { mode: string; prod: boolean; dev: boolean } {
	const mode = import.meta.env.MODE;
	const isProd = import.meta.env.PROD;
	const isDev = import.meta.env.DEV;

	return { mode: mode, prod: isProd, dev: isDev };
}

export const e = import.meta.env;

export const astroVersion = pkg.dependencies.astro.substring(1);

export function iconName(icon: string): string {
	if (icon.startsWith("fa6-")) return icon; // astro-icon

	if (icon.startsWith("fa-")) {
		let s = icon.split(/[^a-z]+/g);
		return `fa6-${s[1]}:${s[3]}`;
	}

	return "fa6-solid:web-awesome";
}
