"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { deleteStatFromStorage } from "@/lib/storage/stats-storage"
import { useToast } from "@/hooks/use-toast"
import type { Stat } from "@/lib/data/stats"
import { AlertTriangle } from "lucide-react"

interface DeleteStatDialogProps {
  stat: Stat
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function DeleteStatDialog({ stat, open, onOpenChange, onSuccess }: DeleteStatDialogProps) {
  const { toast } = useToast()

  const handleDelete = () => {
    deleteStatFromStorage(stat.id)
    toast({
      title: "Statistique supprimée",
      description: "La statistique a été supprimée avec succès.",
    })
    onOpenChange(false)
    onSuccess()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:max-w-[425px] sm:w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive shrink-0" />
            Confirmer la suppression
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Êtes-vous sûr de vouloir supprimer cette statistique ? Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-lg bg-muted p-4">
          <p className="font-medium break-words">{stat.label}</p>
          <p className="text-sm text-muted-foreground break-words">
            Valeur: {stat.value}
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

