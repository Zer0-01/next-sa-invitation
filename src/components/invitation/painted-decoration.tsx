"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface PaintedDecorationProps {
  src: string;
  className?: string;
  imageClassName?: string;
  sizes: string;
  parallaxDistance?: number;
}

export function PaintedDecoration({
  src,
  className,
  imageClassName,
  sizes,
  parallaxDistance = 36,
}: PaintedDecorationProps) {
  const decorationRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: decorationRef,
    offset: ["start end", "end start"],
  });
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
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes}
          className={cn("object-contain", imageClassName)}
        />
      </motion.div>
    </motion.div>
  );
}
