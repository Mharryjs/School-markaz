import React from 'react';
import {
  FileText,
  UserCheck,
  Wallet,
  PieChart,
  Layers,
  Database,
  BookOpen,
  Briefcase,
  Banknote,
  Activity,
  MessageSquare,
  Settings
} from 'lucide-react';
import { FEATURES_12 } from '../data/schoolData';

export const FeaturesGrid: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    FileText,
    UserCheck,
    Wallet,
    PieChart,
    Layers,
    Database,
    BookOpen,
    Briefcase,
    Banknote,
    Activity,
    MessageSquare,
    Settings,
  };

  return (
    <section id="features" className="py-20 bg-[#F4FFF8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDF7E8] text-[#123B2A] text-xs font-bold uppercase tracking-wider mb-3">
            Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-[#123B2A] tracking-tight">
            Powerful Features. Simple Experience.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#123B2A]/70">
            Engineered with deep attention to the daily operational flow of school administrators, teachers, and finance teams.
          </p>
        </div>

        {/* 12 Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {FEATURES_12.map((feature, idx) => {
            const Icon = iconMap[feature.icon] || FileText;
            return (
              <div
                key={idx}
                id={`feature-card-${idx}`}
                className="glass-card glass-card-hover rounded-2xl p-5 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#DDF7E8] border border-[#19A66A]/20 flex items-center justify-center text-[#19A66A] mb-3.5 transition-all duration-300 group-hover:bg-[#19A66A] group-hover:text-white group-hover:scale-105 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-['Outfit'] text-[#123B2A] mb-1.5 group-hover:text-[#19A66A] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-[#123B2A]/70 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-[#19A66A]/10 flex items-center justify-between text-[11px] text-[#19A66A] font-semibold">
                  <span>Explore Feature</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
