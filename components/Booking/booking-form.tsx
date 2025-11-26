"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Car, Clock, MapPin, Users, Mail, User, Phone, Send, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CabBookingForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  const vehicleData: Record<string, string[]> = {
    cab: ["Sedan (4 seater)", "Hatchback (4 seater)", "SUV (7 seater)", "Luxury Car (4 seater)", "Premium SUV (7 seater)"],
    "tempo-traveller": ["9 Seater Tempo", "12 Seater Tempo", "15 Seater Tempo", "20 Seater Tempo"],
    bus: ["25 Seater Mini Bus", "35 Seater Bus", "45 Seater Bus", "50+ Seater Luxury Bus"],
  };

  const [vehicleOptions, setVehicleOptions] = useState<string[]>([]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "vehicleType") {
      setVehicleOptions(vehicleData[value] || []);
      setFormData({ ...formData, vehicleType: value, specificVehicle: "" });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    router.push(`/booking-preview?data=${encodeURIComponent(JSON.stringify(formData))}`);
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
      <div className="max-w-5xl w-full rounded-xl shadow-lg overflow-hidden grid lg:grid-cols-[40%_60%] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">

        {/* LEFT PANEL */}
        <div className="p-8 bg-gradient-to-br from-red-900 to-red-700 dark:from-red-800 dark:to-red-600 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Premium <span className="text-red-300">Cab Booking</span>
          </h2>

          <p className="text-red-100 mb-8 text-center text-sm">
            Smooth, fast and reliable cab service across India.
          </p>

          <div className="space-y-5">
            {[
              { icon: <Car className="w-5 h-5 text-red-300" />, title: "Wide Vehicle Options", desc: "Cabs, SUVs, Travellers & Buses." },
              { icon: <Clock className="w-5 h-5 text-red-300" />, title: "On-Time Pickup", desc: "We value your time." },
              { icon: <Users className="w-5 h-5 text-red-300" />, title: "Trained Drivers", desc: "Safe & comfortable rides." },
              { icon: <MapPin className="w-5 h-5 text-red-300" />, title: "Pan-India Service", desc: "Anywhere, anytime." },
            ].map((card, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-red-800 dark:bg-red-700 rounded-full">{card.icon}</div>
                <div>
                  <h3 className="font-semibold">{card.title}</h3>
                  <p className="text-sm text-red-100">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-red-900 dark:text-red-400 flex items-center justify-center gap-2">
              <Car className="w-5 h-5 text-red-600 dark:text-red-400" /> Book Your Ride
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm">
              Fill in your details to proceed
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* PERSONAL DETAILS */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="flex items-center gap-1 text-slate-800 dark:text-slate-200">
                  <User className="w-4 h-4 text-red-600 dark:text-red-400" /> Write your name
                </Label>
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>

              <div>
                <Label className="flex items-center gap-1 text-slate-800 dark:text-slate-200">
                  <Phone className="w-4 h-4 text-red-600 dark:text-red-400" /> Phone number
                </Label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label className="flex items-center gap-1 text-slate-800 dark:text-slate-200">
                  <Mail className="w-4 h-4 text-red-600 dark:text-red-400" /> Email Address
                </Label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
            </div>

            {/* BOOKING DETAILS */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="flex items-center gap-1 dark:text-slate-200">
                  <Clock className="w-4 h-4 text-red-600 dark:text-red-400" /> Pickup Date
                </Label>
                <Input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  className="mt-1 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-gray-100"
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div>
                <Label className="flex items-center gap-1 dark:text-slate-200">
                  <Clock className="w-4 h-4 text-red-600 dark:text-red-400" /> Pickup Time
                </Label>
                <Input
                  type="time"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  className="mt-1 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>

              <div>
                <Label className="flex items-center gap-1 dark:text-slate-200">
                  <MapPin className="w-4 h-4 text-red-600 dark:text-red-400" /> Pickup Location
                </Label>
                <Input
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  className="mt-1 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>

              <div>
                <Label className="flex items-center gap-1 dark:text-slate-200">
                  <MapPin className="w-4 h-4 text-red-600 dark:text-red-400" /> Drop Location
                </Label>
                <Input
                  name="dropLocation"
                  value={formData.dropLocation}
                  onChange={handleChange}
                  className="mt-1 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
            </div>

            {/* PASSENGERS + TRIP TYPE */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="dark:text-slate-200">Passengers</Label>
                <select
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleChange}
                  className="mt-1 w-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-md"
                >
                  <option value="" className="dark:text-gray-300">Select</option>
                  {[...Array(80)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="dark:text-slate-200">Trip Direction</Label>
                <select
                  name="direction"
                  value={formData.direction}
                  onChange={handleChange}
                  className="mt-1 w-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-md"
                >
                  <option value="one-way">One Way</option>
                  <option value="round-trip">Round Trip</option>
                  <option value="multi-city">Multi City</option>
                </select>
              </div>
            </div>

            {/* VEHICLE DETAILS */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="dark:text-slate-200">Vehicle Type</Label>
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  className="mt-1 w-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-md"
                >
                  <option value="">Select</option>
                  <option value="cab">Cab</option>
                  <option value="tempo-traveller">Tempo Traveller</option>
                  <option value="bus">Bus</option>
                </select>
              </div>

              <div>
                <Label className="dark:text-slate-200">Select Vehicle</Label>
                <select
                  name="specificVehicle"
                  value={formData.specificVehicle}
                  onChange={handleChange}
                  disabled={!formData.vehicleType}
                  className="mt-1 w-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-gray-100 disabled:opacity-50 px-3 py-2 rounded-md"
                >
                  <option value="">
                    {formData.vehicleType ? "Select Vehicle" : "Choose Type First"}
                  </option>

                  {vehicleOptions.map((v, i) => (
                    <option key={i} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="grid md:grid-cols-2 gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {loading ? "Please wait..." : "Preview Booking"}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-200 hover:bg-gray-300 text-black dark:text-white dark:bg-zinc-700 dark:hover:bg-zinc-600 py-2 rounded-md flex items-center justify-center gap-2"
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
