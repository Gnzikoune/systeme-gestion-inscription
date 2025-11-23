"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react"
import { getProgramsFromStorage, updateProgramInStorage, deleteProgramFromStorage, saveProgramsToStorage } from "@/lib/storage/programs-storage"
import type { Program } from "@/lib/data/programs"
import { AddProgramDialog } from "@/components/admin/add-program-dialog"
import { EditProgramDialog } from "@/components/admin/edit-program-dialog"
import { DeleteProgramDialog } from "@/components/admin/delete-program-dialog"
import { useToast } from "@/hooks/use-toast"

export default function AdminProgrammesPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingProgram, setEditingProgram] = useState<Program | null>(null)
  const [deletingProgram, setDeletingProgram] = useState<Program | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadPrograms()
  }, [])

  const loadPrograms = () => {
    const loadedPrograms = getProgramsFromStorage()
    setPrograms(loadedPrograms)
  }

  const handleMoveUp = (program: Program) => {
    const currentIndex = programs.findIndex((p) => p.id === program.id)
    if (currentIndex > 0) {
      const programsCopy = [...programs]
      const temp = programsCopy[currentIndex]
      programsCopy[currentIndex] = programsCopy[currentIndex - 1]
      programsCopy[currentIndex - 1] = temp
      // Save reordered programs
      saveProgramsToStorage(programsCopy)
      loadPrograms()
      toast({
        title: "Ordre modifié",
        description: "Le programme a été déplacé vers le haut.",
      })
    }
  }

  const handleMoveDown = (program: Program) => {
    const currentIndex = programs.findIndex((p) => p.id === program.id)
    if (currentIndex < programs.length - 1) {
      const programsCopy = [...programs]
      const temp = programsCopy[currentIndex]
      programsCopy[currentIndex] = programsCopy[currentIndex + 1]
      programsCopy[currentIndex + 1] = temp
      // Save reordered programs
      saveProgramsToStorage(programsCopy)
      loadPrograms()
      toast({
        title: "Ordre modifié",
        description: "Le programme a été déplacé vers le bas.",
      })
    }
  }

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:gap-4 md:mb-8 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-foreground sm:text-2xl md:text-3xl">Gestion des Programmes</h1>
          <p className="mt-1.5 text-xs text-muted-foreground sm:mt-2 sm:text-sm md:text-base">
            Gérez les programmes de formation affichés sur le site
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} size="sm" className="w-full shrink-0 sm:w-auto sm:size-default">
          <Plus className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Nouveau programme</span>
          <span className="sm:hidden">Nouveau</span>
        </Button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {programs.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center sm:py-12">
              <p className="text-xs text-muted-foreground sm:text-sm md:text-base">
                Aucun programme. Cliquez sur "Nouveau programme" pour commencer.
              </p>
            </CardContent>
          </Card>
        ) : (
          programs.map((program, index) => (
            <Card key={program.id}>
              <CardHeader className="pb-3 sm:pb-6">
                <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <CardTitle className="break-words text-sm sm:text-base md:text-lg">{program.nom}</CardTitle>
                      {program.gratuit ? (
                        <Badge variant="default" className="text-xs">Gratuit</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">{program.prix.toLocaleString()} FCFA</Badge>
                      )}
                    </div>
                    <CardDescription className="text-xs sm:text-sm break-words">
                      {program.description_courte}
                    </CardDescription>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span>Début: {program.date_debut}</span>
                      <span>•</span>
                      <span>Durée: {program.duree}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMoveUp(program)}
                      disabled={index === 0}
                      title="Monter"
                      className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                    >
                      <ArrowUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMoveDown(program)}
                      disabled={index === programs.length - 1}
                      title="Descendre"
                      className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                    >
                      <ArrowDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingProgram(program)}
                      title="Modifier"
                      className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                    >
                      <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeletingProgram(program)}
                      className="h-8 w-8 p-0 text-destructive hover:bg-destructive hover:text-destructive-foreground sm:h-9 sm:w-9"
                      title="Supprimer"
                    >
                      <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 sm:pt-6">
                {program.image && (
                  <div className="mb-3 sm:mb-4">
                    <img
                      src={program.image || "/placeholder.svg"}
                      alt={program.nom}
                      className="h-32 w-full rounded-lg object-cover sm:h-40 md:h-48"
                    />
                  </div>
                )}
                <div className="space-y-2 text-xs sm:text-sm">
                  <div>
                    <span className="font-medium text-foreground">Description longue:</span>
                    <p className="text-muted-foreground mt-1">{program.description_longue}</p>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div>
                      <span className="font-medium text-foreground">Objectifs:</span>
                      <ul className="list-disc list-inside text-muted-foreground mt-1">
                        {program.objectifs.map((obj, i) => (
                          <li key={i}>{obj}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Prérequis:</span>
                      <ul className="list-disc list-inside text-muted-foreground mt-1">
                        {program.prerequis.map((pre, i) => (
                          <li key={i}>{pre}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <AddProgramDialog open={showAddDialog} onOpenChange={setShowAddDialog} onSuccess={loadPrograms} />
      {editingProgram && (
        <EditProgramDialog
          program={editingProgram}
          open={!!editingProgram}
          onOpenChange={(open) => !open && setEditingProgram(null)}
          onSuccess={loadPrograms}
        />
      )}
      {deletingProgram && (
        <DeleteProgramDialog
          program={deletingProgram}
          open={!!deletingProgram}
          onOpenChange={(open) => !open && setDeletingProgram(null)}
          onSuccess={loadPrograms}
        />
      )}
    </div>
  )
}

