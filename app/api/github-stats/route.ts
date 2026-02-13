import { NextResponse } from "next/server";

const GITHUB_USERNAME = "dkcodec";

export const revalidate = 86400; // 24h

interface GitHubRepo {
  stargazers_count: number;
  language: string | null;
  fork: boolean;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
}

export async function GET() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 86400 },
      }),
      fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
        {
          headers: { Accept: "application/vnd.github.v3+json" },
          next: { revalidate: 86400 },
        },
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return NextResponse.json({ error: "GitHub API error" }, { status: 502 });
    }

    const user: GitHubUser = await userRes.json();
    const repos: GitHubRepo[] = await reposRes.json();

    const ownRepos = repos.filter((r) => !r.fork);
    const totalStars = ownRepos.reduce((sum, r) => sum + r.stargazers_count, 0);

    // Count languages
    const langCounts: Record<string, number> = {};
    for (const repo of ownRepos) {
      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
      }
    }

    const topLanguages = Object.entries(langCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    return NextResponse.json({
      repos: user.public_repos,
      followers: user.followers,
      stars: totalStars,
      topLanguages,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch GitHub stats" },
      { status: 500 },
    );
  }
}
