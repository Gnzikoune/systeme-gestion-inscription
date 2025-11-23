export interface Stat {
  id: string
  label: string
  value: string
  icon: "BookOpen" | "Users" | "Award" | "Globe" | "GraduationCap" | "Building" | "TrendingUp" | "Target"
  color: "primary" | "accent" | "secondary" | "default"
  ordre: number
  actif: boolean
}

export const defaultStats: Stat[] = [
  {
    id: "stat-1",
    label: "Publications en IA",
    value: "138",
    icon: "BookOpen",
    color: "primary",
    ordre: 1,
    actif: true,
  },
  {
    id: "stat-2",
    label: "Centres UIT mondiaux",
    value: "17",
    icon: "Users",
    color: "accent",
    ordre: 2,
    actif: true,
  },
  {
    id: "stat-3",
    label: "Couverture 3G/4G",
    value: "90%",
    icon: "Award",
    color: "secondary",
    ordre: 3,
    actif: true,
  },
  {
    id: "stat-4",
    label: "Partenaire officiel",
    value: "UNESCO",
    icon: "Globe",
    color: "primary",
    ordre: 4,
    actif: true,
  },
]

