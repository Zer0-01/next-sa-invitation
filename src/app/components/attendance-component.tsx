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



    const handleSubmit = () => {
        console.log({ name, isAttend, pax })
        closeModal()
    }

    const cancel = () => {
        setName("")
        setIsAttend(true)
        setPax(1)
        closeModal()
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
                        <DialogTitle>Confirm Attendance</DialogTitle>
                        <DialogDescription>
                            Fill in your details below to confirm your attendance.
                        </DialogDescription>
                    </DialogHeader>

                    <form className="flex flex-col gap-4 mt-4" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                        <FieldSet>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="attendance-name">Nama</FieldLabel>
                                    <FieldDescription>Enter your full name</FieldDescription>
                                    <Input
                                        id="attendance-name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="attendance-attend">Attend</FieldLabel>
                                    <FieldDescription>Will you attend the event?</FieldDescription>
                                    <Select
                                        value={isAttend ? "yes" : "no"}
                                        onValueChange={(value) => setIsAttend(value === "yes")}
                                    >
                                        <SelectTrigger id="attendance-attend">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="yes">Yes</SelectItem>
                                            <SelectItem value="no">No</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="attendance-pax">Pax</FieldLabel>
                                    <FieldDescription>Number of people attending</FieldDescription>
                                    <Input
                                        id="attendance-pax"
                                        type="number"
                                        min={1}
                                        value={pax}
                                        onChange={(e) => setPax(Number(e.target.value))}
                                        required
                                    />
                                </Field>
                            </FieldGroup>
                        </FieldSet>

                        <FieldSeparator />

                        <div className="flex justify-end gap-2 mt-2">
                            <Button variant="outline" onClick={cancel}>
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-green-600 text-white">
                                Confirm
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AttendanceComponent
