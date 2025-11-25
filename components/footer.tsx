import Link from "next/link"
import { Droplet, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { AdinkraSymbol } from "./ui/adinkra-symbol"

export function Footer() {
  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "API Docs", href: "#docs" },
      { label: "Integrations", href: "#integrations" },
    ],
    company: [
      { label: "About Us", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Blog", href: "#blog" },
      { label: "Press", href: "#press" },
    ],
    resources: [
      { label: "Help Center", href: "#help" },
      { label: "Contact", href: "#contact" },
      { label: "Training", href: "#training" },
      { label: "Community", href: "#community" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Cookie Policy", href: "#cookies" },
      { label: "Compliance", href: "#compliance" },
    ],
  }

  return (
    <footer id="contact" className="border-t border-border bg-secondary/30">
      {/* African Pattern Divider */}
      <div className="african-divider" />

      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Droplet className="h-6 w-6 text-primary-foreground" fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-foreground">Damu Salama</span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Kenya Blood Network</span>
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-muted-foreground leading-relaxed">
              Connecting hospitals, donors, and riders across Kenya to ensure no patient ever waits for blood.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a
                href="mailto:info@damusala.ma"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                info@damusala.ma
              </a>
              <a
                href="tel:+254700000000"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                +254 700 000 000
              </a>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Nairobi, Kenya
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Damu Salama. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <AdinkraSymbol symbol="gye-nyame" size={20} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Built with ❤️ in Kenya</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
