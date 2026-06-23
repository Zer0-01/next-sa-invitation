"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  useReducedMotion,
  useScroll,
  useTransform,
  type UseScrollOptions,
} from "framer-motion";
import { CountdownScene } from "@/components/invitation/countdown-scene";
import { DateVenueScene } from "@/components/invitation/date-venue-scene";
import { GreetingScene } from "@/components/invitation/greeting-scene";
import { SceneBackground } from "@/components/invitation/scene-background";
import { invitationContent } from "@/lib/invitation-content";

const DEFAULT_MOBILE_SCENE_HEIGHT = 900;
const SCROLL_OFFSETS: NonNullable<UseScrollOptions["offset"]> = [
  "start start",
  "end end",
];

export function InvitationScenes() {
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const [isDesktopFrame, setIsDesktopFrame] = useState(false);
  const [sceneHeight, setSceneHeight] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const scrollContainer = document.querySelector<HTMLElement>(
      "[data-invitation-scroll-container='true']"
    );
    const syncContainerMode = () => {
      setIsDesktopFrame(mediaQuery.matches);
      setScrollContainer(mediaQuery.matches ? scrollContainer : null);
    };

    const syncHeight = () => {
      const nextHeight =
        mediaQuery.matches && scrollContainer
          ? scrollContainer.clientHeight
          : window.innerHeight;

      setSceneHeight(nextHeight || null);
    };

    syncContainerMode();
    syncHeight();

    const resizeObserver =
      scrollContainer && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(syncHeight)
        : null;

    if (resizeObserver && scrollContainer) {
      resizeObserver.observe(scrollContainer);
    }
    mediaQuery.addEventListener("change", syncContainerMode);
    mediaQuery.addEventListener("change", syncHeight);
    window.addEventListener("resize", syncHeight);

    return () => {
      resizeObserver?.disconnect();
      mediaQuery.removeEventListener("change", syncContainerMode);
      mediaQuery.removeEventListener("change", syncHeight);
      window.removeEventListener("resize", syncHeight);
    };
  }, []);

  return (
    <InvitationScenesContent
      sceneHeight={sceneHeight}
      scrollContainer={isDesktopFrame ? scrollContainer : null}
    />
  );
}

function InvitationScenesContent({
  sceneHeight,
  scrollContainer,
}: {
  sceneHeight: number | null;
  scrollContainer: HTMLElement | null;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  containerRef.current = scrollContainer;

  const scrollOptions = useMemo(
    () => ({
      target: ref,
      offset: SCROLL_OFFSETS,
      ...(scrollContainer ? { container: containerRef } : {}),
    }),
    [scrollContainer]
  );

  const { scrollYProgress } = useScroll(scrollOptions);

  const viewportHeight = sceneHeight ?? DEFAULT_MOBILE_SCENE_HEIGHT;

  const sceneOneOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.34],
    [1, 1, 0]
  );
  const sceneTwoOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.38, 0.58, 0.74],
    [0, 1, 1, 0]
  );
  const sceneThreeOpacity = useTransform(
    scrollYProgress,
    [0.58, 0.78, 1],
    [0, 1, 1]
  );

  const bgOneY = useTransform(
    scrollYProgress,
    [0, 0.34],
    shouldReduceMotion ? [0, 0] : [0, -26]
  );
  const bgTwoY = useTransform(
    scrollYProgress,
    [0.2, 0.74],
    shouldReduceMotion ? [0, 0] : [18, -18]
  );
  const bgThreeY = useTransform(
    scrollYProgress,
    [0.58, 1],
    shouldReduceMotion ? [0, 0] : [24, -8]
  );

  const contentOneY = useTransform(
    scrollYProgress,
    [0, 0.34],
    shouldReduceMotion ? [0, 0] : [0, -18]
  );
  const contentTwoY = useTransform(
    scrollYProgress,
    [0.2, 0.74],
    shouldReduceMotion ? [0, 0] : [16, -14]
  );
  const contentThreeY = useTransform(
    scrollYProgress,
    [0.58, 1],
    shouldReduceMotion ? [0, 0] : [18, -6]
  );

  const bgScale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1.06, 1.12]
  );

  return (
    <section
      id="details"
      ref={ref}
      data-opening-next-section="true"
      className="relative"
      style={{ height: `${viewportHeight * 3}px` }}
    >
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: `${viewportHeight}px`, minHeight: `${viewportHeight}px` }}
      >
        <SceneBackground
          src={invitationContent.invitationScenes.greeting.backgroundSrc}
          alt="Romantic garden backdrop"
          opacity={sceneOneOpacity}
          y={bgOneY}
          scale={bgScale}
          priority
        />
        <SceneBackground
          src={invitationContent.invitationScenes.dateVenue.backgroundSrc}
          alt="Soft venue backdrop"
          opacity={sceneTwoOpacity}
          y={bgTwoY}
          scale={bgScale}
          overlayClassName="bg-[linear-gradient(180deg,rgba(36,25,16,0.22)_0%,rgba(64,48,36,0.16)_48%,rgba(32,23,17,0.24)_100%)]"
        />
        <SceneBackground
          src={invitationContent.invitationScenes.countdown.backgroundSrc}
          alt="Dreamy floral backdrop"
          opacity={sceneThreeOpacity}
          y={bgThreeY}
          scale={bgScale}
          overlayClassName="bg-[linear-gradient(180deg,rgba(31,23,17,0.24)_0%,rgba(58,44,33,0.15)_46%,rgba(28,21,16,0.22)_100%)]"
        />

        <GreetingScene opacity={sceneOneOpacity} contentY={contentOneY} />
        <DateVenueScene opacity={sceneTwoOpacity} contentY={contentTwoY} />
        <CountdownScene opacity={sceneThreeOpacity} contentY={contentThreeY} />
      </div>
    </section>
  );
}
