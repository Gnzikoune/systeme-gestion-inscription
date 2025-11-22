import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

export function AdminAuthNotice() {
  return (
    <Alert className="mb-6 border-primary/50 bg-primary/5">
      <Info className="h-4 w-4 text-primary" />
      <AlertDescription className="text-sm">
        <strong>Mode Démo:</strong> Cette interface administrateur affiche des données simulées. Dans la version
        production, l'accès sera protégé par authentification et connecté à Firebase.
      </AlertDescription>
    </Alert>
  )
}
