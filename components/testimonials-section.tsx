"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"
import { AdinkraSymbol } from "./ui/adinkra-symbol"

const testimonials = [
  {
    quote:
      "Damu Salama has revolutionized how we manage our blood bank. The real-time tracking and inter-hospital coordination has saved countless lives.",
    author: "Dr. Wanjiku Muthoni",
    role: "Medical Director",
    organization: "Kenyatta National Hospital",
    avatar: "/african-doctor-woman-professional.jpg",
    rating: 5,
  },
  {
    quote:
      "As a regular donor, the app makes it so easy to find donation centers and track my contributions. I feel like a real hero in my community!",
    author: "James Ochieng",
    role: "Blood Donor",
    organization: "Nairobi, Kenya",
    avatar: "/african-man-smiling-professional.jpg",
    rating: 5,
  },
  {
    quote:
      "The delivery tracking system is excellent. I can ensure blood units reach hospitals safely and on time. The earnings are great too!",
    author: "Faith Akinyi",
    role: "Delivery Partner",
    organization: "Rider Network",
    avatar: "/african-woman-delivery-rider-professional.jpg",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <AdinkraSymbol symbol="sankofa" size={20} className="text-primary" />
            <span className="text-sm font-medium uppercase tracking-wider text-primary">Testimonials</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Voices from Our Community
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Hear from the hospitals, donors, and riders who make our network strong.
          </p>
        </div>

        {/* African Pattern Divider */}
        <div className="african-divider mx-auto mt-8 max-w-xs" />

        {/* Testimonials Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden border-border/50 bg-card">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-primary/20 mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-card-foreground leading-relaxed mb-6">"{testimonial.quote}"</p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-border">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-card-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.organization}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
