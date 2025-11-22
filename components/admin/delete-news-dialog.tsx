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
import { deleteNewsFromStorage } from "@/lib/storage/news-storage"
import { useToast } from "@/hooks/use-toast"
import type { News } from "@/lib/data/news"
import { AlertTriangle } from "lucide-react"

interface DeleteNewsDialogProps {
  news: News
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function DeleteNewsDialog({ news, open, onOpenChange, onSuccess }: DeleteNewsDialogProps) {
  const { toast } = useToast()

  const handleDelete = () => {
    deleteNewsFromStorage(news.id)
    toast({
      title: "Actualité supprimée",
      description: "L'actualité a été supprimée avec succès.",
    })
    onOpenChange(false)
    onSuccess()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Confirmer la suppression
          </DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer cette actualité ? Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-lg bg-muted p-4">
          <p className="font-medium">{news.titre}</p>
          <p className="text-sm text-muted-foreground">
            {news.date} · {news.lieu}
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
