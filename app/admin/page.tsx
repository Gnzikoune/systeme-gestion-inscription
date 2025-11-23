"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPaymentStatus, getPaymentStatusColor, type Registration } from "@/lib/data/registrations"
import { programs } from "@/lib/data/programs"
import { Eye, Users, CheckCircle2, Clock, XCircle, Trash2 } from "lucide-react"
import { AdminFilters } from "@/components/admin/admin-filters"
import { ExportButton } from "@/components/admin/export-button"
import { AdminAuthNotice } from "@/components/admin/admin-auth-notice"
import { getRegistrations } from "@/lib/storage/local-storage"
import { useToast } from "@/hooks/use-toast"

export default function AdminDashboardPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadRegistrations()
  }, [])

  const loadRegistrations = () => {
    const storedRegistrations = getRegistrations()
    setRegistrations(storedRegistrations)
    setLoading(false)
  }

  const handleClearAllData = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer toutes les inscriptions ? Cette action est irréversible.")) {
      localStorage.removeItem("csgr_ia_registrations")
      loadRegistrations()
      toast({
        title: "Données supprimées",
        description: "Toutes les inscriptions ont été supprimées.",
      })
    }
  }

  // Calculate statistics
  const totalRegistrations = registrations.length
  const validatedPayments = registrations.filter((r) => r.statut_paiement === "valide").length
  const pendingPayments = registrations.filter((r) => r.statut_paiement === "en_attente").length
  const failedPayments = registrations.filter((r) => r.statut_paiement === "echoue").length

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h1 className="mb-2 text-xl font-bold text-foreground sm:text-2xl md:text-3xl">Tableau de Bord</h1>
        <p className="text-xs text-muted-foreground sm:text-sm md:text-base">Gestion des inscriptions aux programmes CSGR-IA</p>
      </div>

      {/* Authentication Notice */}
      <AdminAuthNotice />

      {/* Statistics Cards */}
      <div className="mb-4 grid gap-3 sm:mb-6 sm:grid-cols-2 sm:gap-4 md:mb-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inscrits</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalRegistrations}</div>
            <p className="text-xs text-muted-foreground">Toutes programmes confondus</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paiements Validés</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{validatedPayments}</div>
            <p className="text-xs text-muted-foreground">
              {totalRegistrations > 0 ? ((validatedPayments / totalRegistrations) * 100).toFixed(0) : 0}% du total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Attente</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{pendingPayments}</div>
            <p className="text-xs text-muted-foreground">Paiements à valider</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Échoués</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{failedPayments}</div>
            <p className="text-xs text-muted-foreground">À recontacter</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="mb-4 sm:mb-6">
        <CardHeader className="pb-3 sm:pb-6">
          <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <CardTitle className="text-base sm:text-lg md:text-xl">Liste des Inscrits</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Filtrez et exportez les données d'inscription</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2 sm:shrink-0">
              <ExportButton registrations={registrations} />
              <Button variant="destructive" onClick={handleClearAllData} size="sm" className="sm:size-default">
                <Trash2 className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Vider les données</span>
                <span className="sm:hidden">Vider</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <AdminFilters programs={programs} />
        </CardContent>
      </Card>

      {/* Registrations - Responsive View */}
      <Card>
        <CardContent className="p-0">
          {registrations.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              Aucune inscription trouvée
            </div>
          ) : (
            <>
              {/* Desktop/Tablet Table View */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[800px]">
                  <thead className="border-b border-border bg-muted/50">
                    <tr>
                      <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground md:px-4 md:py-3 md:text-sm">
                        N° Inscription
                      </th>
                      <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground md:px-4 md:py-3 md:text-sm">
                        Nom & Prénom
                      </th>
                      <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground md:px-4 md:py-3 md:text-sm">
                        Programme
                      </th>
                      <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground md:px-4 md:py-3 md:text-sm">
                        Email
                      </th>
                      <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground md:px-4 md:py-3 md:text-sm">
                        Date
                      </th>
                      <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground md:px-4 md:py-3 md:text-sm">
                        Statut
                      </th>
                      <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground md:px-4 md:py-3 md:text-sm">
                        Montant
                      </th>
                      <th className="px-3 py-2.5 text-center text-xs font-medium text-muted-foreground md:px-4 md:py-3 md:text-sm">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody id="registrations-table-body" className="divide-y divide-border">
                    {registrations.map((registration) => (
                      <tr
                        key={registration.id}
                        className="hover:bg-muted/50"
                        data-program={registration.programme_id}
                        data-status={registration.statut_paiement}
                      >
                        <td className="px-3 py-2.5 text-xs font-medium text-foreground md:px-4 md:py-3 md:text-sm">
                          {registration.numero_inscription}
                        </td>
                        <td className="px-3 py-2.5 text-xs text-foreground md:px-4 md:py-3 md:text-sm">
                          <div className="whitespace-nowrap">
                            {registration.nom} {registration.prenom}
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-xs text-muted-foreground md:px-4 md:py-3 md:text-sm">
                          <div className="max-w-[150px] truncate md:max-w-[200px]" title={registration.programme_nom}>
                            {registration.programme_nom}
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-xs text-muted-foreground md:px-4 md:py-3 md:text-sm">
                          <div className="max-w-[150px] truncate md:max-w-[200px]" title={registration.email}>
                            {registration.email}
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-xs text-muted-foreground md:px-4 md:py-3 md:text-sm">
                          <div className="whitespace-nowrap">
                            {new Date(registration.date_inscription).toLocaleDateString("fr-FR")}
                          </div>
                        </td>
                        <td className="px-3 py-2.5 md:px-4 md:py-3">
                          <Badge variant={getPaymentStatusColor(registration.statut_paiement)} className="text-xs">
                            {formatPaymentStatus(registration.statut_paiement)}
                          </Badge>
                        </td>
                        <td className="px-3 py-2.5 text-xs font-medium text-foreground md:px-4 md:py-3 md:text-sm">
                          <div className="whitespace-nowrap">
                            {registration.montant === 0 ? "Gratuit" : `${registration.montant.toLocaleString()} FCFA`}
                          </div>
                        </td>
                        <td className="px-3 py-2.5 md:px-4 md:py-3">
                          <div className="flex justify-center">
                            <Button
                              asChild
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-xs md:h-9 md:px-3 md:text-sm"
                            >
                              <Link href={`/admin/inscription/${registration.id}`}>
                                <Eye className="mr-1.5 h-3.5 w-3.5 md:mr-2 md:h-4 md:w-4" />
                                <span className="hidden lg:inline">Voir</span>
                              </Link>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="space-y-3 p-3 sm:p-4 md:hidden">
                {registrations.map((registration) => (
                  <Card
                    key={registration.id}
                    className="hover:shadow-md transition-shadow"
                    data-program={registration.programme_id}
                    data-status={registration.statut_paiement}
                  >
                    <CardContent className="p-3 sm:p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-sm text-foreground break-words">
                              {registration.nom} {registration.prenom}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {registration.numero_inscription}
                            </div>
                          </div>
                          <Badge variant={getPaymentStatusColor(registration.statut_paiement)} className="text-xs shrink-0">
                            {formatPaymentStatus(registration.statut_paiement)}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                            <span className="text-muted-foreground shrink-0">Programme</span>
                            <span className="font-medium text-foreground text-right break-words sm:max-w-[65%]">
                              {registration.programme_nom}
                            </span>
                          </div>
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                            <span className="text-muted-foreground shrink-0">Email</span>
                            <span className="font-medium text-foreground text-right break-all sm:max-w-[65%]">
                              {registration.email}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Date</span>
                            <span className="font-medium text-foreground">
                              {new Date(registration.date_inscription).toLocaleDateString("fr-FR")}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Montant</span>
                            <span className="font-semibold text-foreground">
                              {registration.montant === 0 ? "Gratuit" : `${registration.montant.toLocaleString()} FCFA`}
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 border-t">
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="w-full text-xs sm:text-sm"
                          >
                            <Link href={`/admin/inscription/${registration.id}`}>
                              <Eye className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              Voir les détails
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
