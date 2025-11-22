"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Save, RotateCcw } from "lucide-react"
import { programs } from "@/lib/data/programs"
import { getPromoConfig, savePromoConfig, resetPromoConfig } from "@/lib/storage/promo-storage"
import type { PromoConfig } from "@/lib/data/promo-config"
import { useToast } from "@/hooks/use-toast"

export function PromoConfigCard() {
  const { toast } = useToast()
  const [config, setConfig] = useState<PromoConfig>({
    programId: "ai4steam-2026",
    enabled: true,
    delay: 3000,
    cooldownDays: 1,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadConfig()
  }, [])

  const loadConfig = () => {
    const storedConfig = getPromoConfig()
    setConfig(storedConfig)
    setLoading(false)
  }

  const handleSave = () => {
    savePromoConfig(config)
    toast({
      title: "Configuration sauvegardée",
      description: "La configuration du popup publicitaire a été mise à jour.",
    })
  }

  const handleReset = () => {
    if (window.confirm("Êtes-vous sûr de vouloir réinitialiser la configuration aux valeurs par défaut ?")) {
      resetPromoConfig()
      loadConfig()
      toast({
        title: "Configuration réinitialisée",
        description: "La configuration a été restaurée aux valeurs par défaut.",
      })
    }
  }

  const selectedProgram = programs.find((p) => p.id === config.programId)

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">Chargement...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-lg sm:text-xl">Configuration du Popup Publicitaire</CardTitle>
          </div>
          <Badge variant={config.enabled ? "default" : "secondary"} className="w-fit">
            {config.enabled ? "Activé" : "Désactivé"}
          </Badge>
        </div>
        <CardDescription className="text-sm">
          Configurez la formation mise en avant dans le popup publicitaire qui s'affiche sur le site
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Activation du popup */}
        <div className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-0.5 min-w-0 flex-1">
            <Label htmlFor="enabled" className="text-sm sm:text-base font-medium">
              Activer le popup publicitaire
            </Label>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Afficher ou masquer le popup sur toutes les pages du site
            </p>
          </div>
          <Switch
            id="enabled"
            checked={config.enabled}
            onCheckedChange={(checked) => setConfig({ ...config, enabled: checked })}
            className="shrink-0"
          />
        </div>

        {/* Sélection de la formation */}
        <div className="space-y-2">
          <Label htmlFor="program">Formation à promouvoir *</Label>
          <Select value={config.programId} onValueChange={(value) => setConfig({ ...config, programId: value })}>
            <SelectTrigger id="program">
              <SelectValue placeholder="Sélectionnez une formation" />
            </SelectTrigger>
            <SelectContent>
              {programs.map((program) => (
                <SelectItem key={program.id} value={program.id}>
                  {program.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedProgram && (
            <div className="rounded-lg border bg-muted/50 p-3 sm:p-4">
              <div className="font-medium text-sm sm:text-base">{selectedProgram.nom}</div>
              <div className="text-muted-foreground mt-1 text-xs sm:text-sm">{selectedProgram.description_courte}</div>
              <div className="mt-3 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                <span className="text-muted-foreground">Début: <span className="font-medium text-foreground">{selectedProgram.date_debut}</span></span>
                <span className="text-muted-foreground">Durée: <span className="font-medium text-foreground">{selectedProgram.duree}</span></span>
                <span className="font-semibold text-foreground ml-auto">
                  {selectedProgram.gratuit ? "Gratuit" : `${selectedProgram.prix.toLocaleString()} FCFA`}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Délai d'affichage */}
        <div className="space-y-2">
          <Label htmlFor="delay">Délai avant affichage (secondes)</Label>
          <Input
            id="delay"
            type="number"
            min="0"
            max="30"
            value={config.delay / 1000}
            onChange={(e) => setConfig({ ...config, delay: parseInt(e.target.value) * 1000 || 0 })}
          />
          <p className="text-xs text-muted-foreground">
            Le popup s'affichera après ce délai (en secondes) une fois la page chargée
          </p>
        </div>

        {/* Période de cooldown */}
        <div className="space-y-2">
          <Label htmlFor="cooldown">Période de cooldown (jours)</Label>
          <Input
            id="cooldown"
            type="number"
            min="0"
            max="30"
            value={config.cooldownDays}
            onChange={(e) => setConfig({ ...config, cooldownDays: parseInt(e.target.value) || 0 })}
          />
          <p className="text-xs text-muted-foreground">
            Nombre de jours avant de pouvoir réafficher le popup après qu'un utilisateur l'ait fermé
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
          <Button onClick={handleSave} className="flex-1">
            <Save className="mr-2 h-4 w-4" />
            Enregistrer la configuration
          </Button>
          <Button onClick={handleReset} variant="outline" className="flex-1">
            <RotateCcw className="mr-2 h-4 w-4" />
            Réinitialiser
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

