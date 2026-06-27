import { Product } from '../types';

export const PRODUCTS_DATA: Product[] = [
  // eSIM KITS
  {
    id: 'esim-kit-starter',
    name: '⚡ VIVA Instant eSIM Card Kit',
    category: 'esim',
    price: 10,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    badge: 'INSTANT DIGITAL QR DELIVERY',
    description: 'Activate nationwide T-Mobile 5G UC on your smartphone in under 2 minutes. Digital QR code delivered instantly to your inbox.',
    features: [
      'Digital QR Code sent via email in 120 seconds',
      '$10 credit applied to your first month plan',
      'Keep your current number or pick new US area code',
      'Dual SIM compatible (keep old carrier while testing VIVA)',
      'Works with all unlocked eSIM phones (iPhone XS or newer, Galaxy S20 or newer)'
    ]
  },
  {
    id: 'esim-kit-family-pack',
    name: '⚡ VIVA Family 4-Pack eSIM Kit',
    category: 'esim',
    price: 30,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    badge: 'BEST FAMILY VALUE',
    description: 'Get 4 instant digital eSIM activation QR codes for the whole family. Save $10 instantly.',
    features: [
      '4 Instant Digital QR Codes in one email',
      'Free account transfer concierge for senior parents',
      'Shareable data pool across all 4 lines',
      'Complimentary scam shield & parental filters'
    ]
  },

  // APPLE IPHONES
  {
    id: 'iphone-17-pro-max',
    name: 'Apple iPhone 17 Pro Max (2026)',
    category: 'iphone',
    price: 1199,
    monthlyPrice: 49.95,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    badge: 'NEWEST 2026 MODEL',
    description: 'The pinnacle of Apple innovation. Titanium frame, A19 Pro Neural Chip, 48MP Quad-lens telephoto array, and native T-Mobile Ultra Capacity 5G UC modem.',
    specs: {
      screen: '6.9" Super Retina XDR ProMotion 120Hz',
      chip: 'Apple A19 Pro (3nm Gen 2)',
      camera: '48MP Main + 48MP Ultra-Wide + 48MP Periscope (10x Optical Zoom)',
      network: 'T-Mobile 5G UC & Satellite Emergency SOS'
    },
    features: [
      'Unlocked & eSIM pre-configured for VIVA Mobile',
      '0% VIVA Financing available ($49.95/mo for 24 mo)',
      'Free Ceramic Guard case & screen protector included',
      'Apple Intelligence AI integration suite'
    ]
  },
  {
    id: 'iphone-17-pro',
    name: 'Apple iPhone 17 Pro (2026)',
    category: 'iphone',
    price: 999,
    monthlyPrice: 41.62,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=800&q=80',
    badge: 'FLAGSHIP POWER',
    description: 'Compact titanium perfection with the blazing A19 Pro chip. Unmatched 5G reception and console-grade gaming graphics.',
    specs: {
      screen: '6.3" Super Retina XDR OLED',
      chip: 'Apple A19 Pro Bionic',
      camera: 'Triple 48MP Studio Fusion Camera System',
      network: 'Wi-Fi 7 & 5G Ultra Capacity'
    },
    features: [
      'Instant eSIM activation out of the box',
      'All-day battery life with 45W MagSafe fast charge',
      'Action Button & Camera Control Touch Pad'
    ]
  },
  {
    id: 'iphone-17',
    name: 'Apple iPhone 17',
    category: 'iphone',
    price: 799,
    monthlyPrice: 33.29,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
    badge: 'BEST SELLER',
    description: 'Vibrant aluminum design with A19 chip and dual 48MP cameras. The ideal companion for VIVA Connect 5G.',
    specs: {
      screen: '6.1" OLED Liquid Display',
      chip: 'Apple A19 Bionic',
      camera: 'Dual 48MP Spatial Video Ready',
      network: 'Sub-6 GHz & mmWave 5G'
    },
    features: [
      'Available in Cosmic Magenta, Obsidian Black, & Cyber Slate',
      'Free $50 eSIM store gift card upon purchase'
    ]
  },

  // SAMSUNG GALAXY PHONES
  {
    id: 'samsung-s26-ultra',
    name: 'Samsung Galaxy S26 Ultra AI',
    category: 'samsung',
    price: 1299,
    monthlyPrice: 54.12,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
    badge: 'ULTIMATE ANDROID',
    description: 'Forged in Armor Titanium with built-in S Pen stylus. Snapdragon 8 Gen 5 for Galaxy engine, 200MP Space Zoom sensor, and real-time live AI call translation.',
    specs: {
      screen: '6.8" Dynamic AMOLED 2X (2600 nits peak)',
      chip: 'Qualcomm Snapdragon 8 Gen 5 for Galaxy',
      camera: '200MP Main + 50MP Periscope (100x Space Zoom)',
      network: 'T-Mobile 5G UC Carrier Aggregation Max'
    },
    features: [
      'Live Call Translation in Russian, Spanish, & Lithuanian natively',
      'Embedded S Pen for signing digital eSIM agreements',
      '5000 mAh AI battery management (2 days runtime)',
      '0% APR VIVA Monthly Installments'
    ]
  },
  {
    id: 'samsung-z-fold-7',
    name: 'Samsung Galaxy Z Fold 7',
    category: 'samsung',
    price: 1799,
    monthlyPrice: 74.95,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80',
    badge: 'FUTURISTIC FOLDABLE',
    description: 'Unfold an immersive 7.6-inch tablet screen. Zero-gap FlexHinge, multitasking monster built for power users.',
    specs: {
      screen: '7.6" Inner Foldable AMOLED + 6.3" Cover Screen',
      chip: 'Snapdragon 8 Gen 5 Extreme Edition',
      camera: '50MP Under-Display Pro Array',
      network: 'Gigabit LTE + 5G UC mmWave'
    },
    features: [
      'Split screen: Chat with VIVA AI while watching live 5G map',
      'Ultra-slim 9.8mm folded profile',
      'IPX8 Water resistance'
    ]
  },
  {
    id: 'samsung-z-flip-7',
    name: 'Samsung Galaxy Z Flip 7',
    category: 'samsung',
    price: 1099,
    monthlyPrice: 45.79,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
    badge: 'POCKET ICON',
    description: 'Full-sized smart flagship that snaps shut into your palm. Huge 4.1" FlexWindow cover display with direct eSIM QR widget.',
    specs: {
      screen: '6.7" FHD+ AMOLED Inner + 4.1" Outer FlexWindow',
      chip: 'Snapdragon 8 Gen 5',
      camera: '50MP FlexCam Nightography',
      network: 'T-Mobile 5G Standalone SA'
    },
    features: [
      'Hands-free selfie video calling',
      'Customizable VIVA Neon Magenta exterior theme'
    ]
  },

  // 5G PLANS
  {
    id: 'plan-viva-connect',
    name: '📶 VIVA Connect 5G Plan',
    category: 'plan',
    price: 25,
    monthlyPrice: 25,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=800&q=80',
    badge: 'NO CONTRACT • TAXES INCLUDED',
    description: 'Essential high-speed nationwide 5G data, unlimited talk and text, backed by T-Mobile reliability.',
    features: [
      'Unlimited 5G & 4G LTE Nationwide Data',
      'Unlimited Talk & SMS across USA',
      '5GB High-Speed Mobile Hotspot',
      'Free Scam Shield & Caller ID',
      '24/7 Multilingual AI Chat & Concierge Support'
    ]
  },
  {
    id: 'plan-viva-unlimited-ultra',
    name: '📶 VIVA Unlimited Ultra 5G Plan',
    category: 'plan',
    price: 40,
    monthlyPrice: 40,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    badge: 'POPULAR CHOICE',
    description: 'Premium priority Ultra Capacity 5G data with generous hotspot and Mexico & Canada roaming included.',
    features: [
      'Unlimited Priority 5G UC Ultra Capacity Data',
      '25GB High-Speed Mobile Hotspot Data',
      'FREE Unlimited Roaming & Calling to Mexico & Canada',
      'HD Video Streaming Enabled (1080p)',
      'Free T-Mobile Tuesdays rewards access'
    ]
  },
  {
    id: 'plan-viva-global-max',
    name: '🌍 VIVA Global Max 5G Plan',
    category: 'plan',
    price: 55,
    monthlyPrice: 55,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    badge: 'FREE CALLS TO RU • ES • LT • EU',
    description: 'Designed specifically for our multicultural communities. Unlimited nationwide 5G PLUS free international calls to home.',
    features: [
      'FREE Unlimited Calling & SMS to Russia, Lithuania, Spain, Mexico, Ukraine, Poland, & 80+ EU countries',
      'Unlimited Priority 5G UC Data (No de-prioritization)',
      '50GB High-Speed Hotspot',
      'FREE In-Flight Wi-Fi on American, Delta, United, & Alaska Airlines',
      'VIP Native Speaking Customer Support Line'
    ]
  }
];
