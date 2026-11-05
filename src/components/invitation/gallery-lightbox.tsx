"use client";

import Image from "next/image";
import { useEffect, useState, type KeyboardEvent } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { GalleryDots } from "@/components/invitation/gallery-dots";
import { useCarouselSelectedIndex } from "@/hooks/use-carousel-selected-index";
import { invitationContent } from "@/lib/invitation-content";

type GalleryLightboxProps = {
  open: boolean;
  startIndex: number;
  onOpenChange: (open: boolean) => void;
  onIndexChange: (index: number) => void;
};

/**
 * Full-screen photo viewer. It is portaled into the invitation frame so that
 * on desktop it covers only the phone frame, not the whole browser window.
 * Uses `fixed` on mobile (no frame) and `absolute` inside the frame on md+.
 */
export function GalleryLightbox({
  open,
  startIndex,
  onOpenChange,
  onIndexChange,
}: GalleryLightboxProps) {
  const [frameElement, setFrameElement] = useState<HTMLElement | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const selectedIndex = useCarouselSelectedIndex(carouselApi);
  const images = invitationContent.galleryImages;

  useEffect(() => {
    setFrameElement(
      document.querySelector<HTMLElement>("[data-invitation-frame='true']"),
    );
  }, []);

  useEffect(() => {
    if (carouselApi) {
      onIndexChange(selectedIndex);
    }
  }, [carouselApi, selectedIndex, onIndexChange]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      carouselApi?.scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      carouselApi?.scrollNext();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal container={frameElement}>
        <DialogOverlay className="fixed bg-[#1d1712]/95 md:absolute" />
        <DialogPrimitive.Content
          data-slot="dialog-content"
          onKeyDown={handleKeyDown}
          className="fixed inset-0 z-50 flex flex-col justify-center gap-6 text-white [container-type:size] duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 focus:outline-none md:absolute"
        >
          <DialogTitle className="sr-only">Kenangan Kami</DialogTitle>
          <DialogDescription className="sr-only">
            Leret ke kiri atau kanan untuk melihat gambar lain.
          </DialogDescription>

          <Carousel
            setApi={setCarouselApi}
            opts={{ loop: true, startIndex }}
            className="w-full"
          >
            <CarouselContent className="ml-0">
              {images.map((image) => (
                <CarouselItem key={image.src} className="px-4">
                  <div className="relative mx-auto aspect-[2/3] w-full max-w-[52cqh]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 768px) 400px, 100vw"
                      className="rounded-[1.1rem] object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <GalleryDots
            tone="light"
            count={images.length}
            activeIndex={selectedIndex}
            onSelect={(index) => carouselApi?.scrollTo(index)}
          />

          <DialogClose className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white/90 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
            <XIcon className="size-5" />
            <span className="sr-only">Tutup</span>
          </DialogClose>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
