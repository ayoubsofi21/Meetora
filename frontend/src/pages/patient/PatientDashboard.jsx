import { useState, useEffect } from 'react';
import { patientApi } from '../../api/patientApi';
import BookAppointmentModal from '../../components/modals/BookAppointmentModal';
import {
  Calendar,
  Plus,
  Clock,
  UserCheck,
  AlertCircle,
  Loader2,
  XCircle,
} from 'lucide-react';

export default function PatientDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelLoading, setCancelLoading] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch patient dashboard data
  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await patientApi.getDashboard();
      const data = response.data.data || response.data || {};

      setDashboardData(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to load patient dashboard.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // Cancel appointment
  const handleCancelAppointment = async (id) => {
    if (
      !window.confirm(
        'Are you sure you want to cancel this appointment?'
      )
    ) {
      return;
    }

    try {
      setCancelLoading(id);

      await patientApi.cancelAppointment(id);
      await fetchDashboard();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to cancel appointment.'
      );
    } finally {
      setCancelLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-[#D1FAE5] text-[#059669]';

      case 'completed':
        return 'bg-[#EEF2FF] text-[#3F38CA]';

      case 'cancelled':
        return 'bg-[#FEE2E2] text-[#DC2626]';

      default:
        return 'bg-[#FEF3C7] text-[#D97706]';
    }
  };

  const appointmentsList =
    dashboardData?.appointments ||
    dashboardData?.upcoming_appointments ||
    [];

  const totalAppointments =
    dashboardData?.total_appointments ??
    appointmentsList.length;

  const pendingAppointments =
    dashboardData?.pending_appointments ??
    appointmentsList.filter(
      (appointment) => appointment.status === 'pending'
    ).length;

  const confirmedAppointments =
    dashboardData?.confirmed_appointments ??
    appointmentsList.filter(
      (appointment) => appointment.status === 'confirmed'
    ).length;

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A]">
            Patient Overview
          </h1>

          <p className="text-sm text-[#64748B] mt-1">
            Manage your upcoming visits and healthcare reservations
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="h-12 px-6 bg-[#3F38CA] hover:bg-[#312E81]
            text-white font-semibold rounded-xl text-sm
            transition-all flex items-center justify-center
            gap-2.5 shrink-0"
        >
          <Plus className="w-5 h-5" />

          <span>Book Appointment</span>
        </button>
      </div>

      {/* Error */}
      {error && (
        <div
          className="p-4 rounded-xl bg-[#FEE2E2]
            border border-[#FCA5A5]
            flex items-center gap-3
            text-[#DC2626] text-sm"
        >
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-9 h-9 text-[#3F38CA] animate-spin" />
        </div>
      ) : (
        <div className="space-y-6">

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Total Appointments */}
            <StatCard
              icon={Calendar}
              iconBg="bg-[#EEF2FF]"
              iconColor="text-[#3F38CA]"
              label="Total Appointments"
              value={totalAppointments}
            />

            {/* Pending */}
            <StatCard
              icon={Clock}
              iconBg="bg-[#FEF3C7]"
              iconColor="text-[#D97706]"
              label="Pending Requests"
              value={pendingAppointments}
            />

            {/* Confirmed */}
            <StatCard
              icon={UserCheck}
              iconBg="bg-[#D1FAE5]"
              iconColor="text-[#059669]"
              label="Confirmed Sessions"
              value={confirmedAppointments}
            />
          </div>

          {/* Appointments */}
          <div
            className="bg-white rounded-2xl
              border border-[#E2E8F0]
              p-6 shadow-sm"
          >
            {/* Section Header */}
            <div className="mb-5">
              <h2 className="text-xl font-bold text-[#0F172A]">
                Your Appointments Queue
              </h2>

              <p className="text-sm text-[#64748B] mt-1">
                View and manage your scheduled medical appointments
              </p>
            </div>

            {appointmentsList.length === 0 ? (
              <div className="text-center py-12">
                <div
                  className="w-12 h-12 mx-auto rounded-xl
                    bg-[#EEF2FF]
                    flex items-center justify-center mb-4"
                >
                  <Calendar className="w-6 h-6 text-[#3F38CA]" />
                </div>

                <p className="text-sm font-semibold text-[#475569]">
                  No appointments found
                </p>

                <p className="text-sm text-[#94A3B8] mt-1">
                  Your scheduled appointments will appear here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">

                  {/* Table Header */}
                  <thead>
                    <tr
                      className="border-b border-[#E2E8F0]
                        text-[#64748B] text-sm"
                    >
                      <th className="pb-4 font-semibold">
                        Doctor
                      </th>

                      <th className="pb-4 font-semibold">
                        Date & Time
                      </th>

                      <th className="pb-4 font-semibold">
                        Reason
                      </th>

                      <th className="pb-4 font-semibold">
                        Status
                      </th>

                      <th className="pb-4 font-semibold text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {appointmentsList.map((apt) => {
                      const doctorName =
                        apt.doctor?.name ||
                        apt.doctor_name ||
                        'Practitioner';

                      const status = (
                        apt.status || 'pending'
                      ).toLowerCase();

                      return (
                        <tr
                          key={apt.id}
                          className="hover:bg-[#F8FAFC]
                            transition-colors duration-200"
                        >
                          {/* Doctor */}
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-10 h-10 rounded-full
                                  bg-[#EEF2FF]
                                  text-[#3F38CA]
                                  font-bold text-sm
                                  flex items-center justify-center
                                  shrink-0"
                              >
                                {doctorName.charAt(0).toUpperCase()}
                              </div>

                              <div>
                                <p className="text-sm font-semibold text-[#0F172A]">
                                  {doctorName}
                                </p>

                                <p className="text-xs text-[#94A3B8] mt-0.5">
                                  Practitioner
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Date */}
                          <td className="py-4">
                            <p className="text-sm font-medium text-[#0F172A]">
                              {apt.appointment_date}
                            </p>

                            <p className="text-xs text-[#64748B] mt-1">
                              {apt.start_time} - {apt.end_time}
                            </p>
                          </td>

                          {/* Reason */}
                          <td
                            className="py-4 text-sm
                              text-[#475569]
                              max-w-xs truncate"
                          >
                            {apt.reason || 'General Consultation'}
                          </td>

                          {/* Status */}
                          <td className="py-4">
                            <span
                              className={`inline-flex px-3 py-1.5
                                rounded-full text-xs font-semibold
                                capitalize ${getStatusBadge(status)}`}
                            >
                              {status}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-4 text-right">
                            {status === 'pending' && (
                              <button
                                onClick={() =>
                                  handleCancelAppointment(apt.id)
                                }
                                disabled={
                                  cancelLoading === apt.id
                                }
                                className="h-10 px-3
                                  inline-flex items-center
                                  justify-center gap-2
                                  text-sm font-semibold
                                  text-[#DC2626]
                                  hover:bg-[#FEE2E2]
                                  rounded-xl transition-all
                                  disabled:opacity-50"
                              >
                                {cancelLoading === apt.id ? (
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                  <XCircle className="w-5 h-5" />
                                )}

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

      {/* Appointment Modal */}
      <BookAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchDashboard}
      />
    </div>
  );
}


/* ================================
   Reusable Stat Card
================================ */

function StatCard({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  value,
}) {
  return (
    <div
      className="bg-white rounded-2xl
        border border-[#E2E8F0]
        p-6 shadow-sm
        hover:shadow-md transition-all"
    >
      <div
        className={`w-11 h-11 rounded-xl
          ${iconBg}
          flex items-center justify-center mb-5`}
      >
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>

      <p className="text-sm font-medium text-[#64748B]">
        {label}
      </p>

      <p className="text-3xl font-bold text-[#0F172A] mt-1">
        {value}
      </p>
    </div>
  );
}