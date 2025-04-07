import api from './axios';
import { AUTH_ENDPOINTS } from '@/constants/endpoints';

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  document_id: string;
  address: string;
  enterprise_id?: number;
  role_id?: number;
  document_verified: boolean;
  is_active: boolean;
  role?: {
    id: number;
    name: string;
    description: string;
  };
  enterprise?: {
    id: number;
    name: string;
    NIT: string;
    email: string;
    phone_number: string;
    currency: string;
    description: string;
    address: string;
  };
}

export interface RegisterData {
  name: string;
  email: string;
  phone_number: string;
  document_id: string;
  address: string;
  password: string;
  enterprise?: {
    name: string;
    NIT: string;
    email: string;
    phone_number: string;
    currency: string;
    description: string;
    address: string;
  };
}

export interface UserUpdateRequest {
  name?: string;
  email?: string;
  phone_number?: string;
  address?: string;
  password?: string;
  role_id?: number;
  document_verified?: boolean;
  is_active?: boolean;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, {
      email,
      password,
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

  async verifyEmail(code: string, email: string): Promise<void> {
    await api.post(AUTH_ENDPOINTS.VERIFY_CODE, null, {
      params: { email, code }
    });
  },

  async verifyCode(email: string, code: string): Promise<void> {
    await api.post(AUTH_ENDPOINTS.VERIFY_CODE, null, {
      params: { email, code }
    });
  },

  async resendVerificationCode(email: string): Promise<void> {
    await api.post(AUTH_ENDPOINTS.RESEND_CODE, null, {
      params: { email }
    });
  },

  async forgotPassword(email: string): Promise<void> {
    await api.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email });
  },

  async resetPassword(token: string, new_password: string): Promise<void> {
    await api.post(AUTH_ENDPOINTS.RESET_PASSWORD, {
      token,
      new_password
    });
  },

  async getCurrentUser(): Promise<UserResponse> {
    const { data } = await api.get<UserResponse>(AUTH_ENDPOINTS.CURRENT_USER);
    return data;
  },

  async changePassword(old_password: string, new_password: string): Promise<void> {
    await api.patch(AUTH_ENDPOINTS.CHANGE_PASSWORD, {
      old_password,
      new_password
    });
  },

  async logout(): Promise<void> {
    // Eliminar token del localStorage
    localStorage.removeItem('token');
    
    // Opcional: notificar al backend (si hay un endpoint para cerrar sesión)
    // try {
    //   await api.post('/auth/logout');
    // } catch (error) {
    //   console.error('Error al cerrar sesión en el servidor:', error);
    // }
  },

  async updateUser(documentId: string, userData: UserUpdateRequest): Promise<UserResponse> {
    const { data } = await api.put<UserResponse>(`/auth/users/${documentId}`, userData);
    return data;
  }
}; 