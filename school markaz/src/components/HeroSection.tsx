import React from 'react';
import {
  ArrowRight,
  Play,
  CheckCircle2,
  Users,
  GraduationCap,
  Percent,
  Wallet,
  CalendarCheck,
  TrendingUp,
  FileSpreadsheet,
  Building2,
  Search
} from 'lucide-react';
import { SCHOOL_STATS } from '../data/schoolData';

interface HeroSectionProps {
  onWatchDemo: () => void;
  onGetStarted: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onWatchDemo, onGetStarted }) => {
  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#F4FFF8] via-[#FFFFFF] to-[#F4FFF8]"
    >
      {/* Subtle ambient light-green background glows */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-[#19A66A]/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-36 right-10 w-[30rem] h-[30rem] bg-[#DDF7E8]/70 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Messaging */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDF7E8]/80 border border-[#19A66A]/25 text-[#123B2A] text-xs sm:text-sm font-semibold shadow-xs">
              <span className="text-base">🚀</span>
              <span>Complete School Management Solution</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-['Outfit'] text-[#123B2A] tracking-tight leading-[1.12]">
              Run Your Entire School From{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#19A66A] to-[#123B2A]">
                One Powerful System
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#123B2A]/80 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
              School Markaz brings your school's students, teachers, attendance, exams, fees, payroll
              and administration together in one fast, secure and easy-to-use platform.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onGetStarted}
                id="hero-get-started-btn"
                type="button"
                className="w-full sm:w-auto px-8 py-3.5 text-base font-bold text-white bg-[#19A66A] hover:bg-[#158f5b] rounded-xl shadow-lg shadow-[#19A66A]/30 hover:shadow-xl hover:shadow-[#19A66A]/40 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>GET STARTED</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onWatchDemo}
                id="hero-watch-demo-btn"
                type="button"
                className="w-full sm:w-auto px-7 py-3.5 text-base font-semibold text-[#123B2A] bg-white/80 hover:bg-white rounded-xl border border-[#19A66A]/25 shadow-sm hover:shadow-md hover:border-[#19A66A]/40 transition-all flex items-center justify-center gap-2.5 cursor-pointer backdrop-blur-md group"
              >
                <div className="w-8 h-8 rounded-full bg-[#DDF7E8] text-[#19A66A] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-[#19A66A] ml-0.5" />
                </div>
                <span>WATCH DEMO</span>
              </button>
            </div>

            {/* Secondary Trust Badges */}
            <div className="pt-3 border-t border-[#19A66A]/15 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-[#123B2A]/75">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#19A66A]" /> Fast
              </span>
              <span className="text-[#19A66A]/40">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#19A66A]" /> Secure
              </span>
              <span className="text-[#19A66A]/40">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#19A66A]" /> Fully Functional
              </span>
              <span className="text-[#19A66A]/40">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#19A66A]" /> Easy to Use
              </span>
            </div>
          </div>

          {/* Right Column: Realistic School Markaz Dashboard Mockup inside Glass Browser Frame */}
          <div className="lg:col-span-6 relative">
            
            {/* Floating Glass Badges */}
            <div className="hidden sm:flex absolute -top-5 -left-6 z-20 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/85 backdrop-blur-md border border-[#19A66A]/20 shadow-lg shadow-[#19A66A]/10 animate-bounce [animation-duration:5s]">
              <div className="w-8 h-8 rounded-xl bg-[#DDF7E8] flex items-center justify-center text-[#19A66A]">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-medium text-[#123B2A]/60">Total Active</div>
                <div className="text-sm font-bold text-[#123B2A]">1,250 Students</div>
              </div>
            </div>

            <div className="hidden sm:flex absolute -top-5 -right-4 z-20 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/85 backdrop-blur-md border border-[#19A66A]/20 shadow-lg shadow-[#19A66A]/10">
              <div className="w-8 h-8 rounded-xl bg-[#DDF7E8] flex items-center justify-center text-[#19A66A]">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-medium text-[#123B2A]/60">Teaching Staff</div>
                <div className="text-sm font-bold text-[#123B2A]">85 Teachers</div>
              </div>
            </div>

            <div className="hidden sm:flex absolute -bottom-6 -left-6 z-20 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/85 backdrop-blur-md border border-[#19A66A]/20 shadow-lg shadow-[#19A66A]/10">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-[#19A66A]">
                <Percent className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-medium text-[#123B2A]/60">Attendance Today</div>
                <div className="text-sm font-bold text-emerald-700">94% Present</div>
              </div>
            </div>

            <div className="hidden sm:flex absolute -bottom-6 -right-4 z-20 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/85 backdrop-blur-md border border-[#19A66A]/20 shadow-lg shadow-[#19A66A]/10">
              <div className="w-8 h-8 rounded-xl bg-[#DDF7E8] flex items-center justify-center text-[#19A66A]">
                <Wallet className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-medium text-[#123B2A]/60">Monthly Revenue</div>
                <div className="text-sm font-bold text-[#123B2A]">Rs. 450K Income</div>
              </div>
            </div>

            {/* Main Glass Browser Frame Container */}
            <div className="relative rounded-2xl bg-white/70 backdrop-blur-xl border border-[#19A66A]/25 shadow-2xl shadow-[#19A66A]/15 overflow-hidden transition-all duration-300">
              
              {/* Browser Window Chrome / Header */}
              <div className="bg-[#123B2A]/5 px-4 py-3 border-b border-[#19A66A]/15 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  <span className="ml-2 text-xs font-medium text-[#123B2A]/60 hidden sm:inline">
                    app.schoolmarkaz.com/admin/dashboard
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-semibold text-[#19A66A] bg-[#DDF7E8] px-2.5 py-0.5 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#19A66A] animate-pulse" />
                  Live Academic Session 2025-26
                </div>
              </div>

              {/* Inside Dashboard Application Preview */}
              <div className="grid grid-cols-12 text-left bg-[#F4FFF8]/40 min-h-[380px] sm:min-h-[420px]">
                
                {/* Left Mini Sidebar (Real School Markaz Modules) */}
                <div className="col-span-3 sm:col-span-3 bg-white/70 border-r border-[#19A66A]/15 p-2 sm:p-3 space-y-1">
                  <div className="px-2 py-1.5 flex items-center gap-2 mb-2 border-b border-[#19A66A]/10 pb-2">
                    <span className="text-lg">🎓</span>
                    <span className="text-xs font-bold text-[#123B2A] hidden sm:inline">Markaz ERP</span>
                  </div>

                  <div className="text-[10px] font-bold text-[#123B2A]/40 uppercase tracking-wider px-2 py-1 hidden sm:block">
                    Modules
                  </div>

                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#19A66A] text-white text-xs font-semibold shadow-xs">
                    <Building2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate hidden sm:inline">Dashboard</span>
                  </div>

                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[#123B2A]/80 hover:bg-[#DDF7E8]/50 text-xs font-medium">
                    <GraduationCap className="w-3.5 h-3.5 text-[#19A66A] shrink-0" />
                    <span className="truncate hidden sm:inline">Students</span>
                  </div>

                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[#123B2A]/80 hover:bg-[#DDF7E8]/50 text-xs font-medium">
                    <Users className="w-3.5 h-3.5 text-[#19A66A] shrink-0" />
                    <span className="truncate hidden sm:inline">Teachers</span>
                  </div>

                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[#123B2A]/80 hover:bg-[#DDF7E8]/50 text-xs font-medium">
                    <CalendarCheck className="w-3.5 h-3.5 text-[#19A66A] shrink-0" />
                    <span className="truncate hidden sm:inline">Attendance</span>
                  </div>

                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[#123B2A]/80 hover:bg-[#DDF7E8]/50 text-xs font-medium">
                    <Wallet className="w-3.5 h-3.5 text-[#19A66A] shrink-0" />
                    <span className="truncate hidden sm:inline">Fees Challan</span>
                  </div>

                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[#123B2A]/80 hover:bg-[#DDF7E8]/50 text-xs font-medium">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-[#19A66A] shrink-0" />
                    <span className="truncate hidden sm:inline">Exam Results</span>
                  </div>

                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[#123B2A]/80 hover:bg-[#DDF7E8]/50 text-xs font-medium">
                    <TrendingUp className="w-3.5 h-3.5 text-[#19A66A] shrink-0" />
                    <span className="truncate hidden sm:inline">Income/Expense</span>
                  </div>
                </div>

                {/* Right Main Dashboard Workspace Area */}
                <div className="col-span-9 sm:col-span-9 p-3 sm:p-4 space-y-3">
                  
                  {/* Top Search & School Title */}
                  <div className="flex items-center justify-between pb-2 border-b border-[#19A66A]/10">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#123B2A]">
                        Al-Hira Public High School & College
                      </h4>
                      <p className="text-[10px] text-[#123B2A]/60 hidden sm:block">
                        Main Campus • Head Office Portal
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/80 border border-[#19A66A]/20 px-2 py-1 rounded-md text-[11px] text-[#123B2A]/70">
                      <Search className="w-3 h-3 text-[#19A66A]" />
                      <span className="hidden sm:inline">Search Student / Roll No...</span>
                    </div>
                  </div>

                  {/* 4 Metric Cards Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="p-2 rounded-xl bg-white/80 border border-[#19A66A]/15 shadow-xs">
                      <div className="text-[10px] text-[#123B2A]/60">Students</div>
                      <div className="text-sm font-bold text-[#123B2A]">1,250</div>
                      <div className="text-[9px] text-[#19A66A] font-semibold">18 Sections</div>
                    </div>

                    <div className="p-2 rounded-xl bg-white/80 border border-[#19A66A]/15 shadow-xs">
                      <div className="text-[10px] text-[#123B2A]/60">Teachers</div>
                      <div className="text-sm font-bold text-[#123B2A]">85</div>
                      <div className="text-[9px] text-emerald-600 font-semibold">100% Assigned</div>
                    </div>

                    <div className="p-2 rounded-xl bg-white/80 border border-[#19A66A]/15 shadow-xs">
                      <div className="text-[10px] text-[#123B2A]/60">Present Today</div>
                      <div className="text-sm font-bold text-emerald-700">94%</div>
                      <div className="text-[9px] text-emerald-600 font-semibold">1,175 / 1,250</div>
                    </div>

                    <div className="p-2 rounded-xl bg-white/80 border border-[#19A66A]/15 shadow-xs">
                      <div className="text-[10px] text-[#123B2A]/60">Pending Fee</div>
                      <div className="text-sm font-bold text-amber-700">Rs. 125K</div>
                      <div className="text-[9px] text-amber-600 font-semibold">90% Collected</div>
                    </div>
                  </div>

                  {/* Financial Bar + Quick Stats */}
                  <div className="p-2.5 rounded-xl bg-white/70 border border-[#19A66A]/15 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-semibold">
                      <span className="text-[#123B2A]">Monthly Financial Overview</span>
                      <span className="text-[#19A66A]">Net Surplus: Rs. 270,000</span>
                    </div>
                    <div className="w-full bg-[#DDF7E8] h-2.5 rounded-full overflow-hidden flex">
                      <div className="bg-[#19A66A] h-full" style={{ width: '71%' }} title="Income: Rs 450,000" />
                      <div className="bg-amber-400 h-full" style={{ width: '29%' }} title="Expenses: Rs 180,000" />
                    </div>
                    <div className="flex justify-between text-[10px] text-[#123B2A]/70">
                      <span>Total Income: <strong className="text-[#123B2A]">Rs. 450,000</strong></span>
                      <span>Total Expenses: <strong className="text-[#123B2A]">Rs. 180,000</strong></span>
                    </div>
                  </div>

                  {/* Mini Student Records Table */}
                  <div className="rounded-xl bg-white/80 border border-[#19A66A]/15 overflow-hidden">
                    <div className="px-2.5 py-1.5 bg-[#DDF7E8]/40 border-b border-[#19A66A]/10 flex items-center justify-between text-[11px] font-bold text-[#123B2A]">
                      <span>Recent Student Roster</span>
                      <span className="text-[10px] text-[#19A66A] font-medium">Auto-Synced</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[11px]">
                        <thead className="bg-[#F4FFF8] text-[#123B2A]/70 text-[10px]">
                          <tr>
                            <th className="py-1 px-2">Student</th>
                            <th className="py-1 px-2">Class</th>
                            <th className="py-1 px-2">Attendance</th>
                            <th className="py-1 px-2">Fee Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#19A66A]/10">
                          <tr>
                            <td className="py-1 px-2 font-semibold text-[#123B2A]">Muhammad Ahmed</td>
                            <td className="py-1 px-2 text-[#123B2A]/70">Grade 8-A</td>
                            <td className="py-1 px-2 text-emerald-700 font-medium">96%</td>
                            <td className="py-1 px-2">
                              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                Paid
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-1 px-2 font-semibold text-[#123B2A]">Ayesha Khan</td>
                            <td className="py-1 px-2 text-[#123B2A]/70">Grade 7-B</td>
                            <td className="py-1 px-2 text-emerald-700 font-medium">91%</td>
                            <td className="py-1 px-2">
                              <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                                Pending
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-1 px-2 font-semibold text-[#123B2A]">Bilal Tariq</td>
                            <td className="py-1 px-2 text-[#123B2A]/70">Grade 10-A</td>
                            <td className="py-1 px-2 text-emerald-700 font-medium">98%</td>
                            <td className="py-1 px-2">
                              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                Paid
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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
