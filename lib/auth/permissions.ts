import type { UserRole } from "./types"

export type Permission =
  | "view:inscriptions"
  | "view:programmes"
  | "view:actualites"
  | "view:statistiques"
  | "view:cta"
  | "view:parametres"
  | "create:programmes"
  | "create:actualites"
  | "create:statistiques"
  | "edit:programmes"
  | "edit:actualites"
  | "edit:statistiques"
  | "edit:cta"
  | "delete:programmes"
  | "delete:actualites"
  | "delete:statistiques"
  | "reorder:programmes"
  | "reorder:actualites"
  | "reorder:statistiques"
  | "export:inscriptions"
  | "manage:parametres"
  | "clear:inscriptions"

// Définition des permissions par rôle
const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    // Vue - tous les accès
    "view:inscriptions",
    "view:programmes",
    "view:actualites",
    "view:statistiques",
    "view:cta",
    "view:parametres",
    // Création
    "create:programmes",
    "create:actualites",
    "create:statistiques",
    // Modification
    "edit:programmes",
    "edit:actualites",
    "edit:statistiques",
    "edit:cta",
    // Suppression
    "delete:programmes",
    "delete:actualites",
    "delete:statistiques",
    // Réorganisation
    "reorder:programmes",
    "reorder:actualites",
    "reorder:statistiques",
    // Export et gestion
    "export:inscriptions",
    "manage:parametres",
    "clear:inscriptions",
  ],
  editor: [
    // Vue - tous les accès sauf paramètres
    "view:inscriptions",
    "view:programmes",
    "view:actualites",
    "view:statistiques",
    "view:cta",
    // Création
    "create:programmes",
    "create:actualites",
    "create:statistiques",
    // Modification
    "edit:programmes",
    "edit:actualites",
    "edit:statistiques",
    "edit:cta",
    // Réorganisation
    "reorder:programmes",
    "reorder:actualites",
    "reorder:statistiques",
    // Export
    "export:inscriptions",
    // Pas de suppression, pas de paramètres, pas de clear
  ],
  viewer: [
    // Vue seule - lecture seule
    "view:inscriptions",
    "view:programmes",
    "view:actualites",
    "view:statistiques",
    "view:cta",
    // Pas de création, modification, suppression, etc.
  ],
}

/**
 * Vérifie si un rôle a une permission spécifique
 */
export function hasPermission(role: UserRole | undefined, permission: Permission): boolean {
  if (!role) return false
  const permissions = rolePermissions[role] || []
  return permissions.includes(permission)
}

/**
 * Vérifie si un rôle a au moins une des permissions
 */
export function hasAnyPermission(role: UserRole | undefined, permissions: Permission[]): boolean {
  return permissions.some((permission) => hasPermission(role, permission))
}

/**
 * Vérifie si un rôle a toutes les permissions
 */
export function hasAllPermissions(role: UserRole | undefined, permissions: Permission[]): boolean {
  return permissions.every((permission) => hasPermission(role, permission))
}

/**
 * Retourne toutes les permissions d'un rôle
 */
export function getRolePermissions(role: UserRole | undefined): Permission[] {
  if (!role) return []
  return rolePermissions[role] || []
}

