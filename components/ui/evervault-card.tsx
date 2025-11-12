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
          {/* Cab Image - Mobile ke liye chota */}
          <div className="relative h-28 w-44 md:h-40 md:w-60 rounded-xl md:rounded-lg flex items-center justify-center overflow-hidden mb-2 md:mb-3 transition-all duration-300 ">
            <Image
              src={cab?.image || "/default-cab.jpg"}
              alt={cab?.name || "Cab"}
              fill
              className="object-cover rounded-xl md:rounded-lg "
            />
          </div>
          
          {/* Cab Details */}
          <div className="text-center px-1 md:px-2">
            <h3 className="dark:text-white text-black font-bold text-base md:text-lg mb-1 line-clamp-1">
              {cab?.name}
            </h3>
            <div className="flex justify-center gap-3 mb-1">
              <span className=" text-xs px-2 py-1 rounded-full font-medium">
                {cab?.type}
              </span>
              <span className="text-xs px-2 py-1 rounded-full font-medium">
                {cab?.capacity}
              </span>
            </div>
            <p className="dark:text-red-400 text-red-500 font-bold rounded-full inline-block mt-1">
              {cab?.price}
            </p>
          </div>
        </div>
        
        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5 rounded-3xl opacity-0 transition-opacity duration-300" />
      </div>
    </div>
  );
};

export const Icon = ({ className, ...rest }: { className?: string } & React.SVGProps<SVGSVGElement>) => {
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