import React from 'react';

export const FipesLogo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`font-display text-fipes-yellow text-5xl transform -rotate-3 drop-shadow-[4px_4px_0_rgba(0,0,0,1)] ${className}`}>
    <span className="text-white text-3xl block -mb-2 ml-2">ME GUSTA</span>
    FIPES
    <span className="inline-block ml-2 bg-white text-fipes-red rounded-lg p-1 border-2 border-black text-2xl transform rotate-12">❤️</span>
  </div>
);
