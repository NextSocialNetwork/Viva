import React from 'react';
import { Zap, Signal, ShieldCheck, ArrowRight, Sparkles, Globe2 } from 'lucide-react';

interface HeroProps {
  t: any;
  onExploreStore: () => void;
  onCheckMap: () => void;
}

export const Hero: React.FC<HeroProps> = ({ t, onExploreStore, onCheckMap }) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#050508] py-16 px-4">
      
      {/* BACKGROUND FUTURISTIC GLOWING LIGHT CURVES MATCHING IMAGE */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Bottom Left Magenta Glowing Light Streaks */}
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-[#FF007F]/40 via-[#D946EF]/20 to-transparent rounded-full blur-3xl opacity-80 animate-pulse" />
        <div className="absolute -bottom-10 -left-10 w-[80vw] h-[350px] border-[3px] border-[#FF007F]/50 rounded-[100%] rounded-tr-none blur-[4px] -rotate-12 opacity-70" />
        <div className="absolute -bottom-16 -left-5 w-[85vw] h-[400px] border-[2px] border-[#D946EF]/40 rounded-[100%] rounded-tr-none blur-[2px] -rotate-6 opacity-60" />
        
        {/* Bottom Right Orange/Gold Glowing Light Streaks */}
        <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-gradient-to-tl from-[#FF6B00]/40 via-[#F59E0B]/20 to-transparent rounded-full blur-3xl opacity-80 animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-[80vw] h-[350px] border-[3px] border-[#FF6B00]/50 rounded-[100%] rounded-tl-none blur-[4px] rotate-12 opacity-70" />
        <div className="absolute -bottom-16 -right-5 w-[85vw] h-[400px] border-[2px] border-[#FFD700]/40 rounded-[100%] rounded-tl-none blur-[2px] rotate-6 opacity-60" />
        
        {/* Floor Horizon Light Reflection */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FF007F]/15 via-[#FF6B00]/10 to-transparent blur-xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Top T-Mobile Partnership Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-[0_0_25px_rgba(255,0,127,0.2)] animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
          <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-gray-200">
            {t.hero.badge}
          </span>
          <span className="bg-[#E20074] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-tighter">
            5G UC
          </span>
        </div>

        {/* HERO TYPOGRAPHY */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-sans text-white max-w-4xl leading-[1.08] mb-6 drop-shadow-lg">
          <span className="block">{t.hero.title1}</span>
          <span className="bg-gradient-to-r from-[#FF007F] via-[#D946EF] to-[#FF6B00] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,0,127,0.4)]">
            {t.hero.title2}
          </span>
        </h1>

        {/* SLOGAN SUBTITLE MATCHING GIVEN SITE IMAGE */}
        <div className="mb-6 font-mono text-xs sm:text-sm font-bold tracking-[0.2em] text-[#FFD700] uppercase drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] bg-black/40 px-6 py-2 rounded-full border border-[#FFD700]/30">
          {t.hero.sloganSub}
        </div>

        <p className="text-base sm:text-lg text-gray-300 max-w-2xl font-normal leading-relaxed mb-10">
          {t.hero.description}
        </p>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mb-16">
          <button
            onClick={onExploreStore}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#FF007F] via-[#E20074] to-[#FF6B00] text-white font-extrabold text-sm sm:text-base tracking-wide shadow-[0_0_30px_rgba(255,0,127,0.5)] hover:shadow-[0_0_40px_rgba(255,107,0,0.8)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            <Zap className="w-5 h-5 fill-current text-[#FFD700]" />
            <span>{t.hero.ctaStore}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onCheckMap}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold text-sm sm:text-base backdrop-blur-md transition-all flex items-center justify-center gap-2 hover:border-[#FF6B00]/50"
          >
            <Signal className="w-5 h-5 text-[#FF007F]" />
            <span>{t.hero.ctaMap}</span>
          </button>
        </div>

        {/* LIVE KEY PERKS BAR */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl pt-8 border-t border-white/10 text-left">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#FF007F]/30 transition-colors">
            <div className="p-2.5 rounded-xl bg-[#FF007F]/10 text-[#FF007F]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">{t.hero.perk1}</div>
              <div className="text-xs text-gray-400 font-mono">Ready in 120 seconds</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#FF6B00]/30 transition-colors">
            <div className="p-2.5 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00]">
              <Signal className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">{t.hero.perk2}</div>
              <div className="text-xs text-gray-400 font-mono">All 50 US States</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#FFD700]/30 transition-colors">
            <div className="p-2.5 rounded-xl bg-[#FFD700]/10 text-[#FFD700]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">{t.hero.perk3}</div>
              <div className="text-xs text-gray-400 font-mono">T-Mobile Ultra Capacity</div>
            </div>
          </div>
        </div>

        {/* URL DISPLAY MATCHING IMAGE */}
        <div className="mt-12 text-xs font-mono tracking-[0.25em] text-[#FF007F] font-bold">
          myvivamobile.com
        </div>

        {/* Powered by T-Mobile Badge matching image */}
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-400 font-medium select-none">
          <span>Powered by T-Mobile</span>
          <span className="bg-[#E20074] text-white px-1.5 py-0.5 rounded font-extrabold text-[11px] tracking-tight">
            T
          </span>
        </div>

      </div>
    </section>
  );
};
