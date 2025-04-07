export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  VERIFY_EMAIL: '/auth/verify',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  REFRESH_TOKEN: '/auth/refresh',
  GOOGLE_LOGIN: '/auth/google',
} as const;

export const USER_ENDPOINTS = {
  PROFILE: '/users/profile',
  UPDATE_PROFILE: '/users/profile',
  CHANGE_PASSWORD: '/users/change-password',
  DEACTIVATE_ACCOUNT: '/users/deactivate',
} as const;

export const PRODUCT_ENDPOINTS = {
  LIST: '/products',
  DETAIL: (id: string) => `/products/${id}`,
  CREATE: '/products',
  UPDATE: (id: string) => `/products/${id}`,
  DELETE: (id: string) => `/products/${id}`,
  FILTER: '/products/filter',
  CATEGORIES: '/products/categories',
} as const;

export const ENTREPRENEUR_ENDPOINTS = {
  LIST: '/entrepreneurs',
  DETAIL: (id: string) => `/entrepreneurs/${id}`,
  UPDATE: (id: string) => `/entrepreneurs/${id}`,
  PRODUCTS: (id: string) => `/entrepreneurs/${id}/products`,
  STATISTICS: (id: string) => `/entrepreneurs/${id}/statistics`,
} as const;

export const CONTACT_ENDPOINTS = {
  SEND_MESSAGE: '/contact',
} as const; 