"use client";

import { useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { CometShower } from "@/components/invitation/decorative-motion";
import { invitationContent } from "@/lib/invitation-content";

interface GreetingSceneProps {
  opacity: MotionValue<number>;
  contentY: MotionValue<number>;
  visibility: MotionValue<"visible" | "hidden">;
  /** Gentle zoom applied while the scene enters/leaves. */
  contentScale?: MotionValue<number>;
}

export function GreetingScene({ opacity, contentY, visibility, contentScale }: GreetingSceneProps) {
  const {
    openingLine,
    hosts,
    hostSeparator,
    invitationLead,
    honorifics,
    invitationClose,
    coupleSeparator,
    arabicFallback,
    bismillahSrc,
  } = invitationContent.invitationScenes.greeting;
  const { groom, bride } = invitationContent.couple;
  const shouldReduceMotion = useReducedMotion();
  const [isInteractive, setIsInteractive] = useState(() => opacity.get() > 0.05);
  const [showSwipeHint, setShowSwipeHint] = useState(
    () => opacity.get() > 0.35 && contentY.get() > -6
  );

  useMotionValueEvent(opacity, "change", (value) => {
    setIsInteractive(value > 0.05);
    setShowSwipeHint(value > 0.35 && contentY.get() > -6);
  });

  useMotionValueEvent(contentY, "change", (value) => {
    setShowSwipeHint(opacity.get() > 0.35 && value > -6);
  });

  return (
    <motion.div
      style={{ opacity, visibility, y: contentY, scale: contentScale }}
      className={`absolute inset-0 z-10 flex items-start justify-center px-5 pt-10 pb-7 sm:px-7 sm:pt-12 sm:pb-9 ${
        isInteractive ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <CometShower />
      <div className="relative z-10 flex w-full max-w-[18rem] flex-col text-center sm:max-w-[19.5rem]">
        <div className="mx-auto w-full max-w-[15rem] sm:max-w-[16.5rem]">
          {bismillahSrc ? (
            <div className="relative mx-auto aspect-[5/1.1] w-full">
              <Image
                src={bismillahSrc}
                alt="Bismillah"
                fill
                sizes="264px"
                className="object-contain"
              />
            </div>
          ) : (
            <p className="font-serif text-[1.2rem] leading-relaxed text-white/90">{arabicFallback}</p>
          )}
        </div>

        <p className="mt-3.5 font-spartan text-[0.94rem] leading-6 text-white/78 sm:text-[1rem]">
          {openingLine}
        </p>

        <div className="mt-3 space-y-0.5">
          <p className="font-cinzel-decorative text-[1rem] leading-snug text-white/92 sm:text-[1.14rem]">
            {hosts[0]}
          </p>
          <p className="font-spartan text-[0.94rem] leading-6 text-[#f1dec2]">{hostSeparator}</p>
          <p className="font-cinzel-decorative text-[1rem] leading-snug text-white/92 sm:text-[1.14rem]">
            {hosts[1]}
          </p>
        </div>

        <div className="mt-4 font-spartan text-[0.94rem] leading-6 text-white/72 sm:text-[1rem]">
          <p>{invitationLead}</p>
          <p className="text-white/78">{honorifics}</p>
          <p className="text-balance">{invitationClose}</p>
        </div>

        <div className="mt-5 space-y-2 text-center">
          <h2 className="text-balance font-cinzel-decorative text-[1.12rem] leading-tight text-white sm:text-[1.3rem]">
            {groom.fullName}
          </h2>
          <p className="font-spartan text-[1.15rem] text-[#f1dec2]">{coupleSeparator}</p>
          <h2 className="text-balance font-cinzel-decorative text-[1.12rem] leading-tight text-white sm:text-[1.3rem]">
            {bride.fullName}
          </h2>
        </div>

        <motion.div
          initial={false}
          animate={{
            opacity: showSwipeHint ? 1 : 0,
            y: showSwipeHint && !shouldReduceMotion ? [0, -4, 0] : 0,
          }}
          transition={
            shouldReduceMotion
              ? { duration: 0.24, ease: "easeOut" }
              : {
                  opacity: { duration: 0.24, ease: "easeOut" },
                  y: {
                    duration: 1.8,
                    ease: "easeInOut",
                    repeat: Infinity,
                  },
                }
          }
          className="pointer-events-none mt-6 flex flex-col items-center gap-2 text-white/78"
          aria-hidden="true"
        >
          <span className="font-spartan text-[0.86rem] uppercase tracking-[0.2em]">
            Skrol ke bawah
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-[2px]">
            <span className="font-serif text-[1.15rem] leading-none text-white/84">↓</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
