"use client";

import Image from "next/image";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GiftDialogComponentProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const gifts = [
  {
    name: "Ain",
    bank: "CIMB",
    account: "7633771742",
    qr: "/qr-image.jpeg",
  },
  {
    name: "Danial",
    bank: "CIMB",
    account: "7627870603",
    qr: "/qr-image-danial.jpeg",
  },
];

const GiftDialogComponent = ({
  isOpen,
  onOpenChange,
}: GiftDialogComponentProps) => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const copyToClipboard = async (account: string) => {
    await navigator.clipboard.writeText(account);
    setCopiedAccount(account);

    window.setTimeout(() => {
      setCopiedAccount((current) => (current === account ? null : current));
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-md overflow-y-auto rounded-xl border-primary/10 bg-background p-4 sm:max-w-2xl sm:p-6">
        <DialogHeader className="pt-6 text-center">
          <DialogTitle className="font-serif text-2xl font-bold tracking-tight text-foreground">
            Hadiah
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2">
            {gifts.map((gift) => {
              const isCopied = copiedAccount === gift.account;

              return (
                <div
                  key={gift.account}
                  className="py-2"
                >
                  <div className="text-center">
                    <h3 className="font-serif text-[1.65rem] leading-none text-primary">
                      {gift.name}
                    </h3>
                    <p className="mt-3 text-[10px] font-medium tracking-[0.28em] text-muted-foreground uppercase">
                      {gift.bank}
                    </p>
                  </div>

                  <div className="pt-4">
                    <div className="relative mx-auto flex aspect-square w-full max-w-[210px] items-center justify-center">
                      <Image
                        src={gift.qr}
                        alt={`Kod QR ${gift.name}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="pt-5">
                    <div className="px-2 py-2">
                      <p className="text-center text-[10px] font-medium tracking-[0.24em] text-muted-foreground uppercase">
                        Nombor Akaun
                      </p>
                      <div className="mt-2 flex items-center justify-center gap-2">
                        <p className="font-mono text-sm tracking-[0.22em] text-foreground">
                          {gift.account}
                        </p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => copyToClipboard(gift.account)}
                          className="size-8 rounded-full text-primary hover:bg-sage/10 hover:text-primary"
                          title={isCopied ? "Disalin" : "Salin nombor akaun"}
                          aria-label={isCopied ? "Nombor akaun disalin" : `Salin nombor akaun ${gift.name}`}
                        >
                          {isCopied ? <Check size={16} /> : <Copy size={16} />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GiftDialogComponent;
