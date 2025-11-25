"use client"

import { useState } from "react"
import { Header } from "./header"
import { HeroSection } from "./hero-section"
import { FeaturesSection } from "./features-section"
import { NetworksSection } from "./networks-section"
import { StatsSection } from "./stats-section"
import { TestimonialsSection } from "./testimonials-section"
import { CTASection } from "./cta-section"
import { Footer } from "./footer"
import { AuthModal } from "./auth/auth-modal"
import { LiveBloodFeed } from "./public/live-blood-feed"
import { BloodInventoryOverview } from "./public/blood-inventory-overview"
import { HospitalMap } from "./public/hospital-map"
import { UrgentRequests } from "./public/urgent-requests"

export function LandingPage() {
  const [authModal, setAuthModal] = useState<{ open: boolean; type: "login" | "signup"; role: string }>({
    open: false,
    type: "login",
    role: "hospital",
  })

  const openAuth = (type: "login" | "signup", role: string) => {
    setAuthModal({ open: true, type, role })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onAuthClick={openAuth} />
      <main>
        <HeroSection onGetStarted={() => openAuth("signup", "hospital")} />

        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
                Real-Time Blood Network
              </h2>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                Monitor live blood availability across Kenya. See urgent requests, hospital inventories, and how you can
                help save lives today.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 mb-6">
              <LiveBloodFeed />
              <BloodInventoryOverview />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <UrgentRequests />
              <HospitalMap />
            </div>
          </div>
        </section>

        <FeaturesSection />
        <NetworksSection onJoin={openAuth} />
        <StatsSection />
        <TestimonialsSection />
        <CTASection onGetStarted={() => openAuth("signup", "hospital")} />
      </main>
      <Footer />
      <AuthModal
        open={authModal.open}
        onOpenChange={(open) => setAuthModal((prev) => ({ ...prev, open }))}
        initialType={authModal.type}
        initialRole={authModal.role}
      />
    </div>
  )
}
