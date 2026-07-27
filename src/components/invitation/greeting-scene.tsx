"use client";

import { useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { invitationContent } from "@/lib/invitation-content";

interface GreetingSceneProps {
  opacity: MotionValue<number>;
  contentY: MotionValue<number>;
}

export function GreetingScene({ opacity, contentY }: GreetingSceneProps) {
  const { title, arabicFallback, bismillahSrc, separator } =
    invitationContent.invitationScenes.greeting;
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
      style={{ opacity, y: contentY }}
      className={`absolute inset-0 flex items-start justify-center px-5 pt-10 pb-7 sm:px-7 sm:pt-12 sm:pb-9 ${
        isInteractive ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
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
            <p className="font-serif text-[0.92rem] leading-relaxed text-white/90">{arabicFallback}</p>
          )}
        </div>

        <div className="mt-3.5">
          <h2 className="mt-3 font-spartan text-[1.2rem] leading-[1.02] text-white sm:text-[1.45rem]">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-[17rem] font-spartan text-[0.66rem] leading-[1.45] text-white/78 sm:max-w-[18rem] sm:text-[0.72rem] sm:leading-5">
            {invitationContent.greetingText}
          </p>
        </div>

        <div className="mt-5 space-y-3.5 text-center">
          <div>
            <h3 className="font-cinzel-decorative text-[0.98rem] leading-tight text-white sm:text-[1.12rem]">
              {invitationContent.couple.groom.fullName}
            </h3>
            <p className="mt-1.5 font-spartan text-[0.66rem] leading-4.5 text-white/72 sm:text-[0.7rem]">
              Anakanda kepada
            </p>
            <div className="mt-1 font-spartan text-[0.66rem] leading-4.5 text-white/72 sm:text-[0.7rem]">
              <p>{invitationContent.couple.groom.parents[0].replace("Anakanda kepada ", "")} &</p>
              <p>{invitationContent.couple.groom.parents[1].replace("dan ", "")}</p>
            </div>
          </div>

          <p className="font-spartan text-[1rem] text-[#f1dec2]">{separator}</p>

          <div>
            <h3 className="font-cinzel-decorative text-[0.98rem] leading-tight text-white sm:text-[1.12rem]">
              {invitationContent.couple.bride.fullName}
            </h3>
            <p className="mt-1.5 font-spartan text-[0.66rem] leading-4.5 text-white/72 sm:text-[0.7rem]">
              Anakanda kepada
            </p>
            <div className="mt-1 font-spartan text-[0.66rem] leading-4.5 text-white/72 sm:text-[0.7rem]">
              <p>{invitationContent.couple.bride.parents[0].replace("Anakanda kepada ", "")} &</p>
              <p>{invitationContent.couple.bride.parents[1].replace("dan ", "")}</p>
            </div>
          </div>
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
          <span className="font-spartan text-[0.58rem] uppercase tracking-[0.28em]">
            Skrol ke bawah
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-[2px]">
            <span className="font-serif text-[1rem] leading-none text-white/84">↓</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
