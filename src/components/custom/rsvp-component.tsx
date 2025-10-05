"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const RsvpComponent = () => {
    const [attendance, setAttendance] = useState<"hadir" | "tidak" | "">("");
    const [pax, setPax] = useState<number | "">("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            attendance,
            pax: attendance === "hadir" ? pax : 0,
        });
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl font-semibold">Maklumat Kehadiran</h1>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Isi Kehadiran</Button>
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
                                <Input id="name" name="name" placeholder="Nama penuh anda" required />
                            </div>

                            {/* Attendance Radio Group */}
                            <div className="grid gap-2">
                                <Label>Kehadiran</Label>
                                <RadioGroup
                                    value={attendance}
                                    onValueChange={(val) => setAttendance(val as "hadir" | "tidak")}
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

                            {/* Pax input — only shows when attending */}
                            {attendance === "hadir" && (
                                <div className="grid gap-2">
                                    <Label htmlFor="pax">Bilangan Kehadiran (Pax)</Label>
                                    <Input
                                        id="pax"
                                        name="pax"
                                        type="number"
                                        min={1}
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
                            <Button type="submit">Hantar</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default RsvpComponent;
