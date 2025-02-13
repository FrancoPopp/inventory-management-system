import { Outlet } from "react-router-dom";
import { DesktopSidebar, MobileHeader } from "./Header";

function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <DesktopSidebar>
        <Outlet />
      </DesktopSidebar>
      <MobileHeader>
        <Outlet />
      </MobileHeader>
    </div>
  );
}

export default Layout;
