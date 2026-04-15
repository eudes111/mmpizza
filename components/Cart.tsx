import React, { useState } from 'react';
import { CartItem, OrderDetails, BusinessInfo } from '../types';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { formatCurrency, generateWhatsAppLink } from '../utils';
import { Link } from 'react-router-dom';

interface CartProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  businessInfo: BusinessInfo;
  onClearCart: () => void;
}

export const Cart: React.FC<CartProps> = ({ items, onRemove, businessInfo, onClearCart }) => {
  const [details, setDetails] = useState<OrderDetails>({
    customerName: '',
    address: '',
    paymentMethod: 'credit_card',
    changeFor: ''
  });

  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (!details.customerName || !details.address || !details.paymentMethod) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    
    const link = generateWhatsAppLink(businessInfo.whatsappRaw, items, details, total);
    
    // Open WhatsApp
    window.open(link, '_blank');
    
    // Optional: Clear cart after successful send (simulated)
    // onClearCart(); 
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="bg-gray-100 p-6 rounded-full mb-4">
            <ShoppingBag size={48} className="text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Seu carrinho está vazio</h2>
        <p className="text-gray-500 mb-6">Que tal escolher uma pizza deliciosa agora?</p>
        <Link to="/" className="bg-brand-red text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-red-700 transition-colors">
          Ver Cardápio
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <ShoppingBag className="text-brand-red" /> Seu Pedido
      </h2>

      {/* Items List */}
      <div className="space-y-4 mb-8">
        {items.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between gap-4 border-l-4 border-brand-yellow">
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">Pizza Grande (8 Fatias)</h3>
              <p className="text-sm text-gray-600 mt-1">
                {item.flavors.map(f => f.name).join(' / ')}
              </p>
              {item.observation && (
                  <p className="text-xs text-orange-600 mt-2 italic bg-orange-50 p-1 rounded inline-block">
                      Obs: {item.observation}
                  </p>
              )}
              <div className="mt-2 text-brand-red font-bold">{formatCurrency(item.price)}</div>
            </div>
            <button 
              onClick={() => onRemove(item.id)}
              className="text-gray-400 hover:text-red-500 self-center p-2"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Delivery Details Form */}
      <div className="bg-white p-5 rounded-xl shadow-sm mb-6">
        <h3 className="font-bold text-lg mb-4 text-gray-800 border-b pb-2">Entrega e Pagamento</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome *</label>
            <input 
              type="text" 
              className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-brand-yellow outline-none transition-all"
              placeholder="Como podemos te chamar?"
              value={details.customerName}
              onChange={e => setDetails({...details, customerName: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Endereço de Entrega *</label>
            <textarea 
              className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-brand-yellow outline-none transition-all"
              placeholder="Rua, Número, Bairro, Ponto de referência..."
              rows={3}
              value={details.address}
              onChange={e => setDetails({...details, address: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Forma de Pagamento *</label>
            <select 
              className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-brand-yellow outline-none bg-white"
              value={details.paymentMethod}
              onChange={e => setDetails({...details, paymentMethod: e.target.value as any})}
            >
              <option value="credit_card">Cartão (Crédito/Débito)</option>
              <option value="cash">Dinheiro</option>
              <option value="meal_voucher">Vale-Refeição</option>
            </select>
          </div>

          {details.paymentMethod === 'cash' && (
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Troco para quanto?</label>
                <input 
                  type="text" 
                  className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-brand-yellow outline-none"
                  placeholder="Ex: R$ 50,00 ou 'Não precisa'"
                  value={details.changeFor}
                  onChange={e => setDetails({...details, changeFor: e.target.value})}
                />
             </div>
          )}
        </div>
      </div>

      {/* Summary & Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-40 md:static md:bg-transparent md:border-0 md:p-0 md:shadow-none">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4 md:bg-white md:p-4 md:rounded-lg md:shadow-sm">
                <span className="text-gray-600">Tempo estimado:</span>
                <span className="font-bold text-gray-800">{businessInfo.deliveryTime}</span>
            </div>
            <button 
                onClick={handleCheckout}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:bg-green-700 active:scale-95 transition-all"
            >
                <span>Enviar Pedido no WhatsApp</span>
                <span className="bg-green-800 px-2 py-1 rounded text-sm">
                    {formatCurrency(total)}
                </span>
                <ArrowRight size={20} />
            </button>
          </div>
      </div>
    </div>
  );
};