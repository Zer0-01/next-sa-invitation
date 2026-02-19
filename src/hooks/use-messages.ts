import { useState, useCallback } from "react";
import { addDoc, getDocs, DocumentData, query, orderBy } from "firebase/firestore";
import { messageCollection } from "@/lib/firebase";
import { toast } from "sonner";

export const useMessages = () => {
    const [messages, setMessages] = useState<DocumentData[]>([]);
    const [getMessagesStatus, setGetMessagesStatus] = useState<"initial" | "loading" | "success" | "error">("initial");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const getMessages = useCallback(async () => {
        try {
            setGetMessagesStatus("loading");
            // Added ordering by createdAt if possible, or just getDocs
            const q = query(messageCollection, orderBy("createdAt", "desc"));
            const snapshot = await getDocs(q);
            const msgs = snapshot.docs.map((doc) => doc.data());
            setMessages(msgs);
            setGetMessagesStatus("success");
        } catch (error) {
            console.error(error);
            setGetMessagesStatus("error");
        }
    }, []);

    const submit = async () => {
        if (!name.trim() || !message.trim()) return;

        setIsSubmitting(true);
        try {
            await addDoc(messageCollection, {
                name,
                message,
                createdAt: new Date(),
            });

            toast.success("Ucapan berhasil dikirim");
            setName("");
            setMessage("");
            closeModal();
            await getMessages();
        } catch (error) {
            console.error(error);
            toast.error("Gagal mengirim ucapan");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        messages,
        getMessagesStatus,
        getMessages,
        isSubmitting,
        name,
        setName,
        message,
        setMessage,
        isModalOpen,
        openModal,
        closeModal,
        submit
    };
};
