import apiClient from "./axios";
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