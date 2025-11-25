-- Damu Salama Blood Bank Database Schema
-- Healthcare Blood Bank Management System for Kenya

-- Users table (base table for all user types)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('hospital', 'donor', 'rider', 'admin')),
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Hospitals table
CREATE TABLE IF NOT EXISTS hospitals (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  uid VARCHAR(50) UNIQUE NOT NULL,
  license_number VARCHAR(100) NOT NULL,
  registration_number VARCHAR(100) NOT NULL,
  county VARCHAR(100),
  address TEXT,
  phone VARCHAR(20),
  verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  documents_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Donors table
CREATE TABLE IF NOT EXISTS donors (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  blood_type VARCHAR(5) NOT NULL CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  phone VARCHAR(20),
  county VARCHAR(100),
  date_of_birth DATE,
  last_donation_date DATE,
  total_donations INTEGER DEFAULT 0,
  is_eligible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Riders table
CREATE TABLE IF NOT EXISTS riders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  vehicle_type VARCHAR(20) NOT NULL CHECK (vehicle_type IN ('motorcycle', 'car', 'van')),
  license_number VARCHAR(100) NOT NULL,
  license_photo_url TEXT,
  county VARCHAR(100),
  is_available BOOLEAN DEFAULT TRUE,
  verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  total_deliveries INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 5.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sessions table for authentication
CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blood Inventory table
CREATE TABLE IF NOT EXISTS blood_inventory (
  id SERIAL PRIMARY KEY,
  hospital_id INTEGER REFERENCES hospitals(id) ON DELETE CASCADE,
  blood_type VARCHAR(5) NOT NULL CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  units_available INTEGER DEFAULT 0,
  units_reserved INTEGER DEFAULT 0,
  expiry_date DATE,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blood Requests table
CREATE TABLE IF NOT EXISTS blood_requests (
  id SERIAL PRIMARY KEY,
  requesting_hospital_id INTEGER REFERENCES hospitals(id) ON DELETE CASCADE,
  supplying_hospital_id INTEGER REFERENCES hospitals(id),
  blood_type VARCHAR(5) NOT NULL,
  units_requested INTEGER NOT NULL,
  urgency VARCHAR(20) DEFAULT 'normal' CHECK (urgency IN ('normal', 'urgent', 'critical')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'in_transit', 'delivered', 'cancelled')),
  rider_id INTEGER REFERENCES riders(id),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Donation appointments table
CREATE TABLE IF NOT EXISTS donation_appointments (
  id SERIAL PRIMARY KEY,
  donor_id INTEGER REFERENCES donors(id) ON DELETE CASCADE,
  hospital_id INTEGER REFERENCES hospitals(id) ON DELETE CASCADE,
  appointment_date TIMESTAMP NOT NULL,
  status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
  blood_type VARCHAR(5),
  units_donated INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_hospitals_county ON hospitals(county);
CREATE INDEX IF NOT EXISTS idx_donors_blood_type ON donors(blood_type);
CREATE INDEX IF NOT EXISTS idx_donors_county ON donors(county);
CREATE INDEX IF NOT EXISTS idx_riders_county ON riders(county);
CREATE INDEX IF NOT EXISTS idx_blood_inventory_hospital ON blood_inventory(hospital_id);
CREATE INDEX IF NOT EXISTS idx_blood_inventory_type ON blood_inventory(blood_type);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
