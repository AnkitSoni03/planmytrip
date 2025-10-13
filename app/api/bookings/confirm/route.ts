import { NextResponse } from "next/server";
import { getDistanceAndAmount } from "@/lib/distance";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pickupLocation, dropLocation, ...bookingData } = body;

    // Calculate fare for the booking
    const fareData = await getDistanceAndAmount(pickupLocation, dropLocation);


    const booking = {
      ...bookingData,
      pickupLocation,
      dropLocation,
      distance: fareData.distance,
      duration: fareData.duration,
      amount: fareData.amount,
      status: 'confirmed'
    };

    return NextResponse.json({ 
      success: true, 
      booking: booking,
      fareDetails: fareData 
    });
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}