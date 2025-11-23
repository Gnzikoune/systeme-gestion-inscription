import { type Stat, defaultStats } from "@/lib/data/stats"

const STATS_STORAGE_KEY = "csgr_ia_stats"

export function getStatsFromStorage(): Stat[] {
  // Always return empty array on server to avoid hydration mismatch
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(STATS_STORAGE_KEY)
    if (!stored) {
      // Initialize with default stats if storage is empty
      saveStatsToStorage(defaultStats)
      return defaultStats
    }
    return JSON.parse(stored)
  } catch (error) {
    console.error("Error reading stats from localStorage:", error)
    return defaultStats
  }
}

export function saveStatsToStorage(stats: Stat[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats))
  } catch (error) {
    console.error("Error saving stats to localStorage:", error)
  }
}

export function addStatToStorage(stat: Stat): void {
  const allStats = getStatsFromStorage()
  allStats.push(stat)
  saveStatsToStorage(allStats)
}

export function updateStatInStorage(id: string, updates: Partial<Stat>): void {
  const allStats = getStatsFromStorage()
  const index = allStats.findIndex((s) => s.id === id)
  if (index !== -1) {
    allStats[index] = { ...allStats[index], ...updates }
    saveStatsToStorage(allStats)
  }
}

export function deleteStatFromStorage(id: string): void {
  const allStats = getStatsFromStorage()
  const filtered = allStats.filter((s) => s.id !== id)
  saveStatsToStorage(filtered)
}

export function generateStatId(): string {
  return `stat-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

