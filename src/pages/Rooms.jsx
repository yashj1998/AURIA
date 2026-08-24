import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { RoomCard } from '../components/RoomCard';

export const Rooms = () => {
  const { rooms, loading } = useBooking();

  const [selectedType, setSelectedType] = useState('ALL');
  const [maxPrice, setMaxPrice] = useState(250000);
  const [minOccupancy, setMinOccupancy] = useState(1);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const roomTypes = ['ALL', ...new Set(rooms.map((r) => r.type))];

  const filteredRooms = rooms.filter((room) => {
    if (selectedType !== 'ALL' && room.type !== selectedType) return false;
    if (room.price_per_night > maxPrice) return false;
    if (room.max_occupancy < minOccupancy) return false;
    if (onlyAvailable && !room.available) return false;
    return true;
  });

  const resetFilters = () => {
    setSelectedType('ALL');
    setMaxPrice(250000);
    setMinOccupancy(1);
    setOnlyAvailable(false);
  };

  return (
    <div className="pt-28 pb-28 space-y-12 bg-sand min-h-screen">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-6 space-y-3">
        <div className="flex items-center space-x-2 font-mono text-xs text-brass uppercase tracking-widest">
          <Link to="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-charcoal">Rooms & Suites</span>
        </div>

        <h1 className="font-display italic text-5xl md:text-6xl text-charcoal">
          The 11 Sanctuary Suites
        </h1>

        <p className="font-sans text-xs md:text-sm text-charcoal-muted max-w-xl">
          Private ocean terraces carved into volcanic basalt, warm linen, and unhindered sea horizons.
        </p>
      </section>

      {/* Filter Bar */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="glass-panel border border-stone-border p-6 space-y-6">
          
          <div className="flex items-center justify-between border-b border-stone-border pb-4">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-brass" />
              <span className="font-mono text-xs font-bold text-charcoal uppercase tracking-widest">
                Refine Suites ({filteredRooms.length} MATCHES)
              </span>
            </div>

            <button
              onClick={resetFilters}
              className="font-mono text-[11px] text-brass hover:text-brass-dark flex items-center space-x-1 uppercase transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            
            {/* Category */}
            <div className="space-y-2">
              <label className="font-mono text-[11px] text-brass uppercase tracking-wider block">Suite Category</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-sand border border-stone-border focus:border-brass p-3 font-mono text-xs text-charcoal outline-none transition-colors"
              >
                {roomTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === 'ALL' ? 'All Suite Types' : type}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Slider (INR ₹) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-[11px] text-brass uppercase tracking-wider">
                <span>Max Nightly Rate</span>
                <span className="text-charcoal font-bold">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={50000}
                max={250000}
                step={5000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brass bg-sand cursor-pointer h-2"
              />
            </div>

            {/* Occupants */}
            <div className="space-y-2">
              <label className="font-mono text-[11px] text-brass uppercase tracking-wider block">Occupant Capacity</label>
              <select
                value={minOccupancy}
                onChange={(e) => setMinOccupancy(Number(e.target.value))}
                className="w-full bg-sand border border-stone-border focus:border-brass p-3 font-mono text-xs text-charcoal outline-none transition-colors"
              >
                <option value={1}>1+ Guests</option>
                <option value={2}>2+ Guests</option>
                <option value={3}>3+ Guests</option>
                <option value={4}>4+ Guests</option>
              </select>
            </div>

            {/* Availability */}
            <div className="flex items-center space-x-3 pb-3">
              <input
                type="checkbox"
                id="availToggle"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="w-4 h-4 accent-brass bg-sand cursor-pointer"
              />
              <label htmlFor="availToggle" className="font-mono text-xs text-charcoal cursor-pointer select-none">
                Available Only
              </label>
            </div>

          </div>

        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        {loading ? (
          <div className="text-center py-20 font-mono text-xs text-brass tracking-widest animate-pulse">
            LOADING SANCTUARY SUITES FROM SUPABASE...
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="text-center py-20 glass-panel border border-stone-border p-12 space-y-6">
            <h3 className="font-display italic text-3xl text-charcoal">No Suites Match Criteria</h3>
            <p className="font-sans text-xs text-charcoal-muted max-w-md mx-auto">
              Adjust your maximum price range slider or suite filter.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-brass text-sand-light font-mono text-xs font-bold uppercase tracking-widest"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} layout="grid" />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
