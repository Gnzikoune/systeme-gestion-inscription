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
import { deleteProgramFromStorage } from "@/lib/storage/programs-storage"
import { useToast } from "@/hooks/use-toast"
import type { Program } from "@/lib/data/programs"
import { AlertTriangle } from "lucide-react"

interface DeleteProgramDialogProps {
  program: Program
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function DeleteProgramDialog({ program, open, onOpenChange, onSuccess }: DeleteProgramDialogProps) {
  const { toast } = useToast()

  const handleDelete = () => {
    deleteProgramFromStorage(program.id)
    toast({
      title: "Programme supprimé",
      description: "Le programme a été supprimé avec succès.",
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
            Êtes-vous sûr de vouloir supprimer ce programme ? Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-lg bg-muted p-4">
          <p className="font-medium break-words">{program.nom}</p>
          <p className="text-sm text-muted-foreground break-words">
            {program.date_debut} · {program.duree}
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

