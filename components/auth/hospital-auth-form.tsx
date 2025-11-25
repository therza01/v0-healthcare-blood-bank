"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Upload, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { registerHospital, login } from "@/app/actions/auth"

interface HospitalAuthFormProps {
  type: "login" | "signup"
  onSuccess: () => void
}

export function HospitalAuthForm({ type, onSuccess }: HospitalAuthFormProps) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [fileName, setFileName] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    const formData = new FormData(e.currentTarget)

    try {
      let result
      if (type === "signup") {
        result = await registerHospital(formData)
      } else {
        result = await login(formData)
      }

      if (result.success) {
        setSuccess(type === "signup" ? "Account created successfully!" : "Login successful!")
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
          <div className="space-y-2">
            <Label htmlFor="hospitalName">Hospital Name</Label>
            <Input id="hospitalName" name="hospitalName" placeholder="Kenyatta National Hospital" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hospitalUID">Hospital UID</Label>
              <Input id="hospitalUID" name="hospitalUID" placeholder="KNH-001" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">License No.</Label>
              <Input id="licenseNumber" name="licenseNumber" placeholder="MOH/2024/XXX" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="registrationNumber">Registration Number</Label>
            <Input id="registrationNumber" name="registrationNumber" placeholder="REG-2024-XXXXX" required />
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" name="email" type="email" placeholder="admin@hospital.co.ke" required />
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

      {type === "signup" && (
        <div className="space-y-2">
          <Label>Verification Documents</Label>
          <div className="relative">
            <input
              type="file"
              id="documents"
              name="documents"
              className="sr-only"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
            />
            <Label
              htmlFor="documents"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 px-4 py-6 transition-colors hover:border-primary/50 hover:bg-muted/50"
            >
              <Upload className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {fileName || "Upload MOH License & Registration Certificate"}
              </span>
            </Label>
          </div>
          <p className="text-xs text-muted-foreground">PDF, JPG or PNG up to 10MB</p>
        </div>
      )}

      <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {type === "login" ? "Signing in..." : "Creating account..."}
          </>
        ) : type === "login" ? (
          "Sign In"
        ) : (
          "Create Hospital Account"
        )}
      </Button>

      {type === "signup" && (
        <p className="text-center text-xs text-muted-foreground">
          By signing up, you agree to our Terms of Service and Privacy Policy. Verification may take 24-48 hours.
        </p>
      )}
    </form>
  )
}
