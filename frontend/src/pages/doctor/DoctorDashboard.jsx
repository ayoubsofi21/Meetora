import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doctorApi } from '../../api/doctorApi';
import {
  UserCheck,
  FileText,
  UserPlus,
  Users,
  Plus,
  MoreVertical,
  Loader2,
  AlertCircle,
  Play,
  CheckCircle2,
  CalendarDays,
} from 'lucide-react';

export default function DoctorDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      // 1. Fetch main dashboard response
      const res = await doctorApi.getDashboard();
      const responseData = res.data.data || res.data;
      setDashboardData(responseData);

      // Extract appointments array from standard response structures
      let queueList =
        responseData.appointments ||
        responseData.today_appointments ||
        responseData.upcoming_appointments ||
        (Array.isArray(responseData) ? responseData : []);

      // 2. Fallback: If dashboard returns empty queue (e.g. appointment date is tomorrow), fetch all appointments
      if (!Array.isArray(queueList) || queueList.length === 0) {
        const apptRes = await doctorApi.getAppointments();
        queueList = apptRes.data.data || apptRes.data || [];
      }

      setAppointments(Array.isArray(queueList) ? queueList : []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Impossible de charger le tableau de bord.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleConfirm = async (id) => {
    try {
      setActionLoading(id);
      await doctorApi.confirmAppointment(id);
      await fetchDashboardData();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Erreur lors de la confirmation du rendez-vous.'
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleStartSession = (appointment) => {
    const patientId =
      appointment.patient_id ||
      appointment.patient?.id ||
      appointment.patient?.user_id;

    navigate(
      `/doctor/patient/${patientId}?appointment_id=${appointment.id}`
    );
  };

  // Safe helper to resolve patient name across nested Laravel Eloquent structures
  const getPatientName = (item) => {
    return (
      item.patient?.user?.name ||
      item.patient?.name ||
      item.user?.name ||
      item.patient_name ||
      `Patient #${item.patient_id || item.id}`
    );
  };

  const todayCount = dashboardData?.today_count ?? appointments.length;

  const pendingCount =
    dashboardData?.pending_count ??
    appointments.filter(
      (appointment) => (appointment.status || '').toLowerCase() === 'pending'
    ).length;

  const confirmedCount =
    dashboardData?.confirmed_count ??
    appointments.filter(
      (appointment) => (appointment.status || '').toLowerCase() === 'confirmed'
    ).length;

  const totalPatients = dashboardData?.total_patients ?? appointments.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A]">
            Tableau de bord Médecin
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Consultez votre programme et vos rendez-vous.
          </p>
        </div>

        <button
          onClick={() => navigate('/doctor/schedule')}
          className="h-12 px-6 bg-[#3F38CA] hover:bg-[#312E81] text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2.5 shrink-0"
        >
          <Plus className="w-5 h-5" />
          <span>Gérer mes disponibilités</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] flex items-center gap-3 text-[#DC2626] text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          icon={UserCheck}
          iconBg="bg-[#EEF2FF]"
          iconColor="text-[#3F38CA]"
          label="Consultations du jour"
          value={todayCount}
        />
        <StatCard
          icon={FileText}
          iconBg="bg-[#FEF3C7]"
          iconColor="text-[#D97706]"
          label="En attente de confirmation"
          value={pendingCount}
        />
        <StatCard
          icon={UserPlus}
          iconBg="bg-[#D1FAE5]"
          iconColor="text-[#059669]"
          label="Rendez-vous confirmés"
          value={confirmedCount}
        />
        <StatCard
          icon={Users}
          iconBg="bg-[#EEF2FF]"
          iconColor="text-[#3F38CA]"
          label="Total Patients"
          value={totalPatients}
        />
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#0F172A]">
              File d'attente des rendez-vous
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Consultez et gérez vos rendez-vous récents et à venir.
            </p>
          </div>

          <button
            onClick={() => navigate('/doctor/schedule')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#3F38CA] hover:text-[#312E81] transition-colors"
          >
            <CalendarDays className="w-5 h-5" />
            Voir le calendrier
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-9 h-9 text-[#3F38CA] animate-spin" />
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#EEF2FF] flex items-center justify-center mb-4">
              <CalendarDays className="w-6 h-6 text-[#3F38CA]" />
            </div>
            <p className="text-sm font-semibold text-[#475569]">
              Aucun rendez-vous trouvé
            </p>
            <p className="text-sm text-[#94A3B8] mt-1">
              Vos rendez-vous programmés apparaîtront ici.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {appointments.map((item) => {
              const patientName = getPatientName(item);
              const patientInitials = patientName
                .split(' ')
                .map((name) => name[0])
                .filter(Boolean)
                .slice(0, 2)
                .join('')
                .toUpperCase();

              const status = (item.status || 'pending').toLowerCase();

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all flex flex-col md:flex-row md:items-center gap-4"
                >
                  <div className="md:w-32 shrink-0">
                    <p className="text-sm font-bold text-[#0F172A]">
                      {item.start_time ? item.start_time.substring(0, 5) : '09:00'}
                    </p>
                    <p className="text-xs text-[#64748B] mt-1">
                      {item.appointment_date || 'N/A'}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-11 h-11 rounded-full bg-[#EEF2FF] text-[#3F38CA] font-bold text-sm flex items-center justify-center shrink-0">
                      {patientInitials || 'P'}
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold text-[#0F172A] text-sm truncate">
                        {patientName}
                      </p>
                      <p className="text-sm text-[#64748B] truncate mt-0.5">
                        {item.reason || 'Consultation générale'}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <StatusBadge status={status} />
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {status === 'pending' && (
                      <button
                        onClick={() => handleConfirm(item.id)}
                        disabled={actionLoading === item.id}
                        className="h-10 px-4 bg-[#D1FAE5] text-[#059669] hover:bg-[#A7F3D0] font-semibold rounded-xl text-sm transition-all flex items-center gap-2 disabled:opacity-50"
                      >
                        {actionLoading === item.id ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <CheckCircle2 className="w-5 h-5" />
                        )}
                        <span>Confirmer</span>
                      </button>
                    )}

                    {(status === 'confirmed' || status === 'in_progress') && (
                      <button
                        onClick={() => handleStartSession(item)}
                        disabled={actionLoading === item.id}
                        className="h-10 px-4 bg-[#3F38CA] hover:bg-[#312E81] text-white font-semibold rounded-xl text-sm transition-all flex items-center gap-2 disabled:opacity-50"
                      >
                        <Play className="w-5 h-5" />
                        <span>Consulter</span>
                      </button>
                    )}

                    <button
                      onClick={() =>
                        navigate(
                          `/doctor/patient/${
                            item.patient_id || item.patient?.id || item.patient?.user_id
                          }`
                        )
                      }
                      className="w-10 h-10 flex items-center justify-center text-[#64748B] hover:text-[#3F38CA] hover:bg-[#EEF2FF] rounded-xl transition-all"
                      title="Voir le dossier médical"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, iconBg, iconColor, label, value }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm hover:shadow-md transition-all">
      <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center mb-5`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <p className="text-sm font-medium text-[#64748B]">{label}</p>
      <p className="text-3xl font-bold text-[#0F172A] mt-1">{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending: 'bg-[#FEF3C7] text-[#D97706]',
    confirmed: 'bg-[#D1FAE5] text-[#059669]',
    completed: 'bg-[#EEF2FF] text-[#3F38CA]',
    in_progress: 'bg-[#EEF2FF] text-[#3F38CA]',
    cancelled: 'bg-[#FEE2E2] text-[#DC2626]',
  };

  const labels = {
    pending: 'En attente',
    confirmed: 'Confirmé',
    completed: 'Terminé',
    in_progress: 'En cours',
    cancelled: 'Annulé',
  };

  return (
    <span
      className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold ${
        styles[status] || 'bg-[#F1F5F9] text-[#475569]'
      }`}
    >
      {labels[status] || status}
    </span>
  );
}