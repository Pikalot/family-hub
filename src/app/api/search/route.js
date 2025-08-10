import { getProjectsByNameAndSkills } from "@/database/queries/user/getProjects";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const query = (searchParams.get("query") || "").trim();

  if (!query) return NextResponse.json([], { status: 200 });

  try {
    const projects = await getProjectsByNameAndSkills({ query });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "search api error" }, { status: 500 });
  }
};
