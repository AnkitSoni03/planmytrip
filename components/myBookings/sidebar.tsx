"use client";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import {
  FileText,
  LayoutDashboard,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="md:hidden m-4">
            <LayoutDashboard className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px]">
          <DashboardSidebar closeSheet={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>
      <div className="hidden md:block h-screen w-[250px] border-r bg-background">
        <DashboardSidebar />
      </div>
    </div>
  );
};

export default Sidebar;

function DashboardSidebar({ closeSheet }: { closeSheet?: () => void }) {
  const pathname = usePathname();
  const links = [
    { href: "/my-bookings", label: "Confirm Booking", icon: LayoutDashboard },
    { href: "/my-bookings/cenceled-booking", label: "Cancelled Booking", icon: FileText },
    { href: "/my-bookings/feedback", label: "Feedback", icon: MessageCircle },
  ];

  return (
    <div className="h-full px-4 py-6">
      <div className="flex items-center pb-5">
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

      <nav className="space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href; // check kar current route
          return (
            <Link key={href} href={href}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  isActive
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : ""
                }`}
                onClick={closeSheet}
              >
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
