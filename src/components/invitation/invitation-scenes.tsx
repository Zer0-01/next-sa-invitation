"use client";

import { useMemo, useRef, useState } from "react";
import {
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type UseScrollOptions,
} from "framer-motion";
import { CountdownScene } from "@/components/invitation/countdown-scene";
import { DateVenueScene } from "@/components/invitation/date-venue-scene";
import { GreetingScene } from "@/components/invitation/greeting-scene";
import { SceneBackground } from "@/components/invitation/scene-background";
import { SceneProgress } from "@/components/invitation/scene-progress";
import { useInvitationScrollContainer } from "@/hooks/use-invitation-scroll-container";
import { invitationContent } from "@/lib/invitation-content";
import { cn } from "@/lib/utils";

const SCROLL_OFFSETS: NonNullable<UseScrollOptions["offset"]> = [
  "start start",
  "end end",
];

/** Number of screen heights the pinned section spans (one per scene). */
const SCENE_COUNT = 3;

/**
 * Single source of truth for when each scene fades, as scroll progress (0-1)
 * through the pinned section. Every opacity, visibility, parallax and zoom
 * range below is derived from these values.
 */
// Fades are staggered: each scene's text is mostly gone before the next
// scene's text arrives, so the two never read on top of each other.
const SCENE_TIMELINE = {
  greeting: { fadeOut: [0.2, 0.3] },
  dateVenue: { fadeIn: [0.28, 0.4], fadeOut: [0.58, 0.7] },
  countdown: { fadeIn: [0.68, 0.8] },
} as const;

const { greeting, dateVenue, countdown } = SCENE_TIMELINE;

// The venue backdrop snaps in just before the greeting backdrop starts fading,
// so it is already fully underneath while the greeting backdrop dissolves.
const VENUE_BACKDROP_LEAD = 0.02;

// Scene boundaries for the progress dots: the midpoint of each crossfade.
const SCENE_BOUNDARIES = [
  (greeting.fadeOut[0] + greeting.fadeOut[1]) / 2,
  (dateVenue.fadeOut[0] + dateVenue.fadeOut[1]) / 2,
];

function toVisibility(opacity: number): "visible" | "hidden" {
  return opacity > 0.001 ? "visible" : "hidden";
}

/** Visibility that always follows the matching opacity, so they never disagree. */
function useVisibilityFromOpacity(opacity: MotionValue<number>) {
  return useTransform(opacity, toVisibility);
}

function getActiveSceneIndex(progress: number) {
  return SCENE_BOUNDARIES.filter((boundary) => progress >= boundary).length;
}

export function InvitationScenes() {
  const ref = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollContainer, viewportHeight } = useInvitationScrollContainer();
  containerRef.current = scrollContainer;

  // Desktop phone frame: size scenes to the measured frame height.
  // Mobile: use CSS viewport units so the browser toolbar showing/hiding never
  // triggers a JS re-layout (backgrounds fill `lvh`, content stays within `svh`).
  const framedSceneHeight = scrollContainer ? viewportHeight : null;

  const scrollOptions = useMemo(
    () => ({
      target: ref,
      offset: SCROLL_OFFSETS,
      ...(scrollContainer ? { container: containerRef } : {}),
    }),
    [scrollContainer]
  );

  const { scrollYProgress } = useScroll(scrollOptions);

  // Load the later backdrops only once the section starts coming into view.
  const shouldLoadLaterBackdrops = useInView(ref, {
    once: true,
    root: scrollContainer ? containerRef : undefined,
  });

  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setActiveSceneIndex(getActiveSceneIndex(progress));
  });

  // Scene opacity
  const greetingOpacity = useTransform(
    scrollYProgress,
    [0, ...greeting.fadeOut],
    [1, 1, 0]
  );
  const dateVenueOpacity = useTransform(
    scrollYProgress,
    [...dateVenue.fadeIn, ...dateVenue.fadeOut],
    [0, 1, 1, 0]
  );
  const countdownOpacity = useTransform(
    scrollYProgress,
    [...countdown.fadeIn, 1],
    [0, 1, 1]
  );

  // Backdrop opacity (the countdown backdrop is the constant base layer)
  const countdownBackdropOpacity = useMotionValue(1);
  const countdownBackdropVisibility = useMotionValue<"visible" | "hidden">("visible");
  const venueBackdropOpacity = useTransform(
    scrollYProgress,
    [greeting.fadeOut[0] - VENUE_BACKDROP_LEAD, greeting.fadeOut[0], ...dateVenue.fadeOut],
    [0, 1, 1, 0]
  );

  // Visibility, derived from opacity
  const greetingVisibility = useVisibilityFromOpacity(greetingOpacity);
  const dateVenueVisibility = useVisibilityFromOpacity(dateVenueOpacity);
  const countdownVisibility = useVisibilityFromOpacity(countdownOpacity);
  const venueBackdropVisibility = useVisibilityFromOpacity(venueBackdropOpacity);

  // Parallax, over each scene's visible range
  const greetingRange = [0, greeting.fadeOut[1]];
  const dateVenueRange = [dateVenue.fadeIn[0], dateVenue.fadeOut[1]];
  const countdownRange = [countdown.fadeIn[0], 1];

  const greetingBackdropY = useTransform(scrollYProgress, greetingRange, shouldReduceMotion ? [0, 0] : [0, -26]);
  const dateVenueBackdropY = useTransform(scrollYProgress, dateVenueRange, shouldReduceMotion ? [0, 0] : [18, -18]);
  const countdownBackdropY = useTransform(scrollYProgress, countdownRange, shouldReduceMotion ? [0, 0] : [24, -8]);

  const greetingContentY = useTransform(scrollYProgress, greetingRange, shouldReduceMotion ? [0, 0] : [0, -18]);
  const dateVenueContentY = useTransform(scrollYProgress, dateVenueRange, shouldReduceMotion ? [0, 0] : [16, -14]);
  const countdownContentY = useTransform(scrollYProgress, countdownRange, shouldReduceMotion ? [0, 0] : [18, -6]);

  // Gentle zoom: content settles in from slightly larger and recedes on exit
  const greetingContentScale = useTransform(
    scrollYProgress,
    [0, ...greeting.fadeOut],
    shouldReduceMotion ? [1, 1, 1] : [1, 1, 0.97]
  );
  const dateVenueContentScale = useTransform(
    scrollYProgress,
    [...dateVenue.fadeIn, ...dateVenue.fadeOut],
    shouldReduceMotion ? [1, 1, 1, 1] : [1.03, 1, 1, 0.97]
  );
  const countdownContentScale = useTransform(
    scrollYProgress,
    [...countdown.fadeIn],
    shouldReduceMotion ? [1, 1] : [1.03, 1]
  );

  const backdropScale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1.06, 1.12]
  );

  return (
    <section
      id="details"
      ref={ref}
      data-opening-next-section="true"
      className={cn("relative", !framedSceneHeight && "h-[300lvh]")}
      style={framedSceneHeight ? { height: `${framedSceneHeight * SCENE_COUNT}px` } : undefined}
    >
      <div
        className={cn("sticky top-0 overflow-hidden", !framedSceneHeight && "h-lvh")}
        style={framedSceneHeight ? { height: `${framedSceneHeight}px` } : undefined}
      >
        <SceneBackground
          src={invitationContent.invitationScenes.countdown.backgroundSrc}
          alt="Dreamy floral backdrop"
          opacity={countdownBackdropOpacity}
          y={countdownBackdropY}
          scale={backdropScale}
          visibility={countdownBackdropVisibility}
          shouldLoadImage={shouldLoadLaterBackdrops}
          className="z-0"
          overlayClassName="bg-[linear-gradient(180deg,rgba(31,23,17,0.24)_0%,rgba(58,44,33,0.15)_46%,rgba(28,21,16,0.22)_100%)]"
        />
        <SceneBackground
          src={invitationContent.invitationScenes.dateVenue.backgroundSrc}
          alt="Soft venue backdrop"
          opacity={venueBackdropOpacity}
          y={dateVenueBackdropY}
          scale={backdropScale}
          visibility={venueBackdropVisibility}
          shouldLoadImage={shouldLoadLaterBackdrops}
          className="z-[1]"
          overlayClassName="bg-[linear-gradient(180deg,rgba(36,25,16,0.22)_0%,rgba(64,48,36,0.16)_48%,rgba(32,23,17,0.24)_100%)]"
        />
        <SceneBackground
          src={invitationContent.invitationScenes.greeting.backgroundSrc}
          alt="Romantic garden backdrop"
          opacity={greetingOpacity}
          y={greetingBackdropY}
          scale={backdropScale}
          visibility={greetingVisibility}
          className="z-[2]"
          priority
        />

        {/* Content is kept within the small viewport so nothing sits behind the toolbar */}
        <div
          className={cn("absolute inset-x-0 top-0", framedSceneHeight ? "h-full" : "h-svh")}
        >
          <GreetingScene
            opacity={greetingOpacity}
            contentY={greetingContentY}
            contentScale={greetingContentScale}
            visibility={greetingVisibility}
          />
          <DateVenueScene
            opacity={dateVenueOpacity}
            contentY={dateVenueContentY}
            contentScale={dateVenueContentScale}
            visibility={dateVenueVisibility}
          />
          <CountdownScene
            opacity={countdownOpacity}
            contentY={countdownContentY}
            contentScale={countdownContentScale}
            visibility={countdownVisibility}
          />

          <SceneProgress
            count={SCENE_COUNT}
            activeIndex={activeSceneIndex}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2"
          />
        </div>
      </div>
    </section>
  );
}
