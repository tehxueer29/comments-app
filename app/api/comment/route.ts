import prisma from "@/lib/prisma";

import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { getNestedReplies } from "@/lib/utils/helper";

export async function GET(request: NextRequest) {
  const headersList = await headers();
  const postID = headersList.get("postID") ?? "";
  const commentID = headersList.get("commentID") ?? "";

  if (commentID) {
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentID,
        OR: [
          { deletedAt: null },
          { AND: { deletedAt: { not: null }, replies: { some: {} } } },
        ],
      },
      include: {
        user: true,
        ...getNestedReplies(3),
      },
    });

    return NextResponse.json(
      {
        message: "Fetched comment successfully",
        data: comment,
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

  const [comments, commentCount] = await Promise.all([
    await prisma.comment.findMany({
      skip: offset,
      where: {
        parentID: null,
        postID,
        OR: [
          { deletedAt: null },
          { AND: { deletedAt: { not: null }, replies: { some: {} } } },
        ],
      },
      include: {
        user: true,
        ...getNestedReplies(3),
      },
      orderBy: {
        likes: "desc",
      },
      take: limit,
    }),
    prisma.comment.count(),
  ]);

  return NextResponse.json(
    {
      message: "Fetched comments successfully",
      pagination: {
        total: commentCount,
        limit: limit,
        offset: offset,
      },
      data: comments,
    },
    {
      status: 200,
    }
  );
}

export async function POST(request: Request) {
  const res = await request.json();

  try {
    const comment = await prisma.comment.create({
      data: res,
    });

    return NextResponse.json(
      {
        message: "Comment created successfully",
        data: comment,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "An error occurred",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request: Request) {
  const headersList = await headers();
  const id = headersList.get("commentID") ?? "";

  const res = await request.json();

  try {
    const updatedDate = res.likes ? {} : { updatedAt: new Date() };

    const comment = await prisma.comment.update({
      where: {
        id,
      },
      data: { ...res, ...updatedDate },
    });

    return NextResponse.json(
      {
        message: "Comment updated successfully",
        data: comment,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "An error occurred",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE() {
  const headersList = await headers();
  const id = headersList.get("commentID") ?? "";

  try {
    const comment = await prisma.comment.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
        body: "This comment has been deleted",
      },
    });

    return NextResponse.json(
      {
        message: "Comment deleted successfully",
        data: comment,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "An error occurred",
      },
      {
        status: 500,
      }
    );
  }
}
