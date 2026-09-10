export default function StatCard({ icon: Icon, label, value, trend, iconBg = '#EFF6FF', iconColor = '#2563EB' }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 min-h-[155px] flex flex-col justify-between shadow-sm">
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: iconBg }}
        >
          <Icon className="w-5 h-5" style={{ color: iconColor }} strokeWidth={1.75} />
        </div>
        {trend && (
          <span className="text-xs font-semibold text-[#059669]">{trend}</span>
        )}
      </div>

      <div>
        <p className="text-sm text-[#475569]">{label}</p>
        <p className="text-[28px] leading-tight font-bold text-[#0F172A] mt-0.5">{value}</p>
      </div>
    </div>
  );
}