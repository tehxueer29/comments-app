import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const headersList = await headers();
  const postID = headersList.get("postID") ?? "";

  if (postID) {
    const post = await prisma.post.findUnique({
      where: { id: postID },
    });

    return NextResponse.json(
      {
        message: "Fetched post successfully",
        data: post,
      },
      {
        status: 200,
      }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const limit: number = searchParams.get("limit")
    ? parseInt(searchParams.get("limit")!)
    : 50;
  const offset: number =
    ((searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1) - 1) *
    limit;

  const [posts, postCount] = await Promise.all([
    prisma.post.findMany(),
    prisma.post.count(),
  ]);

  return NextResponse.json(
    {
      message: "Fetched posts successfully",
      pagination: {
        total: postCount,
        limit: limit,
        offset: offset,
      },
      data: posts,
    },
    {
      status: 200,
    }
  );
}
