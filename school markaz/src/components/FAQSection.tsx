import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_DATA } from '../data/schoolData';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#F4FFF8] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDF7E8] text-[#123B2A] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#19A66A]" />
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-[#123B2A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#123B2A]/70">
            Find answers to common questions about School Markaz features, packages and setup.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                id={`faq-item-${index}`}
                className="glass-card rounded-2xl overflow-hidden border border-[#19A66A]/20 transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/60 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold font-['Outfit'] text-[#123B2A]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#DDF7E8] text-[#19A66A] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#19A66A] text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#123B2A]/80 leading-relaxed border-t border-[#19A66A]/10 bg-white/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-[#19A66A]/25 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-[#123B2A]">Have a question not listed here?</h4>
            <p className="text-xs text-[#123B2A]/70">Our educational software specialists are ready to help your school.</p>
          </div>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-xl bg-[#19A66A] text-white text-xs font-bold hover:bg-[#158f5b] transition-all shadow-xs"
          >
            Contact Support Team
          </a>
        </div>

      </div>
    </section>
  );
};
