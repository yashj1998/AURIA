import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Compass } from 'lucide-react';

export const GalleryLightbox = ({ images, currentIndex, onClose, onNavigate }) => {
  if (currentIndex === null || currentIndex === undefined) return null;

  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images, onClose, onNavigate]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-basalt/95 backdrop-blur-xl p-4 md:p-8 animate-fadeIn">
      {/* Top Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 text-plaster hover:text-brass transition-colors z-20 focus:outline-none"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Navigation Buttons */}
      <button
        onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-basalt-card/80 border border-brass/30 text-plaster hover:text-brass transition-all duration-300 z-20 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => onNavigate((currentIndex + 1) % images.length)}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-basalt-card/80 border border-brass/30 text-plaster hover:text-brass transition-all duration-300 z-20 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image Container */}
      <div className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center space-y-4">
        <div className="relative overflow-hidden border border-brass/30 shadow-2xl">
          <img
            src={currentImage?.image_url || currentImage?.image}
            alt={currentImage?.title}
            className="max-h-[72vh] max-w-full object-contain"
          />
        </div>

        {/* Image Caption & Ledger Meta */}
        <div className="text-center space-y-1 max-w-xl">
          <span className="font-mono text-[10px] tracking-widest text-brass uppercase block">
            {currentImage?.category} • IMAGE {currentIndex + 1} OF {images.length}
          </span>
          <h3 className="font-display italic text-2xl text-plaster">
            {currentImage?.title}
          </h3>
        </div>
      </div>
    </div>
  );
};
