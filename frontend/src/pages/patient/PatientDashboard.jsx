import { useState, useEffect } from 'react';
import { patientApi } from '../../api/patientApi';
import BookAppointmentModal from '../../components/modals/BookAppointmentModal';
import { Calendar, Plus, Clock, Stethoscope, AlertCircle, Loader2 } from 'lucide-react';

export default function PatientDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await patientApi.getDashboard();
      setData(res.data.data || res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Patient Portal</h1>
          <p className="text-sm text-[#475569]">Manage your upcoming appointments and healthcare records</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="h-11 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm shrink-0"
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

      {/* Health Tip Banner */}
      <div className="p-4 rounded-2xl bg-[#EFF3FC] border border-[#BFDBFE] flex items-start gap-3">
        <Stethoscope className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-[#0F172A]">Health Tip</h4>
          <p className="text-xs text-[#475569] mt-0.5">
            Remember to arrive 10 minutes prior to your scheduled consultation for pre-check procedure.
          </p>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[#0F172A] mb-4">Upcoming Appointments</h2>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
          </div>
        ) : !data?.appointments || data.appointments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-[#94A3B8]">No upcoming appointments scheduled.</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-3 text-xs font-semibold text-[#2563EB] hover:underline"
            >
              Book your first visit
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {data.appointments.map((appt) => (
              <div
                key={appt.id}
                className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#DBEAFE] text-[#2563EB] font-bold flex items-center justify-center shrink-0 text-sm">
                    {appt.doctor?.name?.charAt(0) || 'D'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F172A] text-sm">{appt.doctor?.name}</h3>
                    <p className="text-xs text-[#475569]">
                      {appt.doctor?.specialty?.name || appt.doctor?.doctor_profile?.specialty?.name || 'General Practitioner'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-[#475569]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-[#2563EB]" />
                    {appt.appointment_date}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#DBEAFE] text-[#2563EB] uppercase">
                    {appt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <BookAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchDashboard}
      />
    </div>
  );
}