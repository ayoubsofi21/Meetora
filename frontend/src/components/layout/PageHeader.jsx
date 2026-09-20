export default function PageHeader({
  title,
  subtitle,
  status,
  date,
  children,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-7">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0F172A] tracking-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-1.5 text-sm text-[#475569]">
            {subtitle}
          </p>
        )}

        {(status || date) && (
          <div className="flex flex-wrap items-center gap-3 mt-3">
            {status && (
              <span className="
                inline-flex items-center gap-2
                px-3 py-1.5 rounded-full
                bg-[#ECFDF5] text-[#059669]
                text-xs font-semibold
              ">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                {status}
              </span>
            )}

            {date && (
              <span className="text-sm text-[#64748B]">
                {date}
              </span>
            )}
          </div>
        )}
      </div>

      {children && (
        <div className="flex items-center gap-3 shrink-0">
          {children}
        </div>
      )}
    </div>
  );
}