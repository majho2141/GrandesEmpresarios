export const AUTH_ENDPOINTS = {
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_EMAIL: '/verify-email',
  VERIFY_CODE: '/verify-code',
  RESEND_CODE: '/resend-code',
  FORGOT_PASSWORD: '/password-reset/request',
  RESET_PASSWORD: '/password-reset/confirm',
  CURRENT_USER: '/users/me',
  CHANGE_PASSWORD: '/auth/change-password',
  GOOGLE_LOGIN: '/auth/google',
  REFRESH_TOKEN: '/auth/refresh',
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