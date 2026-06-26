"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface OpeningContextType {
  isUnlocked: boolean;
  isDismissed: boolean;
  shouldPlayMusic: boolean;
  requestMusicStart: () => void;
  unlockInvitation: () => void;
}

const OpeningContext = createContext<OpeningContextType | undefined>(undefined);

interface ScrollBarrierState {
  mode: "window" | "container";
  top: number;
}

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function animateScrollTo({
  getCurrent,
  setCurrent,
  target,
  duration,
}: {
  getCurrent: () => number;
  setCurrent: (value: number) => void;
  target: number;
  duration: number;
}) {
  const start = getCurrent();
  const distance = target - start;

  if (Math.abs(distance) < 1) {
    setCurrent(target);
    return;
  }

  const startTime = performance.now();

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    setCurrent(start + distance * easedProgress);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

export const OpeningProvider = ({ children }: { children: React.ReactNode }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);
  const [shouldScrollToContent, setShouldScrollToContent] = useState(false);
  const [scrollBarrier, setScrollBarrier] = useState<ScrollBarrierState | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    const applyViewportLock = () => {
      const shouldLockViewport = mediaQuery.matches || !isUnlocked;
      document.documentElement.style.overflow = shouldLockViewport ? "hidden" : previousHtmlOverflow;
      document.body.style.overflow = shouldLockViewport ? "hidden" : previousBodyOverflow;
    };

    applyViewportLock();
    mediaQuery.addEventListener("change", applyViewportLock);

    return () => {
      mediaQuery.removeEventListener("change", applyViewportLock);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isUnlocked]);

  useEffect(() => {
    if (!isUnlocked) {
      setIsDismissed(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setIsDismissed(true);
    }, 220);

    return () => window.clearTimeout(timer);
  }, [isUnlocked]);

  useEffect(() => {
    if (!isUnlocked || !shouldScrollToContent || typeof window === "undefined") {
      return;
    }

    const scrollToContent = () => {
      const target = document.querySelector<HTMLElement>("[data-opening-next-section='true']");
      if (!target) {
        setShouldScrollToContent(false);
        return;
      }

      const mediaQuery = window.matchMedia("(min-width: 768px)");
      const container = document.querySelector<HTMLElement>("[data-invitation-scroll-container='true']");
      const duration = 2600;

      if (mediaQuery.matches && container) {
        const top =
          target.getBoundingClientRect().top -
          container.getBoundingClientRect().top +
          container.scrollTop;

        animateScrollTo({
          getCurrent: () => container.scrollTop,
          setCurrent: (value) => {
            container.scrollTop = value;
          },
          target: top,
          duration,
        });

        window.setTimeout(() => {
          setScrollBarrier({ mode: "container", top });
        }, duration + 60);
      } else {
        const top = window.scrollY + target.getBoundingClientRect().top;

        animateScrollTo({
          getCurrent: () => window.scrollY,
          setCurrent: (value) => {
            window.scrollTo(0, value);
          },
          target: top,
          duration,
        });

        window.setTimeout(() => {
          setScrollBarrier({ mode: "window", top });
        }, duration + 60);
      }

      setShouldScrollToContent(false);
    };

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(scrollToContent);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isUnlocked, shouldScrollToContent]);

  useEffect(() => {
    if (!scrollBarrier || typeof window === "undefined") {
      return;
    }

    const container = document.querySelector<HTMLElement>("[data-invitation-scroll-container='true']");

    if (scrollBarrier.mode === "container") {
      if (!container) {
        return;
      }

      const enforceContainerBarrier = () => {
        if (container.scrollTop < scrollBarrier.top) {
          container.scrollTop = scrollBarrier.top;
        }
      };

      container.addEventListener("scroll", enforceContainerBarrier, { passive: true });

      return () => {
        container.removeEventListener("scroll", enforceContainerBarrier);
      };
    }

    const enforceWindowBarrier = () => {
      if (window.scrollY < scrollBarrier.top) {
        window.scrollTo(0, scrollBarrier.top);
      }
    };

    window.addEventListener("scroll", enforceWindowBarrier, { passive: true });

    return () => {
      window.removeEventListener("scroll", enforceWindowBarrier);
    };
  }, [scrollBarrier]);

  const requestMusicStart = () => {
    setShouldPlayMusic(true);
  };

  const unlockInvitation = () => {
    requestMusicStart();
    setIsUnlocked(true);
    setShouldScrollToContent(true);
  };

  return (
    <OpeningContext.Provider
      value={{
        isUnlocked,
        isDismissed,
        shouldPlayMusic,
        requestMusicStart,
        unlockInvitation,
      }}
    >
      {children}
    </OpeningContext.Provider>
  );
};

export const useOpening = () => {
  const context = useContext(OpeningContext);
  if (context === undefined) {
    throw new Error("useOpening must be used within an OpeningProvider");
  }
  return context;
};
