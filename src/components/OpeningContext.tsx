"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface OpeningContextType {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    isDismissed: boolean;
}

const OpeningContext = createContext<OpeningContextType | undefined>(undefined);

export const OpeningProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    // We want to track when the animation is FINISHED dismissing
    useEffect(() => {
        if (isOpen) {
            // Small delay to account for the exit animation duration (1s in InvitationOpening)
            const timer = setTimeout(() => {
                setIsDismissed(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return (
        <OpeningContext.Provider value={{ isOpen, setIsOpen, isDismissed }}>
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
