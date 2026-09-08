import React from 'react';
import {
  GraduationCap,
  Users,
  CalendarCheck,
  Award,
  Wallet,
  CreditCard,
  TrendingUp,
  PackageCheck,
  BarChart3,
  ShieldCheck,
  Check
} from 'lucide-react';
import { MODULES_LIST } from '../data/schoolData';

export const ProductModules: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    GraduationCap,
    Users,
    CalendarCheck,
    Award,
    Receipt: Wallet,
    CreditCard,
    TrendingUp,
    PackageCheck,
    BarChart3,
    ShieldCheck,
  };

  return (
    <section id="modules" className="py-20 relative bg-[#FFFFFF]">
      {/* Background glow accents */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#19A66A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#DDF7E8]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDF7E8] text-[#123B2A] text-xs font-bold uppercase tracking-wider mb-3">
            Comprehensive Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-[#123B2A] tracking-tight">
            Everything Your School Needs
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#123B2A]/70">
            Engineered specifically to solve the real administrative and academic challenges faced by schools daily.
          </p>
        </div>

        {/* 10 Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES_LIST.map((mod, index) => {
            const Icon = iconMap[mod.icon] || GraduationCap;
            return (
              <div
                key={mod.id}
                id={`module-card-${mod.id}`}
                className="glass-card glass-card-hover rounded-2xl p-6 relative group flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DDF7E8] to-[#F4FFF8] border border-[#19A66A]/25 flex items-center justify-center text-[#19A66A] shadow-xs group-hover:bg-[#19A66A] group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="text-[11px] font-bold text-[#19A66A] bg-[#DDF7E8]/70 px-2.5 py-1 rounded-full border border-[#19A66A]/20">
                      {mod.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold font-['Outfit'] text-[#123B2A] mb-2 flex items-center gap-1.5">
                    <span className="text-[#19A66A] font-extrabold">✔</span> {mod.title}
                  </h3>
                  <p className="text-sm text-[#123B2A]/75 leading-relaxed mb-4">
                    {mod.desc}
                  </p>
                </div>

                {/* Sub-features list */}
                <div className="pt-3 border-t border-[#19A66A]/10 space-y-1.5">
                  {mod.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-[#123B2A]/80 font-medium">
                      <Check className="w-3.5 h-3.5 text-[#19A66A] shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
