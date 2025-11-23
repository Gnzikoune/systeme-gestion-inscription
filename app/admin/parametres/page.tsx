"use client"

import { PromoConfigCard } from "@/components/admin/promo-config-card"
import { Settings } from "lucide-react"

export default function ParametresPage() {
  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
          <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0" />
          <h1 className="text-xl font-bold text-foreground sm:text-2xl md:text-3xl">Paramètres</h1>
        </div>
        <p className="text-xs text-muted-foreground sm:text-sm md:text-base">
          Configurez les paramètres du système et des fonctionnalités
        </p>
      </div>

      {/* Promo Configuration */}
      <PromoConfigCard />
    </div>
  )
}

