import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      console.error("[v0] GEMINI_API_KEY environment variable is not set")
      return NextResponse.json(
        { error: "API key not configured. Please add GEMINI_API_KEY to your environment variables." },
        { status: 500 },
      )
    }

    console.log("[v0] API key found, initializing Gemini AI")
    const genAI = new GoogleGenerativeAI(apiKey)

    const body = await request.json()
    console.log("[v0] Request body received:", body)

    const { duration, location, distance, people, tripType, budget, additionalPreferences } = body

    // Validate required fields
    if (!duration || !location || !distance || !people || !tripType) {
      console.error("[v0] Missing required fields:", { duration, location, distance, people, tripType })
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create detailed prompt for Gemini
    const prompt = `
You are an expert travel planner and local guide for India and international destinations. Based on the following preferences, suggest 3-4 perfect trip destinations with detailed information:

**Trip Requirements:**
- Duration: ${duration}
- Starting from: ${location}
- Travel distance preference: ${distance}
- Group size: ${people}
- Trip type: ${tripType}
- Budget: ${budget}
- Additional preferences: ${additionalPreferences || "None specified"}

**Please provide:**
1. **Destination recommendations** with reasons why they're perfect for this trip
2. **Best time to visit** and weather considerations
3. **Estimated travel time and cost** from ${location}
4. **Top attractions and activities** that match the ${tripType} preference
5. **Accommodation suggestions** within the ${budget} budget
6. **Local food specialties** to try
7. **Travel tips and important information**
8. **Rough itinerary** for ${duration}

Format your response in a clear, organized manner with proper headings and bullet points. Be specific about costs in Indian Rupees where applicable, and include practical travel advice.

Focus on destinations that are:
- Accessible within the ${distance} range from ${location}
- Perfect for ${people}
- Ideal for ${tripType} experiences
- Within the ${budget} budget range
`

    console.log("[v0] Calling Gemini API...")
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const result = await model.generateContent(prompt)
    const response = await result.response
    const suggestions = response.text()

    console.log("[v0] Successfully generated suggestions")
    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error("[v0] Error generating trip suggestions:", error)

    if (error instanceof Error) {
      if (error.message.includes("API_KEY")) {
        return NextResponse.json(
          { error: "Invalid API key. Please check your GEMINI_API_KEY environment variable." },
          { status: 500 },
        )
      }
      if (error.message.includes("quota")) {
        return NextResponse.json(
          { error: "API quota exceeded. Please try again later or check your Gemini API limits." },
          { status: 500 },
        )
      }
    }

    return NextResponse.json(
      { error: "Failed to generate trip suggestions. Please check your API key and try again." },
      { status: 500 },
    )
  }
}
