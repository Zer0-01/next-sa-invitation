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
import { useAttendance } from "@/hooks/use-attendance"

const AttendanceComponent = () => {
    const {
        isModalOpen,
        openModal,
        closeModal,
        name,
        setName,
        isAttend,
        setIsAttend,
        pax,
        setPax,
        submit,
        resetForm,
        isSubmitting
    } = useAttendance()

    const handleSubmit = async () => {
        await submit()
    }

    const cancel = () => {
        resetForm()
        closeModal()
    }


    const isSubmitDisabled = () => {
        return !name
    }

    return (
        <div className="flex flex-col items-center">
            <Button
                onClick={openModal}
                className="bg-gray-900 text-white text-xs tracking-widest uppercase font-medium px-8 py-6 rounded-none border border-gray-900 hover:bg-white hover:text-gray-900 transition-all duration-500 ease-in-out shadow-sm"
            >
                RSVP Now
            </Button>

            <Dialog
                open={isModalOpen}
                onOpenChange={(open) => (open ? openModal() : closeModal())}
            >
                <DialogContent className="max-w-md rounded-none border-none bg-white">
                    <DialogHeader className="text-center pt-6">
                        <DialogTitle className="text-2xl font-serif font-bold tracking-tight text-gray-900">RSVP</DialogTitle>
                        <div className="w-12 h-[1px] bg-gray-200 mx-auto mt-4 mb-2" />
                        <DialogDescription className="text-sm text-gray-400 font-light tracking-wide">
                            Kindly confirm your presence by filling out the form.
                        </DialogDescription>
                    </DialogHeader>

                    <form className="flex flex-col gap-6 mt-6 px-2 pb-6" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                        <FieldSet>
                            <FieldGroup className="space-y-6">
                                <Field>
                                    <FieldLabel htmlFor="attendance-name" className="text-xs tracking-widest uppercase text-gray-400 font-medium">Name</FieldLabel>
                                    <Input
                                        id="attendance-name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Full Name"
                                        className="rounded-none border-gray-100 focus:border-gray-900 transition-colors py-6 text-sm"
                                        required
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="attendance-attend" className="text-xs tracking-widest uppercase text-gray-400 font-medium">Attendance</FieldLabel>
                                    <Select
                                        value={isAttend ? "yes" : "no"}
                                        onValueChange={(value) => setIsAttend(value === "yes")}
                                    >
                                        <SelectTrigger id="attendance-attend" className="rounded-none border-gray-100 py-6 text-sm">
                                            <SelectValue placeholder="Will you be joining us?" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-none">
                                            <SelectItem value="yes">Accept with Pleasure</SelectItem>
                                            <SelectItem value="no">Decline with Regret</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </Field>

                                {isAttend && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Field>
                                            <FieldLabel htmlFor="attendance-pax" className="text-xs tracking-widest uppercase text-gray-400 font-medium">Pax</FieldLabel>
                                            <Select value={String(pax)} onValueChange={(value) => setPax(Number(value))}>
                                                <SelectTrigger id="attendance-pax" className="rounded-none border-gray-100 py-6 text-sm">
                                                    <SelectValue placeholder="Number of guests" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-none">
                                                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                                                        <SelectItem key={n} value={String(n)}>
                                                            {n} {n === 1 ? "Guest" : "Guests"}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </Field>
                                    </motion.div>
                                )}

                            </FieldGroup>
                        </FieldSet>

                        <div className="flex flex-col gap-3 mt-4">
                            <Button
                                type="submit"
                                disabled={isSubmitDisabled() || isSubmitting}
                                className="w-full bg-gray-900 text-white text-xs tracking-widest uppercase font-medium py-6 rounded-none hover:bg-gray-800 transition-colors"
                            >
                                {isSubmitting ? "Sending..." : "Submit RSVP"}
                            </Button>
                            <Button variant="ghost" onClick={cancel} className="w-full text-xs tracking-widest uppercase text-gray-400 hover:text-gray-900 rounded-none py-6">
                                Cancel
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

import { motion } from "framer-motion"
export default AttendanceComponent

