"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Loader2,
  MapPin,
  Send,
  Calendar,
  Users,
  Star,
  Plane,
  Sparkles,
} from "lucide-react"
import TripSuggestionsModal from "./trip-suggestion-form"

interface TripFormData {
  duration: string
  location: string
  distance: string
  people: string
  tripType: string
  budget: string
  additionalPreferences: string
}

export function TripPlannerForm() {
  const [formData, setFormData] = useState<TripFormData>({
    duration: "",
    location: "",
    distance: "",
    people: "",
    tripType: "",
    budget: "",
    additionalPreferences: "",
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [aiResponse, setAiResponse] = useState({ english: "", hindi: "" })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // First API call for English suggestions
      const response = await fetch("/api/trip-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to get suggestions")

      const data = await response.json()
      const englishResponse = data.suggestions

      // Second API call for Hindi translation
      const resHindi = await fetch("/api/trip-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, language: "hindi" }),
      })
      
      const hindiData = await resHindi.json()
      
      setAiResponse({
        english: englishResponse,
        hindi: hindiData.suggestions || "Hindi translation not available.",
      })
      setModalOpen(true)
    } catch (error) {
      console.error("Error getting trip suggestions:", error)
      setAiResponse({
        english: "❌ Sorry, something went wrong. Please try again.",
        hindi: "❌ क्षमा करें, कुछ गलत हुआ। कृपया पुनः प्रयास करें।"
      })
      setModalOpen(true)
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (field: keyof TripFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-12"
      style={{ backgroundImage: "url('/Backwaters-of-Kerala.png')" }}
    >
      <div className="max-w-7xl w-full backdrop-blur-md bg-black/40 rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 border border-white/20">
        
        {/* Left Info Section */}
        <div className="p-10 bg-gradient-to-br from-black/80 to-red-900/40 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-10">
            <span className="text-orange-500">AI-Powered</span> Trip Planner
          </h2>

          <div className="space-y-6 text-white">
            {[
              {
                icon: "🤖",
                title: "Smart Recommendations",
                desc: "Get cab options tailored to your route, timing & preferences.",
              },
              {
                icon: "💰",
                title: "Affordable Luxury",
                desc: "Save money while enjoying comfort with AI-optimized fares.",
              },
              {
                icon: "⚡",
                title: "Instant Trip Modes",
                desc: "One-way, round-trip or outstation — get instant suggestions.",
              },
              {
                icon: "✨",
                title: "Personalized Journeys",
                desc: "AI learns your habits & suggests travel that suits your vibe.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white/10 hover:bg-white/20 transition transform hover:scale-105"
              >
                <span className="text-red-500 text-2xl">{card.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="text-gray-300 text-sm">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center italic text-gray-300 text-lg">
            "Smarter rides, unforgettable journeys."
          </p>
        </div>

        {/* Right Form Section */}
        <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-red-600 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500" /> Plan Your Trip
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Duration */}
              <div>
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="w-4 h-4 text-red-600" /> Duration
                </Label>
                <Select value={formData.duration} onValueChange={(v) => updateFormData("duration", v)}>
                  <SelectTrigger className="mt-2 rounded-xl border-red-200">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2 Days</SelectItem>
                    <SelectItem value="3-5">3-5 Days</SelectItem>
                    <SelectItem value="1-week">1 Week</SelectItem>
                    <SelectItem value="2-weeks">2 Weeks</SelectItem>
                    <SelectItem value="1-month">1 Month+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div>
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-red-600" /> Starting Location
                </Label>
                <Input
                  value={formData.location}
                  onChange={(e) => updateFormData("location", e.target.value)}
                  placeholder="e.g. Delhi, Mumbai"
                  className="mt-2 rounded-xl"
                  required
                />
              </div>

              {/* Distance */}
              <div>
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Plane className="w-4 h-4 text-red-600" /> Distance
                </Label>
                <Select value={formData.distance} onValueChange={(v) => updateFormData("distance", v)}>
                  <SelectTrigger className="mt-2 rounded-xl border-red-200">
                    <SelectValue placeholder="Select distance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">0-50km</SelectItem>
                    <SelectItem value="nearby">50-200km</SelectItem>
                    <SelectItem value="state">200-500km</SelectItem>
                    <SelectItem value="national">500-1500km</SelectItem>
                    <SelectItem value="international">International</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* People */}
              <div>
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Users className="w-4 h-4 text-red-600" /> People
                </Label>
                <Select value={formData.people} onValueChange={(v) => updateFormData("people", v)}>
                  <SelectTrigger className="mt-2 rounded-xl border-red-200">
                    <SelectValue placeholder="Select group size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solo">Solo</SelectItem>
                    <SelectItem value="couple">Couple</SelectItem>
                    <SelectItem value="small-group">3-5 People</SelectItem>
                    <SelectItem value="large-group">6+ People</SelectItem>
                    <SelectItem value="family">Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Trip Type */}
              <div>
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Star className="w-4 h-4 text-red-600" /> Trip Type
                </Label>
                <Select value={formData.tripType} onValueChange={(v) => updateFormData("tripType", v)}>
                  <SelectTrigger className="mt-2 rounded-xl border-red-200">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="temples">Spiritual</SelectItem>
                    <SelectItem value="mountains">Mountains</SelectItem>
                    <SelectItem value="beaches">Beaches</SelectItem>
                    <SelectItem value="cities">City Life</SelectItem>
                    <SelectItem value="wildlife">Wildlife</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="heritage">Heritage</SelectItem>
                    <SelectItem value="relaxation">Wellness</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Budget */}
              <div>
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <span className="text-red-600">₹</span> Budget
                </Label>
                <Select value={formData.budget} onValueChange={(v) => updateFormData("budget", v)}>
                  <SelectTrigger className="mt-2 rounded-xl border-red-200">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">₹5K-15K</SelectItem>
                    <SelectItem value="mid-range">₹15K-35K</SelectItem>
                    <SelectItem value="luxury">₹35K+</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Additional */}
            <div>
              <Label className="flex items-center gap-2 text-sm font-medium">
                ✨ Special Preferences
              </Label>
              <Textarea
                value={formData.additionalPreferences}
                onChange={(e) => updateFormData("additionalPreferences", e.target.value)}
                placeholder="Hidden gems, food, culture, or things to avoid..."
                className="mt-2 rounded-xl"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-semibold shadow-lg transform transition hover:scale-105"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please wait, Your result is ready in few seconds...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" /> Create My Trip
                </>
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Modal for Suggestions */}
      <TripSuggestionsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        suggestions={aiResponse}
      />
    </div>
  )
}