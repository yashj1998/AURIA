import React, { useEffect, useState } from 'react';

export const HorizonLine = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;

      if (documentHeight > 0) {
        setScrollPercentage((scrolled / documentHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-basalt overflow-hidden pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-brass via-brass-light to-brass transition-all duration-150 ease-out shadow-[0_0_10px_#A9834B]"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
};
