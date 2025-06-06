
import { create } from "zustand";

interface AppState {
  loading: boolean;
  setLoading: (v: boolean) => void;
  error: string | null;
  setError: (e: string | null) => void;
  settings: Record<string, unknown>;
  updateSettings: (s: Partial<Record<string, unknown>>) => void;
}

export const appStore = create<AppState>()((set) => ({
  loading: false,
  setLoading: (v) => set({ loading: v }),
  error: null,
  setError: (e) => set({ error: e }),
  settings: {},
  updateSettings: (s) => set((st) => ({ settings: { ...st.settings, ...s } })),
}));
