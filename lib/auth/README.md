# Système d'authentification

## Architecture actuelle

Le système d'authentification est conçu pour être facilement remplaçable par Firebase Auth.

### Structure

- **`types.ts`** : Types et interfaces pour l'authentification (compatible Firebase)
- **`mock-auth-service.ts`** : Implémentation simulée pour le développement
- **`auth-service.ts`** : Point d'entrée qui peut être facilement remplacé par Firebase

### Identifiants de test

- **Admin** : `admin@csgr-ia.ga` / `admin123`
- **Éditeur** : `editor@csgr-ia.ga` / `editor123`
- **Visualiseur** : `viewer@csgr-ia.ga` / `viewer123`

## Migration vers Firebase

Pour migrer vers Firebase Auth :

1. **Créer `firebase-auth-service.ts`** :
```typescript
import { getAuth, signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged as firebaseOnAuthStateChanged } from "firebase/auth"
import type { AuthService, User } from "./types"

export class FirebaseAuthService implements AuthService {
  private auth = getAuth()

  async signIn(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password)
    return this.mapFirebaseUser(userCredential.user)
  }

  async signOut(): Promise<void> {
    await firebaseSignOut(this.auth)
  }

  async getCurrentUser(): Promise<User | null> {
    const user = this.auth.currentUser
    return user ? this.mapFirebaseUser(user) : null
  }

  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return firebaseOnAuthStateChanged(this.auth, (firebaseUser) => {
      callback(firebaseUser ? this.mapFirebaseUser(firebaseUser) : null)
    })
  }

  private mapFirebaseUser(firebaseUser: any): User {
    // Mapper les données Firebase vers notre interface User
    // Récupérer le rôle depuis Firestore ou les custom claims
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      emailVerified: firebaseUser.emailVerified,
      role: firebaseUser.customClaims?.role || "viewer", // À adapter selon votre structure
    }
  }
}
```

2. **Modifier `auth-service.ts`** :
```typescript
import { firebaseAuthService } from "./firebase-auth-service"
export const authService: AuthService = firebaseAuthService
```

3. **Gérer les rôles** :
   - Utiliser Firebase Custom Claims pour les rôles
   - Ou stocker les rôles dans Firestore et les récupérer lors de la connexion

## Utilisation

Le contexte `AuthProvider` et le hook `useAuth` sont utilisés dans toute l'application.

Les routes admin sont protégées par `AuthGuard` dans `app/admin/layout.tsx`.

