import { create } from 'zustand';
import { UserResponse } from '@/services/api/auth.service';

interface AuthStore {
  user: UserResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: UserResponse | null) => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setToken: (token) => set({ token, isAuthenticated: !!token }),
  clearAuth: () => {
    // Eliminar el token de localStorage
    localStorage.removeItem('token');
    // Limpiar el estado de autenticación
    set({ user: null, token: null, isAuthenticated: false });
  },
})); 