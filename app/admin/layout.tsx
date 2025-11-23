"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav"
import { AuthGuard } from "@/components/admin/auth-guard"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/admin/login"

  // La page de login n'a pas besoin du layout admin (sidebar, etc.)
  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <AuthGuard requiredRole="viewer">
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
    </AuthGuard>
  )
}
