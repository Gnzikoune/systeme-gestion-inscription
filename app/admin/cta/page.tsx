"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Save, Eye, EyeOff } from "lucide-react"
import { getCTAFromStorage, updateCTAInStorage } from "@/lib/storage/cta-storage"
import type { CTA } from "@/lib/data/cta"
import { useToast } from "@/hooks/use-toast"
import { usePermissions } from "@/hooks/use-permissions"
import { ImageUpload } from "@/components/admin/image-upload"
import Image from "next/image"

export default function AdminCTAPage() {
  const [cta, setCTA] = useState<CTA | null>(null)
  const [formData, setFormData] = useState<Partial<CTA>>({})
  const { toast } = useToast()
  const { can } = usePermissions()

  useEffect(() => {
    loadCTA()
  }, [])

  const loadCTA = () => {
    const loadedCTA = getCTAFromStorage()
    setCTA(loadedCTA)
    setFormData(loadedCTA)
  }

  const handleSave = () => {
    if (!cta) return

    updateCTAInStorage({
      ...formData,
      id: cta.id,
      date_creation: cta.date_creation,
    })
    
    loadCTA()
    toast({
      title: "Section CTA mise à jour",
      description: "Les modifications ont été enregistrées avec succès.",
    })
  }

  const handleToggleActive = () => {
    setFormData((prev) => ({ ...prev, actif: !prev.actif }))
  }

  const handleImageChange = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, image_background: imageUrl }))
  }

  if (!cta || !formData) {
    return (
      <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-muted-foreground">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:gap-4 md:mb-8 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-foreground sm:text-2xl md:text-2xl lg:text-2xl">Gestion de la Section CTA</h1>
          <p className="mt-1.5 text-xs text-muted-foreground sm:mt-2 sm:text-sm md:text-sm lg:text-sm">
            Configurez la section d'appel à l'action affichée sur la page d'accueil
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 justify-center sm:justify-start">
            {formData.actif ? (
              <Eye className="h-4 w-4 text-green-600 shrink-0" />
            ) : (
              <EyeOff className="h-4 w-4 text-muted-foreground shrink-0" />
            )}
            <span className="text-xs sm:text-sm text-muted-foreground">
              {formData.actif ? "Visible" : "Masquée"}
            </span>
          </div>
          <Button onClick={handleSave} size="sm" className="w-full shrink-0 sm:w-auto sm:size-default">
            <Save className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Enregistrer</span>
            <span className="sm:hidden">Sauver</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Formulaire */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-sm sm:text-base md:text-base lg:text-base">Configuration</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Modifiez le contenu de la section CTA
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {can("edit:cta") ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="actif" className="text-xs sm:text-sm">
                    Statut
                  </Label>
                  <div className="flex items-center gap-3">
                    <Switch
                      id="actif"
                      checked={formData.actif ?? true}
                      onCheckedChange={handleToggleActive}
                    />
                    <span className="text-xs sm:text-sm text-muted-foreground break-words">
                      {formData.actif ? "Section visible sur la page d'accueil" : "Section masquée"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="titre" className="text-xs sm:text-sm">
                    Titre
                  </Label>
                  <Input
                    id="titre"
                    value={formData.titre || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, titre: e.target.value }))}
                    placeholder="Titre de la section CTA"
                    className="text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-xs sm:text-sm">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Description de la section CTA"
                    rows={4}
                    className="text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="texte_bouton" className="text-xs sm:text-sm">
                    Texte du bouton
                  </Label>
                  <Input
                    id="texte_bouton"
                    value={formData.texte_bouton || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, texte_bouton: e.target.value }))}
                    placeholder="Texte affiché sur le bouton"
                    className="text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lien_bouton" className="text-xs sm:text-sm">
                    Lien du bouton
                  </Label>
                  <Input
                    id="lien_bouton"
                    value={formData.lien_bouton || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, lien_bouton: e.target.value }))}
                    placeholder="/#programmes ou /contact"
                    className="text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_background" className="text-xs sm:text-sm">
                    Image de fond
                  </Label>
                  <ImageUpload
                    value={formData.image_background || ""}
                    onChange={handleImageChange}
                    label="Télécharger une image de fond"
                  />
                </div>
              </>
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm text-muted-foreground">Vous n'avez pas les permissions pour modifier cette section.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Aperçu */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-sm sm:text-base md:text-base lg:text-base">Aperçu</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Prévisualisation de la section CTA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative rounded-lg border border-border overflow-hidden min-h-[250px] sm:min-h-[300px] md:min-h-[350px]">
              {/* Background Image Preview */}
              {formData.image_background && (
                <div className="absolute inset-0 z-0">
                  <Image
                    src={formData.image_background}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized={formData.image_background.startsWith('data:')}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-accent/80 to-secondary/80" />
                </div>
              )}
              {!formData.image_background && (
                <div className="absolute inset-0 z-0 bg-muted flex items-center justify-center">
                  <p className="text-xs sm:text-sm text-muted-foreground">Aucune image de fond</p>
                </div>
              )}
              
              {/* Content Preview */}
              <div className="relative z-10 p-4 sm:p-6 md:p-8 text-center">
                <h2 className="mb-2 sm:mb-3 text-base font-bold text-foreground sm:text-lg md:text-xl lg:text-2xl break-words">
                  {formData.titre || "Titre de la section CTA"}
                </h2>
                <p className="mb-4 sm:mb-6 text-xs text-muted-foreground sm:text-sm md:text-base lg:text-base leading-relaxed break-words">
                  {formData.description || "Description de la section CTA"}
                </p>
                <Button asChild size="sm" className="mx-auto sm:size-default md:size-lg">
                  <a href={formData.lien_bouton || "#"}>
                    {formData.texte_bouton || "Texte du bouton"}
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

