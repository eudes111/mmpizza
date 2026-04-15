import React from 'react';
import { ShoppingCart, Menu, Info, Settings, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  cartCount: number;
}

export const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-brand-yellow font-bold' : 'text-white';

  return (
    <header className="bg-brand-red sticky top-0 z-50 shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-white p-1 rounded-full">
            <span className="text-xl">🍕</span>
          </div>
          <div>
             <h1 className="text-white font-bold text-lg leading-tight">MM Pizza</h1>
             <span className="text-brand-yellow text-xs font-semibold block">Delivery</span>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
           {/* Mobile Call Button */}
           <a href="tel:62985464869" className="bg-white text-brand-red p-2 rounded-full shadow-lg active:scale-95 transition-transform md:hidden">
             <Phone size={20} />
           </a>

          <Link to="/" className={`hidden md:block ${isActive('/')}`}>Cardápio</Link>
          <Link to="/about" className={`hidden md:block ${isActive('/about')}`}>Sobre</Link>
          
          <Link to="/cart" className="relative group">
            <ShoppingCart className="text-white w-7 h-7" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-yellow text-brand-red text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/admin" className="text-white/70 hover:text-white">
            <Settings size={20} />
          </Link>
        </nav>
      </div>
    </header>
  );
};