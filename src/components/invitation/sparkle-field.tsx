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
          key={`${sparkle.left}-${sparkle.restingTop}`}
          initial={shouldReduceMotion ? false : { top: "-8%", opacity: 0 }}
          animate={
            shouldReduceMotion
              ? {
                  opacity: index % 2 === 0 ? 0.48 : 0,
                  top: sparkle.restingTop,
                }
              : {
                  top: ["-8%", "108%"],
                  x: [0, sparkle.drift * 2, sparkle.drift * 4],
                  opacity: [0, 1, 0.82, 0],
                  scale: [0.72, 1.08, 0.9],
                }
          }
          transition={{
            delay: sparkle.delay,
            duration: sparkle.duration * 1.35,
            ease: "linear",
            repeat: shouldReduceMotion ? 0 : Infinity,
          }}
          className="absolute block rounded-full bg-[linear-gradient(180deg,transparent_0%,rgba(246,174,204,0.12)_20%,rgba(238,137,177,0.68)_72%,rgba(255,241,247,0.98)_100%)] drop-shadow-[0_0_6px_rgba(238,137,177,0.82)]"
          style={{
            left: sparkle.left,
            top: shouldReduceMotion ? sparkle.restingTop : "-8%",
            width: sparkle.size,
            height: shouldReduceMotion ? sparkle.size : sparkle.size * 4,
          }}
        >
          <span
            className="absolute bottom-0 left-1/2 block -translate-x-1/2 rounded-full bg-[#fff6fa] shadow-[0_0_9px_4px_rgba(238,137,177,0.7)]"
            style={{ width: sparkle.size, height: sparkle.size }}
          />
        </motion.span>
      ))}
    </div>
  );
}
