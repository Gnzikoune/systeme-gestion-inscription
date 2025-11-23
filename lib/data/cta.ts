export interface CTA {
  id: string
  titre: string
  description: string
  texte_bouton: string
  lien_bouton: string
  image_background?: string
  actif: boolean
  date_creation: string
  date_modification: string
}

export const defaultCTA: CTA = {
  id: "cta-default",
  titre: "Rejoignez-nous dans notre mission",
  description: "Participez à l'avancement de la recherche en Intelligence Artificielle au Gabon et contribuez au développement numérique du pays.",
  texte_bouton: "Découvrir nos programmes",
  lien_bouton: "/#programmes",
  image_background: "/placeholder.svg",
  actif: true,
  date_creation: new Date().toISOString(),
  date_modification: new Date().toISOString(),
}

