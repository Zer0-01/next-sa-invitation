"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const PETALS = [
  { left: "12%", size: 11, sway: 26, delay: 0.4, duration: 13, spin: 220 },
  { left: "34%", size: 8, sway: -20, delay: 4.2, duration: 15, spin: -180 },
  { left: "58%", size: 10, sway: 22, delay: 7.6, duration: 14, spin: 260 },
  { left: "78%", size: 7, sway: -18, delay: 2.3, duration: 16, spin: -240 },
  { left: "90%", size: 9, sway: 16, delay: 10.4, duration: 13.5, spin: 200 },
  // Extra drifters, used only by variants that need more presence.
  { left: "22%", size: 9, sway: -22, delay: 1.6, duration: 14.5, spin: -200 },
  { left: "46%", size: 10, sway: 18, delay: 5.8, duration: 13, spin: 240 },
  { left: "68%", size: 8, sway: -16, delay: 9, duration: 15.5, spin: -220 },
] as const;

const VARIANTS = {
  // Small blush petals for the hero's light paper.
  petal: {
    className:
      "bg-[linear-gradient(135deg,#f8e4e4_0%,#ecc3c7_100%)] shadow-[0_1px_2px_rgba(150,90,95,0.12)]",
    scale: 1,
    aspect: 0.72,
    opacity: 0.75,
    count: 5,
  },
  // Larger, slender green leaves that read clearly on the guestbook's cream.
  leaf: {
    className:
      "bg-[linear-gradient(135deg,#9fb17e_0%,#5f7448_100%)] shadow-[0_1px_3px_rgba(52,65,31,0.22)]",
    scale: 2,
    aspect: 0.48,
    opacity: 0.95,
    count: 8,
  },
} as const;

interface PetalDriftProps {
  variant?: keyof typeof VARIANTS;
  className?: string;
}

/** A few soft petals or leaves drifting down. Renders nothing for reduced motion. */
export function PetalDrift({ variant = "petal", className }: PetalDriftProps) {
  const look = VARIANTS[variant];
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {PETALS.slice(0, look.count).map((petal) => (
        <motion.span
          key={petal.left}
          className={cn(
            "absolute -top-[5%] block rounded-[100%_0_100%_0] opacity-0",
            look.className,
          )}
          style={{
            left: petal.left,
            width: petal.size * look.scale,
            height: petal.size * look.scale * look.aspect,
          }}
          animate={{
            top: ["-5%", "105%"],
            x: [0, petal.sway, -petal.sway * 0.5, petal.sway],
            rotate: [0, petal.spin],
            opacity: [0, look.opacity, look.opacity, 0],
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
