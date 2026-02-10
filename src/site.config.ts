function dynamicEmail(): string { // lol
	return "ivy" + "@ivy.rs";
}

export const author = {
	name: "Ivy",
	pronouns: "she/her",
	email: dynamicEmail(),
	work: {
		title: "Freelancer",
		employer: "Love Computer",
	},
	social: {
		fedi: "@ivy@social.lol",
		bsky: "@ivy.rs",
	},
};

export const site = {
	title: "Ivy!",
	url: "https://ivy.rs",
	desc: `${author.name}'s personal site`,
	nav: [
		{
			href: "/now",
		},
		{
			href: "/contact"
		},
		{
			href: "/blog",
		},
		{
			href: "/more"
		}
	],
};

export const settings = {
	analytics: {
		enabled: true,
		source: "goat",
	},
	redir: {
		"/cv": "https://example.com",
		"/_index": "/"
	}
};
