import apiClient from './axios';
export const doctorApi = {
  // Availabilities
  getAvailabilities: () => apiClient.get('/doctor/availabilities'),
  createAvailability: (data) => apiClient.post('/doctor/availabilities', data),
  updateAvailability: (id, data) => apiClient.put(`/doctor/availabilities/${id}`, data),
  deleteAvailability: (id) => apiClient.delete(`/doctor/availabilities/${id}`),

  // Dashboard & Queue
  getDashboard: () => apiClient.get('/doctor/dashboard'),
  getAppointments: (params) => apiClient.get('/doctor/appointments', { params }),
  getAppointmentById: (id) => apiClient.get(`/doctor/appointments/${id}`),

  // Actions sur les Rendez-vous
  confirmAppointment: (id) => apiClient.patch(`/doctor/appointments/${id}/confirm`),
  cancelAppointment: (id) => apiClient.patch(`/doctor/appointments/${id}/cancel`),
  completeAppointment: (id) => apiClient.patch(`/doctor/appointments/${id}/complete`),

  // Patient & Consultation
  getPatients: () => apiClient.get('/doctor/patients'),
  getPatientDetail: (patientId) => apiClient.get(`/doctor/patients/${patientId}`),
  getPatientMedicalRecord: (patientId) => apiClient.get(`/doctor/patients/${patientId}/medical-record`),
  createConsultation: (appointmentId, data) => apiClient.post(`/doctor/appointments/${appointmentId}/consultation`, data),
  createPrescription: (consultationId, data) => apiClient.post(`/doctor/consultations/${consultationId}/prescriptions`, data),
};