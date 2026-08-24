import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const BookingWidget = () => {
  const { checkIn, setCheckIn, checkOut, setCheckOut, guests, setGuests } = useBooking();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/rooms');
  };

  return (
    <div className="w-full max-w-5xl mx-auto glass-panel border border-stone-border p-6 md:p-8 shadow-glass-light relative z-20">
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 items-end">
        
        {/* Check-In Date */}
        <div className="lg:col-span-3 space-y-2">
          <label className="font-mono text-[11px] tracking-widest text-brass uppercase flex items-center space-x-2">
            <Calendar className="w-3.5 h-3.5 text-brass" />
            <span>Check In</span>
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full bg-sand border-b border-stone-border focus:border-brass py-2.5 px-3 font-mono text-sm text-charcoal outline-none transition-colors"
          />
        </div>

        {/* Check-Out Date */}
        <div className="lg:col-span-3 space-y-2">
          <label className="font-mono text-[11px] tracking-widest text-brass uppercase flex items-center space-x-2">
            <Calendar className="w-3.5 h-3.5 text-brass" />
            <span>Check Out</span>
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full bg-sand border-b border-stone-border focus:border-brass py-2.5 px-3 font-mono text-sm text-charcoal outline-none transition-colors"
          />
        </div>

        {/* Occupancy */}
        <div className="lg:col-span-3 space-y-2">
          <label className="font-mono text-[11px] tracking-widest text-brass uppercase flex items-center space-x-2">
            <Users className="w-3.5 h-3.5 text-brass" />
            <span>Occupants</span>
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full bg-sand border-b border-stone-border focus:border-brass py-2.5 px-3 font-mono text-sm text-charcoal outline-none transition-colors cursor-pointer"
          >
            <option value={1}>1 Guest — Sanctuary Single</option>
            <option value={2}>2 Guests — Cliffside Couple</option>
            <option value={3}>3 Guests — Suite Residence</option>
            <option value={4}>4 Guests — Full Cave Villa</option>
          </select>
        </div>

        {/* Submit */}
        <div className="lg:col-span-3 flex space-x-2">
          <button
            type="submit"
            className="w-full py-3.5 bg-brass hover:bg-brass-light text-sand-light font-mono text-xs tracking-widest uppercase font-bold transition-all duration-300 shadow-brass-glow flex items-center justify-center space-x-2"
          >
            <span>Explore Availability</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>
    </div>
  );
};
