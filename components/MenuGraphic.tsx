import React from 'react';

export const MenuGraphic: React.FC = () => {
  return (
    <div className="relative w-full max-w-sm mx-auto rotate-3 hover:rotate-0 transition-transform duration-300">
      {/* Top Tape */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-yellow-200/80 z-10 rotate-2"></div>
      
      <div className="bg-white border-4 border-black p-6 shadow-card relative">
        <div className="absolute top-2 right-2 w-12 h-12 bg-fipes-red rounded-full border-2 border-black flex items-center justify-center z-20 animate-pulse">
            <span className="font-display text-white text-sm transform -rotate-12">NEW!</span>
        </div>

        <h3 className="font-display text-4xl text-center mb-4 text-fipes-red underline decoration-4 decoration-fipes-yellow underline-offset-4">
          MENU FIPES
        </h3>
        
        <div className="space-y-4 font-body text-black">
          <div className="flex justify-between items-center border-b-2 border-dashed border-gray-300 pb-2">
            <div>
                <span className="font-black text-xl block">HAMBURGUESA FIPES</span>
                <span className="text-xs text-gray-600">Pollo, Jamón, Mozzarella</span>
            </div>
            <div className="font-display text-2xl bg-black text-white px-2 py-1 transform -rotate-2 rounded">
                $27K
            </div>
          </div>

          <div className="flex justify-between items-center border-b-2 border-dashed border-gray-300 pb-2">
            <div>
                <span className="font-black text-xl block">PERRO CALIENTE</span>
                <span className="text-xs text-gray-600">El clásico con todo</span>
            </div>
            <div className="font-display text-2xl text-black">
                $20K
            </div>
          </div>

          <div className="flex justify-between items-center border-b-2 border-dashed border-gray-300 pb-2">
            <div>
                <span className="font-black text-xl block">DESGRANADO</span>
                <span className="text-xs text-gray-600">Maíz, lomito, pollo, queso...</span>
            </div>
            <div className="font-display text-2xl text-black">
                $22K
            </div>
          </div>
        </div>

        <div className="mt-6 bg-fipes-yellow border-2 border-black p-3 text-center transform rotate-1">
            <p className="font-display text-xl">¡PIDELOS AL DM!</p>
            <p className="text-xs font-bold">Tu clon IA atiende 24/7</p>
        </div>
      </div>
    </div>
  );
};