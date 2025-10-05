import { create } from "zustand";

interface HomeState {
  name: string;
  phone: string;
  isAttend: boolean | null;
  pax: number | "";
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setIsAttend: (isAttend: boolean) => void;
  setPax: (pax: number | "") => void;
  reset: () => void;
}

const useHomeStore = create<HomeState>((set) => ({
  name: "",
  phone: "",
  isAttend: null,
  pax: "",
  setName: (name) => set({ name }),
  setPhone: (phone) => set({ phone }),
  setIsAttend: (isAttend) => set({ isAttend }),
  setPax: (pax) => set({ pax }),
  reset: () => set({ name: "", phone: "", isAttend: null, pax: "" }),
}));

export default useHomeStore;
