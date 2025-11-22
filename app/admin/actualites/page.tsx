"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react"
import { getNewsFromStorage, updateNewsInStorage } from "@/lib/storage/news-storage"
import type { News } from "@/lib/data/news"
import { AddNewsDialog } from "@/components/admin/add-news-dialog"
import { EditNewsDialog } from "@/components/admin/edit-news-dialog"
import { DeleteNewsDialog } from "@/components/admin/delete-news-dialog"
import { useToast } from "@/hooks/use-toast"

export default function AdminActualitesPage() {
  const [news, setNews] = useState<News[]>([])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingNews, setEditingNews] = useState<News | null>(null)
  const [deletingNews, setDeletingNews] = useState<News | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadNews()
  }, [])

  const loadNews = () => {
    const loadedNews = getNewsFromStorage()
    setNews(loadedNews.sort((a, b) => a.ordre - b.ordre))
  }

  const handleToggleActive = (item: News) => {
    updateNewsInStorage(item.id, { actif: !item.actif })
    loadNews()
    toast({
      title: "Actualité mise à jour",
      description: `L'actualité a été ${!item.actif ? "activée" : "désactivée"}.`,
    })
  }

  const handleMoveUp = (item: News) => {
    const currentIndex = news.findIndex((n) => n.id === item.id)
    if (currentIndex > 0) {
      const previousItem = news[currentIndex - 1]
      updateNewsInStorage(item.id, { ordre: previousItem.ordre })
      updateNewsInStorage(previousItem.id, { ordre: item.ordre })
      loadNews()
      toast({
        title: "Ordre modifié",
        description: "L'actualité a été déplacée vers le haut.",
      })
    }
  }

  const handleMoveDown = (item: News) => {
    const currentIndex = news.findIndex((n) => n.id === item.id)
    if (currentIndex < news.length - 1) {
      const nextItem = news[currentIndex + 1]
      updateNewsInStorage(item.id, { ordre: nextItem.ordre })
      updateNewsInStorage(nextItem.id, { ordre: item.ordre })
      loadNews()
      toast({
        title: "Ordre modifié",
        description: "L'actualité a été déplacée vers le bas.",
      })
    }
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Gestion des Actualités</h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Gérez les actualités affichées sur la page d'accueil du site
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} size="default" className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle actualité
        </Button>
      </div>

      <div className="space-y-4">
        {news.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-sm text-muted-foreground sm:text-base">
                Aucune actualité. Cliquez sur "Nouvelle actualité" pour commencer.
              </p>
            </CardContent>
          </Card>
        ) : (
          news.map((item, index) => (
            <Card key={item.id} className={!item.actif ? "opacity-60" : ""}>
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <CardTitle className="break-words text-base sm:text-lg">{item.titre}</CardTitle>
                      {item.actif ? <Badge variant="default">Actif</Badge> : <Badge variant="secondary">Inactif</Badge>}
                      <Badge variant="outline" className="text-xs">
                        {item.type === "actualite" ? "Actualité" : item.type === "evenement" ? "Événement" : "Archive"}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs sm:text-sm">
                      {item.date} · {item.lieu}
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMoveUp(item)}
                      disabled={index === 0}
                      title="Monter"
                      className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMoveDown(item)}
                      disabled={index === news.length - 1}
                      title="Descendre"
                      className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleActive(item)}
                      title={item.actif ? "Désactiver" : "Activer"}
                      className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                    >
                      {item.actif ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingNews(item)}
                      title="Modifier"
                      className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeletingNews(item)}
                      className="h-8 w-8 p-0 text-destructive hover:bg-destructive hover:text-destructive-foreground sm:h-9 sm:w-9"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {item.image && (
                  <div className="mb-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.titre}
                      className="h-32 w-full rounded-lg object-cover sm:h-40 md:h-48"
                    />
                  </div>
                )}
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <AddNewsDialog open={showAddDialog} onOpenChange={setShowAddDialog} onSuccess={loadNews} />
      {editingNews && (
        <EditNewsDialog
          news={editingNews}
          open={!!editingNews}
          onOpenChange={(open) => !open && setEditingNews(null)}
          onSuccess={loadNews}
        />
      )}
      {deletingNews && (
        <DeleteNewsDialog
          news={deletingNews}
          open={!!deletingNews}
          onOpenChange={(open) => !open && setDeletingNews(null)}
          onSuccess={loadNews}
        />
      )}
    </div>
  )
}
