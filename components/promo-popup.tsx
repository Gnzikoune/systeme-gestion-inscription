"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Sparkles, ArrowRight } from "lucide-react"
import { getProgramById } from "@/lib/data/programs"
import { getPromoConfig } from "@/lib/storage/promo-storage"

const STORAGE_KEY = "csgr_ia_promo_dismissed"

export function PromoPopup() {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [config, setConfig] = useState(() => getPromoConfig())
  const program = getProgramById(config.programId)

  useEffect(() => {
    // Charger la configuration initiale
    const currentConfig = getPromoConfig()
    setConfig(currentConfig)

    // Écouter les changements de configuration via un événement personnalisé
    const handleConfigChange = () => {
      const newConfig = getPromoConfig()
      setConfig(newConfig)
      // Fermer le popup si la config change
      if (open) {
        setOpen(false)
      }
    }

    // Écouter les changements de localStorage (pour la synchronisation entre onglets)
    window.addEventListener("storage", handleConfigChange)
    
    // Écouter un événement personnalisé pour les changements dans le même onglet
    window.addEventListener("promoConfigUpdated", handleConfigChange)

    return () => {
      window.removeEventListener("storage", handleConfigChange)
      window.removeEventListener("promoConfigUpdated", handleConfigChange)
    }
  }, [open])

  useEffect(() => {
    if (!config.enabled || !program) return

    // Ne pas afficher sur les pages d'inscription, programme ou paiement de cette formation
    if (
      pathname?.includes(`/inscription/${program.id}`) ||
      pathname?.includes(`/programme/${program.id}`) ||
      pathname?.includes(`/paiement/${program.id}`) ||
      pathname?.includes(`/confirmation/${program.id}`)
    ) {
      return
    }

    // Vérifier si le popup a été fermé récemment
    const dismissedData = localStorage.getItem(STORAGE_KEY)
    if (dismissedData) {
      const dismissedTime = parseInt(dismissedData, 10)
      const now = Date.now()
      const cooldownMs = config.cooldownDays * 24 * 60 * 60 * 1000
      if (now - dismissedTime < cooldownMs) {
        return // Ne pas afficher si dans la période de cooldown
      }
    }

    // Afficher le popup après le délai configuré
    const timer = setTimeout(() => {
      setOpen(true)
    }, config.delay)

    return () => clearTimeout(timer)
  }, [config, program, pathname])

  const handleClose = () => {
    setOpen(false)
    // Enregistrer la date de fermeture
    localStorage.setItem(STORAGE_KEY, Date.now().toString())
  }

  const handleInscription = () => {
    handleClose()
    router.push(`/inscription/${program?.id}`)
  }

  if (!program) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent 
        className="max-w-md p-0 overflow-hidden [&>button]:z-50 [&>button]:bg-background/90 [&>button]:backdrop-blur-sm [&>button]:opacity-100 [&>button]:hover:bg-background [&>button]:shadow-md" 
        showCloseButton={true}
      >
        <div className="relative">
          {/* Image de fond */}
          <div className="relative h-32 w-full overflow-hidden">
            <Image
              src={program.image || "/placeholder.svg"}
              alt={program.nom}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute top-2 right-2">
              <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm text-xs">
                <Sparkles className="mr-1 h-2.5 w-2.5" />
                En vedette
              </Badge>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-4 space-y-3">
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-lg text-left leading-tight">{program.nom}</DialogTitle>
              <DialogDescription className="text-left text-sm line-clamp-2">
                {program.description_courte}
              </DialogDescription>
            </DialogHeader>

            {/* Informations clés */}
            <div className="flex items-center gap-4 text-xs py-2 border-y">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                <span className="text-muted-foreground">{program.date_debut}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span className="text-muted-foreground">{program.duree}</span>
              </div>
              <div className="ml-auto">
                {program.gratuit ? (
                  <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                    Gratuit
                  </Badge>
                ) : (
                  <span className="font-semibold text-sm">{program.prix.toLocaleString()} FCFA</span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 pt-1">
              <Button
                onClick={handleInscription}
                size="sm"
                className="w-full bg-primary hover:bg-primary/90"
              >
                S'inscrire maintenant
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Button>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="w-full"
              >
                <Link 
                  href={`/programme/${program.id}`} 
                  className="text-xs"
                  onClick={handleClose}
                >
                  En savoir plus
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

