"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Droplet } from "lucide-react"

interface HeaderProps {
  onAuthClick: (type: "login" | "signup", role: string) => void
}

export function Header({ onAuthClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Networks", href: "#networks" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Droplet className="h-6 w-6 text-primary-foreground" fill="currentColor" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold text-foreground">Damu Salama</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Kenya Blood Network</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" onClick={() => onAuthClick("login", "hospital")} className="font-medium">
            Sign In
          </Button>
          <Button
            onClick={() => onAuthClick("signup", "hospital")}
            className="bg-primary font-medium text-primary-foreground hover:bg-primary/90"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs">
            <div className="flex flex-col gap-6 pt-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    onAuthClick("login", "hospital")
                    setIsOpen(false)
                  }}
                >
                  Sign In
                </Button>
                <Button
                  className="w-full bg-primary text-primary-foreground"
                  onClick={() => {
                    onAuthClick("signup", "hospital")
                    setIsOpen(false)
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
