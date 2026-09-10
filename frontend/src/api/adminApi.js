import apiClient from './axios';

export const adminApi = {
  //admin dashboard
    getDashboard: () => apiClient.get('/admin/dashboard'),
  // Specialties
  getSpecialties: () => apiClient.get('/specialties'),
  createSpecialty: (data) => apiClient.post('/admin/specialties', data),
  updateSpecialty: (id, data) => apiClient.put(`/admin/specialties/${id}`, data),
  deleteSpecialty: (id) => apiClient.delete(`/admin/specialties/${id}`),

  // Doctors
  getDoctors: () => apiClient.get('/doctors'),
  createDoctor: (data) => apiClient.post('/admin/doctors', data),
  updateDoctor: (id, data) => apiClient.put(`/admin/doctors/${id}`, data),
  deleteDoctor: (id)=>apiClient.delete(`/admin/doctors/${id}`),
};