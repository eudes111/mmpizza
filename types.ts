export interface Flavor {
  id: string;
  name: string;
  ingredients: string;
  active: boolean;
}

export interface CartItem {
  id: string;
  flavors: Flavor[];
  price: number;
  quantity: number;
  observation?: string;
}

export interface BusinessInfo {
  name: string;
  phone: string;
  whatsappRaw: string;
  address: string;
  email: string;
  hours: string;
  deliveryTime: string;
  basePrice: number;
}

export interface OrderDetails {
  customerName: string;
  address: string;
  paymentMethod: 'credit_card' | 'cash' | 'meal_voucher' | '';
  changeFor?: string;
}