import { create } from "zustand";

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
    setPax: (pax) => set({ pax })
}))