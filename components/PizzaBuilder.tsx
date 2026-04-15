import React, { useState } from 'react';
import { Flavor } from '../types';
import { Plus, Check, Info } from 'lucide-react';
import { formatCurrency } from '../utils';

interface PizzaBuilderProps {
  flavors: Flavor[];
  basePrice: number;
  onAddToCart: (selectedFlavors: Flavor[], observation: string) => void;
}

export const PizzaBuilder: React.FC<PizzaBuilderProps> = ({ flavors, basePrice, onAddToCart }) => {
  const [selectedFlavors, setSelectedFlavors] = useState<Flavor[]>([]);
  const [observation, setObservation] = useState('');

  const toggleFlavor = (flavor: Flavor) => {
    if (selectedFlavors.find(f => f.id === flavor.id)) {
      setSelectedFlavors(prev => prev.filter(f => f.id !== flavor.id));
    } else {
      if (selectedFlavors.length < 2) {
        setSelectedFlavors(prev => [...prev, flavor]);
      } else {
        // Replace the oldest selection if trying to add a 3rd (UX choice: prevent or replace. Let's prevent)
        alert("Você só pode escolher até 2 sabores!");
      }
    }
  };

  const handleAdd = () => {
    if (selectedFlavors.length === 0) return;
    onAddToCart(selectedFlavors, observation);
    setSelectedFlavors([]);
    setObservation('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeFlavors = flavors.filter(f => f.active);

  return (
    <div className="pb-24">
      {/* Product Hero */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="aspect-video w-full rounded-lg bg-orange-100 mb-4 overflow-hidden relative">
            <img 
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1000" 
                alt="Pizza Grande"
                className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-brand-yellow text-brand-dark px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                8 Fatias
            </div>
        </div>
        <div className="flex justify-between items-start">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Pizza Grande</h2>
                <p className="text-gray-500 text-sm mt-1">Escolha até 2 sabores. Massa artesanal e ingredientes frescos.</p>
            </div>
            <div className="text-xl font-bold text-brand-red">
                {formatCurrency(basePrice)}
            </div>
        </div>
      </div>

      {/* Flavor Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center justify-between">
            Escolha os Sabores
            <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {selectedFlavors.length}/2 selecionados
            </span>
        </h3>
        
        <div className="space-y-3">
          {activeFlavors.map(flavor => {
            const isSelected = selectedFlavors.some(f => f.id === flavor.id);
            return (
              <div 
                key={flavor.id}
                onClick={() => toggleFlavor(flavor)}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer relative overflow-hidden ${
                  isSelected 
                    ? 'border-brand-red bg-red-50' 
                    : 'border-transparent bg-white shadow-sm hover:border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start">
                    <div className="pr-8">
                        <h4 className={`font-bold ${isSelected ? 'text-brand-red' : 'text-gray-800'}`}>
                            {flavor.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                            {flavor.ingredients}
                        </p>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                        isSelected ? 'bg-brand-red border-brand-red text-white' : 'border-gray-300'
                    }`}>
                        {isSelected && <Check size={14} />}
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Observation */}
      <div className="mb-6 bg-white p-4 rounded-xl shadow-sm">
          <label className="block text-sm font-bold text-gray-700 mb-2">Alguma observação?</label>
          <textarea
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            placeholder="Ex: Sem cebola, bem assada, cortar em aperitivo..."
            className="w-full border-gray-300 rounded-lg text-sm focus:ring-brand-red focus:border-brand-red p-2 border"
            rows={2}
          />
      </div>

      {/* Sticky Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 md:static md:bg-transparent md:border-0 md:shadow-none md:p-0">
         <button
            onClick={handleAdd}
            disabled={selectedFlavors.length === 0}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors max-w-4xl mx-auto ${
                selectedFlavors.length > 0 
                ? 'bg-brand-red text-white shadow-lg hover:bg-red-700' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
         >
            <Plus size={24} />
            Adicionar ao Carrinho • {formatCurrency(basePrice)}
         </button>
      </div>
    </div>
  );
};