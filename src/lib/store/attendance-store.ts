import { addDoc } from "firebase/firestore";
import { create } from "zustand";
import { attendanceCollection } from "../firebase";

interface AttendanceState {
    isModalOpen: boolean,
    openModal: () => void,
    closeModal: () => void,
    name: string,
    setName: (name: string) => void,
    isAttend: boolean,
    setIsAttend: (isAttend: boolean) => void
    pax: number,
    setPax: (pax: number) => void
    submit: () => void

}

export const useAttendanceStore = create<AttendanceState>((set) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
    name: "",
    setName: (name) => set({ name }),
    isAttend: true,
    setIsAttend: (isAttend) => set({ isAttend }),
    pax: 1,
    setPax: (pax) => set({ pax }),
    submit: async () => {
        const { name, isAttend, pax } = useAttendanceStore.getState()
        try {
            const docRef = await addDoc(attendanceCollection, {
                name: name,
                isAttend: isAttend,
                pax: isAttend ? pax : 0
            })
            console.log("Document written with Id: ", docRef.id)
            set({ name: "", isAttend: true, pax: 1 })
        } catch (error) {
            console.error("Error adding document: ", error)

        }
    }
}))