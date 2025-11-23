import { type Program } from "@/lib/data/programs"
import { programs as defaultPrograms } from "@/lib/data/programs"

const PROGRAMS_STORAGE_KEY = "csgr_ia_programs"

export function getProgramsFromStorage(): Program[] {
  // Always return empty array on server to avoid hydration mismatch
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(PROGRAMS_STORAGE_KEY)
    if (!stored) {
      // Initialize with default programs if storage is empty
      saveProgramsToStorage(defaultPrograms)
      return defaultPrograms
    }
    return JSON.parse(stored)
  } catch (error) {
    console.error("Error reading programs from localStorage:", error)
    return defaultPrograms
  }
}

export function saveProgramsToStorage(programs: Program[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(PROGRAMS_STORAGE_KEY, JSON.stringify(programs))
  } catch (error) {
    console.error("Error saving programs to localStorage:", error)
  }
}

export function addProgramToStorage(program: Program): void {
  const allPrograms = getProgramsFromStorage()
  allPrograms.push(program)
  saveProgramsToStorage(allPrograms)
}

export function updateProgramInStorage(id: string, updates: Partial<Program>): void {
  const allPrograms = getProgramsFromStorage()
  const index = allPrograms.findIndex((p) => p.id === id)
  if (index !== -1) {
    allPrograms[index] = { ...allPrograms[index], ...updates }
    saveProgramsToStorage(allPrograms)
  }
}

export function deleteProgramFromStorage(id: string): void {
  const allPrograms = getProgramsFromStorage()
  const filtered = allPrograms.filter((p) => p.id !== id)
  saveProgramsToStorage(filtered)
}

export function getProgramByIdFromStorage(id: string): Program | undefined {
  const allPrograms = getProgramsFromStorage()
  return allPrograms.find((p) => p.id === id)
}

export function generateProgramId(): string {
  return `program-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

