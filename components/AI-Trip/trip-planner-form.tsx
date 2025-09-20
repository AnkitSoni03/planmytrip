"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  MapPin,
  Send,
  Calendar,
  Users,
  Star,
  Plane,
  Sparkles,
} from "lucide-react";
import TripSuggestionsModal from "./trip-suggestion-form";

interface TripFormData {
  duration: string;
  location: string;
  distance: string;
  people: string;
  tripType: string;
  budget: string;
  additionalPreferences: string;
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
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState({ english: "", hindi: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/trip-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to get suggestions");

      const data = await response.json();
      const englishResponse = data.suggestions;

      const resHindi = await fetch("/api/trip-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, language: "hindi" }),
      });

      const hindiData = await resHindi.json();

      setAiResponse({
        english: englishResponse,
        hindi: hindiData.suggestions || "Hindi translation not available.",
      });
      setModalOpen(true);
    } catch (error) {
      console.error("Error getting trip suggestions:", error);
      setAiResponse({
        english: "❌ Sorry, something went wrong. Please try again.",
        hindi: "❌ क्षमा करें, कुछ गलत हुआ। कृपया पुनः प्रयास करें।",
      });
      setModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: keyof TripFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex justify-center px-4 py-8 mt-2">
      <div className="max-w-5xl w-full rounded-xl shadow-lg overflow-hidden grid md:grid-cols-1 lg:grid-cols-[40%_60%] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700">
        {/* Left Info Section */}
        <div className="p-8 bg-gradient-to-br from-red-900 to-red-700 dark:from-red-800 dark:to-red-600 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">
            AI-Powered <span className="text-red-300">Trip Planner</span>
          </h2>

          <p className="text-red-100 mb-8 text-center">
            Plan your perfect journey with intelligent recommendations tailored
            just for you.
          </p>

          <div className="space-y-5">
            {[
              {
                icon: <Sparkles className="w-5 h-5 text-red-300" />,
                title: "Smart Recommendations",
                desc: "Get personalized options based on your preferences.",
              },
              {
                icon: <Star className="w-5 h-5 text-red-300" />,
                title: "Affordable Luxury",
                desc: "Find the perfect balance between comfort and budget.",
              },
              {
                icon: <Plane className="w-5 h-5 text-red-300" />,
                title: "Multiple Trip Types",
                desc: "One-way, round-trip or outstation — all covered.",
              },
              {
                icon: <Users className="w-5 h-5 text-red-300" />,
                title: "Personalized Journeys",
                desc: "Trips designed around your specific needs and preferences.",
              },
            ].map((card, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-red-800 rounded-full">
                  {card.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{card.title}</h3>
                  <p className="text-sm text-red-200">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Form Section */}
        <div className="p-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-red-900 dark:text-red-400 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-red-600 dark:text-red-400" />{" "}
              Plan Your Trip
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-2">
              Tell us about your travel preferences
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Duration */}
              <div className="w-full">
                <Label className="text-sm font-medium flex items-center gap-1 text-slate-800 dark:text-slate-200">
                  <Calendar className="w-4 h-4 text-red-600 dark:text-red-400" />{" "}
                  Duration
                </Label>
                <Select
                  value={formData.duration}
                  onValueChange={(v) => updateFormData("duration", v)}
                >
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2 Days</SelectItem>
                    <SelectItem value="3-5">3-5 Days</SelectItem>
                    <SelectItem value="1-week">1 Week</SelectItem>
                    <SelectItem value="2-weeks">2 Weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="w-full">
                <Label className="text-sm font-medium flex items-center gap-1 text-slate-800 dark:text-slate-200">
                  <MapPin className="w-4 h-4 text-red-600 dark:text-red-400" />{" "}
                  Starting Location
                </Label>
                <Input
                  value={formData.location}
                  onChange={(e) => updateFormData("location", e.target.value)}
                  placeholder="e.g. Delhi, Mumbai"
                  className="mt-1 w-full"
                  required
                />
              </div>

              {/* Distance */}
              <div className="w-full">
                <Label className="text-sm font-medium flex items-center gap-1 text-slate-800 dark:text-slate-200">
                  <Plane className="w-4 h-4 text-red-600 dark:text-red-400" />{" "}
                  Distance
                </Label>
                <Select
                  value={formData.distance}
                  onValueChange={(v) => updateFormData("distance", v)}
                >
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Select distance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">0-50km</SelectItem>
                    <SelectItem value="nearby">50-200km</SelectItem>
                    <SelectItem value="state">200-500km</SelectItem>
                    <SelectItem value="national">500-1500km</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* People */}
              <div className="w-full">
                <Label className="text-sm font-medium flex items-center gap-1 text-slate-800 dark:text-slate-200">
                  <Users className="w-4 h-4 text-red-600 dark:text-red-400" />{" "}
                  People
                </Label>
                <Select
                  value={formData.people}
                  onValueChange={(v) => updateFormData("people", v)}
                >
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Select group size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solo">Solo</SelectItem>
                    <SelectItem value="couple">Couple</SelectItem>
                    <SelectItem value="small-group">3-5 People</SelectItem>
                    <SelectItem value="large-group">6+ People</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Trip Type */}
              <div className="w-full">
                <Label className="text-sm font-medium flex items-center gap-1 text-slate-800 dark:text-slate-200">
                  <Star className="w-4 h-4 text-red-600 dark:text-red-400" />{" "}
                  Trip Type
                </Label>
                <Select
                  value={formData.tripType}
                  onValueChange={(v) => updateFormData("tripType", v)}
                >
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mountains">Mountains</SelectItem>
                    <SelectItem value="beaches">Beaches</SelectItem>
                    <SelectItem value="cities">City Life</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Budget */}
              <div className="w-full">
                <Label className="text-sm font-medium flex items-center gap-1 text-slate-800 dark:text-slate-200">
                  <span className="text-red-600 dark:text-red-400">₹</span>{" "}
                  Budget
                </Label>
                <Select
                  value={formData.budget}
                  onValueChange={(v) => updateFormData("budget", v)}
                >
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">₹5K-15K</SelectItem>
                    <SelectItem value="mid-range">₹15K-35K</SelectItem>
                    <SelectItem value="luxury">₹35K+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Additional Preferences */}
            <div>
              <Label className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Additional Preferences (Optional)
              </Label>
              <Textarea
                value={formData.additionalPreferences}
                onChange={(e) =>
                  updateFormData("additionalPreferences", e.target.value)
                }
                placeholder="Special requests, interests, or things to avoid..."
                className="mt-1 w-full"
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Preparing
                  your trip...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Create My Trip Plan
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
  );
}
