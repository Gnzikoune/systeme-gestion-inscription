"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, CheckCircle2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function AdminAuthNotice() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <Alert className="mb-6 border-green-500/50 bg-green-500/5">
      <CheckCircle2 className="h-4 w-4 text-green-600" />
      <AlertDescription className="text-xs sm:text-sm">
        <strong>Connecté en tant que :</strong> {user.displayName || user.email} ({user.role || "viewer"})
        {" - "}
        <span className="text-muted-foreground">Mode authentification simulé (préparé pour Firebase)</span>
      </AlertDescription>
    </Alert>
  )
}
