// lib/distance.ts
export async function geocodePlace(place: string) {
  // Use Nominatim (OpenStreetMap) public API (no API key) for geocoding.
  // Note: Nominatim has usage limits — fine for dev / personal projects.
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    place
  )}&limit=1`;

  const res = await fetch(url, { headers: { "User-Agent": "PlanMyTrip/1.0" } });
  if (!res.ok) throw new Error("Geocoding failed");

  const data = await res.json();
  if (!data || data.length === 0) throw new Error("Location not found");

  const { lat, lon } = data[0];
  return { lat: parseFloat(lat), lon: parseFloat(lon) };
}

export function haversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371; // Earth radius km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

export function calcTotalAmount(distanceKm: number) {
  const rate = Number(process.env.RATE_PER_KM ?? 10); // server-side default
  const driverCharge = Number(process.env.DRIVER_CHARGE ?? 500);
  const amount = Math.round(distanceKm * rate + driverCharge); // round to nearest rupee
  return { amount, rate, driverCharge };
}
