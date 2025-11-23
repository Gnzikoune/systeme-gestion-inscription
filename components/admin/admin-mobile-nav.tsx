"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Users, Newspaper, Settings, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

const sidebarLinks = [
  {
    href: "/admin",
    label: "Inscriptions",
    icon: Users,
  },
  {
    href: "/admin/actualites",
    label: "Actualités",
    icon: Newspaper,
  },
  {
    href: "/admin/parametres",
    label: "Paramètres",
    icon: Settings,
  },
]

export function AdminMobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-border bg-card px-4 py-3 shadow-sm lg:hidden">
        <Link href="/" className="flex items-center gap-2 min-w-0">
          <Image src="/logo.png" alt="CSGR-IA Logo" width={32} height={32} className="object-contain shrink-0" />
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-foreground truncate">CSGR-IA</h2>
            <p className="text-xs text-muted-foreground truncate">Administration</p>
          </div>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="shrink-0">
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <aside className="fixed left-0 top-[65px] z-50 h-[calc(100vh-65px)] w-64 max-w-[85vw] border-r border-border bg-card shadow-lg lg:hidden">
            <nav className="space-y-1 p-4 overflow-y-auto h-full">
              {sidebarLinks.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href || (link.href !== "/admin" && pathname?.startsWith(link.href))

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {link.label}
                  </Link>
                )
              })}
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <LayoutDashboard className="h-5 w-5 shrink-0" />
                Retour au site
              </Link>
            </nav>
          </aside>
        </>
      )}
    </>
  )
}
