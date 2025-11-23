// Types pour l'authentification (compatible Firebase)
export interface User {
  uid: string
  email: string
  displayName?: string
  photoURL?: string
  role?: UserRole
  emailVerified?: boolean
}

export type UserRole = "admin" | "editor" | "viewer"

export interface AuthCredentials {
  email: string
  password: string
}

export interface AuthService {
  signIn(email: string, password: string): Promise<User>
  signOut(): Promise<void>
  getCurrentUser(): Promise<User | null>
  onAuthStateChanged(callback: (user: User | null) => void): () => void
}

