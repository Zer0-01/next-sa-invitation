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
          "absolute inset-0 bg-[linear-gradient(180deg,rgba(28,20,14,0.26)_0%,rgba(77,60,46,0.18)_24%,rgba(247,241,233,0.34)_56%,rgba(247,241,233,0.82)_100%)]",
          overlayClassName
        )}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.34),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(255,244,232,0.18),transparent_28%),linear-gradient(180deg,rgba(46,33,24,0.08)_0%,rgba(46,33,24,0.16)_100%)]" />
    </motion.div>
  );
}
