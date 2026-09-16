"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type UseScrollOptions,
} from "framer-motion";
import { useMemo, useRef } from "react";
import { useInvitationScrollContainer } from "@/hooks/use-invitation-scroll-container";
import { cn } from "@/lib/utils";

const DECORATION_SCROLL_OFFSETS: NonNullable<UseScrollOptions["offset"]> = [
  "start end",
  "end start",
];

interface PaintedDecorationProps {
  src: string;
  className?: string;
  imageClassName?: string;
  sizes: string;
  parallaxDistance?: number;
  floatDistance?: number;
  floatDuration?: number;
}

export function PaintedDecoration({
  src,
  className,
  imageClassName,
  sizes,
  parallaxDistance = 36,
  floatDistance = 0,
  floatDuration = 7,
}: PaintedDecorationProps) {
  const decorationRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollContainer } = useInvitationScrollContainer();
  containerRef.current = scrollContainer;

  const scrollOptions = useMemo(
    () => ({
      target: decorationRef,
      offset: DECORATION_SCROLL_OFFSETS,
      ...(scrollContainer ? { container: containerRef } : {}),
    }),
    [scrollContainer]
  );

  const { scrollYProgress } = useScroll(scrollOptions);
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-parallaxDistance, parallaxDistance]
  );

  return (
    <motion.div
      ref={decorationRef}
      aria-hidden="true"
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={cn("pointer-events-none absolute select-none", className)}
    >
      <motion.div
        style={shouldReduceMotion ? undefined : { y }}
        className="relative size-full"
      >
        <motion.div
          animate={
            shouldReduceMotion || floatDistance === 0
              ? undefined
              : { y: [0, -floatDistance, 0], rotate: [0, 0.35, 0] }
          }
          transition={{
            duration: floatDuration,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="relative size-full"
        >
          <Image
            src={src}
            alt=""
            fill
            sizes={sizes}
            className={cn("object-contain", imageClassName)}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
