import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Send, RefreshCw, Play, MessageSquare, Sparkles, Receipt, Printer } from 'lucide-react';
import { FIPES_MENU_CONTEXT, DEMO_SCRIPT } from '../constants';
import { Message } from '../types';

interface ChatSimulatorProps {
  apiKey: string | undefined;
}

const ChatSimulator: React.FC<ChatSimulatorProps> = ({ apiKey }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [mode, setMode] = useState<'auto' | 'interactive'>('auto');
  const [autoStep, setAutoStep] = useState(0);
  const [showTicket, setShowTicket] = useState(false);
  
  // Ref for the scrollable container
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize Chat
  useEffect(() => {
    if (mode === 'interactive' && apiKey && !chatSession) {
      const ai = new GoogleGenAI({ apiKey });
      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: FIPES_MENU_CONTEXT,
        },
      });
      setChatSession(chat);
      setMessages([{
        id: 'init',
        role: 'model',
        text: '¡Hola! 👋 Bienvenido a Fipes, donde nos encanta que comas rico. 🍔🍟 ¿A dónde te llevamos el domicilio hoy en Bucaramanga?',
        timestamp: new Date()
      }]);
    }
  }, [apiKey, mode, chatSession]);

  // Auto-Play Script Logic
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (mode === 'auto' && autoStep < DEMO_SCRIPT.length) {
      timeout = setTimeout(() => {
        const scriptMsg = DEMO_SCRIPT[autoStep];
        setMessages(prev => [
          ...prev, 
          {
            id: `auto-${autoStep}`,
            role: scriptMsg.role as 'user' | 'model',
            text: scriptMsg.text,
            timestamp: new Date()
          }
        ]);
        
        setAutoStep(prev => prev + 1);
      }, autoStep === 0 ? 1000 : 2500); // Initial delay 1s, then 2.5s between messages
    } else if (mode === 'auto' && autoStep === DEMO_SCRIPT.length) {
      // Show ticket after script finishes
      timeout = setTimeout(() => {
        setShowTicket(true);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [mode, autoStep]);

  // Scroll to bottom logic - Targeted to container only
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading, showTicket]);

  const handleSendMessage = async () => {
    if (!input.trim() || !chatSession) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      text: userMsg,
      timestamp: new Date()
    }]);
    setIsLoading(true);

    try {
      const result = await chatSession.sendMessage({ message: userMsg });
      const text = result.text;
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: text,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetDemo = () => {
    setMessages([]);
    setMode('auto');
    setAutoStep(0);
    setShowTicket(false);
  };

  // Custom Markdown Bold Renderer
  const renderText = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold">{part.slice(2, -2)}</strong>;
      }
      return <span key={index} className="whitespace-pre-wrap">{part}</span>;
    });
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Retro Window Frame */}
      <div className="bg-white border-4 border-black rounded-t-xl shadow-card overflow-hidden z-10 relative">
        {/* Window Header */}
        <div className="bg-black p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-fipes-red border border-white/50"></div>
            <div className="w-3 h-3 rounded-full bg-fipes-yellow border border-white/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 border border-white/50"></div>
          </div>
          <div className="font-display text-white tracking-wider text-lg">
            FIPES_BOT_V1.exe
          </div>
          <button onClick={resetDemo} className="text-white hover:text-fipes-yellow transition-colors" title="Reiniciar Demo">
            <RefreshCw size={18} />
          </button>
        </div>

        {/* Chat Area */}
        <div 
          ref={chatContainerRef}
          className="h-[500px] overflow-y-auto p-4 bg-gray-100 scrollbar-hide relative"
        >
          {/* Date separator */}
          <div className="text-center mb-6">
            <span className="bg-gray-300 text-gray-600 text-xs px-2 py-1 rounded-full font-mono">
              {new Date().toLocaleDateString()}
            </span>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-fipes-yellow mr-2 border-2 border-black shrink-0">
                  <Sparkles size={16} />
                </div>
              )}
              
              <div
                className={`max-w-[80%] p-3 rounded-2xl border-2 border-black text-sm font-medium shadow-[2px_2px_0_rgba(0,0,0,0.1)] ${
                  msg.role === 'user'
                    ? 'bg-fipes-red text-white rounded-br-none'
                    : 'bg-white text-black rounded-bl-none'
                }`}
              >
                {renderText(msg.text)}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start mb-4">
               <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-fipes-yellow mr-2 border-2 border-black">
                  <Sparkles size={16} />
                </div>
              <div className="bg-white text-black p-3 rounded-2xl rounded-bl-none border-2 border-black flex gap-1">
                <span className="w-2 h-2 bg-black rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-black rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-black rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          )}
          
          {/* Kitchen Ticket Overlay */}
          {showTicket && (
             <div className="mt-4 mx-4 mb-8 animate-in slide-in-from-bottom-10 fade-in duration-700">
                <div className="bg-white p-0 border-2 border-gray-300 shadow-lg relative font-mono text-xs text-gray-800 max-w-xs mx-auto">
                    {/* Receipt jagged top */}
                    <div className="w-full h-4 bg-gray-100 border-b border-dashed border-gray-300 mb-4 relative overflow-hidden">
                         <div className="absolute -top-2 left-0 right-0 flex justify-between">
                             {[...Array(15)].map((_, i) => (
                                 <div key={i} className="w-4 h-4 bg-white rounded-full -ml-2"></div>
                             ))}
                         </div>
                    </div>
                    
                    <div className="px-6 pb-6 text-center">
                        <div className="flex justify-center mb-2 text-black">
                           <Printer size={24} />
                        </div>
                        <h3 className="font-bold text-lg uppercase border-b-2 border-black pb-2 mb-2">COMANDA COCINA</h3>
                        <div className="text-left space-y-1 mb-4">
                            <p><span className="font-bold">PEDIDO:</span> #FIP-2025</p>
                            <p><span className="font-bold">FECHA:</span> {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
                            <p><span className="font-bold">CANAL:</span> WhatsApp IA</p>
                        </div>
                        
                        <div className="text-left mb-4 border-t border-b border-dashed border-gray-400 py-2">
                            <p className="font-bold mb-1">DATOS CLIENTE (FACTURACIÓN):</p>
                            <p>Juan Pérez</p>
                            <p>CC: 1098765432</p>
                            <p>juan@gmail.com</p>
                            <p className="mt-2"><span className="font-bold">DIRECCIÓN:</span></p>
                            <p>Carrera 33 #48-10, Cabecera</p>
                        </div>

                        <table className="w-full text-left mb-4">
                            <thead>
                                <tr className="border-b border-black">
                                    <th className="py-1">CANT</th>
                                    <th className="py-1">ITEM</th>
                                    <th className="py-1 text-right">VALOR</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-1 align-top">1</td>
                                    <td className="py-1">Hamburguesa Fipes</td>
                                    <td className="py-1 text-right">27.000</td>
                                </tr>
                                <tr>
                                    <td className="py-1 align-top">1</td>
                                    <td className="py-1">Coca Cola 350ml</td>
                                    <td className="py-1 text-right">3.800</td>
                                </tr>
                                <tr>
                                    <td className="py-1 align-top">1</td>
                                    <td className="py-1">Domicilio</td>
                                    <td className="py-1 text-right">3.000</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr className="font-bold border-t-2 border-black text-sm">
                                    <td colSpan={2} className="py-2 text-right pr-2">TOTAL:</td>
                                    <td className="py-2 text-right">$33.800</td>
                                </tr>
                            </tfoot>
                        </table>

                        <div className="text-left border border-black p-2 mb-2">
                             <p className="font-bold">MÉTODO PAGO: NEQUI</p>
                             <p>Estado: Confirmado por IA</p>
                        </div>

                        <div className="text-center text-[10px] uppercase mt-4">
                            *** FIN DE COMANDA ***<br/>
                            Generado por ClonAI
                        </div>
                    </div>
                     {/* Receipt jagged bottom */}
                     <div className="w-full h-2 bg-white relative overflow-hidden">
                          <div className="absolute -bottom-2 left-0 right-0 flex justify-between">
                             {[...Array(15)].map((_, i) => (
                                 <div key={i} className="w-4 h-4 bg-gray-100 rounded-full -ml-2 border border-gray-300"></div>
                             ))}
                         </div>
                     </div>
                </div>
             </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t-4 border-black">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={mode === 'auto' ? "Viendo demostración..." : "Escribe tu pedido..."}
              disabled={mode === 'auto' || isLoading}
              className="flex-1 bg-gray-100 border-2 border-black rounded-lg px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-fipes-yellow disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSendMessage}
              disabled={mode === 'auto' || isLoading || !input.trim()}
              className="bg-fipes-red text-white p-2 rounded-lg border-2 border-black hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-[2px_2px_0_#000] active:shadow-none active:translate-y-[2px] transition-all"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSimulator;