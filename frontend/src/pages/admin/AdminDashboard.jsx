import { useState, useEffect } from 'react';
import { adminApi } from '../../api/adminApi';
import {
  Users, Stethoscope, CalendarCheck, TrendingUp, Loader2, AlertCircle,
  UserCog, Settings, ScrollText, ArrowUpRight,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';

const STATUS_COLORS = {
  pending: '#D97706',
  confirmed: '#2563EB',
  completed: '#059669',
  cancelled: '#DC2626',
};

const STATUS_BADGE = {
  pending: 'bg-[#FEF3C7] text-[#D97706]',
  confirmed: 'bg-[#DBEAFE] text-[#2563EB]',
  completed: 'bg-[#D1FAE5] text-[#059669]',
  cancelled: 'bg-[#FEE2E2] text-[#DC2626]',
};

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    adminApi
      .getDashboard()
      .then((res) => setData(res.data.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load dashboard.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] flex items-center gap-2 text-[#DC2626] text-sm">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <span>{error}</span>
      </div>
    );
  }

  const { statistics, recent_appointments, recent_users, appointments_by_status, appointments_per_day } = data;

  const completionRate =
    statistics.total_appointments > 0
      ? Math.round((statistics.completed_appointments / statistics.total_appointments) * 100)
      : 0;

  const chartData = Object.entries(appointments_per_day || {}).map(([date, total]) => ({
    date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    total,
  }));

  const statusData = Object.entries(appointments_by_status || {}).map(([status, total]) => ({
    name: status,
    value: total,
  }));

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A]">Welcome back, Admin</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm text-[#475569]">{today}</span>
          </div>
        </div>
        <button className="h-11 px-4 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] font-semibold rounded-xl text-sm transition-all">
          Export Report
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={Users} iconBg="bg-[#DBEAFE]" iconColor="text-[#2563EB]"
          label="Total Patients" value={statistics.total_patients} />
        <StatCard icon={Stethoscope} iconBg="bg-[#D1FAE5]" iconColor="text-[#059669]"
          label="Active Doctors" value={statistics.total_doctors} />
        <StatCard icon={CalendarCheck} iconBg="bg-[#EFF3FC]" iconColor="text-[#2563EB]"
          label="Total Appointments" value={statistics.total_appointments} />
        <StatCard icon={TrendingUp} iconBg="bg-[#D1FAE5]" iconColor="text-[#059669]"
          label="Completion Rate" value={`${completionRate}%`} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#0F172A]">Appointments — Last 30 Days</h2>
          <p className="text-sm text-[#475569] mb-4">Daily appointment volume</p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0' }} />
              <Area type="monotone" dataKey="total" stroke="#2563EB" strokeWidth={2} fill="url(#colorTotal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#0F172A]">Appointments by Status</h2>
          <p className="text-sm text-[#475569] mb-4">Current distribution</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={2}>
                {statusData.map((entry) => (
                  <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || '#94A3B8'} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {statusData.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-[#475569] capitalize">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: STATUS_COLORS[entry.name] || '#94A3B8' }}
                  />
                  {entry.name}
                </span>
                <span className="font-semibold text-[#0F172A]">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity + quick links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#0F172A]">Recent Appointments</h2>
            <a href="/admin/appointments" className="text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8]">
              View All
            </a>
          </div>

          {recent_appointments.length === 0 ? (
            <p className="text-sm text-[#94A3B8] text-center py-8">No appointments yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#E2E8F0] text-[#64748B] uppercase text-xs">
                    <th className="pb-3">Patient</th>
                    <th className="pb-3">Doctor</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {recent_appointments.map((appt) => (
                    <tr key={appt.id} className="hover:bg-[#F8FAFC]">
                      <td className="py-3.5 font-semibold text-[#0F172A]">{appt.patient?.name}</td>
                      <td className="py-3.5 text-[#475569]">{appt.doctor?.name}</td>
                      <td className="py-3.5 text-[#475569]">
                        {appt.appointment_date} · {appt.start_time}
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                            STATUS_BADGE[appt.status] || 'bg-[#F1F5F9] text-[#475569]'
                          }`}
                        >
                          {appt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <QuickLinkCard
            href="/admin/patients"
            icon={UserCog}
            title="User Management"
            description="Manage patients, doctors & access"
            variant="solid"
          />
          <QuickLinkCard
            href="/admin/specialties"
            icon={Settings}
            title="Clinic Settings"
            description="Specialties & configuration"
          />
          <QuickLinkCard
            href="/admin/doctors"
            icon={ScrollText}
            title="Recent Signups"
            description={`${recent_users.length} new accounts`}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, iconBg, iconColor, label, value }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm">
      <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center mb-4`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <p className="text-sm text-[#475569]">{label}</p>
      <p className="text-2xl font-bold text-[#0F172A] mt-1">{value}</p>
    </div>
  );
}

function QuickLinkCard({
  href,
  icon: Icon,
  title,
  description,
  variant = 'default',
}) {
  const isSolid = variant === 'solid';

  return (
    <a
      href={href}
      className={`block rounded-2xl p-5 transition-all ${
        isSolid
          ? 'bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90'
          : 'bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] text-[#0F172A]'
      }`}
    >
      <div className="flex items-start justify-between">
        <Icon
          className={`w-6 h-6 ${
            isSolid ? 'text-white' : 'text-[#2563EB]'
          }`}
          strokeWidth={1.75}
        />

        <ArrowUpRight
          className={`w-4 h-4 ${
            isSolid ? 'text-white/70' : 'text-[#94A3B8]'
          }`}
        />
      </div>

      <p className="font-semibold mt-3">{title}</p>

      <p
        className={`text-sm mt-1 ${
          isSolid ? 'text-white/80' : 'text-[#475569]'
        }`}
      >
        {description}
      </p>
    </a>
  );
}