import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// export async function POST(req: Request) {
//   try {
//     const { userId } = await auth();
//     if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
//     if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

//     const body = await req.json();

//     const booking = await prisma.booking.create({
//       data: {
//         userId: dbUser.id,
//         fullName: body.fullName,
//         phone: body.phone,
//         email: body.email,
//         pickupDate: new Date(body.pickupDate),
//         pickupTime: body.pickupTime,
//         pickupLoc: body.pickupLocation,
//         dropLoc: body.dropLocation,
//         passengers: parseInt(body.passengers),
//         tripType: body.direction,
//         vehicleType: body.vehicleType,
//         paymentAmt: parseFloat(body.paymentAmt),
//       },
//     });

//     return NextResponse.json({ ok: true, booking });
//   } catch (err) {
//     console.error("POST /api/bookings error:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }


export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const body = await req.json();

    const booking = await prisma.booking.create({
      data: {
        userId: dbUser.id,
        fullName: body.fullName,
        phone: body.phone,
        email: body.email,
        pickupDate: new Date(body.pickupDate),
        pickupTime: body.pickupTime,
        pickupLoc: body.pickupLocation,
        dropLoc: body.dropLocation,
        passengers: parseInt(body.passengers),
        tripType: body.direction,
        vehicleType: body.vehicleType,
        paymentAmt: parseFloat(body.paymentAmt),
      },
    });

    return NextResponse.json({ ok: true, booking });
  } catch (err: unknown) {
    console.error("POST /api/bookings error:", err);
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
