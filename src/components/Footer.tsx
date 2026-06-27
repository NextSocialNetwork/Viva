import React from 'react';
import { LanguageCode } from '../types';
import { LANGUAGES } from '../data/translations';
import { Globe, Radio, Shield, Heart } from 'lucide-react';

interface FooterProps {
  t: any;
  onLangChange: (l: LanguageCode) => void;
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ t, onLangChange, onNavigate }) => {
  return (
    <footer className="bg-[#030206] text-gray-400 font-sans border-t border-white/10 relative overflow-hidden">
      
      {/* Bottom Glow Streak matching Hero */}
      <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-[#FF007F] to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => onNavigate('hero')}>
              <div className="flex items-center tracking-tighter text-3xl font-extrabold italic font-sans">
                <span className="bg-gradient-to-r from-[#FF007F] to-[#D946EF] bg-clip-text text-transparent">VI</span>
                <span className="bg-gradient-to-r from-[#FF6B00] to-[#FFD700] bg-clip-text text-transparent relative">
                  VA
                  <span className="absolute -top-1 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#FF007F] to-[#FFD700] rounded-full scale-x-125 origin-left -rotate-6" />
                </span>
              </div>
              <span className="text-[10px] tracking-[0.3em] font-semibold text-white/80">MOBILE™</span>
            </div>

            <p className="text-xs font-mono font-bold tracking-[0.15em] text-[#FFD700] uppercase">
              {t.footer.tagline}
            </p>

            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              America’s premier futuristic wireless provider delivering instant digital eSIM kits and newest 2026 flagship smartphones with dedicated native customer service for diverse multicultural communities.
            </p>

            {/* Powered by T-Mobile Badge matching image */}
            <div className="pt-2 flex items-center gap-2 text-xs text-white font-medium">
              <span>{t.footer.poweredBy}</span>
              <span className="bg-[#E20074] text-white px-1.5 py-0.5 rounded font-extrabold text-[11px] tracking-tight shadow-[0_0_10px_#E20074]">
                T-Mobile
              </span>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-mono">{t.footer.linksTitle}</h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => onNavigate('store')} className="hover:text-[#FF007F] transition-colors">Phones & eSIM Store</button></li>
              <li><button onClick={() => onNavigate('network')} className="hover:text-[#FF6B00] transition-colors">5G Coverage Map</button></li>
              <li><button onClick={() => onNavigate('testimonials')} className="hover:text-[#FFD700] transition-colors">Community Testimonials</button></li>
              <li><button onClick={() => onNavigate('chat')} className="hover:text-[#D946EF] transition-colors">Ai Chat Support</button></li>
            </ul>
          </div>

          {/* Col 4: Communities & Languages */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-mono">{t.footer.supportTitle}</h4>
            <ul className="space-y-2 text-xs">
              {LANGUAGES.map((lang) => (
                <li key={lang.code}>
                  <button
                    onClick={() => onLangChange(lang.code)}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name} Support</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Network & Security */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-mono">{t.footer.legalTitle}</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#10B981]" /><span>LPA eSIM Certified</span></li>
              <li className="flex items-center gap-1.5"><Radio className="w-3.5 h-3.5 text-[#FF007F]" /><span>FCC Spectrum Compliant</span></li>
              <li><a href="#hero" className="hover:underline">Terms of Service</a></li>
              <li><a href="#hero" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="text-gray-500">
            {t.footer.copyright}
          </div>

          <div className="flex items-center gap-2 text-[#FF007F] font-bold tracking-widest">
            <span>www.myvivamobile.com</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
