import { create } from 'zustand';
import { UserResponse } from '@/services/api/auth.service';
import { UserRole } from '@/types/user';

interface AuthStore {
  user: UserResponse | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  setUser: (user: UserResponse | null) => void;
  setToken: (token: string) => void;
  setTokens: (token: string, refreshToken: string) => void;
  setRole: (role: UserRole) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  role: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setToken: (token) => set({ token, isAuthenticated: !!token }),
  setTokens: (token, refreshToken) => set({ token, refreshToken, isAuthenticated: !!token }),
  setRole: (role) => set({ role }),
  clearAuth: () => {
    // Eliminar los tokens de localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    // Limpiar el estado de autenticación
    set({ user: null, token: null, refreshToken: null, isAuthenticated: false, role: null });
  },
})); 