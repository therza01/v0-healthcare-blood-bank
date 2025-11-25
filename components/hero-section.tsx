"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Hospital, Users, Truck, Shield } from "lucide-react"

interface HeroSectionProps {
  onGetStarted: () => void
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-background pb-16 pt-8 md:pb-24 md:pt-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 kente-pattern pointer-events-none" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />

      <div className="container relative mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="flex flex-col items-start">
            <Badge variant="secondary" className="mb-6 gap-2 border-primary/20 bg-primary/5 px-4 py-2 text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              Now serving 47 counties across Kenya
            </Badge>

            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              Connecting Lives Through <span className="text-primary">Blood</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg text-muted-foreground leading-relaxed">
              Kenya's premier healthcare blood bank network. Uniting hospitals, donors, and delivery partners to ensure
              every patient gets the blood they need, when they need it.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                onClick={onGetStarted}
                className="group gap-2 bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 border-border font-semibold bg-transparent">
                <Play className="h-4 w-4" fill="currentColor" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">MOH Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <span className="text-sm font-medium text-muted-foreground">KMPDB Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" fill="none"></path>
                </svg>
                <span className="text-sm font-medium text-muted-foreground">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right - Dashboard Preview */}
          <div className="relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Dashboard Card */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-2xl shadow-primary/5">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Hospital className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-card-foreground">Kenyatta National Hospital</p>
                      <p className="text-xs text-muted-foreground">Verified Partner • Last sync: 2 min ago</p>
                    </div>
                  </div>
                  <Badge className="bg-success/10 text-success border-0">Online</Badge>
                </div>

                {/* Live Feed */}
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emergency opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emergency"></span>
                    </span>
                    <p className="text-sm font-medium text-emergency">URGENT: O- Critical (2 units left)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-success"></span>
                    <p className="text-sm text-muted-foreground">STABLE: A+ (15 units), B+ (8 units)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <p className="text-sm text-muted-foreground">RECEIVED: 3 units from Aga Khan Hospital</p>
                  </div>
                </div>

                {/* Blood Inventory Grid */}
                <div className="mt-6 grid grid-cols-4 gap-2">
                  {[
                    { type: "O+", count: 12, status: "good" },
                    { type: "O-", count: 2, status: "critical" },
                    { type: "A+", count: 15, status: "good" },
                    { type: "B+", count: 8, status: "good" },
                    { type: "AB+", count: 5, status: "low" },
                    { type: "A-", count: 3, status: "low" },
                    { type: "B-", count: 4, status: "low" },
                    { type: "AB-", count: 1, status: "critical" },
                  ].map((item) => (
                    <div
                      key={item.type}
                      className={`rounded-lg p-3 text-center ${
                        item.status === "critical"
                          ? "bg-emergency/10 border border-emergency/20"
                          : item.status === "low"
                            ? "bg-warning/10 border border-warning/20"
                            : "bg-success/10 border border-success/20"
                      }`}
                    >
                      <p className="text-lg font-bold text-card-foreground">{item.count}</p>
                      <p className="text-xs font-medium text-muted-foreground">{item.type}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -left-4 top-1/4 rounded-xl border border-border bg-card p-4 shadow-lg md:-left-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">2,847</p>
                    <p className="text-xs text-muted-foreground">Active Donors</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/4 rounded-xl border border-border bg-card p-4 shadow-lg md:-right-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-savanna/20">
                    <Truck className="h-5 w-5 text-sunset" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">156</p>
                    <p className="text-xs text-muted-foreground">Deliveries Today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
