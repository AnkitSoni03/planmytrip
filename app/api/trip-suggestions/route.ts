import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.HUGGINGFACE_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 },
      )
    }

    const body = await request.json()
    console.log("Request body:", body)

    const { duration, location, distance, people, tripType, budget, additionalPreferences } = body

    if (!duration || !location || !distance || !people || !tripType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Dynamic prompt jo user ke exact inputs use karega
    const prompt = `As a travel expert, create a COMPLETELY DYNAMIC and PERSONALIZED trip plan based on EXACT user preferences.

USER'S EXACT REQUIREMENTS:
- They are starting from: ${location}
- Trip duration: ${duration}
- Preferred travel distance: ${distance}
- Traveling as: ${people}
- Type of trip they want: ${tripType}
- Their budget: ${budget}
- Additional preferences: ${additionalPreferences || "None mentioned"}

IMPORTANT: DO NOT use generic destinations. Recommend places that make sense for:
- Someone starting from ${location}
- Who wants to travel ${distance}
- For ${duration} with ${people}
- Interested in ${tripType} experiences
- With ${budget} budget

Think step by step:
1. First, consider realistic destinations from ${location} within ${distance} range
2. Filter destinations suitable for ${duration} trip
3. Select places perfect for ${people} 
4. Choose spots known for ${tripType} activities
5. Ensure options fit ${budget} budget
6. Consider: ${additionalPreferences || "no special preferences"}

Provide SPECIFIC, REAL destinations that actually match these exact criteria. Include:
- Why each destination perfectly matches their specific requirements
- Exact travel details from ${location}
- Activities that match ${tripType}
- Accommodation options for ${people} within ${budget}
- Real local food suggestions
- Practical tips for their situation

Be very specific and personalized to their exact inputs.`

    console.log("Calling Hugging Face API with dynamic prompt...")

    let suggestions = ""

    // Better models try karte hain
    const models = [
      "microsoft/DialoGPT-large",
      "facebook/blenderbot-400M-distill",
      "google/flan-t5-xl"
    ]

    for (const model of models) {
      try {
        console.log(`Trying model: ${model}`)
        
        const response = await fetch(
          `https://api-inference.huggingface.co/models/${model}`,
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              inputs: prompt,
              parameters: {
                max_new_tokens: 2000,
                temperature: 0.9, // More creative
                do_sample: true,
                return_full_text: false,
                repetition_penalty: 1.2
              }
            }),
          }
        )

        if (response.ok) {
          const result = await response.json()
          console.log("API Response:", result)
          
          let generatedText = ""
          if (Array.isArray(result) && result[0] && result[0].generated_text) {
            generatedText = result[0].generated_text
          } else if (result.generated_text) {
            generatedText = result.generated_text
          }

          if (generatedText) {
            // Check karo kya response actually dynamic hai
            if (isResponseDynamic(generatedText, body)) {
              suggestions = cleanResponse(generatedText)
              break
            }
          }
        }
      } catch (error) {
        console.log(`Model ${model} failed:`, error)
        continue
      }
    }

    // Agar response dynamic nahi hai toh intelligent fallback
    if (!suggestions || !isResponseDynamic(suggestions, body)) {
      console.log("Using intelligent dynamic fallback")
      suggestions = generateIntelligentDynamicResponse(body)
    }

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: "Failed to generate suggestions" },
      { status: 500 },
    )
  }
}

// Check karo kya response actually user inputs use kar raha hai
function isResponseDynamic(text: string, preferences: any): boolean {
  const { location, duration, distance, people, tripType, budget } = preferences
  
  const checks = [
    text.toLowerCase().includes(location.toLowerCase()),
    text.toLowerCase().includes(duration.toLowerCase()),
    text.toLowerCase().includes(tripType.toLowerCase()),
    text.toLowerCase().includes(people.toLowerCase()),
    text.length > 300 // Reasonable length check
  ]

  return checks.filter(Boolean).length >= 3
}

// Intelligent dynamic response based on actual inputs
function generateIntelligentDynamicResponse(preferences: any): string {
  const { duration, location, distance, people, tripType, budget, additionalPreferences } = preferences

  // Destination logic based on actual inputs
  const destinations = getDynamicDestinations(preferences)
  
  let response = `Perfect! Based on your specific requirements, I've created a personalized trip plan for you:

YOUR TRAVEL PROFILE:
- Starting from: ${location}
- Trip duration: ${duration}
- Travel distance: ${distance}
- Traveling as: ${people}
- Trip type: ${tripType}
- Budget: ${budget}
- ${additionalPreferences ? `Additional preferences: ${additionalPreferences}` : ''}

RECOMMENDED DESTINATIONS:

`

  destinations.forEach((dest, index) => {
    response += `${index + 1}. ${dest.name}\n`
    response += `   Perfect because: ${dest.reason}\n`
    response += `   Travel from ${location}: ${dest.travel}\n`
    response += `   Best for ${tripType}: ${dest.activities.join(', ')}\n`
    response += `   ${people} accommodation: ${dest.accommodation}\n`
    response += `   Local experiences: ${dest.experiences.join(', ')}\n`
    response += `   Tips: ${dest.tips}\n\n`
  })

  response += `YOUR ${duration.toUpperCase()} ITINERARY:\n`
  response += getDynamicItinerary(preferences)

  response += `\nBUDGET PLANNING (${budget}):\n`
  response += getDynamicBudget(preferences)

  response += `\nTRAVEL TIPS FOR YOUR SPECIFIC TRIP:\n`
  response += getDynamicTips(preferences)

  return response
}

// Dynamic destinations based on actual inputs
function getDynamicDestinations(preferences: any) {
  const { location, distance, tripType, people, budget } = preferences

  // Different logic for different starting locations
  const locationBasedDestinations = {
    // North India locations
    delhi: [
      {
        name: "Rishikesh, Uttarakhand",
        reason: `Perfect for ${tripType} and within ${distance} range from ${location}`,
        travel: "6-7 hours by road (₹500-₹1,200 per person)",
        activities: getActivitiesByType(tripType, "rishikesh"),
        accommodation: getAccommodationByBudget(budget, people),
        experiences: ["Ganga Aarti", "Local cafes", "Adventure sports"],
        tips: "Book rafting in advance, carry river shoes"
      },
      {
        name: "Jaipur, Rajasthan", 
        reason: `Rich ${tripType} experiences accessible from ${location}`,
        travel: "5-6 hours by road or 1-hour flight",
        activities: getActivitiesByType(tripType, "jaipur"),
        accommodation: getAccommodationByBudget(budget, people),
        experiences: ["Fort visits", "Local markets", "Traditional food"],
        tips: "Hire guide for historical sites, bargain in markets"
      }
    ],
    // South India locations  
    chennai: [
      {
        name: "Pondicherry",
        reason: `Beautiful ${tripType} destination within ${distance} from ${location}`,
        travel: "3-4 hours by road (₹400-₹800 per person)",
        activities: getActivitiesByType(tripType, "pondicherry"),
        accommodation: getAccommodationByBudget(budget, people),
        experiences: ["French colony", "Beach cycling", "Auroville"],
        tips: "Book heritage stays in advance, try French cuisine"
      }
    ],
    // Default destinations
    default: [
      {
        name: "Nearest Hill Station",
        reason: `Perfect ${tripType} getaway within ${distance} from ${location}`,
        travel: "Based on your distance preference",
        activities: getActivitiesByType(tripType, "hills"),
        accommodation: getAccommodationByBudget(budget, people),
        experiences: ["Local culture", "Nature walks", "Regional food"],
        tips: "Check weather, book in advance, carry appropriate gear"
      },
      {
        name: "Cultural Heritage City",
        reason: `Rich ${tripType} experiences from ${location}`,
        travel: "Accessible within your preferred distance",
        activities: getActivitiesByType(tripType, "cultural"),
        accommodation: getAccommodationByBudget(budget, people),
        experiences: ["Local festivals", "Traditional crafts", "Heritage sites"],
        tips: "Learn local customs, try street food, respect culture"
      }
    ]
  }

  const cityKey = location.toLowerCase().includes('delhi') ? 'delhi' : 
                  location.toLowerCase().includes('chennai') ? 'chennai' : 'default'

  return locationBasedDestinations[cityKey]
}

// Dynamic activities based on trip type
function getActivitiesByType(tripType: string, destination: string) {
  const activities: any = {
    adventure: {
      rishikesh: ["River Rafting (₹1,500-₹2,500)", "Bungee Jumping", "Camping", "Trekking"],
      jaipur: ["Hot Air Balloon", "Zip Lining", "Desert Safari"],
      default: ["Trekking", "Adventure sports", "Exploring nature"]
    },
    historical: {
      jaipur: ["Amber Fort Visit", "City Palace Tour", "Jantar Mantar"],
      default: ["Heritage walks", "Museum visits", "Ancient site exploration"]
    },
    beaches: {
      pondicherry: ["Beach Relaxation", "Water Sports", "Coastal Walks"],
      default: ["Swimming", "Beach games", "Sunset viewing"]
    },
    mountains: {
      rishikesh: ["Valley Trekking", "Mountain Views", "Nature Photography"],
      default: ["Mountain trekking", "Scenic views", "Hill station exploration"]
    }
  }

  return activities[tripType]?.[destination] || activities[tripType]?.default || ["Local exploration", "Sightseeing", "Cultural experiences"]
}

// Dynamic accommodation based on budget and group
function getAccommodationByBudget(budget: string, people: string) {
  const accommodations: any = {
    budget: {
      solo: "Hostels (₹500-₹800/night)",
      couple: "Budget hotels (₹800-₹1,200/night)", 
      group: "Guest houses (₹1,500-₹2,500 for 3-4 people)"
    },
    "mid-range": {
      solo: "3-star hotels (₹1,200-₹2,000/night)",
      couple: "Boutique hotels (₹1,800-₹3,000/night)",
      group: "Service apartments (₹3,000-₹5,000 for group)"
    },
    luxury: {
      solo: "5-star hotels (₹3,500+/night)",
      couple: "Luxury resorts (₹5,000+/night)",
      group: "Villas (₹8,000+ for group)"
    }
  }

  return accommodations[budget]?.[people.includes('solo') ? 'solo' : people.includes('couple') ? 'couple' : 'group'] || "Comfortable stays within your budget"
}

// Dynamic itinerary
function getDynamicItinerary(preferences: any) {
  const { duration, tripType, people } = preferences
  
  const itineraries: any = {
    "1-2": `Day 1: Travel from your location, check-in, initial ${tripType} experience
Day 2: Deep dive into ${tripType} activities, local culture, return journey\n`,
    
    "3-5": `Day 1: Arrival and settling in, local exploration
Day 2: Main ${tripType} activities and experiences  
Day 3: Additional exploration or relaxation
Day 4: Cultural immersion and local food
Day 5: Souvenir shopping and return journey\n`,
    
    "1-week": `Extended exploration with deeper cultural immersion and multiple ${tripType} experiences\n`
  }

  return itineraries[duration] || itineraries["3-5"]
}

// Dynamic budget
function getDynamicBudget(preferences: any) {
  const { budget, duration, people } = preferences
  
  const budgets: any = {
    budget: `- Transportation: ₹1,000-₹3,000
- Accommodation: ₹${500 * getDurationNights(duration)}-₹${800 * getDurationNights(duration)}
- Food & Activities: ₹1,500-₹3,000
- Total estimate: ₹${3000 + (500 * getDurationNights(duration))}-₹${6000 + (800 * getDurationNights(duration))}`,
    
    "mid-range": `- Transportation: ₹3,000-₹6,000  
- Accommodation: ₹${1200 * getDurationNights(duration)}-₹${2000 * getDurationNights(duration)}
- Food & Activities: ₹3,000-₹5,000
- Total estimate: ₹${6000 + (1200 * getDurationNights(duration))}-₹${11000 + (2000 * getDurationNights(duration))}`,
    
    luxury: `- Transportation: ₹6,000-₹12,000+
- Accommodation: ₹${2500 * getDurationNights(duration)}+
- Food & Activities: ₹5,000-₹10,000+
- Total estimate: ₹${11000 + (2500 * getDurationNights(duration))}+`
  }

  return budgets[budget] || budgets["mid-range"]
}

// Dynamic tips
function getDynamicTips(preferences: any) {
  const { people, tripType, location, duration } = preferences
  
  let tips = `- Book in advance for ${people}`
  tips += `\n- Carry appropriate gear for ${tripType}`
  tips += `\n- Research local customs in ${location}`
  tips += `\n- Keep ${duration} timeline in mind`
  tips += `\n- Stay hydrated and carry essentials`
  
  return tips
}

// Helper function
function getDurationNights(duration: string): number {
  const nights: any = {
    "1-2": 1,
    "3-5": 3,
    "1-week": 6,
    "2-weeks": 13
  }
  return nights[duration] || 2
}

function cleanResponse(text: string): string {
  return text.replace(/\*\*/g, '').replace(/\*/g, '').trim()
}