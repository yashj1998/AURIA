import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Eye } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { GalleryLightbox } from '../components/GalleryLightbox';
import { ParallaxSection } from '../components/ParallaxSection';

export const Amenities = () => {
  const { amenities, gallery } = useBooking();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = ['ALL', 'Architecture', 'Suites', 'Dining', 'Wellness'];

  const filteredGallery = activeCategory === 'ALL'
    ? gallery
    : gallery.filter((item) => item.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="pt-28 pb-28 space-y-20 bg-sand min-h-screen">
      
      {/* Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-6 space-y-3">
        <div className="flex items-center space-x-2 font-mono text-xs text-brass uppercase tracking-widest">
          <Link to="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span className="text-charcoal">Amenities & Gallery</span>
        </div>

        <h1 className="font-display italic text-5xl md:text-6xl text-charcoal">
          Healing Waters, Thermal Grottos & Gastronomy
        </h1>

        <p className="font-sans text-xs md:text-sm text-charcoal-muted max-w-xl">
          Integrated directly into volcanic basalt. Infinity ocean pools, thermal steam caves, and private yacht transfers.
        </p>
      </section>

      {/* Signature Spreads */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">
        {amenities.map((item, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={item.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Media with Parallax */}
              <div className={`lg:col-span-7 relative overflow-hidden border border-stone-border shadow-card-light ${
                isEven ? 'lg:order-1' : 'lg:order-2'
              }`}>
                <ParallaxSection speed={0.12} className="aspect-[16/10] bg-sand-card overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </ParallaxSection>
                <div className="absolute top-4 left-4 font-mono text-[10px] text-brass uppercase bg-white/90 px-3 py-1 border border-stone-border font-bold">
                  LEDGER NO. {item.ledger_num}
                </div>
              </div>

              {/* Text */}
              <div className={`lg:col-span-5 space-y-4 ${
                isEven ? 'lg:order-2' : 'lg:order-1'
              }`}>
                <span className="font-mono text-xs tracking-widest-2xl text-brass uppercase block">
                  {item.category}
                </span>
                <h2 className="font-display italic text-3xl md:text-4xl text-charcoal">
                  {item.title}
                </h2>
                <p className="font-sans text-xs text-charcoal-muted leading-relaxed">
                  {item.description}
                </p>

                <div className="space-y-2 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center space-x-2 font-sans text-xs text-charcoal bg-white p-2.5 border border-stone-border">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brass" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Interactive Photo Gallery */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-10 border-t border-stone-border pt-16">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="font-mono text-xs tracking-widest-2xl text-brass uppercase block">Visual Journal</span>
            <h2 className="font-display italic text-4xl md:text-5xl text-charcoal">
              Photographic Exploration
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-xs uppercase px-4 py-2 border transition-all ${
                  activeCategory === cat
                    ? 'bg-brass text-sand-light border-brass font-bold'
                    : 'bg-white text-charcoal-muted border-stone-border hover:text-charcoal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredGallery.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className={`group relative overflow-hidden border border-stone-border cursor-pointer shadow-card-light ${item.span_class || 'col-span-1'}`}
            >
              <div className="aspect-[4/3] bg-sand-card overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div>
                  <span className="font-mono text-[10px] text-brass uppercase block">{item.category}</span>
                  <h4 className="font-display italic text-xl text-white">{item.title}</h4>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/90 border border-stone-border flex items-center justify-center text-brass">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Lightbox */}
      <GalleryLightbox
        images={filteredGallery}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

    </div>
  );
};
