import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!dbUser) {
      return NextResponse.json({ ok: false, error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const { status } = body;

    // ✅ Await params before using
    const resolvedParams = await params;

    const updated = await prisma.booking.updateMany({
      where: { id: resolvedParams.id, userId: dbUser.id },
      data: { status },
    });

    if (updated.count === 0) {
      return NextResponse.json({ ok: false, error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, message: "Booking updated successfully" });
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}