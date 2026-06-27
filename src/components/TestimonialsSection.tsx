import React from 'react';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';
import { Star, Award, CheckCircle2, Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  t: any;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ t }) => {
  return (
    <section id="testimonials" className="py-24 bg-[#05030c] text-white relative border-t border-white/10">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#FFD700]/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#FFD700] text-xs font-mono font-bold mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>CONNECTING COMMUNITIES • 100% VERIFIED MEMBER REVIEWS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-sans tracking-tight mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            {t.testimonials.subtitle}
          </p>
        </div>

        {/* TESTIMONIALS CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS_DATA.map((review) => (
            <div 
              key={review.id}
              className="bg-[#0f0922]/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 relative flex flex-col justify-between hover:border-[#FFD700]/40 transition-all duration-300 shadow-xl group"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-white/5 group-hover:text-[#FF007F]/10 transition-colors pointer-events-none" />

              <div className="space-y-4 mb-6">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#FFD700]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
                  ))}
                  <span className="ml-2 text-xs font-mono font-bold text-gray-300">5.0</span>
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-gray-200 font-normal leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>

              {/* Reviewer Profile Footer */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#FF007F]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white font-sans flex items-center gap-1.5">
                      {review.name}
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" title="Verified Buyer" />
                    </h4>
                    <p className="text-xs text-gray-400 font-mono">{review.location}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[#FFD700] font-bold">
                    {review.plan}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Multicultural Community Trust Stats */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#FF007F]/10 via-[#13082a] to-[#FF6B00]/10 border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-4xl font-extrabold font-sans text-white">4.98 / 5</div>
            <div className="text-xs text-gray-400 font-mono mt-1">Average Rating</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-extrabold font-sans text-[#FFD700]">150K+</div>
            <div className="text-xs text-gray-400 font-mono mt-1">Active eSIM Members</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-extrabold font-sans text-[#FF007F]">4 Languages</div>
            <div className="text-xs text-gray-400 font-mono mt-1">EN • RU • ES • LT</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-extrabold font-sans text-[#10B981]">0 min</div>
            <div className="text-xs text-gray-400 font-mono mt-1">Store Wait Time</div>
          </div>
        </div>

      </div>
    </section>
  );
};
