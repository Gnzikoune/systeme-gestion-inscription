"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { LogIn, AlertCircle } from "lucide-react"
import Image from "next/image"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await signIn(email, password)
      router.push("/admin")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Image Section - Desktop only */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <Image
          src="/placeholder.svg"
          alt="CSGR-IA"
          fill
          className="object-cover"
          sizes="50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-accent/80 to-secondary/80" />
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="text-center text-primary-foreground">
            <div className="mb-6 flex items-center justify-center">
              <Image src="/logo.png" alt="CSGR-IA Logo" width={120} height={120} className="object-contain" />
            </div>
            <h1 className="mb-4 text-3xl font-bold">CSGR-IA</h1>
            <p className="text-lg text-primary-foreground/90">
              Comité Scientifique Gabonais de Recherche sur l'Intelligence Artificielle
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex flex-1 items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="pb-3 sm:pb-6 space-y-1">
            {/* Logo - Mobile/Tablette */}
            <div className="mx-auto mb-4 flex items-center justify-center lg:hidden">
              <Image src="/logo.png" alt="CSGR-IA Logo" width={64} height={64} className="object-contain" />
            </div>
            <CardTitle className="text-xl font-bold text-foreground text-center sm:text-2xl md:text-2xl lg:text-2xl">
              Connexion Admin
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground text-center sm:text-sm md:text-sm lg:text-sm">
              Accédez au tableau de bord d'administration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs sm:text-sm">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs sm:text-sm">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@csgr-ia.ga"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-xs sm:text-sm"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs sm:text-sm">
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-xs sm:text-sm"
                  disabled={loading}
                />
              </div>

              <Button type="submit" className="w-full" size="sm" disabled={loading}>
                {loading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                    Connexion...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Se connecter
                  </>
                )}
              </Button>
            </form>

            <div className="mt-4 sm:mt-6 rounded-lg border border-border bg-muted/50 p-3 sm:p-4">
              <p className="mb-2 text-xs font-semibold text-foreground sm:text-sm">Identifiants de test :</p>
              <div className="space-y-1 text-xs text-muted-foreground sm:text-sm">
                <p className="break-words">
                  <strong>Admin:</strong> admin@csgr-ia.ga / admin123
                </p>
                <p className="break-words">
                  <strong>Éditeur:</strong> editor@csgr-ia.ga / editor123
                </p>
                <p className="break-words">
                  <strong>Visualiseur:</strong> viewer@csgr-ia.ga / viewer123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

