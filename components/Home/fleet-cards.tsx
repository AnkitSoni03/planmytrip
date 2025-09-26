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
      description: "Perfect for city rides and short trips. Comfortable seating with AC. Affordable pricing for budget-conscious travelers. Great fuel efficiency.",
    },
    {
      id: 2,
      name: "Premium SUV",
      image: "/SUV.png",
      type: "Cab",
      capacity: "6 passengers",
      price: "₹18/km",
      description: "Spacious interior with luxury features. Ideal for family trips and airport transfers. Enhanced comfort with premium upholstery. Perfect for long journeys.",
    },
    {
      id: 3,
      name: "Luxury Car",
      image: "/Laxury.png",
      type: "Cab",
      capacity: "4 passengers",
      price: "₹25/km",
      description: "Premium luxury experience with top-notch features. Executive class comfort for business travels. Professional chauffeur service included. Ultimate travel experience.",
    },
    {
      id: 4,
      name: "9-Seater Tempo Traveller",
      image: "/tempo.png",
      type: "Tempo Traveller",
      capacity: "9 passengers",
      price: "₹20/km",
      description: "Compact yet spacious for small groups. Comfortable seating with ample legroom. Ideal for family outings and small tours. Economical for group travel.",
    },
    {
      id: 5,
      name: "12-Seater Tempo Traveller",
      image: "/tempo.png",
      type: "Tempo Traveller",
      capacity: "12 passengers",
      price: "₹24/km",
      description: "Perfect for medium-sized groups and corporate trips. Comfortable seating arrangement with AC. Great for pilgrimages and weekend getaways. Reliable and safe.",
    },
    {
      id: 6,
      name: "16-Seater Tempo Traveller",
      image: "/tempo.png",
      type: "Tempo Traveller",
      capacity: "16 passengers",
      price: "₹28/km",
      description: "Spacious vehicle ideal for large families. Comfortable for long distance journeys. Ample luggage space available. Perfect for wedding parties and events.",
    },
    {
      id: 7,
      name: "20-Seater Mini Bus",
      image: "/bus.png",
      type: "Mini Bus",
      capacity: "20 passengers",
      price: "₹35/km",
      description: "Affordable transportation for large groups. Comfortable seating with good legroom. Ideal for school trips and corporate events. Economical for long tours.",
    },
    {
      id: 8,
      name: "25-Seater Mini Bus",
      image: "/bus.png",
      type: "Mini Bus",
      capacity: "25 passengers",
      price: "₹40/km",
      description: "Spacious bus with comfortable seating arrangement. Perfect for large family gatherings and tours. Enhanced safety features included. Great for interstate travel.",
    },
    {
      id: 9,
      name: "30-Seater Mini Bus",
      image: "/bus.png",
      type: "Mini Bus",
      capacity: "30 passengers",
      price: "₹45/km",
      description: "Largest in our fleet for big groups. Ideal for weddings, events and large tours. Comfortable journey with experienced driver. Best value for money.",
    },
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 md:px-6 text-center mb-8 md:mb-14 pt-10 md:pt-15">
        <h2 className="text-2xl md:text-4xl font-extrabold text-neutral-900 dark:text-white">
          Our <span className="text-red-600">Fleet</span>
        </h2>
        <p className="mt-2 md:mt-3 text-neutral-600 dark:text-neutral-400 text-sm md:text-lg max-w-2xl mx-auto">
          Choose from our variety of well-maintained vehicles for your comfortable journey.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto px-3">
        {cabs.map((cab) => (
          <div
            key={cab.id}
            className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start p-3 relative h-[24rem] sm:h-[26rem] md:h-[28rem]  bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500"
          >
            <Icon className="absolute h-4 w-4 md:h-5 md:w-5 -top-2 -left-2 dark:text-white text-black" />
            <Icon className="absolute h-4 w-4 md:h-5 md:w-5 -bottom-2 -left-2 dark:text-white text-black" />
            <Icon className="absolute h-4 w-4 md:h-5 md:w-5 -top-2 -right-2 dark:text-white text-black" />
            <Icon className="absolute h-4 w-4 md:h-5 md:w-5 -bottom-2 -right-2 dark:text-white text-black" />

            <CabCard cab={cab} />

            <p className="dark:text-gray-300 text-gray-600 mt-2 text-xs font-medium px-1 line-clamp-4 min-h-[4rem] leading-relaxed">
              {cab.description}
            </p>
            
            <button className="w-full mt-3 md:mt-4 text-xs font-medium dark:border-white/[0.2] border-black/[0.2] rounded-full text-black dark:text-white px-3 py-2 border bg-white dark:bg-neutral-800 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 group">
              <Link href="/booking" className="flex items-center justify-center gap-1">
                Book Now 
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}