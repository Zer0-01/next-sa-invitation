import { create } from "zustand"

interface GuestbookState {
    name: string
    message: string
    setName: (name: string) => void
    setMessage: (message: string) => void
    reset: () => void
}

const useGuestbookStore = create<GuestbookState>((set) => ({
    name: "",
    message: "",
    setName: (name: string) => set({ name }),
    setMessage: (message: string) => set({ message }),
    reset: () => set({ name: "", message: "" })
}))

export default useGuestbookStore