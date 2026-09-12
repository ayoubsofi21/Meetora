import apiClient from './axios';
export const authApi = {
  login: (data) => apiClient.post('/auth/login', data),
  logout: () => apiClient.post('/auth/logout'),
  register: (data) => apiClient.post('/auth/register', data),
  getCurrentUser: () => apiClient.get('/auth/user'),
};