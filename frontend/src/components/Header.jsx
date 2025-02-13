import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";
import {
  LuLayoutDashboard,
  LuPackage,
  LuDollarSign,
  LuMenu,
  LuX,
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
          className={`flex items-center rounded-md px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200 ${pathname === item.href ? "bg-gray-200" : ""} `}
        >
          <item.icon className="mr-3 h-5 w-5" />
          {item.label}
        </Link>
      ))}
    </>
  );
}

function DesktopSidebar({ children }) {
  return (
    <>
      <aside className="hidden w-64 flex-col bg-white shadow-md md:flex">
        <div className="p-4">
          <h1 className="text-2xl font-bold">SKL Inventario</h1>
        </div>
        <nav className="flex-1 space-y-2 px-2 py-4">
          <NavItems />
        </nav>
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
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">SKL Inventario</h1>
          <Button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
            <h2 className="text-xl font-bold">SKL Inventario</h2>
            <Button onClick={() => setIsMobileMenuOpen(false)}>
              <LuX className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="space-y-2 px-2 pt-10">
              <NavItems />
            </nav>
          </div>
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
