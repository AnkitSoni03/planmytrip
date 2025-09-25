import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { sendBookingCancellationEmail } from '@/lib/email-cancel-service';

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
    const { status, cancellationReason } = body; // Accept cancellation reason

    // ✅ Await params before using
    const resolvedParams = await params;

    // First get the booking details before updating
    const existingBooking = await prisma.booking.findFirst({
      where: { id: resolvedParams.id, userId: dbUser.id },
      include: {
        user: {
          select: {
            email: true,
            name: true
          }
        }
      }
    });

    if (!existingBooking) {
      return NextResponse.json({ ok: false, error: "Booking not found" }, { status: 404 });
    }

    // Update the booking
    const updatedBooking = await prisma.booking.update({
      where: { id: resolvedParams.id },
      data: { status },
      include: {
        user: {
          select: {
            email: true,
            name: true
          }
        }
      }
    });

    // Send cancellation email if status is canceled
    if (status === "canceled" || status === "cancelled") {
      try {
        const bookingDetails = {
          bookingId: updatedBooking.id,
          from: updatedBooking.pickupLoc,
          to: updatedBooking.dropLoc,
          date: new Date(updatedBooking.pickupDate).toLocaleDateString("en-IN"),
          time: updatedBooking.pickupTime,
          amount: updatedBooking.paymentAmt,
          passengerName: updatedBooking.fullName
        };

        const userEmail = updatedBooking.email || updatedBooking.user?.email;
        const userName = updatedBooking.fullName || updatedBooking.user?.name || "Customer";

        if (userEmail) {
          await sendBookingCancellationEmail(
            userEmail, 
            userName, 
            bookingDetails, 
            cancellationReason
          );
          console.log("Cancellation email sent successfully");
        }
      } catch (emailError) {
        console.error("Failed to send cancellation email:", emailError);
        // Continue even if email fails
      }
    }

    const responseData = {
      ok: true,
      message: "Booking updated successfully",
      booking: {
        id: updatedBooking.id,
        fullName: updatedBooking.fullName,
        email: updatedBooking.email || updatedBooking.user?.email,
        pickupLoc: updatedBooking.pickupLoc,
        dropLoc: updatedBooking.dropLoc,
        pickupDate: updatedBooking.pickupDate,
        pickupTime: updatedBooking.pickupTime,
        vehicleType: updatedBooking.vehicleType,
        paymentAmt: updatedBooking.paymentAmt,
        status: updatedBooking.status,
        createdAt: updatedBooking.createdAt
      }
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}