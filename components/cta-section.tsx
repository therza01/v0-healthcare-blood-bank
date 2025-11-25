"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Droplet } from "lucide-react"
import { AdinkraSymbol } from "./ui/adinkra-symbol"

interface CTASectionProps {
  onGetStarted: () => void
}

export function CTASection({ onGetStarted }: CTASectionProps) {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 kente-pattern pointer-events-none" />

      <div className="container relative mx-auto max-w-4xl px-4 text-center">
        {/* Adinkra Symbol */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <AdinkraSymbol symbol="gye-nyame" size={40} className="text-primary" />
        </div>

        <h2 className="font-serif text-3xl font-bold text-foreground md:text-5xl text-balance">Ready to Save Lives?</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Join Kenya's most trusted blood bank network. Whether you're a hospital, donor, or delivery partner, there's a
          place for you in our mission.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            onClick={onGetStarted}
            className="group gap-2 bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <Droplet className="h-5 w-5" />
            Get Started Today
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline" className="px-8 font-semibold bg-transparent">
            Contact Sales
          </Button>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Free for public hospitals • Pay-as-you-go for private facilities • 24/7 Support
        </p>
      </div>
    </section>
  )
}
