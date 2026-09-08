import React, { useState, useEffect } from 'react';
import {
  Send,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Calendar,
  Building2
} from 'lucide-react';
import { PACKAGES_LIST } from '../data/schoolData';
import { submitDemoInquiry } from '../services/api';

interface ContactDemoSectionProps {
  selectedPackageName: string;
}

export const ContactDemoSection: React.FC<ContactDemoSectionProps> = ({ selectedPackageName }) => {
  const [formData, setFormData] = useState({
    schoolName: '',
    contactName: '',
    phone: '',
    email: '',
    studentsCount: '100 - 250 Students',
    teachersCount: '20 - 50 Teachers',
    selectedPackage: selectedPackageName || '250 Students Package (Rs. 2,500/mo)',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedPackageName) {
      setFormData((prev) => ({ ...prev, selectedPackage: selectedPackageName }));
    }
  }, [selectedPackageName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitDemoInquiry({
        schoolName: formData.schoolName,
        senderName: formData.contactName,
        phone: formData.phone,
        email: formData.email,
        students: formData.studentsCount,
        teachers: formData.teachersCount,
        message: formData.message,
        packageName: formData.selectedPackage,
      });
    } catch {
      // ignore
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#FFFFFF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDF7E8] text-[#123B2A] text-xs font-bold uppercase tracking-wider mb-3">
            Get Started Today
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-[#123B2A] tracking-tight">
            Request A Free Demo For Your School
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#123B2A]/70">
            See how School Markaz can organize your students, teachers, attendance, fees and daily school management.
          </p>
        </div>

        {/* 2-Column Layout: Form + Info Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Free Demo Request Form */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 relative">
            
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#DDF7E8] text-[#19A66A] flex items-center justify-center mx-auto border-2 border-[#19A66A] animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-['Outfit'] text-[#123B2A]">
                  Demo Request Received!
                </h3>
                <p className="text-sm text-[#123B2A]/75 max-w-md mx-auto">
                  Thank you, <strong>{formData.contactName || 'Administrator'}</strong>. Our senior implementation consultant will contact <strong>{formData.schoolName || 'your school'}</strong> at <strong>{formData.phone || 'your phone'}</strong> within 2 business hours with full system credentials.
                </p>
                <div className="p-4 rounded-xl bg-[#F4FFF8] border border-[#19A66A]/20 text-xs text-[#19A66A] font-semibold max-w-sm mx-auto">
                  ✓ Free 14-day full software trial activated with demo data
                </div>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#19A66A] text-white text-xs font-bold hover:bg-[#158f5b] transition-all cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#123B2A] mb-1">
                      School / Institution Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Al-Huda Model School"
                      value={formData.schoolName}
                      onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#19A66A]/25 text-xs text-[#123B2A] focus:outline-none focus:border-[#19A66A] focus:ring-1 focus:ring-[#19A66A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#123B2A] mb-1">
                      Contact Person & Designation *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Prof. Tariq Mahmood (Principal)"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#19A66A]/25 text-xs text-[#123B2A] focus:outline-none focus:border-[#19A66A] focus:ring-1 focus:ring-[#19A66A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#123B2A] mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +92 300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#19A66A]/25 text-xs text-[#123B2A] focus:outline-none focus:border-[#19A66A] focus:ring-1 focus:ring-[#19A66A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#123B2A] mb-1">
                      Official Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. principal@school.edu.pk"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#19A66A]/25 text-xs text-[#123B2A] focus:outline-none focus:border-[#19A66A] focus:ring-1 focus:ring-[#19A66A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#123B2A] mb-1">
                      Number of Students
                    </label>
                    <select
                      value={formData.studentsCount}
                      onChange={(e) => setFormData({ ...formData, studentsCount: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#19A66A]/25 text-xs text-[#123B2A] focus:outline-none focus:border-[#19A66A]"
                    >
                      <option>Under 100 Students</option>
                      <option>100 - 250 Students</option>
                      <option>250 - 500 Students</option>
                      <option>500 - 1,000 Students</option>
                      <option>1,000+ Students (Multi-Campus)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#123B2A] mb-1">
                      Number of Teachers
                    </label>
                    <select
                      value={formData.teachersCount}
                      onChange={(e) => setFormData({ ...formData, teachersCount: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#19A66A]/25 text-xs text-[#123B2A] focus:outline-none focus:border-[#19A66A]"
                    >
                      <option>Under 20 Teachers</option>
                      <option>20 - 50 Teachers</option>
                      <option>50 - 100 Teachers</option>
                      <option>100+ Teachers</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#123B2A] mb-1">
                    Selected Package Interest
                  </label>
                  <select
                    value={formData.selectedPackage}
                    onChange={(e) => setFormData({ ...formData, selectedPackage: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#19A66A]/25 text-xs text-[#123B2A] focus:outline-none focus:border-[#19A66A]"
                  >
                    <option>Starter Package (Rs. 1,000 / month)</option>
                    <option>250 Students Package (Rs. 2,500 / month) - Popular</option>
                    <option>Premium Custom Package</option>
                    <option>Custom Budget Package (Built Around Your Budget)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#123B2A] mb-1">
                    Specific Requirements / Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your current challenges, e.g. need fee challan printing, biometric attendance integration, or data import from Excel..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#19A66A]/25 text-xs text-[#123B2A] focus:outline-none focus:border-[#19A66A]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white text-sm font-bold shadow-lg shadow-[#19A66A]/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  {isSubmitting ? (
                    <span>Processing Request...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Schedule Free Demo</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-[#123B2A]/60 text-center">
                  🔒 No credit card required. Free personalized 1-on-1 walkthrough with your school data.
                </p>
              </form>
            )}

          </div>

          {/* RIGHT: Direct Contact Details & Why Demo */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-4">
              <h3 className="text-lg font-bold font-['Outfit'] text-[#123B2A]">
                Why schedule a live demo?
              </h3>
              <div className="space-y-3 text-xs text-[#123B2A]/80">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#DDF7E8] text-[#19A66A] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-[#123B2A] block">Personalized Workflow Tour</strong>
                    See exactly how your classes, fee heads, and exam rules will be configured.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#DDF7E8] text-[#19A66A] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-[#123B2A] block">Free Existing Data Migration</strong>
                    Our engineers will migrate your existing Excel spreadsheets and student bio-data free.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#DDF7E8] text-[#19A66A] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-[#123B2A] block">Staff Training Included</strong>
                    We train your school clerks, teachers and accountants at zero extra cost.
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Information */}
            <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-4 bg-gradient-to-br from-white to-[#F4FFF8]">
              <h4 className="text-sm font-bold font-['Outfit'] text-[#123B2A] uppercase tracking-wider text-[#19A66A]">
                Direct Contact & Support
              </h4>

              <div className="space-y-3 text-xs text-[#123B2A]/80">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#DDF7E8] text-[#19A66A] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#123B2A]">Phone & WhatsApp Direct</div>
                    <div className="text-[#19A66A] font-bold">+92 300 0000000 / +92 321 0000000</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#DDF7E8] text-[#19A66A] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#123B2A]">Official Email Support</div>
                    <div className="text-[#19A66A] font-bold">support@schoolmarkaz.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#DDF7E8] text-[#19A66A] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#123B2A]">Support Hours</div>
                    <div className="text-gray-600">Monday - Saturday: 8:00 AM - 8:00 PM PKT</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
