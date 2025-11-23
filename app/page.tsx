"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { programs } from "@/lib/data/programs"
import { Calendar, Clock, ArrowRight, Users, BookOpen, Award, Globe, CalendarDays, Newspaper } from "lucide-react"
import { useEffect, useState } from "react"
import { getNewsFromStorage } from "@/lib/storage/news-storage"
import type { News } from "@/lib/data/news"

export default function HomePage() {
  const [news, setNews] = useState<News[]>([])

  useEffect(() => {
    const loadedNews = getNewsFromStorage()
    const activeNews = loadedNews.filter((n) => n.actif).sort((a, b) => a.ordre - b.ordre)
    setNews(activeNews)
  }, [])

  const actualites = news.filter((n) => n.type === "actualite")
  const evenements = news.filter((n) => n.type === "evenement")
  const recentNews = news.slice(0, 6) // Last 6 items

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-secondary py-20 text-primary-foreground">
          <div className="absolute inset-0 bg-[url('/abstract-circuit-pattern.png')] opacity-10" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30">
                Innovation · Recherche · Excellence
              </Badge>
              <h1 className="mb-6 text-balance text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                Comité Scientifique Gabonais de Recherche sur l'Intelligence Artificielle
              </h1>
              <p className="mb-8 text-pretty text-lg text-primary-foreground/90 leading-relaxed sm:text-xl">
                Structurer, vulgariser et promouvoir la recherche en IA au Gabon pour accélérer le développement
                numérique et scientifique du pays
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  <Link href="#programmes">
                    Découvrir nos programmes
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link href="#a-propos">En savoir plus</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b border-border bg-muted/30 py-8 sm:py-12">
          <div className="container mx-auto px-4">
            {/* Mobile & Tablet: Horizontal Scroll */}
            <div className="flex gap-6 overflow-x-auto pb-4 lg:hidden snap-x snap-mandatory">
              <div className="text-center min-w-[200px] sm:min-w-[220px] flex-shrink-0 snap-start">
                <div className="mb-2 flex justify-center">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">138</div>
                <div className="text-sm text-muted-foreground">Publications en IA</div>
              </div>
              <div className="text-center min-w-[200px] sm:min-w-[220px] flex-shrink-0 snap-start">
                <div className="mb-2 flex justify-center">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <div className="text-3xl font-bold text-foreground">17</div>
                <div className="text-sm text-muted-foreground">Centres UIT mondiaux</div>
              </div>
              <div className="text-center min-w-[200px] sm:min-w-[220px] flex-shrink-0 snap-start">
                <div className="mb-2 flex justify-center">
                  <Award className="h-8 w-8 text-secondary" />
                </div>
                <div className="text-3xl font-bold text-foreground">90%</div>
                <div className="text-sm text-muted-foreground">Couverture 3G/4G</div>
              </div>
              <div className="text-center min-w-[200px] sm:min-w-[220px] flex-shrink-0 snap-start">
                <div className="mb-2 flex justify-center">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">UNESCO</div>
                <div className="text-sm text-muted-foreground">Partenaire officiel</div>
              </div>
            </div>
            {/* Desktop: Grid Layout */}
            <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8">
              <div className="text-center">
                <div className="mb-2 flex justify-center">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">138</div>
                <div className="text-sm text-muted-foreground">Publications en IA</div>
              </div>
              <div className="text-center">
                <div className="mb-2 flex justify-center">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <div className="text-3xl font-bold text-foreground">17</div>
                <div className="text-sm text-muted-foreground">Centres UIT mondiaux</div>
              </div>
              <div className="text-center">
                <div className="mb-2 flex justify-center">
                  <Award className="h-8 w-8 text-secondary" />
                </div>
                <div className="text-3xl font-bold text-foreground">90%</div>
                <div className="text-sm text-muted-foreground">Couverture 3G/4G</div>
              </div>
              <div className="text-center">
                <div className="mb-2 flex justify-center">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">UNESCO</div>
                <div className="text-sm text-muted-foreground">Partenaire officiel</div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="a-propos" className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-balance text-3xl font-bold text-foreground sm:text-4xl">Notre Mission</h2>
                <p className="text-pretty text-lg text-muted-foreground leading-relaxed">
                  Le CSGR-IA est au cœur des initiatives de structuration, vulgarisation et promotion de la recherche en
                  IA au Gabon
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Structuration & Encadrement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Structurer et encadrer la recherche scientifique et technologique en IA au Gabon en mobilisant
                      ministères, universités et partenaires internationaux.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Innovation & Éthique</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Promouvoir l'innovation et l'usage éthique de l'IA selon les standards de l'UNESCO et de l'Union
                      internationale des télécommunications.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Inclusion & Formation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Favoriser l'inclusion, la formation et l'employabilité par le numérique et l'IA dans les secteurs
                      santé, éducation, industrie et culture.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Collaboration Internationale</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Collaboration étroite avec le Centre Gabonais de l'Innovation (CGI), classé parmi les 17 centres
                      UIT mondiaux pour l'accélération en IA.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section id="programmes" className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-balance text-3xl font-bold text-foreground sm:text-4xl">
                Nos Programmes de Formation
              </h2>
              <p className="text-pretty text-lg text-muted-foreground leading-relaxed">
                Découvrez nos programmes de formation et recherche en Intelligence Artificielle
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => (
                <Card key={program.id} className="flex flex-col transition-shadow hover:shadow-lg">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <Image src={program.image || "/placeholder.svg"} alt={program.nom} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <div className="mb-2 flex items-center justify-between">
                      {program.gratuit ? (
                        <Badge className="bg-accent text-accent-foreground">Gratuit</Badge>
                      ) : (
                        <Badge variant="secondary">{program.prix.toLocaleString()} FCFA</Badge>
                      )}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {program.duree}
                      </div>
                    </div>
                    <CardTitle className="text-balance leading-tight">{program.nom}</CardTitle>
                    <CardDescription className="text-pretty leading-relaxed">
                      {program.description_courte}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{program.date_debut}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/programme/${program.id}`}>
                        Voir les détails
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Actualités Section */}
        <section id="actualites" className="bg-gradient-to-br from-muted/30 to-muted/50 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">Actualités & Événements</Badge>
              <h2 className="mb-4 text-balance text-3xl font-bold text-foreground sm:text-4xl">Actualités 2025</h2>
              <p className="text-pretty text-lg text-muted-foreground leading-relaxed">
                Restez informé de nos dernières actualités et événements à venir
              </p>
            </div>

            <Tabs defaultValue="recent" className="mx-auto max-w-6xl">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="recent" className="flex items-center gap-2">
                  <Newspaper className="h-4 w-4" />
                  <span className="hidden sm:inline">Récentes</span>
                  <span className="sm:hidden">Récentes</span>
                </TabsTrigger>
                <TabsTrigger value="evenements" className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span className="hidden sm:inline">Événements à venir</span>
                  <span className="sm:hidden">À venir</span>
                </TabsTrigger>
                <TabsTrigger value="archives" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Archives</span>
                  <span className="sm:hidden">Archives</span>
                </TabsTrigger>
              </TabsList>

              {/* Recent News */}
              <TabsContent value="recent" className="space-y-6">
                {recentNews.length === 0 ? (
                  <Card className="border-dashed">
                    <CardContent className="py-12 text-center">
                      <Newspaper className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                      <p className="text-muted-foreground">Aucune actualité disponible pour le moment.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {recentNews.map((item) => (
                      <Card key={item.id} className="group overflow-hidden transition-all hover:shadow-xl">
                        {item.image && (
                          <div className="relative h-48 w-full overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.titre}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute top-3 right-3">
                              <Badge className="bg-background/80 text-foreground backdrop-blur-sm">
                                {item.type === "actualite" ? "Actualité" : "Événement"}
                              </Badge>
                            </div>
                          </div>
                        )}
                        <CardHeader>
                          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {item.date} · {item.lieu}
                          </div>
                          <CardTitle className="text-balance text-lg leading-tight line-clamp-2">
                            {item.titre}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                            {item.description}
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button asChild variant="ghost" className="w-full group-hover:bg-primary/5">
                            <Link href={`/actualite/${item.id}`}>
                              Lire la suite
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Future Events */}
              <TabsContent value="evenements" className="space-y-6">
                {evenements.length === 0 ? (
                  <Card className="border-dashed">
                    <CardContent className="py-12 text-center">
                      <CalendarDays className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                      <p className="text-muted-foreground">Aucun événement à venir pour le moment.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {evenements.map((item) => (
                      <Card key={item.id} className="group overflow-hidden transition-all hover:shadow-xl">
                        <div className="flex flex-col md:flex-row">
                          {item.image && (
                            <div className="relative h-48 w-full md:h-auto md:w-48 flex-shrink-0 overflow-hidden">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.titre}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                          )}
                          <div className="flex flex-1 items-center p-6">
                            <div className="flex-1">
                              <div className="mb-2 flex items-center gap-2">
                                <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                                  <CalendarDays className="mr-1 h-3 w-3" />
                                  Événement
                                </Badge>
                              </div>
                              <CardTitle className="text-balance leading-tight">{item.titre}</CardTitle>
                              <CardDescription className="flex items-center gap-2">
                                <Calendar className="h-3 w-3" />
                                {item.date} · {item.lieu}
                              </CardDescription>
                            </div>
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="ml-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100 bg-transparent"
                            >
                              <Link href={`/actualite/${item.id}`}>
                                Plus de détails
                                <ArrowRight className="ml-1 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Archives */}
              <TabsContent value="archives" className="space-y-6">
                {actualites.length === 0 ? (
                  <Card className="border-dashed">
                    <CardContent className="py-12 text-center">
                      <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                      <p className="text-muted-foreground">Aucune archive disponible pour le moment.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {actualites.map((item) => (
                      <Card
                        key={item.id}
                        className="group overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg"
                      >
                        <div className="flex flex-col sm:flex-row">
                          {item.image && (
                            <div className="relative h-32 w-full sm:h-auto sm:w-32 flex-shrink-0 overflow-hidden">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.titre}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex flex-1 items-center p-6">
                            <div className="flex-1">
                              <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {item.date} · {item.lieu}
                              </div>
                              <h3 className="mb-2 text-balance text-lg font-semibold leading-tight">{item.titre}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                            </div>
                            <Button
                              asChild
                              variant="ghost"
                              size="sm"
                              className="ml-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              <Link href={`/actualite/${item.id}`}>
                                Voir
                                <ArrowRight className="ml-1 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
