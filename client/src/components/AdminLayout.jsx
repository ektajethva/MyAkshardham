import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Package,
  Ticket,
  Users,
  BarChart3,
  ShoppingCart,
  Flame,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const adminLinks = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Events", path: "/admin/events", icon: Calendar },
  { label: "Products", path: "/admin/products", icon: Package },
  { label: "Bookings", path: "/admin/bookings", icon: Ticket },
  { label: "Crowd Status", path: "/admin/crowd", icon: Users },
  { label: "Orders", path: "/admin/orders", icon: ShoppingCart },
  { label: "Donations", path: "/admin/donations", icon: BarChart3 },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-2 px-4 py-5 border-b border-sidebar-border">
        <Flame className="h-6 w-6 text-sidebar-primary" />
        <span className="font-heading text-lg font-bold text-sidebar-foreground">
          Admin Panel
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {adminLinks.map((l) => (
          <Link
            key={l.path}
            to={l.path}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === l.path
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <l.icon className="h-4 w-4" />
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-sidebar-border space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent transition-colors"
        >
          <Flame className="h-4 w-4" />
          Back to Site
        </Link>

        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent transition-colors w-full"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen">
      <aside className="hidden lg:flex w-64 flex-col bg-sidebar border-r border-sidebar-border shrink-0 sticky top-0 h-screen overflow-y-auto">
        <SidebarContent />
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/50"
            onClick={() => setSidebarOpen(false)}
          />

          <aside className="relative w-64 h-full bg-sidebar flex flex-col animate-slide-in">
            <button
              className="absolute top-4 right-3 text-sidebar-foreground"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>

            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-border bg-card flex items-center px-4 lg:px-6">
          <button className="lg:hidden mr-3" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5 text-foreground" />
          </button>

          <h2 className="font-heading font-semibold text-foreground">
            MyAkshardham Admin
          </h2>
        </header>

        <main className="flex-1 p-4 lg:p-6 bg-background overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}