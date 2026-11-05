"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getDocs, orderBy, query } from "firebase/firestore";
import { RefreshCw } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PetalDrift } from "@/components/invitation/petal-drift";
import { useInvitationScrollContainer } from "@/hooks/use-invitation-scroll-container";
import { messageCollection } from "@/lib/firebase";
import {
  MESSAGES_UPDATED_EVENT,
  type MessagesUpdatedDetail,
} from "@/lib/guestbook-events";
import { cn } from "@/lib/utils";

type Status = "initial" | "loading" | "success" | "error";

interface MessageEntry {
  id: string;
  name: string;
  message: string;
}

const bubbleTones = [
  "bg-[#f3ece4]",
  "bg-[#efe7dd]",
  "bg-[#ebe4d8]",
  "bg-[#f5eee6]",
];

// Start fetching a little before the section scrolls into view.
const PREFETCH_MARGIN = "0px 0px 600px 0px";
// How long the guest's own new message keeps its gold glow.
const HIGHLIGHT_MS = 6000;

export function MessagesScene() {
  const shouldReduceMotion = useReducedMotion();
  const [messages, setMessages] = useState<MessageEntry[]>([]);
  const [status, setStatus] = useState<Status>("initial");
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [hasRequestedLoad, setHasRequestedLoad] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const previousCountRef = useRef(0);
  const hasRequestedLoadRef = useRef(false);
  hasRequestedLoadRef.current = hasRequestedLoad;
  const { scrollContainer } = useInvitationScrollContainer();
  scrollContainerRef.current = scrollContainer;

  const isNearView = useInView(sectionRef, {
    once: true,
    margin: PREFETCH_MARGIN,
    root: scrollContainer ? scrollContainerRef : undefined,
  });

  const fetchMessages = useCallback(async () => {
    // Only show placeholders on the first load; a refresh keeps the list in place.
    setStatus((current) => (current === "success" ? current : "loading"));

    try {
      const snapshot = await getDocs(query(messageCollection, orderBy("createdAt", "asc")));
      setMessages(
        snapshot.docs
          .map((doc) => {
            const data = doc.data();

            return {
              id: doc.id,
              name: typeof data.name === "string" && data.name.trim() ? data.name.trim() : "Tetamu",
              message: typeof data.message === "string" ? data.message.trim() : "",
            };
          })
          .filter((entry) => entry.message),
      );
      setStatus("success");
    } catch (error) {
      console.error(error);
      // Keep showing what we already have if a refresh fails.
      setStatus((current) => (current === "success" ? current : "error"));
    }
  }, []);

  useEffect(() => {
    if (isNearView) {
      setHasRequestedLoad(true);
    }
  }, [isNearView]);

  useEffect(() => {
    if (hasRequestedLoad) {
      void fetchMessages();
    }
  }, [hasRequestedLoad, fetchMessages]);

  useEffect(() => {
    const handleRefresh = (event: Event) => {
      const { messageId } = (event as CustomEvent<MessagesUpdatedDetail>).detail ?? {};

      if (messageId) {
        setHighlightedId(messageId);
      }

      // Refresh if already loaded; otherwise this starts the first load.
      if (hasRequestedLoadRef.current) {
        void fetchMessages();
      } else {
        setHasRequestedLoad(true);
      }
    };

    window.addEventListener(MESSAGES_UPDATED_EVENT, handleRefresh);

    return () => {
      window.removeEventListener(MESSAGES_UPDATED_EVENT, handleRefresh);
    };
  }, [fetchMessages]);

  useEffect(() => {
    if (!highlightedId) {
      return;
    }

    const timer = window.setTimeout(() => setHighlightedId(null), HIGHLIGHT_MS);

    return () => window.clearTimeout(timer);
  }, [highlightedId]);

  // Newest messages sit at the bottom: jump there on first load and whenever
  // a new message arrives, but leave the guest's position alone otherwise.
  useEffect(() => {
    const scroller = scrollerRef.current;

    if (status !== "success" || !scroller) {
      return;
    }

    if (messages.length > previousCountRef.current) {
      scroller.scrollTop = scroller.scrollHeight;
    }

    previousCountRef.current = messages.length;
  }, [status, messages]);

  return (
    <section
      ref={sectionRef}
      id="messages"
      aria-labelledby="messages-title"
      className="relative overflow-hidden bg-[#efe7de] px-5 py-18 sm:px-7 sm:py-20 lg:px-10 lg:py-24"
    >
      <PetalDrift className="z-0" />
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto flex w-full max-w-2xl flex-col"
      >
        <div className="mx-auto max-w-xl text-center">
          <p className="font-spartan text-[0.72rem] uppercase tracking-[0.28em] text-primary/55">
            Titipan penuh kasih
          </p>
          <h2
            id="messages-title"
            className="mt-3 font-spartan text-[1.7rem] leading-[0.98] text-primary sm:text-[2rem]"
          >
            Ucapan & Doa
          </h2>
          <p className="mt-4 font-spartan text-[1rem] leading-7 text-primary/68 sm:text-[1.05rem]">
            Doa dan ucapan istimewa daripada keluarga serta sahabat tersayang.
          </p>
        </div>

        <div className="mt-10 sm:mt-12">
          <div
            ref={scrollerRef}
            className="relative max-h-[36rem] overflow-y-auto rounded-[1.6rem] border border-white/60 bg-[#eef0e3] bg-[url('/images/bg-15.png')] bg-cover bg-center bg-no-repeat bg-blend-soft-light p-4 pr-3 shadow-[0_18px_46px_rgba(58,44,27,0.08)] [scrollbar-color:rgba(77,72,53,0.28)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/20 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5"
          >
            {status === "loading" || status === "initial" ? (
              <div
                role="status"
                aria-label="Memuatkan ucapan"
                className="relative z-10 min-h-[18rem] space-y-3"
              >
                <span className="sr-only">Memuatkan ucapan...</span>
                {Array.from({ length: 3 }, (_, index) => (
                  <div
                    key={index}
                    aria-hidden="true"
                    className={`flex ${index % 2 === 1 ? "justify-end" : "justify-start"}`}
                  >
                    <div className="w-[82%] rounded-[1.5rem] border border-white/55 bg-white/48 p-4">
                      <Skeleton className="h-3 w-28 bg-primary/10" />
                      <Skeleton className="mt-4 h-3 w-full bg-primary/10" />
                      <Skeleton className="mt-2 h-3 w-4/5 bg-primary/10" />
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {status === "error" ? (
              <div
                role="alert"
                className="relative z-10 flex min-h-[18rem] flex-col items-center justify-center gap-5 px-4 text-center"
              >
                <p className="font-spartan text-[1rem] leading-7 text-primary/60">
                  Ucapan belum dapat dimuatkan buat masa ini.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => void fetchMessages()}
                  className="rounded-full border-primary/15 bg-white/65 px-5 font-spartan"
                >
                  <RefreshCw />
                  Cuba lagi
                </Button>
              </div>
            ) : null}

            {status === "success" && messages.length === 0 ? (
              <div className="relative z-10 flex min-h-[18rem] flex-col items-center justify-center gap-5 px-4 text-center">
                <p className="font-spartan text-[1rem] leading-7 text-primary/60">
                  Belum ada ucapan lagi. Jadilah yang pertama meninggalkan doa.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-primary/15 bg-white/65 px-5 font-spartan"
                >
                  <a href="#rsvp-message">Tinggalkan ucapan</a>
                </Button>
              </div>
            ) : null}

            {status === "success" && messages.length > 0 ? (
              <ol className="relative z-10 space-y-3" aria-label="Senarai ucapan tetamu">
                {messages.map((entry, index) => {
                  const alignRight = index % 3 === 1;
                  const tone = bubbleTones[index % bubbleTones.length];
                  const isHighlighted = entry.id === highlightedId;

                  return (
                    <motion.li
                      key={entry.id}
                      data-message-id={entry.id}
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4, root: scrollerRef }}
                      transition={{
                        duration: shouldReduceMotion ? 0.3 : 0.5,
                        ease: "easeOut",
                        // Notes that arrive together appear one after another.
                        delay: (index % 4) * 0.08,
                      }}
                      className={cn("flex", alignRight ? "justify-end" : "justify-start")}
                    >
                      <article
                        className={cn(
                          "max-w-[88%] rounded-[1.5rem] border px-4 py-3 text-left transition-[box-shadow,border-color] duration-1000 ease-out",
                          tone,
                          alignRight ? "rounded-br-md" : "rounded-bl-md",
                          isHighlighted
                            ? "border-gold/60 shadow-[0_0_0_4px_rgba(201,168,115,0.16),0_12px_28px_rgba(201,168,115,0.24)]"
                            : "border-white/55 shadow-[0_12px_28px_rgba(58,44,27,0.055)]",
                        )}
                      >
                        <p className="flex items-center gap-2 font-spartan text-[0.82rem] uppercase tracking-[0.16em] text-primary/55">
                          {entry.name}
                          {isHighlighted ? (
                            <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[0.66rem] tracking-[0.12em] text-primary/70">
                              Ucapan anda
                            </span>
                          ) : null}
                        </p>
                        <p className="mt-2 font-spartan text-[1rem] leading-7 text-primary/78">
                          {entry.message}
                        </p>
                      </article>
                    </motion.li>
                  );
                })}
              </ol>
            ) : null}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
