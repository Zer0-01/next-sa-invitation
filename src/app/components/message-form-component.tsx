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
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface MessageFormComponentProps {
    isModalOpen: boolean
    openModal: () => void
    closeModal: () => void
    name: string
    setName: (name: string) => void
    message: string
    setMessage: (message: string) => void
    submit: () => Promise<void>
    isSubmitting: boolean
}

const MessageFormComponent = ({
    isModalOpen,
    openModal,
    closeModal,
    name,
    setName,
    message,
    setMessage,
    submit,
    isSubmitting
}: MessageFormComponentProps) => {

    const isSubmitDisabled = !name.trim() || !message.trim() || isSubmitting

    const handleSubmit = async () => {
        await submit()
    }

    const cancel = () => {
        setName("")
        setMessage("")
        closeModal()
    }


    return (
        <div className="flex justify-center">
            <Button
                variant="outline"
                onClick={openModal}
                className="h-auto rounded-full border-primary/15 bg-background/65 px-10 py-3 font-serif text-[1.35rem] leading-none font-normal text-primary shadow-[0_12px_24px_rgba(33,31,24,0.06)] transition-all duration-300 hover:scale-[1.02] hover:bg-sage/10 hover:text-primary active:scale-95 sm:px-12 sm:text-[1.6rem]"
            >
                Pesanan & Doa
            </Button>

            <Dialog open={isModalOpen} onOpenChange={(open) => (open ? openModal() : closeModal())}>
                <DialogContent className="max-w-md rounded-xl border-primary/10 bg-background">
                    <DialogHeader className="text-center pt-6">
                        <DialogTitle className="text-2xl font-serif font-bold tracking-tight text-foreground">Guest Book</DialogTitle>
                        <div className="w-12 h-[1px] bg-primary/20 mx-auto mt-4 mb-2" />
                        <DialogDescription className="text-sm text-gray-400 font-light tracking-wide">
                            Your kind words mean the world to us.
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        className="flex flex-col gap-6 mt-6 px-2 pb-6"
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmit()
                        }}
                    >
                        <FieldSet>
                            <FieldGroup className="space-y-6">
                                <Field>
                                    <FieldLabel className="text-xs tracking-widest uppercase text-gray-400 font-medium">Name</FieldLabel>
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Your Name"
                                        className="rounded-none border-gray-100 focus:border-gray-900 transition-colors py-6 text-sm"
                                        required
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel className="text-xs tracking-widest uppercase text-gray-400 font-medium">Message</FieldLabel>
                                    <Textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Wishing you a lifetime of love and happiness..."
                                        rows={4}
                                        className="rounded-none border-gray-100 focus:border-gray-900 transition-colors text-sm resize-none"
                                        required
                                    />
                                </Field>
                            </FieldGroup>
                        </FieldSet>

                        <div className="flex flex-col gap-3 mt-4">
                            <Button
                                type="submit"
                                disabled={isSubmitDisabled}
                                className="w-full h-12 text-xs tracking-widest uppercase font-medium"
                            >
                                {isSubmitting ? "Sending..." : "Send Wish"}
                            </Button>
                            <Button variant="ghost" onClick={cancel} className="w-full h-12 text-xs tracking-widest uppercase">
                                Cancel
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default MessageFormComponent
