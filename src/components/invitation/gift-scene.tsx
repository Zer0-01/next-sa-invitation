"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { PaintedDecoration } from "@/components/invitation/painted-decoration";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { invitationContent } from "@/lib/invitation-content";

type CopyStatus = {
  account: string;
  state: "success" | "error";
} | null;

const defaultGiftAccount = invitationContent.gifts[0].account;

export function GiftScene() {
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [selectedGiftAccount, setSelectedGiftAccount] = useState(defaultGiftAccount);
  const [copyStatus, setCopyStatus] = useState<CopyStatus>(null);

  async function copyToClipboard(account: string) {
    try {
      await navigator.clipboard.writeText(account);
      setCopyStatus({ account, state: "success" });
    } catch (error) {
      console.error(error);
      setCopyStatus({ account, state: "error" });
    }
  }

  function handleDialogOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (!nextOpen) {
      setSelectedGiftAccount(defaultGiftAccount);
      setCopyStatus(null);
    }
  }

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
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        <p className="font-spartan text-[0.72rem] uppercase tracking-[0.28em] text-primary/55">
          Tanda kasih
        </p>
        <h2
          id="gift-title"
          className="mt-3 font-spartan text-[1.7rem] leading-[0.98] text-primary sm:text-[2rem]"
        >
          Kirim Hadiah
        </h2>
        <p className="mx-auto mt-4 max-w-lg font-spartan text-[1rem] leading-7 text-primary/68 sm:text-[1.05rem]">
          Kehadiran anda adalah hadiah paling bermakna. Jika ingin menitipkan
          tanda kasih, maklumatnya tersedia di sini.
        </p>

        <div className="mt-10 sm:mt-12">
          <Button
            type="button"
            onClick={() => setOpen(true)}
            className="h-auto rounded-full px-6 py-3 font-spartan text-[0.88rem] uppercase tracking-[0.14em]"
          >
            Kirim Hadiah
          </Button>
        </div>
      </motion.div>

      <Dialog open={open} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="max-h-[calc(100svh-2rem)] w-[min(calc(100vw-2rem),24rem)] max-w-[24rem] overflow-y-auto rounded-[1.75rem] border-primary/10 bg-[#f8f4ee] bg-[url('/images/bg-18.png')] bg-cover bg-center bg-no-repeat px-4 py-6 sm:px-6">
          <DialogHeader className="pr-7 text-center sm:text-center">
            <DialogTitle className="font-spartan text-[1.45rem] font-normal text-primary">
              Maklumat Hadiah
            </DialogTitle>
            <DialogDescription className="font-spartan text-[0.95rem] leading-6 text-primary/62">
              Pilih penerima, kemudian imbas kod QR atau salin nombor akaun.
            </DialogDescription>
          </DialogHeader>

          <Tabs
            value={selectedGiftAccount}
            onValueChange={(value) => {
              setSelectedGiftAccount(value);
              setCopyStatus(null);
            }}
            className="mt-2 gap-5"
          >
            <TabsList className="grid h-11 w-full grid-cols-2 rounded-full bg-primary/8 p-1">
              {invitationContent.gifts.map((gift) => (
                <TabsTrigger
                  key={gift.account}
                  value={gift.account}
                  className="h-full rounded-full font-spartan text-[0.92rem] data-[state=active]:bg-white/90 data-[state=active]:text-primary"
                >
                  {gift.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {invitationContent.gifts.map((gift) => {
              const giftCopyStatus =
                copyStatus?.account === gift.account ? copyStatus.state : null;

              return (
                <TabsContent key={gift.account} value={gift.account} className="text-center">
                  <p className="font-spartan text-[0.78rem] uppercase tracking-[0.18em] text-primary/52">
                    {gift.bank}
                  </p>

                  <p className="mt-4 font-spartan text-[0.78rem] uppercase tracking-[0.18em] text-primary/52">
                    Imbas untuk pindahan
                  </p>
                  <div className="relative mx-auto mt-3 aspect-square w-full max-w-[210px] overflow-hidden rounded-[1.4rem] border-[6px] border-white/90 bg-white shadow-[0_12px_30px_rgba(58,44,27,0.08)]">
                    <Image
                      src={gift.qr}
                      alt={`Kod QR pindahan untuk ${gift.name}`}
                      fill
                      sizes="210px"
                      className="object-contain"
                    />
                  </div>

                  <div className="mt-5 space-y-3">
                    <p className="font-spartan text-[0.78rem] uppercase tracking-[0.18em] text-primary/52">
                      Nombor akaun
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => void copyToClipboard(gift.account)}
                      className="h-auto w-full justify-between rounded-[1.15rem] border-primary/12 bg-white/72 px-4 py-3.5 font-spartan hover:bg-white"
                      aria-describedby={`copy-status-${gift.account}`}
                    >
                      <span className="text-[1rem] tracking-[0.12em] text-primary/82">
                        {gift.account}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[0.76rem] text-primary/58">
                        {giftCopyStatus === "success" ? <Check /> : <Copy />}
                        {giftCopyStatus === "success"
                          ? "Disalin"
                          : giftCopyStatus === "error"
                            ? "Cuba lagi"
                            : "Salin nombor akaun"}
                      </span>
                    </Button>
                    <p
                      id={`copy-status-${gift.account}`}
                      aria-live="polite"
                      className={`min-h-5 font-spartan text-[0.82rem] leading-5 ${
                        giftCopyStatus === "error" ? "text-destructive" : "text-primary/58"
                      }`}
                    >
                      {giftCopyStatus === "success"
                        ? `Nombor akaun ${gift.name} berjaya disalin.`
                        : giftCopyStatus === "error"
                          ? "Tidak dapat disalin. Sila salin secara manual."
                          : "Tekan untuk menyalin nombor akaun."}
                    </p>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </DialogContent>
      </Dialog>
    </section>
  );
}
