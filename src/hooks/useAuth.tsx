
import { create } from "zustand"
import {User} from "@/lib/types/user";

interface AuthState {
    user: User | null
    loading: boolean
    setUser: (user: User | null) => void
    setLoading: (loading: boolean) => void
}

export const useAuth = create<AuthState>((set) => ({
    user: null,
    loading: true,
    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ loading })
}));