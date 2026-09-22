import apiClient from "./axios";

export const publicApi = {
  getDoctors: (page = 1) => apiClient.get("/doctors", { params: {page: page,},}),
  getDoctor: (id) => apiClient.get(`/doctors/${id}`),
  getSpecialties: () => apiClient.get("/specialties"),
};