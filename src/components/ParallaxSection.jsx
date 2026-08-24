import React, { useEffect, useState, useRef } from 'react';

export const ParallaxSection = ({
  children,
  speed = 0.15,
  className = '',
  bgImage = null,
  overlayClass = 'bg-charcoal/50',
  overlayOpacity = 0.5,
}) => {
  const [offsetY, setOffsetY] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrolled = window.scrollY;
        setOffsetY((scrolled - ref.current.offsetTop) * speed);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-75 ease-out scale-110 pointer-events-none"
          style={{
            backgroundImage: `url(${bgImage})`,
            transform: `translateY(${offsetY}px)`,
          }}
        >
          <div
            className={`absolute inset-0 ${overlayClass}`}
            style={{ opacity: overlayOpacity }}
          />
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
