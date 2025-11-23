"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Eye, EyeOff, ArrowUp, ArrowDown, Newspaper } from "lucide-react"
import { getNewsFromStorage, updateNewsInStorage } from "@/lib/storage/news-storage"
import type { News } from "@/lib/data/news"
import { AddNewsDialog } from "@/components/admin/add-news-dialog"
import { EditNewsDialog } from "@/components/admin/edit-news-dialog"
import { DeleteNewsDialog } from "@/components/admin/delete-news-dialog"
import { useToast } from "@/hooks/use-toast"
import { usePermissions } from "@/hooks/use-permissions"

export default function AdminActualitesPage() {
  const [news, setNews] = useState<News[]>([])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingNews, setEditingNews] = useState<News | null>(null)
  const [deletingNews, setDeletingNews] = useState<News | null>(null)
  const { toast } = useToast()
  const { can } = usePermissions()

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
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:gap-4 md:mb-8 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-foreground sm:text-2xl md:text-2xl lg:text-2xl">Gestion des Actualités</h1>
          <p className="mt-1.5 text-xs text-muted-foreground sm:mt-2 sm:text-sm md:text-sm lg:text-sm">
            Gérez les actualités affichées sur la page d'accueil du site
          </p>
        </div>
        {can("create:actualites") && (
          <Button onClick={() => setShowAddDialog(true)} size="sm" className="w-full shrink-0 sm:w-auto sm:size-default">
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Nouvelle actualité</span>
            <span className="sm:hidden">Nouvelle</span>
          </Button>
        )}
      </div>

      <div className="space-y-3 sm:space-y-4">
        {news.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center sm:py-16">
              <Newspaper className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
              <p className="text-sm font-medium text-foreground mb-1">Aucune actualité</p>
              <p className="text-xs text-muted-foreground mb-4">
                Commencez par créer votre première actualité.
              </p>
              {can("create:actualites") && (
                <Button onClick={() => setShowAddDialog(true)} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Créer une actualité
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          news.map((item, index) => (
            <Card key={item.id} className={!item.actif ? "opacity-60" : ""}>
              <CardHeader className="pb-3 sm:pb-6">
                <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <CardTitle className="break-words text-sm sm:text-base md:text-base lg:text-base">{item.titre}</CardTitle>
                      {item.actif ? <Badge variant="default" className="text-xs">Actif</Badge> : <Badge variant="secondary" className="text-xs">Inactif</Badge>}
                      <Badge variant="outline" className="text-xs">
                        {item.type === "actualite" ? "Actualité" : item.type === "evenement" ? "Événement" : "Archive"}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs sm:text-sm break-words">
                      {item.date} · {item.lieu}
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 shrink-0">
                    {can("reorder:actualites") && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoveUp(item)}
                          disabled={index === 0}
                          title="Monter"
                          className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                        >
                          <ArrowUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoveDown(item)}
                          disabled={index === news.length - 1}
                          title="Descendre"
                          className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                        >
                          <ArrowDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Button>
                      </>
                    )}
                    {can("edit:actualites") && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleActive(item)}
                          title={item.actif ? "Désactiver" : "Activer"}
                          className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                        >
                          {item.actif ? <EyeOff className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingNews(item)}
                          title="Modifier"
                          className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                        >
                          <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Button>
                      </>
                    )}
                    {can("delete:actualites") && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeletingNews(item)}
                        className="h-8 w-8 p-0 text-destructive hover:bg-destructive hover:text-destructive-foreground sm:h-9 sm:w-9"
                        title="Supprimer"
                      >
                        <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 sm:pt-6">
                {item.image && (
                  <div className="mb-3 sm:mb-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.titre}
                      className="h-32 w-full rounded-lg object-cover sm:h-40 md:h-48"
                    />
                  </div>
                )}
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.description}</p>
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
