import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,

  headers: {
    Accept: 'application/json',
  },

  timeout: 10000,
});

// Injection automatique du token Sanctum
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('meetora_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Gestion globale des erreurs 401
apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('meetora_token');
      localStorage.removeItem('meetora_user');

      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;