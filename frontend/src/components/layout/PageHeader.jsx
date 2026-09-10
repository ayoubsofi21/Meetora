export default function PageHeader({ title, subtitle, status, date, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          {title}
        </h1>
        {subtitle && <p className="text-sm text-[#475569] mt-1">{subtitle}</p>}

        {(status || date) && (
          <div className="flex items-center gap-3 mt-3">
            {status && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                bg-[#D1FAE5] text-[#059669] text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                {status}
              </span>
            )}
            {date && <span className="text-sm text-[#475569]">{date}</span>}
          </div>
        )}
      </div>

      {children && <div className="flex items-center gap-3 shrink-0">{children}</div>}
    </div>
  );
}