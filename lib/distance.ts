export interface Coordinates {
  lat: number;
  lon: number;
}

export interface DistanceResult {
  distance: number; // in km
  duration: number; // in minutes
}

// Geocode place name to coordinates
export async function geocodePlace(place: string): Promise<Coordinates> {
  try {
    const response = await fetch(
      `https://api.openrouteservice.org/geocode/search?api_key=${process.env.ORS_API_KEY}&text=${encodeURIComponent(place)}`
    );
    
    if (!response.ok) {
      throw new Error(`Geocoding failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.features || data.features.length === 0) {
      throw new Error(`Location not found: ${place}`);
    }
    
    const [lon, lat] = data.features[0].geometry.coordinates;
    return { lat, lon };
  } catch (error) {
    console.error('Geocoding error:', error);
    throw new Error(`Could not find coordinates for: ${place}`);
  }
}

// Calculate distance between two coordinates
export async function calculateRouteDistance(
  start: Coordinates,
  end: Coordinates
): Promise<DistanceResult> {
  try {
    const response = await fetch(
      `https://api.openrouteservice.org/v2/directions/driving-car`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': process.env.ORS_API_KEY!,
        },
        body: JSON.stringify({
          coordinates: [
            [start.lon, start.lat],
            [end.lon, end.lat],
          ],
        }),
      }
    );
    
    if (!response.ok) {
      throw new Error(`Routing failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.routes || data.routes.length === 0) {
      throw new Error('No route found');
    }
    
    const route = data.routes[0];
    const distance = route.summary.distance / 1000; // Convert to km
    const duration = route.summary.duration / 60; // Convert to minutes
    
    return {
      distance: Math.round(distance * 100) / 100, // Round to 2 decimal places
      duration: Math.round(duration * 100) / 100,
    };
  } catch (error) {
    console.error('Routing error:', error);
    throw new Error('Could not calculate route distance');
  }
}

// Calculate total amount
export function calcTotalAmount(distance: number): { amount: number; breakdown: { distanceCharge: number; driverCharge: number } } {
  const ratePerKm = 9;
  const driverCharge = 500;
  
  const distanceCharge = distance * ratePerKm;
  const totalAmount = distanceCharge + driverCharge;
  
  return {
    amount: Math.round(totalAmount),
    breakdown: {
      distanceCharge: Math.round(distanceCharge),
      driverCharge
    }
  };
}

// Main function to get distance and amount between two places
export async function getDistanceAndAmount(startPlace: string, endPlace: string): Promise<{
  distance: number;
  duration: number;
  amount: number;
  breakdown: { distanceCharge: number; driverCharge: number };
}> {
  try {
    const startCoords = await geocodePlace(startPlace);
    const endCoords = await geocodePlace(endPlace);
    
    const { distance, duration } = await calculateRouteDistance(startCoords, endCoords);
    const { amount, breakdown } = calcTotalAmount(distance);
    
    return {
      distance,
      duration,
      amount,
      breakdown
    };
  } catch (error) {
    console.error('Distance calculation error:', error);
    throw error;
  }
}