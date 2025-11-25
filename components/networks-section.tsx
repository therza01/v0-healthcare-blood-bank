"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Hospital, Heart, Truck, CheckCircle2 } from "lucide-react"
import { AdinkraSymbol } from "./ui/adinkra-symbol"

interface NetworksSectionProps {
  onJoin: (type: "signup", role: string) => void
}

const networks = [
  {
    id: "hospital",
    icon: Hospital,
    title: "Hospital Network",
    subtitle: "For Healthcare Facilities",
    description:
      "Join Kenya's largest hospital blood bank network. Manage inventory, coordinate transfers, and save lives together.",
    features: [
      "Real-time inventory management",
      "Inter-hospital blood transfers",
      "Staff management & roles",
      "Analytics & reporting",
    ],
    cta: "Register Hospital",
    color: "primary",
    bgGradient: "from-primary/5 to-primary/10",
    borderColor: "border-primary/20",
    symbol: "gye-nyame" as const,
  },
  {
    id: "donor",
    icon: Heart,
    title: "Donor Network",
    subtitle: "For Blood Donors",
    description:
      "Become a hero in your community. Register as a donor and help ensure blood is always available when needed.",
    features: ["Find nearby donation centers", "Track donation history", "Earn donor badges", "Emergency alerts"],
    cta: "Become a Donor",
    color: "emergency",
    bgGradient: "from-emergency/5 to-emergency/10",
    borderColor: "border-emergency/20",
    symbol: "sankofa" as const,
  },
  {
    id: "rider",
    icon: Truck,
    title: "Rider Network",
    subtitle: "For Delivery Partners",
    description: "Join our dedicated rider network. Transport blood units safely and efficiently between hospitals.",
    features: ["Flexible job acceptance", "Real-time navigation", "Secure delivery tracking", "Competitive earnings"],
    cta: "Join as Rider",
    color: "warning",
    bgGradient: "from-savanna/20 to-sunset/10",
    borderColor: "border-savanna/30",
    symbol: "mpatapo" as const,
  },
]

export function NetworksSection({ onJoin }: NetworksSectionProps) {
  return (
    <section id="networks" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <AdinkraSymbol symbol="mpatapo" size={20} className="text-primary" />
            <span className="text-sm font-medium uppercase tracking-wider text-primary">Our Networks</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            United by a Single Mission
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three networks working in harmony to ensure no patient ever waits for blood.
            <span className="block mt-1 font-medium text-foreground">Harambee — Let's pull together.</span>
          </p>
        </div>

        {/* African Pattern Divider */}
        <div className="african-divider mx-auto mt-8 max-w-xs" />

        {/* Networks Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {networks.map((network) => (
            <Card
              key={network.id}
              className={`relative overflow-hidden border ${network.borderColor} bg-gradient-to-br ${network.bgGradient} transition-all duration-300 hover:shadow-xl`}
            >
              {/* Adinkra Symbol Background */}
              <div className="absolute right-4 top-4 opacity-10">
                <AdinkraSymbol symbol={network.symbol} size={80} className="text-foreground" />
              </div>

              <CardHeader className="pb-4">
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-${network.color === "warning" ? "savanna" : network.color}/20`}
                >
                  <network.icon className={`h-7 w-7 text-${network.color === "warning" ? "sunset" : network.color}`} />
                </div>
                <div className="mt-4">
                  <Badge variant="secondary" className="mb-2 text-xs font-medium">
                    {network.subtitle}
                  </Badge>
                  <h3 className="font-serif text-2xl font-bold text-card-foreground">{network.title}</h3>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">{network.description}</p>

                <ul className="space-y-3">
                  {network.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-card-foreground">
                      <CheckCircle2
                        className={`h-5 w-5 flex-shrink-0 text-${network.color === "warning" ? "success" : network.color}`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full gap-2 font-semibold ${
                    network.color === "primary"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : network.color === "emergency"
                        ? "bg-emergency text-destructive-foreground hover:bg-emergency/90"
                        : "bg-sunset text-primary-foreground hover:bg-sunset/90"
                  }`}
                  onClick={() => onJoin("signup", network.id)}
                >
                  {network.cta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
