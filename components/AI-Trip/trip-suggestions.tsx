"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

interface TripSuggestionsProps {
  suggestions: string
}

export function TripSuggestions({ suggestions }: TripSuggestionsProps) {
  return (
    <div className="mt-8">
      <Card className="bg-gray-900/50 border-red-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Sparkles className="h-5 w-5 text-red-500" />
            AI Trip Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-gray-100 leading-relaxed">{suggestions}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
