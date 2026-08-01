import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import MobileBottomNav from '../components/MobileBottomNav';

/**
 * Main authenticated shell: Sidebar + Topbar + routed page content.
 * Adds bottom padding on mobile so content isn't hidden behind the tab bar.
 */
export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-surface-page">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-8">
          <div className="mx-auto max-w-[1600px] animate-fade-in">
            <Outlet />
          </div>
        </main>
        <MobileBottomNav />
      </div>
    </div>
  );
}