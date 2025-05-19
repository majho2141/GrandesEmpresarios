import { UserResponse } from '@/services/api/auth.service';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Enterprise {
  name: string;
  NIT: string;
  email: string;
  phone_number: string;
  currency: string;
  description: string;
  address: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  phone_number: string;
  document_id: string;
  address: string;
  password: string;
  enterprise?: Enterprise;
}

export interface VerificationData {
  token: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  token: string;
  new_password: string;
}

export type User = UserResponse;

export enum UserRole {
  ADMIN = 'admin',
  EMPRENDEDOR = 'emprendedor',
  CLIENTE = 'cliente'
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
} 