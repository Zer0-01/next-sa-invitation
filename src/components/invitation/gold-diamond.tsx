import { cn } from "@/lib/utils";

interface GoldDiamondProps {
  className?: string;
}

/** Small gold outline diamond used to frame eyebrow labels. */
export function GoldDiamond({ className }: GoldDiamondProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("h-1 w-1 rotate-45 border border-gold/75", className)}
    />
  );
}
