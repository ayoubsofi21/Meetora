import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '@/config/constants';
import { useAuthStore } from '@/store/useAuthStore';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Attach Sanctum bearer token if present
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Global response/error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    if (status === 401) {
      useAuthStore.getState().logout();
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    } else if (status === 403) {
      toast.error(message || "Vous n'avez pas accès à cette ressource.");
    } else if (status === 422) {
      // Validation errors are handled by the calling form via error.response.data.errors
    } else if (status >= 500) {
      toast.error('Une erreur serveur est survenue. Veuillez réessayer.');
    } else if (!error.response) {
      toast.error('Impossible de contacter le serveur.');
    }

    return Promise.reject(error);
  },
);

export default api;