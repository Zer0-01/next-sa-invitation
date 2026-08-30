"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface FloatingImageProps {
  src: string;
  alt: string;
  className?: string;
  scrollRange?: [number, number];
  floatRange?: [number, number, number];
  rotateRange?: [number, number];
  priority?: boolean;
}

export function FloatingImage({
  src,
  alt,
  className,
  scrollRange = [-18, 24],
  floatRange = [-8, 10, -8],
  rotateRange = [-2, 2],
  priority = false,
}: FloatingImageProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : scrollRange
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : rotateRange
  );

  return (
    <motion.div
      ref={ref}
      style={shouldReduceMotion ? undefined : { y, rotate }}
      animate={
        shouldReduceMotion
          ? undefined
          : {
              translateY: floatRange,
            }
      }
      transition={
        shouldReduceMotion
          ? undefined
          : {
              translateY: {
                duration: 7,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              },
            }
      }
      className={cn("pointer-events-none absolute select-none", className)}
      aria-hidden="true"
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 40vw, 25vw"
        className="object-contain"
      />
    </motion.div>
  );
}
