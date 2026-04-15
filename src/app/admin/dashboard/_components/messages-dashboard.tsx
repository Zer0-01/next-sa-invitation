"use client";

import { useEffect, useMemo, useState } from "react";
import { getDocs, orderBy, query } from "firebase/firestore";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { messageCollection } from "@/lib/firebase";

type MessageItem = {
  name?: string;
  message?: string;
  createdAt?: {
    seconds?: number;
  };
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

export function MessagesDashboard() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadMessages() {
      try {
        const snapshot = await getDocs(
          query(messageCollection, orderBy("createdAt", "desc"))
        );

        if (!isMounted) {
          return;
        }

        setMessages(snapshot.docs.map((doc) => doc.data() as MessageItem));
      } catch {
        if (!isMounted) {
          return;
        }

        setMessages([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadMessages();

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = useMemo(() => {
    const withText = messages.filter((item) => item.message?.trim());

    return {
      total: messages.length,
      uniqueSenders: new Set(messages.map((item) => item.name ?? "Guest")).size,
      avgLength: withText.length
        ? Math.round(
            withText.reduce(
              (sum, item) => sum + (item.message?.trim().length ?? 0),
              0
            ) / withText.length
          )
        : 0,
    };
  }, [messages]);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <Card className="border-primary/10 bg-white/85">
          <CardHeader>
            <CardDescription>Total Messages</CardDescription>
            <CardTitle className="text-3xl">{loading ? "--" : stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-primary/10 bg-white/85">
          <CardHeader>
            <CardDescription>Unique Senders</CardDescription>
            <CardTitle className="text-3xl">
              {loading ? "--" : stats.uniqueSenders}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-primary/10 bg-white/85">
          <CardHeader>
            <CardDescription>Average Message Length</CardDescription>
            <CardTitle className="text-3xl">
              {loading ? "--" : `${stats.avgLength} chars`}
            </CardTitle>
          </CardHeader>
        </Card>
      </section>

      <Card className="border-primary/10 bg-white/85">
        <CardHeader>
          <CardTitle>Guest Messages</CardTitle>
          <CardDescription>
            Latest messages sorted by newest entries first.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {messages.length ? (
            messages.map((message, index) => (
              <div
                key={`${message.name}-${index}`}
                className="rounded-2xl border border-primary/10 bg-white p-4"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-medium">{message.name ?? "Guest"}</p>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(message.createdAt?.seconds)}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {message.message ?? "No message content."}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm leading-6 text-muted-foreground">
              {loading ? "Loading messages..." : "No messages found."}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
