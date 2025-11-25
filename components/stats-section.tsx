"use client"

import { useEffect, useState } from "react"
import { Droplet, Hospital, Users, Truck, MapPin } from "lucide-react"

const stats = [
  {
    icon: Droplet,
    value: 15847,
    label: "Blood Units Delivered",
    suffix: "+",
    color: "text-emergency",
  },
  {
    icon: Hospital,
    value: 234,
    label: "Partner Hospitals",
    suffix: "",
    color: "text-primary",
  },
  {
    icon: Users,
    value: 28500,
    label: "Registered Donors",
    suffix: "+",
    color: "text-primary",
  },
  {
    icon: Truck,
    value: 892,
    label: "Active Riders",
    suffix: "",
    color: "text-sunset",
  },
  {
    icon: MapPin,
    value: 47,
    label: "Counties Covered",
    suffix: "",
    color: "text-success",
  },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold md:text-4xl text-balance">Impact Across Kenya</h2>
          <p className="mt-4 text-primary-foreground/80 max-w-2xl mx-auto">
            Every number represents a life touched, a family supported, a community strengthened.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10 backdrop-blur">
                <stat.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <p className="text-3xl font-bold md:text-4xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-sm text-primary-foreground/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
