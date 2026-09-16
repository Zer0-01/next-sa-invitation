"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const COMETS = [
  { top: "10%", left: "88%", width: "10rem", delay: 0, duration: 2 },
  { top: "25%", left: "68%", width: "8rem", delay: 1.25, duration: 1.8 },
  { top: "6%", left: "52%", width: "11rem", delay: 2.5, duration: 2.2 },
  { top: "32%", left: "94%", width: "7.5rem", delay: 3.75, duration: 1.9 },
] as const;

export function CometShower() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[34%] overflow-hidden"
      aria-hidden="true"
    >
      {COMETS.map((comet) => (
        <motion.span
          key={`${comet.top}-${comet.left}`}
          className="absolute block"
          style={{ top: comet.top, left: comet.left, width: comet.width }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 0.9, 0],
            x: [0, -90, -180],
            y: [0, 62, 124],
          }}
          transition={{
            duration: comet.duration,
            delay: comet.delay,
            ease: "easeIn",
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          <span className="relative block h-px w-full origin-left -rotate-[36deg] bg-linear-to-r from-[#fffdf2] via-[#fff3cf]/72 to-transparent drop-shadow-[0_0_5px_rgba(255,244,211,0.9)]">
            <span className="absolute -left-0.5 -top-0.5 size-1 rounded-full bg-[#fffdf2] shadow-[0_0_8px_rgba(255,244,211,0.95)]" />
          </span>
        </motion.span>
      ))}
    </div>
  );
}

export function ButterflyDrift() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        initial={false}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, 42, 18, 0],
                y: [0, -34, 20, 0],
                rotate: [-10, 8, -4, -10],
                scale: [0.94, 1.04, 0.97, 0.94],
              }
        }
        transition={{ duration: 7.5, ease: "easeInOut", repeat: Infinity }}
        className="absolute -left-3 top-[18%] size-20 opacity-65 sm:left-2 sm:size-24"
      >
        <Image
          src="/images/decorations/painted-butterfly.png"
          alt=""
          fill
          sizes="96px"
          className="object-contain"
        />
      </motion.div>

      <motion.div
        initial={false}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, -38, -16, 0],
                y: [0, 30, -22, 0],
                rotate: [12, -7, 5, 12],
                scale: [0.92, 1.03, 0.96, 0.92],
              }
        }
        transition={{
          duration: 8.5,
          delay: 0.8,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="absolute -right-4 top-[58%] size-16 opacity-55 sm:right-1 sm:size-20"
      >
        <div className="relative size-full -scale-x-100">
          <Image
            src="/images/decorations/painted-butterfly.png"
            alt=""
            fill
            sizes="80px"
            className="object-contain"
          />
        </div>
      </motion.div>
    </div>
  );
}
