"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MapPin } from "lucide-react"
import { getNewsFromStorage } from "@/lib/storage/news-storage"
import type { News } from "@/lib/data/news"

export default function ActualiteDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = params?.id as string
    if (id) {
      const allNews = getNewsFromStorage()
      const found = allNews.find((n) => n.id === id)
      setNews(found || null)
      setLoading(false)
    }
  }, [params])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Chargement...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!news) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-foreground">Actualité introuvable</h1>
            <Button onClick={() => router.push("/")}>Retour à l'accueil</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <Button variant="ghost" onClick={() => router.push("/#actualites")} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux actualités
          </Button>

          <article className="mx-auto max-w-4xl">
            {news.image && (
              <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
                <Image src={news.image || "/placeholder.svg"} alt={news.titre} fill className="object-cover" />
              </div>
            )}

            <Card>
              <CardHeader>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge variant="default">Actualité 2025</Badge>
                  {news.actif && <Badge variant="secondary">En cours</Badge>}
                </div>
                <CardTitle className="mb-4 text-3xl text-balance leading-tight">{news.titre}</CardTitle>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{news.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{news.lieu}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-slate max-w-none">
                  <p className="text-lg font-medium leading-relaxed text-foreground">{news.description}</p>
                </div>

                {news.contenu && (
                  <div className="prose prose-slate max-w-none border-t border-border pt-6">
                    <div className="whitespace-pre-wrap leading-relaxed text-muted-foreground">{news.contenu}</div>
                  </div>
                )}

                {!news.contenu && (
                  <div className="rounded-lg bg-muted/30 p-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Plus de détails seront bientôt disponibles sur cette actualité.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  )
}
