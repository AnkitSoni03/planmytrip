"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

export default function FeedbackPage() {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [submitted, setSubmitted] = useState(false);
  // const [userName, setUserName] = useState("");
  // const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [_, setUserName] = useState("");
  const [feedbacks, setFeedbacks] = useState<{id: string; rating: number; comment: string; user: {name: string}; createdAt: string}[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch("/api/user");
        if (userRes.ok) {
          const userData = await userRes.json();
          setUserName(userData.name || "User");
        }

        const feedbacksRes = await fetch("/api/feedback");
        if (feedbacksRes.ok) {
          const feedbacksData = await feedbacksRes.json();
          setFeedbacks(feedbacksData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      alert("Please write your feedback before submitting");
      return;
    }

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment, rating }),
    });

    if (res.ok) {
      setSubmitted(true);
      setComment("");
      setRating(5);

      const feedbacksRes = await fetch("/api/feedback");
      if (feedbacksRes.ok) {
        const feedbacksData = await feedbacksRes.json();
        setFeedbacks(feedbacksData);
      }

      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={20}
        className={
          index < rating
            ? "fill-yellow-400 text-yellow-400"
            : "text-muted-foreground"
        }
      />
    ));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Share Your Feedback</h1>

      {submitted && (
        <div className="bg-green-100 dark:bg-green-900/40 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-400 px-4 py-3 rounded mb-4">
          Thank you for your feedback!
        </div>
      )}

      <div className="mb-6 p-4 bg-muted rounded-lg">
        <h2 className="text-lg font-semibold mb-2">We value your opinion</h2>
        <p className="text-muted-foreground">
          Please share your thoughts about our service. Your feedback helps us
          improve.
        </p>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Your Rating</label>
        <div className="flex space-x-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="focus:outline-none"
            >
              <Star
                size={28}
                className={
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400 cursor-pointer"
                    : "text-muted-foreground cursor-pointer"
                }
              />
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{rating} out of 5 stars</p>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Your Feedback</label>
        <Textarea
          placeholder="What did you like about our service? How can we improve?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mb-4"
          rows={5}
        />
      </div>

      <Button onClick={handleSubmit} disabled={!comment.trim()}>
        Submit Feedback
      </Button>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Feedback from Our Users</h2>
        {feedbacks.length === 0 ? (
          <p className="text-muted-foreground">
            No feedback yet. Be the first to share your thoughts!
          </p>
        ) : (
          <div className="space-y-4">
            {feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="border border-border p-4 rounded-lg bg-card"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{feedback.user.name}</h3>
                  <div className="flex">{renderStars(feedback.rating)}</div>
                </div>
                <p className="text-foreground">{feedback.comment}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {new Date(feedback.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
