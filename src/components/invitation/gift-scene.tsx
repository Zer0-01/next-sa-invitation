"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { invitationContent } from "@/lib/invitation-content";

export function GiftScene() {
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  async function copyToClipboard(account: string) {
    await navigator.clipboard.writeText(account);
    setCopiedAccount(account);

    window.setTimeout(() => {
      setCopiedAccount((current) => (current === account ? null : current));
    }, 2000);
  }

  return (
    <section
      id="gift"
      className="relative bg-[#f2ebe1] px-5 py-18 sm:px-7 sm:py-20 lg:px-10 lg:py-24"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        <div className="relative aspect-square w-full max-w-[5.5rem] sm:max-w-[6rem]">
          <Image
            src="/images/gift-image.png"
            alt="Ilustrasi hadiah bunga"
            fill
            sizes="96px"
            className="object-contain drop-shadow-[0_22px_46px_rgba(88,68,55,0.14)]"
          />
        </div>

        <h2 className="mt-4 font-serif text-[1.35rem] leading-[0.98] text-primary sm:text-[1.55rem]">
          Kirim hadiah
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-[0.72rem] leading-5 text-primary/70 sm:text-[0.78rem]">
          Kehadiran anda adalah hadiah paling bermakna. Jika ingin menitipkan
          tanda kasih, maklumatnya tersedia di sini.
        </p>

        <div className="mt-10 sm:mt-12">
          <Button
            type="button"
            onClick={() => setOpen(true)}
            className="h-auto rounded-full px-6 py-3 text-[0.6rem] uppercase tracking-[0.18em]"
          >
            Kirim Hadiah
          </Button>
        </div>
      </motion.div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[calc(100svh-2rem)] w-[min(calc(100vw-2rem),22rem)] max-w-[22rem] overflow-y-auto rounded-[1.75rem] border-primary/10 bg-[#f8f4ee] px-4 py-6 sm:px-5">
          <DialogTitle className="sr-only">Maklumat hadiah</DialogTitle>
          <div className="grid grid-cols-1 gap-7">
            {invitationContent.gifts.map((gift) => {
              const isCopied = copiedAccount === gift.account;

              return (
                <div key={gift.account} className="text-center">
                  <p className="font-serif text-[1.1rem] leading-none text-primary">
                    {gift.name}
                  </p>
                  <p className="mt-2 text-[0.56rem] uppercase tracking-[0.22em] text-primary/52">
                    {gift.bank}
                  </p>

                  <div className="relative mx-auto mt-4 aspect-square w-full max-w-[200px] overflow-hidden rounded-[1.5rem] bg-white/80">
                    <Image
                      src={gift.qr}
                      alt={`Kod QR ${gift.name}`}
                      fill
                      sizes="220px"
                      className="object-contain"
                    />
                  </div>

                  <div className="mt-4 space-y-2">
                    <p className="text-[0.56rem] uppercase tracking-[0.22em] text-primary/52">
                      Nombor akaun
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <p className="font-mono text-[0.68rem] tracking-[0.2em] text-primary/78">
                        {gift.account}
                      </p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => copyToClipboard(gift.account)}
                        className="size-7 rounded-full text-primary hover:bg-primary/8"
                        aria-label={
                          isCopied
                            ? "Nombor akaun disalin"
                            : `Salin nombor akaun ${gift.name}`
                        }
                      >
                        {isCopied ? <Check /> : <Copy />}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
