"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollToSection() {
  const pathname = usePathname()

  useEffect(() => {
    // Only run on homepage
    if (pathname !== "/") return

    // Check if there's a hash in the URL
    const hash = window.location.hash
    if (hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 100)
    }
  }, [pathname])

  return null
}
