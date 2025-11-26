"use client";

import React from "react";
import Image from "next/image";
import { TracingBeam } from "@/components/ui/tracing-beam";

interface Step {
  title: string;
  description: React.ReactNode;
  badge: string;
  features?: string[];
  image?: string;
}

/* ------------------------------
    Memoized Step Card
------------------------------ */
const StepCard = React.memo(function StepCard({
  item,
  index,
}: {
  item: Step;
  index: number;
}) {
  return (
    <div
      className={`relative flex flex-col md:flex-row ${
        index % 2 === 1 ? "md:flex-row-reverse" : ""
      } items-center md:items-start gap-10 md:gap-14 rounded-2xl
      px-6 sm:px-10 py-10 md:py-12 transition-all duration-300`}
    >
      {/* Image */}
      <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-md">
        <Image
          src={item.image!}
          alt={item.title}
          width={900}
          height={650}
          loading="lazy"
          className="rounded-xl w-full h-64 md:h-80 object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2">
        <div className="flex items-center gap-3 mb-5">
          <span className="bg-gradient-to-r from-red-700 to-red-900 
          text-white text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full shadow-md">
            {item.badge}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            {item.title}
          </h3>
        </div>

        <div className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed space-y-2">
          {item.description}
        </div>

        {item.features && (
          <div className="mt-5">
            <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">
              Key Features:
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.features.map((f, i) => (
                <span
                  key={i}
                  className="bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-200 
                  px-3 py-1 rounded-full text-xs md:text-sm font-medium"
                >
                  ✓ {f}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

/* ------------------------------
    MAIN SECTION
------------------------------ */
export default function CarRentalHowItWorks() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white">
            How <span className="text-red-600">It Works</span>
          </h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400 text-sm md:text-lg max-w-2xl mx-auto">
            Plan your trip in just 4 easy steps — smooth, reliable & stress-free.
          </p>
        </div>

        {/* Beam + Steps */}
        <TracingBeam>
          <div className="space-y-20 md:space-y-24">
            {howItWorksSteps.map((step, i) => (
              <StepCard key={i} item={step} index={i} />
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
  );
}

/* ------------------------------
    DATA
------------------------------ */

const howItWorksSteps: Step[] = [
  {
    title: "Choose Location",
    badge: "Step 1",
    image: "/choose-location.jpg",
    description: (
      <>
        <p>Select your pickup and drop locations easily.</p>
        <p>Get instant fare estimates and availability.</p>
      </>
    ),
    features: ["Pickup & Drop", "Multi-City", "Live Availability"],
  },
  {
    title: "Select Vehicle",
    badge: "Step 2",
    image: "/select-vehicle.jpg",
    description: (
      <>
        <p>Choose from Sedan, SUV, Luxury cars or Travellers.</p>
        <p>Fully sanitized, well-maintained cars.</p>
      </>
    ),
    features: ["Economy to Luxury", "Group Friendly", "Verified Drivers"],
  },
  {
    title: "Make Payment",
    badge: "Step 3",
    image: "/make-payment.jpg",
    description: (
      <>
        <p>Secure payment via UPI, Cards, Wallets & Netbanking.</p>
        <p>No hidden charges — 100% transparency.</p>
      </>
    ),
    features: ["Instant Confirmation", "Multiple Payment Modes"],
  },
  {
    title: "Enjoy Your Ride",
    badge: "Step 4",
    image: "/enjoy-ride.jpg",
    description: (
      <>
        <p>Relax and enjoy with professional drivers.</p>
        <p>24×7 customer support during the whole trip.</p>
      </>
    ),
    features: ["Professional Chauffeurs", "On-time Pickup", "24×7 Support"],
  },
];
