"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { exportRegistrationsToCSV, type Registration } from "@/lib/data/registrations"

interface ExportButtonProps {
  registrations: Registration[]
}

export function ExportButton({ registrations }: ExportButtonProps) {
  const handleExport = () => {
    // Get visible registrations (respecting filters)
    // Check both table rows (desktop) and cards (mobile)
    const visibleTableRows = document.querySelectorAll("#registrations-table-body tr")
    const visibleCards = document.querySelectorAll('[data-program][data-status]')
    
    const visibleIds: string[] = []

    // Process table rows (desktop)
    visibleTableRows.forEach((row) => {
      if ((row as HTMLElement).style.display !== "none") {
        const cells = row.querySelectorAll("td")
        const numeroInscription = cells[0]?.textContent?.trim()
        const reg = registrations.find((r) => r.numero_inscription === numeroInscription)
        if (reg) visibleIds.push(reg.id)
      }
    })

    // Process cards (mobile) - if no table rows found
    if (visibleTableRows.length === 0 && visibleCards.length > 0) {
      visibleCards.forEach((card) => {
        if ((card as HTMLElement).style.display !== "none") {
          const numeroInscription = card.querySelector('[class*="text-xs"]')?.textContent?.trim()
          const reg = registrations.find((r) => r.numero_inscription === numeroInscription)
          if (reg) visibleIds.push(reg.id)
        }
      })
    }

    const filteredRegistrations = registrations.filter((reg) => visibleIds.includes(reg.id))
    const csvContent = exportRegistrationsToCSV(
      filteredRegistrations.length > 0 ? filteredRegistrations : registrations,
    )

    // Create download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)

    link.setAttribute("href", url)
    link.setAttribute("download", `inscriptions-csgr-ia-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button onClick={handleExport} variant="outline" size="sm" className="sm:size-default bg-transparent">
      <Download className="mr-2 h-4 w-4" />
      <span className="hidden sm:inline">Exporter CSV</span>
      <span className="sm:hidden">Export</span>
    </Button>
  )
}
