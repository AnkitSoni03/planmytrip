"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchInput from "./search-input";
import { ModeToggle } from "./toggle-mode";
import { Menu, X, Car, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const pathname = usePathname();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Set scrolled state
      setIsScrolled(currentScrollY > 10);

      // Only apply mobile scroll behavior on mobile screens
      if (window.innerWidth < 768) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down - show compact navbar
          setShowNavbar(false);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up - show full navbar
          setShowNavbar(true);
        }
      } else {
        // Always show navbar on desktop
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Handle window resize
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowNavbar(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [lastScrollY]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Fleet", href: "/fleet" },
    { name: "AI Trip Planner", href: "/ai-trip-planner" },
    { name: "Booking", href: "/booking" },
    { name: "My Bookings", href: "/my-bookings" },
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
      <nav
        className={`sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              showNavbar ? "h-20" : "h-16 md:h-20"
            }`}
          >
            {/* Left Section - Logo (Hidden on mobile when scrolling) */}
            <div
              className={`flex items-center transition-all duration-300 ${
                showNavbar
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4 md:opacity-100 md:translate-x-0"
              }`}
            >
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

            {/* Center Section - Search (Expanded when logo is hidden on mobile) */}
            <div
              className={`md:hidden transition-all duration-300 ${
                showNavbar
                  ? "opacity-0 scale-95 pointer-events-none absolute"
                  : "opacity-100 scale-100 flex-1 mx-4"
              }`}
            >
              <Suspense
                fallback={
                  <div className="text-sm text-gray-400">Loading...</div>
                }
              >
                <SearchInput />
              </Suspense>
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
                <Suspense
                  fallback={
                    <div className="text-sm text-gray-400">Loading...</div>
                  }
                >
                  <SearchInput />
                </Suspense>
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

            {/* Mobile Menu Button and Controls */}
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

          {/* Mobile Search Bar (Only shown when navbar is expanded) */}
          <div
            className={`md:hidden transition-all duration-300 overflow-hidden ${
              showNavbar
                ? "pb-4 max-h-20 opacity-100"
                : "pb-0 max-h-0 opacity-0"
            }`}
          >
            <Suspense
              fallback={<div className="text-sm text-gray-400">Loading...</div>}
            >
              <SearchInput />
            </Suspense>
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
