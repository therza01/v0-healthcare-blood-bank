# Damu Salama API Documentation

## Authentication

All authentication is handled via Next.js Server Actions.

### Register Hospital

\`\`\`typescript
import { registerHospital } from '@/app/actions/auth'

const formData = new FormData()
formData.append('hospitalName', 'Kenyatta National Hospital')
formData.append('hospitalUid', 'KNH-001')
formData.append('licenseNumber', 'MED-2024-001')
formData.append('registrationNumber', 'REG-2024-001')
formData.append('email', 'admin@knh.co.ke')
formData.append('password', 'securepassword')
formData.append('county', 'Nairobi')

const result = await registerHospital(formData)
// Returns: { success: true, userId: 1 } or { success: false, error: '...' }
\`\`\`

### Register Donor

\`\`\`typescript
import { registerDonor } from '@/app/actions/auth'

const formData = new FormData()
formData.append('firstName', 'John')
formData.append('lastName', 'Doe')
formData.append('email', 'john@example.com')
formData.append('password', 'securepassword')
formData.append('phone', '+254712345678')
formData.append('bloodType', 'O+')
formData.append('county', 'Nairobi')

const result = await registerDonor(formData)
\`\`\`

### Register Rider

\`\`\`typescript
import { registerRider } from '@/app/actions/auth'

const formData = new FormData()
formData.append('firstName', 'Jane')
formData.append('lastName', 'Doe')
formData.append('email', 'jane@example.com')
formData.append('password', 'securepassword')
formData.append('phone', '+254712345678')
formData.append('vehicleType', 'motorcycle')
formData.append('licenseNumber', 'DL-2024-001')
formData.append('county', 'Nairobi')

const result = await registerRider(formData)
\`\`\`

### Login

\`\`\`typescript
import { loginUser } from '@/app/actions/auth'

const formData = new FormData()
formData.append('email', 'user@example.com')
formData.append('password', 'securepassword')

const result = await loginUser(formData)
// Returns: { success: true, user: {...}, role: 'donor' }
\`\`\`

## Database Queries

### Using the Database Client

\`\`\`typescript
import { sql, queryRow, queryRows } from '@/lib/db'

// Tagged template literal (returns array directly)
const users = await sql`SELECT * FROM users WHERE role = 'donor'`

// Parameterized query (returns { rows: [...] })
const result = await queryRow(
  'SELECT * FROM users WHERE email = $1',
  [email]
)

// Multiple rows
const donors = await queryRows(
  'SELECT * FROM donors WHERE county = $1',
  [county]
)
\`\`\`

## Session Management

\`\`\`typescript
import { createSession, getSession, deleteSession } from '@/lib/auth'

// Create session after login
const token = await createSession(userId)

// Get current session
const session = await getSession()
// Returns: { userId, role, ... } or null

// Delete session (logout)
await deleteSession()
\`\`\`

## Blood Types

Supported blood types:
- `A+`, `A-`
- `B+`, `B-`
- `AB+`, `AB-`
- `O+`, `O-`

## User Roles

- `hospital` - Hospital administrators
- `donor` - Blood donors
- `rider` - Delivery riders
- `admin` - System administrators

## Status Values

### Hospital Verification
- `pending` - Awaiting verification
- `approved` - Verified and active
- `rejected` - Verification rejected

### Blood Request Status
- `pending` - Request submitted
- `approved` - Request approved
- `in_transit` - Blood en route
- `delivered` - Delivery complete
- `cancelled` - Request cancelled

### Urgency Levels
- `normal` - Standard request
- `urgent` - Needs attention
- `critical` - Emergency
