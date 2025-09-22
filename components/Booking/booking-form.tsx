"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, MapPin, Users, Car, Send, RotateCcw } from "lucide-react";

export default function CabBookingForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    pickupDate: "",
    pickupTime: "",
    pickupLocation: "",
    dropLocation: "",
    passengers: "",
    vehicleType: "",
    specificVehicle: "",
    direction: "one-way",
  });

  const [vehicleOptions, setVehicleOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const vehicleData: Record<string, string[]> = {
    cab: [
      "Sedan (4 seater)",
      "Hatchback (4 seater)",
      "SUV (7 seater)",
      "Luxury Car (4 seater)",
      "Premium SUV (7 seater)",
    ],
    "tempo-traveller": [
      "9 Seater Tempo",
      "12 Seater Tempo",
      "15 Seater Tempo",
      "20 Seater Tempo",
    ],
    bus: [
      "25 Seater Mini Bus",
      "35 Seater Bus",
      "45 Seater Bus",
      "50+ Seater Luxury Bus",
    ],
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "vehicleType") {
      setVehicleOptions(vehicleData[value] || []);
      setFormData({ ...formData, vehicleType: value, specificVehicle: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 👉 form data ko Preview page pe bhejenge query params ke through
    router.push(
      `/booking-preview?data=${encodeURIComponent(JSON.stringify(formData))}`
    );
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      pickupDate: "",
      pickupTime: "",
      pickupLocation: "",
      dropLocation: "",
      passengers: "",
      vehicleType: "",
      specificVehicle: "",
      direction: "one-way",
    });
    setVehicleOptions([]);
  };

  return (
    <div className="flex justify-center px-4 py-8 mt-2">
      <div className="max-w-5xl w-full rounded-xl shadow-lg overflow-hidden grid lg:grid-cols-[40%_60%] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700">
        {/* Left Info Section */}
        <div className="p-8 bg-gradient-to-br from-red-800 to-red-600 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Easy <span className="text-red-200">Cab Booking</span>
          </h2>
          <p className="text-red-100 mb-8 text-center text-sm">
            Book cabs, tempo travellers, and buses instantly with the best prices and trusted service.
          </p>

          <div className="space-y-5">
            {[
              { icon: <Car className="w-5 h-5 text-red-200" />, title: "24x7 Service", desc: "Available anytime, anywhere." },
              { icon: <MapPin className="w-5 h-5 text-red-200" />, title: "GPS Tracking", desc: "Stay updated with live tracking." },
              { icon: <Users className="w-5 h-5 text-red-200" />, title: "Experienced Drivers", desc: "Safe and reliable journeys." },
              { icon: <Clock className="w-5 h-5 text-red-200" />, title: "On-Time Guarantee", desc: "We value your time & trust." },
            ].map((card, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-red-700 rounded-full">{card.icon}</div>
                <div>
                  <h3 className="font-semibold">{card.title}</h3>
                  <p className="text-sm text-red-100">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Form Section */}
        <div className="p-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 flex items-center justify-center gap-2">
              <Car className="w-5 h-5" /> Book Your Ride
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm">
              Fill in your travel details to book a cab instantly
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:border-red-600 focus:outline-none"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:border-red-600 focus:outline-none"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="md:col-span-2 w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:border-red-600 focus:outline-none"
                required
              />
            </div>

            {/* Booking Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:border-red-600 focus:outline-none"
                required
              />
              <input
                type="time"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
                className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:border-red-600 focus:outline-none"
                required
              />
              <input
                type="text"
                name="pickupLocation"
                placeholder="Pickup Location"
                value={formData.pickupLocation}
                onChange={handleChange}
                className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:border-red-600 focus:outline-none"
                required
              />
              <input
                type="text"
                name="dropLocation"
                placeholder="Drop Location"
                value={formData.dropLocation}
                onChange={handleChange}
                className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:border-red-600 focus:outline-none"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <select
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:border-red-600 focus:outline-none"
                required
              >
                <option value="">Passengers</option>
                {[...Array(20)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                name="direction"
                value={formData.direction}
                onChange={handleChange}
                className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:border-red-600 focus:outline-none"
              >
                <option value="one-way">One Way</option>
                <option value="round-trip">Round Trip</option>
                <option value="multi-city">Multi City</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:border-red-600 focus:outline-none"
                required
              >
                <option value="">Vehicle Type</option>
                <option value="cab">Cab</option>
                <option value="tempo-traveller">Tempo Traveller</option>
                <option value="bus">Bus</option>
              </select>
              <select
                name="specificVehicle"
                value={formData.specificVehicle}
                onChange={handleChange}
                className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:border-red-600 focus:outline-none"
                required
                disabled={!formData.vehicleType}
              >
                <option value="">
                  {formData.vehicleType ? "Select Vehicle" : "Choose Type First"}
                </option>
                {vehicleOptions.map((vehicle, index) => (
                  <option key={index} value={vehicle}>
                    {vehicle}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {loading ? "Please wait..." : "Preview Booking"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 rounded-md flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
