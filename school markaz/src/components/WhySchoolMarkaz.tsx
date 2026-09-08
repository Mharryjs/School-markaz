import React from 'react';
import { WHY_CHOOSE_ITEMS } from '../data/schoolData';
import {
  Layers,
  Zap,
  ShieldCheck,
  Smartphone,
  Sparkles,
  FileCheck2
} from 'lucide-react';

export const WhySchoolMarkaz: React.FC = () => {
  const panelIcons = [Layers, Zap, ShieldCheck, Smartphone, Sparkles, FileCheck2];

  return (
    <section id="why-markaz" className="py-20 bg-gradient-to-b from-[#FFFFFF] via-[#F4FFF8] to-[#FFFFFF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDF7E8] text-[#123B2A] text-xs font-bold uppercase tracking-wider mb-3">
            Why Educational Leaders Trust Us
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-[#123B2A] tracking-tight">
            Why Choose School Markaz?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#123B2A]/70">
            A software engineered from the ground up to eliminate institutional chaos, cut operational costs and elevate parent satisfaction.
          </p>
        </div>

        {/* 6 Premium Glass Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_ITEMS.map((item, idx) => {
            const Icon = panelIcons[idx] || Layers;
            return (
              <div
                key={item.num}
                id={`why-card-${item.num}`}
                className="glass-card glass-card-hover rounded-3xl p-6 relative flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#DDF7E8] border border-[#19A66A]/20 flex items-center justify-center text-[#19A66A] shadow-xs group-hover:scale-105 group-hover:bg-[#19A66A] group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#19A66A] bg-[#DDF7E8]/70 px-2.5 py-1 rounded-full">
                      #{item.num}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-['Outfit'] text-[#123B2A] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#123B2A]/75 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Animated Stat Pill at Bottom */}
                <div className="mt-6 pt-4 border-t border-[#19A66A]/10 flex items-baseline justify-between">
                  <span className="text-xs font-medium text-[#123B2A]/60">
                    {item.statLabel}
                  </span>
                  <span className="text-2xl font-extrabold font-['Outfit'] text-[#19A66A] group-hover:scale-105 transition-transform">
                    {item.stat}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
