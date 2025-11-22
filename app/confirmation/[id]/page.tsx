"use client"

import { useEffect, useState, use } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getProgramById } from "@/lib/data/programs"
import { CheckCircle, Mail, Calendar, Home } from "lucide-react"

export default function ConfirmationPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const searchParams = useSearchParams()
  const isGratuit = searchParams.get("gratuit") === "true"
  // Déballer les params (Promise ou objet direct) avec React.use()
  const resolvedParams = use(params instanceof Promise ? params : Promise.resolve(params))
  const program = getProgramById(resolvedParams.id)
  const [inscriptionData, setInscriptionData] = useState<any>(null)
  const [inscriptionId] = useState(() => `INS-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`)

  useEffect(() => {
    const data = sessionStorage.getItem("inscription")
    if (data) {
      setInscriptionData(JSON.parse(data))
    }
  }, [])

  if (!program) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-balance text-2xl">Inscription confirmée !</CardTitle>
                <CardDescription className="text-pretty">
                  Votre inscription au programme a été enregistrée avec succès
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Numéro d'inscription</span>
                      <span className="font-mono font-semibold text-foreground">{inscriptionId}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Programme</span>
                      <span className="font-medium text-foreground">{program.nom}</span>
                    </div>
                    {inscriptionData && (
                      <>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Participant</span>
                          <span className="font-medium text-foreground">
                            {inscriptionData.prenom} {inscriptionData.nom}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Email</span>
                          <span className="font-medium text-foreground">{inscriptionData.email}</span>
                        </div>
                      </>
                    )}
                    <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
                      <span className="text-muted-foreground">Statut du paiement</span>
                      <span className="font-semibold text-primary">
                        {isGratuit ? "Inscription gratuite" : "Paiement réussi"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 rounded-lg bg-primary/5 p-4">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Email de confirmation envoyé</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Vous recevrez sous peu un email contenant tous les détails de votre inscription et les
                        prochaines étapes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg bg-accent/5 p-4">
                    <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Prochaines étapes</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Vous serez contacté par le comité avant le début de la formation avec toutes les informations
                        nécessaires (accès plateforme, calendrier détaillé, etc.).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Button asChild size="lg" className="w-full">
                    <Link href="/">
                      <Home className="mr-2 h-4 w-4" />
                      Retour à l'accueil
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full bg-transparent">
                    <Link href="/#programmes">Découvrir d'autres programmes</Link>
                  </Button>
                </div>

                <p className="text-center text-xs text-muted-foreground leading-relaxed">
                  Pour toute question, n'hésitez pas à contacter le CSGR-IA
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
