function dynamicEmail(): string { // lol
	return "ivy" + "@ivy.rs";
}

export const author = {
	name: "ivy",
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
	title: "ivy!",
	url: "https://ivy.rs",
	desc: `${author.name}'s personal site`,
};

export const settings = {
	analytics: {
		enabled: true,
		source: "goat",
	},
};
