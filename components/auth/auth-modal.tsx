"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HospitalAuthForm } from "./hospital-auth-form"
import { DonorAuthForm } from "./donor-auth-form"
import { RiderAuthForm } from "./rider-auth-form"
import { Hospital, Heart, Truck, Droplet } from "lucide-react"

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialType: "login" | "signup"
  initialRole: string
}

export function AuthModal({ open, onOpenChange, initialType, initialRole }: AuthModalProps) {
  const [authType, setAuthType] = useState<"login" | "signup">(initialType)
  const [role, setRole] = useState(initialRole)

  const roles = [
    { id: "hospital", label: "Hospital", icon: Hospital },
    { id: "donor", label: "Donor", icon: Heart },
    { id: "rider", label: "Rider", icon: Truck },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <Droplet className="h-6 w-6 text-primary-foreground" fill="currentColor" />
          </div>
          <DialogTitle className="font-serif text-2xl">
            {authType === "login" ? "Welcome Back" : "Join Damu Salama"}
          </DialogTitle>
        </DialogHeader>

        {/* Auth Type Toggle */}
        <div className="flex rounded-lg bg-muted p-1">
          <button
            onClick={() => setAuthType("login")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              authType === "login"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthType("signup")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              authType === "signup"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Role Tabs */}
        <Tabs value={role} onValueChange={setRole} className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            {roles.map((r) => (
              <TabsTrigger key={r.id} value={r.id} className="gap-2">
                <r.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{r.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="hospital" className="mt-6">
            <HospitalAuthForm type={authType} onSuccess={() => onOpenChange(false)} />
          </TabsContent>

          <TabsContent value="donor" className="mt-6">
            <DonorAuthForm type={authType} onSuccess={() => onOpenChange(false)} />
          </TabsContent>

          <TabsContent value="rider" className="mt-6">
            <RiderAuthForm type={authType} onSuccess={() => onOpenChange(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
