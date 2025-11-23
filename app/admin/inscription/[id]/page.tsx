"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { notFound, useRouter, useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatPaymentStatus, getPaymentStatusColor, type Registration } from "@/lib/data/registrations"
import { ArrowLeft, Mail, Phone, MapPin, Building2, GraduationCap, Calendar, CreditCard, FileText } from "lucide-react"
import { AdminAuthNotice } from "@/components/admin/admin-auth-notice"
import {
  getRegistrationById,
  updateRegistration,
  updatePaymentStatus,
  deleteRegistration,
} from "@/lib/storage/local-storage"
import { StatusUpdateDialog } from "@/components/admin/status-update-dialog"
import { EditRegistrationDialog } from "@/components/admin/edit-registration-dialog"
import { DeleteRegistrationDialog } from "@/components/admin/delete-registration-dialog"
import { useToast } from "@/hooks/use-toast"

export default function RegistrationDetailPage() {
  const params = useParams()
  const [registration, setRegistration] = useState<Registration | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  const loadRegistration = () => {
    const id = params?.id as string
    if (id) {
      const reg = getRegistrationById(id)
      setRegistration(reg || null)
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRegistration()
  }, [params])

  const handleStatusUpdate = (newStatus: "en_attente" | "valide" | "echoue" | "rembourse") => {
    const id = params?.id as string
    if (!id) return
    const success = updatePaymentStatus(id, newStatus)
    if (success) {
      toast({
        title: "Statut mis à jour",
        description: `Le statut de paiement a été changé en "${formatPaymentStatus(newStatus)}".`,
      })
      loadRegistration()
    } else {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut de paiement.",
        variant: "destructive",
      })
    }
  }

  const handleRegistrationUpdate = (updates: Partial<Registration>) => {
    const id = params?.id as string
    if (!id) return
    updateRegistration(id, updates)
    toast({
      title: "Informations mises à jour",
      description: "Les informations de l'inscrit ont été modifiées avec succès.",
    })
    loadRegistration()
  }

  const handleDelete = () => {
    const id = params?.id as string
    if (!id) return
    const success = deleteRegistration(id)
    if (success) {
      toast({
        title: "Inscription supprimée",
        description: "L'inscription a été supprimée définitivement.",
      })
      window.scrollTo({ top: 0, behavior: "instant" })
      router.push("/admin")
    } else {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'inscription.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Chargement...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!registration) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30 py-3 sm:py-4 md:py-6 lg:py-8">
        <div className="container mx-auto max-w-4xl px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Back Button */}
          <Button asChild variant="ghost" size="sm" className="mb-3 sm:mb-4 md:mb-6 sm:size-default">
            <Link href="/admin">
              <ArrowLeft className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Retour au tableau de bord</span>
              <span className="sm:hidden">Retour</span>
            </Link>
          </Button>

          <AdminAuthNotice />

          {/* Header Card - improved responsive layout */}
          <Card className="mb-3 sm:mb-4 md:mb-6">
            <CardHeader className="pb-3 sm:pb-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="min-w-0 flex-1">
                  <CardTitle className="mb-1.5 sm:mb-2 text-lg sm:text-xl md:text-xl lg:text-xl break-words">
                    {registration.nom} {registration.prenom}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm md:text-base break-all">{registration.numero_inscription}</CardDescription>
                </div>
                <Badge
                  variant={getPaymentStatusColor(registration.statut_paiement)}
                  className="w-fit text-xs sm:text-sm shrink-0"
                >
                  {formatPaymentStatus(registration.statut_paiement)}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          <Card className="mb-3 sm:mb-4 md:mb-6">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-base sm:text-lg md:text-lg lg:text-lg">Actions Administrateur</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Gérer cette inscription</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row sm:flex-wrap">
                <StatusUpdateDialog
                  registrationId={registration.id}
                  currentStatus={registration.statut_paiement}
                  onStatusUpdate={handleStatusUpdate}
                />
                <EditRegistrationDialog registration={registration} onUpdate={handleRegistrationUpdate} />
                <DeleteRegistrationDialog
                  registrationNumber={registration.numero_inscription}
                  participantName={`${registration.nom} ${registration.prenom}`}
                  onDelete={handleDelete}
                />
              </div>
            </CardContent>
          </Card>

          {/* Programme Information */}
          <Card className="mb-3 sm:mb-4 md:mb-6">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-base sm:text-lg md:text-lg lg:text-lg">Programme</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground sm:text-base md:text-base lg:text-base">
                <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-primary" />
                <span className="break-words">{registration.programme_nom}</span>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information - improved responsive grid */}
          <Card className="mb-3 sm:mb-4 md:mb-6">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-base sm:text-lg md:text-lg lg:text-lg">Informations Personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Mail className="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm font-medium text-muted-foreground">Email</div>
                    <div className="break-words text-xs sm:text-sm text-foreground">{registration.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3">
                  <Phone className="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm font-medium text-muted-foreground">Téléphone</div>
                    <div className="text-xs sm:text-sm text-foreground break-words">{registration.telephone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3">
                  <MapPin className="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm font-medium text-muted-foreground">Ville</div>
                    <div className="text-xs sm:text-sm text-foreground break-words">{registration.ville}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3">
                  <Building2 className="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm font-medium text-muted-foreground">Organisation</div>
                    <div className="break-words text-xs sm:text-sm text-foreground">
                      {registration.organisation || "Non renseignée"}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-2 sm:gap-3">
                <GraduationCap className="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm font-medium text-muted-foreground">Niveau d'études</div>
                  <div className="text-xs sm:text-sm text-foreground break-words">{registration.niveau_etude}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Motivation */}
          <Card className="mb-3 sm:mb-4 md:mb-6">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-base sm:text-lg md:text-lg lg:text-lg">Motivation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-2 sm:gap-3">
                <FileText className="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-muted-foreground" />
                <p className="text-xs sm:text-sm leading-relaxed text-foreground break-words">{registration.motivation}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information - improved responsive grid */}
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-base sm:text-lg md:text-lg lg:text-lg">Informations de Paiement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Calendar className="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm font-medium text-muted-foreground">Date d'inscription</div>
                    <div className="text-xs sm:text-sm text-foreground break-words">
                      {new Date(registration.date_inscription).toLocaleString("fr-FR", {
                        dateStyle: "long",
                        timeStyle: "short",
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3">
                  <CreditCard className="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm font-medium text-muted-foreground">Méthode de paiement</div>
                    <div className="text-xs sm:text-sm capitalize text-foreground break-words">{registration.methode_paiement}</div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3 sm:p-4">
                <div className="text-xs sm:text-sm font-medium text-muted-foreground">Montant</div>
                <div className="text-lg sm:text-xl md:text-xl lg:text-xl font-bold text-foreground">
                  {registration.montant === 0 ? "Gratuit" : `${registration.montant.toLocaleString()} FCFA`}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
