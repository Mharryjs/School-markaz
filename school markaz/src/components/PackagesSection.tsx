import React from 'react';
import { Check, Sparkles, ArrowRight, Shield } from 'lucide-react';
import { PACKAGES_LIST } from '../data/schoolData';

interface PackagesSectionProps {
  onSelectPackage: (packageName: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackage }) => {
  return (
    <section id="packages" className="py-20 bg-[#FFFFFF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDF7E8] text-[#123B2A] text-xs font-bold uppercase tracking-wider mb-3">
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-[#123B2A] tracking-tight">
            Simple & Flexible Packages
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#123B2A]/70">
            Choose the package that fits your school's size and requirements. No hidden setup fees or surprise charges.
          </p>
        </div>

        {/* 4 Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PACKAGES_LIST.map((pkg) => {
            const isPopular = pkg.popular;
            return (
              <div
                key={pkg.id}
                id={`package-card-${pkg.id}`}
                className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-gradient-to-b from-[#FFFFFF] via-[#F4FFF8] to-[#FFFFFF] border-2 border-[#19A66A] shadow-xl green-glow -translate-y-2'
                    : 'glass-card glass-card-hover'
                }`}
              >
                {/* Popular Ribbon */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#19A66A] text-white text-[11px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-white" />
                    <span>POPULAR</span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <h3 className="text-lg font-bold font-['Outfit'] text-[#123B2A]">
                    {pkg.name}
                  </h3>
                  {pkg.tagline && (
                    <p className="text-[11px] text-[#19A66A] font-semibold mt-0.5">
                      {pkg.tagline}
                    </p>
                  )}

                  {/* Price */}
                  <div className="my-4 pb-4 border-b border-[#19A66A]/15">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#123B2A] font-['Outfit']">
                        {pkg.price}
                      </span>
                      {pkg.period && (
                        <span className="text-xs text-[#123B2A]/60 font-medium">
                          {pkg.period}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 text-xs font-semibold text-[#19A66A] space-y-0.5">
                      <div>• {pkg.studentLimit}</div>
                      <div>• {pkg.teacherLimit}</div>
                    </div>
                  </div>

                  {/* Features Checklist */}
                  <div className="space-y-2.5 mb-6 text-xs text-[#123B2A]/80">
                    <div className="text-[11px] font-bold text-[#123B2A]/50 uppercase tracking-wider">
                      Includes:
                    </div>
                    {pkg.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#DDF7E8] text-[#19A66A] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA Button */}
                <button
                  type="button"
                  onClick={() => onSelectPackage(pkg.name)}
                  className={`w-full py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isPopular
                      ? 'bg-[#19A66A] text-white hover:bg-[#158f5b] shadow-md shadow-[#19A66A]/30'
                      : 'bg-[#DDF7E8]/70 text-[#123B2A] hover:bg-[#19A66A] hover:text-white border border-[#19A66A]/20'
                  }`}
                >
                  <span>{pkg.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Free Migration & Support Guarantee Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#DDF7E8]/50 border border-[#19A66A]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#19A66A] text-white flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#123B2A]">Free Onboarding & Historical Data Migration</h4>
              <p className="text-xs text-[#123B2A]/70">Our tech team will import your existing Excel sheets and configure your classes for free.</p>
            </div>
          </div>
          <button
            onClick={() => onSelectPackage('Custom Budget Package')}
            className="px-5 py-2 text-xs font-bold text-[#123B2A] bg-white rounded-xl border border-[#19A66A]/30 hover:bg-[#F4FFF8] transition-colors cursor-pointer"
          >
            Speak With Specialist
          </button>
        </div>

      </div>
    </section>
  );
};
