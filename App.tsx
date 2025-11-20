import React from 'react';
import { FipesLogo } from './components/FipesLogo';
import ChatSimulator from './components/ChatSimulator';
import PriceCalculator from './components/PriceCalculator';
import { MenuGraphic } from './components/MenuGraphic';
import { Star, Zap, Clock, DollarSign, ChefHat, MessageCircle, CheckCircle, ShieldCheck, BarChart3, Globe, Server, FileText } from 'lucide-react';

function App() {
  const apiKey = process.env.API_KEY;
  const whatsappLink = "https://wa.me/573012463004?text=Hola%20ClonAI,%20me%20interesa%20activar%20la%20propuesta%20comercial%20para%20Fipes.";

  return (
    <div className="min-h-screen font-sans text-black pb-20 overflow-x-hidden">
      
      {/* Header Hero */}
      <header className="relative pt-12 pb-32 px-4 text-center overflow-hidden">
        {/* Decorative floating elements */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-fipes-yellow rounded-full border-4 border-black hidden md:block animate-bounce"></div>
        <div className="absolute top-20 right-20 w-12 h-32 bg-fipes-blue rotate-12 border-4 border-black hidden md:block"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-white px-6 py-2 rounded-full border-2 border-black shadow-retro mb-6 inline-block transform -rotate-2">
            <span className="font-bold text-sm tracking-widest">PROPUESTA COMERCIAL EXCLUSIVA</span>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8 mb-6 flex-col md:flex-row">
             <h1 className="font-display text-6xl md:text-8xl text-white drop-shadow-[6px_6px_0_#000]">
              CLONAI
            </h1>
            <span className="text-4xl md:text-6xl font-display text-black">X</span>
            <FipesLogo />
          </div>

          <p className="text-xl md:text-2xl font-body text-white font-bold max-w-2xl mx-auto leading-tight drop-shadow-md">
            Automatiza tus pedidos con Inteligencia Artificial.<br/>
            <span className="text-fipes-yellow bg-black px-2 transform rotate-1 inline-block mt-2 border-2 border-white">
              De la conversación a la cocina sin errores. 🚀
            </span>
          </p>
        </div>

        <svg className="absolute bottom-0 left-0 w-full h-24 text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
           <path fill="currentColor" fillOpacity="1" d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </header>

      <main className="container mx-auto px-4 -mt-16 relative z-20">
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Interactive Demo */}
          <div className="order-2 lg:order-1">
            <div className="sticky top-8">
              <div className="absolute -top-6 -right-6 z-30">
                 <div className="bg-fipes-yellow text-black font-display text-xl px-4 py-2 rounded-xl border-4 border-black shadow-retro transform rotate-6 animate-pulse">
                    ¡MIRA COMO FUNCIONA! 👇
                 </div>
              </div>
              
              <ChatSimulator apiKey={apiKey} />
              
              {/* Menu Graphic Decoration */}
              <div className="mt-12 hidden md:block">
                <MenuGraphic />
              </div>
            </div>
          </div>

          {/* Right: The Pitch & Calculator */}
          <div className="order-1 lg:order-2 space-y-12">
            
            {/* Feature Grid */}
            <div className="bg-white p-6 rounded-3xl border-4 border-black shadow-card">
              <h3 className="font-display text-3xl mb-6 text-center underline decoration-fipes-red decoration-4">CAPACIDADES DE CLONAI</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border-2 border-black">
                    <div className="bg-fipes-red p-2 rounded-lg text-white border border-black"><ChefHat size={20}/></div>
                    <div>
                      <h4 className="font-bold font-display text-lg">Directo a Cocina</h4>
                      <p className="text-xs leading-tight">Entrega la comanda lista. Reduce errores de digitación al 0%.</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border-2 border-black">
                    <div className="bg-fipes-yellow p-2 rounded-lg text-black border border-black"><Clock size={20}/></div>
                    <div>
                      <h4 className="font-bold font-display text-lg">24/7 Sin Descanso</h4>
                      <p className="text-xs leading-tight">Atiende a las 3 AM o domingos festivos con la misma energía.</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border-2 border-black">
                    <div className="bg-blue-400 p-2 rounded-lg text-white border border-black"><FileText size={20}/></div>
                    <div>
                      <h4 className="font-bold font-display text-lg">Recopilación Datos</h4>
                      <p className="text-xs leading-tight">Solicita NIT, Correo y Nombre para que factures sin pedir datos extra.</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border-2 border-black">
                    <div className="bg-green-400 p-2 rounded-lg text-white border border-black"><Globe size={20}/></div>
                    <div>
                      <h4 className="font-bold font-display text-lg">Cobertura Real</h4>
                      <p className="text-xs leading-tight">Calcula costos de domicilio según la zona en Bucaramanga.</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* The Offer */}
            <div className="bg-white rounded-3xl border-4 border-black overflow-hidden shadow-card relative group">
               <div className="bg-black text-white text-center py-3 font-display text-2xl tracking-widest border-b-4 border-black">
                 OFERTA PARA FIPES
               </div>
               <div className="p-8 text-center">
                 <div className="flex items-center justify-center gap-2 mb-2">
                   <span className="text-gray-400 line-through font-display text-2xl">$1.300.000</span>
                   <span className="bg-fipes-yellow px-2 py-1 rounded border-2 border-black font-bold text-xs transform -rotate-3">AHORRA 70%</span>
                 </div>
                 <h2 className="font-display text-6xl text-fipes-red drop-shadow-[3px_3px_0_#000] mb-2">
                   $400.000
                 </h2>
                 <p className="font-bold text-black text-xl mb-6 font-body">Pesos / Mes</p>
                 
                 <div className="space-y-4 text-left bg-[#fffdf5] p-6 rounded-xl border-2 border-black mb-6 shadow-retro">
                    <div className="flex justify-between items-center font-bold text-lg border-b-2 border-dashed border-gray-300 pb-2">
                      <span className="flex items-center gap-2"><Server size={18}/> Base Incluye</span>
                      <span className="text-fipes-red font-display text-2xl">200 PEDIDOS</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-gray-600">🚀 Del pedido 201 en adelante</span>
                      <span className="font-bold text-black bg-fipes-yellow px-2 border border-black rounded shadow-[2px_2px_0_#000]">$1.200 / pedido</span>
                    </div>
                 </div>

                 <div className="text-xs text-gray-500 mb-6 bg-gray-100 p-3 rounded border border-gray-300">
                    <strong className="text-black">Términos:</strong> El primer mes se paga completo ($400.000) cubriendo la <span className="underline decoration-fipes-red">implementación y personalización</span> del agente, independientemente del volumen de operación inicial.
                 </div>

                 <a href={whatsappLink} target="_blank" rel="noreferrer" className="w-full bg-fipes-red text-white font-display text-3xl py-4 rounded-xl border-4 border-black shadow-retro hover:bg-red-600 hover:translate-y-1 hover:shadow-retro-hover transition-all flex items-center justify-center gap-3">
                   <span>¡ACTIVAR AHORA!</span>
                   <Zap className="fill-yellow-300 text-yellow-300" />
                 </a>
               </div>
            </div>

            {/* Calculator */}
            <PriceCalculator />
            
          </div>
        </div>
      </main>

      <footer className="mt-24 bg-black py-12 border-t-8 border-fipes-yellow">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-4xl text-white mb-8">¿Listos para automatizar FIPES?</h2>
          <div className="flex flex-col md:flex-row justify-center gap-6">
             <a href={whatsappLink} target="_blank" rel="noreferrer" className="bg-white text-black px-8 py-4 rounded-full font-bold border-4 border-fipes-blue hover:bg-fipes-blue transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0_#fff]">
               <MessageCircle />
               Hablar con un Humano
             </a>
             <a href="https://www.clonai.co" target="_blank" className="bg-fipes-yellow text-black px-8 py-4 rounded-full font-bold border-4 border-white hover:bg-yellow-400 transition-colors shadow-[4px_4px_0_#fff]">
               Ver Más en ClonAI.co
             </a>
          </div>
          <div className="mt-12 text-gray-500 font-body text-sm">
            © {new Date().getFullYear()} ClonAI para Fipes. Hecho con ❤️ y mucha 🍔.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;