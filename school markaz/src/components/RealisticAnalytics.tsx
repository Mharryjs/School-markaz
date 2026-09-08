import React, { useState } from 'react';
import {
  TrendingUp,
  Users,
  CalendarCheck,
  Wallet,
  GraduationCap,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';
import { SCHOOL_STATS } from '../data/schoolData';

export const RealisticAnalytics: React.FC = () => {
  const [activeChart, setActiveChart] = useState<'growth' | 'attendance' | 'fees' | 'finance'>('growth');

  // Believable monthly enrollment data
  const enrollmentGrowth = [
    { month: 'Apr', students: 980 },
    { month: 'May', students: 1040 },
    { month: 'Jun', students: 1090 },
    { month: 'Jul', students: 1140 },
    { month: 'Aug', students: 1210 },
    { month: 'Sep', students: 1250 },
  ];

  // Grade wise attendance
  const gradeAttendance = [
    { grade: 'Class 6', rate: 92.3 },
    { grade: 'Class 7', rate: 93.6 },
    { grade: 'Class 8', rate: 93.9 },
    { grade: 'Class 9', rate: 94.0 },
    { grade: 'Class 10', rate: 96.0 },
  ];

  // Fee collection breakdown
  const feeMonthly = [
    { month: 'Apr', collected: 1050000, pending: 150000 },
    { month: 'May', collected: 1080000, pending: 140000 },
    { month: 'Jun', collected: 1100000, pending: 130000 },
    { month: 'Jul', collected: 1110000, pending: 135000 },
    { month: 'Aug', collected: 1120000, pending: 130000 },
    { month: 'Sep', collected: 1125000, pending: 125000 },
  ];

  return (
    <section id="analytics" className="py-20 bg-gradient-to-b from-[#FFFFFF] via-[#F4FFF8] to-[#FFFFFF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDF7E8] text-[#123B2A] text-xs font-bold uppercase tracking-wider mb-3">
            Real-Time Institutional Intelligence
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-[#123B2A] tracking-tight">
            Realistic School Analytics
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#123B2A]/70">
            Interactive visual charts giving principals and trustees instant insight into admissions, attendance, fee recovery and operational margins.
          </p>

          {/* Quick Chart Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveChart('growth')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeChart === 'growth'
                  ? 'bg-[#19A66A] text-white shadow-xs'
                  : 'bg-white text-[#123B2A]/80 border border-[#19A66A]/20 hover:bg-[#DDF7E8]'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Student Growth</span>
            </button>

            <button
              onClick={() => setActiveChart('attendance')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeChart === 'attendance'
                  ? 'bg-[#19A66A] text-white shadow-xs'
                  : 'bg-white text-[#123B2A]/80 border border-[#19A66A]/20 hover:bg-[#DDF7E8]'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Attendance Overview</span>
            </button>

            <button
              onClick={() => setActiveChart('fees')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeChart === 'fees'
                  ? 'bg-[#19A66A] text-white shadow-xs'
                  : 'bg-white text-[#123B2A]/80 border border-[#19A66A]/20 hover:bg-[#DDF7E8]'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>Fee Collection</span>
            </button>

            <button
              onClick={() => setActiveChart('finance')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeChart === 'finance'
                  ? 'bg-[#19A66A] text-white shadow-xs'
                  : 'bg-white text-[#123B2A]/80 border border-[#19A66A]/20 hover:bg-[#DDF7E8]'
              }`}
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Income vs Expenses</span>
            </button>
          </div>
        </div>

        {/* Analytics Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Visual Chart Container */}
          <div className="lg:col-span-8 glass-card rounded-3xl p-6 sm:p-8 space-y-6">
            
            {/* CHART 1: STUDENT ENROLLMENT GROWTH */}
            {activeChart === 'growth' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-['Outfit'] text-[#123B2A]">
                      Cumulative Student Enrollment Trend
                    </h3>
                    <p className="text-xs text-[#123B2A]/60">Steady academic growth from 980 to 1,250 students</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    +27.5% Growth
                  </span>
                </div>

                {/* SVG Visual Bar Chart with Modern Green Aesthetics */}
                <div className="pt-6 pb-2">
                  <div className="h-60 flex items-end gap-3 sm:gap-6 justify-between px-2 sm:px-6 border-b border-[#19A66A]/20">
                    {enrollmentGrowth.map((item) => {
                      const heightPercent = (item.students / 1300) * 100;
                      return (
                        <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                          <span className="text-[10px] font-bold text-[#19A66A] opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.students}
                          </span>
                          <div
                            className="w-full max-w-[48px] bg-gradient-to-t from-[#19A66A] to-[#DDF7E8] rounded-t-xl group-hover:from-[#158f5b] group-hover:to-[#19A66A] transition-all duration-300 shadow-sm"
                            style={{ height: `${heightPercent}%` }}
                          />
                          <span className="text-xs font-semibold text-[#123B2A]/70 mt-1">
                            {item.month}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#123B2A]/70 pt-2">
                  <span>Current Active Strength: <strong className="text-[#123B2A]">1,250 Students</strong></span>
                  <span>Average Retention: <strong className="text-emerald-700">98.2%</strong></span>
                </div>
              </div>
            )}

            {/* CHART 2: ATTENDANCE OVERVIEW */}
            {activeChart === 'attendance' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-['Outfit'] text-[#123B2A]">
                      Class-wise Attendance Ratio
                    </h3>
                    <p className="text-xs text-[#123B2A]/60">Average daily presence across primary, middle & senior sections</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    94.0% Overall
                  </span>
                </div>

                <div className="space-y-3.5 pt-4">
                  {gradeAttendance.map((g) => (
                    <div key={g.grade} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-[#123B2A]">
                        <span>{g.grade}</span>
                        <span className="text-emerald-700">{g.rate}% Present</span>
                      </div>
                      <div className="w-full bg-[#DDF7E8] h-3.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#19A66A] to-emerald-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${g.rate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-[#DDF7E8]/50 rounded-xl text-xs text-[#123B2A] flex items-center justify-between mt-4">
                  <span>Grade 10 leads overall attendance at 96.0% with active board preparation.</span>
                  <span className="font-bold text-[#19A66A]">Peak Record</span>
                </div>
              </div>
            )}

            {/* CHART 3: FEE COLLECTION */}
            {activeChart === 'fees' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-['Outfit'] text-[#123B2A]">
                      Monthly Fee Recovery vs Target
                    </h3>
                    <p className="text-xs text-[#123B2A]/60">90% of total billing collected before 10th of every month</p>
                  </div>
                  <span className="text-xs font-bold text-[#19A66A] bg-[#DDF7E8] px-3 py-1 rounded-full">
                    Rs. 1.125M Collected
                  </span>
                </div>

                <div className="h-60 flex items-end gap-3 sm:gap-6 justify-between px-2 sm:px-6 border-b border-[#19A66A]/20 pt-6">
                  {feeMonthly.map((fm) => (
                    <div key={fm.month} className="flex-1 flex flex-col items-center gap-1.5 group h-full justify-end">
                      <div className="w-full max-w-[42px] flex flex-col items-center">
                        <div
                          className="w-full bg-amber-300 rounded-t-sm"
                          style={{ height: `${(fm.pending / 1300000) * 100}%` }}
                          title={`Pending: Rs. ${fm.pending.toLocaleString()}`}
                        />
                        <div
                          className="w-full bg-[#19A66A] rounded-b-md"
                          style={{ height: `${(fm.collected / 1300000) * 100}%` }}
                          title={`Collected: Rs. ${fm.collected.toLocaleString()}`}
                        />
                      </div>
                      <span className="text-xs font-semibold text-[#123B2A]/70 mt-1">
                        {fm.month}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs pt-2">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-emerald-800 font-semibold">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#19A66A]" /> Collected: Rs. 1,125,000
                    </span>
                    <span className="flex items-center gap-1 text-amber-800 font-semibold">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Pending: Rs. 125,000
                    </span>
                  </div>
                  <span className="text-[11px] text-[#19A66A] font-bold">Automatic Challan Sync</span>
                </div>
              </div>
            )}

            {/* CHART 4: INCOME VS EXPENSES */}
            {activeChart === 'finance' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-['Outfit'] text-[#123B2A]">
                      Institutional Cashflow Ledger
                    </h3>
                    <p className="text-xs text-[#123B2A]/60">Net Operational Balance: Rs. 270,000 Surplus</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    Positive Cashflow
                  </span>
                </div>

                <div className="space-y-4 pt-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#123B2A] mb-1">
                      <span>Total Revenue / Income</span>
                      <span className="text-emerald-700">Rs. 450,000 (100%)</span>
                    </div>
                    <div className="w-full bg-[#DDF7E8] h-4 rounded-full overflow-hidden">
                      <div className="bg-[#19A66A] h-full rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#123B2A] mb-1">
                      <span>Total Operating Expenses</span>
                      <span className="text-rose-600">Rs. 180,000 (40.0%)</span>
                    </div>
                    <div className="w-full bg-[#DDF7E8] h-4 rounded-full overflow-hidden">
                      <div className="bg-rose-500 h-full rounded-full" style={{ width: '40%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#123B2A] mb-1">
                      <span>Net Operational Surplus</span>
                      <span className="text-emerald-800">Rs. 270,000 (60.0%)</span>
                    </div>
                    <div className="w-full bg-[#DDF7E8] h-4 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: '60%' }} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-[#19A66A]/20">
                    <span className="text-gray-500 block text-[10px]">Largest Inflow</span>
                    <strong className="text-[#123B2A]">Tuition Fees: Rs. 395,000</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#19A66A]/20">
                    <span className="text-gray-500 block text-[10px]">Largest Outflow</span>
                    <strong className="text-[#123B2A]">Staff Salaries: Rs. 125,000</strong>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Key Metric Insights */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="glass-card rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#19A66A] uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>Faculty Performance</span>
              </div>
              <h4 className="text-lg font-bold font-['Outfit'] text-[#123B2A]">
                85 Active Educators
              </h4>
              <p className="text-xs text-[#123B2A]/70">
                1:15 Teacher-to-student ratio. 100% of classes have assigned headmasters and daily lesson plans.
              </p>
              <div className="pt-2 border-t border-[#19A66A]/10 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Attendance Today:</span>
                  <strong className="text-emerald-700 font-bold">98.8%</strong>
                </div>
                <div className="flex justify-between">
                  <span>Payroll Disbursement:</span>
                  <strong className="text-emerald-700 font-bold">100% Clear</strong>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#19A66A] uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>Academic DMC Ratings</span>
              </div>
              <h4 className="text-lg font-bold font-['Outfit'] text-[#123B2A]">
                91.4% Pass Rate
              </h4>
              <p className="text-xs text-[#123B2A]/70">
                Automated grade computation and position rankings ready for instant print across all 18 classes.
              </p>
              <div className="pt-2 border-t border-[#19A66A]/10 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>A+ Grade Holders:</span>
                  <strong className="text-[#123B2A]">184 Students</strong>
                </div>
                <div className="flex justify-between">
                  <span>Position Badges Issued:</span>
                  <strong className="text-[#123B2A]">54 Position Holders</strong>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
