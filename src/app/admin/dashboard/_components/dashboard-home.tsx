"use client";

import { useEffect, useMemo, useState } from "react";
import { getDocs, orderBy, query } from "firebase/firestore";
import {
  CalendarCheck2,
  Mailbox,
  MessageSquareQuote,
  UserRoundCheck,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { attendanceCollection, messageCollection } from "@/lib/firebase";

type AttendanceItem = {
  name?: string;
  isAttend?: boolean;
  pax?: number;
};

type MessageItem = {
  name?: string;
  message?: string;
  createdAt?: {
    seconds?: number;
  };
};

type DashboardState = {
  loading: boolean;
  guestCount: number;
  attendingCount: number;
  totalPax: number;
  messageCount: number;
  recentMessages: MessageItem[];
};

const initialState: DashboardState = {
  loading: true,
  guestCount: 0,
  attendingCount: 0,
  totalPax: 0,
  messageCount: 0,
  recentMessages: [],
};

function formatDate(seconds?: number) {
  if (!seconds) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat("en-MY", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(seconds * 1000));
}

export function DashboardHome() {
  const [state, setState] = useState<DashboardState>(initialState);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        const [attendanceSnapshot, messageSnapshot] = await Promise.all([
          getDocs(attendanceCollection),
          getDocs(query(messageCollection, orderBy("createdAt", "desc"))),
        ]);

        if (!isMounted) {
          return;
        }

        const attendance = attendanceSnapshot.docs.map(
          (doc) => doc.data() as AttendanceItem
        );
        const messages = messageSnapshot.docs.map(
          (doc) => doc.data() as MessageItem
        );

        const attendingGuests = attendance.filter((guest) => guest.isAttend);
        const totalPax = attendingGuests.reduce(
          (sum, guest) => sum + (guest.pax ?? 0),
          0
        );

        setState({
          loading: false,
          guestCount: attendance.length,
          attendingCount: attendingGuests.length,
          totalPax,
          messageCount: messages.length,
          recentMessages: messages.slice(0, 4),
        });
      } catch {
        if (!isMounted) {
          return;
        }

        setState((current) => ({ ...current, loading: false }));
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const cards = useMemo(
    () => [
      {
        label: "Total Guests",
        value: state.guestCount,
        description: "Total RSVP submissions collected",
        icon: Mailbox,
      },
      {
        label: "Attending",
        value: state.attendingCount,
        description: "Guests who confirmed attendance",
        icon: UserRoundCheck,
      },
      {
        label: "Total Pax",
        value: state.totalPax,
        description: "Estimated seats based on RSVP pax",
        icon: CalendarCheck2,
      },
      {
        label: "Messages",
        value: state.messageCount,
        description: "Wishes and notes sent by guests",
        icon: MessageSquareQuote,
      },
    ],
    [state]
  );

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Card key={card.label} className="border-primary/10 bg-white/85">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="space-y-1">
                  <CardDescription>{card.label}</CardDescription>
                  <CardTitle className="text-3xl">
                    {state.loading ? "--" : card.value}
                  </CardTitle>
                </div>
                <div className="rounded-xl bg-primary/8 p-3 text-primary">
                  <Icon className="size-5" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <Card className="border-primary/10 bg-white/85">
          <CardHeader>
            <CardTitle>Admin Overview</CardTitle>
            <CardDescription>
              Snapshot of the invitation activity for the current collection.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-primary/5 p-4">
              <p className="text-sm font-medium">Guest response quality</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Use the guest page to review individual RSVP records and monitor
                turnout trends.
              </p>
            </div>
            <div className="rounded-2xl bg-gold/10 p-4">
              <p className="text-sm font-medium">Message moderation</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Review recent wishes from guests and track incoming message
                volume from the messages page.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/10 bg-white/85">
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>
              Latest entries from the guest message collection.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {state.recentMessages.length ? (
              state.recentMessages.map((message, index) => (
                <div
                  key={`${message.name}-${index}`}
                  className="rounded-2xl border border-primary/10 bg-background/70 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{message.name ?? "Guest"}</p>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(message.createdAt?.seconds)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {message.message ?? "No message provided."}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm leading-6 text-muted-foreground">
                No recent messages available yet.
              </p>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
