"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ButterflyDrift } from "@/components/invitation/decorative-motion";
import { GalleryDots } from "@/components/invitation/gallery-dots";
import { GalleryLightbox } from "@/components/invitation/gallery-lightbox";
import { PaintedDecoration } from "@/components/invitation/painted-decoration";
import { useCarouselAutoplay } from "@/hooks/use-carousel-autoplay";
import { useCarouselSelectedIndex } from "@/hooks/use-carousel-selected-index";
import { invitationContent } from "@/lib/invitation-content";
import { cn } from "@/lib/utils";

const ARCH_FRAME_RADIUS = "rounded-t-[50%_33.333%] rounded-b-[1.5rem]";

export function GalleryScene() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.4 });
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [isHovered, setIsHovered] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const currentSlide = useCarouselSelectedIndex(carouselApi);
  const images = invitationContent.galleryImages;

  const { stopAutoplay } = useCarouselAutoplay(carouselApi, {
    enabled: !shouldReduceMotion && isInView && !isHovered && !isLightboxOpen,
  });

  const goToSlide = (index: number) => {
    stopAutoplay();
    carouselApi?.scrollTo(index);
  };

  const handleSlideClick = (index: number) => {
    if (index === currentSlide) {
      stopAutoplay();
      setIsLightboxOpen(true);
      return;
    }

    goToSlide(index);
  };

  const syncFromLightbox = useCallback(
    (index: number) => {
      carouselApi?.scrollTo(index, true);
    },
    [carouselApi],
  );

  return (
    <section
      ref={sectionRef}
      id="gallery"
      aria-labelledby="gallery-title"
      className="invitation-surface relative overflow-hidden px-5 py-18 sm:px-7 sm:py-20 lg:px-10 lg:py-24"
    >
      <PaintedDecoration
        src="/images/decorations/painted-wildflower-corner.png"
        sizes="(min-width: 1024px) 420px, (min-width: 640px) 320px, 240px"
        parallaxDistance={30}
        className="-left-12 -top-10 z-0 size-64 sm:-left-16 sm:-top-12 sm:size-80 lg:-left-12 lg:-top-14 lg:size-[26rem]"
        imageClassName="opacity-80"
      />
      <PaintedDecoration
        src="/images/decorations/painted-wildflower-corner.png"
        sizes="(min-width: 1024px) 420px, (min-width: 640px) 320px, 240px"
        parallaxDistance={30}
        className="-bottom-10 -right-12 z-0 size-64 sm:-bottom-12 sm:-right-16 sm:size-80 lg:-bottom-14 lg:-right-12 lg:size-[26rem]"
        imageClassName="rotate-180 opacity-80"
      />
      <ButterflyDrift />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-xl text-center"
        >
          <p className="font-spartan text-[0.72rem] uppercase tracking-[0.28em] text-primary/55">
            Secebis cerita
          </p>
          <h2
            id="gallery-title"
            className="mt-3 font-spartan text-[1.7rem] leading-[0.98] text-primary sm:text-[2rem]"
          >
            Kenangan Kami
          </h2>
          <p className="mt-4 font-spartan text-[1rem] leading-7 text-primary/68 sm:text-[1.05rem]">
            Momen sederhana yang membawa kami hingga ke hari bahagia ini.
          </p>
        </motion.div>

        <div className="mt-10 sm:mt-12">
          <Carousel
            setApi={setCarouselApi}
            opts={{ align: "center", loop: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="@container -mx-5 sm:-mx-7 lg:-mx-10 [&_[data-slot=carousel-content]]:touch-pan-y"
          >
            {/* Slide widths use container queries, not viewport breakpoints,
                so they stay correct inside the desktop phone frame. */}
            <CarouselContent className="-ml-3 @lg:-ml-5">
              {images.map((image, index) => {
                const isActive = index === currentSlide;

                return (
                  <CarouselItem
                    key={image.src}
                    className="basis-[76%] pl-3 @lg:basis-[56%] @lg:pl-5 @3xl:basis-[40%]"
                  >
                    <button
                      type="button"
                      onClick={() => handleSlideClick(index)}
                      aria-label={
                        isActive
                          ? `Buka gambar ${index + 1} dalam paparan penuh`
                          : `Lihat gambar ${index + 1}`
                      }
                      className={cn(
                        "block w-full cursor-pointer transition-[transform,opacity] duration-500 ease-out focus-visible:outline-none [&:focus-visible>figure]:ring-2 [&:focus-visible>figure]:ring-primary/40 [&:focus-visible>figure]:ring-offset-2",
                        isActive ? "scale-100 opacity-100" : "scale-[0.86] opacity-55",
                      )}
                    >
                      <figure
                        className={cn(
                          "relative isolate aspect-[2/3] overflow-hidden border border-white/70 bg-[#e9dfd3] shadow-[0_8px_20px_rgba(74,58,44,0.1)] sm:shadow-[0_16px_38px_rgba(74,58,44,0.12)]",
                          ARCH_FRAME_RADIUS,
                        )}
                      >
                        <motion.div
                          className="absolute inset-0"
                          initial={false}
                          animate={{ scale: isActive && !shouldReduceMotion ? 1.06 : 1 }}
                          transition={{ duration: isActive ? 7 : 0.6, ease: "easeOut" }}
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes={image.sizes}
                            priority={index === 0}
                            draggable={false}
                            className="object-cover"
                          />
                        </motion.div>
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-2.5 rounded-t-[50%_33.333%] rounded-b-[1.1rem] border border-white/55"
                        />
                      </figure>
                    </button>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>

          <GalleryDots
            className="mt-6"
            count={images.length}
            activeIndex={currentSlide}
            onSelect={goToSlide}
          />

          <p className="mt-5 text-center font-spartan text-[0.82rem] leading-6 text-primary/58">
            Kongsi kenangan anda dengan
            <span className="mt-1 block text-[0.9rem] tracking-[0.08em] text-primary/76">
              {invitationContent.weddingHashtag}
            </span>
          </p>
        </div>
      </div>

      <GalleryLightbox
        open={isLightboxOpen}
        startIndex={currentSlide}
        onOpenChange={setIsLightboxOpen}
        onIndexChange={syncFromLightbox}
      />
    </section>
  );
}
