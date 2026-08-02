import { Link } from 'react-router-dom';
import { ChevronRight, UserSearch } from 'lucide-react';
import SectionCard from '@/components/common/SectionCard';
import { Avatar, EmptyState, SkeletonRow } from '@/components/ui';
import { ROUTES } from '@/config/constants';

/**
 * @param {{ specialists: object[], isLoading: boolean }} props
 */
export default function RecommendedSpecialists({ specialists = [], isLoading }) {
  return (
    <SectionCard title="Recommended Specialists">
      {isLoading ? (
        <div className="space-y-2">
          <SkeletonRow />
          <SkeletonRow />
        </div>
      ) : specialists.length === 0 ? (
        <EmptyState icon={UserSearch} title="No recommendations yet" className="py-6" />
      ) : (
        <div className="space-y-1">
          {specialists.map((doc) => (
            <Link
              key={doc.id}
              to={`${ROUTES.PATIENT_SEARCH_DOCTORS}/${doc.id}`}
              className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-ink-50"
            >
              <Avatar name={doc.name} src={doc.avatarUrl} size="md" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink-900">{doc.name}</p>
                <p className="truncate text-xs text-ink-400">{doc.specialty}</p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-ink-300" />
            </Link>
          ))}
        </div>
      )}

      <Link
        to={ROUTES.PATIENT_SEARCH_DOCTORS}
        className="mt-3 block text-center text-sm font-semibold text-primary-600 hover:text-primary-700"
      >
        Explore All Doctors
      </Link>
    </SectionCard>
  );
}