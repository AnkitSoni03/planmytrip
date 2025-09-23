import { NextResponse } from "next/server";
import { geocodePlace, haversineDistanceKm, calcTotalAmount } from "@/lib/distance";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { pickupLoc, dropLoc } = body;

//     if (!pickupLoc || !dropLoc) {
//       return NextResponse.json({ error: "pickupLoc and dropLoc required" }, { status: 400 });
//     }

//     // 1) geocode both places (may throw)
//     const [p, d] = await Promise.all([geocodePlace(pickupLoc), geocodePlace(dropLoc)]);

//     // 2) distance (km)
//     const distanceKm = haversineDistanceKm(p.lat, p.lon, d.lat, d.lon);

//     // 3) calculate total amount (server-side authoritative)
//     const { amount, rate, driverCharge } = calcTotalAmount(distanceKm);

//     return NextResponse.json({
//       ok: true,
//       preview: {
//         pickupLoc,
//         dropLoc,
//         distanceKm: Number(distanceKm.toFixed(2)),
//         ratePerKm: rate,
//         driverCharge,
//         totalAmount: amount,
//         coords: { pickup: p, drop: d },
//         input: body,
//       },
//     });
//   } catch (err: any) {
//     console.error("Preview error:", err);
//     return NextResponse.json({ error: err?.message ?? "Server error" }, { status: 500 });
//   }
// }



export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pickupLoc, dropLoc } = body;

    if (!pickupLoc || !dropLoc) {
      return NextResponse.json({ error: "pickupLoc and dropLoc required" }, { status: 400 });
    }

    const [p, d] = await Promise.all([geocodePlace(pickupLoc), geocodePlace(dropLoc)]);
    const distanceKm = haversineDistanceKm(p.lat, p.lon, d.lat, d.lon);
    const { amount, rate, driverCharge } = calcTotalAmount(distanceKm);

    return NextResponse.json({
      ok: true,
      preview: {
        pickupLoc,
        dropLoc,
        distanceKm: Number(distanceKm.toFixed(2)),
        ratePerKm: rate,
        driverCharge,
        totalAmount: amount,
        coords: { pickup: p, drop: d },
        input: body,
      },
    });
  } catch (err: unknown) {
    console.error("Preview error:", err);
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
