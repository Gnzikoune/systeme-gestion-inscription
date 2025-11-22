"use client"

import { PromoConfigCard } from "@/components/admin/promo-config-card"
import { Settings } from "lucide-react"

export default function ParametresPage() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Settings className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Paramètres</h1>
        </div>
        <p className="text-sm text-muted-foreground sm:text-base">
          Configurez les paramètres du système et des fonctionnalités
        </p>
      </div>

      {/* Promo Configuration */}
      <PromoConfigCard />
    </div>
  )
}

