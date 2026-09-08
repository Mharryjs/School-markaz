import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/schoolData';
import { School, UserPlus, SlidersHorizontal, LineChart } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const stepIcons = [School, UserPlus, SlidersHorizontal, LineChart];

  return (
    <section id="how-it-works" className="py-20 bg-[#F4FFF8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDF7E8] text-[#123B2A] text-xs font-bold uppercase tracking-wider mb-3">
            Fast Deployment
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-[#123B2A] tracking-tight">
            Get Started In Four Simple Steps
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#123B2A]/70">
            From registration to daily attendance and fee collection in less than 24 hours.
          </p>
        </div>

        {/* Timeline (Horizontal on Desktop, Vertical on Mobile) */}
        <div className="relative">
          
          {/* Connecting Line on Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-1 bg-[#19A66A]/20 -translate-y-6 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {HOW_IT_WORKS_STEPS.map((step, idx) => {
              const Icon = stepIcons[idx] || School;
              return (
                <div
                  key={step.step}
                  id={`step-${step.step}`}
                  className="glass-card rounded-3xl p-6 relative flex flex-col justify-between hover:border-[#19A66A]/40 transition-all group"
                >
                  <div>
                    {/* Top Row: Step Number & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#DDF7E8] to-white border border-[#19A66A]/30 flex items-center justify-center text-[#19A66A] shadow-xs group-hover:scale-110 group-hover:bg-[#19A66A] group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-3xl font-extrabold font-['Outfit'] text-[#19A66A]/30 group-hover:text-[#19A66A]/60 transition-colors">
                        {step.step}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-['Outfit'] text-[#123B2A] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#123B2A]/70 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#19A66A]/10 text-[11px] font-bold text-[#19A66A] flex items-center gap-1">
                    <span>Step {idx + 1} of 4</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
