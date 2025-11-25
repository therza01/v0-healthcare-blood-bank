"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Droplet,
  LogOut,
  Hospital,
  Heart,
  Truck,
  Activity,
  Users,
  Calendar,
  MapPin,
  Bell,
  Settings,
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

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="outline" onClick={handleLogout} disabled={isLoggingOut} className="gap-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
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
                  <Badge className="bg-green-500/10 text-green-600">Verified</Badge>
                ) : (
                  <Badge className="bg-yellow-500/10 text-yellow-600">Pending Verification</Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {user.role === "hospital" && (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blood Units</CardTitle>
                  <Droplet className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Total in inventory</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
                  <Activity className="h-4 w-4 text-emergency" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Pending blood requests</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Connected Hospitals</CardTitle>
                  <Hospital className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">In your network</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Donations</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Scheduled this week</p>
                </CardContent>
              </Card>
            </>
          )}

          {user.role === "donor" && (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blood Type</CardTitle>
                  <Droplet className="h-4 w-4 text-emergency" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(user.profile as { blood_type?: string })?.blood_type || "N/A"}
                  </div>
                  <p className="text-xs text-muted-foreground">Your blood type</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                  <Heart className="h-4 w-4 text-emergency" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(user.profile as { total_donations?: number })?.total_donations || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">Lives impacted</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Nearby Hospitals</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Accepting donations</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Eligible</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Now</div>
                  <p className="text-xs text-muted-foreground">You can donate today</p>
                </CardContent>
              </Card>
            </>
          )}

          {user.role === "rider" && (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Status</CardTitle>
                  <Activity className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">Available</div>
                  <p className="text-xs text-muted-foreground">Ready for deliveries</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
                  <Truck className="h-4 w-4 text-sunset" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(user.profile as { total_deliveries?: number })?.total_deliveries || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">Completed successfully</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rating</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(user.profile as { rating?: number })?.rating || 5.0}/5</div>
                  <p className="text-xs text-muted-foreground">Average rating</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Vehicle</CardTitle>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold capitalize">
                    {(user.profile as { vehicle_type?: string })?.vehicle_type || "N/A"}
                  </div>
                  <p className="text-xs text-muted-foreground">Registered vehicle</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Main Dashboard Area */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Activity className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="font-medium text-foreground">No recent activity</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your activity will appear here once you start using the platform
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks for your role</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {user.role === "hospital" && (
                <>
                  <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <Droplet className="h-4 w-4" />
                    Update Inventory
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <Activity className="h-4 w-4" />
                    Request Blood
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <Calendar className="h-4 w-4" />
                    Schedule Donation Drive
                  </Button>
                </>
              )}
              {user.role === "donor" && (
                <>
                  <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <Calendar className="h-4 w-4" />
                    Book Appointment
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <MapPin className="h-4 w-4" />
                    Find Nearby Hospital
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <Heart className="h-4 w-4" />
                    View Donation History
                  </Button>
                </>
              )}
              {user.role === "rider" && (
                <>
                  <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <Activity className="h-4 w-4" />
                    View Available Jobs
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <MapPin className="h-4 w-4" />
                    Update Location
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <Truck className="h-4 w-4" />
                    Delivery History
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
