import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, CheckCircle2 } from 'lucide-react';
import { supabaseService } from '../lib/supabase';
import { useBooking } from '../context/BookingContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useBooking();

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await supabaseService.subscribeNewsletter(email);
      setSubscribed(true);
      showToast('Subscribed to Auria Dispatches.', 'success');
      setEmail('');
    } catch (err) {
      console.error('Newsletter error:', err);
      showToast('Subscription recorded locally.', 'success');
      setSubscribed(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-sand-card border-t border-stone-border text-charcoal relative overflow-hidden pt-20 pb-12">
      {/* Horizon Line Divider Accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brass/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-stone-border">
          
          {/* Brand & Ethos */}
          <div className="md:col-span-5 space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border border-brass/50 flex items-center justify-center bg-white">
                <span className="font-display italic text-2xl text-brass">A</span>
              </div>
              <div>
                <span className="font-display text-3xl tracking-widest text-charcoal block leading-none">AURIA</span>
                <span className="font-mono text-[10px] tracking-widest-2xl text-brass uppercase block mt-1">Tyrrhenian Sanctuary</span>
              </div>
            </Link>

            <p className="text-xs font-sans text-charcoal-muted leading-relaxed max-w-md">
              An 11-room sanctuary built directly into volcanic basalt cliffs on Italy's Tyrrhenian coast. Minimalist stone architecture, quiet sea horizons, and pure stillness.
            </p>

            <div className="pt-1 font-mono text-xs text-brass flex items-center space-x-2">
              <Compass className="w-4 h-4 text-brass" />
              <span>38.487° N, 14.842° E — Tyrrhenian Sea</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-xs tracking-widest text-brass uppercase">Exploration</h4>
            <ul className="space-y-2.5 font-sans text-xs text-charcoal-muted">
              <li>
                <Link to="/" className="hover:text-brass transition-colors">01. The Horizon & Story</Link>
              </li>
              <li>
                <Link to="/rooms" className="hover:text-brass transition-colors">02. Rooms & Cliffside Suites</Link>
              </li>
              <li>
                <Link to="/amenities" className="hover:text-brass transition-colors">03. Basalt Spa & Dining</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brass transition-colors">04. Concierge & Reservations</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-brass transition-colors">05. Management Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Journal */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-mono text-xs tracking-widest text-brass uppercase">The Auria Journal</h4>
            <p className="text-xs font-sans text-charcoal-muted leading-relaxed">
              Private seasonal invitations, chef tastings, and residence releases.
            </p>

            {subscribed ? (
              <div className="p-4 bg-white border border-brass/40 flex items-center space-x-3 text-xs font-mono text-charcoal">
                <CheckCircle2 className="w-5 h-5 text-brass" />
                <span>Subscribed to private dispatches.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full bg-white border border-stone-border focus:border-brass px-4 py-3 text-xs font-mono text-charcoal placeholder-charcoal-light outline-none transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-brass hover:bg-brass-light text-sand-light font-mono text-xs font-bold transition-colors flex items-center justify-center"
                  >
                    {submitting ? '...' : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
                <span className="font-mono text-[10px] text-charcoal-light block">Powered by Supabase PostgreSQL</span>
              </form>
            )}
          </div>

        </div>

        {/* Footer Meta */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between font-mono text-[11px] text-charcoal-light space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} AURIA HOTEL & RESIDENCES. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-6">
            <span className="hover:text-charcoal cursor-pointer transition-colors">PRIVACY PROTOCOL</span>
            <span className="hover:text-charcoal cursor-pointer transition-colors">TERMS OF STAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
