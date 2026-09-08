import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/schoolData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-[#FFFFFF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDF7E8] text-[#123B2A] text-xs font-bold uppercase tracking-wider mb-3">
            Proven Educational Impact
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-[#123B2A] tracking-tight">
            Trusted By Growing Schools
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#123B2A]/70">
            Real feedback from principals, school administrators and academic directors managing campuses with School Markaz.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              id={`testimonial-${idx}`}
              className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative group"
            >
              <div>
                {/* Top Row: Stars & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#19A66A]" />
                    <span>Verified School</span>
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base text-[#123B2A]/85 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Author & School Details */}
              <div className="pt-4 border-t border-[#19A66A]/15 flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#19A66A] to-[#123B2A] text-white font-bold text-base flex items-center justify-center shadow-xs">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#123B2A] font-['Outfit']">
                    {t.author}
                  </h4>
                  <p className="text-xs text-[#19A66A] font-medium">
                    {t.designation}
                  </p>
                  <p className="text-[11px] text-[#123B2A]/50">
                    {t.location} • {t.badge}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate Stats Strip */}
        <div className="mt-12 p-6 rounded-3xl bg-[#F4FFF8] border border-[#19A66A]/20 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-[#19A66A]">100%</div>
            <div className="text-xs text-[#123B2A]/70 font-semibold mt-1">Audit Compliance</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-[#19A66A]">98.5%</div>
            <div className="text-xs text-[#123B2A]/70 font-semibold mt-1">Fee Recovery Speed</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-[#19A66A]">30 Sec</div>
            <div className="text-xs text-[#123B2A]/70 font-semibold mt-1">Class Roll Call</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-[#19A66A]">24/7</div>
            <div className="text-xs text-[#123B2A]/70 font-semibold mt-1">Dedicated Support</div>
          </div>
        </div>

      </div>
    </section>
  );
};
