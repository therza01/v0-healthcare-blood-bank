"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Droplet,
  LogOut,
  Hospital,
  Heart,
  Truck,
  Activity,
  Calendar,
  MapPin,
  Bell,
  Settings,
  MessageSquare,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Package,
  Star,
  Phone,
  QrCode,
  Share2,
} from "lucide-react"
import { logout } from "@/app/actions/auth"

interface DashboardContentProps {
  user: {
    id: number
    email: string
    role: string
    is_verified: boolean
    profile: Record<string, unknown> | null
  }
}

export function DashboardContent({ user }: DashboardContentProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await logout()
  }

  const getRoleIcon = () => {
    switch (user.role) {
      case "hospital":
        return <Hospital className="h-5 w-5" />
      case "donor":
        return <Heart className="h-5 w-5" />
      case "rider":
        return <Truck className="h-5 w-5" />
      default:
        return <Activity className="h-5 w-5" />
    }
  }

  const getRoleColor = () => {
    switch (user.role) {
      case "hospital":
        return "bg-primary"
      case "donor":
        return "bg-emergency"
      case "rider":
        return "bg-sunset"
      default:
        return "bg-muted"
    }
  }

  const getWelcomeMessage = () => {
    if (user.role === "hospital" && user.profile) {
      return (user.profile as { name?: string }).name || "Hospital Admin"
    }
    if ((user.role === "donor" || user.role === "rider") && user.profile) {
      const profile = user.profile as { first_name?: string; last_name?: string }
      return `${profile.first_name || ""} ${profile.last_name || ""}`.trim() || user.email
    }
    return user.email
  }

  const HospitalDashboard = () => (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="inventory">Inventory</TabsTrigger>
        <TabsTrigger value="requests">Requests</TabsTrigger>
        <TabsTrigger value="network">Network</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Blood Units</CardTitle>
              <Droplet className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <div className="flex items-center gap-1 text-xs text-success">
                <TrendingUp className="h-3 w-3" />
                +12% from last week
              </div>
            </CardContent>
          </Card>
          <Card className="border-emergency/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Levels</CardTitle>
              <AlertTriangle className="h-4 w-4 text-emergency" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emergency">2</div>
              <p className="text-xs text-muted-foreground">O- and AB- need attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Activity className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">3 urgent, 5 standard</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled Donations</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Activity */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Live Activity Feed
              </CardTitle>
              <CardDescription>Real-time updates from your network</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  action: "Blood received",
                  detail: "5 units O+ from Aga Khan Hospital",
                  time: "2 min ago",
                  icon: CheckCircle,
                  color: "text-success",
                },
                {
                  action: "Urgent request",
                  detail: "2 units AB- needed - Surgery scheduled",
                  time: "15 min ago",
                  icon: AlertTriangle,
                  color: "text-emergency",
                },
                {
                  action: "Donation completed",
                  detail: "John Kamau donated 1 unit A+",
                  time: "1 hour ago",
                  icon: Heart,
                  color: "text-primary",
                },
                {
                  action: "Transfer sent",
                  detail: "3 units B+ to Nairobi Hospital",
                  time: "2 hours ago",
                  icon: Package,
                  color: "text-sunset",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <item.icon className={`h-5 w-5 ${item.color} mt-0.5`} />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.action}</p>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common hospital tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gap-2">
                <AlertTriangle className="h-4 w-4" />
                Create Urgent Request
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <Droplet className="h-4 w-4" />
                Update Inventory
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <QrCode className="h-4 w-4" />
                Scan Blood Unit
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <MessageSquare className="h-4 w-4" />
                Inter-Hospital Chat
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <Calendar className="h-4 w-4" />
                Schedule Donation Drive
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="inventory" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Blood Inventory Management</CardTitle>
            <CardDescription>Current stock levels by blood type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { type: "O+", units: 28, capacity: 40, expiring: 3 },
                { type: "O-", units: 8, capacity: 25, expiring: 1 },
                { type: "A+", units: 32, capacity: 35, expiring: 5 },
                { type: "A-", units: 12, capacity: 20, expiring: 2 },
                { type: "B+", units: 18, capacity: 25, expiring: 4 },
                { type: "B-", units: 6, capacity: 15, expiring: 0 },
                { type: "AB+", units: 14, capacity: 20, expiring: 2 },
                { type: "AB-", units: 3, capacity: 10, expiring: 1 },
              ].map((item) => {
                const percentage = (item.units / item.capacity) * 100
                const isLow = percentage <= 30
                const isCritical = percentage <= 15

                return (
                  <Card
                    key={item.type}
                    className={`p-4 ${isCritical ? "border-emergency/50 bg-emergency/5" : isLow ? "border-warning/50 bg-warning/5" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold font-mono">{item.type}</span>
                      {isCritical ? (
                        <AlertTriangle className="h-4 w-4 text-emergency" />
                      ) : isLow ? (
                        <AlertTriangle className="h-4 w-4 text-warning" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-success" />
                      )}
                    </div>
                    <p className="text-3xl font-bold">{item.units}</p>
                    <p className="text-xs text-muted-foreground mb-2">of {item.capacity} capacity</p>
                    <Progress
                      value={percentage}
                      className={`h-2 ${isCritical ? "bg-emergency/20" : isLow ? "bg-warning/20" : ""}`}
                    />
                    {item.expiring > 0 && (
                      <p className="text-xs text-warning mt-2 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.expiring} expiring soon
                      </p>
                    )}
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="requests">
        <Card>
          <CardHeader>
            <CardTitle>Blood Requests</CardTitle>
            <CardDescription>Manage incoming and outgoing requests</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">Request management coming soon</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="network">
        <Card>
          <CardHeader>
            <CardTitle>Hospital Network</CardTitle>
            <CardDescription>Connected hospitals and partnerships</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">Network management coming soon</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )

  const DonorDashboard = () => (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-emergency/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blood Type</CardTitle>
            <Droplet className="h-4 w-4 text-emergency" fill="currentColor" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">
              {(user.profile as { blood_type?: string })?.blood_type || "A+"}
            </div>
            <p className="text-xs text-muted-foreground">Universal compatibility: 40%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <Heart className="h-4 w-4 text-emergency" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(user.profile as { total_donations?: number })?.total_donations || 12}
            </div>
            <p className="text-xs text-muted-foreground">~36 lives saved</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Donor Level</CardTitle>
            <Star className="h-4 w-4 text-savanna" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-savanna">Gold</div>
            <p className="text-xs text-muted-foreground">3 more to Platinum</p>
          </CardContent>
        </Card>
        <Card className="border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Eligible</CardTitle>
            <Calendar className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">Now</div>
            <p className="text-xs text-muted-foreground">You can donate today!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Urgent Needs */}
        <Card className="lg:col-span-2 border-emergency/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emergency">
              <AlertTriangle className="h-5 w-5" />
              Urgent Needs Near You
            </CardTitle>
            <CardDescription>Hospitals that need your blood type right now</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { hospital: "Kenyatta National Hospital", distance: "2.3 km", units: 3, urgency: "critical" },
              { hospital: "Nairobi Hospital", distance: "4.1 km", units: 2, urgency: "high" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border border-emergency/20 bg-emergency/5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emergency/10">
                    <Hospital className="h-5 w-5 text-emergency" />
                  </div>
                  <div>
                    <p className="font-medium">{item.hospital}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {item.distance} away
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={item.urgency === "critical" ? "bg-emergency animate-pulse" : "bg-warning"}>
                    {item.units} units needed
                  </Badge>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Phone className="h-3 w-3" />
                    </Button>
                    <Button size="sm" className="bg-emergency hover:bg-emergency/90">
                      Donate
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start gap-2 bg-emergency hover:bg-emergency/90">
              <Calendar className="h-4 w-4" />
              Book Donation Appointment
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
              <MapPin className="h-4 w-4" />
              Find Nearby Hospital
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
              <Heart className="h-4 w-4" />
              Donation History
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
              <Share2 className="h-4 w-4" />
              Invite Friends
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
              <QrCode className="h-4 w-4" />
              My Donor Card
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Your Impact Journey</CardTitle>
          <CardDescription>Track your donation milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            {["Bronze", "Silver", "Gold", "Platinum", "Diamond"].map((level, index) => {
              const isAchieved = index < 3
              const isCurrent = index === 2
              return (
                <div key={level} className="flex-1 text-center">
                  <div
                    className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center border-2 ${
                      isAchieved ? "bg-primary/10 border-primary" : "bg-muted border-border"
                    } ${isCurrent ? "ring-2 ring-primary ring-offset-2" : ""}`}
                  >
                    <Star
                      className={`h-6 w-6 ${isAchieved ? "text-primary" : "text-muted-foreground"}`}
                      fill={isAchieved ? "currentColor" : "none"}
                    />
                  </div>
                  <p className={`text-xs mt-2 font-medium ${isAchieved ? "text-foreground" : "text-muted-foreground"}`}>
                    {level}
                  </p>
                  <p className="text-xs text-muted-foreground">{(index + 1) * 5} donations</p>
                </div>
              )
            })}
          </div>
          <Progress value={60} className="mt-4" />
          <p className="text-xs text-muted-foreground mt-2 text-center">12 of 15 donations to reach Platinum level</p>
        </CardContent>
      </Card>
    </div>
  )

  const RiderDashboard = () => (
    <div className="space-y-6">
      {/* Status Toggle */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
                <Activity className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Status</p>
                <p className="text-xl font-bold text-success">Available for Deliveries</p>
              </div>
            </div>
            <Button variant="outline" className="bg-transparent">
              Go Offline
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Deliveries</CardTitle>
            <Package className="h-4 w-4 text-sunset" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">KES 1,500 earned</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
            <Truck className="h-4 w-4 text-sunset" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(user.profile as { total_deliveries?: number })?.total_deliveries || 247}
            </div>
            <p className="text-xs text-muted-foreground">Lifetime deliveries</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="h-4 w-4 text-savanna" fill="currentColor" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(user.profile as { rating?: number })?.rating || 4.9}/5</div>
            <p className="text-xs text-muted-foreground">Based on 234 reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3 min</div>
            <p className="text-xs text-muted-foreground">Average acceptance</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Available Jobs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-sunset" />
              Available Deliveries
            </CardTitle>
            <CardDescription>Blood transport requests near you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                from: "Kenyatta National Hospital",
                to: "Aga Khan Hospital",
                distance: "8.5 km",
                reward: 450,
                urgent: true,
                bloodType: "O-",
                units: 2,
              },
              {
                from: "Nairobi Hospital",
                to: "MP Shah Hospital",
                distance: "5.2 km",
                reward: 300,
                urgent: false,
                bloodType: "A+",
                units: 3,
              },
              {
                from: "Mater Hospital",
                to: "Karen Hospital",
                distance: "12.1 km",
                reward: 600,
                urgent: false,
                bloodType: "B+",
                units: 1,
              },
            ].map((job, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${job.urgent ? "border-emergency/30 bg-emergency/5" : "border-border"}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    {job.urgent && (
                      <Badge className="bg-emergency text-emergency-foreground mb-2 animate-pulse">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        URGENT
                      </Badge>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Hospital className="h-4 w-4 text-primary" />
                      <span className="font-medium">{job.from}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm mt-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{job.to}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="font-mono font-bold mb-1">
                      {job.bloodType}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{job.units} units</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {job.distance}
                    </span>
                    <span className="font-semibold text-foreground">KES {job.reward}</span>
                  </div>
                  <Button size="sm" className={job.urgent ? "bg-emergency hover:bg-emergency/90" : ""}>
                    Accept Job
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
              <MapPin className="h-4 w-4" />
              Update Location
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
              <Truck className="h-4 w-4" />
              Delivery History
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
              <QrCode className="h-4 w-4" />
              Scan Blood Unit
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
              <Phone className="h-4 w-4" />
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Droplet className="h-6 w-6 text-primary-foreground" fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-foreground">Damu Salama</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emergency text-[10px] text-emergency-foreground">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="gap-2 bg-transparent ml-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">{isLoggingOut ? "Logging out..." : "Logout"}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${getRoleColor()} text-white`}>
              {getRoleIcon()}
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-foreground">Karibu, {getWelcomeMessage()}!</h1>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  {user.role}
                </Badge>
                {user.is_verified ? (
                  <Badge className="bg-success/10 text-success border-0">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <Badge className="bg-warning/10 text-warning border-0">
                    <Clock className="h-3 w-3 mr-1" />
                    Pending Verification
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Role-specific Dashboard */}
        {user.role === "hospital" && <HospitalDashboard />}
        {user.role === "donor" && <DonorDashboard />}
        {user.role === "rider" && <RiderDashboard />}
      </main>
    </div>
  )
}
