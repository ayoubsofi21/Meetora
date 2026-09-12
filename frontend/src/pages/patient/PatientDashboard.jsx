import { useState, useEffect } from 'react';
import { patientApi } from '../../api/patientApi';
import BookAppointmentModal from '../../components/modals/BookAppointmentModal';
import { Calendar, Plus, Clock, UserCheck, AlertCircle, Loader2, XCircle } from 'lucide-react';

export default function PatientDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelLoading, setCancelLoading] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch real patient dashboard data from Laravel backend
  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await patientApi.getDashboard();
      const data = response.data.data || response.data || {};
      setDashboardData(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load patient dashboard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // Cancel appointment via PATCH /api/patient/appointments/{id}/cancel
  const handleCancelAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      setCancelLoading(id);
      await patientApi.cancelAppointment(id);
      await fetchDashboard();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel appointment.');
    } finally {
      setCancelLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-[#DCFCE7] text-[#166534]';
      case 'completed':
        return 'bg-[#E0E7FF] text-[#3730A3]';
      case 'cancelled':
        return 'bg-[#FEE2E2] text-[#991B1B]';
      default:
        return 'bg-[#FEF3C7] text-[#92400E]';
    }
  };

  const appointmentsList = dashboardData?.appointments || dashboardData?.upcoming_appointments || [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Patient Overview</h1>
          <p className="text-sm text-[#475569]">Manage your upcoming visits and healthcare reservations</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="h-11 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Book Appointment</span>
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] flex items-center gap-2 text-[#DC2626] text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#64748B] uppercase">Total Appointments</p>
                <p className="text-2xl font-bold text-[#0F172A]">
                  {dashboardData?.total_appointments ?? appointmentsList.length}
                </p>
              </div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#64748B] uppercase">Pending Requests</p>
                <p className="text-2xl font-bold text-[#0F172A]">
                  {dashboardData?.pending_appointments ?? appointmentsList.filter(a => a.status === 'pending').length}
                </p>
              </div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#64748B] uppercase">Confirmed Sessions</p>
                <p className="text-2xl font-bold text-[#0F172A]">
                  {dashboardData?.confirmed_appointments ?? appointmentsList.filter(a => a.status === 'confirmed').length}
                </p>
              </div>
            </div>
          </div>

          {/* Appointments Table */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-[#0F172A]">Your Appointments Queue</h2>

            {appointmentsList.length === 0 ? (
              <p className="text-sm text-[#94A3B8] text-center py-8">No appointment records found in database.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] text-[#64748B] uppercase text-xs">
                      <th className="pb-3">Doctor</th>
                      <th className="pb-3">Date & Time</th>
                      <th className="pb-3">Reason</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {appointmentsList.map((apt) => {
                      const doctorName = apt.doctor?.name || apt.doctor_name || 'Practitioner';
                      const status = (apt.status || 'pending').toLowerCase();

                      return (
                        <tr key={apt.id} className="hover:bg-[#F8FAFC]">
                          <td className="py-3.5 font-semibold text-[#0F172A]">
                            {doctorName}
                          </td>
                          <td className="py-3.5 text-[#475569]">
                            <p className="font-medium text-[#0F172A]">{apt.appointment_date}</p>
                            <p className="text-xs text-[#64748B]">{apt.start_time} - {apt.end_time}</p>
                          </td>
                          <td className="py-3.5 text-[#475569] max-w-xs truncate">
                            {apt.reason || 'General Consultation'}
                          </td>
                          <td className="py-3.5">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(status)}`}>
                              {status}
                            </span>
                          </td>
                          <td className="py-3.5 text-right">
                            {status === 'pending' && (
                              <button
                                onClick={() => handleCancelAppointment(apt.id)}
                                disabled={cancelLoading === apt.id}
                                className="text-xs text-[#DC2626] hover:bg-[#FEE2E2] px-3 py-1.5 rounded-lg transition-all font-semibold inline-flex items-center gap-1 disabled:opacity-50"
                              >
                                {cancelLoading === apt.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
                                <span>Cancel</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Appointment Booking Modal */}
      <BookAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchDashboard}
      />
    </div>
  );
}