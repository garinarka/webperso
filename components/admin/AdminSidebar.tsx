"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronLeft,
} from "lucide-react";

const menuItems = [
  { href: "/admin/dashboard", label: "DASHBOARD", icon: LayoutDashboard },
  { href: "/admin/dashboard/projects", label: "PROJECTS", icon: FolderKanban },
  { href: "/admin/dashboard/comments", label: "COMMENTS", icon: MessageSquare },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  // Desktop: collapsed = icon-only. Mobile: collapsed = hidden.
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close mobile drawer on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  // ── Desktop sidebar ──────────────────────────────────────────────────────
  const desktopSidebar = (
    <aside
      className={`hidden md:flex flex-col shrink-0 min-h-screen bg-punk-black border-r-2 border-punk-white/20 transition-all duration-200 ${collapsed ? "w-16" : "w-64"}`}
    >
      {/* Header */}
      <div className="h-16 border-b-2 border-punk-white/20 flex items-center justify-between px-4 shrink-0">
        {!collapsed && (
          <span className="font-brutal text-brutal-lg text-neon-yellow">
            [ADMIN]
          </span>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="text-punk-white/40 hover:text-punk-white transition-colors ml-auto"
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-1">
        {menuItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-3 py-3 font-mono text-brutal-xs border transition-colors rounded-sm ${
                active
                  ? "border-neon-yellow text-neon-yellow bg-neon-yellow/5"
                  : "border-transparent text-punk-white/50 hover:text-punk-white hover:border-punk-white/20"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon size={16} className="shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-2 border-t-2 border-punk-white/20 space-y-1">
        <Link
          href="/"
          target="_blank"
          title={collapsed ? "View Site" : undefined}
          className={`flex items-center gap-3 px-3 py-2 font-mono text-brutal-xs text-punk-white/30 hover:text-punk-white transition-colors ${collapsed ? "justify-center" : ""}`}
        >
          <ExternalLink size={14} className="shrink-0" />
          {!collapsed && "VIEW SITE"}
        </Link>
        <button
          onClick={handleLogout}
          title={collapsed ? "Logout" : undefined}
          className={`w-full flex items-center gap-3 px-3 py-2 font-mono text-brutal-xs text-neon-red/60 hover:text-neon-red transition-colors ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut size={14} className="shrink-0" />
          {!collapsed && "LOGOUT"}
        </button>
      </div>
    </aside>
  );

  // ── Mobile top bar + drawer ───────────────────────────────────────────────
  const mobileBar = (
    <div className="md:hidden">
      {/* Fixed top bar for mobile */}
      <div className="fixed top-0 left-0 right-0 z-50 h-14 bg-punk-black border-b-2 border-punk-white/20 flex items-center justify-between px-4">
        <span className="font-brutal text-brutal-base text-neon-yellow">
          [ADMIN]
        </span>
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="text-punk-white/60 hover:text-punk-white transition-colors"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Drawer overlay */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-punk-black/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <aside className="fixed top-0 left-0 bottom-0 z-50 w-64 bg-punk-black border-r-2 border-punk-white/20 flex flex-col">
            <div className="h-14 border-b-2 border-punk-white/20 flex items-center justify-between px-4 shrink-0">
              <span className="font-brutal text-brutal-base text-neon-yellow">
                [ADMIN]
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-punk-white/40 hover:text-punk-white"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {menuItems.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-4 py-3 font-mono text-brutal-xs border transition-colors ${
                      active
                        ? "border-neon-yellow text-neon-yellow bg-neon-yellow/5"
                        : "border-transparent text-punk-white/50 hover:text-punk-white hover:border-punk-white/20"
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="p-3 border-t-2 border-punk-white/20 space-y-1">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-3 px-4 py-2 font-mono text-brutal-xs text-punk-white/30 hover:text-punk-white transition-colors"
              >
                <ExternalLink size={14} /> VIEW SITE
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 font-mono text-brutal-xs text-neon-red/60 hover:text-neon-red transition-colors"
              >
                <LogOut size={14} /> LOGOUT
              </button>
            </div>
          </aside>
        </>
      )}
    </div>
  );

  return (
    <>
      {desktopSidebar}
      {mobileBar}
    </>
  );
}
