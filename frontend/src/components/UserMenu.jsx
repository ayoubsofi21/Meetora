import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownDivider, Avatar } from '@/components/ui';
import { useAuthStore } from '@/store/useAuthStore';
import { ROLE_LABELS, ROUTES } from '@/config/constants';
import { cn } from '@/utils/cn';

const SETTINGS_ROUTE_BY_ROLE = {
  patient: ROUTES.PATIENT_SETTINGS,
  doctor: ROUTES.DOCTOR_SETTINGS,
  secretary: ROUTES.SECRETARY_SETTINGS,
  admin: ROUTES.ADMIN_SETTINGS,
};

/** Avatar + name/role trigger with a Profile / Settings / Log out dropdown. */
export default function UserMenu() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  if (!user) return null;

  const fullName = `${user.firstName} ${user.lastName}`;
  const roleLabel = user.role === 'doctor' && user.specialty ? user.specialty : ROLE_LABELS[user.role];

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <Dropdown align="right">
      <DropdownTrigger asChild>
        {(triggerProps) => (
          <button
            type="button"
            {...triggerProps}
            className="flex items-center gap-2.5 rounded-xl py-1 pl-1 pr-2 transition-colors hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            <Avatar src={user.avatarUrl} name={fullName} size="sm" ring />
            <span className="hidden text-left leading-tight md:block">
              <span className="block text-sm font-semibold text-ink-800">{fullName}</span>
              <span className="block text-xs text-ink-400">{roleLabel}</span>
            </span>
            <ChevronDown className="hidden h-4 w-4 text-ink-400 md:block" />
          </button>
        )}
      </DropdownTrigger>
      <DropdownMenu width="w-64">
        <div className={cn('mb-1 flex items-center gap-3 rounded-xl bg-ink-50 px-3 py-2.5 md:hidden')}>
          <Avatar src={user.avatarUrl} name={fullName} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink-800">{fullName}</p>
            <p className="truncate text-xs text-ink-400">{roleLabel}</p>
          </div>
        </div>
        <DropdownItem icon={User} onClick={() => navigate(SETTINGS_ROUTE_BY_ROLE[user.role])}>
          Mon profil
        </DropdownItem>
        <DropdownItem icon={Settings} onClick={() => navigate(SETTINGS_ROUTE_BY_ROLE[user.role])}>
          Paramètres
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem icon={LogOut} danger onClick={handleLogout}>
          Se déconnecter
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}