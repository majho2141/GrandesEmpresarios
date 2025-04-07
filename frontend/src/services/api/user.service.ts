import api from './axios';
import { USER_ENDPOINTS } from '@/constants/endpoints';
import { UserRole } from '@/store/useAuthStore';

interface UserProfile {
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

interface UpdateProfileData {
  nombre?: string;
  apellido?: string;
  email?: string;
  cedula?: string;
  telefono?: string;
  emprendimiento?: {
    nombre?: string;
    descripcion?: string;
    nit?: string;
    direccion?: string;
  };
}

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const userService = {
  async getProfile(): Promise<UserProfile> {
    const { data } = await api.get<UserProfile>(USER_ENDPOINTS.PROFILE);
    return data;
  },

  async updateProfile(profileData: UpdateProfileData): Promise<UserProfile> {
    const { data } = await api.put<UserProfile>(USER_ENDPOINTS.UPDATE_PROFILE, profileData);
    return data;
  },

  async changePassword(passwordData: ChangePasswordData): Promise<void> {
    await api.post(USER_ENDPOINTS.CHANGE_PASSWORD, passwordData);
  },

  async deactivateAccount(): Promise<void> {
    await api.post(USER_ENDPOINTS.DEACTIVATE_ACCOUNT);
  },
}; 