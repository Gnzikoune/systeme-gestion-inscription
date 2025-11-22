"use client"

import { useEffect, useState, use } from "react"
import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
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

export default function RegistrationDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const [registration, setRegistration] = useState<Registration | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()
  
  // Déballer les params (Promise ou objet direct) avec React.use()
  const resolvedParams = use(params instanceof Promise ? params : Promise.resolve(params))

  const loadRegistration = () => {
    const reg = getRegistrationById(resolvedParams.id)
    setRegistration(reg || null)
    setLoading(false)
  }

  useEffect(() => {
    loadRegistration()
  }, [resolvedParams.id])

  const handleStatusUpdate = (newStatus: "en_attente" | "valide" | "echoue" | "rembourse") => {
    const success = updatePaymentStatus(resolvedParams.id, newStatus)
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
    updateRegistration(resolvedParams.id, updates)
    toast({
      title: "Informations mises à jour",
      description: "Les informations de l'inscrit ont été modifiées avec succès.",
    })
    loadRegistration()
  }

  const handleDelete = () => {
    const success = deleteRegistration(resolvedParams.id)
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

      <main className="flex-1 bg-muted/30 py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-4 sm:mb-6">
            <Link href="/admin">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au tableau de bord
            </Link>
          </Button>

          <AdminAuthNotice />

          {/* Header Card - improved responsive layout */}
          <Card className="mb-4 sm:mb-6">
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div>
                  <CardTitle className="mb-2 text-xl sm:text-2xl">
                    {registration.nom} {registration.prenom}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">{registration.numero_inscription}</CardDescription>
                </div>
                <Badge
                  variant={getPaymentStatusColor(registration.statut_paiement)}
                  className="w-fit text-xs sm:text-sm"
                >
                  {formatPaymentStatus(registration.statut_paiement)}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          <Card className="mb-4 sm:mb-6">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Actions Administrateur</CardTitle>
              <CardDescription>Gérer cette inscription</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
          <Card className="mb-4 sm:mb-6">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Programme</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-base font-medium text-foreground sm:text-lg">
                <GraduationCap className="h-5 w-5 shrink-0 text-primary" />
                <span className="break-words">{registration.programme_nom}</span>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information - improved responsive grid */}
          <Card className="mb-4 sm:mb-6">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Informations Personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-muted-foreground">Email</div>
                    <div className="break-words text-sm text-foreground">{registration.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Téléphone</div>
                    <div className="text-sm text-foreground">{registration.telephone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Ville</div>
                    <div className="text-sm text-foreground">{registration.ville}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-muted-foreground">Organisation</div>
                    <div className="break-words text-sm text-foreground">
                      {registration.organisation || "Non renseignée"}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <GraduationCap className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Niveau d'études</div>
                  <div className="text-sm text-foreground">{registration.niveau_etude}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Motivation */}
          <Card className="mb-4 sm:mb-6">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Motivation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <FileText className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                <p className="text-sm leading-relaxed text-foreground">{registration.motivation}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information - improved responsive grid */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Informations de Paiement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Calendar className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Date d'inscription</div>
                    <div className="text-sm text-foreground">
                      {new Date(registration.date_inscription).toLocaleString("fr-FR", {
                        dateStyle: "long",
                        timeStyle: "short",
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CreditCard className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Méthode de paiement</div>
                    <div className="text-sm capitalize text-foreground">{registration.methode_paiement}</div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                <div className="text-sm font-medium text-muted-foreground">Montant</div>
                <div className="text-xl font-bold text-foreground sm:text-2xl">
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
