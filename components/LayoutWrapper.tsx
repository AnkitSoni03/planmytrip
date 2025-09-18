"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import LoadingScreen from "./loader";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {loading && <LoadingScreen />}
      {children}
    </>
  );
}
