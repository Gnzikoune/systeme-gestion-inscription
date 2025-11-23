"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getProgramByIdFromStorage } from "@/lib/storage/programs-storage"
import type { Program } from "@/lib/data/programs"
import { ArrowLeft, Loader2 } from "lucide-react"
import { addRegistration, generateRegistrationNumber, generateRegistrationId } from "@/lib/storage/local-storage"

export default function InscriptionPage() {
  const router = useRouter()
  const params = useParams()
  const [program, setProgram] = useState<Program | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const id = params?.id as string
    if (id) {
      const loadedProgram = getProgramByIdFromStorage(id)
      setProgram(loadedProgram || null)
    }
  }, [params])
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    ville: "",
    organisation: "",
    niveau_etude: "",
    motivation: "",
  })

  if (!program) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">Programme non trouvé</p>
              <Button asChild className="mt-4">
                <Link href="/">Retour à l'accueil</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    let programPrefix = "INS"
    if (program.id === "ai4steam-2026") programPrefix = "AI4S-2026"
    else if (program.id === "ethique-ia-gouvernance") programPrefix = "ETH-2025"
    else if (program.id === "recherche-sante-aref") programPrefix = "SANTE-2026"
    else if (program.id === "developement-projets-ia") programPrefix = "BOOT-2026"

    const newRegistration = {
      id: generateRegistrationId(),
      programme_id: program.id,
      programme_nom: program.nom,
      ...formData,
      date_inscription: new Date().toISOString(),
      statut_paiement: program.gratuit ? ("gratuit" as const) : ("en_attente" as const),
      montant: program.prix,
      methode_paiement: program.gratuit ? ("gratuit" as const) : ("stripe" as const),
      numero_inscription: generateRegistrationNumber(programPrefix),
    }

    addRegistration(newRegistration)

    sessionStorage.setItem(
      "inscription",
      JSON.stringify({
        ...formData,
        program: program.nom,
        programId: program.id,
        prix: program.prix,
        gratuit: program.gratuit,
        numero_inscription: newRegistration.numero_inscription,
      }),
    )

    setLoading(false)

    window.scrollTo({ top: 0, behavior: "instant" })

    if (program.gratuit) {
      router.push(`/confirmation/${program.id}?gratuit=true`)
    } else {
      router.push(`/paiement/${program.id}`)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      niveau_etude: value,
    }))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30 py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <Button asChild variant="ghost" className="mb-4 sm:mb-6">
              <Link href={`/programme/${program.id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour au programme
              </Link>
            </Button>

            <Card>
              <CardHeader>
                <CardTitle className="text-balance text-lg sm:text-xl md:text-2xl">Inscription au programme</CardTitle>
                <CardDescription className="text-pretty text-xs sm:text-sm md:text-base">{program.nom}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom *</Label>
                      <Input
                        id="nom"
                        name="nom"
                        required
                        value={formData.nom}
                        onChange={handleChange}
                        placeholder="Votre nom"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prenom">Prénom *</Label>
                      <Input
                        id="prenom"
                        name="prenom"
                        required
                        value={formData.prenom}
                        onChange={handleChange}
                        placeholder="Votre prénom"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre.email@exemple.com"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="telephone">Téléphone *</Label>
                      <Input
                        id="telephone"
                        name="telephone"
                        type="tel"
                        required
                        value={formData.telephone}
                        onChange={handleChange}
                        placeholder="+241 XX XX XX XX"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ville">Ville *</Label>
                      <Input
                        id="ville"
                        name="ville"
                        required
                        value={formData.ville}
                        onChange={handleChange}
                        placeholder="Libreville, Port-Gentil, etc."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organisation">Organisation (optionnel)</Label>
                    <Input
                      id="organisation"
                      name="organisation"
                      value={formData.organisation}
                      onChange={handleChange}
                      placeholder="Université, Entreprise, Ministère, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="niveau_etude">Niveau d'études *</Label>
                    <Select value={formData.niveau_etude} onValueChange={handleSelectChange} required>
                      <SelectTrigger id="niveau_etude">
                        <SelectValue placeholder="Sélectionnez votre niveau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lycée">Lycée</SelectItem>
                        <SelectItem value="Bac">Bac</SelectItem>
                        <SelectItem value="Bac+2">Bac+2</SelectItem>
                        <SelectItem value="Licence">Licence (Bac+3)</SelectItem>
                        <SelectItem value="Master 1">Master 1 (Bac+4)</SelectItem>
                        <SelectItem value="Master 2">Master 2 (Bac+5)</SelectItem>
                        <SelectItem value="Doctorat">Doctorat</SelectItem>
                        <SelectItem value="Post-Doctorat">Post-Doctorat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motivation">Motivation *</Label>
                    <Textarea
                      id="motivation"
                      name="motivation"
                      required
                      value={formData.motivation}
                      onChange={handleChange}
                      placeholder="Expliquez en quelques lignes pourquoi vous souhaitez participer à ce programme..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  <div className="rounded-lg border border-border bg-muted/50 p-3 sm:p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm md:text-base font-medium text-foreground">Programme sélectionné</span>
                      <span className="text-xs sm:text-sm md:text-base text-muted-foreground">{program.nom}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
                      <span className="text-xs sm:text-sm md:text-base font-medium text-foreground">Montant</span>
                      <span className="text-base sm:text-lg md:text-xl font-bold text-foreground">
                        {program.gratuit ? "Gratuit" : `${program.prix.toLocaleString()} FCFA`}
                      </span>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Traitement en cours...
                      </>
                    ) : program.gratuit ? (
                      "S'inscrire gratuitement"
                    ) : (
                      "Procéder au paiement"
                    )}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground leading-relaxed">
                    En vous inscrivant, vous acceptez nos conditions d'utilisation et notre politique de
                    confidentialité.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
