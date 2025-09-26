// "use client";
// import React from "react";
// import { TracingBeam } from "../ui/tracing-beam";

// export function CarRentalHowItWorks() {
//   return (
//     <div className="min-h-screen py-6">
//       <div className="max-w-6xl mx-auto px-4 pt-20 ">
//         {/* Section Header */}
//         <div className="max-w-7xl mx-auto px-6 text-center mb-14">
//           <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white">
//             How <span className="text-red-600">It Works</span>
//           </h2>
//           <p className="mt-3 text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
//             Plan your trip in just 4 simple steps. Quick, easy and hassle-free
//             booking experience with safe and reliable rides.
//           </p>
//         </div>

//         <TracingBeam className="px-6">
//           <div className="max-w-4xl mx-auto antialiased pt-4 relative">
//             {howItWorksSteps.map((item, index) => (
//               <div key={index} className="mb-16 ml-8 md:ml-16">
//                 {/* Step Number & Badge */}
//                 <div className="flex items-center mb-6">
//                   <div className="bg-gradient-to-r from-red-700 to-red-900 text-white rounded-full text-sm font-semibold px-4 py-2 shadow-md">
//                     {item.badge}
//                   </div>
//                 </div>

//                 {/* Title */}
//                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
//                   {item.title}
//                 </h2>

//                 {/* Description Card with Image */}
//                 <div className="rounded-xl overflow-hidden mb-6 transform transition-all duration-300 light:bg-white">
//                   {item?.image && (
//                     <div className="relative overflow-hidden">
//                       <img
//                         src={item.image}
//                         alt={item.title}
//                         className="w-full h-80 object-cover transition-transform duration-500"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
//                     </div>
//                   )}

//                   <div className="pt-6 pr-6">
//                     <div className="leading-relaxed space-y-2 text-gray-700 dark:text-gray-300">
//                       {item.description}
//                     </div>

//                     {item.features && (
//                       <div className="mt-4">
//                         <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">
//                           Key Features:
//                         </h4>
//                         <div className="flex flex-wrap gap-2">
//                           {item.features.map((feature, idx) => (
//                             <span
//                               key={idx}
//                               className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-full text-sm font-medium"
//                             >
//                               ✓ {feature}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </TracingBeam>
//       </div>
//     </div>
//   );
// }

// interface Step {
//   title: string;
//   description: React.ReactNode;
//   badge: string;
//   features?: string[];
//   image?: string;
// }

// const howItWorksSteps: Step[] = [
//   {
//     title: "Choose Location 🌍",
//     description: (
//       <div>
//         <p className="mb-3">
//           Select your pickup and drop locations easily with our simple interface.
//         </p>
//         <p>
//           Whether it’s within the city or outstation, we cover multiple
//           locations to suit your travel needs.
//         </p>
//       </div>
//     ),
//     badge: "Step 1",
//     features: [
//       "Pickup & Drop Selection",
//       "Multiple City Coverage",
//       "Easy Location Search",
//     ],
//     image: "/choose-location.jpg",
//   },
//   {
//     title: "Select Vehicle 🚖🚐🚌",
//     description: (
//       <div>
//         <p className="mb-3">
//           Choose the right vehicle based on your group size and budget — cabs,
//           tempo travellers, or mini buses.
//         </p>
//         <p>
//           From economy rides to luxury travel, we have the perfect option for
//           every journey.
//         </p>
//       </div>
//     ),
//     badge: "Step 2",
//     features: ["Wide Vehicle Options", "Budget & Luxury Choices", "Group-Friendly Rides"],
//     image: "/select-vehicle.jpg",
//   },
//   {
//     title: "Make Payment 💳",
//     description: (
//       <div>
//         <p className="mb-3">
//           Securely pay online through UPI, cards, wallets, or net banking. Cash
//           options are also available.
//         </p>
//         <p>Instant booking confirmation is provided so you can plan worry-free.</p>
//       </div>
//     ),
//     badge: "Step 3",
//     features: ["Secure Payment Options", "Cash / Online Choice", "Instant Confirmation"],
//     image: "/make-payment.jpg",
//   },
//   {
//     title: "Enjoy Your Ride 🎉",
//     description: (
//       <div>
//         <p className="mb-3">
//           Sit back, relax, and enjoy your journey. Our professional drivers
//           ensure a safe and smooth ride.
//         </p>
//         <p>Perfect for business, family trips, or vacations — we make your travel stress-free.</p>
//       </div>
//     ),
//     badge: "Step 4",
//     features: ["Professional Drivers", "Safe & Comfortable Travel", "On-Time Pickup"],
//     image: "/enjoy-ride.jpg",
//   },
// ];

// export default CarRentalHowItWorks;










"use client";
import React from "react";
import { TracingBeam } from "../ui/tracing-beam";
import { motion } from "motion/react";

export function CarRentalHowItWorks() {
  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 pt-10 md:pt-20">
        
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6 text-center mb-14">
           <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white">
             How <span className="text-red-600">It Works</span>
           </h2>
           <p className="mt-3 text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
             Plan your trip in just 4 simple steps. Quick, easy and hassle-free
             booking experience with safe and reliable rides.
           </p>
         </div>

        <TracingBeam className="px-4 md:px-6">
          <div className="max-w-4xl mx-auto antialiased pt-4 relative">
            {howItWorksSteps.map((item, index) => (
              <motion.div 
                key={index} 
                className="mb-20 ml-4 md:ml-16"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Step Number & Badge */}
                <div className="flex items-center mb-8">
                  <div className="relative">
                    <div className="rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-red-600 to-red-700 text-white rounded-full text-sm font-bold px-5 py-3">
                      {item.badge}
                    </div>
                  </div>
                  <div className="ml-4 h-px flex-1 bg-gradient-to-r from-red-200 to-transparent"></div>
                </div>

                {/* Content Card */}
                <div className="group relative">
                  {/* Background Glow */}
                  <div className="absolute -inset-4  rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative  rounded-2xl duration-500 overflow-hidden">
                    {/* Image Section */}
                    {item?.image && (
                      <div className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent z-10"></div>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-1/2"></div>
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="p-6 md:p-8">
                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                        <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                          {item.title.split(' ')[0]}
                        </span>{' '}
                        <span className="text-red-600">{item.title.split(' ').slice(1).join(' ')}</span>
                      </h3>

                      {/* Description */}
                      <div className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed space-y-3 mb-6">
                        {item.description}
                      </div>

                      {/* Features */}
                      {item.features && (
                        <div className="mt-6">
                          <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3 text-lg">
                            ✨ Key Features
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {item.features.map((feature, idx) => (
                              <span
                                key={idx}
                                className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 text-red-700 dark:text-red-300 px-4 py-2 rounded-full text-sm font-medium border border-red-200 dark:border-red-800 shadow-sm hover:shadow-md transition-shadow duration-300"
                              >
                                ✓ {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TracingBeam>
      </div>
    </div>
  );
}

interface Step {
  title: string;
  description: React.ReactNode;
  badge: string;
  features?: string[];
  image?: string;
}

const howItWorksSteps: Step[] = [
  {
    title: "Choose Location 🌍",
    description: (
      <div className="space-y-3">
        <p>Select your pickup and drop locations with our intuitive interface. Perfect for city rides or outstation trips.</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">📍 Multiple locations covered nationwide</p>
      </div>
    ),
    badge: "Step 1",
    features: [
      "Smart Location Search",
      "Real-time Availability",
      "Multiple City Coverage",
    ],
    image: "/choose-location.jpg",
  },
  {
    title: "Select Vehicle 🚗",
    description: (
      <div className="space-y-3">
        <p>Choose from economy cabs to luxury vehicles and tempo travellers. Perfect for solo trips or group travel.</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">🚖 Wide range of vehicle options</p>
      </div>
    ),
    badge: "Step 2",
    features: ["Budget to Luxury", "Group-Friendly Options", "Instant Availability"],
    image: "/select-vehicle.jpg",
  },
  {
    title: "Secure Payment 💳",
    description: (
      <div className="space-y-3">
        <p>Multiple payment options including UPI, cards, and cash. 100% secure and instant confirmation.</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">🔒 Bank-level security encryption</p>
      </div>
    ),
    badge: "Step 3",
    features: ["Multiple Payment Methods", "Instant Confirmation", "Cash & Online Options"],
    image: "/make-payment.jpg",
  },
  {
    title: "Enjoy Your Ride 🎉",
    description: (
      <div className="space-y-3">
        <p>Sit back and relax with our professional drivers. Safe, comfortable, and on-time service guaranteed.</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">⭐ Rated 4.8/5 by customers</p>
      </div>
    ),
    badge: "Step 4",
    features: ["Professional Drivers", "24/7 Support", "Safe & Comfortable"],
    image: "/enjoy-ride.jpg",
  },
];

export default CarRentalHowItWorks;