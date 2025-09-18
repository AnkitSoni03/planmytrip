"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Users, Calendar, Compass } from "lucide-react"

interface TripFormData {
  duration: string
  location: string
  maxDistance: string
  numberOfPeople: string
  tripType: string
  budget: string
  additionalPreferences: string
}

interface TripSuggestionFormProps {
  onSubmit: (data: TripFormData) => void
  isLoading?: boolean
}

export default function TripSuggestionForm({ onSubmit, isLoading = false }: TripSuggestionFormProps) {
  const [formData, setFormData] = useState<TripFormData>({
    duration: "",
    location: "",
    maxDistance: "",
    numberOfPeople: "",
    tripType: "",
    budget: "",
    additionalPreferences: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = (field: keyof TripFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-primary">Plan Your Perfect Trip</CardTitle>
        <CardDescription>Tell us your preferences and let AI suggest the best destinations for you</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Trip Duration
            </Label>
            <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
              <SelectTrigger>
                <SelectValue placeholder="How many days?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-2">1-2 days</SelectItem>
                <SelectItem value="3-5">3-5 days</SelectItem>
                <SelectItem value="6-10">6-10 days</SelectItem>
                <SelectItem value="11-15">11-15 days</SelectItem>
                <SelectItem value="15+">More than 15 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Current Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Your Current Location
            </Label>
            <Input
              id="location"
              placeholder="e.g., Mumbai, Delhi, Bangalore"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              required
            />
          </div>

          {/* Max Distance */}
          <div className="space-y-2">
            <Label htmlFor="maxDistance" className="flex items-center gap-2">
              <Compass className="w-4 h-4" />
              Maximum Travel Distance
            </Label>
            <Select value={formData.maxDistance} onValueChange={(value) => handleInputChange("maxDistance", value)}>
              <SelectTrigger>
                <SelectValue placeholder="How far are you willing to travel?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="within-state">Within State (0-500 km)</SelectItem>
                <SelectItem value="nearby-states">Nearby States (500-1000 km)</SelectItem>
                <SelectItem value="anywhere-india">Anywhere in India (1000+ km)</SelectItem>
                <SelectItem value="international">International</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Number of People */}
          <div className="space-y-2">
            <Label htmlFor="numberOfPeople" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Number of Travelers
            </Label>
            <Select
              value={formData.numberOfPeople}
              onValueChange={(value) => handleInputChange("numberOfPeople", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="How many people?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solo">Solo (1 person)</SelectItem>
                <SelectItem value="couple">Couple (2 people)</SelectItem>
                <SelectItem value="small-group">Small Group (3-5 people)</SelectItem>
                <SelectItem value="large-group">Large Group (6+ people)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Trip Type */}
          <div className="space-y-2">
            <Label htmlFor="tripType">Trip Type & Interests</Label>
            <Select value={formData.tripType} onValueChange={(value) => handleInputChange("tripType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="What kind of experience do you want?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="temples-spiritual">Temples & Spiritual Places</SelectItem>
                <SelectItem value="mountains-trekking">Mountains & Trekking</SelectItem>
                <SelectItem value="beaches-coastal">Beaches & Coastal Areas</SelectItem>
                <SelectItem value="historical-heritage">Historical & Heritage Sites</SelectItem>
                <SelectItem value="wildlife-nature">Wildlife & Nature</SelectItem>
                <SelectItem value="adventure-sports">Adventure Sports</SelectItem>
                <SelectItem value="city-culture">City Life & Culture</SelectItem>
                <SelectItem value="food-culinary">Food & Culinary Tours</SelectItem>
                <SelectItem value="relaxation-wellness">Relaxation & Wellness</SelectItem>
                <SelectItem value="mixed-variety">Mixed Variety</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <Label htmlFor="budget">Budget Range (per person)</Label>
            <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
              <SelectTrigger>
                <SelectValue placeholder="What's your budget?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">Budget (₹5,000 - ₹15,000)</SelectItem>
                <SelectItem value="moderate">Moderate (₹15,000 - ₹30,000)</SelectItem>
                <SelectItem value="premium">Premium (₹30,000 - ₹50,000)</SelectItem>
                <SelectItem value="luxury">Luxury (₹50,000+)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Additional Preferences */}
          <div className="space-y-2">
            <Label htmlFor="additionalPreferences">Additional Preferences (Optional)</Label>
            <Textarea
              id="additionalPreferences"
              placeholder="Any specific requirements, accessibility needs, or special interests..."
              value={formData.additionalPreferences}
              onChange={(e) => handleInputChange("additionalPreferences", e.target.value)}
              rows={3}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading || !formData.location || !formData.duration || !formData.tripType}
          >
            {isLoading ? "Getting AI Suggestions..." : "Get AI Trip Suggestions"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}