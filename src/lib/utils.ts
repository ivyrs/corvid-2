export function currentEnv(): { mode: string; prod: boolean; dev: boolean } {
	const mode = import.meta.env.MODE;
	const isProd = import.meta.env.PROD;
	const isDev = import.meta.env.DEV;

	return { mode: mode, prod: isProd, dev: isDev };
}

const FA_FREE_STYLES = new Set(["solid", "regular", "brands"]);

export function iconName(icon: string): string {
	if (icon.startsWith("fa7-") || icon.startsWith("fa-pro/")) return icon; // already resolved

	const match = icon.match(/^fa-([a-z-]+)\s+fa-([a-z0-9-]+)$/);
	if (!match) return "fa7-solid:web-awesome";

	const [, rawStyle, slug] = match;

	// "fa-pro-<style>" forces a local lookup even for an otherwise-free style,
	// since some icons are Pro-gated even within Solid/Regular (e.g. "shelves")
	const isForcedPro = rawStyle.startsWith("pro-");
	const style = isForcedPro ? rawStyle.slice(4) : rawStyle;

	if (!isForcedPro && FA_FREE_STYLES.has(style)) return `fa7-${style}:${slug}`;

	// Pro icon/style — served from src/icons/fa-pro/<style>/<slug>.svg
	return `fa-pro/${style}/${slug}`;
}
