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
import { attendanceCollection } from "@/lib/firebase";

type AttendanceItem = {
  name?: string;
  isAttend?: boolean;
  pax?: number;
};

export function GuestDashboard() {
  const [guests, setGuests] = useState<AttendanceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadGuests() {
      try {
        const snapshot = await getDocs(query(attendanceCollection, orderBy("name")));

        if (!isMounted) {
          return;
        }

        setGuests(snapshot.docs.map((doc) => doc.data() as AttendanceItem));
      } catch {
        if (!isMounted) {
          return;
        }

        setGuests([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadGuests();

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = useMemo(() => {
    const attending = guests.filter((guest) => guest.isAttend);

    return {
      total: guests.length,
      attending: attending.length,
      unable: guests.length - attending.length,
      pax: attending.reduce((sum, guest) => sum + (guest.pax ?? 0), 0),
    };
  }, [guests]);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-primary/10 bg-white/85">
          <CardHeader>
            <CardDescription>Total Guests</CardDescription>
            <CardTitle className="text-3xl">{loading ? "--" : stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-primary/10 bg-white/85">
          <CardHeader>
            <CardDescription>Attending</CardDescription>
            <CardTitle className="text-3xl">
              {loading ? "--" : stats.attending}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-primary/10 bg-white/85">
          <CardHeader>
            <CardDescription>Not Attending</CardDescription>
            <CardTitle className="text-3xl">{loading ? "--" : stats.unable}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-primary/10 bg-white/85">
          <CardHeader>
            <CardDescription>Total Pax</CardDescription>
            <CardTitle className="text-3xl">{loading ? "--" : stats.pax}</CardTitle>
          </CardHeader>
        </Card>
      </section>

      <Card className="border-primary/10 bg-white/85">
        <CardHeader>
          <CardTitle>Guest Responses</CardTitle>
          <CardDescription>
            RSVP records currently stored in the attendance collection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-2xl border border-primary/10">
            <div className="grid grid-cols-[minmax(0,1.4fr)_120px_100px] bg-primary/5 px-4 py-3 text-sm font-medium">
              <span>Name</span>
              <span>Status</span>
              <span>Pax</span>
            </div>
            <div className="divide-y divide-primary/10 bg-white">
              {guests.length ? (
                guests.map((guest, index) => (
                  <div
                    key={`${guest.name}-${index}`}
                    className="grid grid-cols-[minmax(0,1.4fr)_120px_100px] items-center px-4 py-3 text-sm"
                  >
                    <span className="truncate font-medium">
                      {guest.name ?? "Unnamed guest"}
                    </span>
                    <span className="text-muted-foreground">
                      {guest.isAttend ? "Attending" : "Not attending"}
                    </span>
                    <span className="text-muted-foreground">{guest.pax ?? 0}</span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-sm text-muted-foreground">
                  {loading ? "Loading guest records..." : "No guest records found."}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
