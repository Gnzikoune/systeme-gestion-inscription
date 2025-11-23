"use client"

import type { AuthService, User, UserRole } from "./types"

// Identifiants de test
const TEST_USERS: Array<{
  email: string
  password: string
  user: User
}> = [
  {
    email: "admin@csgr-ia.ga",
    password: "admin123",
    user: {
      uid: "mock-admin-1",
      email: "admin@csgr-ia.ga",
      displayName: "Administrateur",
      role: "admin",
      emailVerified: true,
    },
  },
  {
    email: "editor@csgr-ia.ga",
    password: "editor123",
    user: {
      uid: "mock-editor-1",
      email: "editor@csgr-ia.ga",
      displayName: "Éditeur",
      role: "editor",
      emailVerified: true,
    },
  },
  {
    email: "viewer@csgr-ia.ga",
    password: "viewer123",
    user: {
      uid: "mock-viewer-1",
      email: "viewer@csgr-ia.ga",
      displayName: "Visualiseur",
      role: "viewer",
      emailVerified: true,
    },
  },
]

const AUTH_STORAGE_KEY = "csgr_ia_auth_user"

export class MockAuthService implements AuthService {
  private listeners: Set<(user: User | null) => void> = new Set()

  async signIn(email: string, password: string): Promise<User> {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 500))

    const testUser = TEST_USERS.find(
      (u) => u.email === email && u.password === password
    )

    if (!testUser) {
      throw new Error("Identifiants incorrects")
    }

    // Stocker l'utilisateur dans localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(testUser.user))
    }

    // Notifier les listeners
    this.notifyListeners(testUser.user)

    return testUser.user
  }

  async signOut(): Promise<void> {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 300))

    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }

    // Notifier les listeners
    this.notifyListeners(null)
  }

  async getCurrentUser(): Promise<User | null> {
    if (typeof window === "undefined") return null

    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY)
      if (!stored) return null
      return JSON.parse(stored) as User
    } catch {
      return null
    }
  }

  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    this.listeners.add(callback)

    // Appeler immédiatement avec l'utilisateur actuel
    this.getCurrentUser().then(callback)

    // Retourner une fonction de désabonnement
    return () => {
      this.listeners.delete(callback)
    }
  }

  private notifyListeners(user: User | null) {
    this.listeners.forEach((callback) => callback(user))
  }
}

// Instance singleton
export const mockAuthService = new MockAuthService()

