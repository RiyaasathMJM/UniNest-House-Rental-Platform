-- =========================================================================
-- UniNest Student House Rental Platform - Supabase PostgreSQL Schema Script
-- Run this script in your Supabase Dashboard -> SQL Editor
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'landlord', 'admin')),
  phone VARCHAR(50),
  avatar_url TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  university VARCHAR(255),
  faculty VARCHAR(255),
  student_id_num VARCHAR(100),
  verified BOOLEAN DEFAULT false,
  response_rate VARCHAR(50) DEFAULT '100% within 1 hour',
  joined_year VARCHAR(10) DEFAULT '2026',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. LISTINGS TABLE
CREATE TABLE IF NOT EXISTS public.listings (
  id VARCHAR(100) PRIMARY KEY DEFAULT ('lst-' || SUBSTRING(uuid_generate_v4()::text, 1, 8)),
  landlord_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL CHECK (type IN ('Annex', 'Boarding House', 'Shared Flat', 'Studio')),
  university_id VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  distance_km NUMERIC(5, 2) NOT NULL DEFAULT 0.5,
  walking_time_minutes INTEGER NOT NULL DEFAULT 5,
  nearby_faculty VARCHAR(255),
  monthly_rent NUMERIC(10, 2) NOT NULL,
  security_deposit NUMERIC(10, 2) NOT NULL,
  water_included BOOLEAN DEFAULT true,
  electricity_included BOOLEAN DEFAULT false,
  wifi_included BOOLEAN DEFAULT true,
  gender_preference VARCHAR(50) DEFAULT 'Any' CHECK (gender_preference IN ('Girls Only', 'Boys Only', 'Any')),
  max_occupants INTEGER DEFAULT 1,
  verified BOOLEAN DEFAULT false,
  rating NUMERIC(3, 2) DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  amenities TEXT[] DEFAULT ARRAY[]::TEXT[],
  house_rules TEXT[] DEFAULT ARRAY[]::TEXT[],
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.applications (
  id VARCHAR(100) PRIMARY KEY DEFAULT ('app-' || SUBSTRING(uuid_generate_v4()::text, 1, 8)),
  listing_id VARCHAR(100) REFERENCES public.listings(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  student_name VARCHAR(255) NOT NULL,
  student_email VARCHAR(255) NOT NULL,
  student_phone VARCHAR(50) NOT NULL,
  university VARCHAR(255) NOT NULL,
  faculty VARCHAR(255) NOT NULL,
  student_id_num VARCHAR(100) NOT NULL,
  move_in_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Declined')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.messages (
  id VARCHAR(100) PRIMARY KEY DEFAULT ('msg-' || SUBSTRING(uuid_generate_v4()::text, 1, 8)),
  listing_id VARCHAR(100) REFERENCES public.listings(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  sender_role VARCHAR(50) NOT NULL CHECK (sender_role IN ('student', 'landlord')),
  sender_name VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. SAVED LISTINGS TABLE
CREATE TABLE IF NOT EXISTS public.saved_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  listing_id VARCHAR(100) REFERENCES public.listings(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, listing_id)
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_listings_university ON public.listings(university_id);
CREATE INDEX IF NOT EXISTS idx_listings_landlord ON public.listings(landlord_id);
CREATE INDEX IF NOT EXISTS idx_applications_student ON public.applications(student_id);
CREATE INDEX IF NOT EXISTS idx_applications_listing ON public.applications(listing_id);
CREATE INDEX IF NOT EXISTS idx_messages_listing ON public.messages(listing_id);

-- ENABLE ROW LEVEL SECURITY (RLS) FOR SUPABASE SAFETY (OPTIONAL)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_listings ENABLE ROW LEVEL SECURITY;

-- PERMISSIVE RLS POLICIES FOR SUPABASE SERVICE ROLE / ANON ACCESS
CREATE POLICY "Allow public select listings" ON public.listings FOR SELECT USING (true);
CREATE POLICY "Allow public insert listings" ON public.listings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update listings" ON public.listings FOR UPDATE USING (true);
CREATE POLICY "Allow public delete listings" ON public.listings FOR DELETE USING (true);

CREATE POLICY "Allow public access users" ON public.users FOR ALL USING (true);
CREATE POLICY "Allow public access applications" ON public.applications FOR ALL USING (true);
CREATE POLICY "Allow public access messages" ON public.messages FOR ALL USING (true);
CREATE POLICY "Allow public access saved_listings" ON public.saved_listings FOR ALL USING (true);
