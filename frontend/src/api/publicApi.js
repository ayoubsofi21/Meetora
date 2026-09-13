import apiClient from './axios';
export const publicApi={
    getSpecialities: ()=>apiClient.get('/specialities'),
    getDoctors: (params = {}) =>apiClient.get('/doctors', { params }),
    getDoctor: (specialityId)=>apiClient.get(`/doctors/${specialityId}`),
}