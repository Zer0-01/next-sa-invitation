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
import { Textarea } from "@/components/ui/textarea"
import { useMessageStore } from "@/lib/store/message-store"

const MessageFormComponent = () => {
    const isModalOpen = useMessageStore((s) => s.isModalOpen)
    const openModal = useMessageStore((s) => s.openModal)
    const closeModal = useMessageStore((s) => s.closeModal)

    const name = useMessageStore((s) => s.name)
    const setName = useMessageStore((s) => s.setName)
    const message = useMessageStore((s) => s.message)
    const setMessage = useMessageStore((s) => s.setMessage)
    const submit = useMessageStore((s) => s.submit)

    const isSubmitDisabled = !name.trim() || !message.trim()

    const handleSubmit = () => {
        submit()
    }

    const cancel = () => {
        setName("")
        setMessage("")
        closeModal()
    }

    return (
        <div className="flex justify-center">
            <Button
                onClick={openModal}
                className="bg-white text-gray-900 border border-gray-300 px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
                Tulis Ucapan
            </Button>

            <Dialog open={isModalOpen} onOpenChange={(open) => (open ? openModal() : closeModal())}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tulis Ucapan</DialogTitle>
                        <DialogDescription>
                            Tinggalkan ucapan atau doa untuk pengantin 💚
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        className="flex flex-col gap-4 mt-4"
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmit()
                        }}
                    >
                        <FieldSet>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel>Nama</FieldLabel>
                                    <FieldDescription>Nama anda</FieldDescription>
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Contoh: Anas"
                                        required
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel>Ucapan</FieldLabel>
                                    <FieldDescription>Tulis mesej anda</FieldDescription>
                                    <Textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Semoga bahagia hingga ke jannah..."
                                        rows={4}
                                        required
                                    />
                                </Field>
                            </FieldGroup>
                        </FieldSet>

                        <FieldSeparator />

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={cancel}>
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitDisabled}
                                className="bg-green-600 text-white"
                            >
                                Hantar
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default MessageFormComponent
