import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 items-center justify-center bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md text-center">
            <div className="mb-8">
              <h1 className="mb-2 text-6xl font-bold text-foreground">404</h1>
              <h2 className="mb-4 text-balance text-2xl font-semibold text-foreground">Page non trouvée</h2>
              <p className="text-pretty text-muted-foreground leading-relaxed">
                Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Retour à l'accueil
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/#programmes">Voir les programmes</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
