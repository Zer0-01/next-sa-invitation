"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useOpening } from "@/components/OpeningContext";
import { ButterflyDrift } from "@/components/invitation/decorative-motion";
import { EnvelopeWaxSeal } from "@/components/invitation/envelope-wax-seal";
import { invitationContent } from "@/lib/invitation-content";
import { cn } from "@/lib/utils";

/*
 * Wallet-style envelope (7:5), seen from the flap side.
 *
 * Geometry (viewBox 140 x 100):
 *   - Pocket: full width, from y=40 to the bottom, with a STRAIGHT top edge,
 *     so the card slides out cleanly with nothing crossing it.
 *   - Flap: covers the full width down to y=42 and ends in a point at y≈62.
 *   Flap (y<42) + pocket (y>40) cover the whole envelope, so the card is
 *   fully hidden while closed — no opacity tricks needed.
 *
 * Layers, back to front:
 *   z-0   back panel (liner) + opened flap inside face
 *   z-10  card (moves to z-30 once it has cleared the pocket)
 *   z-20  pocket + closed flap front face
 *   z-30  wax seal
 *
 * Sequence (seconds after tap):
 *   0.00  seal presses in and lifts away
 *   0.30  flap folds up to edge-on (front face)
 *   0.62  flap inside face swings up behind the card
 *   0.90  card rises out of the pocket
 *   1.78  card has cleared the pocket -> moves in front of the envelope
 *   1.75  envelope drops away while the card grows
 *   1.95  overlay dissolves into the hero
 */
const FULL_ANIMATION_MS = 2700;
const REDUCED_ANIMATION_MS = 280;

const CARD_RISE_DELAY = 0.9;
const CARD_SEQUENCE_DURATION = 1.6;
const CARD_CLEARED_AT = 0.55;
// The layer swap uses a timer because Framer Motion ignores `delay`
// for instant (non-animatable) value changes such as z-index.
const CARD_TO_FRONT_MS = (CARD_RISE_DELAY + CARD_SEQUENCE_DURATION * CARD_CLEARED_AT) * 1000;

const ENVELOPE_VIEWBOX = "0 0 140 100";
// Square top corners: the flap hinge must meet the back panel seamlessly
// when the flap is opened (only the bottom corners are rounded).
const FLAP_PATH = "M0 0 H140 V42 L74 60.6 Q70 62 66 60.6 L0 42 Z";
const POCKET_PATH = "M0 40 H140 V95.6 Q140 100 135.6 100 H4.4 Q0 100 0 95.6 Z";
const POCKET_BOTTOM_FLAP_PATH = "M0 100 L66 67.6 Q70 65.6 74 67.6 L140 100 Z";

const fadeAwayVariants: Variants = {
  closed: { opacity: 1, y: 0 },
  open: { opacity: 0, y: -8, transition: { duration: 0.4, ease: "easeOut" } },
};

const envelopeBodyVariants: Variants = {
  closed: { opacity: 1, y: 0 },
  open: { opacity: 0, y: 28, transition: { delay: 1.75, duration: 0.6, ease: "easeIn" } },
};

const flapFrontVariants: Variants = {
  closed: { rotateX: 0, opacity: 1 },
  open: {
    rotateX: 90,
    opacity: 0,
    transition: {
      rotateX: { delay: 0.3, duration: 0.32, ease: "easeIn" },
      opacity: { delay: 0.62, duration: 0 },
    },
  },
};

const flapInsideVariants: Variants = {
  closed: { rotateX: 90, opacity: 0 },
  open: {
    rotateX: 180,
    opacity: 1,
    transition: {
      rotateX: { delay: 0.62, duration: 0.42, ease: "easeOut" },
      opacity: { delay: 0.62, duration: 0 },
    },
  },
};

const cardVariants: Variants = {
  closed: { y: "0%", scale: 1 },
  open: {
    // Card is 16:9, 90% of the envelope width (~71% of its height) and rests
    // with its bottom at ~85%. Rising 70% of its own height lifts the bottom
    // to ~35%, clear of the pocket edge at 40%, before it moves to the front.
    y: ["0%", "-70%", "-76%"],
    scale: [1, 1, 1.12],
    transition: {
      delay: CARD_RISE_DELAY,
      duration: CARD_SEQUENCE_DURATION,
      times: [0, CARD_CLEARED_AT, 1],
      ease: "easeInOut",
    },
  },
};

function EnvelopePaperDefs() {
  return (
    <svg aria-hidden="true" className="absolute size-0">
      <defs>
        <linearGradient id="envelope-flap-paper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fcf8f1" />
          <stop offset="100%" stopColor="#f1e8da" />
        </linearGradient>
        <linearGradient id="envelope-pocket-paper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f2e9db" />
          <stop offset="100%" stopColor="#ebe0cf" />
        </linearGradient>
        <linearGradient id="envelope-bottom-flap-paper" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#f4ece0" />
          <stop offset="100%" stopColor="#faf5ec" />
        </linearGradient>
        <linearGradient id="envelope-liner" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dde3d3" />
          <stop offset="100%" stopColor="#c8d0bb" />
        </linearGradient>
        <filter id="envelope-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.42  0 0 0 0 0.36  0 0 0 0 0.28  0 0 0 0.07 0"
            result="grain"
          />
          <feComposite in="grain" in2="SourceGraphic" operator="in" result="grainClipped" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="grainClipped" />
          </feMerge>
        </filter>
        <filter id="envelope-shadow-down" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="#5a462e" floodOpacity="0.18" />
        </filter>
        <filter id="envelope-shadow-up" x="-10%" y="-30%" width="120%" height="130%">
          <feDropShadow dx="0" dy="-0.8" stdDeviation="1" floodColor="#5a462e" floodOpacity="0.12" />
        </filter>
      </defs>
    </svg>
  );
}

const FAINT_EDGE = "rgba(150,122,90,0.22)";

export function EnvelopeOpeningOverlay() {
  const shouldReduceMotion = useReducedMotion();
  const { completeOpening, isDismissed, isOpening, isUnlocked, startOpening } = useOpening();
  const [hasStarted, setHasStarted] = useState(false);
  const [isCardInFront, setIsCardInFront] = useState(false);
  const sequenceTimersRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      sequenceTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    };
  }, []);

  if (isDismissed) {
    return null;
  }

  const { groom, bride } = invitationContent.couple;
  const isSealDisabled = hasStarted || isOpening || isUnlocked;
  const sequenceState = hasStarted && !shouldReduceMotion ? "open" : "closed";

  const handleOpen = () => {
    if (isSealDisabled) {
      return;
    }

    setHasStarted(true);
    startOpening();

    sequenceTimersRef.current.push(
      window.setTimeout(() => {
        completeOpening();
      }, shouldReduceMotion ? REDUCED_ANIMATION_MS : FULL_ANIMATION_MS),
    );

    if (!shouldReduceMotion) {
      sequenceTimersRef.current.push(
        window.setTimeout(() => {
          setIsCardInFront(true);
        }, CARD_TO_FRONT_MS),
      );
    }
  };

  return (
    <motion.div
      initial={false}
      animate={isUnlocked || hasStarted ? { opacity: 0 } : { opacity: 1 }}
      transition={
        shouldReduceMotion
          ? { duration: 0.18, ease: "easeOut" }
          : { duration: 0.7, ease: "easeInOut", delay: hasStarted ? 1.95 : 0 }
      }
      className="absolute inset-0 z-40 overflow-hidden bg-[linear-gradient(180deg,#f9f4ec_0%,#f2ebe0_100%)] [container-type:size] md:rounded-[calc(2rem-6px)]"
      aria-hidden={isUnlocked}
    >
      <EnvelopePaperDefs />

      {/* Garden backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0)_55%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute -left-14 -top-12 size-72 opacity-75">
        <Image
          src="/images/decorations/painted-wildflower-corner.png"
          alt=""
          fill
          priority
          sizes="288px"
          className="object-contain"
        />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-14 size-72 opacity-75">
        <Image
          src="/images/decorations/painted-wildflower-corner.png"
          alt=""
          fill
          sizes="288px"
          className="rotate-180 object-contain"
        />
      </div>
      <ButterflyDrift />

      <motion.div
        initial={false}
        animate={sequenceState}
        className="relative z-10 flex h-full flex-col items-center justify-center gap-[clamp(1.25rem,4cqh,2.25rem)] px-5"
      >
        {/* Heading */}
        <motion.div variants={fadeAwayVariants} className="flex w-full max-w-80 flex-col items-center text-center">
          <div className="flex w-full items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px flex-1 bg-linear-to-r from-transparent via-gold/70 to-gold/20" />
            <div className="flex shrink-0 items-center gap-2 text-primary/84">
              <span aria-hidden="true" className="h-1 w-1 rotate-45 border border-gold/75" />
              <p className="font-cinzel-decorative text-[0.95rem] leading-none tracking-[0.1em]">Anda Dijemput</p>
              <span aria-hidden="true" className="h-1 w-1 rotate-45 border border-gold/75" />
            </div>
            <span aria-hidden="true" className="h-px flex-1 bg-linear-to-l from-transparent via-gold/70 to-gold/20" />
          </div>
          <p className="mt-4 font-cinzel-decorative text-[1.7rem] leading-tight tracking-[0.03em] text-primary">
            {groom.shortName}
            <span className="mx-2 font-serif text-[0.8em] italic text-primary/60">&amp;</span>
            {bride.shortName}
          </p>
          <p className="mt-2 font-spartan text-[0.78rem] uppercase tracking-[0.32em] text-primary/60">
            {invitationContent.event.compactDate}
          </p>
        </motion.div>

        {/* Envelope */}
        <motion.div
          animate={shouldReduceMotion || hasStarted ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
          className="relative w-[min(86cqw,22rem,calc((100cqh-15rem)*1.4))]"
        >
          <motion.div
            variants={envelopeBodyVariants}
            aria-hidden="true"
            className="absolute inset-x-[4%] -bottom-[5%] h-[10%] rounded-full bg-[radial-gradient(closest-side,rgba(62,46,30,0.2),transparent)] blur-md"
          />

          <div className="relative aspect-[7/5]">
            {/* z-0: back panel (inside liner) + opened flap */}
            <motion.div variants={envelopeBodyVariants} className="absolute inset-0 z-0 perspective-[1200px]">
              <div className="absolute inset-0 rounded-b-[0.7rem] bg-[linear-gradient(180deg,#cfd7c3_0%,#dde3d3_45%,#c8d0bb_100%)] shadow-[inset_0_10px_18px_rgba(60,70,45,0.2)]" />
              <motion.div variants={flapInsideVariants} className="absolute inset-0 origin-top">
                <svg viewBox={ENVELOPE_VIEWBOX} preserveAspectRatio="none" aria-hidden="true" className="size-full overflow-visible">
                  <path d={FLAP_PATH} fill="url(#envelope-liner)" filter="url(#envelope-grain)" />
                  <path d={FLAP_PATH} fill="none" stroke={FAINT_EDGE} strokeWidth="1" vectorEffect="non-scaling-stroke" />
                </svg>
              </motion.div>
            </motion.div>

            {/* z-10 -> z-30: invitation card */}
            <motion.div
              variants={cardVariants}
              className={cn(
                "absolute left-[5%] top-[14%] w-[90%]",
                isCardInFront ? "z-30" : "z-10",
              )}
            >
              <div className="rounded-[0.4rem] bg-[#fffdf8] p-1 shadow-[0_10px_26px_rgba(61,50,33,0.18)]">
                <div className="relative aspect-video overflow-hidden rounded-[0.25rem] bg-[#f4f1ea]">
                  <Image
                    src="/ustad/envelope-image.png"
                    alt={`Kad jemputan perkahwinan ${groom.shortName} dan ${bride.shortName}`}
                    fill
                    priority
                    sizes="(min-width: 768px) 320px, 80vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* z-20: pocket + closed flap */}
            <motion.div variants={envelopeBodyVariants} className="absolute inset-0 z-20 perspective-[1200px]">
              <svg viewBox={ENVELOPE_VIEWBOX} preserveAspectRatio="none" aria-hidden="true" className="absolute inset-0 size-full">
                <path d={POCKET_PATH} fill="url(#envelope-pocket-paper)" filter="url(#envelope-grain)" />
                <g filter="url(#envelope-shadow-up)">
                  <path d={POCKET_BOTTOM_FLAP_PATH} fill="url(#envelope-bottom-flap-paper)" />
                </g>
                <path d={POCKET_BOTTOM_FLAP_PATH} fill="none" stroke={FAINT_EDGE} strokeWidth="1" vectorEffect="non-scaling-stroke" />
                <path d={POCKET_PATH} fill="none" stroke={FAINT_EDGE} strokeWidth="1" vectorEffect="non-scaling-stroke" />
                {/* Paper lip along the pocket opening */}
                <path d="M0 40.3 H140" stroke="rgba(255,255,255,0.8)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              </svg>

              <motion.div variants={flapFrontVariants} className="absolute inset-0 origin-top">
                <svg viewBox={ENVELOPE_VIEWBOX} preserveAspectRatio="none" aria-hidden="true" className="size-full overflow-visible">
                  <g filter="url(#envelope-shadow-down)">
                    <path d={FLAP_PATH} fill="url(#envelope-flap-paper)" />
                  </g>
                  <path d={FLAP_PATH} fill="url(#envelope-flap-paper)" filter="url(#envelope-grain)" />
                  <path d={FLAP_PATH} fill="none" stroke={FAINT_EDGE} strokeWidth="1" vectorEffect="non-scaling-stroke" />
                </svg>
              </motion.div>
            </motion.div>

            {/* z-30: wax seal on the flap point */}
            <div className="absolute left-1/2 top-[60%] z-30 w-[17%] -translate-x-1/2 -translate-y-1/2">
              <EnvelopeWaxSeal
                initials={[groom.shortName.charAt(0), bride.shortName.charAt(0)]}
                isOpening={hasStarted}
                disabled={isSealDisabled}
                onOpen={handleOpen}
                className="w-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Hint */}
        <motion.p
          variants={fadeAwayVariants}
          className="font-spartan text-[0.72rem] uppercase tracking-[0.26em] text-primary/55"
        >
          <motion.span
            className="inline-block"
            animate={shouldReduceMotion || hasStarted ? undefined : { opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity }}
          >
            Sentuh meterai untuk membuka
          </motion.span>
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
