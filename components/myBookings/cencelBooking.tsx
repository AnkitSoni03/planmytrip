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
        // ✅ Use the correct API endpoint with status filter
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
          <svg className="w-8 h-8 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
          </svg>
          <h1 className="text-3xl font-bold text-gray-800">Canceled Bookings</h1>
        </div>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
          <p className="text-gray-500 ml-3">Loading canceled bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <svg className="w-8 h-8 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
          </svg>
          <h1 className="text-3xl font-bold text-gray-800">Canceled Bookings</h1>
        </div>
        <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-gray-800">Canceled Bookings</h1>
          {bookings.length > 0 && (
            <span className="ml-4 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
              {bookings.length} canceled
            </span>
          )}
        </div>
        <Link href="/my-bookings">
          <Button 
            variant="outline" 
            className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            View Active Bookings
          </Button>
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
          <div className="max-w-md mx-auto">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Canceled Bookings</h3>
            <p className="text-gray-500 mb-6">Great! You haven't canceled any bookings yet.</p>
            <Link href="/my-bookings">
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                View Active Bookings
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <Card key={booking.id} className="border-2 border-red-200  shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              
              <CardHeader className="pb-3 relative">
                <CardTitle className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <div className="text-lg font-semibold text-gray-800 mb-1 line-through decoration-red-400 decoration-2">
                      {booking.pickupLoc}
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <svg className="w-4 h-4 mr-1 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-sm">to</span>
                    </div>
                    <div className="text-lg font-semibold text-gray-800 line-through decoration-red-400 decoration-2">
                      {booking.dropLoc}
                    </div>
                  </div>

                  <span className="text-xs font-medium bg-red-100 text-red-700 px-3 py-1 rounded-full border border-red-200">
                    CANCELLED
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
                
                <div className="pt-3 border-t border-red-200">
                  <div className="bg-red-100 border border-red-200 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center text-red-600">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <span className="font-semibold text-sm">This booking was canceled</span>
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