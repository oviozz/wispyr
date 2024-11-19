
import { create } from 'zustand';

interface SidebarStore {
    isOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
    openSidebar: () => void;
}

export const useMessageSidebarControl = create<SidebarStore>((set) => ({
    isOpen: true,
    toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
    closeSidebar: () => set({ isOpen: false }),
    openSidebar: () => set({ isOpen: true }),
}));