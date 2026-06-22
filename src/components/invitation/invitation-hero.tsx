"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useOpening } from "@/components/OpeningContext";
import { Button } from "@/components/ui/button";

export function InvitationHero() {
  const ref = useRef<HTMLElement | null>(null);
  const [heroHeight, setHeroHeight] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { unlockInvitation, isUnlocked } = useOpening();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 90]
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 26]
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.8],
    shouldReduceMotion ? [1, 1] : [1, 0.42]
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const scrollContainer = document.querySelector<HTMLElement>(
      "[data-invitation-scroll-container='true']"
    );

    const syncHeroHeight = () => {
      const nextHeight =
        mediaQuery.matches && scrollContainer
          ? scrollContainer.clientHeight
          : window.innerHeight;

      setHeroHeight(nextHeight || null);
    };

    syncHeroHeight();

    const resizeObserver =
      scrollContainer && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(syncHeroHeight)
        : null;

    if (resizeObserver && scrollContainer) {
      resizeObserver.observe(scrollContainer);
    }
    mediaQuery.addEventListener("change", syncHeroHeight);
    window.addEventListener("resize", syncHeroHeight);

    return () => {
      resizeObserver?.disconnect();
      mediaQuery.removeEventListener("change", syncHeroHeight);
      window.removeEventListener("resize", syncHeroHeight);
    };
  }, []);

  return (
    <motion.section
      ref={ref}
      style={heroHeight ? { height: `${heroHeight}px`, minHeight: `${heroHeight}px` } : undefined}
      className="relative min-h-screen overflow-hidden lg:min-h-0"
    >
      <motion.div
        style={
          shouldReduceMotion || isUnlocked
            ? undefined
            : { y: backgroundY }
        }
        className="absolute inset-x-0 -top-[8%] -bottom-[8%]"
      >
        <Image
          src="/images/bg-8.png"
          alt="Romantic wedding backdrop"
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 420px"
          className="object-cover object-center"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,18,12,0.26)_0%,rgba(55,39,28,0.24)_26%,rgba(247,241,233,0.22)_62%,rgba(247,241,233,0.64)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_36%),radial-gradient(circle_at_50%_68%,rgba(255,247,235,0.16),transparent_26%),linear-gradient(180deg,rgba(85,68,52,0.05)_0%,rgba(85,68,52,0.18)_100%)]" />

      <motion.div
        style={
          shouldReduceMotion || isUnlocked
            ? undefined
            : { y: contentY, opacity: contentOpacity }
        }
        className="relative z-10 flex h-full min-h-full w-full flex-col items-center justify-center px-6 py-10 text-center"
      >
        <div className="flex w-full max-w-sm flex-1 flex-col items-center justify-center">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative h-28 w-28 sm:h-32 sm:w-32"
          >
            <Image
              src="/images/logo.png"
              alt="Danial and Ain monogram"
              fill
              priority
              sizes="128px"
              className="object-contain drop-shadow-[0_12px_30px_rgba(43,32,23,0.18)]"
            />
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.22,
                  delayChildren: 0.35,
                },
              },
            }}
            className="mt-8 space-y-4"
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 1.05, ease: "easeOut" }}
              className="whitespace-nowrap font-serif text-[1.9rem] leading-[0.92] tracking-[-0.025em] text-white drop-shadow-[0_10px_28px_rgba(37,25,17,0.28)] min-[380px]:text-[2.1rem] sm:text-[3.1rem]"
            >
              Danial <span className="mx-2 inline-block text-[0.88em] text-[#f1dec2]">&</span> Ain
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="font-sans text-[0.62rem] font-medium tracking-[0.34em] text-white/88 uppercase"
            >
              20.12.26
            </motion.p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 1.05, ease: "easeOut" }}
            className="mt-10"
          >
            <Button
              type="button"
              onClick={unlockInvitation}
              disabled={isUnlocked}
              className="h-auto rounded-full border border-white/32 bg-white/86 px-8 py-3.5 text-[0.62rem] font-medium uppercase tracking-[0.24em] text-primary shadow-[0_18px_45px_rgba(39,28,20,0.22)] transition-all duration-300 hover:scale-[1.02] hover:bg-white disabled:pointer-events-none disabled:opacity-100"
            >
              Buka Undangan
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
