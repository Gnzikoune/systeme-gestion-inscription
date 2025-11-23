import type { ReactNode } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {/* Mobile Navigation */}
      <AdminMobileNav />

      {/* Main Content */}
      <main className="flex-1 pt-[65px] lg:ml-64 lg:pt-0">{children}</main>
    </div>
  )
}
