"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  LogOut,
  ExternalLink,
} from "lucide-react";

const menuItems = [
  { href: "/admin/dashboard", label: "DASHBOARD", icon: LayoutDashboard },
  { href: "/admin/dashboard/projects", label: "PROJECTS", icon: FolderKanban },
  { href: "/admin/dashboard/comments", label: "COMMENTS", icon: MessageSquare },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside className="w-64 shrink-0 min-h-screen bg-punk-black border-r-brutal border-punk-white/20 flex flex-col">
      {/* Logo */}
      <div className="h-16 border-b-brutal border-punk-white/20 flex items-center px-6">
        <span className="font-brutal text-brutal-lg text-neon-yellow">
          [ADMIN]
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 font-mono text-brutal-xs border-brutal transition-colors ${
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

      {/* Bottom */}
      <div className="p-4 border-t-brutal border-punk-white/20 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2 font-mono text-brutal-xs text-punk-white/30 hover:text-punk-white transition-colors"
        >
          <ExternalLink size={14} />
          VIEW SITE
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 font-mono text-brutal-xs text-neon-red/60 hover:text-neon-red transition-colors"
        >
          <LogOut size={14} />
          LOGOUT
        </button>
      </div>
    </aside>
  );
}
