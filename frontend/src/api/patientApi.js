import apiClient from './axios';
export const patientApi = {
  getPublicDoctors: () => apiClient.get('/doctors'),
  getDoctorAvailabilities: (doctorId) => apiClient.get(`/doctors/${doctorId}/availabilities`),

  getDashboard: () => apiClient.get('/patient/dashboard'),
  createAppointment: (data) => apiClient.post('/patient/appointments', data),
  cancelAppointment: (id) =>apiClient.patch(`/patient/appointments/${id}/cancel`),

  getMedicalRecord: () => apiClient.get('/patient/medical-record'),
  getPrescriptions: () => apiClient.get('/patient/prescriptions'),
  reissuePrescription: (id) => apiClient.post(`/patient/prescriptions/${id}/reissue`),
};