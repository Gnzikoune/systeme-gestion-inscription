import { type PromoConfig } from "@/lib/data/promo-config"

const PROMO_STORAGE_KEY = "csgr_ia_promo_config"

// Configuration par défaut
const defaultConfig: PromoConfig = {
  programId: "ai4steam-2026",
  enabled: true,
  delay: 3000, // 3 secondes
  cooldownDays: 1, // 1 jour
}

export function savePromoConfig(config: PromoConfig): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(config))
    // Déclencher un événement personnalisé pour notifier les autres composants
    window.dispatchEvent(new Event("promoConfigUpdated"))
  } catch (error) {
    console.error("Error saving promo config to localStorage:", error)
  }
}

export function getPromoConfig(): PromoConfig {
  if (typeof window === "undefined") return defaultConfig

  try {
    const stored = localStorage.getItem(PROMO_STORAGE_KEY)
    if (!stored) {
      // Si aucune config n'existe, sauvegarder la config par défaut
      savePromoConfig(defaultConfig)
      return defaultConfig
    }
    return JSON.parse(stored)
  } catch (error) {
    console.error("Error reading promo config from localStorage:", error)
    return defaultConfig
  }
}

export function resetPromoConfig(): void {
  savePromoConfig(defaultConfig)
}

