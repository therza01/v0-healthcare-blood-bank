# Damu Salama - Healthcare Blood Bank Management System

A professional blood bank management system built for Kenya, featuring real-time blood inventory tracking, hospital coordination, donor management, and rider logistics.

## Features

- **Multi-Role Authentication**: Hospital admins, donors, and riders with role-specific dashboards
- **Real-Time Blood Inventory**: Live tracking of blood units across hospitals
- **Inter-Hospital Coordination**: Request and transfer blood between hospitals
- **Donor Management**: Schedule donations, track history, and eligibility
- **Rider Network**: Coordinate blood deliveries with verified riders
- **African-Inspired Design**: Professional UI with authentic Kenyan cultural elements

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Database**: Neon (PostgreSQL Serverless)
- **Authentication**: Custom session-based auth with secure password hashing
- **Language**: TypeScript

## Prerequisites

- Node.js 18+ or pnpm/npm/yarn
- Neon PostgreSQL database account

## Getting Started

### 1. Clone and Install Dependencies

\`\`\`bash
git clone <repository-url>
cd damu-salama
pnpm install
# or
npm install
\`\`\`

### 2. Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
# Neon PostgreSQL Connection
DATABASE_URL=postgresql://<user>:<password>@<host>/<database>?sslmode=require

# Optional: Individual connection parameters
POSTGRES_URL=postgresql://<user>:<password>@<host>/<database>?sslmode=require
POSTGRES_USER=<your-db-user>
POSTGRES_PASSWORD=<your-db-password>
POSTGRES_HOST=<your-db-host>
POSTGRES_DATABASE=<your-db-name>

# Password hashing salt (generate a random string)
PASSWORD_SALT=your-random-salt-string-here
\`\`\`

### 3. Set Up the Database

Run the SQL schema to create all necessary tables:

\`\`\`bash
# Option 1: Using Neon Console
# Copy the contents of scripts/001-create-tables.sql and run in Neon SQL Editor

# Option 2: Using psql
psql $DATABASE_URL -f scripts/001-create-tables.sql
\`\`\`

### 4. Run the Development Server

\`\`\`bash
pnpm dev
# or
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/
│   ├── actions/
│   │   └── auth.ts          # Server actions for authentication
│   ├── dashboard/
│   │   └── page.tsx         # Role-specific dashboard
│   ├── globals.css          # Global styles + Tailwind config
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/
│   ├── auth/                # Authentication forms
│   │   ├── auth-modal.tsx
│   │   ├── hospital-auth-form.tsx
│   │   ├── donor-auth-form.tsx
│   │   └── rider-auth-form.tsx
│   ├── dashboard/           # Dashboard components
│   │   └── dashboard-content.tsx
│   ├── public/              # Public-facing components
│   │   ├── blood-inventory-overview.tsx
│   │   ├── hospital-map.tsx
│   │   ├── live-blood-feed.tsx
│   │   └── urgent-requests.tsx
│   ├── ui/                  # shadcn/ui components
│   └── ...                  # Other landing page components
├── lib/
│   ├── auth.ts              # Authentication utilities
│   ├── db.ts                # Database connection
│   └── utils.ts             # Utility functions
├── scripts/
│   └── 001-create-tables.sql # Database schema
└── public/                  # Static assets
\`\`\`

## Database Schema

The system uses the following main tables:

| Table | Description |
|-------|-------------|
| `users` | Base authentication table for all user types |
| `hospitals` | Hospital profiles and verification status |
| `donors` | Donor profiles, blood types, and donation history |
| `riders` | Rider profiles, vehicles, and delivery stats |
| `sessions` | User authentication sessions |
| `blood_inventory` | Blood stock levels per hospital |
| `blood_requests` | Inter-hospital blood transfer requests |
| `donation_appointments` | Scheduled donation appointments |

## User Roles

### Hospital Admin
- Manage blood inventory
- Request blood from other hospitals
- Schedule donation appointments
- View real-time network activity

### Donor
- Register with blood type
- Schedule donation appointments
- Track donation history
- View nearby urgent requests

### Rider
- Accept delivery jobs
- Track earnings and stats
- Update availability status
- Complete deliveries with confirmation

## API Routes / Server Actions

All authentication is handled via Next.js Server Actions in `app/actions/auth.ts`:

- `registerHospital(formData)` - Register a new hospital
- `registerDonor(formData)` - Register a new donor
- `registerRider(formData)` - Register a new rider
- `loginUser(formData)` - Authenticate any user type

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Ensure these are set in your Vercel project:

- `DATABASE_URL` - Neon connection string
- `PASSWORD_SALT` - Secure random string for password hashing

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@damusala.ma or open an issue on GitHub.

---

Built with love in Kenya for Kenya's healthcare system.
