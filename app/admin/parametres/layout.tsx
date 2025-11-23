"use client"

import type { ReactNode } from "react"
import { AuthGuard } from "@/components/admin/auth-guard"

// La page paramètres nécessite le rôle admin
export default function ParametresLayout({ children }: { children: ReactNode }) {
  return <AuthGuard requiredRole="admin">{children}</AuthGuard>
}

