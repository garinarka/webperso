import type { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = { title: "Admin Dashboard" };

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-punk-black text-punk-white">
      <AdminSidebar />
      {/* pt-14 on mobile offsets the fixed admin top bar; md:pt-0 because sidebar is static */}
      <main className="flex-1 overflow-auto pt-14 md:pt-0">{children}</main>
    </div>
  );
}
