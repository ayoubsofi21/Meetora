import apiClient from './axios';

export const adminApi = {
  // Specialties
  getSpecialties: () => apiClient.get('/specialties'),
  createSpecialty: (data) => apiClient.post('/admin/specialties', data),
  updateSpecialty: (id, data) => apiClient.put(`/admin/specialties/${id}`, data),
  deleteSpecialty: (id) => apiClient.delete(`/admin/specialties/${id}`),

  // Doctors
  getDoctors: () => apiClient.get('/admin/doctors'),
  createDoctor: (data) => apiClient.post('/admin/doctors', data),
  updateDoctor: (id, data) => apiClient.put(`/admin/doctors/${id}`, data),
};