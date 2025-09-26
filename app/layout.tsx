import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Header/theme-provider";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlanMyTrip",
  description: "India's Largest Car Rental Service Provider..",
  icons: {
    icon: "/favicon.png",
  },
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    // Fetch the current user using Clerk
    const user = await currentUser();

    if (user) {
      // Check if the user already exists in the database
      const loggedInUser = await prisma.user.findUnique({
        where: { clerkId: user.id },
      });

      // If the user doesn't exist, create a new user in the database
      if (!loggedInUser) {
        await prisma.user.create({
          data: {
            name: user.fullName,
            clerkId: user.id,
            email: user.emailAddresses[0].emailAddress,
          },
        });
      }
    }
  } catch (error) {
    console.error("❌ Error syncing user with DB:", error);
  }

  // Root layout render
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LayoutWrapper>{children}</LayoutWrapper>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
