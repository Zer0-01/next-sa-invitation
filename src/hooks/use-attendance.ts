import { useState } from "react";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { attendanceCollection } from "@/lib/firebase";
import { toast } from "sonner";

export const useAttendance = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [isAttend, setIsAttend] = useState(true);
    const [pax, setPax] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const resetForm = () => {
        setName("");
        setIsAttend(true);
        setPax(1);
    };

    const submit = async () => {
        const normalizedName = name.trim();

        if (!normalizedName) return;

        setIsSubmitting(true);
        try {
            const docRef = await addDoc(attendanceCollection, {
                name: normalizedName,
                isAttend: isAttend,
                pax: isAttend ? pax : 0,
                createdAt: serverTimestamp(),
            });
            console.log("Document written with Id: ", docRef.id);

            toast.success("Kehadiran berjaya disimpan");
            resetForm();
            closeModal();
        } catch (error) {
            console.error("Error adding document: ", error);
            toast.error("Gagal menyimpan kehadiran");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
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
    };
};
