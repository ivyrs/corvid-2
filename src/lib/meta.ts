import { formattedDate } from "./time";
import {site, author} from "~/site.config"

function titleTemplate(input: string): string {
  return `${input} | ${site.title}`;
}

export function titleConstructor(title: string | undefined): string {
  if (!title) return site.title;
  return titleTemplate(title);
}

export function descriptionConstructor(description: string) {
  if (!description) return site.desc;
  return `${description}`;
}

export function noteTitleConstructor(
  input: string | undefined,
  date: Date
): string {
  if (input) return titleTemplate(input);
  return `A note from ${formattedDate(date, true)}`;
}

export function getSocialLinks() {
  const { fedi, bsky } = author.social;

  const fediverse = (() => {
    const [_, username, instance] = fedi.split("@");
    return `https://${instance}/@${username}`;
  })();

  const bluesky = `https://bsky.app/profile/${bsky.replace(/^@/, "")}`;

  return { bsky: bluesky, fedi: fediverse };
}
