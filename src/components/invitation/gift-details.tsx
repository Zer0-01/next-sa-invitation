"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { invitationContent, type GiftRecipient } from "@/lib/invitation-content";
import { cn } from "@/lib/utils";

type CopyState = "success" | "error";

// How long "Disalin" stays before the copy button returns to normal.
const COPY_FEEDBACK_MS = 2500;

const recipients: readonly GiftRecipient[] = invitationContent.gifts;

const eyebrowClassName =
  "font-spartan text-[0.74rem] uppercase tracking-[0.18em] text-primary/52";

/** "7633771742" → "7633 7717 42". Display only; the raw digits are copied. */
function formatAccountNumber(account: string) {
  return account.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function getQrFileName(recipient: GiftRecipient) {
  return `kod-qr-${recipient.name.toLowerCase()}.png`;
}

export function GiftDetails() {
  const [selectedName, setSelectedName] = useState(recipients[0].name);
  const [copyState, setCopyState] = useState<CopyState | null>(null);

  useEffect(() => {
    if (!copyState) {
      return;
    }

    const timer = window.setTimeout(() => setCopyState(null), COPY_FEEDBACK_MS);

    return () => window.clearTimeout(timer);
  }, [copyState]);

  async function copyAccount(account: string) {
    try {
      await navigator.clipboard.writeText(account);
      setCopyState("success");
    } catch (error) {
      console.error(error);
      setCopyState("error");
    }
  }

  return (
    <Tabs
      value={selectedName}
      onValueChange={(value) => {
        setSelectedName(value);
        setCopyState(null);
      }}
      className="gap-5"
    >
      <TabsList className="grid h-11 w-full grid-cols-2 rounded-full bg-primary/8 p-1">
        {recipients.map((recipient) => (
          <TabsTrigger
            key={recipient.name}
            value={recipient.name}
            className="h-full rounded-full font-spartan text-[0.92rem] data-[state=active]:bg-white/90 data-[state=active]:text-primary"
          >
            {recipient.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {recipients.map((recipient) => {
        const statusId = `gift-copy-status-${recipient.name.toLowerCase()}`;

        return (
          <TabsContent key={recipient.name} value={recipient.name} className="text-center">
            <p className={eyebrowClassName}>{recipient.bank}</p>
            <p className="mt-1.5 font-spartan text-[1.02rem] leading-6 text-primary/82">
              {recipient.holderName}
            </p>

            <div className="relative mx-auto mt-5 aspect-square w-full max-w-[210px] overflow-hidden rounded-[1.4rem] border-[6px] border-white bg-white shadow-[0_12px_30px_rgba(58,44,27,0.08)]">
              <Image
                src={recipient.qr}
                alt={`Kod QR DuitNow untuk ${recipient.holderName}`}
                fill
                sizes="210px"
                // Never re-encode the code: serve the verified file as-is.
                unoptimized
                className="object-contain"
              />
            </div>

            <Button
              asChild
              variant="outline"
              className="mt-4 h-auto rounded-full border-primary/15 bg-white/72 px-5 py-2.5 font-spartan text-[0.8rem] uppercase tracking-[0.12em] text-primary shadow-none hover:bg-white"
            >
              <a href={recipient.qr} download={getQrFileName(recipient)}>
                <Download />
                Simpan kod QR
              </a>
            </Button>
            <p className="mx-auto mt-2 max-w-[16rem] font-spartan text-[0.8rem] leading-5 text-primary/55">
              Simpan, kemudian muat naik dalam aplikasi bank anda untuk imbas DuitNow QR.
            </p>

            {recipient.account ? (
              <div className="mt-6 space-y-2.5">
                <p className={eyebrowClassName}>Nombor akaun</p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => void copyAccount(recipient.account ?? "")}
                  className="h-auto w-full justify-between rounded-[1.15rem] border-primary/12 bg-white/72 px-4 py-3.5 font-spartan shadow-none hover:bg-white"
                  aria-describedby={statusId}
                >
                  <span className="text-[1.02rem] tracking-[0.1em] text-primary/82 tabular-nums">
                    {formatAccountNumber(recipient.account)}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[0.76rem] text-primary/58">
                    {copyState === "success" ? <Check /> : <Copy />}
                    {copyState === "success" ? "Disalin" : "Salin"}
                  </span>
                </Button>
                <p
                  id={statusId}
                  aria-live="polite"
                  className={cn(
                    "min-h-5 font-spartan text-[0.82rem] leading-5",
                    copyState === "error" ? "text-destructive" : "text-primary/55",
                  )}
                >
                  {copyState === "success"
                    ? `Nombor akaun ${recipient.name} berjaya disalin.`
                    : copyState === "error"
                      ? "Tidak dapat disalin. Sila salin secara manual."
                      : ""}
                </p>
              </div>
            ) : null}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
