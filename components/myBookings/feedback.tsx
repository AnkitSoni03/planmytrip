"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function FeedbackPage() {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    const res = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ comment, rating }),
    });

    if (res.ok) {
      setSubmitted(true);
      setComment("");
      setRating(5);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Feedback</h1>

      {submitted && (
        <p className="text-green-600 mb-4">Thank you for your feedback!</p>
      )}

      <Textarea
        placeholder="Write your feedback here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="mb-4"
      />
      <Input
        type="number"
        min={1}
        max={5}
        value={rating}
        onChange={(e) => setRating(parseInt(e.target.value))}
        className="mb-4 w-24"
      />

      <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleSubmit}>
        Submit Feedback
      </Button>
    </div>
  );
}
