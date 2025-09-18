// "use client";

// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { CalendarIcon, MapPin, User, Phone } from "lucide-react";

// export function BookingForm() {
//   return (
//     <section className="relative py-20">
//       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
//       <div className="max-w-3xl mx-auto relative z-10 px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//         >
//           <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl">
//             <CardContent className="p-8">
//               <h2 className="text-3xl font-extrabold text-white mb-6 text-center tracking-wide">
//                 Book Your Trip ✈️
//               </h2>
//               <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Name */}
//                 <div className="relative">
//                   <User className="absolute left-3 top-3 text-white/70" size={20} />
//                   <Input
//                     type="text"
//                     placeholder="Full Name"
//                     className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
//                   />
//                 </div>

//                 {/* Phone */}
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-3 text-white/70" size={20} />
//                   <Input
//                     type="tel"
//                     placeholder="Phone Number"
//                     className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
//                   />
//                 </div>

//                 {/* From Location */}
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-3 text-white/70" size={20} />
//                   <Input
//                     type="text"
//                     placeholder="From Location"
//                     className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
//                   />
//                 </div>

//                 {/* To Location */}
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-3 text-white/70" size={20} />
//                   <Input
//                     type="text"
//                     placeholder="To Location"
//                     className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
//                   />
//                 </div>

//                 {/* Date */}
//                 <div className="relative md:col-span-2">
//                   <CalendarIcon className="absolute left-3 top-3 text-white/70" size={20} />
//                   <Input
//                     type="date"
//                     className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
//                   />
//                 </div>
//               </form>

//               {/* Submit Button */}
//               <div className="mt-8 text-center">
//                 <Button
//                   size="lg"
//                   className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-10 py-3 rounded-xl shadow-lg transition-transform hover:scale-105"
//                 >
//                   Confirm Booking
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </section>
//   );
// }


"use client";
import { useState } from "react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pickup: "",
    drop: "",
    people: "",
    vehicle: "",
    date: "",
    days: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    // yaha API call karega booking ke liye
  };

  return (
    <div className="max-w-3xl mx-auto my-12 px-6">
      <h2 className="text-3xl font-extrabold text-center text-neutral-900 dark:text-white mb-6">
        Book Your <span className="text-red-600">Cab</span>
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-neutral-900 shadow-lg rounded-2xl p-8 space-y-5 border border-neutral-200 dark:border-neutral-700"
      >
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-600 border-neutral-300 dark:border-neutral-600 bg-transparent"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-600 border-neutral-300 dark:border-neutral-600 bg-transparent"
            required
          />
        </div>

        {/* Pickup Location */}
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
            Pickup Location
          </label>
          <input
            type="text"
            name="pickup"
            value={formData.pickup}
            onChange={handleChange}
            placeholder="Where should we pick you up?"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-600 border-neutral-300 dark:border-neutral-600 bg-transparent"
            required
          />
        </div>

        {/* Drop Location */}
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
            Destination
          </label>
          <input
            type="text"
            name="drop"
            value={formData.drop}
            onChange={handleChange}
            placeholder="Enter your destination"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-600 border-neutral-300 dark:border-neutral-600 bg-transparent"
            required
          />
        </div>

        {/* People + Days */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
              Number of People
            </label>
            <input
              type="number"
              name="people"
              value={formData.people}
              onChange={handleChange}
              placeholder="e.g. 4"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-600 border-neutral-300 dark:border-neutral-600 bg-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
              Number of Days
            </label>
            <input
              type="number"
              name="days"
              value={formData.days}
              onChange={handleChange}
              placeholder="e.g. 3"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-600 border-neutral-300 dark:border-neutral-600 bg-transparent"
              required
            />
          </div>
        </div>

        {/* Vehicle */}
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
            Choose Your Vehicle
          </label>
          <select
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-600 border-neutral-300 dark:border-neutral-600 bg-transparent"
            required
          >
            <option value="">Select a vehicle</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="hatchback">Hatchback</option>
            <option value="luxury">Luxury Car</option>
            <option value="tempo">Tempo Traveller</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
            Pickup Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-600 border-neutral-300 dark:border-neutral-600 bg-transparent"
            required
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-md transition-all"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
}

