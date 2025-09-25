"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  CheckCircle,
  Car,
  Calendar,
  Clock,
  CreditCard,
  User,
  Mail,
} from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function BookingPreviewPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const data = searchParams.get("data");

  const [showCongrats, setShowCongrats] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Car className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            No Booking Data Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please go back and create a new booking.
          </p>
        </div>
      </div>
    );
  }

  const booking = JSON.parse(data);

  const distance = 200; // km
  const ratePerKm = 12;
  const driverCharge = 500;
  const totalAmount = distance * ratePerKm + driverCharge;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate booking ID
      const bookingId = `PMT${Date.now().toString().slice(-6)}`;

      // Save booking to database
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...booking, 
          paymentAmt: totalAmount,
          bookingId: bookingId
        }),
      });

      if (res.ok) {
        // Send confirmation email
        if (booking.email) {
          try {
            const emailRes = await fetch("/api/send-payment-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userEmail: booking.email,
                userName: booking.fullName || "Valued Customer",
                bookingDetails: {
                  bookingId: bookingId,
                  from: booking.pickupLocation || "Pickup Location",
                  to: booking.dropLocation || "Drop Location", 
                  date: booking.pickupDate || "Today",
                  time: booking.pickupTime || "Now",
                  amount: totalAmount
                }
              }),
            });

            const emailResult = await emailRes.json();
            
            if (emailResult.success) {
              console.log("✅ Email sent successfully!");
              setEmailSent(true);
            } else {
              console.error("❌ Email failed:", emailResult.error);
              // Still show success page even if email fails
            }
          } catch (emailError) {
            console.error("❌ Email sending error:", emailError);
            // Continue with booking success even if email fails
          }
        }

        // Show congratulations
        setShowCongrats(true);
        
        // Redirect after 4 seconds
        setTimeout(() => router.push("/my-bookings"), 4000);
      } else {
        alert("Error saving booking. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (showCongrats) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
            Congratulations! 🎉
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Your booking has been confirmed successfully.
          </p>
          
          {/* Email Status */}
          {booking.email && (
            <div className={`flex items-center justify-center gap-2 mb-6 p-3 rounded-lg ${
              emailSent 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
                : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
            }`}>
              <Mail className="w-4 h-4" />
              <span className="text-sm">
                {emailSent 
                  ? '✅ Confirmation email sent!' 
                  : '📧 Sending confirmation email...'}
              </span>
            </div>
          )}
          
          <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-4 mb-6">
            <p className="text-gray-800 dark:text-gray-200 font-medium">
              Booking ID: #BK{Date.now().toString().slice(-6)}
            </p>
            <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">
              Amount Paid: ₹{totalAmount}
            </p>
            {booking.email && (
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">
                📧 Confirmation sent to: {booking.email}
              </p>
            )}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Redirecting to My Bookings...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Booking Preview
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review your booking details and complete payment
          </p>
        </div>

        {/* Email Warning if not provided */}
        {!booking.email && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-yellow-600" />
              <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                <strong>Note:</strong> No email provided. You won't receive a confirmation email.
              </p>
            </div>
          </div>
        )}

        {/* Trip Details */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 text-white">
            <h2 className="text-xl text-gray-800 dark:text-white font-semibold mb-2">
              Trip Details
            </h2>
            <p className="opacity-90 text-gray-500">Your journey awaits</p>
          </div>

          <div className="p-6 space-y-6">
            {/* From → To */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
              <div>
                <p className="text-sm text-gray-500 uppercase">From</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {booking.pickupLocation || "ABC"}
                </p>
              </div>
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400 my-2 sm:mx-4">
                →
              </span>
              <div>
                <p className="text-sm text-gray-500 uppercase">To</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {booking.dropLocation || "DEF"}
                </p>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 uppercase">Date</p>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">
                    {booking.pickupDate || "Today"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 uppercase">Time</p>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">
                    {booking.pickupTime || "Now"}
                  </p>
                </div>
              </div>
            </div>

            {/* Passenger Info */}
            <div className="pt-4 border-t dark:border-zinc-800">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Passenger Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {booking.fullName || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {booking.phone || "Not provided"}
                  </p>
                </div>
                {booking.email && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {booking.email}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Fare Breakdown */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Fare Breakdown
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 text-gray-700 dark:text-gray-300">
              <span>Distance ({distance} km)</span>
              <span>₹{distance * ratePerKm}</span>
            </div>
            <div className="flex justify-between py-2 text-gray-700 dark:text-gray-300">
              <span>Driver Charges</span>
              <span>₹{driverCharge}</span>
            </div>
            <div className="border-t pt-3 flex justify-between items-center text-lg font-semibold text-gray-900 dark:text-gray-100">
              <span>Total Amount</span>
              <span className="text-2xl text-green-600 dark:text-green-400">
                ₹{totalAmount}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 text-lg">
            Complete Payment
          </h3>

          <Image
            src="/pay.png"
            alt="PlanMyTrip Logo"
            width={150}
            height={60}
            className="h-auto w-auto pb-4"
          />

          <div className="space-y-4">
            {/* Show Total Amount */}
            <div className="bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-4 flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Total Amount
              </span>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                ₹{totalAmount}
              </span>
            </div>
            
            {booking.email && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-800 dark:text-blue-200 text-sm">
                    Confirmation email will be sent to: <strong>{booking.email}</strong>
                  </span>
                </div>
              </div>
            )}
            
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2
                ${
                  isProcessing
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing Payment...
                </>
              ) : (
                "Pay Now"
              )}
            </button>
          </div>
        </div>

        {/* Security Note */}
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            🔒 Your payment information is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
}