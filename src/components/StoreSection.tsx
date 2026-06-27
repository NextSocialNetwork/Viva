import React, { useState } from 'react';
import { Product, ProductCategory } from '../types';
import { PRODUCTS_DATA } from '../data/storeData';
import { Zap, ShoppingBag, Star, Check, Smartphone, Cpu, Camera, Radio, Search, Info, X } from 'lucide-react';

interface StoreSectionProps {
  t: any;
  onAddToCart: (product: Product) => void;
  onQuickBuy: (product: Product) => void;
}

export const StoreSection: React.FC<StoreSectionProps> = ({ t, onAddToCart, onQuickBuy }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  const filteredProducts = PRODUCTS_DATA.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="store" className="py-24 bg-[#050508] text-white relative">
      
      {/* Background glow accents */}
      <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-[#D946EF]/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#FF007F]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-mono font-bold mb-4">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>0% FINANCING • INSTANT DIGITAL ACTIVATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-sans tracking-tight mb-4">
            {t.store.title}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            {t.store.subtitle}
          </p>
        </div>

        {/* eSIM INSTANT DELIVERY BANNER */}
        <div className="mb-12 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#FF007F]/20 via-[#E20074]/15 to-[#FF6B00]/20 border border-[#FF007F]/40 flex items-center justify-center text-center shadow-lg">
          <p className="text-xs sm:text-sm font-bold font-mono text-[#FFD700] tracking-wide">
            {t.store.esimDeliveryBanner}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-white/10 pb-6">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {[
              { id: 'all', label: t.store.tabAll },
              { id: 'esim', label: t.store.tabEsim },
              { id: 'iphone', label: t.store.tabIphone },
              { id: 'samsung', label: t.store.tabSamsung },
              { id: 'plan', label: t.store.tabPlan },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as ProductCategory)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold font-sans transition-all cursor-pointer ${selectedCategory === tab.id ? 'bg-gradient-to-r from-[#FF007F] via-[#D946EF] to-[#FF6B00] text-white shadow-[0_0_15px_rgba(255,0,127,0.5)] scale-105' : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search phone or eSIM kit..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF007F] transition-colors font-sans"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-gray-400 font-mono text-sm">
            No items matching your search criteria. Try selecting "All Collection".
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod) => (
              <div 
                key={prod.id}
                className="bg-[#0e081e] border border-white/10 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#FF007F]/50 hover:shadow-[0_10px_40px_rgba(255,0,127,0.15)] group relative"
              >
                {/* Top Badge */}
                {prod.badge && (
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#FFD700]/50 text-[#FFD700] text-[10px] font-mono font-extrabold uppercase tracking-wider">
                      {prod.badge}
                    </span>
                  </div>
                )}

                {/* Product Visual */}
                <div 
                  onClick={() => setModalProduct(prod)}
                  className="relative h-64 overflow-hidden bg-gradient-to-b from-[#180e33] to-[#0e081e] cursor-pointer flex items-center justify-center p-6"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm p-1.5 rounded-full border border-white/10 text-gray-300 hover:text-white transition-colors">
                    <Info className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-mono text-[#FF007F] font-bold">
                        {prod.category === 'esim' ? 'Instant Activation' : prod.category === 'plan' ? 'Nationwide 5G' : 'Unlocked Flagship'}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-[#FFD700]">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{prod.rating}</span>
                      </div>
                    </div>

                    <h3 
                      onClick={() => setModalProduct(prod)}
                      className="text-lg font-bold text-white font-sans cursor-pointer hover:text-[#FF007F] transition-colors line-clamp-1 mb-2"
                    >
                      {prod.name}
                    </h3>

                    <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed mb-4 font-normal">
                      {prod.description}
                    </p>

                    {/* Features list snapshot */}
                    <ul className="space-y-1.5 mb-6">
                      {prod.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[11px] text-gray-400 font-sans">
                          <Check className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing & Buy Actions */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <div>
                      {prod.monthlyPrice ? (
                        <div>
                          <div className="text-xs text-gray-400 font-mono">From</div>
                          <div className="text-xl font-extrabold text-white font-sans">${prod.monthlyPrice}<span className="text-xs font-normal text-gray-400">/mo</span></div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-xs text-gray-400 font-mono">{prod.category === 'plan' ? 'Monthly' : 'One-time'}</div>
                          <div className="text-xl font-extrabold text-[#FFD700] font-sans">${prod.price}</div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onAddToCart(prod)}
                        className="p-3 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all active:scale-95"
                        title="Add to Bag"
                      >
                        <ShoppingBag className="w-4 h-4 text-[#FF007F]" />
                      </button>

                      <button
                        onClick={() => onQuickBuy(prod)}
                        className="px-4 py-3 rounded-2xl bg-gradient-to-r from-[#FF007F] to-[#FF6B00] text-white font-bold text-xs hover:shadow-[0_0_20px_rgba(255,0,127,0.5)] transition-all active:scale-95 flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span>{t.store.buyNow}</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* PRODUCT INSPECTION MODAL */}
        {modalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-3xl bg-[#0d071d] border border-[#FF007F]/40 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col md:flex-row">
              
              <button
                onClick={() => setModalProduct(null)}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 text-gray-400 hover:text-white border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Left Image */}
              <div className="md:w-1/2 bg-gradient-to-b from-[#1c113b] to-[#0d071d] p-8 flex items-center justify-center relative">
                <img
                  src={modalProduct.image}
                  alt={modalProduct.name}
                  className="w-full h-72 object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                  referrerPolicy="no-referrer"
                />
                {modalProduct.badge && (
                  <span className="absolute bottom-6 left-6 px-3 py-1 rounded-full bg-[#FF007F] text-white text-[10px] font-mono font-extrabold uppercase">
                    {modalProduct.badge}
                  </span>
                )}
              </div>

              {/* Modal Right Info */}
              <div className="md:w-1/2 p-8 overflow-y-auto flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase text-[#FF6B00] font-bold">VIVA Mobile Verified Spec</span>
                    <div className="flex items-center gap-1 text-xs font-bold text-[#FFD700]">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{modalProduct.rating} / 5.0</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-extrabold text-white font-sans mb-3">{modalProduct.name}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-6">{modalProduct.description}</p>

                  {/* Specs Pill Grid if hardware */}
                  {modalProduct.specs && (
                    <div className="grid grid-cols-2 gap-3 mb-6 bg-white/5 p-4 rounded-2xl border border-white/5 font-mono text-xs">
                      {modalProduct.specs.screen && (
                        <div>
                          <span className="text-[10px] text-gray-400 block">Display</span>
                          <span className="text-white font-sans text-xs">{modalProduct.specs.screen}</span>
                        </div>
                      )}
                      {modalProduct.specs.chip && (
                        <div>
                          <span className="text-[10px] text-gray-400 block">Processor</span>
                          <span className="text-[#FFD700] font-sans text-xs">{modalProduct.specs.chip}</span>
                        </div>
                      )}
                      {modalProduct.specs.network && (
                        <div className="col-span-2">
                          <span className="text-[10px] text-gray-400 block">Cellular Modem</span>
                          <span className="text-[#FF007F] font-sans text-xs">{modalProduct.specs.network}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <h4 className="text-xs font-mono uppercase text-gray-400 mb-2">{t.store.included}</h4>
                  <ul className="space-y-2 mb-6">
                    {modalProduct.features.map((ft, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-200">
                        <Check className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                        <span>{ft}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400 font-mono">Price</div>
                    <div className="text-2xl font-extrabold text-white font-sans">${modalProduct.price}</div>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(modalProduct);
                      setModalProduct(null);
                    }}
                    className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FF007F] via-[#E20074] to-[#FF6B00] text-white font-bold text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t.store.addToCart}</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
