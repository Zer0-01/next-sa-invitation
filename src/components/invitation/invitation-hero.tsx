"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type UseScrollOptions } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useOpening } from "@/components/OpeningContext";
import { invitationContent } from "@/lib/invitation-content";

const HERO_SCROLL_OFFSETS: NonNullable<UseScrollOptions["offset"]> = [
  "start start",
  "end start",
];

export function InvitationHero() {
  const ref = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const [heroHeight, setHeroHeight] = useState<number | null>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { isOpening, isUnlocked } = useOpening();
  const shouldRevealContent = isOpening || isUnlocked;
  const groomName = invitationContent.couple.groom.shortName;
  const brideName = invitationContent.couple.bride.shortName;
  containerRef.current = scrollContainer;

  const scrollOptions = useMemo(
    () => ({
      target: ref,
      offset: HERO_SCROLL_OFFSETS,
      ...(scrollContainer ? { container: containerRef } : {}),
    }),
    [scrollContainer]
  );

  const { scrollYProgress } = useScroll(scrollOptions);

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

    const syncScrollContainer = () => {
      setScrollContainer(mediaQuery.matches ? scrollContainer : null);
    };

    const syncHeroHeight = () => {
      const nextHeight =
        mediaQuery.matches && scrollContainer
          ? scrollContainer.clientHeight
          : window.innerHeight;

      setHeroHeight(nextHeight || null);
    };

    syncScrollContainer();
    syncHeroHeight();

    const resizeObserver =
      scrollContainer && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(syncHeroHeight)
        : null;

    if (resizeObserver && scrollContainer) {
      resizeObserver.observe(scrollContainer);
    }
    mediaQuery.addEventListener("change", syncScrollContainer);
    mediaQuery.addEventListener("change", syncHeroHeight);
    window.addEventListener("resize", syncHeroHeight);

    return () => {
      resizeObserver?.disconnect();
      mediaQuery.removeEventListener("change", syncScrollContainer);
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
        style={shouldReduceMotion ? undefined : { y: backgroundY }}
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
        style={shouldReduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full min-h-full w-full flex-col justify-center px-6 py-10 text-center sm:px-8 md:px-8 lg:px-10"
      >
        <div className="ml-auto flex w-full max-w-sm flex-1 flex-col items-end justify-center pr-3 text-right sm:max-w-md sm:pr-4 md:pr-4 lg:pr-8">
          <motion.div
            initial={false}
            animate={
              shouldReduceMotion
                ? undefined
                : shouldRevealContent
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 22 }
            }
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
            initial={false}
            animate={shouldReduceMotion ? undefined : shouldRevealContent ? "visible" : "hidden"}
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
        </div>
      </motion.div>
    </motion.section>
  );
}
