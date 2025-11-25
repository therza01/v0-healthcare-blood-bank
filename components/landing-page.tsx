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
