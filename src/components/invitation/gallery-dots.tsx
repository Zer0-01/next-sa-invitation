"use client";

import { cn } from "@/lib/utils";

type GalleryDotsProps = {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  tone?: "dark" | "light";
  className?: string;
};

export function GalleryDots({
  count,
  activeIndex,
  onSelect,
  tone = "dark",
  className,
}: GalleryDotsProps) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {Array.from({ length: count }, (_, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`Lihat gambar ${index + 1}`}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "size-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              tone === "dark"
                ? "focus-visible:ring-primary/40"
                : "focus-visible:ring-white/50 focus-visible:ring-offset-transparent",
              isActive
                ? cn("scale-125", tone === "dark" ? "bg-primary/75" : "bg-white/90")
                : tone === "dark"
                  ? "bg-primary/20 hover:bg-primary/35"
                  : "bg-white/25 hover:bg-white/45",
            )}
          />
        );
      })}
    </div>
  );
}
