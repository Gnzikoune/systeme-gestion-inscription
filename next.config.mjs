/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Désactiver les source maps pour éviter les erreurs
  productionBrowserSourceMaps: false,
}

export default nextConfig
