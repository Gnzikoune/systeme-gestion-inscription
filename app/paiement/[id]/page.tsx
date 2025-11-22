"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getProgramById } from "@/lib/data/programs"
import { ArrowLeft, CreditCard, Loader2, CheckCircle } from "lucide-react"

export default function PaiementPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const router = useRouter()
  // Déballer les params (Promise ou objet direct) avec React.use()
  const resolvedParams = use(params instanceof Promise ? params : Promise.resolve(params))
  const program = getProgramById(resolvedParams.id)
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("singpay")
  const [inscriptionData, setInscriptionData] = useState<any>(null)

  useEffect(() => {
    const data = sessionStorage.getItem("inscription")
    if (data) {
      setInscriptionData(JSON.parse(data))
    }
  }, [])

  if (!program || program.gratuit) {
    return null
  }

  const handlePayment = async () => {
    setLoading(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Store payment status
    sessionStorage.setItem("paymentStatus", "success")
    sessionStorage.setItem("paymentMethod", paymentMethod)

    setLoading(false)

    window.scrollTo({ top: 0, behavior: "instant" })
    router.push(`/confirmation/${program.id}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30 py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Button asChild variant="ghost" className="mb-4 sm:mb-6">
              <Link href={`/inscription/${program.id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à l'inscription
              </Link>
            </Button>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-balance text-lg sm:text-xl">Paiement de l'inscription</CardTitle>
                    <CardDescription className="text-sm">Choisissez votre méthode de paiement</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50 sm:p-4">
                        <RadioGroupItem value="singpay" id="singpay" />
                        <Label htmlFor="singpay" className="flex flex-1 cursor-pointer items-center gap-2 sm:gap-3">
                          <CreditCard className="h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5" />
                          <div>
                            <div className="text-sm font-medium sm:text-base">SingPay</div>
                            <div className="text-xs text-muted-foreground sm:text-sm">Paiement mobile sécurisé</div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50 sm:p-4">
                        <RadioGroupItem value="flutterwave" id="flutterwave" />
                        <Label htmlFor="flutterwave" className="flex flex-1 cursor-pointer items-center gap-2 sm:gap-3">
                          <CreditCard className="h-4 w-4 shrink-0 text-accent sm:h-5 sm:w-5" />
                          <div>
                            <div className="text-sm font-medium sm:text-base">Flutterwave</div>
                            <div className="text-xs text-muted-foreground sm:text-sm">Carte bancaire, Mobile Money</div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50 sm:p-4">
                        <RadioGroupItem value="paydunya" id="paydunya" />
                        <Label htmlFor="paydunya" className="flex flex-1 cursor-pointer items-center gap-2 sm:gap-3">
                          <CreditCard className="h-4 w-4 shrink-0 text-secondary sm:h-5 sm:w-5" />
                          <div>
                            <div className="text-sm font-medium sm:text-base">PayDunya</div>
                            <div className="text-xs text-muted-foreground sm:text-sm">
                              Orange Money, MTN Mobile Money
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>

                    <Button onClick={handlePayment} size="lg" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Traitement du paiement...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Payer {program.prix.toLocaleString()} FCFA
                        </>
                      )}
                    </Button>

                    <div className="rounded-lg bg-muted/50 p-3 sm:p-4">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5" />
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-foreground sm:text-sm">Paiement sécurisé</p>
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            Toutes les transactions sont sécurisées et cryptées. Vos informations bancaires ne sont
                            jamais stockées.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Récapitulatif</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {inscriptionData && (
                      <>
                        <div className="space-y-2 border-b border-border pb-4">
                          <div className="text-sm font-medium text-foreground">Participant</div>
                          <div className="text-sm text-muted-foreground">
                            {inscriptionData.prenom} {inscriptionData.nom}
                          </div>
                          <div className="break-words text-xs text-muted-foreground">{inscriptionData.email}</div>
                        </div>
                      </>
                    )}

                    <div className="space-y-2 border-b border-border pb-4">
                      <div className="text-sm font-medium text-foreground">Programme</div>
                      <div className="break-words text-sm text-muted-foreground">{program.nom}</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Sous-total</span>
                        <span className="text-foreground">{program.prix.toLocaleString()} FCFA</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-border pt-2">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="text-lg font-bold text-foreground sm:text-xl">
                          {program.prix.toLocaleString()} FCFA
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
