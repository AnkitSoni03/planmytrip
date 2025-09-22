"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Booking {
  id: string;
  fullName: string;
  pickupLoc: string;
  dropLoc: string;
  pickupDate: string;
  pickupTime: string;
  vehicleType: string;
  paymentAmt: number;
  status: string;
  createdAt: string;
}

export default function MyBookingsPage() {
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/my-bookings");
        const data = await res.json();

        if (res.ok && data.ok) {
          const filtered = data.bookings.filter(
            (b: Booking) =>
              b.status !== "canceled" &&
              b.status !== "cancelled" &&
              b.status !== "completed"
          );
          setActiveBookings(filtered);
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // ✅ Cancel booking
  const cancelBooking = async (id: string) => {
    try {
      const res = await fetch(`/api/my-bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "canceled" }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setActiveBookings((prev) => prev.filter((b) => b.id !== id));
      } else {
        alert("Cancel failed: " + data.error);
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500"></div>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          Loading your bookings...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
        My Bookings
      </h1>

      {activeBookings.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-zinc-900">
          <div className="max-w-md mx-auto">
            <svg
              className="mx-auto h-14 w-14 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              No Active Bookings
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              You don’t have any active bookings right now.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeBookings.map((booking) => (
            <Card
              key={booking.id}
              className="border border-gray-200 dark:border-gray-700 transition-all duration-300 rounded-xl"
            >
              <CardHeader className="pb-3 flex justify-between items-start">
                <CardTitle className="flex flex-col">
                  <span className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100">
                    {booking.pickupLoc}{" "}
                    <span className="mx-2 text-gray-500">→</span>{" "}
                    {booking.dropLoc}
                  </span>
                </CardTitle>
                <span className="text-xs font-medium bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-3 py-1 rounded-full">
                  {booking.status.toUpperCase()}
                </span>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm md:text-base">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                      Date
                    </p>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                      {new Date(booking.pickupDate).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                      Time
                    </p>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                      {booking.pickupTime}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                    Passenger
                  </p>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">
                    {booking.fullName}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm md:text-base">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                      Vehicle
                    </p>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                      {booking.vehicleType}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                      Amount
                    </p>
                    <p className="text-gray-800 dark:text-gray-100 font-semibold">
                      ₹{booking.paymentAmt}
                    </p>
                  </div>
                </div>

                <Button
                  variant="destructive"
                  className="w-full text-base dark:bg-red-500"
                  onClick={() => {
                    if (
                      confirm("Are you sure you want to cancel this booking?")
                    ) {
                      cancelBooking(booking.id);
                    }
                  }}
                >
                  Cancel Booking
                </Button>
              </CardContent>

              <p className="text-gray-600 dark:text-gray-200 text-xs font-medium text-center pt-0">
                {new Date(booking.createdAt).toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                at{" "}
                {new Date(booking.createdAt).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
