"use client";

import { motion, type MotionValue } from "framer-motion";
import { CountdownTimer } from "@/components/invitation/countdown-timer";

interface CountdownSceneProps {
  opacity: MotionValue<number>;
  contentY: MotionValue<number>;
}

export function CountdownScene({ opacity, contentY }: CountdownSceneProps) {
  return (
    <motion.div
      style={{ opacity, y: contentY }}
      className="absolute inset-0 flex items-start justify-center px-5 pt-10 pb-7 sm:px-7 sm:pt-12 sm:pb-9"
    >
      <div className="w-full max-w-md">
        <CountdownTimer />
      </div>
    </motion.div>
  );
}
