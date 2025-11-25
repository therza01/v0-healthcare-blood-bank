"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Hospital, Phone, Clock, Search, Navigation, Droplet } from "lucide-react"

interface HospitalLocation {
  id: string
  name: string
  location: string
  county: string
  phone: string
  status: "online" | "offline"
  urgentNeeds: string[]
  distance?: string
}

const hospitals: HospitalLocation[] = [
  {
    id: "1",
    name: "Kenyatta National Hospital",
    location: "Hospital Road, Upper Hill",
    county: "Nairobi",
    phone: "+254 20 272 6300",
    status: "online",
    urgentNeeds: ["O-", "AB-"],
    distance: "2.3 km",
  },
  {
    id: "2",
    name: "Aga Khan University Hospital",
    location: "3rd Parklands Avenue",
    county: "Nairobi",
    phone: "+254 20 366 2000",
    status: "online",
    urgentNeeds: [],
    distance: "5.1 km",
  },
  {
    id: "3",
    name: "Nairobi Hospital",
    location: "Argwings Kodhek Road",
    county: "Nairobi",
    phone: "+254 20 284 5000",
    status: "online",
    urgentNeeds: ["B-"],
    distance: "3.8 km",
  },
  {
    id: "4",
    name: "Mater Misericordiae Hospital",
    location: "Dunga Road, South B",
    county: "Nairobi",
    phone: "+254 20 653 1199",
    status: "online",
    urgentNeeds: [],
    distance: "4.2 km",
  },
  {
    id: "5",
    name: "Coast General Hospital",
    location: "Moi Avenue",
    county: "Mombasa",
    phone: "+254 41 231 4202",
    status: "online",
    urgentNeeds: ["O-", "A-"],
    distance: "480 km",
  },
  {
    id: "6",
    name: "Jaramogi Oginga Odinga Teaching Hospital",
    location: "Kondele, Kisumu",
    county: "Kisumu",
    phone: "+254 57 202 0468",
    status: "online",
    urgentNeeds: [],
    distance: "342 km",
  },
]

export function HospitalMap() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null)

  const counties = [...new Set(hospitals.map((h) => h.county))]

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCounty = !selectedCounty || hospital.county === selectedCounty
    return matchesSearch && matchesCounty
  })

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Partner Hospitals</CardTitle>
            <p className="text-xs text-muted-foreground">Find donation centers near you</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filters */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search hospitals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background/50"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCounty === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCounty(null)}
              className={selectedCounty === null ? "" : "bg-transparent"}
            >
              All
            </Button>
            {counties.map((county) => (
              <Button
                key={county}
                variant={selectedCounty === county ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCounty(county)}
                className={selectedCounty === county ? "" : "bg-transparent"}
              >
                {county}
              </Button>
            ))}
          </div>
        </div>

        {/* Hospital List */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
          {filteredHospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="rounded-xl border border-border bg-background/50 p-4 transition-all hover:shadow-md hover:border-primary/30"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                    <Hospital className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{hospital.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" />
                      {hospital.location}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {hospital.phone}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {hospital.county}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <Badge
                    className={
                      hospital.status === "online"
                        ? "bg-success/10 text-success border-0"
                        : "bg-muted text-muted-foreground border-0"
                    }
                  >
                    {hospital.status === "online" ? "Online" : "Offline"}
                  </Badge>
                  {hospital.distance && (
                    <p className="text-xs text-muted-foreground mt-1 flex items-center justify-end gap-1">
                      <Navigation className="h-3 w-3" />
                      {hospital.distance}
                    </p>
                  )}
                </div>
              </div>

              {hospital.urgentNeeds.length > 0 && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-emergency/5 p-2 border border-emergency/20">
                  <Droplet className="h-4 w-4 text-emergency" />
                  <span className="text-xs text-emergency font-medium">Urgent need:</span>
                  <div className="flex gap-1">
                    {hospital.urgentNeeds.map((type) => (
                      <Badge
                        key={type}
                        className="bg-emergency/10 text-emergency border-emergency/30 font-mono font-bold text-xs"
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent text-xs">
                  <Phone className="h-3 w-3 mr-1" />
                  Call
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent text-xs">
                  <Navigation className="h-3 w-3 mr-1" />
                  Directions
                </Button>
                <Button size="sm" className="flex-1 text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  Book Donation
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
