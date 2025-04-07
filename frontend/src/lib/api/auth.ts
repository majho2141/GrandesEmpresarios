import { api } from './axios';
import {
  LoginCredentials,
  RegisterCredentials,
  EntrepreneurInfo,
  User,
  VerificationData,
  PasswordResetRequest,
  PasswordReset,
} from '@/types/auth';

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await api.post<{ user: User; token: string }>(
      '/auth/login',
      credentials
    );
    return data;
  },

  register: async (credentials: RegisterCredentials) => {
    const { data } = await api.post<{ message: string }>('/auth/register', credentials);
    return data;
  },

  registerEntrepreneur: async (entrepreneurInfo: EntrepreneurInfo, userId: string) => {
    const { data } = await api.post<{ message: string }>(
      `/auth/register/entrepreneur/${userId}`,
      entrepreneurInfo
    );
    return data;
  },

  verifyEmail: async (verificationData: VerificationData) => {
    const { data } = await api.post<{ message: string }>(
      '/auth/verify-email',
      verificationData
    );
    return data;
  },

  resendVerification: async (email: string) => {
    const { data } = await api.post<{ message: string }>('/auth/resend-verification', {
      email,
    });
    return data;
  },

  requestPasswordReset: async (resetRequest: PasswordResetRequest) => {
    const { data } = await api.post<{ message: string }>(
      '/auth/request-password-reset',
      resetRequest
    );
    return data;
  },

  resetPassword: async (resetData: PasswordReset) => {
    const { data } = await api.post<{ message: string }>(
      '/auth/reset-password',
      resetData
    );
    return data;
  },

  getCurrentUser: async () => {
    const { data } = await api.get<{ user: User }>('/auth/me');
    return data;
  },

  logout: async () => {
    const { data } = await api.post<{ message: string }>('/auth/logout');
    return data;
  },

  loginWithGoogle: async (token: string) => {
    const { data } = await api.post<{ user: User; token: string }>(
      '/auth/google',
      { token }
    );
    return data;
  },
}; 