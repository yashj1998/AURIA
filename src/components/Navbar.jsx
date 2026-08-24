import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowDown, ChevronDown } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const location = useLocation();
  const { openBookingModal, isSupabaseConfigured } = useBooking();
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (name) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileExpand = (name) => {
    setMobileExpanded(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const navLinks = [
    { 
      name: 'HOME', 
      path: '/' 
    },
    { 
      name: 'ROOMS & SUITES', 
      path: '/rooms',
      dropdown: [
        { title: 'Deluxe Ocean Suite', path: '/rooms' },
        { title: 'Presidential Penthouse', path: '/rooms' },
        { title: 'Royal Sunset Villa', path: '/rooms' },
        { title: 'View All Accommodations', path: '/rooms' },
      ]
    },
    { 
      name: 'AMENITIES & GALLERY', 
      path: '/amenities',
      dropdown: [
        { title: 'Infinity Pool & Spa', path: '/amenities' },
        { title: 'Michelin Fine Dining', path: '/amenities' },
        { title: 'Private Beach Club', path: '/amenities' },
        { title: 'Full Photo Gallery', path: '/amenities' },
      ]
    },
    { 
      name: 'RESERVATIONS', 
      path: '/contact' 
    },
    { 
      name: 'CONCIERGE PORTAL', 
      path: '/admin',
      dropdown: [
        { title: 'VIP Butler Service', path: '/contact' },
        { title: 'Staff & Admin Portal', path: '/admin' },
        { title: 'Live Reservations Manager', path: '/admin' },
      ]
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-charcoal/95 backdrop-blur-md py-3 shadow-xl border-b border-stone-border/20'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 md:py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 xl:gap-4">
        
        {/* Brand Logo */}
        <Link to="/" className="group flex items-center space-x-2.5 sm:space-x-3 shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-brass/60 flex items-center justify-center bg-black/40 backdrop-blur-md shrink-0">
            <span className="font-display italic text-lg sm:text-xl text-brass font-bold">A</span>
          </div>
          <div className="whitespace-nowrap">
            <span className="font-sans font-extrabold text-lg sm:text-xl md:text-2xl tracking-widest text-white block leading-none drop-shadow-md">AURIA</span>
            <span className="font-mono text-[8px] sm:text-[9px] tracking-widest-2xl text-brass uppercase font-bold block mt-0.5">Tyrrhenian Coast</span>
          </div>
        </Link>

        {/* Desktop Navigation Links (Visible on XL screens: 1280px+) */}
        <nav className="hidden xl:flex items-center space-x-4 2xl:space-x-7 shrink">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const hasDropdown = link.dropdown && link.dropdown.length > 0;
            const isDropdownOpen = activeDropdown === link.name;

            return (
              <div 
                key={link.name} 
                className="relative group py-2"
                onMouseEnter={() => hasDropdown && handleMouseEnter(link.name)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center space-x-1">
                  <Link
                    to={link.path}
                    className={`font-mono text-[11px] 2xl:text-xs tracking-wider 2xl:tracking-widest uppercase transition-colors relative py-1 drop-shadow-md whitespace-nowrap flex items-center ${
                      isActive ? 'text-brass font-bold' : 'text-white font-bold hover:text-brass'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brass shadow-[0_0_8px_#B8860B]" />
                    )}
                  </Link>

                  {hasDropdown && (
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveDropdown(isDropdownOpen ? null : link.name);
                      }}
                      className="text-white/70 hover:text-brass transition-colors p-0.5 focus:outline-none"
                    >
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-brass' : ''}`} />
                    </button>
                  )}
                </div>

                {/* Dropdown Menu Container */}
                {hasDropdown && (
                  <div
                    className={`absolute top-full left-0 w-56 pt-2 transition-all duration-300 transform ${
                      isDropdownOpen 
                        ? 'opacity-100 translate-y-0 pointer-events-auto' 
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="bg-charcoal/95 backdrop-blur-xl border border-brass/30 shadow-2xl rounded-sm p-3 space-y-1">
                      <div className="text-[9px] font-mono tracking-widest text-brass/80 uppercase px-3 py-1 font-bold border-b border-brass/10 mb-1">
                        Explore
                      </div>
                      {link.dropdown.map((subItem, idx) => (
                        <Link
                          key={idx}
                          to={subItem.path}
                          onClick={() => setActiveDropdown(null)}
                          className="block px-3 py-2 text-xs font-mono tracking-wider text-white/90 hover:text-brass hover:bg-white/5 rounded transition-all duration-200 whitespace-nowrap"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Action Container (Badge & Reserve Button) */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          <div
            title={isSupabaseConfigured ? 'Connected to live Supabase database' : 'Running in Standalone Fallback mode'}
            className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 border border-white/20 bg-black/40 backdrop-blur-md text-[9px] sm:text-[10px] font-mono tracking-wider text-white font-bold shadow-md whitespace-nowrap shrink-0"
          >
            <span className={`w-2 h-2 rounded-full shrink-0 ${isSupabaseConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-brass'}`} />
            <span>{isSupabaseConfigured ? 'SUPABASE LIVE' : 'SUPABASE MOCK'}</span>
          </div>

          <button
            onClick={() => openBookingModal()}
            className="px-3 sm:px-4 xl:px-5 py-2 sm:py-2.5 bg-brass hover:bg-brass-light text-sand-light font-mono text-[10px] sm:text-xs tracking-wider xl:tracking-widest uppercase font-bold transition-all duration-300 flex items-center space-x-1.5 sm:space-x-2 shadow-brass-glow border border-brass/50 whitespace-nowrap shrink-0"
          >
            <span>RESERVE SUITE</span>
            <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>

          {/* Mobile/Tablet Hamburger Menu Button (Visible below XL screens: < 1280px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-white hover:text-brass transition-colors focus:outline-none shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-charcoal/95 backdrop-blur-xl border-t border-stone-border/20 px-6 py-6 mt-3 space-y-4 animate-fadeIn max-h-[85vh] overflow-y-auto">
          <div className="space-y-3">
            {navLinks.map((link) => {
              const hasDropdown = link.dropdown && link.dropdown.length > 0;
              const isExpanded = mobileExpanded[link.name];

              return (
                <div key={link.name} className="border-b border-stone-border/20 pb-2">
                  <div className="flex items-center justify-between py-1">
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`font-mono text-xs tracking-widest uppercase whitespace-nowrap ${
                        location.pathname === link.path ? 'text-brass font-bold' : 'text-white/90'
                      }`}
                    >
                      {link.name}
                    </Link>
                    {hasDropdown && (
                      <button
                        onClick={() => toggleMobileExpand(link.name)}
                        className="p-1 text-brass focus:outline-none"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>

                  {hasDropdown && isExpanded && (
                    <div className="pl-4 py-2 space-y-2 border-l border-brass/30 mt-1">
                      {link.dropdown.map((sub, idx) => (
                        <Link
                          key={idx}
                          to={sub.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block font-mono text-[11px] text-white/70 hover:text-brass py-1 tracking-wider"
                        >
                          • {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }}
              className="w-full py-3 bg-brass text-sand-light font-mono text-xs tracking-widest uppercase font-bold flex items-center justify-center space-x-2"
            >
              <span>Reserve Suite ↓</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
