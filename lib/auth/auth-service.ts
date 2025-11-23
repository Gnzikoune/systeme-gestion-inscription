// Point d'entrée pour le service d'authentification
// Actuellement utilise MockAuthService, mais peut être facilement remplacé par Firebase

import { mockAuthService } from "./mock-auth-service"
import type { AuthService } from "./types"

// TODO: Remplacer par Firebase Auth lors de l'intégration
// import { firebaseAuthService } from "./firebase-auth-service"
// export const authService: AuthService = firebaseAuthService

export const authService: AuthService = mockAuthService

