export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'entrepreneur';
  isVerified: boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  role: 'client' | 'entrepreneur';
}

export interface EntrepreneurInfo {
  companyName: string;
  description: string;
  phone: string;
  address: string;
  nit: string;
}

export interface VerificationData {
  code: string;
  email: string;
}

export interface PasswordResetRequest {
  email: string;
  documentId: string;
}

export interface PasswordReset {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
} 