"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type { Program } from "@/lib/data/programs"

interface AdminFiltersProps {
  programs: Program[]
}

export function AdminFilters({ programs }: AdminFiltersProps) {
  const [selectedProgram, setSelectedProgram] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const filterTable = (programId: string, status: string) => {
    // Filter both table rows (desktop) and cards (mobile)
    const rows = document.querySelectorAll("#registrations-table-body tr")
    const cards = document.querySelectorAll('[data-program][data-status]')

    const filterElement = (element: Element) => {
      const rowProgram = element.getAttribute("data-program")
      const rowStatus = element.getAttribute("data-status")

      const programMatch = programId === "all" || rowProgram === programId
      const statusMatch = status === "all" || rowStatus === status

      if (programMatch && statusMatch) {
        ;(element as HTMLElement).style.display = ""
      } else {
        ;(element as HTMLElement).style.display = "none"
      }
    }

    rows.forEach(filterElement)
    cards.forEach(filterElement)

    console.log("[v0] Filtered table:", { programId, status })
  }

  const handleProgramChange = (value: string) => {
    setSelectedProgram(value)
    filterTable(value, selectedStatus)
  }

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value)
    filterTable(selectedProgram, value)
  }

  return (
    <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-end">
      <div className="flex-1 min-w-0">
        <Label htmlFor="program-filter" className="text-xs sm:text-sm">Filtrer par programme</Label>
        <Select value={selectedProgram} onValueChange={handleProgramChange}>
          <SelectTrigger id="program-filter" className="text-xs sm:text-sm">
            <SelectValue placeholder="Tous les programmes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les programmes</SelectItem>
            {programs.map((program) => (
              <SelectItem key={program.id} value={program.id}>
                {program.nom}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-0">
        <Label htmlFor="status-filter" className="text-xs sm:text-sm">Filtrer par statut</Label>
        <Select value={selectedStatus} onValueChange={handleStatusChange}>
          <SelectTrigger id="status-filter" className="text-xs sm:text-sm">
            <SelectValue placeholder="Tous les statuts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="valide">Validé</SelectItem>
            <SelectItem value="en_attente">En attente</SelectItem>
            <SelectItem value="echoue">Échoué</SelectItem>
            <SelectItem value="rembourse">Remboursé</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
