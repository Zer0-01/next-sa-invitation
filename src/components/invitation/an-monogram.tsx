import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const MONOGRAM_SRC = "/ustad/AN-caligraph.png";

/**
 * Uses the calligraphy PNG as a mask, so the monogram takes its colour from
 * the element's background (the ink token) instead of the image itself.
 */
export const monogramMaskStyle: CSSProperties = {
  maskImage: `url(${MONOGRAM_SRC})`,
  WebkitMaskImage: `url(${MONOGRAM_SRC})`,
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
};

interface AnMonogramProps {
  label: string;
  className?: string;
}

/** Static A N monogram, tinted with the ink token. */
export function AnMonogram({ label, className }: AnMonogramProps) {
  return (
    <div role="img" aria-label={label} className={cn("relative", className)}>
      <div className="absolute inset-0 bg-ink" style={monogramMaskStyle} />
    </div>
  );
}
