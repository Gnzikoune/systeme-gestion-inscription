export interface News {
  id: string
  titre: string
  description: string
  contenu?: string // Full content for detail page
  image?: string // URL or path to image
  date: string
  lieu: string
  type: "actualite" | "evenement" // actualite = past news, evenement = future event
  ordre: number
  actif: boolean
  date_creation: string
  date_modification: string
}

// Default news for 2025
export const defaultNews: News[] = []
