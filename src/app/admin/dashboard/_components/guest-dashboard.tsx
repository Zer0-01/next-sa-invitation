"use client";

import { useEffect, useMemo, useState } from "react";
import {
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db, attendanceCollection } from "@/lib/firebase";

type AttendanceItem = {
  id: string;
  name?: string;
  isAttend?: boolean;
  pax?: number;
  createdAt?: {
    seconds?: number;
  };
};

type GuestTableRow = {
  id: string;
  name: string;
  status: "Attend" | "Unattend";
  pax: number | "-";
  createdAt: string;
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

export function GuestDashboard() {
  const [guests, setGuests] = useState<AttendanceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [guestToDelete, setGuestToDelete] = useState<GuestTableRow | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadGuests() {
      try {
        const snapshot = await getDocs(attendanceCollection);

        if (!isMounted) {
          return;
        }

        const nextGuests = snapshot.docs
          .map((guestDoc) => ({
            id: guestDoc.id,
            ...(guestDoc.data() as Omit<AttendanceItem, "id">),
          }))
          .sort(
            (left, right) =>
              (right.createdAt?.seconds ?? 0) - (left.createdAt?.seconds ?? 0)
          );

        setGuests(nextGuests);
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
    const attendingPax = guests
      .filter((guest) => guest.isAttend)
      .reduce((sum, guest) => sum + (guest.pax ?? 0), 0);

    const unattendingCount = guests.filter(
      (guest) => guest.isAttend === false
    ).length;

    return {
      attendingPax,
      unattendingCount,
      totalDocuments: guests.length,
    };
  }, [guests]);

  const tableData = useMemo<GuestTableRow[]>(
    () =>
      guests.map((guest) => ({
        id: guest.id,
        name: guest.name ?? "Unnamed guest",
        status: guest.isAttend ? "Attend" : "Unattend",
        pax: guest.isAttend ? (guest.pax ?? 0) : "-",
        createdAt: formatDate(guest.createdAt?.seconds),
      })),
    [guests]
  );

  async function handleDeleteGuest() {
    if (!guestToDelete) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteDoc(doc(db, "attendance", guestToDelete.id));
      setGuests((currentGuests) =>
        currentGuests.filter((guest) => guest.id !== guestToDelete.id)
      );
      toast.success("RSVP document deleted.");
      setGuestToDelete(null);
    } catch {
      toast.error("Failed to delete RSVP document.");
    } finally {
      setIsDeleting(false);
    }
  }

  const columns = useMemo<ColumnDef<GuestTableRow>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <span className="font-medium">
            {row.original.name || "Unnamed guest"}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const isAttend = row.original.status === "Attend";

          return (
            <Badge
              variant="outline"
              className={
                isAttend
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }
            >
              {row.original.status}
            </Badge>
          );
        },
      },
      {
        accessorKey: "pax",
        header: () => <div className="text-right">Pax</div>,
        cell: ({ row }) => <div className="text-right">{row.original.pax}</div>,
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {row.original.createdAt}
          </span>
        ),
      },
      {
        id: "action",
        header: () => <div className="text-right">Action</div>,
        cell: ({ row }) => (
          <div className="text-right">
            <Button
              type="button"
              variant="link"
              className="h-auto px-0 text-red-600 hover:text-red-700"
              onClick={() => setGuestToDelete(row.original)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <Card className="border-emerald-200 bg-emerald-50/70">
          <CardHeader>
            <CardDescription className="text-emerald-700">
              No of Attending
            </CardDescription>
            <CardTitle className="text-3xl text-emerald-800">
              {loading ? "--" : stats.attendingPax}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-red-200 bg-red-50/70">
          <CardHeader>
            <CardDescription className="text-red-700">
              No of Unattend
            </CardDescription>
            <CardTitle className="text-3xl text-red-800">
              {loading ? "--" : stats.unattendingCount}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-primary/10 bg-white/85">
          <CardHeader>
            <CardDescription>No of Document in Collections</CardDescription>
            <CardTitle className="text-3xl">
              {loading ? "--" : stats.totalDocuments}
            </CardTitle>
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
            <Table>
              <TableHeader className="bg-primary/5">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-muted-foreground"
                    >
                      {loading
                        ? "Loading guest records..."
                        : "No guest records found."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={Boolean(guestToDelete)}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setGuestToDelete(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete RSVP Document</DialogTitle>
            <DialogDescription>
              {guestToDelete
                ? `Delete the RSVP record for ${guestToDelete.name}? This action cannot be undone.`
                : "Delete this RSVP document? This action cannot be undone."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setGuestToDelete(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteGuest}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
