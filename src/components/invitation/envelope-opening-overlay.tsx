"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useOpening } from "@/components/OpeningContext";

const FULL_ANIMATION_MS = 2400;
const REDUCED_ANIMATION_MS = 280;

export function EnvelopeOpeningOverlay() {
  const shouldReduceMotion = useReducedMotion();
  const { completeOpening, isDismissed, isOpening, isUnlocked, startOpening } = useOpening();
  const [hasStarted, setHasStarted] = useState(false);
  const completionTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (completionTimerRef.current !== null) {
        window.clearTimeout(completionTimerRef.current);
      }
    };
  }, []);

  if (isDismissed) {
    return null;
  }

  const handleOpen = () => {
    if (hasStarted || isOpening || isUnlocked) {
      return;
    }

    setHasStarted(true);
    startOpening();

    completionTimerRef.current = window.setTimeout(() => {
      completeOpening();
    }, shouldReduceMotion ? REDUCED_ANIMATION_MS : FULL_ANIMATION_MS);
  };

  const cardLift = shouldReduceMotion ? -64 : -286;
  return (
    <motion.div
      initial={false}
      animate={
        isUnlocked || hasStarted
          ? {
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 0.985,
              filter: shouldReduceMotion ? "blur(0px)" : "blur(6px)",
            }
          : {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }
      }
      transition={{
        duration: shouldReduceMotion ? 0.18 : 1.85,
        ease: "easeOut",
        delay: shouldReduceMotion ? 0 : 0.55,
      }}
      className="absolute inset-0 z-40 overflow-hidden bg-[linear-gradient(180deg,rgba(247,241,233,0.98)_0%,rgba(242,236,226,0.98)_100%)] md:rounded-[calc(2rem-6px)]"
      aria-hidden={isUnlocked}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.72),transparent_40%),linear-gradient(135deg,rgba(99,88,72,0.06),transparent_45%),repeating-linear-gradient(90deg,rgba(126,108,84,0.03)_0,rgba(126,108,84,0.03)_1px,transparent_1px,transparent_6px)]" />

      <div className="relative flex h-full flex-col items-center justify-center px-5 py-4 sm:px-7 sm:py-6">
        <div className="relative flex w-full max-w-88 flex-1 items-center justify-center">
          <p className="absolute top-[4%] z-40 font-spartan text-[0.76rem] uppercase tracking-[0.24em] text-primary/72">
            Anda Dijemput
          </p>
          <div className="relative h-[min(31rem,calc(100vh-2.5rem))] w-full max-w-84 perspective-[1600px] sm:h-[min(31rem,calc(100vh-4rem))]">
            <div className="absolute inset-x-[6%] bottom-[12%] h-[4.2rem] rounded-full bg-[radial-gradient(circle,rgba(62,46,30,0.18)_0%,rgba(62,46,30,0.08)_45%,transparent_72%)] blur-xl" />

            <motion.div
              initial={false}
              animate={
                hasStarted
                  ? {
                      y: cardLift,
                      scale: shouldReduceMotion ? 1.01 : 1.03,
                      rotate: shouldReduceMotion ? 0 : -1.35,
                    }
                  : {
                      y: 0,
                      scale: 1,
                      rotate: 0,
                    }
              }
              transition={{
                duration: shouldReduceMotion ? 0.22 : 1.8,
                ease: [0.2, 0.8, 0.2, 1],
                delay: shouldReduceMotion ? 0 : 0.18,
              }}
              className="absolute inset-x-[12%] bottom-[20.6%] z-20"
            >
              <div className="overflow-hidden rounded-[1.75rem] border border-[#e1d5c6] bg-[#fffdf9] p-2 shadow-[0_24px_60px_rgba(61,50,33,0.16)]">
                <div className="relative aspect-3/4 overflow-hidden rounded-[1.35rem] bg-[#f6f1e8]">
                  <Image
                    src="/images/envelope-image-1.png"
                    alt="Danial and Ain wedding invitation artwork"
                    fill
                    priority
                    sizes="(max-width: 767px) 78vw, 280px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </motion.div>

            <div className="absolute inset-x-[4%] bottom-[18%] z-0 h-62 rounded-4xl border border-[#e8d9c8] bg-[linear-gradient(180deg,#fbf4ea_0%,#f1dfc9_100%)] shadow-[0_26px_65px_rgba(55,43,29,0.14)]" />
            <div className="absolute inset-x-[8%] bottom-[39.6%] z-10 h-6 rounded-t-[1.35rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.84)_0%,rgba(247,236,223,0.4)_100%)]" />
            <div className="absolute inset-x-[7%] bottom-[20.5%] z-10 h-[12.6rem] rounded-b-[1.8rem] bg-[linear-gradient(180deg,#f4e6d5_0%,#e9d6bf_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.76)]" />

            <div
              className="absolute inset-x-[7%] bottom-[20.5%] z-20 h-[10.6rem] bg-[linear-gradient(180deg,#ecd8c0_0%,#e0c7ab_100%)]"
              style={{ clipPath: "polygon(0 0, 50% 36%, 100% 0, 100% 100%, 0 100%)" }}
            />
            <div className="absolute inset-x-[7%] bottom-[20.4%] z-20 h-[10.6rem] rounded-b-[1.8rem] border-x border-b border-[#ddc6aa] opacity-70" />
            <div className="absolute inset-x-[11%] bottom-[40.2%] z-30 h-[0.45rem] rounded-full bg-white/55 blur-sm" />

            <motion.button
              type="button"
              onClick={handleOpen}
              disabled={hasStarted || isOpening || isUnlocked}
              initial={false}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              whileHover={hasStarted ? undefined : { scale: 1.03 }}
              whileTap={hasStarted ? undefined : { scale: 0.94 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute left-1/2 bottom-[29.2%] z-40 flex h-[3.7rem] w-[3.7rem] -translate-x-1/2 items-center justify-center rounded-full border border-[#5b1218]/28 bg-[radial-gradient(circle,#8f1f2a_0%,#761722_58%,#5a1019_100%)] text-[0.76rem] font-semibold tracking-[0.08em] text-[#fff7f2] shadow-[0_8px_14px_rgba(72,14,21,0.18),0_14px_24px_rgba(72,14,21,0.14),inset_0_-3px_6px_rgba(52,7,14,0.2)] transition-transform duration-300 disabled:pointer-events-none"
              aria-label="Buka jemputan"
            >
              <span
                aria-hidden="true"
                className="absolute inset-[0.34rem] rounded-full border border-black/10 opacity-35"
              />
              <span className="relative -mt-0.5 lowercase">buka</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
