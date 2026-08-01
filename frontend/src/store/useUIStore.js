import { create } from 'zustand';

/**
 * Global UI state: sidebar collapse (desktop) and mobile drawer visibility.
 * Kept separate from useAuthStore since it's ephemeral, non-persisted UI state.
 */
export const useUIStore = create((set) => ({
  isSidebarCollapsed: false,
  isMobileSidebarOpen: false,

  toggleSidebarCollapsed: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  openMobileSidebar: () => set({ isMobileSidebarOpen: true }),
  closeMobileSidebar: () => set({ isMobileSidebarOpen: false }),
}));