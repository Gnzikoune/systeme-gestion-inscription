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
import { Trash2 } from "lucide-react"

interface DeleteRegistrationDialogProps {
  registrationNumber: string
  participantName: string
  onDelete: () => void
}

export function DeleteRegistrationDialog({
  registrationNumber,
  participantName,
  onDelete,
}: DeleteRegistrationDialogProps) {
  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    onDelete()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm" className="gap-2">
          <Trash2 className="h-4 w-4" />
          Supprimer
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] sm:max-w-[425px] sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">Confirmer la suppression</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Êtes-vous sûr de vouloir supprimer cette inscription ? Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-lg bg-muted p-4">
          <div className="text-sm">
            <div className="mb-1 font-medium text-foreground">{participantName}</div>
            <div className="text-muted-foreground">{registrationNumber}</div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Supprimer définitivement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
