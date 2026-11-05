"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const PETALS = [
  { left: "12%", size: 11, sway: 26, delay: 0.4, duration: 13, spin: 220 },
  { left: "34%", size: 8, sway: -20, delay: 4.2, duration: 15, spin: -180 },
  { left: "58%", size: 10, sway: 22, delay: 7.6, duration: 14, spin: 260 },
  { left: "78%", size: 7, sway: -18, delay: 2.3, duration: 16, spin: -240 },
  { left: "90%", size: 9, sway: 16, delay: 10.4, duration: 13.5, spin: 200 },
] as const;

interface PetalDriftProps {
  className?: string;
}

/** A few soft blush petals drifting down. Renders nothing for reduced motion. */
export function PetalDrift({ className }: PetalDriftProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {PETALS.map((petal) => (
        <motion.span
          key={petal.left}
          className="absolute -top-[5%] block rounded-[100%_0_100%_0] bg-[linear-gradient(135deg,#f8e4e4_0%,#ecc3c7_100%)] opacity-0 shadow-[0_1px_2px_rgba(150,90,95,0.12)]"
          style={{ left: petal.left, width: petal.size, height: petal.size * 0.72 }}
          animate={{
            top: ["-5%", "105%"],
            x: [0, petal.sway, -petal.sway * 0.5, petal.sway],
            rotate: [0, petal.spin],
            opacity: [0, 0.75, 0.75, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      ))}
    </div>
  );
}
