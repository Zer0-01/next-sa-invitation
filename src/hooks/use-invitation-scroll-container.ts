"use client";

import { useEffect, useState } from "react";

const FRAMED_LAYOUT_QUERY = "(min-width: 768px)";

interface InvitationScrollContainerState {
  scrollContainer: HTMLElement | null;
  viewportHeight: number | null;
}

export function useInvitationScrollContainer(): InvitationScrollContainerState {
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(FRAMED_LAYOUT_QUERY);
    const invitationScroller = document.querySelector<HTMLElement>(
      "[data-invitation-scroll-container='true']"
    );

    const syncScrollEnvironment = () => {
      const isFramedLayout = mediaQuery.matches;

      setScrollContainer(isFramedLayout ? invitationScroller : null);
      setViewportHeight(
        (isFramedLayout ? invitationScroller?.clientHeight : window.innerHeight) || null
      );
    };

    syncScrollEnvironment();

    const resizeObserver =
      invitationScroller && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(syncScrollEnvironment)
        : null;

    resizeObserver?.observe(invitationScroller as HTMLElement);
    mediaQuery.addEventListener("change", syncScrollEnvironment);
    window.addEventListener("resize", syncScrollEnvironment);

    return () => {
      resizeObserver?.disconnect();
      mediaQuery.removeEventListener("change", syncScrollEnvironment);
      window.removeEventListener("resize", syncScrollEnvironment);
    };
  }, []);

  return { scrollContainer, viewportHeight };
}
