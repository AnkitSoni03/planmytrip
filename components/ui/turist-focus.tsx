"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  card: {
    title: string;
    src: string;
    description: string;
  };
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}

export const Card: React.FC<CardProps> = React.memo(
  ({ card, index, hovered, setHovered }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
      )}
    >
      <img
        src={card.src}
        alt={card.title}
        className="object-cover absolute inset-0 w-full h-full"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex flex-col justify-end py-6 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200 mb-2">
          {card.title}
        </div>
        <p className="text-sm text-neutral-200 line-clamp-3">
          {card.description}
        </p>
      </div>
    </div>
  )
);

Card.displayName = "Card";