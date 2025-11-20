export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface PricingTier {
  orders: number;
  price: number;
}
