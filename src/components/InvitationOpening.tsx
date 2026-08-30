"use client";

import BackgroundMusic from "@/components/BackgroundMusic";
import { EnvelopeOpeningOverlay } from "@/components/invitation/envelope-opening-overlay";
import { OpeningProvider, useOpening } from "./OpeningContext";

const InvitationShell = ({ children }: { children: React.ReactNode }) => {
  const { isUnlocked } = useOpening();

  return (
    <div
      className={`relative w-full ${
        isUnlocked ? "min-h-screen md:min-h-0" : "h-screen"
      } md:h-[calc(100vh-4rem)] md:max-h-[860px] md:w-[420px] md:max-w-full md:overflow-hidden md:rounded-[2rem] md:border-[6px] md:border-white md:shadow-[0_28px_70px_rgba(42,31,18,0.22)]`}
    >
      <EnvelopeOpeningOverlay />
      <main
        data-invitation-scroll-container="true"
        className={`relative z-0 ${
          isUnlocked
            ? "md:h-full md:min-h-0 md:overflow-y-auto md:overscroll-contain md:[-ms-overflow-style:none] md:[scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden"
            : "md:h-full md:min-h-0 md:overflow-hidden"
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
