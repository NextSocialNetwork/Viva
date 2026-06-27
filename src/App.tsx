import { useState, useEffect } from 'react';
import { LanguageCode, CartItem, Product } from './types';
import { TRANSLATIONS } from './data/translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NetworkMap } from './components/NetworkMap';
import { StoreSection } from './components/StoreSection';
import { CartDrawer } from './components/CartDrawer';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AiChatSupport } from './components/AiChatSupport';
import { Footer } from './components/Footer';

export default function App() {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleQuickBuy = (product: Product) => {
    handleAddToCart(product);
  };

  const handleUpdateQty = (prodId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === prodId) {
          const nextQty = item.quantity + delta;
          return nextQty > 0 ? { ...item, quantity: nextQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (prodId: string) => {
    setCart(prev => prev.filter(i => i.product.id !== prodId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll spy effect to update active nav tab
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'store', 'network', 'testimonials', 'chat'];
      const scrollPos = window.scrollY + 200;

      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans selection:bg-[#FF007F] selection:text-white relative overflow-x-hidden">
      
      {/* Top Navbar */}
      <Navbar
        currentLang={currentLang}
        onLangChange={setCurrentLang}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        t={t}
        activeTab={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          t={t}
          onExploreStore={() => handleNavigate('store')}
          onCheckMap={() => handleNavigate('network')}
        />

        <StoreSection
          t={t}
          onAddToCart={handleAddToCart}
          onQuickBuy={handleQuickBuy}
        />

        <NetworkMap t={t} />

        <TestimonialsSection t={t} />

        <AiChatSupport
          t={t}
          currentLang={currentLang}
        />
      </main>

      {/* Slideover Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemoveItem}
        onClearCart={handleClearCart}
        t={t}
      />

      {/* Footer */}
      <Footer
        t={t}
        onLangChange={setCurrentLang}
        onNavigate={handleNavigate}
      />

    </div>
  );
}
