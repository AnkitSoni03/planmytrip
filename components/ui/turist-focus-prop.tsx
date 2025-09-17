"use client";

import React, { useState } from "react";
import { Card } from "./turist-focus";

export interface TouristCard {
  title: string;
  src: string;
  description: string;
}

interface FocusCardsProps {
  cards: TouristCard[];
}

export const FocusCards: React.FC<FocusCardsProps> = ({ cards }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white">
          Top <span className="text-red-600">Tourist Places</span>
        </h2>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
          Discover India’s most iconic destinations — from the timeless beauty
          of the Taj Mahal to the vibrant culture of Jaipur, serene backwaters
          of Kerala, and the spiritual vibes of Varanasi. Plan your perfect trip
          with us today!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto md:px-8 w-full">
        {cards.map((card, index) => (
          <Card
            key={card.title}
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}
      </div>
    </>
  );
};
