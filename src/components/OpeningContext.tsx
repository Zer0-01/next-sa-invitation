"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface OpeningContextType {
  isUnlocked: boolean;
  isDismissed: boolean;
  isOpening: boolean;
  shouldPlayMusic: boolean;
  requestMusicStart: () => void;
  startOpening: () => void;
  completeOpening: () => void;
}

const OpeningContext = createContext<OpeningContextType | undefined>(undefined);

export const OpeningProvider = ({ children }: { children: React.ReactNode }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);

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

  const requestMusicStart = () => {
    setShouldPlayMusic(true);
  };

  const startOpening = () => {
    setIsOpening(true);
  };

  const completeOpening = () => {
    setIsOpening(false);
    setIsUnlocked(true);
    requestMusicStart();
  };

  return (
    <OpeningContext.Provider
      value={{
        isUnlocked,
        isDismissed,
        isOpening,
        shouldPlayMusic,
        requestMusicStart,
        startOpening,
        completeOpening,
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
