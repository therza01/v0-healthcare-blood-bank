"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Upload, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { registerRider, login } from "@/app/actions/auth"

interface RiderAuthFormProps {
  type: "login" | "signup"
  onSuccess: () => void
}

export function RiderAuthForm({ type, onSuccess }: RiderAuthFormProps) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [fileName, setFileName] = useState("")
  const [vehicleType, setVehicleType] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    const formData = new FormData(e.currentTarget)

    if (type === "signup") {
      formData.set("vehicleType", vehicleType)
    }

    try {
      let result
      if (type === "signup") {
        result = await registerRider(formData)
      } else {
        result = await login(formData)
      }

      if (result.success) {
        setSuccess(type === "signup" ? "Welcome to the Rider Network!" : "Login successful!")
        setTimeout(() => {
          onSuccess()
          router.push("/dashboard")
          router.refresh()
        }, 1000)
      } else {
        setError(result.error || "An error occurred")
      }
    } catch {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 rounded-lg bg-green-500/10 p-3 text-sm text-green-600">
          <CheckCircle className="h-4 w-4" />
          {success}
        </div>
      )}

      {type === "signup" && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" placeholder="James" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" placeholder="Ochieng" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" placeholder="0712 345 678" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select value={vehicleType} onValueChange={setVehicleType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="motorcycle">Motorcycle</SelectItem>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="licenseNumber">Driving License No.</Label>
            <Input id="licenseNumber" name="licenseNumber" placeholder="DL-XXXXXXXX" required />
          </div>

          <div className="space-y-2">
            <Label>Upload License Photo</Label>
            <div className="relative">
              <input
                type="file"
                id="riderDocs"
                name="riderDocs"
                className="sr-only"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
              />
              <Label
                htmlFor="riderDocs"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 px-4 py-4 transition-colors hover:border-primary/50 hover:bg-muted/50"
              >
                <Upload className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{fileName || "Upload driving license"}</span>
              </Label>
            </div>
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" name="email" type="email" placeholder="rider@email.com" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
            minLength={6}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <Button type="submit" className="w-full bg-sunset text-white hover:bg-sunset/90" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {type === "login" ? "Signing in..." : "Creating account..."}
          </>
        ) : type === "login" ? (
          "Sign In"
        ) : (
          "Join Rider Network"
        )}
      </Button>

      {type === "signup" && (
        <p className="text-center text-xs text-muted-foreground">
          Must have valid driving license. Background check required.
        </p>
      )}
    </form>
  )
}
