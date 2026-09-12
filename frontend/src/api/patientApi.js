import apiClient from './axios';

export const patientApi = {
  // Public / Booking Discovery
  getPublicDoctors: () => apiClient.get('/doctors'),
  getDoctorAvailabilities: (doctorId) => apiClient.get(`/doctors/${doctorId}/availabilities`),

  // Patient Dashboard & Appointments
  getDashboard: () => apiClient.get('/patient/dashboard'),
  createAppointment: (data) => apiClient.post('/patient/appointments', data),
  cancelAppointment: (id) => apiClient.post(`/patient/appointments/${id}/cancel`),

  // Medical Records & Prescriptions
  getMedicalRecord: () => apiClient.get('/patient/medical-record'),
  getPrescriptions: () => apiClient.get('/patient/prescriptions'),
  reissuePrescription: (id) => apiClient.post(`/patient/prescriptions/${id}/reissue`),
};