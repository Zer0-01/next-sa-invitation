"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Builds an organic, slightly uneven wax outline. The values are
 * deterministic so server and client render the same path.
 */
function createWaxSealPath(pointCount = 90) {
  const points = Array.from({ length: pointCount }, (_, index) => {
    const angle = (index / pointCount) * Math.PI * 2;
    const radius =
      44 +
      2.4 * Math.sin(angle * 7) +
      1.3 * Math.sin(angle * 13 + 1.2) +
      0.7 * Math.sin(angle * 23 + 0.4);

    const x = (50 + radius * Math.cos(angle)).toFixed(2);
    const y = (50 + radius * Math.sin(angle)).toFixed(2);

    return `${x} ${y}`;
  });

  return `M${points.join(" L")} Z`;
}

const WAX_SEAL_PATH = createWaxSealPath();

interface WaxSealShapeProps {
  className?: string;
}

/** The red wax seal disc, without content. Shared by the envelope and the gift card. */
export function WaxSealShape({ className }: WaxSealShapeProps) {
  // Unique per instance, so two seals on one page never share a gradient.
  const gradientId = `wax-fill-${useId()}`;

  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={cn("drop-shadow-[0_6px_10px_rgba(72,14,21,0.3)]", className)}
    >
      <defs>
        <radialGradient id={gradientId} cx="36%" cy="30%" r="78%">
          <stop offset="0%" stopColor="#b8323c" />
          <stop offset="45%" stopColor="#8f1f2a" />
          <stop offset="100%" stopColor="#5a1019" />
        </radialGradient>
      </defs>
      <path d={WAX_SEAL_PATH} fill={`url(#${gradientId})`} />
      <circle cx="50" cy="50" r="32.5" fill="none" stroke="rgba(52,7,14,0.32)" strokeWidth="1.6" />
      <circle cx="50" cy="50.8" r="32.5" fill="none" stroke="rgba(255,250,235,0.18)" strokeWidth="1" />
      <ellipse cx="38" cy="30" rx="13" ry="7" fill="rgba(255,255,255,0.14)" transform="rotate(-28 38 30)" />
    </svg>
  );
}
