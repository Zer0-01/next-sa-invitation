"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ParallaxSectionProps {
  id?: string;
  backgroundSrc: string;
  backgroundAlt: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  backgroundClassName?: string;
  overlayClassName?: string;
  priority?: boolean;
}

export function ParallaxSection({
  id,
  backgroundSrc,
  backgroundAlt,
  children,
  className,
  contentClassName,
  backgroundClassName,
  overlayClassName,
  priority = false,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-70, 70]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1.08, 1.14]
  );

  return (
    <motion.section
      id={id}
      ref={ref}
      className={cn("relative isolate overflow-hidden", className)}
    >
      <motion.div
        style={shouldReduceMotion ? undefined : { y, scale }}
        className={cn("absolute inset-0 -z-20", backgroundClassName)}
      >
        <Image
          src={backgroundSrc}
          alt={backgroundAlt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div
        className={cn(
          "absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(250,246,239,0.8)_0%,rgba(250,246,239,0.6)_26%,rgba(248,243,236,0.82)_100%)]",
          overlayClassName
        )}
      />
      <div className={cn("relative z-10", contentClassName)}>{children}</div>
    </motion.section>
  );
}
