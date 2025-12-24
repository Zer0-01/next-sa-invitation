import { addDoc, DocumentData, getDocs } from "firebase/firestore"
import { create } from "zustand"
import { messageCollection } from "../firebase"
import { toast } from "sonner"

interface MessageState {
    // UI
    isModalOpen: boolean
    openModal: () => void
    closeModal: () => void

    // Data
    messages: DocumentData[]
    getMessagesStatus: "initial" | "loading" | "success" | "error"
    getMessages: () => Promise<void>

    // Form
    name: string
    setName: (name: string) => void
    message: string
    setMessage: (message: string) => void
    submit: () => Promise<void>
}

export const useMessageStore = create<MessageState>((set, get) => ({
    // UI
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),

    // Data
    messages: [],
    getMessagesStatus: "initial",

    getMessages: async () => {
        try {
            set({ getMessagesStatus: "loading" })
            const snapshot = await getDocs(messageCollection)
            const messages = snapshot.docs.map((doc) => doc.data())
            set({ messages, getMessagesStatus: "success" })
        } catch (error) {
            console.error(error)
            set({ getMessagesStatus: "error" })
        }
    },

    // Form
    name: "",
    setName: (name) => set({ name }),

    message: "",
    setMessage: (message) => set({ message }),

    submit: async () => {
        const { name, message } = get()

        if (!name || !message) return

        await addDoc(messageCollection, {
            name,
            message,
            createdAt: new Date(),
        })

        await get().getMessages()

        // reset form
        set({ name: "", message: "" })

        // close modal
        get().closeModal()

        toast.success("Ucapan berhasil dikirim")
    },
}))
