"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Droplet, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react"

interface BloodTypeInventory {
  type: string
  units: number
  capacity: number
  trend: "up" | "down" | "stable"
}

const initialInventory: BloodTypeInventory[] = [
  { type: "O+", units: 245, capacity: 300, trend: "stable" },
  { type: "O-", units: 45, capacity: 150, trend: "down" },
  { type: "A+", units: 189, capacity: 250, trend: "up" },
  { type: "A-", units: 67, capacity: 100, trend: "stable" },
  { type: "B+", units: 134, capacity: 200, trend: "up" },
  { type: "B-", units: 28, capacity: 80, trend: "down" },
  { type: "AB+", units: 78, capacity: 100, trend: "stable" },
  { type: "AB-", units: 12, capacity: 50, trend: "down" },
]

export function BloodInventoryOverview() {
  const [inventory, setInventory] = useState(initialInventory)

  useEffect(() => {
    // Simulate inventory changes
    const interval = setInterval(() => {
      setInventory((prev) =>
        prev.map((item) => ({
          ...item,
          units: Math.max(5, Math.min(item.capacity, item.units + Math.floor(Math.random() * 11) - 5)),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatus = (units: number, capacity: number) => {
    const percentage = (units / capacity) * 100
    if (percentage <= 20) return { label: "Critical", color: "text-emergency", bg: "bg-emergency" }
    if (percentage <= 40) return { label: "Low", color: "text-warning", bg: "bg-warning" }
    return { label: "Adequate", color: "text-success", bg: "bg-success" }
  }

  const totalUnits = inventory.reduce((sum, item) => sum + item.units, 0)
  const criticalTypes = inventory.filter((item) => (item.units / item.capacity) * 100 <= 20).length

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emergency/10">
              <Droplet className="h-5 w-5 text-emergency" fill="currentColor" />
            </div>
            <div>
              <CardTitle className="text-lg">National Blood Inventory</CardTitle>
              <p className="text-xs text-muted-foreground">Aggregated from 234 partner hospitals</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">{totalUnits.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Units</p>
          </div>
        </div>
        {criticalTypes > 0 && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-emergency/10 p-2 text-sm text-emergency">
            <AlertTriangle className="h-4 w-4" />
            <span>{criticalTypes} blood type(s) at critical levels</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {inventory.map((item) => {
            const status = getStatus(item.units, item.capacity)
            const percentage = (item.units / item.capacity) * 100

            return (
              <div
                key={item.type}
                className={`rounded-xl border p-3 transition-all hover:shadow-md ${
                  percentage <= 20
                    ? "border-emergency/30 bg-emergency/5"
                    : percentage <= 40
                      ? "border-warning/30 bg-warning/5"
                      : "border-border bg-background/50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold font-mono text-foreground">{item.type}</span>
                  {percentage <= 20 ? (
                    <AlertTriangle className="h-4 w-4 text-emergency" />
                  ) : percentage <= 40 ? (
                    <AlertCircle className="h-4 w-4 text-warning" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-success" />
                  )}
                </div>
                <p className="text-2xl font-bold text-foreground">{item.units}</p>
                <p className="text-xs text-muted-foreground mb-2">of {item.capacity} capacity</p>
                <Progress value={percentage} className={`h-1.5 ${status.bg}`} />
                <p className={`text-xs mt-1 font-medium ${status.color}`}>{status.label}</p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
