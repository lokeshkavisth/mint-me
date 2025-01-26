import { NextResponse } from "next/server";

const GITHUB_API_URL = process.env.NEXT_PUBLIC_GITHUB_API_URL;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`${GITHUB_API_URL}${username}`),
      fetch(`${GITHUB_API_URL}${username}/repos?sort=stars&per_page=5`),
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      throw new Error("Failed to fetch GitHub data");
    }

    const userData = await userResponse.json();
    const reposData = await reposResponse.json();

    return NextResponse.json({ user: userData, topRepos: reposData });
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
