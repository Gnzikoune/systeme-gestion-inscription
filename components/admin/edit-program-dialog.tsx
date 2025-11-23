"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
import { Switch } from "@/components/ui/switch"
import { ImageUpload } from "@/components/admin/image-upload"
import { updateProgramInStorage } from "@/lib/storage/programs-storage"
import { useToast } from "@/hooks/use-toast"
import type { Program } from "@/lib/data/programs"

interface EditProgramDialogProps {
  program: Program
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function EditProgramDialog({ program, open, onOpenChange, onSuccess }: EditProgramDialogProps) {
  const [nom, setNom] = useState(program.nom)
  const [descriptionCourte, setDescriptionCourte] = useState(program.description_courte)
  const [descriptionLongue, setDescriptionLongue] = useState(program.description_longue)
  const [objectifs, setObjectifs] = useState<string[]>(program.objectifs.length > 0 ? program.objectifs : [""])
  const [prerequis, setPrerequis] = useState<string[]>(program.prerequis.length > 0 ? program.prerequis : [""])
  const [modalites, setModalites] = useState<string[]>(program.modalites.length > 0 ? program.modalites : [""])
  const [prix, setPrix] = useState(program.prix.toString())
  const [gratuit, setGratuit] = useState(program.gratuit)
  const [dateDebut, setDateDebut] = useState(program.date_debut)
  const [dateFin, setDateFin] = useState(program.date_fin)
  const [duree, setDuree] = useState(program.duree)
  const [image, setImage] = useState(program.image || "")
  const { toast } = useToast()

  useEffect(() => {
    if (open) {
      setNom(program.nom)
      setDescriptionCourte(program.description_courte)
      setDescriptionLongue(program.description_longue)
      setObjectifs(program.objectifs.length > 0 ? program.objectifs : [""])
      setPrerequis(program.prerequis.length > 0 ? program.prerequis : [""])
      setModalites(program.modalites.length > 0 ? program.modalites : [""])
      setPrix(program.prix.toString())
      setGratuit(program.gratuit)
      setDateDebut(program.date_debut)
      setDateFin(program.date_fin)
      setDuree(program.duree)
      setImage(program.image || "")
    }
  }, [program, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!nom || !descriptionCourte || !dateDebut || !dateFin || !duree) {
      toast({
        title: "Erreur",
        description: "Les champs nom, description courte, dates et durée sont obligatoires",
        variant: "destructive",
      })
      return
    }

    updateProgramInStorage(program.id, {
      nom,
      description_courte: descriptionCourte,
      description_longue: descriptionLongue || descriptionCourte,
      objectifs: objectifs.filter((o) => o.trim() !== ""),
      prerequis: prerequis.filter((p) => p.trim() !== ""),
      modalites: modalites.filter((m) => m.trim() !== ""),
      prix: gratuit ? 0 : parseInt(prix) || 0,
      gratuit,
      date_debut: dateDebut,
      date_fin: dateFin,
      duree,
      image: image || undefined,
    })

    toast({
      title: "Programme modifié",
      description: "Les modifications ont été enregistrées.",
    })

    onOpenChange(false)
    onSuccess()
  }

  const addItem = (array: string[], setter: (arr: string[]) => void) => {
    setter([...array, ""])
  }

  const updateItem = (array: string[], index: number, value: string, setter: (arr: string[]) => void) => {
    const newArray = [...array]
    newArray[index] = value
    setter(newArray)
  }

  const removeItem = (array: string[], index: number, setter: (arr: string[]) => void) => {
    if (array.length > 1) {
      setter(array.filter((_, i) => i !== index))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[95vw] max-w-4xl overflow-y-auto sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">Modifier le Programme</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">Modifiez les informations de ce programme.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom du programme *</Label>
              <Input id="nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date_debut">Date de début *</Label>
                <Input id="date_debut" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date_fin">Date de fin *</Label>
                <Input id="date_fin" value={dateFin} onChange={(e) => setDateFin(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duree">Durée *</Label>
              <Input id="duree" placeholder="Ex: 4 mois, 12 semaines" value={duree} onChange={(e) => setDuree(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description_courte">Description courte *</Label>
              <Textarea
                id="description_courte"
                rows={2}
                value={descriptionCourte}
                onChange={(e) => setDescriptionCourte(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description_longue">Description longue</Label>
              <Textarea
                id="description_longue"
                rows={4}
                value={descriptionLongue}
                onChange={(e) => setDescriptionLongue(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3 sm:p-4">
              <div className="space-y-0.5 min-w-0 flex-1">
                <Label htmlFor="gratuit" className="text-xs sm:text-sm md:text-base font-medium">
                  Programme gratuit
                </Label>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Si activé, le prix sera automatiquement mis à 0
                </p>
              </div>
              <Switch id="gratuit" checked={gratuit} onCheckedChange={setGratuit} className="shrink-0" />
            </div>

            {!gratuit && (
              <div className="space-y-2">
                <Label htmlFor="prix">Prix (FCFA)</Label>
                <Input
                  id="prix"
                  type="number"
                  min="0"
                  value={prix}
                  onChange={(e) => setPrix(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Objectifs</Label>
              {objectifs.map((obj, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={obj}
                    onChange={(e) => updateItem(objectifs, index, e.target.value, setObjectifs)}
                    placeholder={`Objectif ${index + 1}`}
                  />
                  {objectifs.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeItem(objectifs, index, setObjectifs)}
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addItem(objectifs, setObjectifs)}>
                + Ajouter un objectif
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Prérequis</Label>
              {prerequis.map((pre, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={pre}
                    onChange={(e) => updateItem(prerequis, index, e.target.value, setPrerequis)}
                    placeholder={`Prérequis ${index + 1}`}
                  />
                  {prerequis.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeItem(prerequis, index, setPrerequis)}
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addItem(prerequis, setPrerequis)}>
                + Ajouter un prérequis
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Modalités</Label>
              {modalites.map((mod, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={mod}
                    onChange={(e) => updateItem(modalites, index, e.target.value, setModalites)}
                    placeholder={`Modalité ${index + 1}`}
                  />
                  {modalites.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeItem(modalites, index, setModalites)}
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addItem(modalites, setModalites)}>
                + Ajouter une modalité
              </Button>
            </div>

            <ImageUpload
              value={image}
              onChange={setImage}
              label="Image du programme (optionnel)"
              description="Téléchargez une image pour illustrer le programme"
            />
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

