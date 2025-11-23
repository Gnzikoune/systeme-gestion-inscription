"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "@/components/admin/image-upload"
import { addNewsToStorage, generateNewsId, getNewsFromStorage } from "@/lib/storage/news-storage"
import { useToast } from "@/hooks/use-toast"

interface AddNewsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function AddNewsDialog({ open, onOpenChange, onSuccess }: AddNewsDialogProps) {
  const [titre, setTitre] = useState("")
  const [description, setDescription] = useState("")
  const [contenu, setContenu] = useState("")
  const [image, setImage] = useState("")
  const [date, setDate] = useState("")
  const [lieu, setLieu] = useState("")
  const [type, setType] = useState<"actualite" | "evenement">("actualite")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!titre || !description || !date || !lieu) {
      toast({
        title: "Erreur",
        description: "Les champs titre, description, date et lieu sont obligatoires",
        variant: "destructive",
      })
      return
    }

    const allNews = getNewsFromStorage()
    const maxOrdre = allNews.length > 0 ? Math.max(...allNews.map((n) => n.ordre)) : 0

    const newNews = {
      id: generateNewsId(),
      titre,
      description,
      contenu: contenu || undefined,
      image: image || undefined,
      date,
      lieu,
      type,
      ordre: maxOrdre + 1,
      actif: true,
      date_creation: new Date().toISOString(),
      date_modification: new Date().toISOString(),
    }

    addNewsToStorage(newNews)
    toast({
      title: "Actualité ajoutée",
      description: "La nouvelle actualité a été créée avec succès.",
    })

    setTitre("")
    setDescription("")
    setContenu("")
    setImage("")
    setDate("")
    setLieu("")
    setType("actualite")
    onOpenChange(false)
    onSuccess()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[95vw] max-w-2xl overflow-y-auto sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">Nouvelle Actualité</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">Ajoutez une nouvelle actualité à afficher sur le site.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titre">Titre *</Label>
              <Input id="titre" value={titre} onChange={(e) => setTitre(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select value={type} onValueChange={(value) => setType(value as "actualite" | "evenement")}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Sélectionnez le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="actualite">Actualité (passée)</SelectItem>
                  <SelectItem value="evenement">Événement à venir</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Les actualités sont des événements passés, les événements sont des rendez-vous futurs
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  placeholder="Ex: Juin 2025, 15-20 Mars 2025"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lieu">Lieu *</Label>
                <Input
                  id="lieu"
                  placeholder="Ex: USTM, Centre Gabonais de l'Innovation"
                  value={lieu}
                  onChange={(e) => setLieu(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description courte *</Label>
              <Textarea
                id="description"
                rows={3}
                placeholder="Résumé court affiché sur la page d'accueil"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <ImageUpload
              value={image}
              onChange={setImage}
              label="Image de l'actualité (optionnel)"
              description="Téléchargez une image pour illustrer l'actualité"
            />

            <div className="space-y-2">
              <Label htmlFor="contenu">Contenu complet (optionnel)</Label>
              <Textarea
                id="contenu"
                rows={8}
                placeholder="Contenu détaillé affiché sur la page de détails de l'actualité"
                value={contenu}
                onChange={(e) => setContenu(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Ce contenu sera affiché sur la page de détails de l'actualité
              </p>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">Ajouter</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
