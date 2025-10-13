import { NextResponse } from "next/server";
import { getDistanceAndAmount } from "@/lib/distance";

export async function POST(req: Request) {
  try {
    const { pickupLocation, dropLocation } = await req.json();

    if (!pickupLocation || !dropLocation) {
      return NextResponse.json(
        { error: "Pickup and drop locations are required" },
        { status: 400 }
      );
    }

    const fareData = await getDistanceAndAmount(pickupLocation, dropLocation);
    
    return NextResponse.json(fareData);
  } catch (error) {
    console.error("Fare calculation API error:", error);
    return NextResponse.json(
      { error: "Failed to calculate fare" },
      { status: 500 }
    );
  }
}