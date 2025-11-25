"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { registerDonor, login } from "@/app/actions/auth"

interface DonorAuthFormProps {
  type: "login" | "signup"
  onSuccess: () => void
}

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export function DonorAuthForm({ type, onSuccess }: DonorAuthFormProps) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [bloodType, setBloodType] = useState("")
  const [county, setCounty] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    const formData = new FormData(e.currentTarget)

    if (type === "signup") {
      formData.set("bloodType", bloodType)
      formData.set("county", county)
    }

    try {
      let result
      if (type === "signup") {
        result = await registerDonor(formData)
      } else {
        result = await login(formData)
      }

      if (result.success) {
        setSuccess(type === "signup" ? "Welcome to Damu Salama!" : "Login successful!")
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
              <Input id="firstName" name="firstName" placeholder="John" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" placeholder="Kamau" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bloodType">Blood Type</Label>
              <Select value={bloodType} onValueChange={setBloodType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {bloodTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" placeholder="0712 345 678" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="county">County</Label>
            <Select value={county} onValueChange={setCounty} required>
              <SelectTrigger>
                <SelectValue placeholder="Select your county" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nairobi">Nairobi</SelectItem>
                <SelectItem value="mombasa">Mombasa</SelectItem>
                <SelectItem value="kisumu">Kisumu</SelectItem>
                <SelectItem value="nakuru">Nakuru</SelectItem>
                <SelectItem value="eldoret">Uasin Gishu</SelectItem>
                <SelectItem value="kiambu">Kiambu</SelectItem>
                <SelectItem value="machakos">Machakos</SelectItem>
                <SelectItem value="nyeri">Nyeri</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" name="email" type="email" placeholder="john@email.com" required />
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

      <Button type="submit" className="w-full bg-emergency text-white hover:bg-emergency/90" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {type === "login" ? "Signing in..." : "Creating account..."}
          </>
        ) : type === "login" ? (
          "Sign In"
        ) : (
          "Become a Donor"
        )}
      </Button>

      {type === "signup" && (
        <p className="text-center text-xs text-muted-foreground">
          Must be 18+ years old and meet health eligibility requirements.
        </p>
      )}
    </form>
  )
}
