"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Star,
  ChevronRight,
  Heart,
  Award,
  Users,
  Globe,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";

function Footer() {
  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Our Fleet", href: "#fleet" },
    { name: "Booking", href: "#booking" },
    { name: "Locations", href: "#locations" },
    { name: "Contact", href: "#contact" },
    { name: "FAQ", href: "#faq" },
  ];

  const services = [
    { name: "Economy Cars", href: "#cars/economy" },
    { name: "Luxury Cars", href: "#cars/luxury" },
    { name: "SUVs", href: "#cars/suv" },
    { name: "Electric Cars", href: "#cars/electric" },
    { name: "Long Term Rental", href: "#services/long-term" },
    { name: "Corporate Rental", href: "#services/corporate" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Rental Agreement", href: "#agreement" },
    { name: "Insurance Policy", href: "#insurance" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#facebook" },
    { name: "Twitter", icon: Twitter, href: "#twitter" },
    { name: "Instagram", icon: Instagram, href: "#instagram" },
    { name: "YouTube", icon: Youtube, href: "#youtube" },
  ];

  const achievements = [
    { icon: Users, number: "50K+", text: "Happy Customers" },
    { icon: Star, number: "4.9/5", text: "Customer Rating" },
    { icon: Globe, number: "25+", text: "Cities Covered" },
    { icon: Award, number: "10+ ", text: "Years Experience" },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-900 border-t border-gray-200 dark:border-gray-800">
      {/* Achievements */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="text-center group">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {item.number}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    {item.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company Info */}
          <div>
            <Link href="#home" className="inline-block mb-6">
              <Image
                src="/new-1.png"
                alt="PlanMyTrip Logo"
                width={160}
                height={64}
                className="h-auto w-auto dark:hidden hover:scale-105 transition-transform"
              />
              <Image
                src="/new.png"
                alt="PlanMyTrip Dark Logo"
                width={160}
                height={64}
                className="h-auto w-auto hidden dark:block hover:scale-105 transition-transform"
              />
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
              Drive with confidence — premium cars, competitive rates, and
              customer-first service across multiple cities.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-lg flex items-center justify-center shadow-md">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Location
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    New Delhi, india
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Call Us
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    +91 7348383868
                  </p>
                  <p className="text-xs text-gray-500">24/7 Support</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Email Us
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    planmytrip360@gmail.com
                  </p>
                  <p className="text-xs text-gray-500">Quick Response</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-6 text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-600 transition-all group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-6 text-gray-900 dark:text-white">
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, i) => (
                <li key={i}>
                  <Link
                    href={service.href}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-600 transition-all group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {service.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Social */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-6 text-gray-900 dark:text-white">
              Stay Connected
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
              Subscribe for exclusive offers and latest fleet updates.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-2 mb-6">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 border-gray-300 dark:border-gray-600 rounded-lg"
              />
              <Button className="bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg px-6">
                Subscribe
              </Button>
            </div>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, i) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={i}
                    href={social.href}
                    aria-label={social.name}
                    className="w-10 h-10 border border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center transition-all"
                  >
                    <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-gray-900 dark:bg-black text-white text-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 flex items-center gap-1">
            © 2025 PlanMyTrip. All rights reserved. • Made with{" "}
            <Heart className="h-4 w-4 text-red-500 animate-pulse" /> for
            travelers.
          </p>
          <div className="flex flex-wrap gap-4">
            {legalLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
