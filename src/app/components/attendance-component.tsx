'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAttendanceStore } from "@/lib/store/attendance-store"

const AttendanceComponent = () => {
    const isModalOpen = useAttendanceStore((state) => state.isModalOpen)
    const openModal = useAttendanceStore((state) => state.openModal)
    const closeModal = useAttendanceStore((state) => state.closeModal)
    const name = useAttendanceStore((state) => state.name)
    const setName = useAttendanceStore((state) => state.setName)
    const isAttend = useAttendanceStore((state) => state.isAttend)
    const setIsAttend = useAttendanceStore((state) => state.setIsAttend)
    const pax = useAttendanceStore((state) => state.pax)
    const setPax = useAttendanceStore((state) => state.setPax)
    const submit = useAttendanceStore((state) => state.submit)



    const handleSubmit = () => {
        submit()
    }

    const cancel = () => {
        setName("")
        setIsAttend(true)
        setPax(1)
        closeModal()
    }

    const isSubmitDisabled = () => {
        return !name
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <Button
                onClick={openModal}
                className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
                Sahkan Kehadiran
            </Button>

            <Dialog
                open={isModalOpen}
                onOpenChange={(open) => (open ? openModal() : closeModal())}
            >
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>Sahkan Kehadiran</DialogTitle>
                        <DialogDescription>
                            Isi form dibawah ini untuk sahkan kehadiran.
                        </DialogDescription>
                    </DialogHeader>

                    <form className="flex flex-col gap-4 mt-4" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                        <FieldSet>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="attendance-name">Nama</FieldLabel>
                                    <FieldDescription>Masukkan nama anda</FieldDescription>
                                    <Input
                                        id="attendance-name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="attendance-attend">Kehadiran</FieldLabel>
                                    <FieldDescription>Adakah anda hadir?</FieldDescription>
                                    <Select
                                        value={isAttend ? "yes" : "no"}
                                        onValueChange={(value) => setIsAttend(value === "yes")}
                                    >
                                        <SelectTrigger id="attendance-attend">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="yes">Ya</SelectItem>
                                            <SelectItem value="no">Tidak</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </Field>

                                {isAttend && (
                                    <Field>
                                        <FieldLabel htmlFor="attendance-pax">Pax</FieldLabel>
                                        <FieldDescription>Jumlah pax anda</FieldDescription>
                                        <Select value={String(pax)} onValueChange={(value) => setPax(Number(value))}>
                                            <SelectTrigger id="attendance-pax">
                                                <SelectValue placeholder="Select pax" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                                                    <SelectItem key={n} value={String(n)}>
                                                        {n}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                )}

                            </FieldGroup>
                        </FieldSet>

                        <FieldSeparator />

                        <div className="flex justify-end gap-2 mt-2">
                            <Button variant="outline" onClick={cancel}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={isSubmitDisabled()} className="bg-green-600 text-white">
                                Hantar
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AttendanceComponent
