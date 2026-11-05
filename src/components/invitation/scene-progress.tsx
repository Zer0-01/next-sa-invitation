"use client";

import { cn } from "@/lib/utils";

interface SceneProgressProps {
  count: number;
  activeIndex: number;
  className?: string;
}

/**
 * Small vertical dots showing which pinned scene is on screen.
 * Decorative only: the scenes themselves carry the content.
 */
export function SceneProgress({ count, activeIndex, className }: SceneProgressProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none flex flex-col items-center gap-2", className)}
    >
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className={cn(
            "w-1.5 rounded-full shadow-[0_0_4px_rgba(20,14,10,0.45)] transition-all duration-500 ease-out",
            index === activeIndex ? "h-4 bg-white/90" : "h-1.5 bg-white/40",
          )}
        />
      ))}
    </div>
  );
}
