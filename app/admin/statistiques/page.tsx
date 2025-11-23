"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react"
import { getStatsFromStorage, updateStatInStorage } from "@/lib/storage/stats-storage"
import type { Stat } from "@/lib/data/stats"
import { AddStatDialog } from "@/components/admin/add-stat-dialog"
import { EditStatDialog } from "@/components/admin/edit-stat-dialog"
import { DeleteStatDialog } from "@/components/admin/delete-stat-dialog"
import { useToast } from "@/hooks/use-toast"
import { BookOpen, Users, Award, Globe, GraduationCap, Building, TrendingUp, Target } from "lucide-react"

const iconMap = {
  BookOpen,
  Users,
  Award,
  Globe,
  GraduationCap,
  Building,
  TrendingUp,
  Target,
}

const colorMap = {
  primary: "text-primary",
  accent: "text-accent",
  secondary: "text-secondary",
  default: "text-foreground",
}

export default function AdminStatistiquesPage() {
  const [stats, setStats] = useState<Stat[]>([])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingStat, setEditingStat] = useState<Stat | null>(null)
  const [deletingStat, setDeletingStat] = useState<Stat | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = () => {
    const loadedStats = getStatsFromStorage()
    setStats(loadedStats.sort((a, b) => a.ordre - b.ordre))
  }

  const handleToggleActive = (item: Stat) => {
    updateStatInStorage(item.id, { actif: !item.actif })
    loadStats()
    toast({
      title: "Statistique mise à jour",
      description: `La statistique a été ${!item.actif ? "activée" : "désactivée"}.`,
    })
  }

  const handleMoveUp = (item: Stat) => {
    const currentIndex = stats.findIndex((s) => s.id === item.id)
    if (currentIndex > 0) {
      const previousItem = stats[currentIndex - 1]
      updateStatInStorage(item.id, { ordre: previousItem.ordre })
      updateStatInStorage(previousItem.id, { ordre: item.ordre })
      loadStats()
      toast({
        title: "Ordre modifié",
        description: "La statistique a été déplacée vers le haut.",
      })
    }
  }

  const handleMoveDown = (item: Stat) => {
    const currentIndex = stats.findIndex((s) => s.id === item.id)
    if (currentIndex < stats.length - 1) {
      const nextItem = stats[currentIndex + 1]
      updateStatInStorage(item.id, { ordre: nextItem.ordre })
      updateStatInStorage(nextItem.id, { ordre: item.ordre })
      loadStats()
      toast({
        title: "Ordre modifié",
        description: "La statistique a été déplacée vers le bas.",
      })
    }
  }

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:gap-4 md:mb-8 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-foreground sm:text-2xl md:text-3xl">Gestion des Statistiques</h1>
          <p className="mt-1.5 text-xs text-muted-foreground sm:mt-2 sm:text-sm md:text-base">
            Gérez les statistiques affichées sur la page d'accueil
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} size="sm" className="w-full shrink-0 sm:w-auto sm:size-default">
          <Plus className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Nouvelle statistique</span>
          <span className="sm:hidden">Nouvelle</span>
        </Button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {stats.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center sm:py-12">
              <p className="text-xs text-muted-foreground sm:text-sm md:text-base">
                Aucune statistique. Cliquez sur "Nouvelle statistique" pour commencer.
              </p>
            </CardContent>
          </Card>
        ) : (
          stats.map((item, index) => {
            const Icon = iconMap[item.icon]
            const colorClass = colorMap[item.color]

            return (
              <Card key={item.id} className={!item.actif ? "opacity-60" : ""}>
                <CardHeader className="pb-3 sm:pb-6">
                  <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <div className="flex items-center gap-2">
                          <Icon className={`h-5 w-5 ${colorClass} shrink-0`} />
                          <CardTitle className="break-words text-sm sm:text-base md:text-lg">{item.label}</CardTitle>
                        </div>
                        {item.actif ? <Badge variant="default" className="text-xs">Actif</Badge> : <Badge variant="secondary" className="text-xs">Inactif</Badge>}
                      </div>
                      <CardDescription className="text-xs sm:text-sm break-words">
                        Valeur: <span className="font-semibold text-foreground">{item.value}</span>
                      </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 shrink-0">
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
                        disabled={index === stats.length - 1}
                        title="Descendre"
                        className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                      >
                        <ArrowDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </Button>
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
                        onClick={() => setEditingStat(item)}
                        title="Modifier"
                        className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                      >
                        <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeletingStat(item)}
                        className="h-8 w-8 p-0 text-destructive hover:bg-destructive hover:text-destructive-foreground sm:h-9 sm:w-9"
                        title="Supprimer"
                      >
                        <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            )
          })
        )}
      </div>

      <AddStatDialog open={showAddDialog} onOpenChange={setShowAddDialog} onSuccess={loadStats} />
      {editingStat && (
        <EditStatDialog
          stat={editingStat}
          open={!!editingStat}
          onOpenChange={(open) => !open && setEditingStat(null)}
          onSuccess={loadStats}
        />
      )}
      {deletingStat && (
        <DeleteStatDialog
          stat={deletingStat}
          open={!!deletingStat}
          onOpenChange={(open) => !open && setDeletingStat(null)}
          onSuccess={loadStats}
        />
      )}
    </div>
  )
}

