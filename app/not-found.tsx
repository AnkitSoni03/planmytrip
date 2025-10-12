"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      
      {/* Static glowing orbs - no animation */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl">
        {/* Main 404 with layered effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-[12rem] sm:text-[16rem] font-black text-foreground/5 select-none">
              404
            </div>
          </div>
          <h1 className="relative text-8xl sm:text-9xl font-black tracking-tighter bg-gradient-to-br from-primary via-primary to-primary/80 bg-clip-text text-transparent drop-shadow-2xl">
            404
          </h1>
        </motion.div>

        {/* Floating Icon with glow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 rounded-2xl blur-2xl" />
            <div className="relative bg-card p-5 rounded-2xl border border-border shadow-2xl backdrop-blur-xl">
              <Search className="w-12 h-12 text-primary" strokeWidth={2.5} />
            </div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-md mx-auto leading-relaxed">
            The page you're looking for has vanished into the void. Let's get you back on track.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Button
            onClick={() => router.push("/")}
            className="group relative bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 py-6 text-lg font-semibold shadow-[0_0_30px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] transition-all duration-300 hover:scale-105"
          >
            <Home className="w-5 h-5 mr-2 inline-block transition-transform" />
            Back to Home
          </Button>
          
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="group rounded-xl px-8 py-6 text-lg font-semibold backdrop-blur-xl transition-all duration-300 hover:scale-105 border-2"
          >
            <ArrowLeft className="w-5 h-5 mr-2 inline-block group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Button>
        </motion.div>

        {/* Decorative dots - smooth animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center gap-3 mb-8"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-2 h-2 bg-primary rounded-full"
          />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="w-2 h-2 bg-primary/70 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="w-2 h-2 bg-primary/40 rounded-full"
          />
        </motion.div>
      </div>
    </div>
  );
}