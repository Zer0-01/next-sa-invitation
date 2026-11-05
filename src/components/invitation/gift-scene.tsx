"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { Gift, XIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { GiftDetails } from "@/components/invitation/gift-details";
import { GoldDiamond } from "@/components/invitation/gold-diamond";
import { PaintedDecoration } from "@/components/invitation/painted-decoration";
import { WaxSealShape } from "@/components/invitation/wax-seal-shape";
import { useIsMobile } from "@/hooks/use-mobile";

const GIFT_TITLE = "Maklumat Hadiah";
const GIFT_DESCRIPTION = "Pilih penerima, kemudian simpan atau imbas kod QR.";

/** Painted lily background, served through next/image so it loads compressed. */
function GiftBackground() {
  return (
    <>
      <Image
        src="/ustad/gift-dialog-background.png"
        alt=""
        fill
        sizes="(min-width: 768px) 384px, 100vw"
        className="-z-10 object-cover"
      />
      {/* Cream wash keeps the text clear where the painted lilies run behind it */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_75%_70%_at_50%_50%,rgba(248,244,238,0.92)_40%,rgba(248,244,238,0.5)_75%,rgba(248,244,238,0)_100%)]"
      />
    </>
  );
}

interface GiftSurfaceProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

/** Phones: a bottom sheet. Desktop: a centred window inside the phone frame. */
function GiftSurface({ open, onOpenChange, children }: GiftSurfaceProps) {
  const isMobile = useIsMobile();
  const [frameElement, setFrameElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setFrameElement(
      document.querySelector<HTMLElement>("[data-invitation-frame='true']"),
    );
  }, []);

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="isolate max-h-[88svh] overflow-hidden rounded-t-[1.75rem] border-primary/10 bg-[#f8f4ee]">
          <GiftBackground />
          <div className="overflow-y-auto px-5 pb-8 pt-3">
            <DrawerTitle className="text-center font-spartan text-[1.45rem] font-normal text-primary">
              {GIFT_TITLE}
            </DrawerTitle>
            <DrawerDescription className="mt-1.5 text-center font-spartan text-[0.95rem] leading-6 text-primary/62">
              {GIFT_DESCRIPTION}
            </DrawerDescription>
            <div className="mt-5">{children}</div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal container={frameElement}>
        <DialogOverlay className="absolute bg-[#1d1712]/45" />
        <DialogPrimitive.Content
          data-slot="dialog-content"
          className="absolute left-1/2 top-1/2 z-50 isolate flex max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-[24rem] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[1.75rem] border border-primary/10 bg-[#f8f4ee] shadow-[0_24px_60px_rgba(29,23,18,0.25)] duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 focus:outline-none"
        >
          <GiftBackground />
          <div className="overflow-y-auto px-6 py-6">
            <DialogTitle className="pr-7 text-center font-spartan text-[1.45rem] font-normal text-primary">
              {GIFT_TITLE}
            </DialogTitle>
            <DialogDescription className="mt-1.5 text-center font-spartan text-[0.95rem] leading-6 text-primary/62">
              {GIFT_DESCRIPTION}
            </DialogDescription>
            <div className="mt-5">{children}</div>
          </div>
          <DialogClose className="absolute right-4 top-4 rounded-full bg-white/75 p-1.5 text-primary/70 shadow-[0_2px_6px_rgba(58,44,27,0.08)] transition-colors hover:bg-white hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30">
            <XIcon className="size-4" />
            <span className="sr-only">Tutup</span>
          </DialogClose>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

export function GiftScene() {
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <section
      id="gift"
      aria-labelledby="gift-title"
      className="relative overflow-hidden bg-[#f2ebe1] px-5 py-24 sm:px-7 sm:py-28 lg:px-10 lg:py-32"
    >
      <PaintedDecoration
        src="/images/decorations/whimsical-garden-corner.png"
        sizes="(min-width: 768px) 360px, 88vw"
        parallaxDistance={28}
        floatDistance={5}
        floatDuration={8}
        className="-left-[30%] -top-20 z-0 aspect-square w-[88%] max-w-[24rem] sm:-left-[24%] sm:-top-24"
        imageClassName="object-left-top opacity-72"
      />
      <PaintedDecoration
        src="/images/decorations/whimsical-garden-corner.png"
        sizes="(min-width: 768px) 360px, 88vw"
        parallaxDistance={-34}
        floatDistance={6}
        floatDuration={9.5}
        className="-bottom-20 -right-[30%] z-0 aspect-square w-[88%] max-w-[24rem] sm:-bottom-24 sm:-right-[24%]"
        imageClassName="rotate-180 object-left-top opacity-72"
      />

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center text-center"
      >
        <p className="flex items-center justify-center gap-2 font-spartan text-[0.72rem] uppercase tracking-[0.28em] text-primary/55">
          <GoldDiamond />
          <span className="mr-[-0.28em]">Tanda kasih</span>
          <GoldDiamond />
        </p>
        <h2
          id="gift-title"
          className="mt-3 font-spartan text-[1.7rem] leading-[0.98] text-primary sm:text-[2rem]"
        >
          Kirim Hadiah
        </h2>

        {/* A sealed paper note: the wax seal sits on its top edge, like the envelope */}
        <div className="relative isolate mt-14 w-full rounded-[1.75rem] border border-white/80 bg-[#fbf7f0]/92 px-6 pb-8 pt-12 shadow-[0_18px_44px_rgba(74,58,44,0.1)]">
          <div
            aria-hidden="true"
            className="paper-grain pointer-events-none absolute inset-0 -z-10 rounded-[1.75rem] opacity-40 mix-blend-multiply"
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-0 size-16 -translate-x-1/2 -translate-y-1/2"
          >
            <WaxSealShape className="size-full" />
            <Gift
              className="absolute inset-0 m-auto size-6 text-[#fff3ec]/85"
              strokeWidth={1.5}
            />
          </span>

          <p className="font-spartan text-[1rem] leading-7 text-primary/68 sm:text-[1.05rem]">
            Kehadiran anda adalah hadiah paling bermakna. Jika ingin menitipkan
            tanda kasih, maklumatnya tersedia di sini.
          </p>

          <Button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-7 h-auto rounded-full px-6 py-3 font-spartan text-[0.88rem] uppercase tracking-[0.14em] transition-transform duration-200 active:scale-[0.97]"
          >
            Lihat maklumat hadiah
          </Button>
        </div>
      </motion.div>

      <GiftSurface open={open} onOpenChange={setOpen}>
        <GiftDetails />
      </GiftSurface>
    </section>
  );
}
