import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getProgramById } from "@/lib/data/programs"
import { Calendar, Clock, Check, ArrowLeft } from "lucide-react"

export default async function ProgramPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  // Gérer les params synchrones et asynchrones pour Next.js 16
  const resolvedParams = params instanceof Promise ? await params : params
  
  if (!resolvedParams?.id) {
    notFound()
  }
  
  const program = getProgramById(resolvedParams.id)

  if (!program) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-secondary py-12 text-primary-foreground">
          <div className="container relative mx-auto px-4">
            <Button
              asChild
              variant="ghost"
              className="mb-4 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux programmes
              </Link>
            </Button>

            <div className="mx-auto max-w-4xl">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                {program.gratuit ? (
                  <Badge className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30">
                    Formation Gratuite
                  </Badge>
                ) : (
                  <Badge className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30">
                    {program.prix.toLocaleString()} FCFA
                  </Badge>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{program.duree}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {program.date_debut} - {program.date_fin}
                  </span>
                </div>
              </div>

              <h1 className="mb-4 text-balance text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                {program.nom}
              </h1>
              <p className="text-pretty text-lg text-primary-foreground/90 leading-relaxed">
                {program.description_courte}
              </p>
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section className="border-b border-border">
          <div className="container mx-auto px-4 py-8">
            <div className="relative mx-auto h-96 max-w-4xl overflow-hidden rounded-lg">
              <Image src={program.image || "/placeholder.svg"} alt={program.nom} fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h2 className="mb-4 text-2xl font-bold text-foreground">Description</h2>
                    <p className="text-pretty text-muted-foreground leading-relaxed">{program.description_longue}</p>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Objectifs de la formation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {program.objectifs.map((objectif, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                            <span className="text-sm text-muted-foreground leading-relaxed">{objectif}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Prérequis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {program.prerequis.map((prerequis, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                            <span className="text-sm text-muted-foreground leading-relaxed">{prerequis}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Modalités</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {program.modalites.map((modalite, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Check className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                            <span className="text-sm text-muted-foreground leading-relaxed">{modalite}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Prix</div>
                        <div className="text-xl font-bold text-foreground">
                          {program.gratuit ? "Gratuit" : `${program.prix.toLocaleString()} FCFA`}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Durée</div>
                        <div className="text-lg font-semibold text-foreground">{program.duree}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Début</div>
                        <div className="text-lg font-semibold text-foreground">{program.date_debut}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Fin</div>
                        <div className="text-lg font-semibold text-foreground">{program.date_fin}</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button asChild size="lg" className="w-full">
                    <Link href={`/inscription/${program.id}`}>Commencer l'inscription</Link>
                  </Button>

                  <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Les places sont limitées. Inscrivez-vous dès maintenant pour réserver votre place.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
