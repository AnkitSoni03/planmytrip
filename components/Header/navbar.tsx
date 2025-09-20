"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchInput from "./search-input";
import { ModeToggle } from "./toggle-mode";
import {
  Menu,
  X,
  Car,
  ChevronDown,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Fleet", href: "/fleet" },
    { name: "AI Trip Planner", href: "/ai-trip-planner" },
    { name: "Booking", href: "/booking" },
    { name: "Dashboard", href: "/dashboard" },
    ];

  const isActive = (href: string) => {
    if (href === "/") {
      return (
        pathname === "/" || !navItems.some((item) => item.href === pathname)
      );
    }
    return pathname === href;
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Left Section - Logo */}
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

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 group ${
                    isActive(item.href)
                      ? "text-red-600 dark:text-red-400"
                      : "text-muted-foreground hover:text-red-600 dark:hover:text-red-400"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-rose-600 transition-all duration-300 group-hover:w-full ${
                      isActive(item.href) ? "w-full" : ""
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="hidden md:flex items-center gap-4">
              <div className="hidden lg:block">
                <SearchInput />
              </div>

              <ModeToggle />

              <SignedIn>
                <UserButton />
              </SignedIn>

              <SignedOut>
                <div className="flex gap-2">
                  <SignInButton mode="modal">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:opacity-90 transition"
                    >
                      Login
                    </Button>
                  </SignInButton>
                </div>
              </SignedOut>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <ModeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="p-2 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <SearchInput />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300"
            onClick={closeMobileMenu}
          />

          {/* Mobile Menu Panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background border-l border-border shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-rose-600 rounded-lg flex items-center justify-center">
                    <Car className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-red-600">Menu</h2>
                    <p className="text-xs text-muted-foreground">
                      Navigate with ease
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeMobileMenu}
                  className="p-2 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-full transition-all duration-300"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto py-15">
                <div className="space-y-1 px-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 group ${
                        isActive(item.href)
                          ? "text-red-600 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800"
                          : "text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                      }`}
                      onClick={closeMobileMenu}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-6 border-t border-border bg-muted/30">
                <SignedIn>
                  <UserButton />
                </SignedIn>

                <SignedOut>
                  <SignInButton mode="modal">
                    <Button
                      className="w-full hover:text-red-500 hover:bg-red-500/10 transition"
                      variant="outline"
                      onClick={closeMobileMenu}
                    >
                      Login
                    </Button>
                  </SignInButton>
                </SignedOut>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;