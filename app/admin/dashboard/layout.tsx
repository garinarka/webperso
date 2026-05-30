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
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
