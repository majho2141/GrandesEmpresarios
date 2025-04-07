import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'cliente' | 'emprendedor' | 'admin';

interface UserData {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  cedula: string;
  telefono: string;
  role: UserRole;
  emprendimiento?: {
    id: string;
    nombre: string;
    descripcion: string;
    nit: string;
    direccion: string;
  };
}

interface AuthState {
  user: UserData | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setUser: (user: UserData | null) => void;
  setTokens: (token: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),
      setTokens: (token, refreshToken) =>
        set({
          token,
          refreshToken,
        }),
      clearAuth: () =>
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
); 