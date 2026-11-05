"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Builds an organic, slightly uneven wax outline. The values are
 * deterministic so server and client render the same path.
 */
function createWaxSealPath(pointCount = 90) {
  const points = Array.from({ length: pointCount }, (_, index) => {
    const angle = (index / pointCount) * Math.PI * 2;
    const radius =
      44 +
      2.4 * Math.sin(angle * 7) +
      1.3 * Math.sin(angle * 13 + 1.2) +
      0.7 * Math.sin(angle * 23 + 0.4);

    const x = (50 + radius * Math.cos(angle)).toFixed(2);
    const y = (50 + radius * Math.sin(angle)).toFixed(2);

    return `${x} ${y}`;
  });

  return `M${points.join(" L")} Z`;
}

const WAX_SEAL_PATH = createWaxSealPath();

const sealVariants: Variants = {
  closed: { opacity: 1, scale: 1, y: 0 },
  open: {
    opacity: [1, 1, 0],
    scale: [1, 0.9, 1.12],
    y: [0, 0, -12],
    transition: { duration: 0.45, times: [0, 0.3, 1], ease: "easeOut" },
  },
};

type EnvelopeWaxSealProps = {
  initials: [string, string];
  isOpening: boolean;
  disabled: boolean;
  onOpen: () => void;
  className?: string;
};

export function EnvelopeWaxSeal({
  initials,
  isOpening,
  disabled,
  onOpen,
  className,
}: EnvelopeWaxSealProps) {
  const shouldReduceMotion = useReducedMotion();
  const showPulse = !shouldReduceMotion && !isOpening && !disabled;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      disabled={disabled}
      variants={sealVariants}
      whileHover={disabled ? undefined : { scale: 1.04 }}
      whileTap={disabled ? undefined : { scale: 0.93 }}
      aria-label="Buka jemputan"
      className={cn(
        "group relative aspect-square rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent disabled:pointer-events-none",
        className,
      )}
    >
      {showPulse ? (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#8f1f2a]/25"
          animate={{ scale: [1, 1.45], opacity: [0.45, 0] }}
          transition={{ duration: 2.4, ease: "easeOut", repeat: Infinity }}
        />
      ) : null}

      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="relative size-full drop-shadow-[0_6px_10px_rgba(72,14,21,0.3)]"
      >
        <defs>
          <radialGradient id="envelope-wax-fill" cx="36%" cy="30%" r="78%">
            <stop offset="0%" stopColor="#b8323c" />
            <stop offset="45%" stopColor="#8f1f2a" />
            <stop offset="100%" stopColor="#5a1019" />
          </radialGradient>
        </defs>
        <path d={WAX_SEAL_PATH} fill="url(#envelope-wax-fill)" />
        <circle cx="50" cy="50" r="32.5" fill="none" stroke="rgba(52,7,14,0.32)" strokeWidth="1.6" />
        <circle cx="50" cy="50.8" r="32.5" fill="none" stroke="rgba(255,250,235,0.18)" strokeWidth="1" />
        <ellipse cx="38" cy="30" rx="13" ry="7" fill="rgba(255,255,255,0.14)" transform="rotate(-28 38 30)" />
      </svg>

      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center font-cinzel-decorative text-[clamp(0.8rem,4.6cqw,1.05rem)] leading-none tracking-[0.04em] text-[#fff3ec]/88 [text-shadow:0_-1px_0_rgba(52,7,14,0.5),0_1px_0_rgba(255,255,255,0.12)]"
      >
        {initials[0]}
        <span className="mx-[0.12em] font-serif text-[0.72em] italic">&amp;</span>
        {initials[1]}
      </span>
    </motion.button>
  );
}
