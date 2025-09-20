"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface TripSuggestionsModalProps {
  isOpen: boolean
  onClose: () => void
  suggestions: {
    english: string
    hindi: string
  }
}

export default function TripSuggestionsModal({ isOpen, onClose, suggestions }: TripSuggestionsModalProps) {
  const [activeLang] = useState<"english" | "hindi">("english")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-neutral-900 text-white border border-neutral-700 rounded-2xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
             AI Trip Suggestions
          </DialogTitle>
        </DialogHeader>

        {/* Language Tabs */}
        <div className="flex gap-6 border-b border-neutral-700 pb-2">
          
        </div>

        {/* AI Response */}
        <div className="mt-4 max-h-[400px] overflow-y-auto text-sm leading-relaxed text-gray-300 whitespace-pre-line">
          {activeLang === "english" ? suggestions.english : suggestions.hindi}
        </div>

        {/* Close Button */}
        <div className="mt-6 text-right">
          <Button onClick={onClose} className="bg-red-600 hover:bg-red-700">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
