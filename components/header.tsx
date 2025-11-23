"use client"

import type React from "react"
import { useState } from "react"

import Link from "next/link"
import Image from "next/image"
import { Shield, Menu, X } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    setIsMenuOpen(false)

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
              <h1 className="text-base sm:text-lg md:text-xl font-bold text-foreground">CSGR-IA</h1>
              <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">
                Comité Scientifique Gabonais de Recherche sur l'Intelligence Artificielle
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
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
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium",
                isAdminSection ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Link href="/admin">
                <Shield className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            </Button>
          </nav>

          {/* Mobile Burger Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          {/* Menu */}
          <nav className="fixed top-[73px] left-0 right-0 z-50 border-b border-border bg-background shadow-lg lg:hidden">
            <div className="container mx-auto px-4 py-4 space-y-2">
              <Link
                href="/#programmes"
                onClick={(e) => handleSectionClick(e, "#programmes")}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
              >
                Programmes
              </Link>
              <Link
                href="/#a-propos"
                onClick={(e) => handleSectionClick(e, "#a-propos")}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
              >
                À Propos
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  isAdminSection
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-primary"
                )}
              >
                <Shield className="h-4 w-4" />
                Admin
              </Link>
            </div>
          </nav>
        </>
      )}
    </header>
  )
}
