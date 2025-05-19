import api from './axios';
import { USER_ENDPOINTS } from '@/constants/endpoints';
import { UserRole } from '@/types/user';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  document_id: string;
  phone_number: string;
  role: UserRole;
  enterprise?: {
    id: string;
    name: string;
    description: string;
    NIT: string;
    address: string;
  };
}

interface UpdateProfileData {
  name?: string;
  email?: string;
  document_id?: string;
  phone_number?: string;
  enterprise?: {
    name?: string;
    description?: string;
    NIT?: string;
    address?: string;
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