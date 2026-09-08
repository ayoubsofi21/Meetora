import { Outlet } from "react-router-dom";

function AppShell() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default AppShell;