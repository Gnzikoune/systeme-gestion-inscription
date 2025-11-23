"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Users, Newspaper, Settings, LayoutDashboard, GraduationCap, BarChart3, Megaphone, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { usePermissions } from "@/hooks/use-permissions"
import { Button } from "@/components/ui/button"

const getSidebarLinks = (can: (permission: string) => boolean) => [
  {
    href: "/admin",
    label: "Inscriptions",
    icon: Users,
    permission: "view:inscriptions",
  },
  {
    href: "/admin/programmes",
    label: "Programmes",
    icon: GraduationCap,
    permission: "view:programmes",
  },
  {
    href: "/admin/actualites",
    label: "Actualités",
    icon: Newspaper,
    permission: "view:actualites",
  },
  {
    href: "/admin/statistiques",
    label: "Statistiques",
    icon: BarChart3,
    permission: "view:statistiques",
  },
  {
    href: "/admin/cta",
    label: "Section CTA",
    icon: Megaphone,
    permission: "view:cta",
  },
  {
    href: "/admin/parametres",
    label: "Paramètres",
    icon: Settings,
    permission: "view:parametres",
  },
].filter((link) => can(link.permission))

export function AdminSidebar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const router = useRouter()
  const { can } = usePermissions()

  const handleSignOut = async () => {
    await signOut()
    router.push("/admin/login")
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card transition-transform lg:translate-x-0">
      <div className="flex h-full flex-col">
        {/* Logo Section */}
        <div className="border-b border-border p-6">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="CSGR-IA Logo" width={40} height={40} className="object-contain" />
            <div>
              <h2 className="text-sm font-bold text-foreground">CSGR-IA</h2>
              <p className="text-xs text-muted-foreground">Administration</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {getSidebarLinks(can).map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href || (link.href !== "/admin" && pathname?.startsWith(link.href))

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4 space-y-2">
          {user && (
            <div className="mb-2 px-3 py-2">
              <p className="text-xs font-medium text-foreground truncate">{user.displayName || user.email}</p>
              <p className="text-[10px] text-muted-foreground capitalize">{user.role || "viewer"}</p>
            </div>
          )}
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LayoutDashboard className="h-4 w-4" />
            Retour au site
          </Link>
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="w-full justify-start text-sm text-muted-foreground hover:text-foreground"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </div>
    </aside>
  )
}
