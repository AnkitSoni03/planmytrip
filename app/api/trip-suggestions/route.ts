import { NextRequest, NextResponse } from "next/server";

interface Destination {
  name: string;
  km: number;
  types: string[];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      duration,
      location,
      distance,
      people,
      tripType,
      budget,
      additionalPreferences = "",
      language = "english",
    } = body;

    const kmMap: Record<string, number> = {
      local: 50,
      nearby: 200,
      state: 500,
      national: 1500,
      india: 5000,
    };

    const kmLimit = kmMap[String(distance).toLowerCase()] || 500;

    const destinations = getDestinations(location, kmLimit, tripType);

    const english = buildEnglishOutput({
      location,
      duration,
      kmLimit,
      people,
      tripType,
      budget,
      preferences: additionalPreferences,
      destinations,
    });

    const hindi = buildHindiOutput(english);

    if (language === "hindi") {
      return NextResponse.json({ suggestions: hindi });
    }

    return NextResponse.json({ suggestions: english });
  } catch (err) {
    console.log("API Error →", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

function getDestinations(location: string, kmLimit: number, tripType: string): Destination[] {
  const db: Record<string, Destination[]> = {
    delhi: [
      { name: "Rishikesh", km: 240, types: ["adventure", "mountains", "spiritual"] },
      { name: "Jaipur", km: 280, types: ["historical", "culture"] },
      { name: "Agra", km: 210, types: ["historical"] },
      { name: "Nainital", km: 300, types: ["mountains", "family"] },
    ],
    mumbai: [
      { name: "Lonavala", km: 85, types: ["nature"] },
      { name: "Mahabaleshwar", km: 260, types: ["nature", "family"] },
      { name: "Goa", km: 585, types: ["beaches", "nightlife"] },
    ],
    bangalore: [
      { name: "Coorg", km: 270, types: ["nature", "mountains"] },
      { name: "Ooty", km: 270, types: ["mountains"] },
      { name: "Mysore", km: 150, types: ["historical"] },
    ],
    chennai: [
      { name: "Pondicherry", km: 160, types: ["beaches"] },
      { name: "Mahabalipuram", km: 60, types: ["historical", "beaches"] },
    ],
  };

  const key = Object.keys(db).find((c) =>
    location.toLowerCase().includes(c)
  );

  let list: Destination[] = key ? db[key] : ([] as Destination[]).concat(...Object.values(db));

  let match = list.filter(
    (d: Destination) =>
      d.km <= kmLimit && d.types.some((t: string) => tripType.includes(t))
  );

  if (!match.length) {
    match = list.filter((d: Destination) => d.km <= kmLimit);
  }

  if (!match.length) return list.slice(0, 3);

  return match;
}

function buildEnglishOutput({
  location,
  duration,
  kmLimit,
  people,
  tripType,
  budget,
  preferences,
  destinations,
}: {
  location: string;
  duration: string;
  kmLimit: number;
  people: string;
  tripType: string;
  budget: string;
  preferences: string;
  destinations: Destination[];
}) {
  let text = `Here is your personalized AI Trip Plan:

STARTING POINT → ${location}
DURATION → ${duration}
MAX DISTANCE → ${kmLimit} km
PEOPLE → ${people}
TRIP TYPE → ${tripType}
BUDGET → ${budget}
PREFERENCES → ${preferences || "None"}

📍 BEST MATCHING DESTINATIONS:\n`;

  destinations.forEach((d: Destination, i: number) => {
    text += `
${i + 1}) ${d.name} (${d.km} km)
• Reason: Matches ${tripType}
• Travel: ${Math.round(d.km / 60)}–${Math.round(d.km / 60) + 2} hrs by road.
• Best For: ${tripType}
• Tips: Book stays early\n`;
  });

  text += `\n📅 ITINERARY:\n${getItinerary(duration, tripType)}`;
  text += `\n💰 BUDGET:\n${getBudget(budget, duration)}`;
  text += `\n📝 TIPS:\n- Carry essentials.\n- Check weather.\n`;
  return text;
}

function buildHindiOutput(eng: string) {
  return `👇 हिंदी ट्रिप प्लान:

${eng
    .replace("Here is your personalized AI Trip Plan:", "आपका पर्सनलाईज़्ड AI ट्रिप प्लान तैयार है:")
    .replace("STARTING POINT", "शुरुआती स्थान")
    .replace("DURATION", "अवधि")
    .replace("MAX DISTANCE", "अधिकतम दूरी")
    .replace("PEOPLE", "लोगों की संख्या")
    .replace("TRIP TYPE", "ट्रिप का प्रकार")
    .replace("BUDGET", "बजट")
    .replace("BEST MATCHING DESTINATIONS", "सबसे उपयुक्त डेस्टिनेशन्स")
  }`;
}

function getItinerary(duration: string, tripType: string) {
  if (duration === "1-2")
    return `Day 1: Arrival + light ${tripType}\nDay 2: Main activities + return`;

  if (duration === "3-5")
    return `Day 1: Arrival\nDay 2–3: Full ${tripType}\nDay 4: Explore\nDay 5: Return`;

  return `Daily plan for ${tripType} trip.`;
}

function getBudget(budget: string, duration: string) {
  if (budget === "budget") return `₹5,000 – ₹12,000 (${duration})`;
  if (budget === "mid-range") return `₹12,000 – ₹30,000 (${duration})`;
  return `₹30,000+ (${duration})`;
}
