export type LanguageCode = 'en' | 'ru' | 'es' | 'lt';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  flag: string;
  label: string;
}

export type ProductCategory = 'all' | 'esim' | 'iphone' | 'samsung' | 'plan';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  monthlyPrice?: number;
  rating: number;
  image: string;
  badge?: string;
  description: string;
  features: string[];
  specs?: {
    screen?: string;
    chip?: string;
    camera?: string;
    network?: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

export interface CityCoverage {
  city: string;
  state: string;
  zip: string;
  latency: string;
  speed: string;
  uptime: string;
  status: 'optimal' | 'excellent' | 'ultra';
  coords: { x: number; y: number }; // Percentage coordinates on US map
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  language: LanguageCode;
  avatar: string;
  rating: number;
  text: string;
  verified: boolean;
  plan: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: string;
}
