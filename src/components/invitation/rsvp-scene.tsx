"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { doc, serverTimestamp, writeBatch } from "firebase/firestore";
import { CalendarHeart, Check, HandHeart, Loader2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { GoldDiamond } from "@/components/invitation/gold-diamond";
import { PaintedDecoration } from "@/components/invitation/painted-decoration";
import { PaxStepper } from "@/components/invitation/pax-stepper";
import { RsvpThankYou } from "@/components/invitation/rsvp-thank-you";
import { useRsvpRecord } from "@/hooks/use-rsvp-record";
import { attendanceCollection, db, messageCollection } from "@/lib/firebase";
import { notifyMessagesUpdated } from "@/lib/guestbook-events";
import { invitationContent } from "@/lib/invitation-content";
import { cn } from "@/lib/utils";

type AttendanceOption = "hadir" | "tidak-hadir";
type SubmitStatus = "idle" | "submitting" | "success";

interface FormErrors {
  name?: string;
  attendance?: string;
  message?: string;
}

const NAME_MAX_LENGTH = 80;
const MESSAGE_MAX_LENGTH = 300;
const MESSAGE_WARN_LENGTH = 270;
const PAX_MIN = 1;
const PAX_MAX = 10;
// Long enough for the button's check to register before the thank-you appears.
const SUCCESS_HOLD_MS = 700;
// Let the guest read the thank-you before gliding down to their message.
const SCROLL_TO_MESSAGES_DELAY_MS = 1600;

const labelClassName =
  "font-spartan text-[0.88rem] uppercase tracking-[0.16em] text-primary/58";
const errorClassName = "font-spartan text-[0.96rem] text-destructive";
const fieldClassName =
  "border-primary/12 bg-white/88 font-spartan text-[1rem] text-primary placeholder:text-primary/35";

const attendanceOptions = [
  { value: "hadir", label: "Insya-Allah, saya hadir", Icon: CalendarHeart },
  { value: "tidak-hadir", label: "Maaf, tidak dapat hadir", Icon: HandHeart },
] as const;

export function RSVPScene() {
  const shouldReduceMotion = useReducedMotion();
  const { record, saveRecord, clearRecord } = useRsvpRecord();
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<AttendanceOption | "">("");
  const [pax, setPax] = useState(PAX_MIN);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const timersRef = useRef<number[]>([]);

  const ids = {
    name: useId(),
    nameError: useId(),
    attendanceLabel: useId(),
    attendanceError: useId(),
    paxLabel: useId(),
    pax: useId(),
    absentNote: useId(),
    // Fixed id: the guestbook's "Tinggalkan ucapan" link jumps here.
    message: "rsvp-message",
    messageCount: useId(),
    messageError: useId(),
  };
  const nameRef = useRef<HTMLInputElement>(null);
  const attendanceRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const timers = timersRef.current;

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  function schedule(callback: () => void, delay: number) {
    timersRef.current.push(window.setTimeout(callback, delay));
  }

  function validate() {
    const nextErrors: FormErrors = {};
    const trimmedName = name.trim();

    if (!trimmedName) {
      nextErrors.name = "Nama diperlukan.";
    } else if (trimmedName.length > NAME_MAX_LENGTH) {
      nextErrors.name = `Nama tidak boleh melebihi ${NAME_MAX_LENGTH} aksara.`;
    }

    if (!attendance) {
      nextErrors.attendance = "Sila pilih status kehadiran anda.";
    }

    if (message.trim().length > MESSAGE_MAX_LENGTH) {
      nextErrors.message = `Ucapan tidak boleh melebihi ${MESSAGE_MAX_LENGTH} aksara.`;
    }

    setErrors(nextErrors);

    // Take the guest straight to the first field that needs attention.
    if (nextErrors.name) {
      nameRef.current?.focus();
    } else if (nextErrors.attendance) {
      attendanceRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    } else if (nextErrors.message) {
      messageRef.current?.focus();
    }

    return Object.keys(nextErrors).length === 0;
  }

  function resetForm() {
    setName("");
    setAttendance("");
    setPax(PAX_MIN);
    setMessage("");
    setErrors({});
    setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status !== "idle" || !validate()) {
      return;
    }

    setStatus("submitting");

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    const isAttend = attendance === "hadir";
    const confirmedPax = isAttend ? pax : 0;

    // Created up front so the guestbook can highlight this exact message.
    const messageRef = trimmedMessage ? doc(messageCollection) : null;

    try {
      // One atomic write: either the RSVP and its message both save, or
      // neither does, so a retry after a failure never double-counts a guest.
      const batch = writeBatch(db);

      batch.set(doc(attendanceCollection), {
        name: trimmedName,
        isAttend,
        pax: confirmedPax,
        createdAt: serverTimestamp(),
      });

      if (messageRef) {
        batch.set(messageRef, {
          name: trimmedName,
          message: trimmedMessage,
          createdAt: serverTimestamp(),
        });
      }

      await batch.commit();
    } catch (error) {
      console.error(error);
      toast.error("RSVP tidak dapat dihantar. Sila cuba lagi.");
      setStatus("idle");
      return;
    }

    notifyMessagesUpdated({ messageId: messageRef?.id });
    setStatus("success");

    schedule(() => {
      saveRecord({
        name: trimmedName,
        isAttend,
        pax: confirmedPax,
        submittedAt: new Date().toISOString(),
      });
      resetForm();

      if (trimmedMessage) {
        schedule(() => {
          document.getElementById("messages")?.scrollIntoView({
            behavior: shouldReduceMotion ? "auto" : "smooth",
            block: "start",
          });
        }, SCROLL_TO_MESSAGES_DELAY_MS);
      }
    }, SUCCESS_HOLD_MS);
  }

  const messageLength = message.length;
  const isMessageNearLimit = messageLength >= MESSAGE_WARN_LENGTH;

  return (
    <section
      id="rsvp"
      aria-labelledby="rsvp-title"
      className="relative overflow-hidden bg-[#f7f0e7] px-5 py-18 sm:px-7 sm:py-20 lg:px-10 lg:py-24"
    >
      <PaintedDecoration
        src="/images/decorations/painted-wildflower-edge.png"
        sizes="(min-width: 1024px) 420px, (min-width: 640px) 340px, 240px"
        parallaxDistance={42}
        className="-left-16 top-12 z-0 aspect-[2/3] w-60 sm:-left-24 sm:top-14 sm:w-[21rem] lg:-left-28 lg:top-16 lg:w-[26rem]"
        imageClassName="scale-x-[-1] opacity-65"
      />
      <PaintedDecoration
        src="/images/decorations/painted-wildflower-edge.png"
        sizes="(min-width: 1024px) 420px, (min-width: 640px) 340px, 240px"
        parallaxDistance={42}
        className="-right-16 bottom-8 z-0 aspect-[2/3] w-60 sm:-right-24 sm:bottom-10 sm:w-[21rem] lg:-right-28 lg:bottom-12 lg:w-[26rem]"
        imageClassName="opacity-65"
      />

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto w-full max-w-xl"
      >
        <div className="mx-auto max-w-lg text-center">
          <p className="flex items-center justify-center gap-2 font-spartan text-[0.72rem] uppercase tracking-[0.28em] text-primary/55">
            <GoldDiamond />
            <span className="mr-[-0.28em]">Sahkan kehadiran</span>
            <GoldDiamond />
          </p>
          <h2
            id="rsvp-title"
            className="mt-3 font-spartan text-[1.7rem] leading-[0.98] text-primary sm:text-[2rem]"
          >
            RSVP
          </h2>
          <p className="mt-4 font-spartan text-[1rem] leading-7 text-primary/68 sm:text-[1.05rem]">
            Mohon sahkan kehadiran anda sebelum {invitationContent.event.rsvpDeadline}.
          </p>
        </div>

        {/* Paper card, sharing the hero's grain so the sections feel like one stationery set */}
        <div className="relative isolate mt-10 overflow-hidden rounded-[1.75rem] border border-white/80 bg-[#fbf7f0]/92 px-5 py-7 shadow-[0_18px_44px_rgba(74,58,44,0.1)] sm:mt-12 sm:px-7 sm:py-8">
          <div
            aria-hidden="true"
            className="paper-grain pointer-events-none absolute inset-0 -z-10 opacity-40 mix-blend-multiply"
          />

          {record ? (
            <RsvpThankYou record={record} onSendAgain={clearRecord} />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="space-y-2">
                <label htmlFor={ids.name} className={labelClassName}>
                  Nama
                </label>
                <Input
                  ref={nameRef}
                  id={ids.name}
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setErrors((current) => ({ ...current, name: undefined }));
                  }}
                  maxLength={NAME_MAX_LENGTH}
                  autoComplete="name"
                  placeholder="Nama penuh anda"
                  className={cn("h-12 rounded-[1.2rem]", fieldClassName)}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? ids.nameError : undefined}
                />
                {errors.name ? (
                  <p id={ids.nameError} className={errorClassName}>
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <p id={ids.attendanceLabel} className={labelClassName}>
                  Kehadiran
                </p>
                <RadioGroup
                  ref={attendanceRef}
                  value={attendance}
                  onValueChange={(value) => {
                    setAttendance(value as AttendanceOption);
                    setErrors((current) => ({ ...current, attendance: undefined }));
                  }}
                  aria-labelledby={ids.attendanceLabel}
                  aria-invalid={errors.attendance ? true : undefined}
                  aria-describedby={errors.attendance ? ids.attendanceError : undefined}
                  className="grid gap-3 sm:grid-cols-2"
                >
                  {attendanceOptions.map(({ value, label, Icon }) => (
                    <RadioGroupPrimitive.Item
                      key={value}
                      value={value}
                      className="group relative flex min-h-16 cursor-pointer items-center gap-3 rounded-[1.2rem] border border-primary/12 bg-white/88 px-4 py-3 text-left font-spartan text-[1rem] text-primary/78 transition-[border-color,background-color,box-shadow] duration-300 hover:border-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 data-[state=checked]:border-gold/70 data-[state=checked]:bg-gold/8 data-[state=checked]:text-primary data-[state=checked]:shadow-[0_6px_18px_rgba(201,168,115,0.16)]"
                    >
                      <Icon
                        aria-hidden="true"
                        className="size-5 shrink-0 text-primary/45 transition-colors group-data-[state=checked]:text-gold"
                        strokeWidth={1.6}
                      />
                      <span className="flex-1">{label}</span>
                      <RadioGroupPrimitive.Indicator className="flex size-5 shrink-0 items-center justify-center rounded-full bg-gold text-white">
                        <Check className="size-3" strokeWidth={2.5} />
                      </RadioGroupPrimitive.Indicator>
                    </RadioGroupPrimitive.Item>
                  ))}
                </RadioGroup>
                {errors.attendance ? (
                  <p id={ids.attendanceError} className={errorClassName}>
                    {errors.attendance}
                  </p>
                ) : null}
              </div>

              <AnimatePresence initial={false} mode="wait">
                {attendance === "hadir" ? (
                  <motion.div
                    key="pax"
                    initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="space-y-2"
                  >
                    <p id={ids.paxLabel} className={labelClassName}>
                      Bilangan pax
                    </p>
                    <PaxStepper
                      id={ids.pax}
                      value={pax}
                      min={PAX_MIN}
                      max={PAX_MAX}
                      onChange={setPax}
                      aria-labelledby={ids.paxLabel}
                    />
                  </motion.div>
                ) : null}

                {attendance === "tidak-hadir" ? (
                  <motion.p
                    key="absent-note"
                    id={ids.absentNote}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="text-center font-spartan text-[0.98rem] leading-7 italic text-primary/62"
                  >
                    Tidak mengapa. Doa dan ucapan anda tetap amat bermakna buat kami.
                  </motion.p>
                ) : null}
              </AnimatePresence>

              <div className="space-y-2">
                <label htmlFor={ids.message} className={labelClassName}>
                  Ucapan & doa
                </label>
                <Textarea
                  ref={messageRef}
                  id={ids.message}
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                    setErrors((current) => ({ ...current, message: undefined }));
                  }}
                  maxLength={MESSAGE_MAX_LENGTH}
                  placeholder="Semoga majlis ini dipermudahkan dan diberkati."
                  rows={5}
                  className={cn("rounded-[1.3rem] px-4 py-3", fieldClassName)}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={cn(
                    ids.messageCount,
                    errors.message && ids.messageError,
                  )}
                />
                <div className="flex items-start justify-between gap-3">
                  {errors.message ? (
                    <p id={ids.messageError} className={errorClassName}>
                      {errors.message}
                    </p>
                  ) : (
                    <span />
                  )}
                  <p
                    id={ids.messageCount}
                    className={cn(
                      "shrink-0 font-spartan text-[0.8rem] tabular-nums transition-colors",
                      isMessageNearLimit ? "text-gold" : "text-primary/42",
                    )}
                  >
                    <span className="sr-only">Aksara digunakan: </span>
                    {messageLength} / {MESSAGE_MAX_LENGTH}
                  </p>
                </div>
              </div>

              <div className="flex justify-center pt-1">
                <Button
                  type="submit"
                  disabled={status !== "idle"}
                  className="h-auto min-w-44 rounded-full px-6 py-3 font-spartan text-[0.88rem] uppercase tracking-[0.14em] transition-[transform,background-color] duration-200 active:scale-[0.97] disabled:opacity-100"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Menghantar
                    </>
                  ) : status === "success" ? (
                    <motion.span
                      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <Check />
                      Diterima
                    </motion.span>
                  ) : (
                    "Hantar RSVP"
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}
