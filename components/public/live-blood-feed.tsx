"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Droplet, Hospital, Clock, AlertTriangle, TrendingUp, TrendingDown, RefreshCw } from "lucide-react"

interface BloodUpdate {
  id: string
  hospital: string
  location: string
  bloodType: string
  action: "request" | "donation" | "transfer" | "urgent"
  units: number
  timestamp: Date
}

const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]

// Simulated live data - In production, this would come from Neon DB
const hospitals = [
  "Kenyatta National Hospital",
  "Aga Khan University Hospital",
  "Nairobi Hospital",
  "Mater Misericordiae Hospital",
  "MP Shah Hospital",
  "Karen Hospital",
  "Coptic Hospital",
  "Gertrude's Children's Hospital",
]

const locations = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Machakos", "Nyeri"]

function generateMockUpdate(): BloodUpdate {
  const actions: BloodUpdate["action"][] = ["request", "donation", "transfer", "urgent"]
  return {
    id: Math.random().toString(36).substring(7),
    hospital: hospitals[Math.floor(Math.random() * hospitals.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    bloodType: bloodTypes[Math.floor(Math.random() * bloodTypes.length)],
    action: actions[Math.floor(Math.random() * actions.length)],
    units: Math.floor(Math.random() * 5) + 1,
    timestamp: new Date(),
  }
}

export function LiveBloodFeed() {
  const [updates, setUpdates] = useState<BloodUpdate[]>([])
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    // Initialize with some updates
    const initial = Array.from({ length: 5 }, generateMockUpdate)
    setUpdates(initial)

    // Simulate live updates
    if (isLive) {
      const interval = setInterval(() => {
        setUpdates((prev) => {
          const newUpdate = generateMockUpdate()
          return [newUpdate, ...prev].slice(0, 10)
        })
      }, 4000)

      return () => clearInterval(interval)
    }
  }, [isLive])

  const getActionIcon = (action: BloodUpdate["action"]) => {
    switch (action) {
      case "urgent":
        return <AlertTriangle className="h-4 w-4 text-emergency" />
      case "request":
        return <TrendingDown className="h-4 w-4 text-warning" />
      case "donation":
        return <TrendingUp className="h-4 w-4 text-success" />
      case "transfer":
        return <RefreshCw className="h-4 w-4 text-primary" />
    }
  }

  const getActionBadge = (action: BloodUpdate["action"]) => {
    switch (action) {
      case "urgent":
        return (
          <Badge className="bg-emergency/10 text-emergency border-emergency/20 animate-pulse">URGENT REQUEST</Badge>
        )
      case "request":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Blood Request</Badge>
      case "donation":
        return <Badge className="bg-success/10 text-success border-success/20">Donation Received</Badge>
      case "transfer":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Inter-Hospital Transfer</Badge>
    }
  }

  const formatTime = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    return `${Math.floor(seconds / 3600)}h ago`
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Droplet className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Live Blood Network</CardTitle>
            <p className="text-xs text-muted-foreground">Real-time activity across Kenya</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isLive && (
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
              </span>
              <span className="text-xs font-medium text-success">LIVE</span>
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLive(!isLive)}
            className="text-xs text-muted-foreground"
          >
            {isLive ? "Pause" : "Resume"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {updates.map((update, index) => (
          <div
            key={update.id}
            className={`flex items-start gap-3 rounded-lg border border-border/50 bg-background/50 p-3 transition-all duration-300 ${
              index === 0 ? "animate-slide-up" : ""
            }`}
          >
            {getActionIcon(update.action)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                {getActionBadge(update.action)}
                <Badge variant="outline" className="font-mono font-bold">
                  {update.bloodType}
                </Badge>
                <span className="text-sm font-medium">{update.units} units</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Hospital className="h-3 w-3" />
                <span className="truncate">{update.hospital}</span>
                <span className="text-muted-foreground/50">•</span>
                <span>{update.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
              <Clock className="h-3 w-3" />
              {formatTime(update.timestamp)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
