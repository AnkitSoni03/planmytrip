// app/api/bookings/confirm/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import {
  geocodePlace,
  haversineDistanceKm,
  calcTotalAmount,
} from "@/lib/distance";

export async function POST(req: Request) {
  try {
    // 1) auth verify
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();

    const {
      fullName,
      phone,
      email,
      pickupDate,
      pickupTime,
      pickupLoc,
      dropLoc,
      passengers,
      tripType,
      vehicleType,
      paymentEntered,
    } = body;

    if (!pickupLoc || !dropLoc || paymentEntered == null) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // recalc distance & amount server-side to avoid tampering
    const p = await geocodePlace(pickupLoc);
    const d = await geocodePlace(dropLoc);
    const distanceKm = haversineDistanceKm(p.lat, p.lon, d.lat, d.lon);
    const { amount: expectedAmount } = calcTotalAmount(distanceKm);

    if (Number(paymentEntered) !== Number(expectedAmount)) {
      return NextResponse.json(
        {
          error:
            "Payment mismatch. Entered amount does not match expected amount.",
          expectedAmount,
        },
        { status: 400 }
      );
    }

    // find DB user by clerkId
    const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!dbUser) {
      return NextResponse.json(
        { error: "User not found in DB" },
        { status: 404 }
      );
    }

    // create booking
    const booking = await prisma.booking.create({
      data: {
        userId: dbUser.id,
        fullName: fullName ?? dbUser.name ?? "",
        phone,
        email,
        pickupDate: new Date(pickupDate),
        pickupTime,
        pickupLoc,
        dropLoc,
        passengers: Number(passengers ?? 1),
        tripType,
        vehicleType,
        paymentAmt: Number(expectedAmount),
        status: "confirmed", // since paid (fake)
      },
    });

    return NextResponse.json({ ok: true, booking });
  } catch (err: unknown) {
    console.error("Confirm booking error:", err);
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
