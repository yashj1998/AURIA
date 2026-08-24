import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-supabase-project.supabase.co' &&
  !supabaseUrl.includes('your-supabase')
);

export const realSupabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const INITIAL_MOCK_DATA = {
  rooms: [
    {
      id: '11111111-1111-1111-1111-111111111111',
      slug: 'terrazza-sanctuary',
      name: 'The Terrazza Sanctuary',
      type: 'Cliffside Suite',
      price_per_night: 145000,
      size_sqft: 820,
      max_occupancy: 2,
      description: 'Carved directly into the volcanic basalt cliff face, offering an expansive cantilevered terrace over the Tyrrhenian waters with a private heated plunge pool.',
      amenities: ['Private Plunge Pool', 'Cliffside Terrace', 'King Feather Bed', 'Basalt Bath Tub', 'Personal Concierge', 'Complimentary Vintage Bar'],
      images: [
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
      ],
      featured: true,
      available: true
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      slug: 'aegean-horizon-suite',
      name: 'Aegean Horizon Suite',
      type: 'Panoramic Suite',
      price_per_night: 120000,
      size_sqft: 750,
      max_occupancy: 2,
      description: 'Featuring floor-to-ceiling glass wrapping around 180 degrees of open sea, minimalist custom oak furnishings, and an open-sky rainfall marble shower.',
      amenities: ['180-Degree Ocean View', 'Open Sky Rainfall Shower', 'Dual Marble Vanity', 'Soundproof Acoustic Glass', 'Espresso Bar', 'Sunset Lounge'],
      images: [
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'
      ],
      featured: true,
      available: true
    },
    {
      id: '33333333-3333-3333-3333-333333333333',
      slug: 'basalt-cave-residence',
      name: 'Basalt Cave Residence',
      type: 'Signature Residence',
      price_per_night: 185000,
      size_sqft: 1100,
      max_occupancy: 4,
      description: 'A masterpiece of organic architecture. Two private bedrooms embedded within natural rock, private subterranean wine cellar, and private infinity dip pool.',
      amenities: ['Subterranean Cellar', 'Two Private Suites', 'Infinite Dip Pool', 'Private Chef Kitchen', '24/7 Butler Service', 'Direct Sea Dock Access'],
      images: [
        'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'
      ],
      featured: true,
      available: true
    },
    {
      id: '44444444-4444-4444-4444-444444444444',
      slug: 'solarium-ocean-room',
      name: 'Solarium Ocean Room',
      type: 'Executive Ocean View',
      price_per_night: 89000,
      size_sqft: 580,
      max_occupancy: 2,
      description: 'Bathed in Mediterranean sunlight, featuring a private daybed balcony overlooking the sea stack formations and hand-woven linen textiles.',
      amenities: ['Private Daybed Balcony', 'High-Speed Starlink WiFi', 'Bang & Olufsen Acoustics', 'Organic Bath Products'],
      images: [
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80'
      ],
      featured: false,
      available: true
    }
  ],
  amenities: [
    {
      id: 'a1',
      ledger_num: '01',
      title: 'Cliffside Infinity Pool',
      category: 'Wellness & Water',
      description: 'A heated sea-water infinity pool carved into the rock cliff 40 meters above the Tyrrhenian Sea, appearing to spill directly into the ocean horizon.',
      features: ['Heated Mineral Water', 'Cocktail Service', 'Private Cabanas', 'Sunset Horizon Views'],
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'a2',
      ledger_num: '02',
      title: 'Basalt Subterranean Spa',
      category: 'Holistic Healing',
      description: 'Ancient thermal rituals, volcanic stone massages, and sea salt hydrotherapy baths hosted in natural basalt caverns.',
      features: ['Volcanic Stone Therapy', 'Thermal Steam Grotto', 'Cold Plunge Basin', 'Organic Essential Oils'],
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'a3',
      ledger_num: '03',
      title: 'Ristorante Terrazza',
      category: 'Fine Dining',
      description: 'Michelin-recognized Mediterranean gastronomy focusing on line-caught local seafood, organic estate olive oil, and regional coastal vintages.',
      features: ['Cliffside Terrace Seating', 'Sommelier Tasting Menu', 'Fresh Daily Catch', 'Private Cave Dining'],
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'a4',
      ledger_num: '04',
      title: 'Private Helipad & Dock',
      category: 'Arrival & Mobility',
      description: 'Helipad access located atop the basalt ridge and a secluded sea dock equipped for private yacht charter transfers.',
      features: ['Private Yacht Transfer', 'Helipad Arrivals', '24/7 Chauffeur Fleet', 'Luggage Valet'],
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    }
  ],
  gallery: [
    { id: 'g1', title: 'Basalt Horizon At Sunset', category: 'Architecture', image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', span_class: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2' },
    { id: 'g2', title: 'Terrazza Sanctuary Bed', category: 'Suites', image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', span_class: 'col-span-1' },
    { id: 'g3', title: 'Cliffside Infinity Pool', category: 'Wellness', image_url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80', span_class: 'col-span-1' },
    { id: 'g4', title: 'Coastal Wine Tasting', category: 'Dining', image_url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80', span_class: 'col-span-1 sm:col-span-2 md:col-span-1' },
    { id: 'g5', title: 'Subterranean Spa Cavern', category: 'Wellness', image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80', span_class: 'col-span-1' },
    { id: 'g6', title: 'Aegean Sea View Bath', category: 'Suites', image_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80', span_class: 'col-span-1 sm:col-span-2' }
  ],
  testimonials: [
    { id: 't1', guest_name: 'Lord Harrison Vance', origin: 'London, UK', rating: 5, quote: 'Auria transcends luxury hospitality. Sleeping carved into the cliffface while watching the sea horizon from the plunge pool is unforgettable.', stayed_in: 'The Terrazza Sanctuary' },
    { id: 't2', guest_name: 'Elena & Matteo Rossi', origin: 'Milan, Italy', rating: 5, quote: 'The architectural restraint, tactile basalt stone, and flawless personal concierge service set a new benchmark for coastal sanctuaries.', stayed_in: 'Basalt Cave Residence' },
    { id: 't3', guest_name: 'Dr. Sophia Chen', origin: 'Zurich, Switzerland', rating: 5, quote: 'Quiet, precise, and utterly breathtaking. Space Mono ledgers and raw stone aesthetics meet unmatched luxury.', stayed_in: 'Aegean Horizon Suite' }
  ]
};

export const supabaseService = {
  async getRooms() {
    if (isSupabaseConfigured && realSupabase) {
      const { data, error } = await realSupabase.from('rooms').select('*').order('created_at', { ascending: true });
      if (!error && data?.length) return data;
    }
    return INITIAL_MOCK_DATA.rooms;
  },

  async getAmenities() {
    if (isSupabaseConfigured && realSupabase) {
      const { data, error } = await realSupabase.from('amenities').select('*').order('ledger_num', { ascending: true });
      if (!error && data?.length) return data;
    }
    return INITIAL_MOCK_DATA.amenities;
  },

  async getGallery() {
    if (isSupabaseConfigured && realSupabase) {
      const { data, error } = await realSupabase.from('gallery').select('*');
      if (!error && data?.length) return data;
    }
    return INITIAL_MOCK_DATA.gallery;
  },

  async getTestimonials() {
    if (isSupabaseConfigured && realSupabase) {
      const { data, error } = await realSupabase.from('testimonials').select('*');
      if (!error && data?.length) return data;
    }
    return INITIAL_MOCK_DATA.testimonials;
  },

  async submitBookingInquiry(inquiry) {
    const payload = {
      ...inquiry,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && realSupabase) {
      const { data, error } = await realSupabase.from('booking_inquiries').insert([payload]).select();
      if (error) {
        console.error('Supabase error inserting booking inquiry:', error);
        throw error;
      }
      return data[0];
    } else {
      const existing = JSON.parse(localStorage.getItem('auria_inquiries') || '[]');
      const newInquiry = { id: 'inq_' + Date.now(), ...payload };
      existing.unshift(newInquiry);
      localStorage.setItem('auria_inquiries', JSON.stringify(existing));
      return newInquiry;
    }
  },

  async getBookingInquiries() {
    if (isSupabaseConfigured && realSupabase) {
      const { data, error } = await realSupabase.from('booking_inquiries').select('*, rooms(name)').order('created_at', { ascending: false });
      if (!error) return data;
    }
    const existing = JSON.parse(localStorage.getItem('auria_inquiries') || '[]');
    return existing;
  },

  async updateInquiryStatus(id, newStatus) {
    if (isSupabaseConfigured && realSupabase) {
      const { data, error } = await realSupabase.from('booking_inquiries').update({ status: newStatus }).eq('id', id).select();
      if (!error) return data;
    }
    const existing = JSON.parse(localStorage.getItem('auria_inquiries') || '[]');
    const updated = existing.map(item => item.id === id ? { ...item, status: newStatus } : item);
    localStorage.setItem('auria_inquiries', JSON.stringify(updated));
    return updated;
  },

  async subscribeNewsletter(email) {
    if (isSupabaseConfigured && realSupabase) {
      const { data, error } = await realSupabase.from('newsletter_subscribers').insert([{ email }]).select();
      if (error) throw error;
      return data[0];
    } else {
      const existing = JSON.parse(localStorage.getItem('auria_newsletter') || '[]');
      if (!existing.includes(email)) existing.push(email);
      localStorage.setItem('auria_newsletter', JSON.stringify(existing));
      return { email, status: 'subscribed' };
    }
  }
};
