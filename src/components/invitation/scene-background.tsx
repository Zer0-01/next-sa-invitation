"use client";

import Image from "next/image";
import { motion, useReducedMotion, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface SceneBackgroundProps {
  src: string;
  alt: string;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  scale?: MotionValue<number>;
  overlayClassName?: string;
  className?: string;
  priority?: boolean;
}

export function SceneBackground({
  src,
  alt,
  opacity,
  y,
  scale,
  overlayClassName,
  className,
  priority = false,
}: SceneBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      style={shouldReduceMotion ? { opacity } : { opacity, y, scale }}
      className={cn("absolute inset-0", className)}
      aria-hidden="true"
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 1023px) 100vw, 420px"
        className="object-cover object-center"
      />
      <div
        className={cn(
          "absolute inset-0 bg-[linear-gradient(180deg,rgba(28,20,14,0.26)_0%,rgba(77,60,46,0.18)_30%,rgba(71,56,44,0.14)_62%,rgba(34,24,18,0.24)_100%)]",
          overlayClassName
        )}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(46,33,24,0.1)_0%,rgba(46,33,24,0.18)_100%)]" />
    </motion.div>
  );
}
