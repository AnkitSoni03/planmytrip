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
  Clock,
  Star,
  Shield,
  CreditCard,
  ChevronRight,
  Heart,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";

function Footer() {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Fleet", href: "/fleet" },
    { name: "Booking", href: "/booking" },
    { name: "Locations", href: "/locations" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  const services = [
    { name: "Economy Cars", href: "/cars/economy" },
    { name: "Luxury Cars", href: "/cars/luxury" },
    { name: "SUVs", href: "/cars/suv" },
    { name: "Electric Cars", href: "/cars/electric" },
    { name: "Long Term Rental", href: "/services/long-term" },
    { name: "Corporate Rental", href: "/services/corporate" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Rental Agreement", href: "/agreement" },
    { name: "Insurance Policy", href: "/insurance" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "#",
      color: "hover:text-blue-500",
    },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-sky-400" },
    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
      color: "hover:text-pink-500",
    },
    { name: "YouTube", icon: Youtube, href: "#", color: "hover:text-red-500" },
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure Booking",
      desc: "Safe & encrypted transactions",
    },
    { icon: Clock, title: "24/7 Support", desc: "Round the clock assistance" },
    { icon: Star, title: "Premium Quality", desc: "Well-maintained vehicles" },
    {
      icon: CreditCard,
      title: "Easy Payment",
      desc: "Multiple payment options",
    },
  ];

  return (
    <footer className="bg-background border-t border-border">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center">
              {/* Light Mode Logo */}
              <Link href={"/"}>
              <Image
                src="/pmt-logo.png"
                alt="PlanMyTrip Logo"
                width={150}
                height={60}
                className="h-auto w-auto dark:hidden"
              />

              {/* Dark Mode Logo */}
              <Image
                src="/pmt-logo-dark.png"
                alt="PlanMyTrip Logo Dark"
                width={150}
                height={60}
                className="h-auto w-auto hidden dark:block"
              />
              </Link>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Experience the freedom of the road with our premium car rental
              service. Quality vehicles, competitive prices, and exceptional
              customer service.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-950/20 rounded-full flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-red-600" />
                </div>
                <span className="text-muted-foreground">
                  123 Main Street, City, State 12345
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-950/20 rounded-full flex items-center justify-center">
                  <Phone className="h-4 w-4 text-red-600" />
                </div>
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-950/20 rounded-full flex items-center justify-center">
                  <Mail className="h-4 w-4 text-red-600" />
                </div>
                <span className="text-muted-foreground">
                  info@rentdrive.com
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="flex items-center text-muted-foreground hover:text-red-600 transition-colors duration-300 group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="flex items-center text-muted-foreground hover:text-red-600 transition-colors duration-300 group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0" />
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Stay Updated
            </h3>
            <p className="text-muted-foreground mb-6 text-sm">
              Subscribe to our newsletter for exclusive deals and latest updates
              on our fleet.
            </p>

            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 border-border focus:border-red-500 focus:ring-red-500"
                />
                <Button className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  Subscribe
                </Button>
              </div>

              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <input type="checkbox" className="rounded border-border" />
                <span>I agree to receive promotional emails</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="text-sm font-medium text-foreground mb-4">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 bg-muted hover:bg-red-50 dark:hover:bg-red-950/20 rounded-full flex items-center justify-center transition-all duration-300 group ${social.color}`}
                    >
                      <IconComponent className="h-5 w-5 text-muted-foreground group-hover:scale-110 transition-transform duration-300" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© 2024 RentDrive. All rights reserved.</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500 fill-current" />
                <span>for car enthusiasts</span>
              </span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6">
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-red-600 transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-green-500" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span>4.8/5 Customer Rating</span>
              </div>
              <div className="flex items-center justify-center md:justify-end space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>24/7 Customer Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
