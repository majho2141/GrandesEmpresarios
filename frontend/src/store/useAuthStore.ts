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

// Obtener el token inicial del localStorage
const getInitialToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: getInitialToken(),
  isAuthenticated: !!getInitialToken(),
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token, isAuthenticated: !!token });
  },
  clearAuth: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },
})); 