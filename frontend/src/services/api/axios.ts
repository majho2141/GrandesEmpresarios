import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';
import { AUTH_ENDPOINTS } from '@/constants/endpoints';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 y no es un reintento de refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        const response = await axios.post(`${baseURL}${AUTH_ENDPOINTS.REFRESH_TOKEN}`, {
          refreshToken,
        });

        const { token } = response.data;
        useAuthStore.getState().setTokens(token, refreshToken as string);

        // Reintentar la petición original con el nuevo token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (error) {
        // Si falla el refresh, limpiar el store y redirigir al login
        useAuthStore.getState().clearAuth();
        window.location.href = '/auth/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api; 