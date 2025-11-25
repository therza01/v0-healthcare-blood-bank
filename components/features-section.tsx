"use client"

import { Card, CardContent } from "@/components/ui/card"
import { QrCode, MessageSquare, BarChart3, Bell, Shield, Zap } from "lucide-react"
import { AdinkraSymbol } from "./ui/adinkra-symbol"

const features = [
  {
    icon: QrCode,
    title: "QR Blood Tracking",
    description: "Scan and track every blood unit from donation to transfusion with military-grade precision.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: MessageSquare,
    title: "Inter-Hospital Chat",
    description: "Real-time coordination between hospitals. Request, offer, and transfer blood seamlessly.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: BarChart3,
    title: "Live Analytics",
    description: "Monitor blood inventory levels across the network with real-time dashboards and alerts.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: Bell,
    title: "Emergency Alerts",
    description: "Instant notifications for critical shortages. Never miss a life-saving opportunity.",
    color: "text-emergency",
    bgColor: "bg-emergency/10",
  },
  {
    icon: Shield,
    title: "Verified Network",
    description: "All hospitals are MOH-certified. Every donor is screened. Every unit is tested.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Dedicated rider network ensures blood reaches patients within the golden hour.",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <AdinkraSymbol symbol="adinkrahene" size={20} className="text-primary" />
            <span className="text-sm font-medium uppercase tracking-wider text-primary">Features</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Built for Healthcare Excellence
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Professional-grade tools designed for the unique challenges of blood bank management in Kenya.
          </p>
        </div>

        {/* African Pattern Divider */}
        <div className="african-divider mx-auto mt-8 max-w-xs" />

        {/* Features Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardContent className="p-6">
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bgColor} transition-transform group-hover:scale-110`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold text-card-foreground">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
