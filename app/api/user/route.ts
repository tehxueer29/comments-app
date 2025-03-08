import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const headersList = await headers();
  const userID = headersList.get("userID") ?? "";

  if (userID) {
    const user = await prisma.user.findUnique({
      where: { id: userID },
    });

    return NextResponse.json(
      {
        message: "Fetched user successfully",
        data: user,
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

  const [users, userCount] = await Promise.all([
    prisma.user.findMany(),
    prisma.user.count(),
  ]);

  return NextResponse.json(
    {
      message: "Fetched users successfully",
      pagination: {
        total: userCount,
        limit: limit,
        offset: offset,
      },
      data: users,
    },
    {
      status: 200,
    }
  );
}
