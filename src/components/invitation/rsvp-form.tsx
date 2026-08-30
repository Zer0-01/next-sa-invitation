"use client";

import { useEffect, useMemo, useState } from "react";
import { addDoc, getDocs, orderBy, query, serverTimestamp, type DocumentData } from "firebase/firestore";
import { Loader2, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { attendanceCollection, messageCollection } from "@/lib/firebase";
import { cn } from "@/lib/utils";

type Status = "initial" | "loading" | "success" | "error";

interface FormErrors {
  name?: string;
  guests?: string;
}

export function RSVPForm() {
  const shouldReduceMotion = useReducedMotion();
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no">("yes");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const [status, setStatus] = useState<Status>("initial");

  useEffect(() => {
    void fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      setStatus("loading");
      const snapshot = await getDocs(query(messageCollection, orderBy("createdAt", "desc")));
      setMessages(snapshot.docs.map((doc) => doc.data()));
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  const guestCount = useMemo(() => Number(guests), [guests]);

  function validate() {
    const nextErrors: FormErrors = {};

    if (!name.trim()) {
      nextErrors.name = "Nama diperlukan.";
    }

    if (attendance === "yes" && (!Number.isInteger(guestCount) || guestCount < 1)) {
      nextErrors.guests = "Bilangan tetamu tidak sah.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const normalizedName = name.trim();
      const normalizedMessage = message.trim();

      await addDoc(attendanceCollection, {
        name: normalizedName,
        isAttend: attendance === "yes",
        pax: attendance === "yes" ? guestCount : 0,
        createdAt: serverTimestamp(),
      });

      if (normalizedMessage) {
        await addDoc(messageCollection, {
          name: normalizedName,
          message: normalizedMessage,
          createdAt: serverTimestamp(),
        });
      }

      toast.success("Terima kasih, RSVP anda telah diterima.");
      setName("");
      setAttendance("yes");
      setGuests("1");
      setMessage("");
      setErrors({});
      setIsSubmitted(true);
      await fetchMessages();
    } catch (error) {
      console.error(error);
      toast.error("Maaf, RSVP anda tidak dapat dihantar.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
      <Card className="border-white/35 bg-white/48 py-0 shadow-[0_24px_70px_rgba(58,44,27,0.14)] backdrop-blur-xl">
        <CardHeader className="gap-4 border-b border-primary/10 pb-6">
          <CardTitle className="font-serif text-4xl text-primary">RSVP</CardTitle>
          <CardDescription className="max-w-xl text-sm leading-7 text-primary/72">
            Kongsikan kehadiran anda, jumlah tetamu, dan titipan doa dalam satu
            borang yang ringkas dan mesra telefon.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 py-6 sm:px-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[0.68rem] uppercase tracking-[0.28em] text-primary/58">
                  Nama
                </label>
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Nama penuh anda"
                  className={cn(
                    "h-12 rounded-2xl border-primary/12 bg-white/70",
                    errors.name && "border-destructive"
                  )}
                />
                {errors.name ? (
                  <p className="text-sm text-destructive">{errors.name}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="text-[0.68rem] uppercase tracking-[0.28em] text-primary/58">
                  Kehadiran
                </label>
                <Select
                  value={attendance}
                  onValueChange={(value: "yes" | "no") => setAttendance(value)}
                >
                  <SelectTrigger className="h-12 rounded-2xl border-primary/12 bg-white/70">
                    <SelectValue placeholder="Sila pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Hadir dengan penuh kasih</SelectItem>
                    <SelectItem value="no">Tidak dapat hadir</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[0.68rem] uppercase tracking-[0.28em] text-primary/58">
                  Bilangan tetamu
                </label>
                <Select value={guests} onValueChange={setGuests} disabled={attendance === "no"}>
                  <SelectTrigger className="h-12 rounded-2xl border-primary/12 bg-white/70">
                    <SelectValue placeholder="Pilih jumlah tetamu" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => (
                      <SelectItem key={value} value={String(value)}>
                        {value} {value === 1 ? "tetamu" : "tetamu"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.guests ? (
                  <p className="text-sm text-destructive">{errors.guests}</p>
                ) : null}
              </div>

              <div className="rounded-[1.6rem] border border-primary/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.44)_0%,rgba(243,236,227,0.9)_100%)] px-5 py-4">
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-primary/58">
                  Nota ringkas
                </p>
                <p className="mt-2 text-sm leading-6 text-primary/72">
                  Jika anda tidak dapat hadir, anda masih boleh meninggalkan doa
                  dan ucapan pada ruang di bawah.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[0.68rem] uppercase tracking-[0.28em] text-primary/58">
                Ucapan dan doa
              </label>
              <Textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Semoga majlis ini diberkati dan dipenuhi kebahagiaan..."
                rows={5}
                className="rounded-[1.5rem] border-primary/12 bg-white/70"
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-auto rounded-full px-7 py-3 text-sm uppercase tracking-[0.2em]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menghantar
                  </>
                ) : (
                  "Hantar RSVP"
                )}
              </Button>

              {isSubmitted ? (
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-4 py-2 text-sm text-primary"
                >
                  <Sparkles className="h-4 w-4" />
                  Terima kasih atas maklum balas anda.
                </motion.div>
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-white/35 bg-white/42 py-0 shadow-[0_24px_70px_rgba(58,44,27,0.14)] backdrop-blur-xl">
        <CardHeader className="gap-4 border-b border-primary/10 pb-6">
          <CardTitle className="font-serif text-4xl text-primary">
            Pesanan & Doa
          </CardTitle>
          <CardDescription className="text-sm leading-7 text-primary/72">
            Titipan penuh kasih daripada keluarga dan sahabat tersayang.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 py-6 sm:px-8">
          {status === "loading" || status === "initial" ? (
            <div className="flex h-[20rem] items-center justify-center text-sm text-primary/58">
              Memuatkan ucapan...
            </div>
          ) : null}

          {status === "error" ? (
            <div className="flex h-[20rem] items-center justify-center text-sm text-destructive">
              Ucapan tidak dapat dimuatkan buat masa ini.
            </div>
          ) : null}

          {status === "success" ? (
            messages.length > 0 ? (
              <div className="max-h-[32rem] space-y-4 overflow-y-auto pr-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {messages.map((entry, index) => (
                  <motion.div
                    key={`${String(entry.name)}-${index}`}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.45, delay: index * 0.03 }}
                    className="rounded-[1.6rem] border border-primary/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.58)_0%,rgba(246,239,231,0.92)_100%)] p-5 shadow-[0_14px_30px_rgba(58,44,27,0.06)]"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-serif text-2xl text-primary">{String(entry.name ?? "Tetamu")}</p>
                      <span className="text-[0.64rem] uppercase tracking-[0.24em] text-primary/48">
                        Guestbook
                      </span>
                    </div>
                    <Separator className="my-4 bg-primary/10" />
                    <p className="text-sm leading-7 text-primary/74">
                      {String(entry.message ?? "")}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex h-[20rem] items-center justify-center text-center text-sm leading-7 text-primary/58">
                Belum ada titipan ucapan. Jadilah tetamu pertama yang meninggalkan doa.
              </div>
            )
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
