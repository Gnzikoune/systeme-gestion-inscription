"use client"

import { useAuth } from "@/contexts/auth-context"
import { hasPermission, hasAnyPermission, hasAllPermissions, getRolePermissions, type Permission } from "@/lib/auth/permissions"

export function usePermissions() {
  const { user } = useAuth()
  const role = user?.role || "viewer"

  return {
    /**
     * Vérifie si l'utilisateur a une permission spécifique
     */
    can: (permission: Permission): boolean => {
      return hasPermission(role, permission)
    },

    /**
     * Vérifie si l'utilisateur a au moins une des permissions
     */
    canAny: (permissions: Permission[]): boolean => {
      return hasAnyPermission(role, permissions)
    },

    /**
     * Vérifie si l'utilisateur a toutes les permissions
     */
    canAll: (permissions: Permission[]): boolean => {
      return hasAllPermissions(role, permissions)
    },

    /**
     * Retourne toutes les permissions de l'utilisateur
     */
    permissions: getRolePermissions(role),

    /**
     * Vérifie si l'utilisateur est admin
     */
    isAdmin: role === "admin",

    /**
     * Vérifie si l'utilisateur est editor ou admin
     */
    isEditor: role === "editor" || role === "admin",

    /**
     * Vérifie si l'utilisateur est viewer
     */
    isViewer: role === "viewer",
  }
}

