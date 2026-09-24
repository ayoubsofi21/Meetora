import apiClient from "./axios";

export const patientApi = {
  getPublicDoctors: () => apiClient.get("/doctors"),
  getDoctorAvailabilities: (doctorId) =>apiClient.get(`/doctors/${doctorId}/availabilities`),

  getDashboard: () => apiClient.get("/patient/dashboard"),
  // Appointments
  createAppointment: (data) => apiClient.post("/patient/appointments", data),
  cancelAppointment: (id) =>apiClient.patch(`/patient/appointments/${id}/cancel`),
  // Medical Records
  getMedicalRecord: () => apiClient.get("/patient/medical-record"),
  getMedicalHistory: () => apiClient.get("/patient/medical-history"),
  updateMedicalRecord: (data) => apiClient.put("/patient/medical-record", data),
  // Prescriptions
  getPrescriptions: () => apiClient.get("/patient/prescriptions"),
  reissuePrescription: (id) =>apiClient.post(`/patient/prescriptions/${id}/reissue`),
  downloadPrescription: (id) =>
    apiClient.get(`/patient/prescriptions/${id}/download`, {
      responseType: 'blob',
    }),
};
