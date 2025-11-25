interface AdinkraSymbolProps {
  symbol: "gye-nyame" | "sankofa" | "mpatapo" | "adinkrahene"
  className?: string
  size?: number
}

export function AdinkraSymbol({ symbol, className = "", size = 24 }: AdinkraSymbolProps) {
  const symbols = {
    // Gye Nyame - "Except God" - Symbol of God's omnipotence
    "gye-nyame": (
      <svg viewBox="0 0 100 100" fill="currentColor" className={className} width={size} height={size}>
        <path d="M50 10c-22 0-40 18-40 40s18 40 40 40 40-18 40-40-18-40-40-40zm0 70c-16.5 0-30-13.5-30-30s13.5-30 30-30 30 13.5 30 30-13.5 30-30 30z" />
        <path d="M50 25c-13.8 0-25 11.2-25 25s11.2 25 25 25 25-11.2 25-25-11.2-25-25-25zm0 40c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.7 15-15 15z" />
        <circle cx="50" cy="50" r="8" />
      </svg>
    ),
    // Sankofa - "Go back and get it" - Learning from the past
    sankofa: (
      <svg viewBox="0 0 100 100" fill="currentColor" className={className} width={size} height={size}>
        <path d="M70 30c-11 0-20 9-20 20v25c0 2.8-2.2 5-5 5s-5-2.2-5-5V50c0-16.5 13.5-30 30-30 8.3 0 15 6.7 15 15s-6.7 15-15 15c-5.5 0-10-4.5-10-10s4.5-10 10-10c2.8 0 5 2.2 5 5s-2.2 5-5 5z" />
      </svg>
    ),
    // Mpatapo - "Knot of reconciliation" - Symbol of peace and unity
    mpatapo: (
      <svg viewBox="0 0 100 100" fill="currentColor" className={className} width={size} height={size}>
        <path d="M50 15L15 50l35 35 35-35-35-35zm0 15l20 20-20 20-20-20 20-20z" />
        <rect x="45" y="45" width="10" height="10" />
      </svg>
    ),
    // Adinkrahene - "Chief of adinkra symbols" - Leadership and greatness
    adinkrahene: (
      <svg viewBox="0 0 100 100" fill="currentColor" className={className} width={size} height={size}>
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="6" />
        <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="6" />
        <circle cx="50" cy="50" r="10" />
      </svg>
    ),
  }

  return symbols[symbol] || null
}
