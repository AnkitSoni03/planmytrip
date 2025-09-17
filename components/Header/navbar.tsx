// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import SearchInput from "../search-input";
// import { ModeToggle } from "../toggle-mode"
// import { Menu, X } from "lucide-react";
// import { usePathname } from "next/navigation";
// import { Button } from "../ui/button";

// function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const pathname = usePathname();

//   const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
//   const closeMobileMenu = () => setIsMobileMenuOpen(false);

//   const navItems = [
//     { name: "Home", href: "/" },
//     { name: "Articles", href: "/articles" },
//     { name: "About", href: "/about" },
//     { name: "Dashboard", href: "/dashboard" },
//   ];

//   const isActive = (href: string) => {
//     if (href === "/") {
//       return pathname === "/" || !navItems.some((item) => item.href === pathname);
//     }
//     return pathname === href;
//   };

//   return (
//     <>
//       {/* Top Navbar */}
//       <nav className="sticky top-0 z-50 w-full border-b border-yellow-500/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex h-20 items-center justify-between">
//             {/* Left Section - Logo */}
//             <div className="flex items-center">
//               <Link href="/" className="flex items-center space-x-2">
//                 <Image
//                   src="/the-diary-logo.png"
//                   alt=""
//                   width={100}
//                   height={60}
//                   className="h-auto w-auto"
//                 />
//               </Link>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center gap-8">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className={`text-sm font-medium transition-colors ${
//                     isActive(item.href)
//                       ? "text-yellow-500"
//                       : "text-muted-foreground hover:text-yellow-500"
//                   }`}
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//             </div>

//             {/* Right Section */}
//             <div className="hidden sm:flex items-center gap-4">
//               <div className="hidden lg:block">
//                 <SearchInput />
//               </div>
//               <ModeToggle />

//               <div className="flex gap-2">
//                 <Button
//                   size="sm"
//                   variant="ghost"
//                   className="hover:text-yellow-500 hover:bg-yellow-500/10 transition"
//                 >
//                   Login
//                 </Button>
//                 <Button
//                   size="sm"
//                   className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:opacity-90 transition"
//                 >
//                   Signup
//                 </Button>
//               </div>
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="flex items-center gap-2 sm:hidden">
//               <ModeToggle />
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={toggleMobileMenu}
//                 className="p-2 hover:text-yellow-500 transition"
//               >
//                 {isMobileMenuOpen ? (
//                   <X className="h-5 w-5" />
//                 ) : (
//                   <Menu className="h-5 w-5" />
//                 )}
//               </Button>
//             </div>
//           </div>

//           {/* Mobile Search Bar */}
//           <div className="sm:hidden pb-3">
//             <SearchInput />
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu Overlay */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 z-40 sm:hidden">
//           {/* Backdrop */}
//           <div
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm"
//             onClick={closeMobileMenu}
//           />

//           {/* Mobile Menu Panel */}
//           <div className="fixed right-0 top-0 h-full w-64 bg-background border-l border-yellow-500/40 shadow-xl">
//             <div className="flex flex-col h-full">
//               {/* Header */}
//               <div className="flex items-center justify-between p-4 border-b border-yellow-500/40">
//                 <h2 className="text-lg font-semibold text-yellow-500">Menu</h2>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={closeMobileMenu}
//                   className="p-2 hover:text-yellow-500"
//                 >
//                   <X className="h-5 w-5" />
//                 </Button>
//               </div>

//               {/* Navigation Links */}
//               <div className="flex-1 py-20">
//                 <div className="space-y-1 px-4">
//                   {navItems.map((item) => (
//                     <Link
//                       key={item.name}
//                       href={item.href}
//                       className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
//                         isActive(item.href)
//                           ? "text-yellow-500 bg-yellow-500/10"
//                           : "text-muted-foreground hover:text-yellow-500 hover:bg-yellow-500/10"
//                       }`}
//                       onClick={closeMobileMenu}
//                     >
//                       {item.name}
//                     </Link>
//                   ))}
//                 </div>
//               </div>

//               {/* Auth Buttons */}
//               <div className="p-4 border-t border-yellow-500/40 space-y-3">
//                 <Button
//                   className="w-full hover:text-yellow-500 hover:bg-yellow-500/10 transition"
//                   variant="outline"
//                   onClick={closeMobileMenu}
//                 >
//                   Login
//                 </Button>
//                 <Button
//                   className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:opacity-90 transition"
//                   onClick={closeMobileMenu}
//                 >
//                   Signup
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Navbar;

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
  MapPin,
  Calendar,
  Phone,
  ChevronDown,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Fleet", href: "/fleet" },
    { name: "Booking", href: "/booking" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
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
              <Image
                src="/pmt-logo.png"
                alt="PlanMyTrip Logo"
                width={120}
                height={60}
                className="h-auto w-auto dark:hidden"
              />

              {/* Dark Mode Logo */}
              <Image
                src="/pmt-logo-dark.png"
                alt="PlanMyTrip Logo Dark"
                width={120}
                height={60}
                className="h-auto w-auto hidden dark:block"
              />
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

              <div className="flex gap-3">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="relative overflow-hidden bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <span className="relative z-10">Book Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </div>
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
              <div className="flex-1 overflow-y-auto py-6">
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
                <div className="space-y-3">
                  <Button
                    className="w-full text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 border-border transition-all duration-300"
                    variant="outline"
                    onClick={closeMobileMenu}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={closeMobileMenu}
                  >
                    Book Now
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20">
                    <Car className="h-5 w-5 text-red-600 mx-auto mb-1" />
                    <p className="text-xs text-red-600 font-medium">
                      500+ Cars
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20">
                    <MapPin className="h-5 w-5 text-red-600 mx-auto mb-1" />
                    <p className="text-xs text-red-600 font-medium">
                      50+ Locations
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20">
                    <Calendar className="h-5 w-5 text-red-600 mx-auto mb-1" />
                    <p className="text-xs text-red-600 font-medium">
                      24/7 Support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
