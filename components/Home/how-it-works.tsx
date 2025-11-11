"use client";
import React from "react";
import { TracingBeam } from "../ui/tracing-beam";

export function CarRentalHowItWorks() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            How <span className="text-red-600">It Works</span>
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Plan your trip in just 4 easy steps — a smooth, reliable, and
            stress-free car rental experience designed for your convenience.
          </p>
        </div>

        {/* Steps Section */}
        <TracingBeam className="px-4 sm:px-6">
          <div className="max-w-5xl mx-auto relative space-y-20 md:space-y-24">
            {howItWorksSteps.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                } items-center md:items-start gap-10 md:gap-14 
                 rounded-2xl 
                shadow-md transition-all duration-300 
                overflow-hidden px-6 sm:px-10 py-10 md:py-12`}
              >
                {/* Image */}
                {item.image && (
                  <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-md">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 md:h-80 object-cover rounded-xl transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="w-full md:w-1/2">
                  {/* Step + Title */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="bg-gradient-to-r from-red-700 to-red-900 text-white text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full shadow-md">
                      {item.badge}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed space-y-2">
                    {item.description}
                  </div>

                  {/* Features */}
                  {item.features && (
                    <div className="mt-5">
                      <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">
                        Key Features:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {item.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-200 px-3 py-1 rounded-full text-xs md:text-sm font-medium"
                          >
                            ✓ {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
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
      <>
        <p>
          Select your pickup and drop locations with our intuitive interface.
          Whether within the city or for outstation travel, we’ve got you
          covered.
        </p>
        <p>
          Get accurate pricing and availability instantly based on your selected
          route.
        </p>
      </>
    ),
    badge: "Step 1",
    features: [
      "Pickup & Drop Selection",
      "Multi-City Coverage",
      "Live Availability",
    ],
    image: "/choose-location.jpg",
  },
  {
    title: "Select Vehicle 🚖",
    description: (
      <>
        <p>
          Choose from a wide range of vehicles — economy, SUVs, or luxury rides,
          based on your comfort and budget.
        </p>
        <p>
          Each car is clean, sanitized, and maintained for the best travel
          experience.
        </p>
      </>
    ),
    badge: "Step 2",
    features: [
      "Economy to Luxury Options",
      "Group-Friendly Vehicles",
      "Verified Drivers",
    ],
    image: "/select-vehicle.jpg",
  },
  {
    title: "Make Payment 💳",
    description: (
      <>
        <p>
          Complete your booking securely through UPI, cards, wallets, or net
          banking — with instant confirmation.
        </p>
        <p>
          We offer full transparency — no hidden charges or surprise fees.
        </p>
      </>
    ),
    badge: "Step 3",
    features: ["UPI / Card / Wallet", "Instant Confirmation", "No Hidden Fees"],
    image: "/make-payment.jpg",
  },
  {
    title: "Enjoy Your Ride 🎉",
    description: (
      <>
        <p>
          Sit back and relax — our professional drivers ensure punctual, safe,
          and comfortable rides to your destination.
        </p>
        <p>
          Get 24/7 support for any help during your trip. Your journey is our
          priority.
        </p>
      </>
    ),
    badge: "Step 4",
    features: [
      "Professional Chauffeurs",
      "On-Time Pickup",
      "24/7 Customer Support",
    ],
    image: "/enjoy-ride.jpg",
  },
];

export default CarRentalHowItWorks;
