"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Booking {
  id: string;
  pickupLoc: string;
  dropLoc: string;
  pickupDate: string;
  pickupTime: string;
  paymentAmt: number;
  status: string;
  fullName: string;
  vehicleType: string;
}

export default function CanceledBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCanceledBookings = async () => {
      try {
        const response = await fetch("/api/my-bookings?status=canceled");
        const data = await response.json();

        if (data.ok) {
          setBookings(data.bookings);
        } else {
          setError(data.error || "Failed to fetch canceled bookings");
        }
      } catch (err) {
        setError("An error occurred while fetching canceled bookings");
        console.error("Error fetching canceled bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCanceledBookings();
  }, []);

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Canceled Bookings</h1>
        </div>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-destructive"></div>
          <p className="text-muted-foreground ml-3">Loading canceled bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Canceled Bookings</h1>
        </div>
        <div className="bg-destructive/10 border border-destructive rounded-xl p-6">
          <div className="flex items-center">
            <p className="text-destructive font-medium">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-foreground">Canceled Bookings</h1>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-border rounded-xl bg-muted">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Canceled Bookings
            </h3>
            <p className="text-muted-foreground mb-6">
              Great! You haven't canceled any bookings yet.
            </p>
            <Link href="/my-bookings">
              <Button>View Active Bookings</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <Card
              key={booking.id}
              className="border border-border shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <div className="text-lg font-semibold text-foreground mb-1 decoration-destructive decoration-2">
                      {booking.pickupLoc}
                    </div>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <span className="text-sm">to</span>
                    </div>
                    <div className="text-lg font-semibold text-foreground decoration-destructive decoration-2">
                      {booking.dropLoc}
                    </div>
                  </div>

                  <span className="text-xs font-medium bg-destructive/10 text-destructive px-3 py-1 rounded-full border border-destructive/30">
                    CANCELLED
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground font-medium">Date</p>
                    <p className="text-foreground">
                      {new Date(booking.pickupDate).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium">Time</p>
                    <p className="text-foreground">{booking.pickupTime}</p>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground font-medium text-sm">
                    Passenger
                  </p>
                  <p className="text-foreground">{booking.fullName}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground font-medium">Vehicle</p>
                    <p className="text-foreground">{booking.vehicleType}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium">Amount</p>
                    <p className="text-foreground font-semibold">
                      ₹{booking.paymentAmt}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center text-destructive">
                      <span className="font-semibold text-sm">
                        This booking was canceled
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
