import { useState, useEffect } from 'react';
import { doctorApi } from '../../api/doctorApi';
import { useNavigate } from 'react-router-dom';
import {
  UserCheck,
  FileText,
  UserPlus,
  Plus,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Zap,
  Send,
  Video,
  User,
  ChevronRight as ArrowRight,
  Activity,
  Droplet,
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Quick Action Desk state
  // const [activeTab, setActiveTab] = useState('prescription');
  // const [selectedPatient, setSelectedPatient] = useState('Emma Johnson');
  // const [medication, setMedication] = useState('');
  // const [dosage, setDosage] = useState('');
  // const [frequency, setFrequency] = useState('Daily');
  // const [notes, setNotes] = useState('');
  
  const navigate = useNavigate();

  const fetchQueue = async () => {
    try {
      setLoading(true);
      setError('');
      const todayStr = new Date().toISOString().split('T')[0];
      const res = await doctorApi.getAppointments({ date: todayStr });
      setAppointments(res.data.data || res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load today schedule.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  // Mock list used as a fallback if API endpoint returns empty list during dev
  const scheduleData = appointments.length > 0 ? appointments : [
    {
      id: 1,
      time: '09:00 AM',
      name: 'Emma Johnson',
      initials: 'EJ',
      type: 'Follow-up • Hypertension',
      status: 'In Progress',
      statusType: 'progress',
      avatar: null,
    },
    {
      id: 2,
      time: '10:30 AM',
      name: 'Michael Chen',
      initials: 'MC',
      type: 'Initial Consultation • Arrhythmia',
      status: 'In-Clinic',
      statusType: 'clinic',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      time: '11:15 AM',
      name: 'Sarah Rogers',
      initials: 'SR',
      type: 'Routine Checkup • Post-Op',
      status: 'In-Clinic',
      statusType: 'clinic',
      avatar: null,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Good Morning, Dr. Smith</h1>
          <p className="text-sm text-[#64748B]">Here's your schedule and patient overview for today.</p>
        </div>

        <button
          onClick={() => navigate('/doctor/schedule')}
          className="h-11 px-5 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Consultation</span>
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] flex items-center gap-2 text-[#DC2626] text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Consultations Today */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#166534] bg-[#DCFCE7] px-2.5 py-1 rounded-full">
              ↗ 12%
            </span>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1">
            Consultations Today
          </p>
          <p className="text-3xl font-extrabold text-[#0F172A]">14</p>
        </div>

        {/* Card 2: Pending Reports */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#FEF2F2] text-[#EF4444] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#991B1B] bg-[#FEE2E2] px-2.5 py-1 rounded-full">
              Needs Review
            </span>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1">
            Pending Reports
          </p>
          <p className="text-3xl font-extrabold text-[#0F172A]">5</p>
        </div>

        {/* Card 3: New Patients */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#166534] bg-[#DCFCE7] px-2.5 py-1 rounded-full">
              ↗ 4%
            </span>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1">
            New Patients
          </p>
          <p className="text-3xl font-extrabold text-[#0F172A]">3</p>
        </div>

        {/* Card 4: Next Available Slot */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm flex flex-col justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B] text-center">
            Next Available Slot
          </p>
          <div className="text-center my-1">
            <p className="text-2xl font-extrabold text-[#0F172A]">14:30 PM</p>
            <p className="text-xs text-[#94A3B8]">Today</p>
          </div>
          <button
            onClick={() => navigate('/doctor/schedule')}
            className="w-full py-1.5 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#1D4ED8] rounded-xl text-xs font-semibold transition-all"
          >
            View Calendar
          </button>
        </div>
      </div>

      {/* Main Grid: Schedule (Left) + Quick Action Desk & Reports (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Section: Today's Schedule */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[#0F172A]">Today's Schedule</h2>
              <div className="flex items-center gap-2">
                <button className="p-1 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-semibold text-[#475569]">Oct 24, 2023</span>
                <button className="p-1 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* List */}
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 text-[#1D4ED8] animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {scheduleData.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all flex items-center justify-between gap-4"
                  >
                    {/* Time */}
                    <div className="w-16 shrink-0">
                      <p className="text-xs font-bold text-[#0F172A]">{item.time || item.start_time}</p>
                    </div>

                    {/* Patient info */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {item.avatar ? (
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-10 h-10 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#DBEAFE] text-[#1D4ED8] font-bold text-xs flex items-center justify-center shrink-0">
                          {item.initials || item.patient?.name?.charAt(0) || 'P'}
                        </div>
                      )}
                      <div className="truncate">
                        <p className="font-bold text-[#0F172A] text-sm truncate">
                          {item.name || item.patient?.name}
                        </p>
                        <p className="text-xs text-[#64748B] truncate">
                          {item.type || item.reason || 'General Consultation'}
                        </p>
                      </div>
                    </div>

                    {/* Status badge & Menu */}
                    <div className="flex items-center gap-3 shrink-0">
                      {item.statusType === 'progress' || item.status === 'IN_PROGRESS' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#EFF6FF] text-[#1D4ED8]">
                          <Video className="w-3 h-3" /> In Progress
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#F1F5F9] text-[#475569]">
                          <User className="w-3 h-3" /> In-Clinic
                        </span>
                      )}

                      <button className="text-[#94A3B8] hover:text-[#0F172A] p-1 rounded-lg hover:bg-[#F8FAFC]">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>        
      </div>
    </div>
  );
}