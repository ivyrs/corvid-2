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
    bsky: "ivy.rs",
  },
};

export const site = {
  title: "ivy.rs",
  url: "https://ivy.rs",
  desc: `${author.name}'s personal site`,
  nav: [
    {
      href: "/about",
      name: "About",
    },
    {
      href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      name: "click this for cookie"
    },
    {
        href: "/404"
    }
  ],
};

export const settings = {
  analytics: {
    enabled: true,
    source: "goat",
  },
};
