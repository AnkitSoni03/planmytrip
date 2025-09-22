"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle, Car, MapPin, Calendar, Clock, CreditCard, User, Phone } from "lucide-react";

export default function BookingPreviewPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const data = searchParams.get("data");
  
  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Car className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Booking Data Found</h2>
          <p className="text-gray-600">Please go back and create a new booking.</p>
        </div>
      </div>
    );
  }

  const booking = JSON.parse(data);
  
  // Example calculation
  const distance = 200; // km
  const ratePerKm = 12;
  const driverCharge = 500;
  const totalAmount = distance * ratePerKm + driverCharge;
  
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  
  const isAmountCorrect = parseFloat(amount) === totalAmount;
  const isAmountEntered = amount.trim() !== "";

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      // Fake payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...booking,
          paymentAmt: totalAmount,
        }),
      });
      
      if (res.ok) {
        setShowCongrats(true);
        // Redirect after showing congratulations
        setTimeout(() => {
          router.push("/my-bookings");
        }, 3000);
      } else {
        alert("Error saving booking. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Congratulations Modal
  if (showCongrats) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-pulse">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Congratulations!</h2>
          <p className="text-gray-600 mb-6">Your booking has been confirmed successfully.</p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-medium">Booking ID: #BK{Date.now().toString().slice(-6)}</p>
            <p className="text-green-700 text-sm mt-1">Amount Paid: ₹{totalAmount}</p>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <span>Redirecting to My Bookings...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Preview</h1>
          <p className="text-gray-600">Review your booking details and complete payment</p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
            <h2 className="text-xl font-semibold mb-2">Trip Details</h2>
            <div className="flex items-center space-x-2 opacity-90">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Your journey awaits</span>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Trip Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3"></div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">From</p>
                    <p className="font-medium text-gray-800">
                      {booking.pickup || booking.pickupLocation || booking.from || "Pickup Location"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3"></div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">To</p>
                    <p className="font-medium text-gray-800">
                      {booking.destination || booking.dropLocation || booking.to || "Drop Location"}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Date</p>
                    <p className="font-medium text-gray-800">
                      {booking.date || booking.pickupDate || booking.travelDate || "Today"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Time</p>
                    <p className="font-medium text-gray-800">
                      {booking.time || booking.pickupTime || booking.travelTime || "Now"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger Info */}
            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Passenger Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium text-gray-800">
                    {booking.name || booking.fullName || booking.passengerName || "Not provided"}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-800">
                      {booking.phone || booking.mobile || booking.phoneNumber || "Not provided"}
                    </p>
                  </div>
                </div>
                
                {(booking.email || booking.emailAddress) && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-800">
                      {booking.email || booking.emailAddress}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Debug Info - Remove in production */}
            <div className="border-t pt-4 mt-4">
              <details className="group">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  🔧 Debug: View Raw Data
                </summary>
                <div className="mt-2 p-3 bg-gray-100 rounded-lg">
                  <pre className="text-xs text-gray-600 overflow-auto">
                    {JSON.stringify(booking, null, 2)}
                  </pre>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Fare Breakdown */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-6">
          <div className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Fare Breakdown
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Distance ({distance} km)</span>
                <span className="font-medium">₹{distance * ratePerKm}</span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Driver Charges</span>
                <span className="font-medium">₹{driverCharge}</span>
              </div>
              
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-bold text-blue-600">₹{totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Complete Payment</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Amount to Pay
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-lg">₹</span>
                  </div>
                  <input
                    id="amount"
                    type="number"
                    placeholder={totalAmount.toString()}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`w-full pl-8 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                      isAmountEntered 
                        ? isAmountCorrect 
                          ? "border-green-300 focus:ring-green-500 bg-green-50" 
                          : "border-red-300 focus:ring-red-500 bg-red-50"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                </div>
                
                {isAmountEntered && !isAmountCorrect && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    Please enter the exact amount: ₹{totalAmount}
                  </p>
                )}
                
                {isAmountCorrect && (
                  <p className="mt-2 text-sm text-green-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Amount verified successfully
                  </p>
                )}
              </div>
              
              <button
                onClick={handlePayment}
                disabled={!isAmountCorrect || isLoading}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                  isAmountCorrect && !isLoading
                    ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>Pay & Confirm Booking</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 Your payment information is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
}