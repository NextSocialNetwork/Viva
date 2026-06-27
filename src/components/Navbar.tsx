import React, { useState } from 'react';
import { LanguageCode } from '../types';
import { LANGUAGES } from '../data/translations';
import { ShoppingBag, Globe, Menu, X, Zap, Signal, MessageSquare, Award } from 'lucide-react';

interface NavbarProps {
  currentLang: LanguageCode;
  onLangChange: (lang: LanguageCode) => void;
  cartCount: number;
  onOpenCart: () => void;
  t: any;
  activeTab: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLangChange,
  cartCount,
  onOpenCart,
  t,
  activeTab,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const currentLangObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050508]/90 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(255,0,127,0.08)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo matching input image */}
        <div 
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative flex flex-col items-start">
            <div className="flex items-center tracking-tighter text-3xl sm:text-4xl font-extrabold italic font-sans">
              <span className="bg-gradient-to-r from-[#FF007F] via-[#D946EF] to-[#EC4899] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,0,127,0.6)]">
                VI
              </span>
              <span className="bg-gradient-to-r from-[#FF6B00] via-[#F59E0B] to-[#FFD700] bg-clip-text text-transparent relative drop-shadow-[0_0_15px_rgba(255,107,0,0.6)]">
                VA
                {/* Futuristic swoosh curve over VA */}
                <span className="absolute -top-1 left-0 w-full h-[3px] bg-gradient-to-r from-[#FF007F] to-[#FFD700] rounded-full scale-x-125 origin-left -rotate-6 transition-transform group-hover:scale-x-150" />
              </span>
            </div>
            <div className="flex items-center gap-1 w-full justify-between">
              <span className="text-[10px] tracking-[0.3em] font-semibold text-white/90">
                MOBILE™
              </span>
              <span className="text-[9px] text-[#E20074] font-bold tracking-widest hidden sm:inline-block">
                5G UC
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <button
            onClick={() => handleNavClick('store')}
            className={`text-sm font-medium transition-colors flex items-center gap-1.5 hover:text-[#FF007F] ${activeTab === 'store' ? 'text-[#FF007F] drop-shadow-[0_0_8px_rgba(255,0,127,0.5)]' : 'text-gray-300'}`}
          >
            <Zap className="w-4 h-4 text-[#FFD700]" />
            {t.nav.store}
          </button>
          
          <button
            onClick={() => handleNavClick('network')}
            className={`text-sm font-medium transition-colors flex items-center gap-1.5 hover:text-[#FF6B00] ${activeTab === 'network' ? 'text-[#FF6B00]' : 'text-gray-300'}`}
          >
            <Signal className="w-4 h-4 text-[#FF007F]" />
            {t.nav.network}
          </button>

          <button
            onClick={() => handleNavClick('testimonials')}
            className={`text-sm font-medium transition-colors flex items-center gap-1.5 hover:text-[#FFD700] ${activeTab === 'testimonials' ? 'text-[#FFD700]' : 'text-gray-300'}`}
          >
            <Award className="w-4 h-4 text-[#F59E0B]" />
            {t.nav.testimonials}
          </button>

          <button
            onClick={() => handleNavClick('chat')}
            className={`text-sm font-medium transition-colors flex items-center gap-1.5 hover:text-[#D946EF] ${activeTab === 'chat' ? 'text-[#D946EF]' : 'text-gray-300'}`}
          >
            <MessageSquare className="w-4 h-4 text-[#D946EF]" />
            {t.nav.support}
          </button>
        </nav>

        {/* Right Action Bar: Language Switcher & Cart */}
        <div className="flex items-center gap-4">
          
          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white font-medium transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-[#FF007F]" />
              <span className="text-base leading-none">{currentLangObj.flag}</span>
              <span className="uppercase tracking-wider font-mono">{currentLangObj.code}</span>
            </button>

            {langDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setLangDropdownOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-44 bg-[#0d081c] border border-white/15 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-gray-400 border-b border-white/10 mb-1">
                    Select Community Lang
                  </div>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLangChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2.5 hover:bg-gradient-to-r hover:from-[#FF007F]/20 hover:to-transparent transition-colors ${currentLang === lang.code ? 'text-[#FF007F] font-bold bg-white/5' : 'text-gray-200'}`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Instant eSIM Quick CTA */}
          <button
            onClick={() => handleNavClick('store')}
            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#FF007F] via-[#E20074] to-[#FF6B00] text-white text-xs font-bold shadow-[0_0_20px_rgba(255,0,127,0.4)] hover:shadow-[0_0_25px_rgba(255,107,0,0.6)] hover:scale-105 active:scale-95 transition-all"
          >
            <Zap className="w-3.5 h-3.5 fill-current animate-pulse" />
            {t.nav.orderEsim}
          </button>

          {/* Cart Bag */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all group"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 group-hover:text-[#FFD700] transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#FF007F] to-[#FF6B00] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md border border-[#050508] animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slideout */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0616] border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <button
            onClick={() => handleNavClick('store')}
            className="w-full text-left py-2 px-3 rounded-xl bg-white/5 text-white font-medium flex items-center gap-3"
          >
            <Zap className="w-5 h-5 text-[#FFD700]" />
            {t.nav.store}
          </button>
          <button
            onClick={() => handleNavClick('network')}
            className="w-full text-left py-2 px-3 rounded-xl bg-white/5 text-white font-medium flex items-center gap-3"
          >
            <Signal className="w-5 h-5 text-[#FF007F]" />
            {t.nav.network}
          </button>
          <button
            onClick={() => handleNavClick('testimonials')}
            className="w-full text-left py-2 px-3 rounded-xl bg-white/5 text-white font-medium flex items-center gap-3"
          >
            <Award className="w-5 h-5 text-[#F59E0B]" />
            {t.nav.testimonials}
          </button>
          <button
            onClick={() => handleNavClick('chat')}
            className="w-full text-left py-2 px-3 rounded-xl bg-white/5 text-white font-medium flex items-center gap-3"
          >
            <MessageSquare className="w-5 h-5 text-[#D946EF]" />
            {t.nav.support}
          </button>

          <div className="pt-2">
            <button
              onClick={() => handleNavClick('store')}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#FF007F] to-[#FF6B00] text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current" />
              {t.nav.orderEsim}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
