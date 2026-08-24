import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { MinimalLoader } from './components/MinimalLoader';
import { CustomCursor } from './components/CustomCursor';
import { HorizonLine } from './components/HorizonLine';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { Home } from './pages/Home';
import { Rooms } from './pages/Rooms';
import { Amenities } from './pages/Amenities';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';

// Scroll To Top on Route Navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <BookingProvider>
      <CustomCursor />

      {/* Curtain Slide-Up Preloader */}
      <MinimalLoader onComplete={() => setLoadingComplete(true)} />

      <ScrollToTop />
      <HorizonLine />
      <Navbar />
      {/* Main Page Reveal Container */}
      <div
        className={`min-h-screen flex flex-col transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${loadingComplete
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-12 scale-[0.98]'
          }`}
      >
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/amenities" element={<Amenities />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
      <BookingModal />
      <Footer />
    </BookingProvider>
  );
}
