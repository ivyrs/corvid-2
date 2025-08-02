export const author = {
  name: "Ivy Turner",
  pronouns: "she/her",
  email: "ivy@ivy.rs", // dynamic??
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
  title: "ivy.rs",
  url: "https://ivy.rs",
  desc: `${author.name}'s personal site`,
  nav: [
    {
      href: "/about",
    },
    {
      href: "/contact",
    },
    {
      href: "/slash"
    }
  ],
};

export const settings = {
  analytics: {
    enabled: true,
    source: "goat",
  },
};
