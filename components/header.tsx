"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Shield } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()

    if (pathname === "/") {
      // Already on homepage, just scroll to section
      const element = document.querySelector(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    } else {
      // Navigate to homepage first, then scroll
      router.push(`/${sectionId}`)
    }
  }

  const isAdminSection = pathname?.startsWith("/admin")

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <Image src="/logo.png" alt="CSGR-IA Logo" width={50} height={50} className="object-contain" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground">CSGR-IA</h1>
              <p className="text-xs text-muted-foreground">
                Comité Scientifique Gabonais de Recherche sur l'Intelligence Artificielle
              </p>
            </div>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/#programmes"
              onClick={(e) => handleSectionClick(e, "#programmes")}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Programmes
            </Link>
            <Link
              href="/#a-propos"
              onClick={(e) => handleSectionClick(e, "#a-propos")}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              À Propos
            </Link>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1.5 text-sm font-medium ${
                isAdminSection ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Link href="/admin">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
