// Local Storage utilities for persisting registration data
export const STORAGE_KEYS = {
  REGISTRATIONS: "csgr_ia_registrations",
} as const

export interface StoredRegistration {
  id: string
  programme_id: string
  programme_nom: string
  nom: string
  prenom: string
  email: string
  telephone: string
  ville: string
  organisation?: string
  niveau_etude: string
  motivation: string
  date_inscription: string
  statut_paiement: "en_attente" | "valide" | "echoue" | "rembourse"
  montant: number
  methode_paiement: "singpay" | "flutterwave" | "paydunya" | "gratuit"
  numero_inscription: string
}

// Initialize local storage with default data if empty
export function initializeStorage(defaultData: StoredRegistration[]): void {
  if (typeof window === "undefined") return

  const existing = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS)
  if (!existing) {
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(defaultData))
  }
}

// Get all registrations from local storage
export function getRegistrations(): StoredRegistration[] {
  if (typeof window === "undefined") return []

  try {
    const data = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error("[v0] Error reading registrations from localStorage:", error)
    return []
  }
}

// Add a new registration to local storage
export function addRegistration(registration: StoredRegistration): void {
  if (typeof window === "undefined") return

  try {
    const registrations = getRegistrations()
    registrations.push(registration)
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations))
    console.log("[v0] Registration added to localStorage:", registration.numero_inscription)
  } catch (error) {
    console.error("[v0] Error adding registration to localStorage:", error)
  }
}

// Update a registration in local storage
export function updateRegistration(id: string, updates: Partial<StoredRegistration>): void {
  if (typeof window === "undefined") return

  try {
    const registrations = getRegistrations()
    const index = registrations.findIndex((reg) => reg.id === id)

    if (index !== -1) {
      registrations[index] = { ...registrations[index], ...updates }
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations))
      console.log("[v0] Registration updated in localStorage:", id)
    }
  } catch (error) {
    console.error("[v0] Error updating registration in localStorage:", error)
  }
}

// Get a single registration by ID
export function getRegistrationById(id: string): StoredRegistration | undefined {
  const registrations = getRegistrations()
  return registrations.find((reg) => reg.id === id)
}

// Generate unique registration number
export function generateRegistrationNumber(programPrefix: string): string {
  const registrations = getRegistrations()
  const programRegistrations = registrations.filter((reg) => reg.numero_inscription.startsWith(programPrefix))
  const nextNumber = programRegistrations.length + 1
  return `${programPrefix}-${String(nextNumber).padStart(3, "0")}`
}

// Generate unique ID
export function generateRegistrationId(): string {
  return `reg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Delete a registration from local storage
export function deleteRegistration(id: string): boolean {
  if (typeof window === "undefined") return false

  try {
    const registrations = getRegistrations()
    const filteredRegistrations = registrations.filter((reg) => reg.id !== id)

    if (filteredRegistrations.length < registrations.length) {
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(filteredRegistrations))
      console.log("[v0] Registration deleted from localStorage:", id)
      return true
    }
    return false
  } catch (error) {
    console.error("[v0] Error deleting registration from localStorage:", error)
    return false
  }
}

// Update payment status for a registration
export function updatePaymentStatus(id: string, status: "en_attente" | "valide" | "echoue" | "rembourse"): boolean {
  if (typeof window === "undefined") return false

  try {
    updateRegistration(id, { statut_paiement: status })
    return true
  } catch (error) {
    console.error("[v0] Error updating payment status:", error)
    return false
  }
}
