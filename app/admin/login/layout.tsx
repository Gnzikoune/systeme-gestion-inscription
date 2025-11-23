import type { ReactNode } from "react"

// Layout spécial pour la page de login - pas de protection d'authentification
export default function LoginLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

