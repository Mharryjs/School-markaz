import React, { useState } from 'react';
import {
  Smartphone,
  CalendarCheck,
  Award,
  Bell,
  Wallet,
  Users,
  BarChart3,
  CheckCircle2,
  Clock,
  BookOpen
} from 'lucide-react';

export const MobileAppsSection: React.FC = () => {
  const [activeAppTab, setActiveAppTab] = useState<'teacher' | 'student' | 'admin'>('teacher');

  return (
    <section id="apps" className="py-20 bg-gradient-to-b from-[#F4FFF8] via-white to-[#F4FFF8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDF7E8] text-[#123B2A] text-xs font-bold uppercase tracking-wider mb-3">
            Multi-Platform Ecosystem
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-[#123B2A] tracking-tight">
            Dedicated Mobile Apps
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#123B2A]/70">
            Every user gets the right tools for better communication, better control and better management.
          </p>

          {/* Quick Tab Switcher on Small Screens */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-6">
            {(['teacher', 'student', 'admin'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveAppTab(tab)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                  activeAppTab === tab
                    ? 'bg-[#19A66A] text-white shadow-xs'
                    : 'bg-white text-[#123B2A]/70 border border-[#19A66A]/20'
                }`}
              >
                {tab} App
              </button>
            ))}
          </div>
        </div>

        {/* 3 Realistic Smartphone Mockups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* PHONE 1: TEACHER APP */}
          <div
            className={`flex flex-col rounded-3xl p-6 transition-all duration-300 ${
              activeAppTab === 'teacher' ? 'block' : 'hidden md:flex'
            } bg-white/70 backdrop-blur-xl border border-[#19A66A]/25 shadow-xl hover:shadow-2xl hover:border-[#19A66A]/40`}
          >
            <div className="text-center mb-4">
              <span className="text-[11px] font-bold text-[#19A66A] bg-[#DDF7E8] px-3 py-1 rounded-full">
                For Faculty & Instructors
              </span>
              <h3 className="text-xl font-bold font-['Outfit'] text-[#123B2A] mt-2">
                Teacher App
              </h3>
              <p className="text-xs text-[#123B2A]/70 mt-1">
                Mark attendance in seconds, enter exam marks on mobile, and post daily homework.
              </p>
            </div>

            {/* Smartphone Hardware Frame */}
            <div className="mx-auto w-full max-w-[280px] rounded-[38px] p-3 bg-[#123B2A] shadow-2xl border-4 border-[#123B2A]/80 flex-1 flex flex-col justify-between">
              {/* Dynamic Island / Speaker */}
              <div className="mx-auto w-24 h-4 bg-black rounded-full mb-2 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
              </div>

              {/* Inside Phone Screen */}
              <div className="bg-[#F4FFF8] rounded-[28px] p-3 space-y-2.5 flex-1 flex flex-col justify-between overflow-hidden text-left border border-[#19A66A]/10">
                {/* Header */}
                <div className="flex items-center justify-between pb-1.5 border-b border-[#19A66A]/15">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-[#19A66A] text-white font-bold text-[10px] flex items-center justify-center">
                      R
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#123B2A]">Sir Rizwan</div>
                      <div className="text-[8px] text-[#19A66A]">Math & Science Dept</div>
                    </div>
                  </div>
                  <Bell className="w-3.5 h-3.5 text-[#19A66A]" />
                </div>

                {/* Quick Action Pills */}
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="p-2 rounded-xl bg-white border border-[#19A66A]/20 shadow-2xs">
                    <CalendarCheck className="w-3.5 h-3.5 text-[#19A66A] mb-1" />
                    <div className="text-[9px] font-bold text-[#123B2A]">Attendance</div>
                    <div className="text-[8px] text-emerald-600">Grade 9-A Marked</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-[#19A66A]/20 shadow-2xs">
                    <Award className="w-3.5 h-3.5 text-amber-600 mb-1" />
                    <div className="text-[9px] font-bold text-[#123B2A]">Enter Marks</div>
                    <div className="text-[8px] text-amber-600">Mid-Term Active</div>
                  </div>
                </div>

                {/* Today's Classes Timetable */}
                <div className="p-2 rounded-xl bg-white border border-[#19A66A]/20 space-y-1">
                  <div className="text-[9px] font-bold text-[#123B2A] flex items-center justify-between">
                    <span>Today's Classes</span>
                    <Clock className="w-2.5 h-2.5 text-[#19A66A]" />
                  </div>
                  <div className="text-[8px] flex justify-between py-0.5 border-b border-gray-100">
                    <span className="font-semibold text-[#123B2A]">Period 2: 9th-A</span>
                    <span className="text-[#19A66A]">Algebra</span>
                  </div>
                  <div className="text-[8px] flex justify-between py-0.5">
                    <span className="font-semibold text-[#123B2A]">Period 4: 10th-B</span>
                    <span className="text-[#19A66A]">Geometry</span>
                  </div>
                </div>

                {/* Quick Student Attendance Marker List */}
                <div className="p-2 rounded-xl bg-white border border-[#19A66A]/20 space-y-1">
                  <div className="text-[9px] font-bold text-[#123B2A]">Class 8-A Quick Check</div>
                  <div className="flex items-center justify-between text-[8px]">
                    <span>Muhammad Ahmed</span>
                    <span className="px-1 bg-emerald-100 text-emerald-800 rounded font-bold">Present</span>
                  </div>
                  <div className="flex items-center justify-between text-[8px]">
                    <span>Zeeshan Ali</span>
                    <span className="px-1 bg-rose-100 text-rose-800 rounded font-bold">Absent</span>
                  </div>
                </div>

                {/* Bottom App Nav */}
                <div className="bg-white px-2 py-1 rounded-xl border border-[#19A66A]/20 flex justify-around text-[8px] font-bold text-[#123B2A]/60">
                  <span className="text-[#19A66A]">Home</span>
                  <span>Classes</span>
                  <span>Marks</span>
                  <span>Notices</span>
                </div>
              </div>

              {/* Home Bar Indicator */}
              <div className="w-16 h-1 bg-white/40 rounded-full mx-auto mt-2" />
            </div>

            {/* Feature Bullets */}
            <div className="mt-5 space-y-1 text-xs text-[#123B2A]/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#19A66A]" />
                <span>Teacher Dashboard & timetable alerts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#19A66A]" />
                <span>30-second mobile student attendance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#19A66A]" />
                <span>Exam test marks submission & DMC upload</span>
              </div>
            </div>
          </div>

          {/* PHONE 2: STUDENT & PARENT APP */}
          <div
            className={`flex flex-col rounded-3xl p-6 transition-all duration-300 ${
              activeAppTab === 'student' ? 'block' : 'hidden md:flex'
            } bg-white/70 backdrop-blur-xl border border-[#19A66A]/25 shadow-xl hover:shadow-2xl hover:border-[#19A66A]/40`}
          >
            <div className="text-center mb-4">
              <span className="text-[11px] font-bold text-[#19A66A] bg-[#DDF7E8] px-3 py-1 rounded-full">
                For Parents & Students
              </span>
              <h3 className="text-xl font-bold font-['Outfit'] text-[#123B2A] mt-2">
                Student & Parent App
              </h3>
              <p className="text-xs text-[#123B2A]/70 mt-1">
                Real-time attendance notifications, exam DMC, digital fee receipts and school notices.
              </p>
            </div>

            {/* Smartphone Hardware Frame */}
            <div className="mx-auto w-full max-w-[280px] rounded-[38px] p-3 bg-[#123B2A] shadow-2xl border-4 border-[#123B2A]/80 flex-1 flex flex-col justify-between">
              {/* Dynamic Island */}
              <div className="mx-auto w-24 h-4 bg-black rounded-full mb-2 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
              </div>

              {/* Inside Screen */}
              <div className="bg-[#F4FFF8] rounded-[28px] p-3 space-y-2.5 flex-1 flex flex-col justify-between overflow-hidden text-left border border-[#19A66A]/10">
                {/* Header */}
                <div className="flex items-center justify-between pb-1.5 border-b border-[#19A66A]/15">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold text-[10px] flex items-center justify-center">
                      M
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#123B2A]">Muhammad Ahmed</div>
                      <div className="text-[8px] text-[#19A66A]">Grade 8 - Section A</div>
                    </div>
                  </div>
                  <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Active
                  </span>
                </div>

                {/* Big Metric Badge */}
                <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#19A66A] to-[#123B2A] text-white shadow-xs">
                  <div className="text-[8px] text-emerald-200">Overall Attendance</div>
                  <div className="text-base font-extrabold">96% Present</div>
                  <div className="text-[7px] text-white/80">Only 2 leaves taken this term</div>
                </div>

                {/* Exam Result Preview */}
                <div className="p-2 rounded-xl bg-white border border-[#19A66A]/20 space-y-1">
                  <div className="flex items-center justify-between text-[9px] font-bold text-[#123B2A]">
                    <span>Latest Mid-Term DMC</span>
                    <span className="text-emerald-700">Rank #1</span>
                  </div>
                  <div className="flex justify-between text-[8px] text-[#123B2A]/80">
                    <span>Total Score: 461/500</span>
                    <span className="font-bold text-emerald-700">Grade: A+ (92.2%)</span>
                  </div>
                </div>

                {/* Fee Status Card */}
                <div className="p-2 rounded-xl bg-white border border-[#19A66A]/20 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5 text-[#19A66A]" />
                    <div>
                      <div className="text-[9px] font-bold text-[#123B2A]">September Fee</div>
                      <div className="text-[7px] text-gray-500">Challan SMK-0921</div>
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[8px] font-bold">
                    Paid
                  </span>
                </div>

                {/* Bottom App Nav */}
                <div className="bg-white px-2 py-1 rounded-xl border border-[#19A66A]/20 flex justify-around text-[8px] font-bold text-[#123B2A]/60">
                  <span className="text-[#19A66A]">Dashboard</span>
                  <span>Results</span>
                  <span>Fees</span>
                  <span>Timetable</span>
                </div>
              </div>

              {/* Home Bar Indicator */}
              <div className="w-16 h-1 bg-white/40 rounded-full mx-auto mt-2" />
            </div>

            {/* Feature Bullets */}
            <div className="mt-5 space-y-1 text-xs text-[#123B2A]/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#19A66A]" />
                <span>Student dashboard with daily schedule</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#19A66A]" />
                <span>Digital marks sheet & printable report card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#19A66A]" />
                <span>Online fee challan & payment status tracker</span>
              </div>
            </div>
          </div>

          {/* PHONE 3: SCHOOL ADMIN APP */}
          <div
            className={`flex flex-col rounded-3xl p-6 transition-all duration-300 ${
              activeAppTab === 'admin' ? 'block' : 'hidden md:flex'
            } bg-white/70 backdrop-blur-xl border border-[#19A66A]/25 shadow-xl hover:shadow-2xl hover:border-[#19A66A]/40`}
          >
            <div className="text-center mb-4">
              <span className="text-[11px] font-bold text-[#19A66A] bg-[#DDF7E8] px-3 py-1 rounded-full">
                For Principals & Directors
              </span>
              <h3 className="text-xl font-bold font-['Outfit'] text-[#123B2A] mt-2">
                School Admin App
              </h3>
              <p className="text-xs text-[#123B2A]/70 mt-1">
                Complete mobile command center to monitor live campus attendance, fee recovery and cashflow.
              </p>
            </div>

            {/* Smartphone Hardware Frame */}
            <div className="mx-auto w-full max-w-[280px] rounded-[38px] p-3 bg-[#123B2A] shadow-2xl border-4 border-[#123B2A]/80 flex-1 flex flex-col justify-between">
              {/* Dynamic Island */}
              <div className="mx-auto w-24 h-4 bg-black rounded-full mb-2 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
              </div>

              {/* Inside Screen */}
              <div className="bg-[#F4FFF8] rounded-[28px] p-3 space-y-2.5 flex-1 flex flex-col justify-between overflow-hidden text-left border border-[#19A66A]/10">
                {/* Header */}
                <div className="flex items-center justify-between pb-1.5 border-b border-[#19A66A]/15">
                  <div>
                    <div className="text-[10px] font-bold text-[#123B2A]">Principal Portal</div>
                    <div className="text-[8px] text-[#19A66A]">All Campuses Summary</div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                {/* 2x2 Admin Grid */}
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="p-2 rounded-xl bg-white border border-[#19A66A]/20">
                    <div className="text-[8px] text-[#123B2A]/60">Students</div>
                    <div className="text-xs font-bold text-[#123B2A]">1,250</div>
                    <div className="text-[7px] text-emerald-600">94% Present</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-[#19A66A]/20">
                    <div className="text-[8px] text-[#123B2A]/60">Teachers</div>
                    <div className="text-xs font-bold text-[#123B2A]">85</div>
                    <div className="text-[7px] text-emerald-600">All Checked In</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-[#19A66A]/20">
                    <div className="text-[8px] text-[#123B2A]/60">Fee Recovery</div>
                    <div className="text-xs font-bold text-[#19A66A]">Rs. 1.12M</div>
                    <div className="text-[7px] text-[#123B2A]/70">90% of Target</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-[#19A66A]/20">
                    <div className="text-[8px] text-[#123B2A]/60">Net Profit</div>
                    <div className="text-xs font-bold text-emerald-700">Rs. 270K</div>
                    <div className="text-[7px] text-emerald-600">+12% vs LY</div>
                  </div>
                </div>

                {/* Urgent Alerts Card */}
                <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-[8px] space-y-0.5">
                  <div className="font-bold text-amber-900">Pending Actions (2)</div>
                  <div className="text-amber-800">32 pending fee follow-up calls</div>
                  <div className="text-amber-800">Exam datesheet pending approval</div>
                </div>

                {/* Bottom App Nav */}
                <div className="bg-white px-2 py-1 rounded-xl border border-[#19A66A]/20 flex justify-around text-[8px] font-bold text-[#123B2A]/60">
                  <span className="text-[#19A66A]">Overview</span>
                  <span>Finance</span>
                  <span>Staff</span>
                  <span>Reports</span>
                </div>
              </div>

              {/* Home Bar Indicator */}
              <div className="w-16 h-1 bg-white/40 rounded-full mx-auto mt-2" />
            </div>

            {/* Feature Bullets */}
            <div className="mt-5 space-y-1 text-xs text-[#123B2A]/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#19A66A]" />
                <span>Executive mobile summary of entire institution</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#19A66A]" />
                <span>One-tap broadcast announcements & SMS alerts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#19A66A]" />
                <span>Financial auditing & expense approvals on the go</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
