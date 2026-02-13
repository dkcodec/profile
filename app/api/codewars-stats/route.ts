import { NextResponse } from "next/server";

const CODEWARS_USERNAME = "dkcodec";

export const revalidate = 86400; // 24h

interface CodewarsUser {
  ranks: {
    overall: {
      rank: number;
      name: string;
    };
  };
  honor: number;
  codeChallenges: {
    totalCompleted: number;
  };
}

export async function GET() {
  try {
    const res = await fetch(
      `https://www.codewars.com/api/v1/users/${CODEWARS_USERNAME}`,
      { next: { revalidate: 86400 } },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Codewars API error" },
        { status: 502 },
      );
    }

    const data: CodewarsUser = await res.json();

    return NextResponse.json({
      rank: data.ranks.overall.name,
      honor: data.honor,
      challengesCompleted: data.codeChallenges.totalCompleted,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch Codewars stats" },
      { status: 500 },
    );
  }
}
