"use client";
import React from "react";
import { TracingBeam } from "../ui/tracing-beam";

export function CarRentalHowItWorks() {
  return (
    <div className="min-h-screen py-6">
      <div className="max-w-6xl mx-auto px-4 pt-20 ">
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

        <TracingBeam className="px-6">
          <div className="max-w-4xl mx-auto antialiased pt-4 relative">
            {howItWorksSteps.map((item, index) => (
              <div key={index} className="mb-16 ml-8 md:ml-16">
                {/* Step Number & Badge */}
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-red-700 to-red-900 text-white rounded-full text-sm font-semibold px-4 py-2 shadow-md">
                    {item.badge}
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  {item.title}
                </h2>

                {/* Description Card with Image */}
                <div className="rounded-xl overflow-hidden mb-6 transform transition-all duration-300 light:bg-white">
                  {item?.image && (
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-80 object-cover transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                  )}

                  <div className="pt-6 pr-6">
                    <div className="leading-relaxed space-y-2 text-gray-700 dark:text-gray-300">
                      {item.description}
                    </div>

                    {item.features && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">
                          Key Features:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {item.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-full text-sm font-medium"
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
      <div>
        <p className="mb-3">
          Select your pickup and drop locations easily with our simple interface.
        </p>
        <p>
          Whether it’s within the city or outstation, we cover multiple
          locations to suit your travel needs.
        </p>
      </div>
    ),
    badge: "Step 1",
    features: [
      "Pickup & Drop Selection",
      "Multiple City Coverage",
      "Easy Location Search",
    ],
    image: "/choose-location.jpg",
  },
  {
    title: "Select Vehicle 🚖🚐🚌",
    description: (
      <div>
        <p className="mb-3">
          Choose the right vehicle based on your group size and budget — cabs,
          tempo travellers, or mini buses.
        </p>
        <p>
          From economy rides to luxury travel, we have the perfect option for
          every journey.
        </p>
      </div>
    ),
    badge: "Step 2",
    features: ["Wide Vehicle Options", "Budget & Luxury Choices", "Group-Friendly Rides"],
    image: "/select-vehicle.jpg",
  },
  {
    title: "Make Payment 💳",
    description: (
      <div>
        <p className="mb-3">
          Securely pay online through UPI, cards, wallets, or net banking. Cash
          options are also available.
        </p>
        <p>Instant booking confirmation is provided so you can plan worry-free.</p>
      </div>
    ),
    badge: "Step 3",
    features: ["Secure Payment Options", "Cash / Online Choice", "Instant Confirmation"],
    image: "/make-payment.jpg",
  },
  {
    title: "Enjoy Your Ride 🎉",
    description: (
      <div>
        <p className="mb-3">
          Sit back, relax, and enjoy your journey. Our professional drivers
          ensure a safe and smooth ride.
        </p>
        <p>Perfect for business, family trips, or vacations — we make your travel stress-free.</p>
      </div>
    ),
    badge: "Step 4",
    features: ["Professional Drivers", "Safe & Comfortable Travel", "On-Time Pickup"],
    image: "/enjoy-ride.jpg",
  },
];

export default CarRentalHowItWorks;