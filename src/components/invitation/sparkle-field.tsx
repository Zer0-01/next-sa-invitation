"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const sparkles = [
  { left: "6%", restingTop: "12%", size: 7, drift: 8, delay: -1.2, duration: 7.8 },
  { left: "14%", restingTop: "34%", size: 5, drift: -6, delay: -5.4, duration: 9.4 },
  { left: "23%", restingTop: "66%", size: 4, drift: 5, delay: -3.1, duration: 8.6 },
  { left: "33%", restingTop: "20%", size: 6, drift: -8, delay: -7.2, duration: 10.2 },
  { left: "43%", restingTop: "82%", size: 5, drift: 7, delay: -2.6, duration: 8.9 },
  { left: "53%", restingTop: "48%", size: 4, drift: -5, delay: -6.3, duration: 9.7 },
  { left: "62%", restingTop: "16%", size: 7, drift: 8, delay: -4.5, duration: 8.3 },
  { left: "71%", restingTop: "72%", size: 5, drift: -7, delay: -8.1, duration: 10.5 },
  { left: "80%", restingTop: "40%", size: 4, drift: 5, delay: -2, duration: 9.1 },
  { left: "89%", restingTop: "88%", size: 6, drift: -8, delay: -6.8, duration: 9.9 },
  { left: "95%", restingTop: "27%", size: 5, drift: 6, delay: -3.8, duration: 8.7 },
];

interface SparkleFieldProps {
  className?: string;
}

export function SparkleField({ className }: SparkleFieldProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute select-none", className)}
    >
      {sparkles.map((sparkle, index) => (
        <motion.span
          key={`${sparkle.left}-${sparkle.top}`}
          initial={false}
          animate={
            shouldReduceMotion
              ? {
                  opacity: index % 2 === 0 ? 0.48 : 0,
                  top: sparkle.restingTop,
                }
              : {
                  top: ["-4%", "104%"],
                  x: [0, sparkle.drift, 0],
                  opacity: [0, 0.92, 0.72, 0],
                  scale: [0.55, 1.12, 0.82],
                }
          }
          transition={{
            delay: sparkle.delay,
            duration: sparkle.duration,
            ease: "easeInOut",
            repeat: shouldReduceMotion ? 0 : Infinity,
          }}
          className="absolute block rounded-full bg-[radial-gradient(circle,rgba(255,250,252,1)_0%,rgba(255,190,215,0.96)_34%,rgba(224,114,157,0.7)_62%,transparent_76%)] shadow-[0_0_9px_4px_rgba(238,137,177,0.58)]"
          style={{
            left: sparkle.left,
            top: shouldReduceMotion ? sparkle.restingTop : "-4%",
            width: sparkle.size,
            height: sparkle.size,
          }}
        />
      ))}
    </div>
  );
}
