"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, MapPin, Phone, Share2, Heart } from "lucide-react"

interface UrgentRequest {
  id: string
  hospital: string
  location: string
  bloodType: string
  unitsNeeded: number
  urgency: "critical" | "high" | "medium"
  postedAt: Date
  reason: string
}

const mockRequests: UrgentRequest[] = [
  {
    id: "1",
    hospital: "Kenyatta National Hospital",
    location: "Nairobi",
    bloodType: "O-",
    unitsNeeded: 5,
    urgency: "critical",
    postedAt: new Date(Date.now() - 15 * 60 * 1000),
    reason: "Emergency surgery - road accident victim",
  },
  {
    id: "2",
    hospital: "Coast General Hospital",
    location: "Mombasa",
    bloodType: "AB-",
    unitsNeeded: 3,
    urgency: "critical",
    postedAt: new Date(Date.now() - 45 * 60 * 1000),
    reason: "Maternal emergency - complicated delivery",
  },
  {
    id: "3",
    hospital: "Aga Khan University Hospital",
    location: "Nairobi",
    bloodType: "B-",
    unitsNeeded: 2,
    urgency: "high",
    postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    reason: "Scheduled cancer surgery",
  },
]

export function UrgentRequests() {
  const [requests, setRequests] = useState(mockRequests)

  const formatTime = (date: Date) => {
    const minutes = Math.floor((new Date().getTime() - date.getTime()) / 60000)
    if (minutes < 60) return `${minutes} min ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ${minutes % 60}m ago`
  }

  const getUrgencyBadge = (urgency: UrgentRequest["urgency"]) => {
    switch (urgency) {
      case "critical":
        return (
          <Badge className="bg-emergency text-emergency-foreground animate-pulse">
            <AlertTriangle className="h-3 w-3 mr-1" />
            CRITICAL
          </Badge>
        )
      case "high":
        return <Badge className="bg-warning text-warning-foreground">HIGH PRIORITY</Badge>
      case "medium":
        return <Badge className="bg-primary/80 text-primary-foreground">NEEDED</Badge>
    }
  }

  return (
    <Card className="border-emergency/30 bg-card/50 backdrop-blur">
      <CardHeader className="pb-3 border-b border-emergency/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emergency/10 animate-pulse">
              <AlertTriangle className="h-5 w-5 text-emergency" />
            </div>
            <div>
              <CardTitle className="text-lg text-emergency">Urgent Blood Requests</CardTitle>
              <p className="text-xs text-muted-foreground">Lives waiting - Your donation matters</p>
            </div>
          </div>
          <Badge variant="outline" className="border-emergency/30 text-emergency">
            {requests.length} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className={`rounded-xl border p-4 transition-all ${
              request.urgency === "critical"
                ? "border-emergency/40 bg-emergency/5 shadow-sm shadow-emergency/10"
                : "border-border bg-background/50"
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {getUrgencyBadge(request.urgency)}
                  <Badge variant="outline" className="font-mono font-bold text-lg px-3">
                    {request.bloodType}
                  </Badge>
                </div>
                <h3 className="font-semibold text-foreground">{request.hospital}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {request.location}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">{request.unitsNeeded}</p>
                <p className="text-xs text-muted-foreground">units needed</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3 italic">"{request.reason}"</p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Posted {formatTime(request.postedAt)}
              </span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-xs">
                  <Share2 className="h-3 w-3 mr-1" />
                  Share
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  <Phone className="h-3 w-3 mr-1" />
                  Call
                </Button>
                <Button size="sm" className="bg-emergency hover:bg-emergency/90 text-emergency-foreground text-xs">
                  <Heart className="h-3 w-3 mr-1" />
                  Donate Now
                </Button>
              </div>
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full bg-transparent">
          View All Requests
        </Button>
      </CardContent>
    </Card>
  )
}
