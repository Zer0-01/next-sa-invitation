"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, type MotionValue } from "framer-motion";
import { CountdownTimer } from "@/components/invitation/countdown-timer";
import { Button } from "@/components/ui/button";
import { downloadInvitationCalendarEvent } from "@/lib/calendar";

interface CountdownSceneProps {
  opacity: MotionValue<number>;
  contentY: MotionValue<number>;
}

export function CountdownScene({ opacity, contentY }: CountdownSceneProps) {
  const [isInteractive, setIsInteractive] = useState(() => opacity.get() > 0.05);

  useMotionValueEvent(opacity, "change", (value) => {
    setIsInteractive(value > 0.05);
  });

  return (
    <motion.div
      style={{ opacity, y: contentY }}
      className={`absolute inset-0 flex items-start justify-center px-5 pt-10 pb-7 sm:px-7 sm:pt-12 sm:pb-9 ${
        isInteractive ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <CountdownTimer />
        <Button
          type="button"
          onClick={downloadInvitationCalendarEvent}
          className="mt-7 h-auto rounded-full border border-white/28 bg-white/14 px-6 py-3 font-spartan text-[0.62rem] uppercase tracking-[0.2em] text-white shadow-none hover:bg-white/20"
        >
          Simpan kalendar
        </Button>
      </div>
    </motion.div>
  );
}
