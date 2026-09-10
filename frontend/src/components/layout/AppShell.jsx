import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import BottomNav from './BottomNav';

export default function AppShell() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <div className="lg:ml-[240px] min-h-screen">
        <TopBar />

        <main className="p-4 md:p-6 lg:p-7 pb-24 lg:pb-7">
          <Outlet />
        </main>
      </div>

      <BottomNav />
    </div>
  );
}