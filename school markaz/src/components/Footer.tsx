import React from 'react';
import { GraduationCap, Phone, Mail, Clock, ArrowUp, ShieldCheck } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export const Footer: React.FC = () => {
  const { settings } = useSchool();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FFFFFF] border-t border-[#19A66A]/20 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-[#19A66A]/15">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#19A66A] to-[#123B2A] flex items-center justify-center text-white shadow-md shadow-[#19A66A]/20 overflow-hidden">
                {settings.logo ? (
                  <img src={settings.logo} alt={settings.schoolName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <GraduationCap className="w-6 h-6" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-['Outfit'] font-extrabold text-xl tracking-tight text-[#123B2A] leading-none line-clamp-1">
                  {settings.schoolName}
                </span>
                <span className="text-[10px] tracking-wider text-[#123B2A]/60 font-medium mt-0.5">
                  {settings.motto || 'Complete School Management System'}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#123B2A]/75 leading-relaxed">
              {settings.address ? `${settings.address}. ` : ''}Empowering primary, secondary, and higher secondary schools with automated student records, 30-sec attendance, 3-copy fee challans, exam DMC, and teacher payroll.
            </p>

            <div className="flex items-center gap-1.5 text-xs text-[#19A66A] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#19A66A]" />
              <span>Session: {settings.academicSession}</span>
            </div>
          </div>

          {/* Col 2: Modules */}
          <div>
            <h4 className="text-sm font-bold font-['Outfit'] text-[#123B2A] uppercase tracking-wider mb-4">
              Core Modules
            </h4>
            <ul className="space-y-2 text-xs text-[#123B2A]/75 font-medium">
              <li><a href="#modules" className="hover:text-[#19A66A] transition-colors">Student Management</a></li>
              <li><a href="#modules" className="hover:text-[#19A66A] transition-colors">Teacher Management</a></li>
              <li><a href="#modules" className="hover:text-[#19A66A] transition-colors">Smart 30-Sec Attendance</a></li>
              <li><a href="#modules" className="hover:text-[#19A66A] transition-colors">Examinations & DMC Cards</a></li>
              <li><a href="#modules" className="hover:text-[#19A66A] transition-colors">Fee Management & Challans</a></li>
              <li><a href="#modules" className="hover:text-[#19A66A] transition-colors">Teachers Payroll & Accounts</a></li>
            </ul>
          </div>

          {/* Col 3: Navigation Links */}
          <div>
            <h4 className="text-sm font-bold font-['Outfit'] text-[#123B2A] uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#123B2A]/75 font-medium">
              <li><a href="#dashboard" className="hover:text-[#19A66A] transition-colors">Interactive Live Software</a></li>
              <li><a href="#apps" className="hover:text-[#19A66A] transition-colors">Dedicated Mobile Apps</a></li>
              <li><a href="#video-demo" className="hover:text-[#19A66A] transition-colors">Video Demonstration</a></li>
              <li><a href="#packages" className="hover:text-[#19A66A] transition-colors">Simple Packages & Pricing</a></li>
              <li><a href="#how-it-works" className="hover:text-[#19A66A] transition-colors">How It Works</a></li>
              <li><a href="#faq" className="hover:text-[#19A66A] transition-colors">Frequently Asked Questions</a></li>
              <li><a href="/admin/dashboard" className="text-[#19A66A] font-bold hover:underline">Admin Portal (Mharryjs)</a></li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="text-sm font-bold font-['Outfit'] text-[#123B2A] uppercase tracking-wider mb-4">
              Direct Inquiries
            </h4>
            <div className="space-y-3 text-xs text-[#123B2A]/80">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#19A66A] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#123B2A]">Phone / WhatsApp:</div>
                  <div className="text-[#19A66A] font-bold">{settings.phone}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#19A66A] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#123B2A]">Official Email:</div>
                  <div className="text-[#19A66A]">{settings.email}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#19A66A] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#123B2A]">Support Hours:</div>
                  <div className="text-gray-600">Mon - Sat: 8:00 AM - 8:00 PM PKT</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#123B2A]/70 border-t border-[#19A66A]/10 mt-2">
          <div className="flex flex-wrap items-center gap-2">
            <span>© 2026 {settings.schoolName}. All Rights Reserved.</span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span className="font-semibold text-[#123B2A] bg-[#19A66A]/10 px-2.5 py-0.5 rounded-full border border-[#19A66A]/20">
              Designed & Developed by Mharryjs
            </span>
          </div>

          <button
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-1.5 font-bold text-[#19A66A] hover:text-[#123B2A] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
