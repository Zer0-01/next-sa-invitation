"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { getDocs, orderBy, query } from "firebase/firestore";
import { motion, useReducedMotion } from "framer-motion";
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
      className="relative bg-[#efe7de] px-5 py-18 sm:px-7 sm:py-20 lg:px-10 lg:py-24"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto flex w-full max-w-2xl flex-col"
      >
        <div className="text-center">
          <div className="relative mx-auto aspect-square w-full max-w-[5.5rem] sm:max-w-[6rem]">
            <Image
              src="/images/message-image.png"
              alt="Sampul surat bunga untuk bahagian ucapan"
              fill
              sizes="96px"
              className="object-contain drop-shadow-[0_18px_34px_rgba(74,58,44,0.12)]"
            />
          </div>
          <h2 className="mt-4 font-serif text-[1.45rem] leading-[0.98] text-primary sm:text-[1.7rem]">
            Ucapan & Doa
          </h2>
        </div>

        <div className="mt-8 rounded-[1.6rem] border border-primary/10 bg-white/45 p-3 sm:mt-10 sm:p-4">
          <div
            ref={scrollerRef}
            className="max-h-[36rem] space-y-3 overflow-y-auto pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {status === "loading" || status === "initial" ? (
              <div className="flex min-h-[18rem] items-center justify-center text-[0.68rem] text-primary/56">
                Memuatkan ucapan...
              </div>
            ) : null}

            {status === "error" ? (
              <div className="flex min-h-[18rem] items-center justify-center text-center text-[0.68rem] leading-5 text-primary/56">
                Ucapan belum dapat dimuatkan buat masa ini.
              </div>
            ) : null}

            {status === "success" && visibleMessages.length === 0 ? (
              <div className="flex min-h-[18rem] items-center justify-center text-center text-[0.68rem] leading-5 text-primary/56">
                Belum ada ucapan lagi. Jadilah yang pertama meninggalkan doa.
              </div>
            ) : null}

            {status === "success"
              ? visibleMessages.map((entry, index) => {
                  const alignRight = index % 3 === 1;
                  const tone = bubbleTones[index % bubbleTones.length];
                  const author = entry.name?.trim() || "Tetamu";

                  return (
                    <motion.div
                      key={`${author}-${index}`}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.4, delay: index * 0.03 }}
                      className={`flex ${alignRight ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[88%] rounded-[1.5rem] px-4 py-3 text-left shadow-[0_14px_34px_rgba(58,44,27,0.06)] ${tone} ${
                          alignRight ? "rounded-br-md" : "rounded-bl-md"
                        }`}
                      >
                        <p className="text-[0.56rem] uppercase tracking-[0.22em] text-primary/50">
                          {author}
                        </p>
                        <p className="mt-2 text-[0.68rem] leading-5 text-primary/78">
                          {entry.message}
                        </p>
                      </div>
                    </motion.div>
                  );
                })
              : null}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
