"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { WaxSealShape } from "@/components/invitation/wax-seal-shape";
import { cn } from "@/lib/utils";

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

      <WaxSealShape className="relative size-full" />

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
