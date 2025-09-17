"use client";
import { motion } from "motion/react";
import React from "react";
import { ImagesSlider } from "../ui/images-slider";
import Link from "next/link";

export function HeroSection() {
  const images = ["/hero-2.jpg", "/hero-3.jpg", "/hero-1.jpg"];

  return (
    <ImagesSlider className="h-[42rem]" images={images}>
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-50 flex flex-col justify-center items-center text-center px-6"
      >
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-extrabold text-4xl md:text-6xl lg:text-7xl text-white leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
        >
          Plan Your <span className="text-red-500">Perfect Trip</span> <br />
          Anytime, Anywhere
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-4 text-base md:text-lg lg:text-xl text-neutral-200 max-w-2xl leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
        >
          Hassle-free cab booking, transparent pricing, and comfortable rides.  
          Your journey begins here 🚖✨
        </motion.p>

        {/* CTA Button (unchanged, same as before) */}
        <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-6 shadow-md">
          <Link
            href="/booking"
            className="flex items-center justify-center w-full h-full"
          >
            <span className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
              Book now →
            </span>
          </Link>
          <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
  );
}
