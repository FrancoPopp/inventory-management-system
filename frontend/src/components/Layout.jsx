import { Outlet } from "react-router-dom";
import { DesktopSidebar, MobileHeader } from "./Header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <DesktopSidebar>
        <Outlet />
      </DesktopSidebar>
      <MobileHeader>
        <Outlet />
      </MobileHeader>
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

export default Layout;
