// Configuration pour la formation promue dans le popup publicitaire
export interface PromoConfig {
  // ID de la formation à promouvoir
  programId: string
  // Activer ou désactiver le popup
  enabled: boolean
  // Délai avant affichage du popup (en millisecondes)
  delay: number
  // Durée avant de pouvoir réafficher le popup après fermeture (en jours)
  cooldownDays: number
}

// Configuration par défaut - Modifiez programId pour changer la formation promue
export const promoConfig: PromoConfig = {
  programId: "ai4steam-2026", // Formation AI4STEAM 2026 par défaut
  enabled: true,
  delay: 3000, // 3 secondes
  cooldownDays: 1, // Ne pas réafficher pendant 1 jour après fermeture
}

