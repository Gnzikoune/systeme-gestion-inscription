import type { StoredRegistration } from "@/lib/storage/local-storage"

export type PaymentStatus = "en_attente" | "valide" | "echoue" | "rembourse"
export type PaymentMethod = "airtel_money" | "moov_money" | "stripe" | "gratuit"

export interface Registration extends StoredRegistration {}

// Mock data - initial default registrations
export const defaultRegistrations: Registration[] = []

// Utility functions
export function formatPaymentStatus(status: PaymentStatus): string {
  const statusMap: Record<PaymentStatus, string> = {
    en_attente: "En attente",
    valide: "Validé",
    echoue: "Échoué",
    rembourse: "Remboursé",
  }
  return statusMap[status]
}

export function getPaymentStatusColor(status: PaymentStatus): "default" | "secondary" | "destructive" | "outline" {
  const colorMap: Record<PaymentStatus, "default" | "secondary" | "destructive" | "outline"> = {
    en_attente: "secondary",
    valide: "default",
    echoue: "destructive",
    rembourse: "outline",
  }
  return colorMap[status]
}

// Export CSV functionality
export function exportRegistrationsToCSV(regs: Registration[]): string {
  const headers = [
    "Numéro d'inscription",
    "Programme",
    "Nom",
    "Prénom",
    "Email",
    "Téléphone",
    "Ville",
    "Organisation",
    "Niveau d'études",
    "Date d'inscription",
    "Statut paiement",
    "Montant (FCFA)",
    "Méthode de paiement",
  ]

  const rows = regs.map((reg) => [
    reg.numero_inscription,
    reg.programme_nom,
    reg.nom,
    reg.prenom,
    reg.email,
    reg.telephone,
    reg.ville,
    reg.organisation || "N/A",
    reg.niveau_etude,
    new Date(reg.date_inscription).toLocaleDateString("fr-FR"),
    formatPaymentStatus(reg.statut_paiement),
    reg.montant.toString(),
    reg.methode_paiement,
  ])

  const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")

  return csvContent
}
