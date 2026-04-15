import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PizzaBuilder } from './components/PizzaBuilder';
import { Cart } from './components/Cart';
import { AdminPanel } from './components/AdminPanel';
import { Flavor, CartItem, BusinessInfo } from './types';
import { INITIAL_FLAVORS, BUSINESS_INFO } from './constants';
import { Star } from 'lucide-react';

const App: React.FC = () => {
  const [flavors, setFlavors] = useState<Flavor[]>(INITIAL_FLAVORS);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(BUSINESS_INFO);
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (selectedFlavors: Flavor[], observation: string) => {
    const newItem: CartItem = {
      id: Date.now().toString(),
      flavors: selectedFlavors,
      price: businessInfo.basePrice,
      quantity: 1,
      observation
    };
    setCart([...cart, newItem]);
    
    // Simple visual feedback
    const btn = document.createElement('div');
    btn.innerText = "Adicionado ao carrinho!";
    btn.className = "fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-2 rounded-full shadow-xl z-[60] font-bold animate-bounce";
    document.body.appendChild(btn);
    setTimeout(() => btn.remove(), 2000);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-gray-50">
        <Header cartCount={cart.length} />
        
        <main className="flex-grow max-w-4xl mx-auto w-full px-4 pt-6">
          <Routes>
            <Route path="/" element={
              <>
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-black text-brand-red mb-2 uppercase tracking-tight">
                        {businessInfo.name}
                    </h2>
                    <p className="text-gray-500 font-medium flex items-center justify-center gap-1">
                        <Star className="text-brand-yellow fill-brand-yellow" size={16} /> 
                        4.9 • Pizza Delivery em Goianésia
                    </p>
                    <div className="mt-4 inline-block bg-white px-4 py-1 rounded-full text-xs font-bold text-green-600 shadow-sm border border-green-100">
                        🛵 Entrega: {businessInfo.deliveryTime}
                    </div>
                </div>

                <PizzaBuilder 
                  flavors={flavors} 
                  basePrice={businessInfo.basePrice}
                  onAddToCart={handleAddToCart}
                />
              </>
            } />
            
            <Route path="/cart" element={
              <Cart 
                items={cart} 
                onRemove={handleRemoveFromCart}
                businessInfo={businessInfo}
                onClearCart={clearCart}
              />
            } />

            <Route path="/admin" element={
              <AdminPanel 
                businessInfo={businessInfo}
                setBusinessInfo={setBusinessInfo}
                flavors={flavors}
                setFlavors={setFlavors}
              />
            } />

            <Route path="/about" element={
                <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Sobre Nós</h2>
                    <p className="text-gray-600 mb-6">
                        A MM Pizza Delivery nasceu com a missão de trazer o verdadeiro sabor da pizza artesanal para Goianésia.
                        Utilizamos ingredientes frescos, massa preparada diariamente e muito carinho em cada etapa.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-left bg-gray-50 p-6 rounded-lg">
                        <div>
                            <h4 className="font-bold text-gray-800">Endereço</h4>
                            <p className="text-sm text-gray-600">{businessInfo.address}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800">Horário</h4>
                            <p className="text-sm text-gray-600">{businessInfo.hours}</p>
                        </div>
                    </div>
                </div>
            } />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer info={businessInfo} />
      </div>
    </HashRouter>
  );
};

export default App;