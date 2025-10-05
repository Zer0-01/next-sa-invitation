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
                () => fetchMessages()
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
        <div className="flex flex-col items-center gap-6 p-6 m-3 ">
            <h1 className="text-3xl font-bold text-pink-600">Guest Book</h1>
            <p className="text-sm text-gray-600 text-center max-w-xs">
                Tinggalkan mesej anda untuk kenangan majlis ini.
            </p>

            {messages.length > 0 && (
                <div className="h-80 overflow-y-auto border rounded-2xl p-4 bg-white shadow-inner w-full">
                    <ul className="space-y-3">
                        {messages.map((msg) => (
                            <li
                                key={msg.id}
                                className="p-3 bg-pink-50 rounded-xl shadow-sm border border-pink-100 text-gray-700 text-sm"
                            >
                                <strong className="text-pink-600">{msg.name}:</strong>{" "}
                                {msg.message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="px-6 py-3 text-lg font-medium hover:bg-pink-100 w-full"
                        onClick={() => setIsOpen(true)}
                    >
                        Tulis Mesej
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-lg p-6 space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-pink-700">
                                Tambah Mesej
                            </DialogTitle>
                            <DialogDescription className="text-sm text-gray-500">
                                Sila isi nama dan mesej anda di bawah.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4">
                            {/* Name */}
                            <div className="grid gap-1">
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

                            {/* Message */}
                            <div className="grid gap-1">
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

                        <DialogFooter className="flex justify-between">
                            <DialogClose asChild>
                                <Button variant="ghost" disabled={loading}>
                                    Batal
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                className="bg-pink-600 hover:bg-pink-700 text-white"
                                disabled={loading}
                            >
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
