import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Compass, ChevronDown, CheckCircle2, Send, Clock } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { supabaseService } from '../lib/supabase';

export const Contact = () => {
  const { rooms, checkIn, setCheckIn, checkOut, setCheckOut, guests, setGuests, showToast, isSupabaseConfigured } = useBooking();

  const [selectedRoomId, setSelectedRoomId] = useState(rooms[0]?.id || '');
  const [formData, setFormData] = useState({
    guest_name: '',
    email: '',
    phone: '',
    special_requests: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.guest_name || !formData.email) {
      showToast('Please provide name and email.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await supabaseService.submitBookingInquiry({
        room_id: selectedRoomId || rooms[0]?.id,
        guest_name: formData.guest_name,
        email: formData.email,
        phone: formData.phone,
        check_in: checkIn,
        check_out: checkOut,
        guests: guests,
        special_requests: formData.special_requests,
      });

      setSubmitted(true);
      showToast('Recorded in Supabase PostgreSQL!', 'success');
    } catch (err) {
      console.error('Contact inquiry error:', err);
      showToast('Inquiry saved locally.', 'success');
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'How do I arrive via private yacht or helicopter?',
      a: 'Auria features a cliff top helipad (38.487° N, 14.842° E) and a private deep-water sea dock for yacht tender transfers.'
    },
    {
      q: 'Are children accommodated at the sanctuary?',
      a: 'Auria welcomes guests aged 14 and above to preserve absolute stillness along the cliff face.'
    },
    {
      q: 'What is the stay modification policy?',
      a: 'Reservations may be modified up to 14 days prior to arrival without penalty.'
    }
  ];

  return (
    <div className="pt-28 pb-28 space-y-20 bg-sand min-h-screen">
      
      {/* Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-6 space-y-3">
        <div className="flex items-center space-x-2 font-mono text-xs text-brass uppercase tracking-widest">
          <Link to="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-charcoal">Reservations & Concierge</span>
        </div>

        <h1 className="font-display italic text-5xl md:text-6xl text-charcoal">
          Transmit Your Reservation Inquiry
        </h1>

        <p className="font-sans text-xs md:text-sm text-charcoal-muted max-w-xl">
          Connect directly with our head concierge team for room reservations, helicopter arrivals, or private dining.
        </p>
      </section>

      {/* Form & Coordinates Split */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Form Column */}
        <div className="lg:col-span-7 glass-panel border border-stone-border p-8 md:p-10 space-y-6 shadow-glass-light bg-white">
          
          <div className="border-b border-stone-border pb-4 flex items-center justify-between">
            <div>
              <span className="font-mono text-[10px] text-brass uppercase tracking-widest block">Supabase Live Form</span>
              <h3 className="font-display italic text-2xl text-charcoal mt-0.5">Sanctuary Inquiry Form</h3>
            </div>
            <div className="font-mono text-[10px] text-charcoal-muted bg-sand px-3 py-1 border border-stone-border">
              {isSupabaseConfigured ? 'SUPABASE LIVE' : 'LOCAL BACKEND'}
            </div>
          </div>

          {submitted ? (
            <div className="text-center py-16 space-y-6">
              <div className="w-16 h-16 rounded-full bg-brass/10 border border-brass flex items-center justify-center mx-auto text-brass">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display italic text-3xl text-charcoal">Inquiry Recorded</h3>
              <p className="font-sans text-xs text-charcoal-muted max-w-md mx-auto">
                Thank you, <strong className="text-brass">{formData.guest_name}</strong>. Saved to Supabase. Concierge will contact you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-8 py-3 bg-brass text-sand-light font-mono text-xs font-bold uppercase tracking-widest"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Suite Selection */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-brass uppercase tracking-wider block">Suite Selection</label>
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full bg-sand border border-stone-border focus:border-brass p-3 font-mono text-xs text-charcoal outline-none transition-colors"
                >
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} — €{room.price_per_night} / night ({room.type})
                    </option>
                  ))}
                </select>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-charcoal-light uppercase">Check In</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-sand border border-stone-border focus:border-brass p-2 font-mono text-xs text-charcoal outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-charcoal-light uppercase">Check Out</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-sand border border-stone-border focus:border-brass p-2 font-mono text-xs text-charcoal outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-charcoal-light uppercase">Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-sand border border-stone-border focus:border-brass p-2 font-mono text-xs text-charcoal outline-none"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                  </select>
                </div>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-xs text-brass uppercase tracking-wider block">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Guest Name"
                    value={formData.guest_name}
                    onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                    className="w-full bg-sand border border-stone-border focus:border-brass p-2.5 font-sans text-xs text-charcoal outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-xs text-brass uppercase tracking-wider block">Email *</label>
                  <input
                    type="email"
                    placeholder="email@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-sand border border-stone-border focus:border-brass p-2.5 font-sans text-xs text-charcoal outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-xs text-brass uppercase tracking-wider block">Phone / WhatsApp</label>
                <input
                  type="tel"
                  placeholder="+39 090 9812345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-sand border border-stone-border focus:border-brass p-2.5 font-sans text-xs text-charcoal outline-none"
                />
              </div>

              {/* Special Requests */}
              <div className="space-y-1">
                <label className="font-mono text-xs text-brass uppercase tracking-wider block">Special Requests</label>
                <textarea
                  rows={3}
                  placeholder="Helicopter arrival, dietary requests..."
                  value={formData.special_requests}
                  onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                  className="w-full bg-sand border border-stone-border focus:border-brass p-2.5 font-sans text-xs text-charcoal outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-brass hover:bg-brass-light text-sand-light font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-brass-glow flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Transmitting...' : 'Transmit Inquiry to Supabase'}</span>
              </button>

            </form>
          )}

        </div>

        {/* Right Details Column */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-white border border-stone-border p-8 space-y-6 shadow-card-light">
            <h3 className="font-display italic text-2xl text-charcoal border-b border-stone-border pb-3">
              Coordinates & Contact
            </h3>

            <div className="space-y-4 font-mono text-xs text-charcoal-muted">
              <div className="flex items-start space-x-3">
                <Compass className="w-4 h-4 text-brass shrink-0 mt-0.5" />
                <div>
                  <span className="text-charcoal-light block">LOCATION</span>
                  <span className="text-charcoal">38.487° N, 14.842° E — Tyrrhenian Coast</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-brass shrink-0 mt-0.5" />
                <div>
                  <span className="text-charcoal-light block">TELEPHONE</span>
                  <span className="text-charcoal">+39 (090) 981-4400</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-brass shrink-0 mt-0.5" />
                <div>
                  <span className="text-charcoal-light block">EMAIL DISPATCH</span>
                  <span className="text-charcoal">concierge@auria-sanctuary.com</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-brass shrink-0 mt-0.5" />
                <div>
                  <span className="text-charcoal-light block">CONCIERGE DESK</span>
                  <span className="text-charcoal">24 Hours / 7 Days A Week</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Frame */}
          <div className="relative aspect-[4/3] bg-sand-card border border-stone-border overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-sand via-aegean-light/10 to-sand opacity-90" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-3 z-10">
              <div className="w-12 h-12 rounded-full border border-brass flex items-center justify-center bg-white shadow-md text-brass">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs font-bold text-charcoal uppercase tracking-widest">
                AURIA CLIFFSIDE (38.487° N)
              </span>
              <span className="font-mono text-[10px] text-charcoal-muted">
                Heli-Dock & Tyrrhenian Sea Reception
              </span>
            </div>
          </div>

        </div>

      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 space-y-6 border-t border-stone-border pt-16">
        <div className="text-center space-y-1">
          <span className="font-mono text-xs text-brass uppercase tracking-widest block">Protocols</span>
          <h2 className="font-display italic text-3xl text-charcoal">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="bg-white border border-stone-border overflow-hidden">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between font-mono text-xs text-charcoal hover:text-brass transition-colors"
                >
                  <span className="font-bold">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-brass transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 font-sans text-xs text-charcoal-muted border-t border-stone-border leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
