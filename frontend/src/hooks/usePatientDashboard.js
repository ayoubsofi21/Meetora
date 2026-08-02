import { useQuery } from '@tanstack/react-query';
import patientService from '@/services/patientService';

/** Fetches all data needed by the Patient Dashboard Overview page in one call. */
export function usePatientDashboard() {
  return useQuery({
    queryKey: ['patient', 'dashboard'],
    queryFn: patientService.getDashboard,
    staleTime: 60 * 1000,
  });
}