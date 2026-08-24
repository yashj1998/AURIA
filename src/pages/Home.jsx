import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Star, Eye } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { BookingWidget } from '../components/BookingWidget';
import { RoomCard } from '../components/RoomCard';
import { GalleryLightbox } from '../components/GalleryLightbox';
import { ParallaxSection } from '../components/ParallaxSection';

export const Home = () => {
  const { rooms, amenities, gallery, testimonials, openBookingModal } = useBooking();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const featuredRooms = rooms.filter((r) => r.featured) || rooms;

  return (
    <div className="space-y-0 bg-sand">
      
      {/* 1. FULL HERO SECTION WITH 100% FULL-HEIGHT ARCHITECTURAL IMAGE & NO DROPSHADOWS */}
      <section className="relative w-full h-screen min-h-[720px] flex flex-col justify-between overflow-hidden bg-charcoal text-white">
        
        {/* Full-Bleed Background Image Covering Entire Viewport */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80"
            alt="Auria Cliffside Luxury Villa Architecture"
            className="w-full h-full object-cover"
          />
          {/* Crisp Dark Gradient Overlay for Maximum Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 pointer-events-none" />
        </div>

        {/* Top Space for Header Navigation */}
        <div className="pt-28" />

        {/* Hero Bottom Content Container (Sitting Directly On Top of Photo) */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            {/* Bottom-Left: Clean Crisp Title & Subtitle (Zero Dropshadows) */}
            <div className="lg:col-span-7 space-y-3">
              <h1 className="font-sans font-extrabold text-7xl sm:text-8xl md:text-9xl text-white tracking-tight leading-none">
                AURIA
              </h1>
              <p className="font-sans text-base md:text-xl text-white/90 font-medium tracking-wide">
                Designer Cliffside Sanctuary on the Tyrrhenian Coast
              </p>
            </div>

            {/* Bottom-Right: Clean Glass Metric Strip */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="grid grid-cols-4 gap-4 text-left border border-white/20 bg-black/40 backdrop-blur-md p-4 rounded-sm">
                <div>
                  <span className="font-sans text-2xl md:text-3xl font-extrabold text-white block leading-none">11</span>
                  <span className="font-mono text-[9px] text-brass uppercase font-bold tracking-wider block mt-1">SUITES</span>
                </div>
                <div>
                  <span className="font-sans text-2xl md:text-3xl font-extrabold text-white block leading-none">40M</span>
                  <span className="font-mono text-[9px] text-brass uppercase font-bold tracking-wider block mt-1">ELEVATION</span>
                </div>
                <div>
                  <span className="font-sans text-2xl md:text-3xl font-extrabold text-white block leading-none">820-1100</span>
                  <span className="font-mono text-[9px] text-brass uppercase font-bold tracking-wider block mt-1">SQ FT</span>
                </div>
                <div>
                  <span className="font-sans text-2xl md:text-3xl font-extrabold text-white block leading-none">100%</span>
                  <span className="font-mono text-[9px] text-brass uppercase font-bold tracking-wider block mt-1">SEA VIEW</span>
                </div>
              </div>

              {/* Accent Line Motif */}
              <div className="w-full h-[2px] bg-white/30 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-brass" />
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* Floating Booking Widget */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 -mt-10 z-30">
        <BookingWidget />
      </section>

      {/* 2. ARCHITECTURAL STORY */}
      <section className="py-28 bg-sand relative border-t border-stone-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-7 relative">
            <ParallaxSection speed={0.1} className="relative aspect-[16/10] overflow-hidden border border-stone-border shadow-card-light">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
                alt="Auria Cliffside Terrace"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </ParallaxSection>

            <div className="absolute -bottom-10 -right-6 sm:right-6 w-1/2 aspect-[4/3] border-2 border-white shadow-2xl overflow-hidden hidden sm:block">
              <img
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
                alt="Sea View Tub"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs tracking-widest-2xl text-brass uppercase block font-bold">01 / Ethos</span>
            <h2 className="font-display italic text-4xl md:text-5xl text-charcoal leading-tight">
              Carved directly into living volcanic rock.
            </h2>
            <p className="font-sans text-xs md:text-sm text-charcoal-muted leading-relaxed">
              Every suite features a private sea terrace aligned with the setting sun over the Tyrrhenian waters. Tactile basalt, warm linen, and unhurried luxury.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-border">
              <div>
                <span className="font-mono text-3xl font-bold text-brass block">11</span>
                <span className="font-mono text-[10px] text-charcoal-light uppercase block mt-1 font-bold">Cliff Suites</span>
              </div>
              <div>
                <span className="font-mono text-3xl font-bold text-brass block">40M</span>
                <span className="font-mono text-[10px] text-charcoal-light uppercase block mt-1 font-bold">Sea Elevation</span>
              </div>
              <div>
                <span className="font-mono text-3xl font-bold text-brass block">100%</span>
                <span className="font-mono text-[10px] text-charcoal-light uppercase block mt-1 font-bold">Ocean Facing</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. FEATURED ROOMS SCROLLER */}
      <section className="py-24 bg-sand-card relative border-t border-stone-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="font-mono text-xs tracking-widest-2xl text-brass uppercase block font-bold">02 / Accommodations</span>
              <h2 className="font-display italic text-4xl md:text-5xl text-charcoal">
                The Sanctuary Collection
              </h2>
            </div>

            <Link
              to="/rooms"
              className="font-mono text-xs text-brass hover:text-brass-dark uppercase tracking-widest flex items-center space-x-2 transition-colors font-bold"
            >
              <span>Explore All Suites</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex space-x-6 overflow-x-auto no-scrollbar pb-6 pt-2 snap-x snap-mandatory">
            {featuredRooms.map((room) => (
              <div key={room.id} className="snap-start">
                <RoomCard room={room} layout="horizontal" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. EDITORIAL FEATURE SECTION */}
      <section className="py-24 px-6 bg-sand-card border-y border-stone-border my-16 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="font-mono text-xs tracking-widest-2xl text-brass uppercase block font-bold">
            03 / Cliffside Infinity Pool
          </span>
          <h2 className="font-display italic text-4xl md:text-6xl text-charcoal leading-tight max-w-3xl mx-auto">
            "Heated sea water carved 40 meters above the open ocean horizon."
          </h2>
          <p className="font-mono text-xs text-charcoal-muted uppercase tracking-widest pt-2 font-bold">
            Volcanic Hydrotherapy • Tyrrhenian Sea Views
          </p>
        </div>
      </section>

      {/* 5. AMENITIES LEDGER */}
      <section className="py-24 bg-sand relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          <div className="space-y-2">
            <span className="font-mono text-xs tracking-widest-2xl text-brass uppercase block font-bold">04 / Amenities Ledger</span>
            <h2 className="font-display italic text-4xl md:text-5xl text-charcoal">
              Crafted Experiences
            </h2>
          </div>

          <div className="space-y-4">
            {amenities.map((item) => (
              <div
                key={item.id}
                className="group bg-white hover:bg-sand-card border border-stone-border p-6 md:p-8 transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-sm"
              >
                <div className="lg:col-span-2 flex items-center space-x-4">
                  <span className="font-mono text-3xl font-bold text-brass/60 group-hover:text-brass transition-colors">
                    {item.ledger_num}
                  </span>
                  <span className="font-mono text-[10px] text-charcoal-light uppercase lg:hidden font-bold">
                    {item.category}
                  </span>
                </div>

                <div className="lg:col-span-6 space-y-1">
                  <span className="font-mono text-[10px] text-charcoal-light uppercase hidden lg:block font-bold">
                    {item.category}
                  </span>
                  <h3 className="font-display italic text-2xl text-charcoal group-hover:text-brass transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-charcoal-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-wrap gap-2">
                  {item.features.map((feat, idx) => (
                    <span key={idx} className="font-mono text-[10px] text-charcoal bg-sand px-2.5 py-1 border border-stone-border font-medium">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIAL QUOTE */}
      <section className="py-24 bg-sand-card border-t border-stone-border">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <span className="font-mono text-xs tracking-widest-2xl text-brass uppercase block font-bold">05 / Impressions</span>

          {testimonials.length > 0 && (
            <div className="space-y-6">
              <div className="flex justify-center space-x-1 text-brass">
                {[...Array(testimonials[activeTestimonial]?.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brass text-brass" />
                ))}
              </div>

              <blockquote className="font-display italic text-3xl md:text-4xl text-charcoal leading-tight max-w-2xl mx-auto">
                "{testimonials[activeTestimonial]?.quote}"
              </blockquote>

              <div className="font-mono text-xs text-brass font-bold">
                {testimonials[activeTestimonial]?.guest_name} — <span className="text-charcoal-muted font-normal">{testimonials[activeTestimonial]?.origin}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 7. MASONRY PHOTO GALLERY PREVIEW */}
      <section className="py-24 bg-sand border-t border-stone-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="font-mono text-xs tracking-widest-2xl text-brass uppercase block font-bold">06 / Gallery</span>
              <h2 className="font-display italic text-4xl md:text-5xl text-charcoal">
                The Tyrrhenian Journal
              </h2>
            </div>

            <Link
              to="/amenities"
              className="font-mono text-xs text-brass hover:text-brass-dark uppercase tracking-widest flex items-center space-x-2 transition-colors font-bold"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {gallery.slice(0, 6).map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                className={`group relative overflow-hidden border border-stone-border cursor-pointer shadow-card-light ${item.span_class || 'col-span-1'}`}
              >
                <div className="aspect-[4/3] bg-sand-card overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div>
                    <span className="font-mono text-[10px] text-brass uppercase block font-bold">{item.category}</span>
                    <h4 className="font-display italic text-xl text-white">{item.title}</h4>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/90 border border-stone-border flex items-center justify-center text-brass">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Gallery Lightbox */}
      <GalleryLightbox
        images={gallery}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

    </div>
  );
};
