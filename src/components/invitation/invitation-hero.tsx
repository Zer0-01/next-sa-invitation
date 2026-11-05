"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type UseScrollOptions,
  type Variants,
} from "framer-motion";
import { useMemo, useRef } from "react";
import { useOpening } from "@/components/OpeningContext";
import { GoldDiamond } from "@/components/invitation/gold-diamond";
import { PetalDrift } from "@/components/invitation/petal-drift";
import { useInvitationScrollContainer } from "@/hooks/use-invitation-scroll-container";
import { invitationContent } from "@/lib/invitation-content";

const HERO_SCROLL_OFFSETS: NonNullable<UseScrollOptions["offset"]> = [
  "start start",
  "end start",
];

const MONOGRAM_SRC = "/ustad/AN-caligraph.png";

// The monogram is "written" left to right, then the text follows.
const MONOGRAM_WRITE_DURATION = 1.4;

const textGroupVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: MONOGRAM_WRITE_DURATION * 0.6 },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.95, ease: "easeOut" } },
};

export function InvitationHero() {
  const ref = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollContainer, viewportHeight } = useInvitationScrollContainer();
  const { isUnlocked } = useOpening();
  // Reveal once the envelope has fully dissolved, so the entrance is seen.
  const shouldRevealContent = isUnlocked;
  const { groom, bride } = invitationContent.couple;
  const { event } = invitationContent;
  const eventDay = event.date.split(",")[0];
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

  return (
    <motion.section
      ref={ref}
      style={
        viewportHeight
          ? { height: `${viewportHeight}px`, minHeight: `${viewportHeight}px` }
          : undefined
      }
      className="relative min-h-screen overflow-hidden bg-[#f7f2e9] md:min-h-0"
    >
      {/* Grain sits on the paper only, beneath the flowers, so it never dulls the petals */}
      <div
        aria-hidden="true"
        className="paper-grain pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply"
      />

      {/* Lilies: scroll parallax (outer) + a very slow sway from the stems (inner) */}
      <motion.div
        style={shouldReduceMotion ? undefined : { y: backgroundY }}
        className="absolute left-[-58%] top-[3%] bottom-[-5%] w-[166%] sm:left-[-52%] sm:w-[142%] md:left-[-40%] md:w-[122%]"
      >
        <motion.div
          animate={shouldReduceMotion ? undefined : { rotate: [0, 0.9, 0, -0.7, 0] }}
          transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
          className="absolute inset-0 origin-bottom-left"
        >
          <Image
            src="/ustad/flower-image.png"
            alt="White floral wedding illustration"
            fill
            priority
            sizes="(max-width: 639px) 166vw, (max-width: 767px) 142vw, 122vw"
            className="object-contain object-left"
          />
        </motion.div>
      </motion.div>
      {/* No ButterflyDrift here: the lily illustration already has butterflies,
          and a drifting one would cross the names. */}
      <PetalDrift className="z-[4]" />

      {/* Soft cream glow keeps the text readable where the lilies run behind it */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-[14%] -right-[12%] z-[6] w-[88%] bg-[radial-gradient(closest-side,rgba(250,246,239,0.92),rgba(250,246,239,0))]"
      />

      <motion.div
        style={shouldReduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full min-h-full w-full flex-col justify-center px-6 py-10 text-center sm:px-8 md:px-8 lg:px-10"
      >
        <div className="ml-auto flex w-full max-w-md translate-x-3 flex-1 flex-col items-end justify-center pr-3 text-right sm:max-w-lg sm:translate-x-4 sm:pr-4 md:translate-x-5 md:pr-4 lg:translate-x-6 lg:pr-8">
          {/* Monogram, tinted with the ink token and written in left to right */}
          <div
            role="img"
            aria-label={`Monogram ${groom.shortName} dan ${bride.shortName}`}
            className="relative h-28 w-42 drop-shadow-[0_10px_22px_rgba(43,52,28,0.16)]"
          >
            <motion.div
              initial={false}
              animate={
                shouldReduceMotion
                  ? undefined
                  : shouldRevealContent
                    ? { clipPath: "inset(0 0% 0 0)", opacity: 1 }
                    : { clipPath: "inset(0 100% 0 0)", opacity: 0 }
              }
              transition={{
                clipPath: { duration: MONOGRAM_WRITE_DURATION, ease: [0.65, 0, 0.35, 1] },
                opacity: { duration: 0.3 },
              }}
              className="absolute inset-0 bg-ink"
              style={{
                maskImage: `url(${MONOGRAM_SRC})`,
                WebkitMaskImage: `url(${MONOGRAM_SRC})`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            />
          </div>

          <motion.div
            initial={false}
            animate={shouldReduceMotion ? undefined : shouldRevealContent ? "visible" : "hidden"}
            variants={textGroupVariants}
            className="mt-6 flex flex-col items-end space-y-3.5"
          >
            <motion.p
              variants={textItemVariants}
              className="flex items-center gap-2 font-spartan text-[0.72rem] uppercase tracking-[0.34em] text-primary/70"
            >
              <span
                aria-hidden="true"
                className="h-px w-10 bg-linear-to-r from-transparent to-gold/70"
              />
              <GoldDiamond />
              <span className="mr-[-0.34em]">{event.label}</span>
              <GoldDiamond />
            </motion.p>

            <motion.p
              variants={textItemVariants}
              className="font-cinzel-decorative text-[3.35rem] leading-[0.9] tracking-[0.03em] text-primary drop-shadow-[0_10px_24px_rgba(94,82,60,0.1)]"
            >
              {groom.shortName}
            </motion.p>

            <motion.p
              variants={textItemVariants}
              aria-hidden="true"
              className="font-serif text-[2rem] leading-none italic text-primary/55"
            >
              &amp;
            </motion.p>

            <motion.p
              variants={textItemVariants}
              className="font-cinzel-decorative text-[3.35rem] leading-[0.9] tracking-[0.03em] text-primary drop-shadow-[0_10px_24px_rgba(94,82,60,0.1)]"
            >
              {bride.shortName}
            </motion.p>

            <motion.div variants={textItemVariants} className="space-y-1.5 pt-1">
              <p className="font-spartan text-[1.05rem] uppercase tracking-[0.32em] text-primary/70">
                {event.compactDate}
              </p>
              <p className="font-spartan text-[0.82rem] tracking-[0.12em] text-primary/58">
                {eventDay} · {event.venueName}, {event.venueArea}
              </p>
            </motion.div>

            <motion.p
              variants={textItemVariants}
              className="w-fit rounded-full border border-primary/14 bg-white/32 px-3.5 py-1.5 font-spartan text-[0.78rem] tracking-[0.08em] text-primary/72 backdrop-blur-[2px]"
            >
              {invitationContent.weddingHashtag}
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-20 flex justify-center sm:bottom-6">
        <motion.a
          href="#details"
          initial={false}
          animate={{
            opacity: shouldRevealContent ? 1 : 0,
            y: shouldRevealContent ? 0 : 8,
          }}
          transition={{ duration: 0.45, delay: shouldRevealContent ? 2.2 : 0 }}
          tabIndex={shouldRevealContent ? 0 : -1}
          aria-hidden={!shouldRevealContent}
          className="pointer-events-auto flex flex-col items-center gap-2 text-primary/62"
        >
          <span className="font-spartan text-[0.7rem] uppercase tracking-[0.2em]">
            Skrol ke bawah
          </span>
          <span aria-hidden="true" className="relative block h-9 w-px bg-primary/20">
            <motion.span
              className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-primary/60"
              animate={shouldReduceMotion ? undefined : { y: [-3, 33], opacity: [0, 1, 0] }}
              transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
            />
          </span>
        </motion.a>
      </div>
    </motion.section>
  );
}
