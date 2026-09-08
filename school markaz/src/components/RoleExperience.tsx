import React, { useState } from 'react';
import {
  Shield,
  GraduationCap,
  Users,
  CheckCircle2,
  CalendarCheck,
  Award,
  Wallet,
  Clock,
  Bell,
  ArrowRight,
  ExternalLink,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface RoleExperienceProps {
  onNavigateTo?: (path: string) => void;
}

export const RoleExperience: React.FC<RoleExperienceProps> = ({ onNavigateTo }) => {
  const [activeRole, setActiveRole] = useState<'admin' | 'principal' | 'teacher' | 'student'>('admin');

  return (
    <section id="roles" className="py-20 bg-[#FFFFFF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDF7E8] text-[#123B2A] text-xs font-bold uppercase tracking-wider mb-3">
            Tailored Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-[#123B2A] tracking-tight">
            Tailored For Every Campus Role
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#123B2A]/70">
            Dedicated portals engineered specifically for School Owners, Principals, Faculty Teachers, and Students/Parents.
          </p>

          {/* Interactive Role Switcher Tabs (4 Roles) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            <button
              onClick={() => setActiveRole('admin')}
              id="role-tab-admin"
              type="button"
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeRole === 'admin'
                  ? 'bg-[#19A66A] text-white shadow-lg shadow-[#19A66A]/25 scale-105'
                  : 'bg-[#F4FFF8] text-[#123B2A]/80 hover:bg-[#DDF7E8] border border-[#19A66A]/20'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>SUPER ADMIN</span>
            </button>

            <button
              onClick={() => setActiveRole('principal')}
              id="role-tab-principal"
              type="button"
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeRole === 'principal'
                  ? 'bg-[#123B2A] text-[#F4D068] shadow-lg shadow-[#123B2A]/30 border border-[#D4AF37]/50 scale-105'
                  : 'bg-[#F4FFF8] text-[#123B2A]/80 hover:bg-[#DDF7E8] border border-[#19A66A]/20'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>PRINCIPAL (SIR)</span>
            </button>

            <button
              onClick={() => setActiveRole('teacher')}
              id="role-tab-teacher"
              type="button"
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeRole === 'teacher'
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/25 scale-105'
                  : 'bg-[#F4FFF8] text-[#123B2A]/80 hover:bg-[#DDF7E8] border border-[#19A66A]/20'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>TEACHER</span>
            </button>

            <button
              onClick={() => setActiveRole('student')}
              id="role-tab-student"
              type="button"
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeRole === 'student'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-105'
                  : 'bg-[#F4FFF8] text-[#123B2A]/80 hover:bg-[#DDF7E8] border border-[#19A66A]/20'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>STUDENT / PARENT</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display Area based on Active Role */}
        <div className="rounded-3xl glass-card p-6 sm:p-8 transition-all duration-300">
          
          {/* 1. ADMIN ROLE VIEW */}
          {activeRole === 'admin' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold text-[#19A66A] bg-[#DDF7E8] px-3 py-1 rounded-full uppercase">
                  School Administrator & Founder
                </span>
                <h3 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                  Complete master control over school operations.
                </h3>
                <p className="text-sm text-[#123B2A]/75 leading-relaxed">
                  Oversee all departments from admissions to accounts in a single master command center.
                  Track real-time fee recovery, authorize staff salaries, dispatch broadcast notices and inspect audited reports.
                </p>
                <div className="space-y-2 pt-2 text-xs font-semibold text-[#123B2A]/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#19A66A]" />
                    <span>Multi-campus & academic session management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#19A66A]" />
                    <span>Automated fee challan batch printing & accounts ledger</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#19A66A]" />
                    <span>Real-time security audits and login tracking</span>
                  </div>
                </div>

                {onNavigateTo && (
                  <button
                    type="button"
                    onClick={() => onNavigateTo('/admin/dashboard')}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-all"
                  >
                    <span>Launch Admin Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Realistic Admin Dashboard UI Frame */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-4 border border-[#19A66A]/25 shadow-xl space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#19A66A]/10 text-xs">
                  <span className="font-bold text-[#123B2A]">Admin Command View • Session 2025-26</span>
                  <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-semibold text-[10px]">Super Admin Access</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 bg-[#F4FFF8] rounded-xl border border-[#19A66A]/20">
                    <div className="text-[10px] text-gray-500">Total Enrolled</div>
                    <div className="text-base font-bold text-[#123B2A]">1,250</div>
                    <div className="text-[9px] text-[#19A66A]">18 Sections Active</div>
                  </div>
                  <div className="p-2.5 bg-[#F4FFF8] rounded-xl border border-[#19A66A]/20">
                    <div className="text-[10px] text-gray-500">Collected Revenue</div>
                    <div className="text-base font-bold text-emerald-700">Rs. 1.12M</div>
                    <div className="text-[9px] text-emerald-600">90% of Target</div>
                  </div>
                  <div className="p-2.5 bg-[#F4FFF8] rounded-xl border border-[#19A66A]/20">
                    <div className="text-[10px] text-gray-500">Net Surplus</div>
                    <div className="text-base font-bold text-[#123B2A]">Rs. 270K</div>
                    <div className="text-[9px] text-emerald-600">Positive Balance</div>
                  </div>
                </div>
                <div className="p-3 bg-[#DDF7E8]/40 rounded-xl border border-[#19A66A]/15 text-xs flex items-center justify-between">
                  <span className="font-semibold text-[#123B2A]">32 Fee defaulter parents pending reminder call</span>
                  <button className="px-2.5 py-1 text-[10px] font-bold text-white bg-[#19A66A] rounded-lg">
                    Send WhatsApp Reminder
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. PRINCIPAL (SIR) ROLE VIEW */}
          {activeRole === 'principal' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold text-[#92400E] bg-[#FEF3C7] border border-[#F59E0B]/30 px-3 py-1 rounded-full uppercase">
                  Executive Principal & Campus Head
                </span>
                <h3 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                  Institutional leadership, approvals, and faculty governance.
                </h3>
                <p className="text-sm text-[#123B2A]/75 leading-relaxed">
                  Engineered with dignity for the Head of Institution. Approve staff leaves, issue official circulars to parents, review discipline cases, and oversee teacher lesson planning.
                </p>
                <div className="space-y-2 pt-2 text-xs font-semibold text-[#123B2A]/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>One-click digital signature for official circulars</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Faculty attendance audit & staff leave sanction desk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Exam schedule verification & academic quality benchmarks</span>
                  </div>
                </div>

                {onNavigateTo && (
                  <button
                    type="button"
                    onClick={() => onNavigateTo('/principal/dashboard')}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-[#123B2A] hover:bg-[#0B2317] text-[#F4D068] border border-[#D4AF37]/50 text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-all"
                  >
                    <span>Launch Principal Portal (Sir Kamran)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Realistic Principal Interface UI Frame */}
              <div className="lg:col-span-7 bg-[#0B2317] text-white rounded-2xl p-5 border border-[#D4AF37]/30 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#F4D068] to-[#AA7C11] text-[#0B2317] flex items-center justify-center font-extrabold text-xs">
                      SK
                    </div>
                    <div>
                      <div className="font-bold text-white">Sir Kamran Badini</div>
                      <div className="text-[10px] text-[#D4AF37]">Head of Institution • Executive Office</div>
                    </div>
                  </div>
                  <span className="text-[#F4D068] bg-[#F4D068]/10 border border-[#F4D068]/30 px-2.5 py-0.5 rounded-full font-semibold text-[10px]">
                    Official Seal Active
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-[10px] text-gray-400">Campus Attendance</div>
                    <div className="text-lg font-bold text-emerald-400">94.8%</div>
                    <div className="text-[9px] text-gray-400">1,185 present today</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-[10px] text-gray-400">Faculty on Duty</div>
                    <div className="text-lg font-bold text-[#F4D068]">46 / 48</div>
                    <div className="text-[9px] text-gray-400">2 on sanctioned leave</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-[10px] text-gray-400">Pending Approvals</div>
                    <div className="text-lg font-bold text-rose-400">3 Items</div>
                    <div className="text-[9px] text-gray-400">Requires review</div>
                  </div>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-bold text-white">Circular #SKM-2025/11: Mid-Term Examination Datesheet</div>
                    <div className="text-[10px] text-gray-400">Signed with Principal seal • Broadcasted to 1,250 parents</div>
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg">
                    Published
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 3. TEACHER ROLE VIEW */}
          {activeRole === 'teacher' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold text-teal-800 bg-teal-100 px-3 py-1 rounded-full uppercase">
                  Faculty & Class Instructors
                </span>
                <h3 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                  Manage classes, attendance, students and results with ease.
                </h3>
                <p className="text-sm text-[#123B2A]/75 leading-relaxed">
                  Eliminate paperwork from the classroom. Teachers can take daily roll call in 30 seconds,
                  record exam and quiz scores, distribute syllabus homework and communicate directly with class parents.
                </p>
                <div className="space-y-2 pt-2 text-xs font-semibold text-[#123B2A]/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span>Class roster with student health and emergency contacts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span>One-click test marks submission for automated report cards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span>Staff leave request tracker & printable salary vouchers</span>
                  </div>
                </div>

                {onNavigateTo && (
                  <button
                    type="button"
                    onClick={() => onNavigateTo('/teacher/dashboard')}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-all"
                  >
                    <span>Launch Teacher Portal (Madam Ayesha)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Realistic Teacher Interface UI Frame */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-4 border border-teal-500/25 shadow-xl space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-teal-500/10 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                      AK
                    </div>
                    <span className="font-bold text-[#123B2A]">Madam Ayesha Khan • Class Incharge 9-A</span>
                  </div>
                  <span className="text-teal-700 bg-teal-100 px-2 py-0.5 rounded font-semibold text-[10px]">Active Session</span>
                </div>
                <div className="p-3 bg-[#F4FFF8] rounded-xl border border-[#19A66A]/20 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#123B2A]">
                    <span>Grade 9-A Daily Roll Call (38 Students)</span>
                    <span className="text-teal-700">36 Present</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-white rounded-lg border border-gray-100 flex items-center justify-between">
                      <span>Hamza Ahmed (Roll #24)</span>
                      <span className="text-emerald-700 font-bold">Present</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-gray-100 flex items-center justify-between">
                      <span>Bilal Raza (Roll #18)</span>
                      <span className="text-rose-600 font-bold">Absent (SMS Sent)</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-gray-500">Mid-Term Marks entry status: 38/38 Completed</span>
                  <button className="px-3 py-1 font-bold text-xs text-white bg-teal-600 rounded-lg">
                    Submit Marks to Principal
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 4. STUDENT ROLE VIEW */}
          {activeRole === 'student' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold text-blue-800 bg-blue-100 px-3 py-1 rounded-full uppercase">
                  Students & Parents Portal
                </span>
                <h3 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                  Access attendance, results, fees, timetable and notifications.
                </h3>
                <p className="text-sm text-[#123B2A]/75 leading-relaxed">
                  Keep parents informed and students engaged. View monthly attendance percentage, download
                  official examination result cards (DMC), review fee challans and read school circulars directly from any phone or PC.
                </p>
                <div className="space-y-2 pt-2 text-xs font-semibold text-[#123B2A]/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Real-time SMS alerts when attendance is marked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Computerized Detailed Marks Certificate (DMC) downloads</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Digital fee challans with verified payment receipts</span>
                  </div>
                </div>

                {onNavigateTo && (
                  <button
                    type="button"
                    onClick={() => onNavigateTo('/student/dashboard')}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-all"
                  >
                    <span>Launch Student Portal (Hamza Ahmed)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Realistic Student Interface UI Frame */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-4 border border-blue-500/25 shadow-xl space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-blue-500/10 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                      HA
                    </span>
                    <span className="font-bold text-[#123B2A]">Hamza Ahmed • Roll # 9A-24</span>
                  </div>
                  <span className="text-blue-700 bg-blue-100 px-2 py-0.5 rounded font-semibold text-[10px]">Grade 9-A Science</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-200">
                    <div className="text-[10px] text-gray-500">Attendance Rate</div>
                    <div className="text-lg font-bold text-emerald-700">97.2% Present</div>
                    <div className="text-[10px] text-[#19A66A]">Exemplary Record</div>
                  </div>
                  <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-200">
                    <div className="text-[10px] text-gray-500">Term 1 Examination</div>
                    <div className="text-lg font-bold text-[#123B2A]">Grade A+ (94.5%)</div>
                    <div className="text-[10px] text-amber-600 font-bold">Class Rank #2</div>
                  </div>
                </div>
                <div className="p-3 bg-[#DDF7E8]/40 rounded-xl border border-[#19A66A]/15 text-xs flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#123B2A]">September Tuition Fee Challan</div>
                    <div className="text-[10px] text-gray-500">Voucher SMK-0924 • Rs. 3,500</div>
                  </div>
                  <span className="px-2.5 py-1 text-[11px] font-bold bg-emerald-100 text-emerald-800 rounded-lg">
                    Paid Online
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
