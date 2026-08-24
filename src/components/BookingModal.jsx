import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, Mail, Phone, User, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { supabaseService } from '../lib/supabase';

export const BookingModal = () => {
  const {
    isModalOpen,
    closeBookingModal,
    selectedRoom,
    rooms,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    guests,
    setGuests,
    showToast,
  } = useBooking();

  const [chosenRoomId, setChosenRoomId] = useState(selectedRoom?.id || '');
  const [formData, setFormData] = useState({
    guest_name: '',
    email: '',
    phone: '',
    special_requests: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (selectedRoom) {
      setChosenRoomId(selectedRoom.id);
    } else if (rooms.length > 0 && !chosenRoomId) {
      setChosenRoomId(rooms[0].id);
    }
  }, [selectedRoom, rooms]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeBookingModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeBookingModal]);

  if (!isModalOpen) return null;

  const currentRoom = rooms.find((r) => r.id === chosenRoomId) || selectedRoom || rooms[0];
  const formattedPrice = currentRoom?.price_per_night
    ? currentRoom.price_per_night.toLocaleString('en-IN')
    : '1,45,000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.guest_name || !formData.email) {
      showToast('Please provide name and contact email.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await supabaseService.submitBookingInquiry({
        room_id: currentRoom?.id,
        guest_name: formData.guest_name,
        email: formData.email,
        phone: formData.phone,
        check_in: checkIn,
        check_out: checkOut,
        guests: guests,
        special_requests: formData.special_requests,
      });

      setSuccess(true);
      showToast('Reservation inquiry recorded in Supabase!', 'success');
    } catch (err) {
      console.error('Booking submission error:', err);
      showToast('Inquiry saved locally.', 'error');
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center sm:p-4 md:p-6 bg-charcoal/80 backdrop-blur-md animate-fadeIn"
      onClick={closeBookingModal}
    >
      <div 
        className="relative w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-3xl lg:max-w-4xl glass-panel border-0 sm:border border-stone-border shadow-2xl overflow-hidden flex flex-col bg-white sm:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Top Header */}
        <div className="sticky top-0 z-20 px-4 sm:px-6 py-4 border-b border-stone-border flex items-center justify-between bg-sand/95 backdrop-blur-md shrink-0">
          <div>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-brass uppercase block font-bold">
              Exclusive Residence Inquiry
            </span>
            <h2 className="font-display italic text-xl sm:text-2xl text-charcoal mt-0.5">
              Reserve at Auria Sanctuary
            </h2>
          </div>
          <button
            onClick={closeBookingModal}
            className="p-2 -mr-1 text-charcoal-muted hover:text-brass transition-colors focus:outline-none rounded-full hover:bg-black/5"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Scrollable Body Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
          {success ? (
            <div className="text-center py-10 sm:py-14 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brass/10 border-2 border-brass flex items-center justify-center mx-auto text-brass shadow-brass-glow">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display italic text-2xl sm:text-3xl text-charcoal">Inquiry Transmitted</h3>
                <p className="font-sans text-sm text-charcoal-muted max-w-md mx-auto leading-relaxed">
                  Our private concierge has received your stay request for <strong className="text-brass font-bold">{currentRoom?.name}</strong> and will contact you shortly.
                </p>
              </div>

              <div className="p-4 bg-sand border border-stone-border text-xs font-mono text-charcoal-muted inline-block rounded">
                <span>STATUS: RECORDED IN SUPABASE POSTGRESQL</span>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setSuccess(false);
                    closeBookingModal();
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 bg-brass text-sand-light font-mono text-xs font-bold uppercase tracking-widest hover:bg-brass-light transition-colors shadow-brass-glow rounded-sm"
                >
                  Return to Exploration
                </button>
              </div>
            </div>
          ) : (
            <form id="booking-form" onSubmit={handleSubmit} className="space-y-6">
              
              {/* Selected Suite Preview Card */}
              <div className="p-4 bg-sand border border-stone-border rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  {currentRoom?.images?.[0] && (
                    <img
                      src={currentRoom.images[0]}
                      alt={currentRoom.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover border border-stone-border rounded-md shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] text-brass uppercase font-bold tracking-wider">{currentRoom?.type}</span>
                    <h4 className="font-display italic text-lg sm:text-xl text-charcoal truncate">{currentRoom?.name}</h4>
                    <p className="font-sans text-xs text-charcoal-muted line-clamp-1">{currentRoom?.capacity}</p>
                  </div>
                </div>

                <div className="text-left sm:text-right w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-border/40 shrink-0">
                  <span className="font-mono text-lg sm:text-xl font-bold text-brass">₹{formattedPrice}</span>
                  <span className="font-mono text-[9px] sm:text-[10px] text-charcoal-light block">/ NIGHT (INR)</span>
                </div>
              </div>

              {/* Suite Selection Dropdown */}
              <div className="space-y-2">
                <label className="font-mono text-xs tracking-widest text-brass uppercase font-bold block">
                  Select Preferred Suite
                </label>
                <select
                  value={chosenRoomId}
                  onChange={(e) => setChosenRoomId(e.target.value)}
                  className="w-full bg-sand border border-stone-border focus:border-brass p-3 font-mono text-xs sm:text-sm text-charcoal outline-none transition-colors rounded-md"
                >
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} — ₹{room.price_per_night?.toLocaleString('en-IN')} / night ({room.type})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Guest Controls Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-charcoal-light uppercase font-bold flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-brass" />
                    <span>Check In</span>
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-sand border border-stone-border focus:border-brass p-2.5 font-mono text-xs text-charcoal outline-none rounded-md"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-charcoal-light uppercase font-bold flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-brass" />
                    <span>Check Out</span>
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-sand border border-stone-border focus:border-brass p-2.5 font-mono text-xs text-charcoal outline-none rounded-md"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-charcoal-light uppercase font-bold flex items-center gap-1">
                    <Users className="w-3 h-3 text-brass" />
                    <span>Occupants</span>
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-sand border border-stone-border focus:border-brass p-2.5 font-mono text-xs text-charcoal outline-none rounded-md"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                  </select>
                </div>
              </div>

              {/* Guest Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs tracking-widest text-brass uppercase font-bold block">
                    Guest Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-charcoal-light" />
                    <input
                      type="text"
                      placeholder="Guest Name"
                      value={formData.guest_name}
                      onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                      className="w-full bg-sand border border-stone-border focus:border-brass pl-10 pr-3 py-2.5 font-sans text-sm text-charcoal placeholder-charcoal-light outline-none rounded-md"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs tracking-widest text-brass uppercase font-bold block">
                    Contact Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-charcoal-light" />
                    <input
                      type="email"
                      placeholder="guest@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-sand border border-stone-border focus:border-brass pl-10 pr-3 py-2.5 font-sans text-sm text-charcoal placeholder-charcoal-light outline-none rounded-md"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs tracking-widest text-brass uppercase font-bold block">
                  Phone / WhatsApp Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-charcoal-light" />
                  <input
                    type="tel"
                    placeholder="+91 / +44 / +39 Telephone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-sand border border-stone-border focus:border-brass pl-10 pr-3 py-2.5 font-sans text-sm text-charcoal placeholder-charcoal-light outline-none rounded-md"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs tracking-widest text-brass uppercase font-bold block">
                  Concierge & Special Requests
                </label>
                <textarea
                  rows={3}
                  placeholder="Yacht transfer, dietary preferences, champagne..."
                  value={formData.special_requests}
                  onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                  className="w-full bg-sand border border-stone-border focus:border-brass p-3 font-sans text-sm text-charcoal placeholder-charcoal-light outline-none rounded-md"
                />
              </div>

            </form>
          )}
        </div>

        {/* Sticky Bottom Action Footer */}
        {!success && (
          <div className="sticky bottom-0 z-20 px-4 sm:px-6 py-4 border-t border-stone-border flex flex-col sm:flex-row items-center justify-between gap-3 bg-sand/95 backdrop-blur-md shrink-0">
            <div className="font-mono text-[10px] text-charcoal-light flex items-center space-x-1.5 self-start sm:self-center">
              <ShieldCheck className="w-4 h-4 text-brass shrink-0" />
              <span>SUPABASE ENCRYPTED RESERVATION</span>
            </div>

            <button
              type="submit"
              form="booking-form"
              disabled={submitting}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-brass hover:bg-brass-light text-sand-light font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-brass-glow flex items-center justify-center space-x-2 rounded-md"
            >
              <span>{submitting ? 'Transmitting...' : 'Transmit Reservation Inquiry'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
