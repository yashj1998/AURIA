import React, { useState } from 'react';
import { Check, ArrowUpRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { ParallaxImage } from './ParallaxImage';

export const RoomCard = ({ room, layout = 'grid' }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { openBookingModal } = useBooking();

  const formattedPrice = room.price_per_night
    ? room.price_per_night.toLocaleString('en-IN')
    : '1,45,000';

  return (
    <div className={`group bg-white border border-stone-border hover:border-brass/50 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-card-light ${
      layout === 'horizontal' ? 'min-w-[340px] md:min-w-[440px]' : 'w-full'
    }`}>
      {/* 3D Parallax Tilt Image Container */}
      <div className="relative aspect-[4/3] bg-sand-card overflow-hidden cursor-pointer" onClick={() => openBookingModal(room)}>
        <ParallaxImage
          src={room.images[activeImageIndex] || room.images[0]}
          alt={room.name}
          className="w-full h-full"
        />

        {/* Room Type Tag */}
        <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest px-3 py-1 bg-white/90 backdrop-blur-md text-brass border border-stone-border font-bold z-10">
          {room.type}
        </div>

        {/* Image Carousel Dots */}
        {room.images.length > 1 && (
          <div className="absolute bottom-4 left-4 flex space-x-1.5 z-10">
            {room.images.map((_, idx) => (
              <span
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === activeImageIndex ? 'w-6 bg-brass' : 'w-2 bg-white/70'
                }`}
              />
            ))}
          </div>
        )}

        {/* Action Icon */}
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-stone-border flex items-center justify-center text-brass opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 z-10">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-3">
          <h3 className="font-display italic text-2xl md:text-3xl text-charcoal group-hover:text-brass transition-colors">
            {room.name}
          </h3>

          <p className="text-xs font-sans text-charcoal-muted line-clamp-2 leading-relaxed">
            {room.description}
          </p>

          <div className="pt-1 flex flex-wrap gap-2">
            {room.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="font-mono text-[10px] text-charcoal-muted bg-sand-card px-2.5 py-1 border border-stone-border flex items-center space-x-1">
                <Check className="w-3 h-3 text-brass" />
                <span>{amenity}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Meta & Price (INR ₹) */}
        <div className="pt-4 border-t border-stone-border flex items-center justify-between">
          <div>
            <span className="font-mono text-[10px] text-charcoal-light uppercase block">Nightly Rate</span>
            <div className="flex items-baseline space-x-1">
              <span className="font-mono text-xl font-bold text-brass">₹{formattedPrice}</span>
              <span className="font-mono text-[10px] text-charcoal-light">INR</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right font-mono text-[10px] text-charcoal-light hidden sm:block">
              <span>{room.size_sqft} SQ FT</span>
              <span className="mx-1">•</span>
              <span>UP TO {room.max_occupancy} GUESTS</span>
            </div>

            <button
              onClick={() => openBookingModal(room)}
              className="px-4 py-2.5 bg-sand-card hover:bg-brass text-charcoal hover:text-sand-light border border-stone-border font-mono text-[11px] uppercase tracking-widest transition-all duration-300 font-bold"
            >
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
