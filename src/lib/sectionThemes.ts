export type Theme =
	| "gray"
	| "red"
	| "pink"
	| "purple"
	| "blue"
	| "green"
	| "yellow"
	| "orange"
	| "yin";

export const themeClasses = {
	gray: {
		heading: "text-gray-7 dark:text-gray-2",
		border: "border-gray-7 dark:border-gray-2",
		links: "[&_a]:text-gray-7 dark:[&_a]:text-gray-2",
		accent: "[--section-accent:var(--color-gray-7)] dark:[--section-accent:var(--color-gray-2)]",
	},
	red: {
		heading: "text-red-7 dark:text-red-2",
		border: "border-red-7 dark:border-red-2",
		links: "[&_a]:text-red-7 dark:[&_a]:text-red-2",
		accent: "[--section-accent:var(--color-red-7)] dark:[--section-accent:var(--color-red-2)]",
	},
	pink: {
		heading: "text-pink-7 dark:text-pink-2",
		border: "border-pink-7 dark:border-pink-2",
		links: "[&_a]:text-pink-7 dark:[&_a]:text-pink-2",
		accent: "[--section-accent:var(--color-pink-7)] dark:[--section-accent:var(--color-pink-2)]",
	},
	purple: {
		heading: "text-purple-7 dark:text-purple-2",
		border: "border-purple-7 dark:border-purple-2",
		links: "[&_a]:text-purple-7 dark:[&_a]:text-purple-2",
		accent: "[--section-accent:var(--color-purple-7)] dark:[--section-accent:var(--color-purple-2)]",
	},
	blue: {
		heading: "text-blue-7 dark:text-blue-2",
		border: "border-blue-7 dark:border-blue-2",
		links: "[&_a]:text-blue-7 dark:[&_a]:text-blue-2",
		accent: "[--section-accent:var(--color-blue-7)] dark:[--section-accent:var(--color-blue-2)]",
	},
	green: {
		heading: "text-green-7 dark:text-green-2",
		border: "border-green-7 dark:border-green-2",
		links: "[&_a]:text-green-7 dark:[&_a]:text-green-2",
		accent: "[--section-accent:var(--color-green-7)] dark:[--section-accent:var(--color-green-2)]",
	},
	yellow: {
		heading: "text-yellow-7 dark:text-yellow-2",
		border: "border-yellow-7 dark:border-yellow-2",
		links: "[&_a]:text-yellow-7 dark:[&_a]:text-yellow-2",
		accent: "[--section-accent:var(--color-yellow-7)] dark:[--section-accent:var(--color-yellow-2)]",
	},
	orange: {
		heading: "text-orange-7 dark:text-orange-2",
		border: "border-orange-7 dark:border-orange-2",
		links: "[&_a]:text-orange-7 dark:[&_a]:text-orange-2",
		accent: "[--section-accent:var(--color-orange-7)] dark:[--section-accent:var(--color-orange-2)]",
	},
	yin: {
		heading: "text-yin-7 dark:text-yin-2",
		border: "border-yin-7 dark:border-yin-2",
		links: "[&_a]:text-yin-7 dark:[&_a]:text-yin-2",
		accent: "[--section-accent:var(--color-yin-7)] dark:[--section-accent:var(--color-yin-2)]",
	},
} as const satisfies Record<
	Theme,
	{ heading: string; border: string; links: string; accent: string }
>;

export const sectionThemes = {
	about: "purple",
	blog: "blue",
	now: "orange",
	sites: "green",
	status: "yin",
} as const satisfies Record<string, Theme>;

export type Section = keyof typeof sectionThemes;

export function themeForPath(pathname: string): Theme {
	const section = pathname.split("/").filter(Boolean)[0];

	return section && section in sectionThemes
		? sectionThemes[section as Section]
		: "yin";
}
