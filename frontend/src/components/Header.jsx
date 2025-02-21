import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./Button";
import {
  LuLayoutDashboard,
  LuPackage,
  LuDollarSign,
  LuMenu,
  LuX,
  LuLogOut,
} from "react-icons/lu";

const menuItems = [
  { href: "/dashboard", icon: LuLayoutDashboard, label: "Dashboard" },
  { href: "/inventory", icon: LuPackage, label: "Inventario" },
  { href: "/sales", icon: LuDollarSign, label: "Ventas" },
];

function NavItems() {
  const { pathname } = useLocation();
  return (
    <>
      {menuItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={`flex items-center rounded-md px-4 py-2 text-gray-700 transition-colors hover:bg-indigo-500 ${pathname.startsWith(item.href) ? "bg-indigo-300" : ""} `}
        >
          <item.icon className="mr-3 h-5 w-5" />
          {item.label}
        </Link>
      ))}
    </>
  );
}

function Logout() {
  const { logout } = useAuth();
  return (
    <div className="flex justify-center px-2 py-4">
      <Button
        className="flex items-center justify-start rounded-md px-4 py-2 text-gray-700 transition-colors hover:text-[#ff3020]"
        onClick={logout}
      >
        <LuLogOut className="mr-3 h-5 w-5" />
        Cerrar sesión
      </Button>
    </div>
  );
}

function DesktopSidebar({ children }) {
  return (
    <>
      <aside className="hidden w-64 flex-col bg-white shadow-md md:flex">
        <div className="mx-auto px-4 pt-4">
          <Link to="/">
            <div className="size-28 transition-all duration-200 hover:scale-125">
              <img
                src="/logo-no-bg.png"
                alt="logo de SKL indumentaria deportiva"
              />
            </div>
          </Link>
        </div>
        <nav className="flex-1 space-y-2 px-2 py-4">
          <NavItems />
        </nav>
        <Logout />
      </aside>
      <main className="hidden flex-1 overflow-y-auto p-6 md:block">
        {children}
      </main>
    </>
  );
}

function MobileHeader({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex flex-col md:hidden">
      <header className="z-10 bg-white shadow-md">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="px-4">
            <Link to="/">
              <div className="size-12">
                <img
                  src="/logo-no-bg.png"
                  alt="logo de SKL indumentaria deportiva"
                />
              </div>
            </Link>
          </div>
          <Button
            className="h-10 w-10 hover:bg-[#f5f5f5] hover:text-[#171717]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <LuMenu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } z-20 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-bold">SKL Indumentaria</h2>
            <Button
              className="h-10 w-10 hover:bg-[#f5f5f5] hover:text-[#171717]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LuX className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="space-y-2 px-2 pt-10">
              <NavItems />
            </nav>
          </div>
          <Logout />
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-50 transition-opacity duration-300 ease-in-out"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <main className="flex-1 overflow-y-auto p-4">{children}</main>
    </div>
  );
}

export { DesktopSidebar, MobileHeader };
