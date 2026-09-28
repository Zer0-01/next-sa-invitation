"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getDocs, orderBy, query } from "firebase/firestore";
import { RefreshCw } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { messageCollection } from "@/lib/firebase";

type Status = "initial" | "loading" | "success" | "error";

interface MessageEntry {
  name?: string;
  message?: string;
}

const bubbleTones = [
  "bg-[#f3ece4]",
  "bg-[#efe7dd]",
  "bg-[#ebe4d8]",
  "bg-[#f5eee6]",
];

export function MessagesScene() {
  const shouldReduceMotion = useReducedMotion();
  const [messages, setMessages] = useState<MessageEntry[]>([]);
  const [status, setStatus] = useState<Status>("initial");
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    void fetchMessages();
  }, []);

  useEffect(() => {
    const handleRefresh = () => {
      void fetchMessages();
    };

    window.addEventListener("invitation:messages-updated", handleRefresh);

    return () => {
      window.removeEventListener("invitation:messages-updated", handleRefresh);
    };
  }, []);

  useEffect(() => {
    if (status !== "success" || !scrollerRef.current) {
      return;
    }

    scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
  }, [status, messages]);

  async function fetchMessages() {
    try {
      setStatus("loading");
      const snapshot = await getDocs(query(messageCollection, orderBy("createdAt", "asc")));
      setMessages(
        snapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            name: typeof data.name === "string" ? data.name : "Tetamu",
            message: typeof data.message === "string" ? data.message : "",
          };
        })
      );
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  const visibleMessages = useMemo(
    () => messages.filter((entry) => entry.message?.trim()),
    [messages]
  );

  return (
    <section
      id="messages"
      aria-labelledby="messages-title"
      className="relative overflow-hidden bg-[#efe7de] px-5 py-18 sm:px-7 sm:py-20 lg:px-10 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none bg-center bg-repeat opacity-25 [background-image:url('/gif/falling_leaves_transparent.gif')] [background-size:360px_360px] sm:[background-size:420px_420px]"
      />
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

            {status === "success" && visibleMessages.length === 0 ? (
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

            {status === "success" && visibleMessages.length > 0 ? (
              <ol className="relative z-10 space-y-3" aria-label="Senarai ucapan tetamu">
                {visibleMessages.map((entry, index) => {
                  const alignRight = index % 3 === 1;
                  const tone = bubbleTones[index % bubbleTones.length];
                  const author = entry.name?.trim() || "Tetamu";

                  return (
                    <motion.li
                      key={`${author}-${index}`}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.4, delay: Math.min(index, 5) * 0.03 }}
                      className={`flex ${alignRight ? "justify-end" : "justify-start"}`}
                    >
                      <article
                        className={`max-w-[88%] rounded-[1.5rem] border border-white/55 px-4 py-3 text-left shadow-[0_12px_28px_rgba(58,44,27,0.055)] ${tone} ${
                          alignRight ? "rounded-br-md" : "rounded-bl-md"
                        }`}
                      >
                        <p className="font-spartan text-[0.82rem] uppercase tracking-[0.16em] text-primary/55">
                          {author}
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
