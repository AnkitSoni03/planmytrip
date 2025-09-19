"use client"
import { useState } from "react";
import {
  Car,
  Clock,
  Users,
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
} from "lucide-react";

export default function CabBookingForm() {
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
    package: "regular",
  });

  const [vehicleOptions, setVehicleOptions] = useState<string[]>([]);

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
    console.log("Booking Details:", formData);
    alert("Booking submitted successfully! We'll contact you soon.");
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
      package: "regular",
    });
    setVehicleOptions([]);
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            Book Your <span className="text-red-600">Ride</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Your destination is our goal
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Services Section */}
          <div className="lg:col-span-1">
            <div className="backdrop-blur-md rounded-2xl p-6 border border-gray-300 dark:border-gray-700 shadow-lg">
              <h3 className="text-2xl font-bold text-red-600 mb-6">
                What We Provide You
              </h3>
              <ul className="space-y-4">
                {[
                  "24x7 Cab service available",
                  "Online booking facility",
                  "GPS Tracking system",
                  "Credit & debit card payment facility",
                  "Professional & experienced drivers",
                  "Competitive pricing",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-gray-900 dark:text-white"
                  >
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="backdrop-blur-md rounded-2xl p-8 border border-gray-300 dark:border-gray-700 shadow-xl"
            >
              {/* Personal Details */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-300 dark:border-gray-700 pb-2">
                  Personal Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                      <User className="inline w-4 h-4 mr-2" /> Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 focus:border-red-600 focus:outline-none transition-colors"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                      <Phone className="inline w-4 h-4 mr-2" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 focus:border-red-600 focus:outline-none transition-colors"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                      <Mail className="inline w-4 h-4 mr-2" /> Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 focus:border-red-600 focus:outline-none transition-colors"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-300 dark:border-gray-700 pb-2">
                  Booking Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                      <Calendar className="inline w-4 h-4 mr-2" /> Pick-up Date
                    </label>
                    <input
                      type="date"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:border-red-600 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                      <Clock className="inline w-4 h-4 mr-2" /> Pick-up Time
                    </label>
                    <input
                      type="time"
                      name="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:border-red-600 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                      <MapPin className="inline w-4 h-4 mr-2" /> Pick-up Location
                    </label>
                    <input
                      type="text"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 focus:border-red-600 focus:outline-none transition-colors"
                      placeholder="Enter pickup location"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                      <MapPin className="inline w-4 h-4 mr-2" /> Drop-off
                      Location
                    </label>
                    <input
                      type="text"
                      name="dropLocation"
                      value={formData.dropLocation}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 focus:border-red-600 focus:outline-none transition-colors"
                      placeholder="Enter drop-off location"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                      <Users className="inline w-4 h-4 mr-2" /> No. of Passengers
                    </label>
                    <select
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:border-red-600 focus:outline-none transition-colors"
                      required
                    >
                      <option value="">Select passengers</option>
                      {[...Array(20)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? "Passenger" : "Passengers"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                      Direction
                    </label>
                    <select
                      name="direction"
                      value={formData.direction}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:border-red-600 focus:outline-none transition-colors"
                    >
                      <option value="one-way">One Way</option>
                      <option value="round-trip">Round Trip</option>
                      <option value="multi-city">Multi City</option>
                    </select>
                  </div>
                </div>

                {/* Vehicle Selection */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                      <Car className="inline w-4 h-4 mr-2" /> Choose Vehicle Type
                    </label>
                    <select
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:border-red-600 focus:outline-none transition-colors"
                      required
                    >
                      <option value="">Select vehicle type</option>
                      <option value="cab">Cab</option>
                      <option value="tempo-traveller">Tempo Traveller</option>
                      <option value="bus">Bus</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                      Choose Vehicle
                    </label>
                    <select
                      name="specificVehicle"
                      value={formData.specificVehicle}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:border-red-600 focus:outline-none transition-colors"
                      required
                      disabled={!formData.vehicleType}
                    >
                      <option value="">
                        {formData.vehicleType
                          ? "Select specific vehicle"
                          : "Choose vehicle type first"}
                      </option>
                      {vehicleOptions.map((vehicle, index) => (
                        <option key={index} value={vehicle}>
                          {vehicle}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 border border-gray-400 dark:border-gray-600"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
