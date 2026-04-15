import { BusinessInfo, Flavor } from './types';

export const BUSINESS_INFO: BusinessInfo = {
  name: "MM Pizza Delivery",
  phone: "(62) 98546-4869",
  whatsappRaw: "5562985464869",
  email: "pimy41834@gmail.com",
  address: "Rua 32 nº 31-B, Setor Oeste – Jatinha da Rosinha, Goianésia",
  hours: "18:00 às 00:00",
  deliveryTime: "40 a 60 minutos",
  basePrice: 25.00
};

export const INITIAL_FLAVORS: Flavor[] = [
  {
    id: '1',
    name: 'Calabresa',
    ingredients: 'Molho, mussarela, calabresa, cebola, azeitonas, orégano',
    active: true
  },
  {
    id: '2',
    name: 'A Moda',
    ingredients: 'Molho, mussarela, ovo, presunto, azeitonas, orégano',
    active: true
  },
  {
    id: '3',
    name: 'Frango com Catupiry',
    ingredients: 'Molho, frango desfiado, catupiry, milho, azeitonas, orégano',
    active: true
  },
  {
    id: '4',
    name: 'Portuguesa',
    ingredients: 'Molho, mussarela, presunto, ovo, pimentão, milho, azeitonas, orégano',
    active: true
  },
  {
    id: '5',
    name: 'Marguerita',
    ingredients: 'Molho, mussarela, manjericão, tomate, azeitonas, orégano',
    active: true
  },
  {
    id: '6',
    name: 'Bacon',
    ingredients: 'Molho, mussarela, bacon, cebola, tomate, azeitonas, orégano',
    active: true
  },
  {
    id: '7',
    name: 'Napolitana',
    ingredients: 'Molho, mussarela, tomate, palmito, azeitonas, orégano',
    active: true
  }
];

export const SUGGESTED_DOMAINS = [
  "mmpizza.com.br",
  "mmpizzadelivery.com.br",
  "pedemm.com.br"
];

export const SUGGESTED_SLOGANS = [
  "O sabor que une Goianésia!",
  "Sua pizza favorita, no conforto do lar.",
  "MM Pizza: Amor em cada fatia."
];