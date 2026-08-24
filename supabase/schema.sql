-- AURIA LUXURY HOTEL — SUPABASE DATABASE SCHEMA & SEED DATA (INR CURRENCY)
-- Execute this SQL script in the Supabase SQL Editor (https://app.supabase.com)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ROOMS TABLE
CREATE TABLE IF NOT EXISTS public.rooms (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  price_per_night NUMERIC NOT NULL,
  size_sqft INTEGER NOT NULL,
  max_occupancy INTEGER NOT NULL,
  description TEXT NOT NULL,
  amenities TEXT[] NOT NULL DEFAULT '{}',
  images TEXT[] NOT NULL DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. BOOKING INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.booking_inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  room_id UUID REFERENCES public.rooms(id) ON DELETE SET NULL,
  guest_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL DEFAULT 1,
  special_requests TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. AMENITIES TABLE
CREATE TABLE IF NOT EXISTS public.amenities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  ledger_num TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  span_class TEXT DEFAULT 'col-span-1',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  guest_name TEXT NOT NULL,
  origin TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  quote TEXT NOT NULL,
  stayed_in TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. NEWSLETTER SUBSCRIBERS TABLE
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS POLICIES
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public rooms read" ON public.rooms FOR SELECT USING (true);
CREATE POLICY "Public amenities read" ON public.amenities FOR SELECT USING (true);
CREATE POLICY "Public gallery read" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public testimonials read" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public create booking inquiries" ON public.booking_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read booking inquiries" ON public.booking_inquiries FOR SELECT USING (true);
CREATE POLICY "Public update booking inquiries" ON public.booking_inquiries FOR UPDATE USING (true);
CREATE POLICY "Public create newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);

-- SEED DATA (INR CURRENCY)
INSERT INTO public.rooms (slug, name, type, price_per_night, size_sqft, max_occupancy, description, amenities, images, featured) VALUES
(
  'terrazza-sanctuary',
  'The Terrazza Sanctuary',
  'Cliffside Suite',
  145000,
  820,
  2,
  'Carved directly into the volcanic basalt cliff face, offering an expansive cantilevered terrace over the Tyrrhenian waters with a private heated plunge pool.',
  ARRAY['Private Plunge Pool', 'Cliffside Terrace', 'King Feather Bed', 'Basalt Bath Tub', 'Personal Concierge', 'Complimentary Vintage Bar'],
  ARRAY['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'],
  true
),
(
  'aegean-horizon-suite',
  'Aegean Horizon Suite',
  'Panoramic Suite',
  120000,
  750,
  2,
  'Featuring floor-to-ceiling glass wrapping around 180 degrees of open sea, minimalist custom oak furnishings, and an open-sky rainfall marble shower.',
  ARRAY['180-Degree Ocean View', 'Open Sky Rainfall Shower', 'Dual Marble Vanity', 'Soundproof Acoustic Glass', 'Espresso Bar', 'Sunset Lounge'],
  ARRAY['https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'],
  true
),
(
  'basalt-cave-residence',
  'Basalt Cave Residence',
  'Signature Residence',
  185000,
  1100,
  4,
  'A masterpiece of organic architecture. Two private bedrooms embedded within natural rock, private subterranean wine cellar, and private infinity dip pool.',
  ARRAY['Subterranean Cellar', 'Two Private Suites', 'Infinite Dip Pool', 'Private Chef Kitchen', '24/7 Butler Service', 'Direct Sea Dock Access'],
  ARRAY['https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'],
  true
),
(
  'solarium-ocean-room',
  'Solarium Ocean Room',
  'Executive Ocean View',
  89000,
  580,
  2,
  'Bathed in Mediterranean sunlight, featuring a private daybed balcony overlooking the sea stack formations and hand-woven linen textiles.',
  ARRAY['Private Daybed Balcony', 'High-Speed Starlink WiFi', 'Bang & Olufsen Acoustics', 'Organic Bath Products'],
  ARRAY['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80'],
  false
)
ON CONFLICT (slug) DO NOTHING;
