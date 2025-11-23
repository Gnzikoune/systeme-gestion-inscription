import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="mb-4 inline-block">
              <Image src="/logo.png" alt="CSGR-IA Logo" width={80} height={80} className="h-20 w-20 object-contain" />
            </Link>
            <h3 className="mb-2 text-base sm:text-lg md:text-xl font-semibold text-foreground">CSGR-IA</h3>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
              Comité Scientifique Gabonais de Recherche sur l'Intelligence Artificielle
            </p>
          </div>

          <div>
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg md:text-xl font-semibold text-foreground">Partenaires</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base text-muted-foreground">
              <li>UNESCO</li>
              <li>UIT</li>
              <li>Centre Gabonais de l'Innovation</li>
              <li>USTM</li>
              <li>Gabtrotter</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg md:text-xl font-semibold text-foreground">Contact</h3>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
              Pour toute question concernant nos programmes, n'hésitez pas à nous contacter.
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 border-t border-border pt-6 sm:pt-8 text-center text-xs sm:text-sm md:text-base text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CSGR-IA. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
