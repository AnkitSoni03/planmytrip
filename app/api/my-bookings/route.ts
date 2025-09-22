import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    // Get status filter from query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    // ✅ Clerk user ko match kar DB user se
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      return NextResponse.json({ ok: false, error: "User not found" }, { status: 404 });
    }

    // ✅ Bookings fetch with optional status filter
    const bookings = await prisma.booking.findMany({
      where: { 
        userId: dbUser.id,
        ...(status && { status: status.toLowerCase() })
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ ok: true, bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}