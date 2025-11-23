import { type CTA, defaultCTA } from "@/lib/data/cta"

const CTA_STORAGE_KEY = "csgr_ia_cta"

export function getCTAFromStorage(): CTA {
  // Always return default on server to avoid hydration mismatch
  if (typeof window === "undefined") return defaultCTA

  try {
    const stored = localStorage.getItem(CTA_STORAGE_KEY)
    if (!stored) {
      // Initialize with default on first load
      saveCTAToStorage(defaultCTA)
      return defaultCTA
    }
    return JSON.parse(stored)
  } catch (error) {
    console.error("Error reading CTA from localStorage:", error)
    return defaultCTA
  }
}

export function saveCTAToStorage(cta: CTA): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(CTA_STORAGE_KEY, JSON.stringify(cta))
  } catch (error) {
    console.error("Error saving CTA to localStorage:", error)
  }
}

export function updateCTAInStorage(updates: Partial<CTA>): void {
  const currentCTA = getCTAFromStorage()
  const updatedCTA = {
    ...currentCTA,
    ...updates,
    date_modification: new Date().toISOString(),
  }
  saveCTAToStorage(updatedCTA)
}

