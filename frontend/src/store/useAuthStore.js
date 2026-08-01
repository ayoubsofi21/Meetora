import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * @typedef {'patient'|'doctor'|'secretary'|'admin'} UserRole
 * @typedef {{ id: number, firstName: string, lastName: string, email: string, role: UserRole, avatarUrl?: string }} AuthUser
 */

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      /** @param {AuthUser} user @param {string} token */
      login: (user, token) => set({ user, token, isAuthenticated: true }),

      logout: () => set({ user: null, token: null, isAuthenticated: false }),

      updateUser: (partialUser) =>
        set((state) => ({ user: state.user ? { ...state.user, ...partialUser } : null })),

      hasRole: (role) => get().user?.role === role,
      hasAnyRole: (roles = []) => roles.includes(get().user?.role),
    }),
    {
      name: 'meetora-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    },
  ),
);