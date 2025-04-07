import api from './axios';
import { AUTH_ENDPOINTS } from '@/constants/endpoints';
import { objectToFormData } from '@/utils/form';
import { UserRole } from '@/store/useAuthStore';

interface LoginResponse {
  user: {
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
  };
  token: string;
  refreshToken: string;
}

interface RegisterData {
  nombre: string;
  apellido: string;
  email: string;
  cedula: string;
  telefono: string;
  password: string;
  tipoUsuario: 'cliente' | 'emprendedor';
  emprendimiento?: {
    nombre: string;
    descripcion: string;
    nit: string;
    direccion: string;
  };
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const formData = objectToFormData({ email, password });
    const { data } = await api.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return data;
  },

  async loginWithGoogle(token: string): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>(AUTH_ENDPOINTS.GOOGLE_LOGIN, { token });
    return data;
  },

  async register(userData: RegisterData): Promise<void> {
    await api.post(AUTH_ENDPOINTS.REGISTER, userData);
  },

  async verifyEmail(email: string, code: string): Promise<void> {
    await api.post(AUTH_ENDPOINTS.VERIFY_EMAIL, { email, code });
  },

  async resendVerificationCode(email: string): Promise<void> {
    await api.post(AUTH_ENDPOINTS.RESEND_VERIFICATION, { email });
  },

  async forgotPassword(email: string, cedula: string): Promise<void> {
    await api.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email, cedula });
  },

  async resetPassword(token: string, password: string): Promise<void> {
    await api.post(`${AUTH_ENDPOINTS.RESET_PASSWORD}/${token}`, { password });
  },
}; 