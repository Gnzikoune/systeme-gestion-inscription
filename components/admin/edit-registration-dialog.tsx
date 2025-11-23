"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit } from "lucide-react"
import type { Registration } from "@/lib/data/registrations"

interface EditRegistrationDialogProps {
  registration: Registration
  onUpdate: (updates: Partial<Registration>) => void
}

const villes = [
  "Libreville",
  "Port-Gentil",
  "Franceville",
  "Oyem",
  "Moanda",
  "Mouila",
  "Lambaréné",
  "Tchibanga",
  "Koulamoutou",
  "Makokou",
]

const niveauxEtude = ["Bac", "Licence", "Master", "Doctorat", "Ingénieur", "Professionnel"]

export function EditRegistrationDialog({ registration, onUpdate }: EditRegistrationDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    nom: registration.nom,
    prenom: registration.prenom,
    email: registration.email,
    telephone: registration.telephone,
    ville: registration.ville,
    organisation: registration.organisation || "",
    niveau_etude: registration.niveau_etude,
    motivation: registration.motivation,
  })

  const handleUpdate = () => {
    onUpdate(formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Edit className="h-4 w-4" />
          Modifier les informations
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto w-[95vw] max-w-[600px] sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">Modifier les informations</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">Modifiez les informations personnelles et académiques de l'inscrit.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prenom">Prénom</Label>
              <Input
                id="prenom"
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telephone">Téléphone</Label>
            <Input
              id="telephone"
              value={formData.telephone}
              onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ville">Ville</Label>
              <Select value={formData.ville} onValueChange={(value) => setFormData({ ...formData, ville: value })}>
                <SelectTrigger id="ville">
                  <SelectValue placeholder="Sélectionner une ville" />
                </SelectTrigger>
                <SelectContent>
                  {villes.map((ville) => (
                    <SelectItem key={ville} value={ville}>
                      {ville}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="niveau_etude">Niveau d'études</Label>
              <Select
                value={formData.niveau_etude}
                onValueChange={(value) => setFormData({ ...formData, niveau_etude: value })}
              >
                <SelectTrigger id="niveau_etude">
                  <SelectValue placeholder="Sélectionner un niveau" />
                </SelectTrigger>
                <SelectContent>
                  {niveauxEtude.map((niveau) => (
                    <SelectItem key={niveau} value={niveau}>
                      {niveau}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="organisation">Organisation (optionnel)</Label>
            <Input
              id="organisation"
              value={formData.organisation}
              onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
              placeholder="Université, entreprise, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="motivation">Motivation</Label>
            <Textarea
              id="motivation"
              value={formData.motivation}
              onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
              rows={4}
              className="resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button onClick={handleUpdate}>Enregistrer les modifications</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
