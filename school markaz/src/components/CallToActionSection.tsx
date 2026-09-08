import React from 'react';
import { ArrowRight, Play, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface CallToActionSectionProps {
  onRequestDemo: () => void;
  onWatchVideo: () => void;
}

export const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  onRequestDemo,
  onWatchVideo,
}) => {
  return (
    <section className="py-20 relative bg-gradient-to-b from-[#F4FFF8] to-[#FFFFFF] overflow-hidden">
      {/* Soft Glow Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#19A66A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#DDF7E8] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-card rounded-3xl p-8 sm:p-14 text-center border border-[#19A66A]/30 shadow-2xl green-glow-lg relative overflow-hidden bg-white/80">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDF7E8] text-[#123B2A] text-xs font-bold uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#19A66A]" />
            Transform Your Campus Operations
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Outfit'] text-[#123B2A] tracking-tight max-w-2xl mx-auto">
            Ready To Modernize Your School?
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-[#123B2A]/75 max-w-xl mx-auto leading-relaxed">
            Join hundreds of schools simplifying their management with School Markaz. Experience faster fee collection, zero attendance hassle, and peace of mind.
          </p>

          {/* Floating Trust Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 my-8 text-xs font-semibold text-[#123B2A]/80">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F4FFF8] border border-[#19A66A]/20">
              <CheckCircle2 className="w-4 h-4 text-[#19A66A]" />
              <span>Instant 24-Hour Setup</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F4FFF8] border border-[#19A66A]/20">
              <ShieldCheck className="w-4 h-4 text-[#19A66A]" />
              <span>Encrypted & Cloud Backed</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F4FFF8] border border-[#19A66A]/20">
              <Zap className="w-4 h-4 text-[#19A66A]" />
              <span>Free Staff Onboarding</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onRequestDemo}
              type="button"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white text-sm font-bold shadow-lg shadow-[#19A66A]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request Free Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onWatchVideo}
              type="button"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-[#F4FFF8] text-[#123B2A] text-sm font-bold border border-[#19A66A]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-[#19A66A] text-[#19A66A]" />
              <span>Watch Video Again</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
