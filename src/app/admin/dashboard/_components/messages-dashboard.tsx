"use client";

import { useEffect, useMemo, useState } from "react";
import {
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { toast } from "sonner";

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
import { db, messageCollection } from "@/lib/firebase";

type MessageItem = {
  id: string;
  name?: string;
  message?: string;
  createdAt?: {
    seconds?: number;
  };
};

type MessageTableRow = {
  id: string;
  name: string;
  message: string;
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

export function MessagesDashboard() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageToDelete, setMessageToDelete] = useState<MessageTableRow | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

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

        setMessages(
          snapshot.docs.map((messageDoc) => ({
            id: messageDoc.id,
            ...(messageDoc.data() as Omit<MessageItem, "id">),
          }))
        );
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

  const tableData = useMemo<MessageTableRow[]>(
    () =>
      messages.map((message) => ({
        id: message.id,
        name: message.name ?? "Guest",
        message: message.message ?? "No message content.",
        createdAt: formatDate(message.createdAt?.seconds),
      })),
    [messages]
  );

  async function handleDeleteMessage() {
    if (!messageToDelete) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteDoc(doc(db, "message", messageToDelete.id));
      setMessages((currentMessages) =>
        currentMessages.filter((message) => message.id !== messageToDelete.id)
      );
      toast.success("Message deleted.");
      setMessageToDelete(null);
    } catch {
      toast.error("Failed to delete message.");
    } finally {
      setIsDeleting(false);
    }
  }

  const columns = useMemo<ColumnDef<MessageTableRow>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <span className="font-medium">{row.original.name || "Guest"}</span>
        ),
      },
      {
        accessorKey: "message",
        header: "Message",
        cell: ({ row }) => (
          <div className="max-w-xl whitespace-normal text-sm leading-6 text-muted-foreground">
            {row.original.message}
          </div>
        ),
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
              onClick={() => setMessageToDelete(row.original)}
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
                      {loading ? "Loading messages..." : "No messages found."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={Boolean(messageToDelete)}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setMessageToDelete(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Message</DialogTitle>
            <DialogDescription>
              {messageToDelete
                ? `Delete the message from ${messageToDelete.name}? This action cannot be undone.`
                : "Delete this message? This action cannot be undone."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setMessageToDelete(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteMessage}
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
