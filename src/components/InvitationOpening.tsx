"use client";

import BackgroundMusic from "@/components/BackgroundMusic";
import { OpeningProvider, useOpening } from "./OpeningContext";

const InvitationShell = ({ children }: { children: React.ReactNode }) => {
  const { isUnlocked } = useOpening();

  return (
    <div className="relative w-full lg:h-[calc(100vh-4rem)] lg:max-h-[860px] lg:w-[420px] lg:max-w-full lg:overflow-hidden lg:rounded-[2rem] lg:border-[6px] lg:border-white lg:shadow-[0_28px_70px_rgba(42,31,18,0.22)]">
      <main
        data-invitation-scroll-container="true"
        className={`relative z-0 ${
          isUnlocked
            ? "lg:h-full lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain lg:[-ms-overflow-style:none] lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden"
            : "lg:h-full lg:min-h-0 lg:overflow-hidden"
        }`}
      >
        {children}
        <BackgroundMusic />
      </main>
    </div>
  );
};

const InvitationOpening = ({ children }: { children: React.ReactNode }) => {
  return (
    <OpeningProvider>
      <InvitationShell>{children}</InvitationShell>
    </OpeningProvider>
  );
};

export default InvitationOpening;
