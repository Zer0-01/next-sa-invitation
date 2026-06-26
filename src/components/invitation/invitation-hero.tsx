"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useOpening } from "@/components/OpeningContext";
import { Button } from "@/components/ui/button";
import { invitationContent } from "@/lib/invitation-content";

export function InvitationHero() {
  const ref = useRef<HTMLElement | null>(null);
  const [heroHeight, setHeroHeight] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { unlockInvitation, isUnlocked } = useOpening();
  const groomName = invitationContent.couple.groom.shortName;
  const brideName = invitationContent.couple.bride.shortName;
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

    const mediaQuery = window.matchMedia("(min-width: 768px)");
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
      className="relative min-h-screen overflow-hidden md:min-h-0"
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
          src="/images/bg-16.png"
          alt="Floral wedding backdrop"
          fill
          priority
          sizes="(max-width: 767px) 100vw, 420px"
          className="object-cover object-left"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,242,233,0.38)_0%,rgba(247,242,233,0.18)_36%,rgba(239,233,221,0.34)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,242,233,0.12)_0%,rgba(247,242,233,0.08)_30%,rgba(247,242,233,0.52)_100%)]" />

      <motion.div
        style={
          shouldReduceMotion || isUnlocked
            ? undefined
            : { y: contentY, opacity: contentOpacity }
        }
        className="relative z-10 flex h-full min-h-full w-full flex-col justify-center px-6 py-10 text-center sm:px-8 md:px-8 lg:px-10"
      >
        <div className="ml-auto flex w-full max-w-sm flex-1 flex-col items-end justify-center pr-3 text-right sm:max-w-md sm:pr-4 md:pr-4 lg:pr-8">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative h-22 w-22 sm:h-24 sm:w-24"
          >
            <Image
              src="/images/logo-black.png"
              alt="Danial and Ain monogram"
              fill
              priority
              sizes="96px"
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
            className="mt-6 space-y-2.5 sm:mt-7"
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 1.05, ease: "easeOut" }}
              className="font-cinzel-decorative text-[1.7rem] leading-[0.95] tracking-[0.03em] text-primary drop-shadow-[0_10px_24px_rgba(94,82,60,0.1)] min-[380px]:text-[1.9rem] sm:text-[2.4rem]"
            >
              {groomName}
            </motion.p>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="font-spartan text-[0.92rem] uppercase tracking-[0.28em] text-primary/72"
            >
              &
            </motion.p>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="font-cinzel-decorative text-[1.7rem] leading-[0.95] tracking-[0.03em] text-primary drop-shadow-[0_10px_24px_rgba(94,82,60,0.1)] min-[380px]:text-[1.9rem] sm:text-[2.4rem]"
            >
              {brideName}
            </motion.p>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="font-spartan text-[0.72rem] uppercase tracking-[0.32em] text-primary/70"
            >
              20.12.26
            </motion.p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 1.05, ease: "easeOut" }}
            className="mt-8 sm:mt-9"
          >
            <Button
              type="button"
              onClick={unlockInvitation}
              disabled={isUnlocked}
              className="h-auto rounded-full border border-primary/18 bg-white/84 px-8 py-3.5 font-spartan text-[0.62rem] font-medium uppercase tracking-[0.24em] text-primary shadow-[0_18px_45px_rgba(39,28,20,0.12)] transition-all duration-300 hover:scale-[1.02] hover:bg-white disabled:pointer-events-none disabled:opacity-100"
            >
              Buka Undangan
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
