import { Info } from 'lucide-react';

/** Small dismissible-style info banner shown next to the welcome heading. */
export default function HealthTipBanner({ tip }) {
  if (!tip) return null;

  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-primary-100 bg-primary-50 px-4 py-2.5">
      <Info className="h-4 w-4 shrink-0 text-primary-600" />
      <p className="text-sm font-medium text-primary-700">
        <span className="font-semibold">Health Tip:</span> {tip}
      </p>
    </div>
  );
}