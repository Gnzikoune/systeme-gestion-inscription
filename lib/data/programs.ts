export interface Program {
  id: string
  nom: string
  description_courte: string
  description_longue: string
  objectifs: string[]
  prerequis: string[]
  modalites: string[]
  prix: number
  gratuit: boolean
  date_debut: string
  date_fin: string
  duree: string
  image: string
  ordre?: number
  actif?: boolean
}

export const programs: Program[] = [
  {
    id: "ai4steam-2026",
    nom: "Formation AI4STEAM 2026",
    description_courte:
      "Formation gratuite et certifiante en IA, robotique et STEAM pour étudiants, enseignants et jeunes chercheurs gabonais.",
    description_longue:
      "Partenariat avec Gabtrotter pour des formations gratuites et certifiantes en Intelligence Artificielle, robotique et STEAM. Cette formation vise à renforcer les compétences numériques et technologiques de la jeunesse gabonaise, en préparation du 1er concours national d'IA et Robotique.",
    objectifs: [
      "Maîtriser les fondamentaux de l'Intelligence Artificielle",
      "Développer des compétences en robotique pratique",
      "Comprendre l'écosystème STEAM (Science, Technology, Engineering, Arts, Mathematics)",
      "Préparer le concours national AI4STEAM",
      "Obtenir une certification reconnue",
    ],
    prerequis: [
      "Être étudiant, enseignant ou jeune chercheur gabonais",
      "Avoir un intérêt pour les technologies et l'IA",
      "Disposer d'un ordinateur et d'une connexion internet",
      "Niveau français courant",
    ],
    modalites: [
      "Formation 100% en ligne",
      "Sessions interactives et pratiques",
      "Projets hands-on avec suivi personnalisé",
      "Certification à l'issue de la formation",
      "Accès à la communauté AI4STEAM",
    ],
    prix: 0,
    gratuit: true,
    date_debut: "15 février 2026",
    date_fin: "30 juin 2026",
    duree: "4 mois",
    image: "/ai-robotics-training-students-working-on-computers.jpg",
  },
  {
    id: "ethique-ia-gouvernance",
    nom: "Atelier Éthique & Gouvernance de l'IA",
    description_courte:
      "Atelier de vulgarisation sur la gouvernance éthique de l'IA selon les standards UNESCO et UIT.",
    description_longue:
      "Organisé en collaboration avec l'UNESCO et le Centre Gabonais de l'Innovation, cet atelier vise à sensibiliser les acteurs publics, privés et académiques aux enjeux éthiques de l'Intelligence Artificielle et à contribuer à l'élaboration de la stratégie nationale IA du Gabon.",
    objectifs: [
      "Comprendre la Recommandation UNESCO sur l'éthique de l'IA",
      "Maîtriser les principes de gouvernance responsable de l'IA",
      "Participer à l'élaboration de la stratégie nationale IA",
      "Identifier les enjeux éthiques sectoriels (santé, éducation, défense)",
      "Contribuer à un écosystème IA inclusif et durable",
    ],
    prerequis: [
      "Professionnels du secteur public ou privé",
      "Chercheurs et universitaires",
      "Entrepreneurs et startups tech",
      "Représentants de la société civile",
    ],
    modalites: [
      "Ateliers en présentiel au CGI",
      "Sessions de panels et débats",
      "Travaux de groupe sectoriels",
      "Restitution et recommandations",
      "Certificat de participation",
    ],
    prix: 25000,
    gratuit: false,
    date_debut: "10 juin 2025",
    date_fin: "12 juin 2025",
    duree: "3 jours",
    image: "/professional-workshop-ai-ethics-governance-meeting.jpg",
  },
  {
    id: "recherche-sante-aref",
    nom: "Programme de Recherche en Santé & IA",
    description_courte:
      "Programme d'appui à la rédaction et soumission de projets de recherche en santé via USTM et Africa Research Excellence Fund.",
    description_longue:
      "Ce programme vise à accompagner les chercheurs gabonais dans le développement de projets de recherche combinant santé et Intelligence Artificielle, avec un soutien pour la rédaction de propositions et l'accès aux financements internationaux via AREF.",
    objectifs: [
      "Développer des projets de recherche innovants en santé-IA",
      "Maîtriser la méthodologie de rédaction de propositions",
      "Accéder aux financements AREF et internationaux",
      "Renforcer les capacités de recherche en IA appliquée à la santé",
      "Publier dans des revues scientifiques de qualité",
    ],
    prerequis: [
      "Chercheurs ou doctorants en santé ou IA",
      "Affiliation à une université ou centre de recherche",
      "Projet de recherche en lien avec santé et IA",
      "Maîtrise de l'anglais scientifique",
    ],
    modalites: [
      "Accompagnement personnalisé sur 6 mois",
      "Ateliers méthodologiques mensuels",
      "Révision et feedback sur les propositions",
      "Mise en réseau avec experts internationaux",
      "Support post-soumission",
    ],
    prix: 50000,
    gratuit: false,
    date_debut: "1er mars 2026",
    date_fin: "31 août 2026",
    duree: "6 mois",
    image: "/medical-research-ai-healthcare-data-analysis.jpg",
  },
  {
    id: "developement-projets-ia",
    nom: "Bootcamp Développement de Projets IA",
    description_courte:
      "Formation intensive pour développer et déployer des projets d'Intelligence Artificielle concrets, du prototype à la production.",
    description_longue:
      "Bootcamp pratique de 12 semaines pour apprendre à concevoir, développer et déployer des solutions d'Intelligence Artificielle. Couvre le machine learning, le deep learning, le traitement du langage naturel et la computer vision avec des projets réels.",
    objectifs: [
      "Maîtriser les frameworks de ML/DL (TensorFlow, PyTorch)",
      "Développer des modèles d'IA performants",
      "Déployer des solutions IA en production",
      "Gérer des projets IA de bout en bout",
      "Construire un portfolio de projets",
    ],
    prerequis: [
      "Bases en programmation Python",
      "Notions de mathématiques (algèbre, statistiques)",
      "Motivation et disponibilité (engagement temps plein)",
      "Ordinateur avec GPU recommandé",
    ],
    modalites: [
      "Formation intensive 12 semaines",
      "Sessions quotidiennes (lun-ven)",
      "Projets pratiques hebdomadaires",
      "Mentorat individuel",
      "Pitch final et certification",
    ],
    prix: 150000,
    gratuit: false,
    date_debut: "1er septembre 2026",
    date_fin: "30 novembre 2026",
    duree: "12 semaines",
    image: "/coding-bootcamp-developers-programming-ai-machine-.jpg",
  },
]

export function getProgramById(id: string): Program | undefined {
  return programs.find((program) => program.id === id)
}
