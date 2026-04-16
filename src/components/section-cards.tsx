"use client";

import { useEffect, useMemo, useState } from "react";
import { getDocs } from "firebase/firestore";
import {
  IconMessageCircle,
  IconReceipt2,
  IconUserCheck,
  IconUserX,
} from "@tabler/icons-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { attendanceCollection, messageCollection } from "@/lib/firebase";

type AttendanceItem = {
  isAttend?: boolean;
  pax?: number;
};

type MessageItem = Record<string, unknown>;

const cardContent = {
  attendingPax: {
    label: "Total Guest Attends",
    helper: "Total attending pax from RSVP submissions.",
    icon: IconUserCheck,
  },
  unattendingPax: {
    label: "Total Guest Unattend",
    helper: "Total unattending RSVP documents recorded.",
    icon: IconUserX,
  },
  totalRsvp: {
    label: "Total RSVP Documents",
    helper: "Number of documents in the attendance collection.",
    icon: IconReceipt2,
  },
  totalMessages: {
    label: "Total Messages Documents",
    helper: "Number of documents in the message collection.",
    icon: IconMessageCircle,
  },
} as const;

export function SectionCards() {
  const [attendance, setAttendance] = useState<AttendanceItem[]>([]);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardSummary() {
      try {
        const [attendanceSnapshot, messageSnapshot] = await Promise.all([
          getDocs(attendanceCollection),
          getDocs(messageCollection),
        ]);

        if (!isMounted) {
          return;
        }

        setAttendance(
          attendanceSnapshot.docs.map((doc) => doc.data() as AttendanceItem)
        );
        setMessages(messageSnapshot.docs.map((doc) => doc.data() as MessageItem));
      } catch {
        if (!isMounted) {
          return;
        }

        setAttendance([]);
        setMessages([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDashboardSummary();

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = useMemo(() => {
    const attendingPax = attendance
      .filter((item) => item.isAttend)
      .reduce((sum, item) => sum + (item.pax ?? 0), 0);

    const unattendingCount = attendance.filter(
      (item) => item.isAttend === false
    ).length;

    return {
      attendingPax,
      unattendingCount,
      totalRsvp: attendance.length,
      totalMessages: messages.length,
    };
  }, [attendance, messages]);

  const cards = [
    {
      ...cardContent.attendingPax,
      value: stats.attendingPax,
    },
    {
      ...cardContent.unattendingPax,
      value: stats.unattendingCount,
    },
    {
      ...cardContent.totalRsvp,
      value: stats.totalRsvp,
    },
    {
      ...cardContent.totalMessages,
      value: stats.totalMessages,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.label} className="@container/card">
            <CardHeader className="gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <CardDescription>{card.label}</CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {loading ? "--" : card.value.toLocaleString("en-MY")}
                  </CardTitle>
                </div>
                <div className="rounded-lg border border-primary/10 bg-primary/5 p-2 text-primary">
                  <Icon className="size-5" />
                </div>
              </div>
            </CardHeader>
            <CardFooter className="items-start text-sm text-muted-foreground">
              {card.helper}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
