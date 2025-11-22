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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatPaymentStatus } from "@/lib/data/registrations"
import { Edit } from "lucide-react"

interface StatusUpdateDialogProps {
  registrationId: string
  currentStatus: "en_attente" | "valide" | "echoue" | "rembourse"
  onStatusUpdate: (newStatus: "en_attente" | "valide" | "echoue" | "rembourse") => void
}

export function StatusUpdateDialog({ registrationId, currentStatus, onStatusUpdate }: StatusUpdateDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<"en_attente" | "valide" | "echoue" | "rembourse">(currentStatus)

  const handleUpdate = () => {
    onStatusUpdate(selectedStatus)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Edit className="h-4 w-4" />
          Modifier le statut
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier le statut de paiement</DialogTitle>
          <DialogDescription>Changez le statut de paiement pour cette inscription.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Select value={selectedStatus} onValueChange={(value: any) => setSelectedStatus(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en_attente">{formatPaymentStatus("en_attente")}</SelectItem>
              <SelectItem value="valide">{formatPaymentStatus("valide")}</SelectItem>
              <SelectItem value="echoue">{formatPaymentStatus("echoue")}</SelectItem>
              <SelectItem value="rembourse">{formatPaymentStatus("rembourse")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button onClick={handleUpdate}>Mettre à jour</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
