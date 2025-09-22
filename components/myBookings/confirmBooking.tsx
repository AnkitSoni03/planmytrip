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

  // ✅ Fetch only active bookings from API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        
        // Try different status values - your booking might be "pending" instead of "confirmed"
        let activeData = null;
        
        // First try "pending" status (original logic)
        const pendingRes = await fetch("/api/my-bookings?status=pending");
        const pendingData = await pendingRes.json();
        
        if (pendingData.ok && pendingData.bookings?.length > 0) {
          activeData = pendingData;
        } else {
          // If no pending bookings, try "confirmed"
          const confirmedRes = await fetch("/api/my-bookings?status=confirmed");
          const confirmedData = await confirmedRes.json();
          
          if (confirmedData.ok && confirmedData.bookings?.length > 0) {
            activeData = confirmedData;
          } else {
            // If neither works, try fetching all non-canceled bookings
            const allRes = await fetch("/api/my-bookings");
            const allData = await allRes.json();
            
            if (allData.ok && allData.bookings) {
              // Filter out canceled bookings
              const activeBookingsData = allData.bookings.filter((booking: Booking) => 
                booking.status !== "canceled" && booking.status !== "cancelled"
              );
              activeData = { ok: true, bookings: activeBookingsData };
            }
          }
        }
        
        if (activeData?.ok) {
          setActiveBookings(activeData.bookings || []);
          console.log("Fetched bookings:", activeData.bookings); // Debug log
        } else {
          console.log("No bookings found or API error");
        }
        
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // ✅ Cancel Booking - Remove from UI after cancellation
  const cancelBooking = async (id: string) => {
    try {
      const res = await fetch(`/api/my-bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "canceled" }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        // Remove booking from active list immediately
        setActiveBookings(prev => prev.filter(b => b.id !== id));
      } else {
        console.error("Cancel failed:", data.error);
        alert("Failed to cancel booking: " + data.error);
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">My Bookings</h1>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="text-gray-500 ml-3">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Bookings</h1>

      {activeBookings.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
          <div className="max-w-md mx-auto">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Bookings</h3>
            <p className="text-gray-500">You don't have any confirmed bookings at the moment.</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeBookings.map((booking) => (
            <Card key={booking.id} className="border-2 border-green-200  shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-gray-800 mb-1">
                      {booking.pickupLoc}
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                      <span className="text-sm">to</span>
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                      {booking.dropLoc}
                    </div>
                  </div>
                  <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full border border-green-200">
                    CONFIRMED
                  </span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600 font-medium">Date</p>
                    <p className="text-gray-800">{new Date(booking.pickupDate).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Time</p>
                    <p className="text-gray-800">{booking.pickupTime}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-600 font-medium text-sm">Passenger</p>
                  <p className="text-gray-800">{booking.fullName}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600 font-medium">Vehicle</p>
                    <p className="text-gray-800">{booking.vehicleType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Amount</p>
                    <p className="text-gray-800 font-semibold">₹{booking.paymentAmt}</p>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-green-200">
                  <Button
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-medium transition-colors duration-200"
                    onClick={() => {
                      if (confirm("Are you sure you want to cancel this booking?")) {
                        cancelBooking(booking.id);
                      }
                    }}
                  >
                    Cancel Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}