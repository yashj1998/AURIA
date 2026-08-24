import React, { useState, useEffect } from 'react';

export const MinimalLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [slideUp, setSlideUp] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setSlideUp(true), 250);
          setTimeout(() => {
            setHidden(true);
            if (onComplete) onComplete();
          }, 1100);
          return 100;
        }
        return prev + 5;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      aria-label="Loading Auria Hotel"
      className={`fixed inset-0 z-[99999] w-full h-full bg-[#FBF9F5] text-[#1C1D20] flex flex-col justify-between p-8 md:p-16 transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] shadow-2xl ${
        slideUp ? '-translate-y-full pointer-events-none' : 'translate-y-0 pointer-events-auto'
      }`}
      style={{ backgroundColor: '#FBF9F5' }}
    >
      {/* Top Header Row */}
      <div className="w-full flex items-center justify-between font-mono text-[10px] text-[#B8860B] uppercase tracking-widest border-b border-[#E5E0D5] pb-4">
        <span>TYRRHENIAN SANCTUARY</span>
        <span>38.487° N, 14.842° E</span>
      </div>

      {/* Center Minimal Monogram */}
      <div className="flex flex-col items-center justify-center space-y-6 my-auto">
        <div className="w-20 h-20 rounded-full border border-[#B8860B]/40 flex items-center justify-center bg-white shadow-sm">
          <span className="font-display italic text-4xl text-[#B8860B]">A</span>
        </div>

        <div className="text-center space-y-1.5">
          <h1 className="font-display text-4xl tracking-widest text-[#1C1D20]">AURIA</h1>
          <p className="font-mono text-[10px] tracking-widest-2xl text-[#B8860B] uppercase">
            TYRRHENIAN COAST • ITALY
          </p>
        </div>

        {/* Percentage Counter */}
        <div className="pt-4 flex items-center space-x-3 font-mono text-xs text-[#1C1D20]">
          <span className="text-[#686C75] text-[11px] uppercase tracking-wider">LOADING</span>
          <span className="font-bold text-[#B8860B] text-sm font-mono">{progress}%</span>
        </div>
      </div>

      {/* Bottom Horizontal Line Accent */}
      <div className="w-full space-y-2 pt-4 border-t border-[#E5E0D5]">
        <div className="w-full h-[3px] bg-[#E5E0D5] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#B8860B] transition-all duration-100 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between font-mono text-[9px] text-[#686C75] uppercase tracking-widest">
          <span>11 CLIFFSIDE SUITES</span>
          <span>EST. 2026</span>
        </div>
      </div>
    </div>
  );
};
