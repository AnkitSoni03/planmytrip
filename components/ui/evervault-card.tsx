"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const CabCard = ({
  cab,
  className,
}: {
  cab?: {
    name: string;
    image: string;
    type: string;
    capacity: string;
    price: string;
  };
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "p-0.5 bg-transparent flex items-center justify-center w-full h-full relative",
        className
      )}
    >
      <div className="group/card rounded-3xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full">
        <div className="relative z-10 flex items-center justify-center flex-col">
          {/* Cab Image */}
          <div className="relative h-40 w-60 rounded-lg flex items-center justify-center overflow-hidden mb-3">
            <Image
              src={cab?.image || "/default-cab.jpg"}
              alt={cab?.name || "Cab"}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          
          {/* Cab Details */}
          <div className="text-center px-2">
            <h3 className="dark:text-white text-black font-bold text-lg mb-1">
              {cab?.name}
            </h3>
            <p className="dark:text-gray-300 text-gray-700 text-xs font-medium mb-1">
              Type: {cab?.type}
            </p>
            <p className="dark:text-gray-300 text-gray-700 text-xs font-medium mb-1">
              Capacity: {cab?.capacity}
            </p>
            <p className="dark:text-red-500 text-red-600 font-bold text-sm">
              {cab?.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};