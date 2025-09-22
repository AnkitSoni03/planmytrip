import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bookingId, rating, comment } = await req.json();
    if (!bookingId || !rating) {
      return NextResponse.json({ error: "Booking ID and rating required" }, { status: 400 });
    }

    // check booking ownership
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking || booking.userId !== userId) {
      return NextResponse.json({ error: "Booking not found or unauthorized" }, { status: 404 });
    }

    // save feedback
    const feedback = await prisma.feedback.create({
      data: {
        bookingId,
        userId,
        rating,
        comment,
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
