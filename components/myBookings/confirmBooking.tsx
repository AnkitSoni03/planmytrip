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
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);
  const [canceling, setCanceling] = useState(false);

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

  // ✅ Open cancel confirmation modal
  const openCancelModal = (bookingId: string) => {
    setBookingToCancel(bookingId);
    setShowCancelModal(true);
  };

  // ✅ Close cancel modal
  const closeCancelModal = () => {
    setShowCancelModal(false);
    setBookingToCancel(null);
  };

  // ✅ Cancel booking
  const cancelBooking = async () => {
    if (!bookingToCancel) return;

    try {
      setCanceling(true);
      const res = await fetch(`/api/my-bookings/${bookingToCancel}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "canceled" }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setActiveBookings((prev) => prev.filter((b) => b.id !== bookingToCancel));
        closeCancelModal();
      } else {
        console.error("Cancel failed:", data.error);
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
    } finally {
      setCanceling(false);
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
              You don't have any active bookings right now.
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
                      ₹{booking.paymentAmt} Paid
                    </p>
                  </div>
                </div>

                <Button
                  variant="destructive"
                  className="w-full text-base hover:bg-red-600 dark:bg-red-500"
                  onClick={() => openCancelModal(booking.id)}
                >
                  Cancel Booking
                </Button>
              </CardContent>

              <p className="text-gray-600 dark:text-gray-200 text-xs font-medium text-center pt-0 pb-4">
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

      {/* Professional Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl transform transition-all">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Cancel Booking
                </h3>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                Are you sure you want to cancel this booking? This action cannot be undone.
              </p>
            </div>
            
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={closeCancelModal}
                disabled={canceling}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Keep Booking
              </Button>
              <Button
                variant="destructive"
                onClick={cancelBooking}
                disabled={canceling}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white dark:bg-red-500"
              >
                {canceling ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Canceling...
                  </div>
                ) : (
                  "Yes, Cancel"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}