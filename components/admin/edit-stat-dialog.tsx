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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateStatInStorage } from "@/lib/storage/stats-storage"
import { useToast } from "@/hooks/use-toast"
import type { Stat } from "@/lib/data/stats"

interface EditStatDialogProps {
  stat: Stat
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function EditStatDialog({ stat, open, onOpenChange, onSuccess }: EditStatDialogProps) {
  const [label, setLabel] = useState(stat.label)
  const [value, setValue] = useState(stat.value)
  const [icon, setIcon] = useState<Stat["icon"]>(stat.icon)
  const [color, setColor] = useState<Stat["color"]>(stat.color)
  const { toast } = useToast()

  useEffect(() => {
    if (open) {
      setLabel(stat.label)
      setValue(stat.value)
      setIcon(stat.icon)
      setColor(stat.color)
    }
  }, [stat, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!label || !value) {
      toast({
        title: "Erreur",
        description: "Les champs label et valeur sont obligatoires",
        variant: "destructive",
      })
      return
    }

    updateStatInStorage(stat.id, {
      label,
      value,
      icon,
      color,
    })

    toast({
      title: "Statistique modifiée",
      description: "Les modifications ont été enregistrées.",
    })

    onOpenChange(false)
    onSuccess()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:max-w-[500px] sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">Modifier la Statistique</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">Modifiez les informations de cette statistique.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="label">Label *</Label>
              <Input
                id="label"
                placeholder="Ex: Publications en IA"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">Valeur *</Label>
              <Input
                id="value"
                placeholder="Ex: 138, 90%, UNESCO"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="icon">Icône *</Label>
                <Select value={icon} onValueChange={(value) => setIcon(value as Stat["icon"])}>
                  <SelectTrigger id="icon">
                    <SelectValue placeholder="Sélectionnez une icône" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BookOpen">Livre</SelectItem>
                    <SelectItem value="Users">Utilisateurs</SelectItem>
                    <SelectItem value="Award">Récompense</SelectItem>
                    <SelectItem value="Globe">Globe</SelectItem>
                    <SelectItem value="GraduationCap">Diplôme</SelectItem>
                    <SelectItem value="Building">Bâtiment</SelectItem>
                    <SelectItem value="TrendingUp">Tendance</SelectItem>
                    <SelectItem value="Target">Cible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Couleur *</Label>
                <Select value={color} onValueChange={(value) => setColor(value as Stat["color"])}>
                  <SelectTrigger id="color">
                    <SelectValue placeholder="Sélectionnez une couleur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primaire</SelectItem>
                    <SelectItem value="accent">Accent</SelectItem>
                    <SelectItem value="secondary">Secondaire</SelectItem>
                    <SelectItem value="default">Par défaut</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
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

