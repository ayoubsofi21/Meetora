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

export const doctorApi = {
  // Availabilities
  getAvailabilities: () => apiClient.get('/doctor/availabilities'),
  createAvailability: (data) => apiClient.post('/doctor/availabilities', data),
  deleteAvailability: (id) => apiClient.delete(`/doctor/availabilities/${id}`),

  // Appointments
  getDashboard: () => apiClient.get('/doctor/dashboard'),
  getAppointments: (params) => apiClient.get('/doctor/appointments', { params }),
  confirmAppointment: (id) => apiClient.post(`/doctor/appointments/${id}/confirm`),
  startSession: (id) => apiClient.post(`/doctor/appointments/${id}/start`),
  completeAppointment: (id) => apiClient.post(`/doctor/appointments/${id}/complete`),
};