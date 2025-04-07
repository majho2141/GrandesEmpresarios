"use client"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/api/auth.service';
import { AuthState, LoginCredentials, RegisterCredentials, User } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
    isAuthenticated: false,
  });

  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setState((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      const { user } = await authService.getCurrentUser();
      setState({
        user,
        isLoading: false,
        error: null,
        isAuthenticated: true,
      });
    } catch (error) {
      setState({
        user: null,
        isLoading: false,
        error: 'Error al verificar la autenticación',
        isAuthenticated: false,
      });
      localStorage.removeItem('token');
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const { user, token } = await authService.login(credentials);
      localStorage.setItem('token', token);
      setState({
        user,
        isLoading: false,
        error: null,
        isAuthenticated: true,
      });
      router.push('/profile');
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Credenciales inválidas',
      }));
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      await authService.register(credentials);
      setState((prev) => ({ ...prev, isLoading: false }));
      router.push('/verify-email');
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Error al registrar el usuario',
      }));
    }
  };

  const logout = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      await authService.logout();
      localStorage.removeItem('token');
      setState({
        user: null,
        isLoading: false,
        error: null,
        isAuthenticated: false,
      });
      router.push('/');
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Error al cerrar sesión',
      }));
    }
  };

  const loginWithGoogle = async (token: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const { user, token: authToken } = await authService.loginWithGoogle(token);
      localStorage.setItem('token', authToken);
      setState({
        user,
        isLoading: false,
        error: null,
        isAuthenticated: true,
      });
      router.push('/profile');
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Error al iniciar sesión con Google',
      }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
} 