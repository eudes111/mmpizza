import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';
import { BusinessInfo } from '../types';

interface FooterProps {
  info: BusinessInfo;
}

export const Footer: React.FC<FooterProps> = ({ info }) => {
  return (
    <footer className="bg-brand-dark text-gray-300 py-8 px-4 mt-auto">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-4">{info.name}</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <MapPin className="text-brand-yellow shrink-0 mt-1" size={18} />
              <span className="text-sm">{info.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="text-brand-yellow shrink-0" size={18} />
              <span className="text-sm">{info.phone}</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="text-brand-yellow shrink-0" size={18} />
              <span className="text-sm">{info.hours}</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2">Sobre</h4>
          <p className="text-sm mb-4">
            A melhor pizza da região de Goianésia! Massa fresca, ingredientes selecionados e entrega rápida.
          </p>
          <div className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} MM Pizza Delivery. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};