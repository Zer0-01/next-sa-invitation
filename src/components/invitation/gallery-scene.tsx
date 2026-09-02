"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { invitationContent } from "@/lib/invitation-content";

export function GalleryScene() {
  const shouldReduceMotion = useReducedMotion();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateCurrentSlide = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    updateCurrentSlide();
    carouselApi.on("select", updateCurrentSlide);

    return () => {
      carouselApi.off("select", updateCurrentSlide);
    };
  }, [carouselApi]);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="invitation-surface relative overflow-hidden px-5 py-18 sm:px-7 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="relative mx-auto w-full max-w-5xl">
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
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="ml-0">
              {invitationContent.galleryImages.map((image) => (
                <CarouselItem key={image.src} className="pl-0">
                  <figure
                    className="relative aspect-[3/4] overflow-hidden rounded-[1.35rem] border border-white/70 bg-[#e9dfd3] shadow-[0_16px_38px_rgba(74,58,44,0.12)] sm:rounded-[1.6rem]"
                  >
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes={image.sizes}
                      aria-hidden="true"
                      className="scale-110 object-cover blur-2xl"
                    />
                    <div className="absolute inset-0 bg-[#31271f]/24" />
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes={image.sizes}
                      className="relative z-10 object-contain drop-shadow-[0_12px_24px_rgba(30,23,17,0.28)]"
                    />
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-3 border-white/75 bg-[#fbf7f1]/90 text-primary shadow-[0_8px_20px_rgba(74,58,44,0.15)] hover:bg-white" />
            <CarouselNext className="right-3 border-white/75 bg-[#fbf7f1]/90 text-primary shadow-[0_8px_20px_rgba(74,58,44,0.15)] hover:bg-white" />
          </Carousel>

          <p
            aria-live="polite"
            className="mt-4 text-center font-spartan text-[0.72rem] uppercase tracking-[0.22em] text-primary/52"
          >
            {currentSlide + 1} / {invitationContent.galleryImages.length}
          </p>
        </div>
      </div>
    </section>
  );
}
