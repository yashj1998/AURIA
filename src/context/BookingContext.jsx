import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabaseService, isSupabaseConfigured } from '../lib/supabase';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [checkIn, setCheckIn] = useState('2026-09-10');
  const [checkOut, setCheckOut] = useState('2026-09-14');
  const [guests, setGuests] = useState(2);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // App data state loaded from Supabase
  const [rooms, setRooms] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [roomsData, amenitiesData, galleryData, testimonialsData] = await Promise.all([
          supabaseService.getRooms(),
          supabaseService.getAmenities(),
          supabaseService.getGallery(),
          supabaseService.getTestimonials(),
        ]);
        setRooms(roomsData);
        setAmenities(amenitiesData);
        setGallery(galleryData);
        setTestimonials(testimonialsData);
      } catch (err) {
        console.error('Error fetching initial hotel data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const openBookingModal = (room = null) => {
    if (room) setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
  };

  return (
    <BookingContext.Provider
      value={{
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        guests,
        setGuests,
        selectedRoom,
        setSelectedRoom,
        isModalOpen,
        openBookingModal,
        closeBookingModal,
        rooms,
        amenities,
        gallery,
        testimonials,
        loading,
        showToast,
        isSupabaseConfigured,
      }}
    >
      {children}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className={`px-6 py-4 rounded-none border shadow-2xl flex items-center space-x-3 text-sm font-mono tracking-wide ${
            toastMessage.type === 'success'
              ? 'bg-basalt-card border-brass text-plaster'
              : 'bg-ember border-red-500 text-white'
          }`}>
            <span className="w-2 h-2 rounded-full bg-brass animate-ping" />
            <span>{toastMessage.message}</span>
          </div>
        </div>
      )}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
