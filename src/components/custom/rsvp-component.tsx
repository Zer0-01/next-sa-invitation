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
    const { name, phone, isAttend, pax, setName, setPhone, setIsAttend, setPax, reset } =
        useHomeStore();
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !phone || isAttend === null) {
            toast.error("Sila isi semua maklumat.");
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
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col items-center gap-6 p-6 bg-gradient-to-b from-pink-50 to-white rounded-2xl shadow-lg max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-pink-600">Maklumat Kehadiran</h1>
            <p className="text-sm text-gray-600 text-center max-w-xs">
                Sila isi maklumat kehadiran anda untuk majlis ini. Maklumat anda akan dirahsiakan.
            </p>

            <Dialog open={isOpen} onOpenChange={setIsOpen} >
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="px-6 py-3 text-lg font-medium hover:bg-pink-100 transition-all"
                        onClick={() => setIsOpen(true)}
                    >
                        Isi Kehadiran
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-lg p-6 space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-pink-700">
                                Kehadiran
                            </DialogTitle>
                            <DialogDescription className="text-sm text-gray-500">
                                Sila lengkapkan maklumat kehadiran anda di bawah.
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

                            {/* Phone */}
                            <div className="grid gap-1">
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
                            <div className="grid gap-1">
                                <Label>Kehadiran</Label>
                                <RadioGroup
                                    value={isAttend === null ? "" : isAttend ? "hadir" : "tidak"}
                                    onValueChange={(val) => setIsAttend(val === "hadir")}
                                    className="flex gap-6"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="hadir" id="hadir" />
                                        <Label htmlFor="hadir" className="cursor-pointer">
                                            Hadir
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="tidak" id="tidak" />
                                        <Label htmlFor="tidak" className="cursor-pointer">
                                            Tidak Hadir
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {/* Pax */}
                            {isAttend && (
                                <div className="grid gap-1">
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

export default RsvpComponent;
