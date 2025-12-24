import { DocumentData, getDocs } from "firebase/firestore"
import { create } from "zustand"
import { messageCollection } from "../firebase"

interface MessageState {
    messages: DocumentData[]
    getMessages: () => void,
    getMessagesStatus: "initial" | "loading" | "success" | "error"
}

export const useMessageStore = create<MessageState>((set) => ({
    messages: [],
    getMessages: async () => {
        try {
            set({ getMessagesStatus: "loading" })
            const querySnapshot = await getDocs(messageCollection)
            const messages = querySnapshot.docs.map((doc) => doc.data())
            console.log("Messages:", messages)
            set({ getMessagesStatus: "success", messages: messages })

        } catch (error) {
            console.log(error)
            set({ getMessagesStatus: "error" })
        }
    },
    getMessagesStatus: "initial"

}))

