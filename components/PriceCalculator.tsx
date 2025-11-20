import React, { useState } from 'react';
import { PROPOSAL_DATA } from '../constants';
import { Calculator, CheckCircle, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const PriceCalculator: React.FC = () => {
  const [orderCount, setOrderCount] = useState(350); // Default to show some extra cost

  const calculateCost = (orders: number) => {
    if (orders <= PROPOSAL_DATA.pricing.includedOrders) {
      return PROPOSAL_DATA.pricing.baseFee;
    }
    const extraOrders = orders - PROPOSAL_DATA.pricing.includedOrders;
    return PROPOSAL_DATA.pricing.baseFee + (extraOrders * PROPOSAL_DATA.pricing.variableFee);
  };

  const totalCost = calculateCost(orderCount);
  const costPerOrder = Math.round(totalCost / orderCount);

  const chartData = [
    { name: 'Mesero Humano', value: 1300000, fill: '#1A1A1A' }, // Approx min wage + carga prestacional
    { name: 'ClonAI (Fipes)', value: totalCost, fill: '#FFD600' },
  ];

  return (
    <div className="bg-white border-4 border-black rounded-3xl p-6 shadow-card w-full">
      <div className="flex items-center gap-3 mb-6 border-b-4 border-fipes-yellow pb-4">
        <Calculator className="w-8 h-8 text-fipes-red" />
        <h2 className="font-display text-3xl text-black">Calculadora de Ahorro</h2>
      </div>

      {/* Slider */}
      <div className="mb-8">
        <label className="font-display text-xl mb-2 block">
          ¿Cuántos domicilios esperas al mes?
        </label>
        <div className="flex items-center gap-4 mb-2">
          <span className="font-bold text-lg">100</span>
          <input
            type="range"
            min="100"
            max="1000"
            step="10"
            value={orderCount}
            onChange={(e) => setOrderCount(Number(e.target.value))}
            className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer border-2 border-black accent-fipes-red"
          />
          <span className="font-bold text-lg">1000</span>
        </div>
        <div className="text-center font-display text-5xl text-fipes-red drop-shadow-[2px_2px_0_rgba(0,0,0,1)] mt-4">
          {orderCount} <span className="text-2xl text-black">Pedidos</span>
        </div>
      </div>

      {/* Pricing Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-fipes-blue/20 p-4 rounded-xl border-2 border-black">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <TrendingUp size={20} /> Tu Inversión:
          </h3>
          <div className="text-4xl font-display text-black mb-1">
            ${totalCost.toLocaleString()} COP
          </div>
          <p className="text-sm text-gray-600 font-bold">
            (~${costPerOrder.toLocaleString()} COP por pedido)
          </p>
          <ul className="mt-4 space-y-2 text-sm font-medium">
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-fipes-red" />
              Base: $400,000 (Inc. {PROPOSAL_DATA.pricing.includedOrders} pedidos)
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-fipes-red" />
              Extras: {(orderCount > PROPOSAL_DATA.pricing.includedOrders ? orderCount - PROPOSAL_DATA.pricing.includedOrders : 0)} x ${PROPOSAL_DATA.pricing.variableFee}
            </li>
          </ul>
        </div>

        <div className="h-48 md:h-auto bg-white rounded-xl border-2 border-black p-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" tick={{fontSize: 10, fontWeight: 800}} />
              <YAxis hide />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{border: '2px solid black', borderRadius: '8px', boxShadow: '4px 4px 0 black'}}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Costo']}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={60}>
                 {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} stroke="black" strokeWidth={2} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="mt-6 bg-fipes-yellow p-4 rounded-xl border-2 border-black text-center shadow-retro animate-pulse">
        <p className="font-display text-xl">
          ¡Ahorras ${(1300000 - totalCost).toLocaleString()} COP vs. Un empleado!
        </p>
      </div>
    </div>
  );
};

export default PriceCalculator;