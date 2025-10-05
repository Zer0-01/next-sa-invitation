"use client";

import { useState } from "react";
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
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import useHomeStore from "@/lib/store/home-store";
import { supabase } from "@/lib/supabase/supabase";
import { toast } from "sonner";

const RsvpComponent = () => {
    const { name, phone, isAttend, pax, setName, setPhone, setIsAttend, setPax, reset } = useHomeStore();
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !phone || isAttend === null) {
            alert("Sila isi semua maklumat.");
            return;
        }

        setLoading(true);

        const { error } = await supabase.from("rsvp").insert([
            {
                name,
                phone,
                isAttend,
                pax: isAttend ? pax : 0,
                created_at: new Date().toISOString(),
            },
        ]);

        setLoading(false);

        if (error) {
            console.error(error);
            toast.error("Gagal menghantar RSVP. Sila cuba lagi.");
            return;
        }

        toast.success("RSVP berjaya dihantar!");
        reset();
        setIsOpen(false); // ✅ Close dialog
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl font-semibold">Maklumat Kehadiran</h1>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setIsOpen(true)}>
                        Isi Kehadiran
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Kehadiran</DialogTitle>
                            <DialogDescription>
                                Sila isi maklumat kehadiran anda di bawah.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-2">
                            {/* Name */}
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

                            {/* Phone */}
                            <div className="grid gap-2">
                                <Label htmlFor="phone">No. Telefon</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="012-3456789"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            {/* Attendance */}
                            <div className="grid gap-2">
                                <Label>Kehadiran</Label>
                                <RadioGroup
                                    value={isAttend === null ? "" : isAttend ? "hadir" : "tidak"}
                                    onValueChange={(val) => setIsAttend(val === "hadir")}
                                    className="flex gap-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="hadir" id="hadir" />
                                        <Label htmlFor="hadir">Hadir</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="tidak" id="tidak" />
                                        <Label htmlFor="tidak">Tidak Hadir</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {/* Pax input */}
                            {isAttend && (
                                <div className="grid gap-2">
                                    <Label htmlFor="pax">Bilangan Kehadiran (Pax)</Label>
                                    <Input
                                        id="pax"
                                        name="pax"
                                        type="number"
                                        min={0}
                                        max={10}
                                        value={pax}
                                        onChange={(e) => setPax(Number(e.target.value))}
                                        placeholder="Contoh: 2"
                                        required
                                    />
                                </div>
                            )}
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

export default RsvpComponent;
