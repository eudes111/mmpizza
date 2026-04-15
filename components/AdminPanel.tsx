import React from 'react';
import { Flavor, BusinessInfo } from '../types';
import { SUGGESTED_DOMAINS, SUGGESTED_SLOGANS } from '../constants';

interface AdminPanelProps {
  businessInfo: BusinessInfo;
  setBusinessInfo: React.Dispatch<React.SetStateAction<BusinessInfo>>;
  flavors: Flavor[];
  setFlavors: React.Dispatch<React.SetStateAction<Flavor[]>>;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  businessInfo, 
  setBusinessInfo, 
  flavors, 
  setFlavors 
}) => {
  
  const toggleFlavorActive = (id: string) => {
    setFlavors(prev => prev.map(f => f.id === id ? { ...f, active: !f.active } : f));
  };

  const updatePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      setBusinessInfo(prev => ({ ...prev, basePrice: val }));
    }
  };

  return (
    <div className="pb-10">
      <div className="bg-gray-800 text-white p-6 rounded-xl mb-6">
        <h2 className="text-2xl font-bold mb-2">Painel Administrativo</h2>
        <p className="text-gray-400 text-sm">Gerencie seu cardápio e configurações básicas.</p>
      </div>

      {/* Price Config */}
      <section className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <h3 className="font-bold text-lg mb-4 text-gray-800">Preço Base (Pizza Grande)</h3>
        <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-500">R$</span>
            <input 
                type="number" 
                value={businessInfo.basePrice} 
                onChange={updatePrice}
                className="border p-2 rounded text-xl font-bold w-32 focus:ring-2 focus:ring-brand-red outline-none"
            />
        </div>
      </section>

      {/* Flavors Config */}
      <section className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <h3 className="font-bold text-lg mb-4 text-gray-800">Gerenciar Sabores</h3>
        <div className="space-y-3">
            {flavors.map(flavor => (
                <div key={flavor.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div>
                        <p className={`font-bold ${!flavor.active && 'text-gray-400 line-through'}`}>{flavor.name}</p>
                        <p className="text-xs text-gray-500 truncate max-w-[200px]">{flavor.ingredients}</p>
                    </div>
                    <button 
                        onClick={() => toggleFlavorActive(flavor.id)}
                        className={`px-3 py-1 rounded-full text-sm font-bold transition-colors ${
                            flavor.active 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                    >
                        {flavor.active ? 'Ativo' : 'Inativo'}
                    </button>
                </div>
            ))}
        </div>
      </section>

      {/* Generated Suggestions */}
      <section className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-6">
        <h3 className="font-bold text-lg mb-4 text-blue-800">Sugestões da IA (Domínios & Slogans)</h3>
        
        <div className="mb-4">
            <h4 className="font-bold text-sm text-blue-600 mb-2 uppercase">Domínios Disponíveis</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {SUGGESTED_DOMAINS.map(d => <li key={d} className="font-mono">{d}</li>)}
            </ul>
        </div>

        <div>
            <h4 className="font-bold text-sm text-blue-600 mb-2 uppercase">Slogans Criativos</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 italic">
                {SUGGESTED_SLOGANS.map(s => <li key={s}>"{s}"</li>)}
            </ul>
        </div>
      </section>
      
      <div className="text-center text-gray-500 text-xs mt-8">
        <p>Versão 1.0.0 - MM Pizza Delivery System</p>
      </div>
    </div>
  );
};