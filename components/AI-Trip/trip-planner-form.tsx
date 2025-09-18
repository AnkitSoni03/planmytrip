"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, MapPin, Send } from "lucide-react"
import { TripSuggestions } from "./trip-suggestions"

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
  const [suggestions, setSuggestions] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuggestions("")

    try {
      const response = await fetch("/api/trip-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to get suggestions")

      const data = await response.json()
      setSuggestions(data.suggestions)
    } catch (error) {
      console.error("Error getting trip suggestions:", error)
      setSuggestions("❌ Sorry, something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (field: keyof TripFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <Card className="bg-white dark:bg-black/50 border border-red-600/30 shadow-lg rounded-2xl transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-black dark:text-white">
            <MapPin className="h-5 w-5 text-red-600" />
            Plan Your Trip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Trip Duration */}
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-black dark:text-white font-medium">
                  Trip Duration
                </Label>
                <Select value={formData.duration} onValueChange={(value) => updateFormData("duration", value)}>
                  <SelectTrigger className="bg-white dark:bg-black/50 border border-red-600/30 text-black dark:text-white focus:ring-2 focus:ring-red-600 transition">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-900 border border-red-600/30">
                    <SelectItem value="1-2">1-2 Days</SelectItem>
                    <SelectItem value="3-5">3-5 Days</SelectItem>
                    <SelectItem value="1-week">1 Week</SelectItem>
                    <SelectItem value="2-weeks">2 Weeks</SelectItem>
                    <SelectItem value="1-month">1 Month+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-black dark:text-white font-medium">
                  Your Current Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => updateFormData("location", e.target.value)}
                  placeholder="e.g., Mumbai, Delhi, Bangalore"
                  className="bg-white dark:bg-black/50 border border-red-600/30 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-red-600 transition"
                  required
                />
              </div>

              {/* Travel Distance */}
              <div className="space-y-2">
                <Label className="text-black dark:text-white font-medium">Preferred Travel Distance</Label>
                <Select value={formData.distance} onValueChange={(value) => updateFormData("distance", value)}>
                  <SelectTrigger className="bg-white dark:bg-black/50 border border-red-600/30 text-black dark:text-white focus:ring-2 focus:ring-red-600 transition">
                    <SelectValue placeholder="Select distance" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-900 border border-red-600/30">
                    <SelectItem value="local">Within City (0-50km)</SelectItem>
                    <SelectItem value="nearby">Nearby (50-200km)</SelectItem>
                    <SelectItem value="state">Within State (200-500km)</SelectItem>
                    <SelectItem value="national">National (500-1500km)</SelectItem>
                    <SelectItem value="international">International</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* People */}
              <div className="space-y-2">
                <Label className="text-black dark:text-white font-medium">Number of People</Label>
                <Select value={formData.people} onValueChange={(value) => updateFormData("people", value)}>
                  <SelectTrigger className="bg-white dark:bg-black/50 border border-red-600/30 text-black dark:text-white focus:ring-2 focus:ring-red-600 transition">
                    <SelectValue placeholder="Select group size" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-900 border border-red-600/30">
                    <SelectItem value="solo">Solo Travel</SelectItem>
                    <SelectItem value="couple">Couple (2 people)</SelectItem>
                    <SelectItem value="small-group">Small Group (3-5 people)</SelectItem>
                    <SelectItem value="large-group">Large Group (6+ people)</SelectItem>
                    <SelectItem value="family">Family with Kids</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Trip Type */}
              <div className="space-y-2">
                <Label className="text-black dark:text-white font-medium">Trip Type Preference</Label>
                <Select value={formData.tripType} onValueChange={(value) => updateFormData("tripType", value)}>
                  <SelectTrigger className="bg-white dark:bg-black/50 border border-red-600/30 text-black dark:text-white focus:ring-2 focus:ring-red-600 transition">
                    <SelectValue placeholder="Select trip type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-900 border border-red-600/30">
                    <SelectItem value="temples">Temples & Spiritual</SelectItem>
                    <SelectItem value="mountains">Mountains & Trekking</SelectItem>
                    <SelectItem value="beaches">Beaches & Coastal</SelectItem>
                    <SelectItem value="cities">Cities & Urban</SelectItem>
                    <SelectItem value="wildlife">Wildlife & Nature</SelectItem>
                    <SelectItem value="adventure">Adventure Sports</SelectItem>
                    <SelectItem value="heritage">Heritage & History</SelectItem>
                    <SelectItem value="relaxation">Relaxation & Wellness</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <Label className="text-black dark:text-white font-medium">Budget Range (per person)</Label>
                <Select value={formData.budget} onValueChange={(value) => updateFormData("budget", value)}>
                  <SelectTrigger className="bg-white dark:bg-black/50 border border-red-600/30 text-black dark:text-white focus:ring-2 focus:ring-red-600 transition">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-900 border border-red-600/30">
                    <SelectItem value="budget">Budget (₹5,000-15,000)</SelectItem>
                    <SelectItem value="mid-range">Mid-range (₹15,000-35,000)</SelectItem>
                    <SelectItem value="luxury">Luxury (₹35,000+)</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Additional Preferences */}
            <div className="space-y-2">
              <Label className="text-black dark:text-white font-medium">Additional Preferences (Optional)</Label>
              <Textarea
                id="additionalPreferences"
                value={formData.additionalPreferences}
                onChange={(e) => updateFormData("additionalPreferences", e.target.value)}
                placeholder="Any specific requirements, interests, or things you want to avoid..."
                className="bg-white dark:bg-black/50 border border-red-600/30 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 min-h-[100px] focus:ring-2 focus:ring-red-600 transition"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !formData.location || !formData.duration}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Getting AI Suggestions...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Get AI Trip Suggestions
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* AI Suggestions Output */}
      {suggestions && <TripSuggestions suggestions={suggestions} />}
    </div>
  )
}