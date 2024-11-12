import { create } from "zustand";

interface IToaster {
  message: string;
  type: "success" | "error" | "info";
  id: number
}

interface ToasterState {
  toasters: IToaster[];
  setToast: (message: string, type: "success" | "error") => void;
}

export const useToasterStore = create<ToasterState>(set => ({
  toasters: [],
  setToast: (message, type) => {
    const toastId = Date.now();
    set(state => ({
      toasters: [
        ...state.toasters,
        {
          message,
          type,
          id: toastId
        }
      ]
    }));
    setTimeout(() => {
      set(state => ({
        toasters: state.toasters.filter(t => t.id !== toastId)
      }));
    }, 3000);
  },
}))