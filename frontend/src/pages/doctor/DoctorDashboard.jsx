import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doctorApi } from '../../api/doctorApi';
import {
  UserCheck,
  FileText,
  UserPlus,
  Plus,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Loader2,
  AlertCircle,
  Play,
  CheckCircle2
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
      // Route Laravel: Route::get('/doctor/dashboard', [DashboardController::class, 'doctor']);
      const res = await doctorApi.getDashboard();
      const responseData = res.data.data || res.data;
      
      setDashboardData(responseData);
      
      // Extraction de la liste des rendez-vous selon la structure retournée par votre DashboardController
      const queueList = responseData.appointments || responseData.today_appointments || responseData;
      setAppointments(Array.isArray(queueList) ? queueList : []);
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible de charger le tableau de bord.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Action: Confirmer un rendez-vous (PATCH /api/doctor/appointments/{id}/confirm)
  const handleConfirm = async (id) => {
    try {
      setActionLoading(id);
      await doctorApi.confirmAppointment(id);
      await fetchDashboardData(); // Recharger les données depuis la BDD
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la confirmation du rendez-vous.');
    } finally {
      setActionLoading(null);
    }
  };

  // Action: Démarrer la consultation et ouvrir le dossier du patient
  const handleStartSession = (appointment) => {
    const patientId = appointment.patient_id || appointment.patient?.id;
    navigate(`/doctor/patient/${patientId}?appointment_id=${appointment.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Tableau de bord Médecin</h1>
          <p className="text-sm text-[#64748B]">Consultez votre programme et vos rendez-vous du jour.</p>
        </div>

        <button
          onClick={() => navigate('/doctor/schedule')}
          className="h-11 px-5 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Gérer mes disponibilités</span>
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] flex items-center gap-2 text-[#DC2626] text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Cartes Statistiques basées sur les données réelles du DashboardController */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1">
            Consultations du jour
          </p>
          <p className="text-3xl font-extrabold text-[#0F172A]">
            {dashboardData?.today_count ?? appointments.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#FEF2F2] text-[#EF4444] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1">
            En attente de confirmation
          </p>
          <p className="text-3xl font-extrabold text-[#0F172A]">
            {dashboardData?.pending_count ?? appointments.filter(a => a.status === 'pending').length}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1">
            Rendez-vous confirmés
          </p>
          <p className="text-3xl font-extrabold text-[#0F172A]">
            {dashboardData?.confirmed_count ?? appointments.filter(a => a.status === 'confirmed').length}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm flex flex-col justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B] text-center">
            Total Patients
          </p>
          <div className="text-center my-1">
            <p className="text-2xl font-extrabold text-[#0F172A]">
              {dashboardData?.total_patients ?? 0}
            </p>
          </div>
          <button
            onClick={() => navigate('/doctor/schedule')}
            className="w-full py-1.5 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#1D4ED8] rounded-xl text-xs font-semibold transition-all"
          >
            Voir le calendrier
          </button>
        </div>
      </div>

      {/* Liste des rendez-vous en base de données */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#0F172A]">File d'attente des rendez-vous</h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-[#1D4ED8] animate-spin" />
          </div>
        ) : appointments.length === 0 ? (
          <p className="text-sm text-[#94A3B8] text-center py-8">Aucun rendez-vous trouvé en base de données pour aujourd'hui.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((item) => {
              const patientName = item.patient?.name || item.patient_name || 'Patient';
              const patientInitials = patientName
                .split(' ')
                .map((n) => n[0])
                .join('');
              const status = (item.status || 'pending').toLowerCase();

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all flex items-center justify-between gap-4"
                >
                  {/* Horaires */}
                  <div className="w-24 shrink-0">
                    <p className="text-xs font-bold text-[#0F172A]">{item.start_time || '09:00'}</p>
                    <p className="text-[10px] text-[#64748B]">{item.appointment_date}</p>
                  </div>

                  {/* Infos Patient */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-[#DBEAFE] text-[#1D4ED8] font-bold text-xs flex items-center justify-center shrink-0">
                      {patientInitials}
                    </div>
                    <div className="truncate">
                      <p className="font-bold text-[#0F172A] text-sm truncate">{patientName}</p>
                      <p className="text-xs text-[#64748B] truncate">
                        {item.reason || 'Consultation générale'}
                      </p>
                    </div>
                  </div>

                  {/* Actions de changement d'état BDD */}
                  <div className="flex items-center gap-3 shrink-0">
                    {status === 'pending' && (
                      <button
                        onClick={() => handleConfirm(item.id)}
                        disabled={actionLoading === item.id}
                        className="h-8 px-3 bg-[#DCFCE7] text-[#166534] hover:bg-[#BBF7D0] font-semibold rounded-lg text-xs transition-all flex items-center gap-1 disabled:opacity-50"
                      >
                        {actionLoading === item.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                        <span>Confirmer</span>
                      </button>
                    )}

                    {(status === 'confirmed' || status === 'in_progress') && (
                      <button
                        onClick={() => handleStartSession(item)}
                        disabled={actionLoading === item.id}
                        className="h-8 px-3 bg-[#1D4ED8] text-white hover:bg-[#1E40AF] font-semibold rounded-lg text-xs transition-all flex items-center gap-1 disabled:opacity-50"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Consulter</span>
                      </button>
                    )}

                    <button
                      onClick={() => navigate(`/doctor/patient/${item.patient_id || item.patient?.id}`)}
                      className="text-[#94A3B8] hover:text-[#0F172A] p-1.5 rounded-lg hover:bg-[#F8FAFC]"
                      title="Voir le dossier médical"
                    >
                      <MoreVertical className="w-4 h-4" />
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