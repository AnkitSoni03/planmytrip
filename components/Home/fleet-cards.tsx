import React from "react";
import { CabCard, Icon } from "../ui/evervault-card";
import Link from "next/link";

export function FleetCards() {
  const cabs = [
    {
      id: 1,
      name: "Economy Sedan",
      image: "/sedan.png",
      type: "Cab",
      capacity: "4 passengers",
      price: "₹12/km",
      description: "Comfortable and affordable travel",
    },
    {
      id: 2,
      name: "Premium SUV",
      image: "/SUV.png",
      type: "Cab",
      capacity: "6 passengers",
      price: "₹18/km",
      description: "Spacious and luxurious ride",
    },
    {
      id: 3,
      name: "Luxury Car",
      image: "/Laxury.png",
      type: "Cab",
      capacity: "4 passengers",
      price: "₹25/km",
      description: "Premium travel experience",
    },
    {
      id: 4,
      name: "9-Seater Tempo Traveller",
      image: "/tempo.png",
      type: "Tempo Traveller",
      capacity: "9 passengers",
      price: "₹20/km",
      description: "Compact and comfortable for small groups",
    },
    {
      id: 5,
      name: "12-Seater Tempo Traveller",
      image: "/tempo.png",
      type: "Tempo Traveller",
      capacity: "12 passengers",
      price: "₹24/km",
      description: "Perfect for medium-sized groups",
    },
    {
      id: 6,
      name: "16-Seater Tempo Traveller",
      image: "/tempo.png",
      type: "Tempo Traveller",
      capacity: "16 passengers",
      price: "₹28/km",
      description: "Spacious and ideal for family trips",
    },
    {
      id: 7,
      name: "20-Seater Mini Bus",
      image: "/bus.png",
      type: "Mini Bus",
      capacity: "20 passengers",
      price: "₹35/km",
      description: "Affordable option for large groups",
    },
    {
      id: 8,
      name: "25-Seater Mini Bus",
      image: "/bus.png",
      type: "Mini Bus",
      capacity: "25 passengers",
      price: "₹40/km",
      description: "Spacious bus for comfortable long rides",
    },
    {
      id: 9,
      name: "30-Seater Mini Bus",
      image: "/bus.png",
      type: "Mini Bus",
      capacity: "30 passengers",
      price: "₹45/km",
      description: "Best choice for big gatherings and tours",
    },
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 text-center mb-14 pt-15">
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white">
          Our <span className="text-red-600">Fleet</span>
        </h2>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
          Choose from our variety of well-maintained vehicles for your
          comfortable journey.{" "}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto px-3">
        {cabs.map((cab) => (
          <div
            key={cab.id}
            className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start p-3 relative h-[26rem] sm:h-[25rem]"
          >
            <Icon className="absolute h-5 w-5 -top-2 -left-2 dark:text-white text-black" />
            <Icon className="absolute h-5 w-5 -bottom-2 -left-2 dark:text-white text-black" />
            <Icon className="absolute h-5 w-5 -top-2 -right-2 dark:text-white text-black" />
            <Icon className="absolute h-5 w-5 -bottom-2 -right-2 dark:text-white text-black" />

            <CabCard cab={cab} />

            <h2 className="dark:text-white text-black mt-3 text-xs font-medium px-1">
              {cab.description}
            </h2>
            <button className="text-xs font-medium dark:border-white/[0.2] border-black/[0.2] rounded-full mt-3 text-black dark:text-white px-3 py-1 border">
              <Link href="/booking">Book Now</Link>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
