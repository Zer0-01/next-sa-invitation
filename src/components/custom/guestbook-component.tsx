"use client";

import { useState, useEffect } from "react";
import useGuestbookStore from "@/lib/store/guestbook-store";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { supabase } from "@/lib/supabase/supabase";
import { toast } from "sonner";

interface GuestMessage {
    id: number;
    name: string;
    message: string;
    created_at: string;
}

const GuestBookComponent = () => {
    const { name, message, setName, setMessage, reset } = useGuestbookStore();
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<GuestMessage[]>([]);

    const fetchMessages = async () => {
        const { data, error } = await supabase
            .from<"guestbook", GuestMessage>("guestbook")
            .select("*")
            .order("created_at", { ascending: true });

        if (error) {
            console.error(error);
            toast.error("Gagal memuatkan mesej.");
            return;
        }

        setMessages(data || []);
    };

    useEffect(() => {
        fetchMessages();

        const subscription = supabase
            .channel("guestbook_channel")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "guestbook" },
                () => {
                    fetchMessages();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !message) {
            toast.error("Sila isi nama dan mesej.");
            return;
        }

        setLoading(true);

        const { error } = await supabase.from("guestbook").insert([
            {
                name,
                message,
                created_at: new Date().toISOString(),
            },
        ]);

        setLoading(false);

        if (error) {
            console.error(error);
            toast.error("Gagal menghantar mesej. Sila cuba lagi.");
            return;
        }

        toast.success("Mesej berjaya dihantar!");
        reset();
        setIsOpen(false);
        fetchMessages();

    };

    return (
        <div className="m-3">
            <h1 className="text-center text-2xl font-semibold mb-4">Guest Book</h1>

            {messages.length > 0 && (
                <div className="h-80 overflow-y-auto border rounded-2xl p-4 bg-gradient-to-b from-white to-pink-50 shadow-inner mb-4">
                    <ul className="space-y-3">
                        {messages.map((msg) => (
                            <li
                                key={msg.id}
                                className="p-3 bg-white rounded-xl shadow-sm border border-pink-100 text-gray-700 text-sm"
                            >
                                <strong>{msg.name}:</strong> {msg.message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setIsOpen(true)}>
                        Tulis Mesej
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Tambah Mesej</DialogTitle>
                            <DialogDescription>
                                Sila isi nama dan mesej anda di bawah.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nama</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Nama penuh anda"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="message">Mesej</Label>
                                <Input
                                    id="message"
                                    name="message"
                                    placeholder="Tulis mesej anda..."
                                    required
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Batal</Button>
                            </DialogClose>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Menghantar..." : "Hantar"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default GuestBookComponent;
