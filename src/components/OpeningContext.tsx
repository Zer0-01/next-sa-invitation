"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface OpeningContextType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isDismissed: boolean;
  shouldPlayMusic: boolean;
  requestMusicStart: () => void;
}

const OpeningContext = createContext<OpeningContextType | undefined>(undefined);

export const OpeningProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsDismissed(true);
      }, 1000);
      return () => clearTimeout(timer);
    }

    setIsDismissed(false);
    setShouldPlayMusic(false);
  }, [isOpen]);

  const requestMusicStart = () => {
    setShouldPlayMusic(true);
  };

  return (
    <OpeningContext.Provider
      value={{ isOpen, setIsOpen, isDismissed, shouldPlayMusic, requestMusicStart }}
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
