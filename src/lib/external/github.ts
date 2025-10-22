import { Octokit } from "octokit";

const gh = new Octokit({
  auth: import.meta.env.GH_PAT,
});

export async function getAllRepos() {
  const allRepos = await gh.paginate(gh.rest.repos.listForUser, {
    username: "ivyturner",
    per_page: 100,
  });

  return allRepos;
}

// export async function reposByPushDate(repos: type) {
// 	return get;
// }

export function isFork(input: boolean): boolean {
  if (input === true) return true;
  return false;
}

export async function getRepoCommits(
  owner: string,
  repo: string,
  limit: number = 20
) {
  try {
    const response = await gh.rest.repos.listCommits({
      owner,
      repo,
      // FIX: Use the 'limit' parameter to control how many results you get
      per_page: limit,
    });

    // IMPROVEMENT: Use .map() to transform the array directly. It's cleaner!
    const work = response.data.map((commitData) => {
      const message = commitData.commit.message;
      const sha = commitData.sha.substring(0, 7);
      // Return the formatted string for each commit
      return `[${sha}] - ${message.split("\n")[0]}`;
    });

    return work;
  } catch (error) {
    console.error("Error fetching commits with Octokit:", error);
    // Return an empty array on error so the function is type-safe
    return [];
  }
}

export function getSiteCommits(limit?: number) {
  return getRepoCommits("ivyturner", "ivy.rs", limit);
}
