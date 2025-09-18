"use client";
import { CustomerReview } from "@/components/Home/customer-review";
import { FAQSection } from "@/components/Home/faq";
import { HeroSection } from "@/components/Home/hero";
import CarRentalHowItWorks from "@/components/Home/how-it-works";
import { FleetCards } from "@/components/Home/fleet-cards";
import { Offers } from "@/components/Home/offers";
import { Services } from "@/components/Home/service";
import { WhyChooseUs } from "@/components/Home/whyChooseUs";
import React from "react";
import { indiaTouristPlaces } from "@/components/Home/turist-card";
import { FocusCards } from "@/components/ui/turist-focus-prop";
import Navbar from "@/components/Header/navbar";
import Footer from "@/components/Footer/footer";

function page() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <WhyChooseUs />
      <FleetCards />
      <Services />
      <Offers />
      <FocusCards cards={indiaTouristPlaces} />
      <CarRentalHowItWorks />
      <CustomerReview />
      <FAQSection />
      <Footer />
    </>
  );
}

export default page;
