"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaxStepperProps {
  id: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  "aria-labelledby"?: string;
}

const stepButtonClassName =
  "size-11 rounded-full border-primary/15 bg-white/80 text-primary shadow-none hover:bg-white disabled:opacity-35";

export function PaxStepper({
  id,
  value,
  min,
  max,
  onChange,
  "aria-labelledby": ariaLabelledBy,
}: PaxStepperProps) {
  return (
    <div
      id={id}
      role="group"
      aria-labelledby={ariaLabelledBy}
      className="flex items-center justify-between rounded-[1.2rem] border border-primary/12 bg-white/88 px-2 py-2"
    >
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Kurangkan bilangan pax"
        className={stepButtonClassName}
      >
        <Minus />
      </Button>

      <p aria-live="polite" className="font-spartan text-primary">
        <span className="text-[1.35rem] tabular-nums">{value}</span>
        <span className="ml-1.5 text-[0.95rem] text-primary/60">
          {value === 1 ? "orang — saya sahaja" : "orang"}
        </span>
      </p>

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Tambah bilangan pax"
        className={stepButtonClassName}
      >
        <Plus />
      </Button>
    </div>
  );
}
