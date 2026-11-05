"use client";

import { useCallback, useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

type UseCarouselAutoplayOptions = {
  delay?: number;
  enabled?: boolean;
};

/**
 * Advances the carousel on a timer while `enabled` is true.
 * Autoplay stops for good once the visitor drags the carousel
 * or `stopAutoplay` is called, so it never fights the user.
 */
export function useCarouselAutoplay(
  api: CarouselApi,
  { delay = 5000, enabled = true }: UseCarouselAutoplayOptions = {},
) {
  const [isStopped, setIsStopped] = useState(false);

  const stopAutoplay = useCallback(() => {
    setIsStopped(true);
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("pointerDown", stopAutoplay);

    return () => {
      api.off("pointerDown", stopAutoplay);
    };
  }, [api, stopAutoplay]);

  useEffect(() => {
    if (!api || !enabled || isStopped) {
      return;
    }

    let timeoutId: number | undefined;

    const scheduleNext = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        api.scrollNext();
      }, delay);
    };

    scheduleNext();
    api.on("select", scheduleNext);

    return () => {
      window.clearTimeout(timeoutId);
      api.off("select", scheduleNext);
    };
  }, [api, delay, enabled, isStopped]);

  return { stopAutoplay };
}
