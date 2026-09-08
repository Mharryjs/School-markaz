import React, { useState } from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  CalendarCheck,
  Award,
  Wallet,
  CreditCard,
  TrendingUp,
  PackageCheck,
  BarChart3,
  MessageSquare,
  Settings,
  Search,
  Plus,
  Printer,
  CheckCircle2,
  AlertCircle,
  FileText,
  Send,
  Eye
} from 'lucide-react';
import {
  SCHOOL_STATS,
  MOCK_STUDENTS,
  MOCK_TEACHERS,
  MOCK_ATTENDANCE_SUMMARY,
  MOCK_CHALLANS,
  MOCK_EXAM_RESULTS,
  MOCK_CASHFLOW,
  MOCK_STATIONERY
} from '../data/schoolData';
import { StudentRecord } from '../types';

export const InteractiveDashboardShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [showChallanModal, setShowChallanModal] = useState<string | null>(null);
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  // Filter students based on search and grade filter
  const filteredStudents = MOCK_STUDENTS.filter((st) => {
    const matchesSearch =
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.guardianName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = selectedGrade === 'All' || st.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const sidebarModules = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'students', label: 'Students', icon: GraduationCap, badge: '1,250' },
    { id: 'teachers', label: 'Teachers', icon: Users, badge: '85' },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck, badge: '94%' },
    { id: 'exams', label: 'Exams & Results', icon: Award, badge: 'Term 1' },
    { id: 'fees', label: 'Fees Management', icon: Wallet, badge: 'Pending' },
    { id: 'payroll', label: 'Teachers Payroll', icon: CreditCard, badge: null },
    { id: 'income-expenses', label: 'Income & Expenses', icon: TrendingUp, badge: null },
    { id: 'stationery', label: 'Stationery Stock', icon: PackageCheck, badge: 'Low' },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3, badge: null },
    { id: 'communication', label: 'SMS & Alerts', icon: MessageSquare, badge: 'SMS' },
    { id: 'settings', label: 'School Settings', icon: Settings, badge: null },
  ];

  return (
    <section id="dashboard" className="py-20 bg-gradient-to-b from-[#F4FFF8] via-white to-[#F4FFF8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDF7E8] text-[#123B2A] text-xs font-semibold uppercase tracking-wider mb-3">
            Real Software Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-[#123B2A] tracking-tight">
            Powerful School Dashboard
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#123B2A]/70">
            Everything your administration needs, organized in one place. Explore the live interactive modules below.
          </p>
        </div>

        {/* Live Dashboard Software Window */}
        <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-[#19A66A]/25 shadow-2xl shadow-[#19A66A]/10 overflow-hidden">
          
          {/* Top Application Bar */}
          <div className="bg-[#123B2A] text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="h-4 w-px bg-white/20 mx-1" />
              <div className="flex items-center gap-2 font-['Outfit'] font-bold text-sm tracking-wide">
                <span>🎓 School Markaz ERP</span>
                <span className="text-[11px] font-normal text-emerald-300 bg-white/10 px-2 py-0.5 rounded">
                  v4.8 Enterprise
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="hidden md:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                <span className="text-emerald-300 font-semibold">Campus:</span>
                <span>Main Campus (Boys & Girls)</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                <span className="text-emerald-300 font-semibold">Session:</span>
                <span>2025 – 2026</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-600/60 px-3 py-1 rounded-lg border border-emerald-400/30">
                <div className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                <span className="font-semibold text-emerald-100">Super Admin</span>
              </div>
            </div>
          </div>

          {/* Software Layout: Sidebar + Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
            
            {/* Left Sidebar */}
            <div className="lg:col-span-3 bg-white/80 border-r border-[#19A66A]/15 p-3 space-y-1 overflow-y-auto max-h-[700px]">
              
              <div className="p-2 mb-2 rounded-xl bg-[#DDF7E8]/60 border border-[#19A66A]/15">
                <div className="text-[11px] font-bold text-[#123B2A]">Al-Hira Model High School</div>
                <div className="text-[10px] text-[#123B2A]/60">Affiliation Code: B-10492</div>
              </div>

              <div className="text-[10px] font-bold text-[#123B2A]/50 uppercase tracking-wider px-2 pt-2 pb-1">
                Navigation Modules
              </div>

              <div className="space-y-0.5">
                {sidebarModules.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      id={`sidebar-tab-${item.id}`}
                      type="button"
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#19A66A] text-white shadow-sm shadow-[#19A66A]/20'
                          : 'text-[#123B2A]/80 hover:bg-[#DDF7E8]/60 hover:text-[#123B2A]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#19A66A]'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-[#DDF7E8] text-[#19A66A]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Quick Support Card */}
              <div className="pt-4 mt-4 border-t border-[#19A66A]/15">
                <div className="p-3 rounded-xl bg-[#DDF7E8]/40 border border-[#19A66A]/20 text-[11px] space-y-1.5">
                  <div className="font-bold text-[#123B2A] flex items-center gap-1.5">
                    <span className="text-emerald-600">●</span> Cloud Database Sync
                  </div>
                  <div className="text-[#123B2A]/70 text-[10px]">
                    Last backup: 2 mins ago (Automated)
                  </div>
                </div>
              </div>

            </div>

            {/* Main Content Pane */}
            <div className="lg:col-span-9 p-4 sm:p-6 bg-[#F4FFF8]/30 overflow-y-auto max-h-[700px]">
              
              {/* TAB 1: DASHBOARD OVERVIEW */}
              {activeTab === 'dashboard' && (
                <div className="space-y-5">
                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <div className="p-3 rounded-xl bg-white/90 border border-[#19A66A]/20 shadow-xs">
                      <div className="text-[11px] font-medium text-[#123B2A]/60">Total Students</div>
                      <div className="text-xl font-bold text-[#123B2A]">{SCHOOL_STATS.totalStudents.toLocaleString()}</div>
                      <div className="text-[10px] text-[#19A66A] font-semibold">18 Sections</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/90 border border-[#19A66A]/20 shadow-xs">
                      <div className="text-[11px] font-medium text-[#123B2A]/60">Total Teachers</div>
                      <div className="text-xl font-bold text-[#123B2A]">{SCHOOL_STATS.totalTeachers}</div>
                      <div className="text-[10px] text-emerald-600 font-semibold">5 Departments</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/90 border border-[#19A66A]/20 shadow-xs">
                      <div className="text-[11px] font-medium text-[#123B2A]/60">Present Today</div>
                      <div className="text-xl font-bold text-emerald-700">{SCHOOL_STATS.presentTodayPercentage}%</div>
                      <div className="text-[10px] text-emerald-600 font-semibold">{SCHOOL_STATS.presentTodayCount} Present</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/90 border border-[#19A66A]/20 shadow-xs">
                      <div className="text-[11px] font-medium text-[#123B2A]/60">Pending Fees</div>
                      <div className="text-xl font-bold text-amber-700">Rs. 125,000</div>
                      <div className="text-[10px] text-amber-600 font-semibold">32 Challans Unpaid</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/90 border border-[#19A66A]/20 shadow-xs">
                      <div className="text-[11px] font-medium text-[#123B2A]/60">Monthly Income</div>
                      <div className="text-xl font-bold text-[#123B2A]">Rs. 450,000</div>
                      <div className="text-[10px] text-[#19A66A] font-semibold">+8% vs last month</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/90 border border-[#19A66A]/20 shadow-xs">
                      <div className="text-[11px] font-medium text-[#123B2A]/60">Monthly Expenses</div>
                      <div className="text-xl font-bold text-[#123B2A]">Rs. 180,000</div>
                      <div className="text-[10px] text-rose-600 font-semibold">Surplus: Rs. 270K</div>
                    </div>
                  </div>

                  {/* Visual Overview: Financial Health & Attendance Rate */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    
                    {/* Income vs Expenses Visual Ledger */}
                    <div className="md:col-span-7 p-4 rounded-xl bg-white/90 border border-[#19A66A]/20 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-[#123B2A]">Monthly Cash Flow Overview</h4>
                          <p className="text-xs text-[#123B2A]/60">Income, Expenses and Net Operational Surplus</p>
                        </div>
                        <span className="text-xs font-bold text-[#19A66A] bg-[#DDF7E8] px-2.5 py-1 rounded-md">
                          Balanced
                        </span>
                      </div>

                      {/* Multi-segment visual bar */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-[#19A66A]">Total Income: Rs. 450,000 (71.4%)</span>
                          <span className="text-amber-700">Expenses: Rs. 180,000 (28.6%)</span>
                        </div>
                        <div className="w-full bg-[#DDF7E8] h-3.5 rounded-full overflow-hidden flex">
                          <div className="bg-[#19A66A] h-full" style={{ width: '71.4%' }} />
                          <div className="bg-amber-400 h-full" style={{ width: '28.6%' }} />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                        <div className="p-2 bg-[#F4FFF8] rounded-lg border border-[#19A66A]/15">
                          <span className="text-[#123B2A]/60 block text-[10px]">Fee Collection</span>
                          <strong className="text-[#123B2A] text-xs">Rs. 395,000</strong>
                        </div>
                        <div className="p-2 bg-[#F4FFF8] rounded-lg border border-[#19A66A]/15">
                          <span className="text-[#123B2A]/60 block text-[10px]">Staff Salaries</span>
                          <strong className="text-[#123B2A] text-xs">Rs. 125,000</strong>
                        </div>
                        <div className="p-2 bg-[#DDF7E8]/70 rounded-lg border border-[#19A66A]/25">
                          <span className="text-[#19A66A] font-bold block text-[10px]">Net Surplus</span>
                          <strong className="text-emerald-800 text-xs">Rs. 270,000</strong>
                        </div>
                      </div>
                    </div>

                    {/* Today's Attendance Gauge */}
                    <div className="md:col-span-5 p-4 rounded-xl bg-white/90 border border-[#19A66A]/20 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-[#123B2A]">Today's Attendance Rate</h4>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          94% Overall
                        </span>
                      </div>

                      <div className="space-y-2 pt-1">
                        {MOCK_ATTENDANCE_SUMMARY.slice(1, 5).map((att) => (
                          <div key={att.grade} className="text-xs space-y-0.5">
                            <div className="flex justify-between font-medium text-[#123B2A]">
                              <span>{att.grade}</span>
                              <span>{att.present}/{att.totalStudents} ({att.percentage}%)</span>
                            </div>
                            <div className="w-full bg-[#DDF7E8] h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-[#19A66A] h-full rounded-full"
                                style={{ width: `${att.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Recent Real Activity Logs & Student Table Snapshot */}
                  <div className="rounded-xl bg-white/90 border border-[#19A66A]/20 shadow-xs overflow-hidden">
                    <div className="p-3.5 bg-[#DDF7E8]/40 border-b border-[#19A66A]/15 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-[#123B2A]">Registered Students Directory</h4>
                        <p className="text-xs text-[#123B2A]/60">Showing real records with fee and attendance tracking</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('students')}
                        className="text-xs font-bold text-[#19A66A] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Open Full Students Module</span>
                        <span>→</span>
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#F4FFF8] text-[#123B2A]/70 text-[11px] uppercase tracking-wider">
                          <tr>
                            <th className="py-2.5 px-3">Student Name</th>
                            <th className="py-2.5 px-3">Class & Section</th>
                            <th className="py-2.5 px-3">Father / Guardian</th>
                            <th className="py-2.5 px-3">Attendance</th>
                            <th className="py-2.5 px-3">Fee Status</th>
                            <th className="py-2.5 px-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#19A66A]/10">
                          {MOCK_STUDENTS.slice(0, 5).map((student) => (
                            <tr key={student.id} className="hover:bg-[#DDF7E8]/20 transition-colors">
                              <td className="py-2.5 px-3 font-semibold text-[#123B2A] flex items-center gap-2">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${student.avatarColor}`}>
                                  {student.name.charAt(0)}
                                </span>
                                <span>{student.name}</span>
                              </td>
                              <td className="py-2.5 px-3 text-[#123B2A]/80 font-medium">
                                {student.grade} - Section {student.section}
                              </td>
                              <td className="py-2.5 px-3 text-[#123B2A]/70">
                                {student.guardianName}
                              </td>
                              <td className="py-2.5 px-3 font-semibold text-emerald-700">
                                {student.attendance}%
                              </td>
                              <td className="py-2.5 px-3">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    student.feeStatus === 'Paid'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : student.feeStatus === 'Pending'
                                      ? 'bg-amber-100 text-amber-800'
                                      : 'bg-blue-100 text-blue-800'
                                  }`}
                                >
                                  {student.feeStatus}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 text-right">
                                <button
                                  onClick={() => setSelectedStudent(student)}
                                  className="text-xs text-[#19A66A] font-semibold hover:underline cursor-pointer"
                                >
                                  View Profile
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: STUDENTS MODULE */}
              {activeTab === 'students' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-white/90 p-3.5 rounded-xl border border-[#19A66A]/20">
                    <div>
                      <h3 className="text-base font-bold text-[#123B2A]">Student Records & Admissions</h3>
                      <p className="text-xs text-[#123B2A]/60">Total 1,250 registered students across 18 classes</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#123B2A]/50" />
                        <input
                          type="text"
                          placeholder="Search student or roll no..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-[#19A66A]/25 focus:outline-hidden focus:border-[#19A66A]"
                        />
                      </div>

                      <select
                        value={selectedGrade}
                        onChange={(e) => setSelectedGrade(e.target.value)}
                        className="text-xs bg-white rounded-lg border border-[#19A66A]/25 px-2.5 py-1.5 text-[#123B2A]"
                      >
                        <option value="All">All Grades</option>
                        <option value="Grade 6">Grade 6</option>
                        <option value="Grade 7">Grade 7</option>
                        <option value="Grade 8">Grade 8</option>
                        <option value="Grade 9">Grade 9</option>
                        <option value="Grade 10">Grade 10</option>
                      </select>

                      <button
                        onClick={() => alert('New Student Admission Modal: In real deployment, opens registration form with photo upload, guardian CNIC and previous school records.')}
                        className="px-3 py-1.5 text-xs font-bold text-white bg-[#19A66A] hover:bg-[#158f5b] rounded-lg flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>New Admission</span>
                      </button>
                    </div>
                  </div>

                  {/* Full Student Table */}
                  <div className="rounded-xl bg-white/90 border border-[#19A66A]/20 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#F4FFF8] text-[#123B2A]/70 text-[11px] uppercase tracking-wider">
                          <tr>
                            <th className="py-3 px-3">Roll No</th>
                            <th className="py-3 px-3">Student Name</th>
                            <th className="py-3 px-3">Grade & Section</th>
                            <th className="py-3 px-3">Guardian Name</th>
                            <th className="py-3 px-3">Phone</th>
                            <th className="py-3 px-3">Attendance</th>
                            <th className="py-3 px-3">Fee Status</th>
                            <th className="py-3 px-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#19A66A]/10">
                          {filteredStudents.map((st) => (
                            <tr key={st.id} className="hover:bg-[#DDF7E8]/20 transition-colors">
                              <td className="py-2.5 px-3 font-mono font-bold text-[#19A66A]">{st.rollNo}</td>
                              <td className="py-2.5 px-3 font-semibold text-[#123B2A]">{st.name}</td>
                              <td className="py-2.5 px-3">{st.grade} ({st.section})</td>
                              <td className="py-2.5 px-3 text-[#123B2A]/70">{st.guardianName}</td>
                              <td className="py-2.5 px-3 text-[#123B2A]/70">{st.phone}</td>
                              <td className="py-2.5 px-3 font-bold text-emerald-700">{st.attendance}%</td>
                              <td className="py-2.5 px-3">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    st.feeStatus === 'Paid'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : st.feeStatus === 'Pending'
                                      ? 'bg-amber-100 text-amber-800'
                                      : 'bg-blue-100 text-blue-800'
                                  }`}
                                >
                                  {st.feeStatus}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 text-right space-x-2">
                                <button
                                  onClick={() => setSelectedStudent(st)}
                                  className="text-[11px] font-semibold text-[#19A66A] hover:underline cursor-pointer"
                                >
                                  Details
                                </button>
                                <button
                                  onClick={() => setShowChallanModal(st.name)}
                                  className="text-[11px] font-semibold text-[#123B2A]/70 hover:text-[#19A66A] cursor-pointer"
                                >
                                  Challan
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: TEACHERS MODULE */}
              {activeTab === 'teachers' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-white/90 p-3.5 rounded-xl border border-[#19A66A]/20">
                    <div>
                      <h3 className="text-base font-bold text-[#123B2A]">Faculty & Staff Management</h3>
                      <p className="text-xs text-[#123B2A]/60">85 Qualified teachers and administrative personnel</p>
                    </div>
                    <button
                      onClick={() => alert('Add Faculty: Creates teacher account, generates portal login credentials, and assigns timetable.')}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-[#19A66A] hover:bg-[#158f5b] rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Faculty Member</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {MOCK_TEACHERS.map((teacher) => (
                      <div key={teacher.id} className="p-4 rounded-xl bg-white/90 border border-[#19A66A]/20 shadow-xs space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-[#DDF7E8] text-[#19A66A] font-bold flex items-center justify-center text-sm">
                              {teacher.name.charAt(4) || 'T'}
                            </div>
                            <div>
                              <div className="font-bold text-xs text-[#123B2A]">{teacher.name}</div>
                              <div className="text-[11px] text-[#19A66A] font-medium">{teacher.subject}</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            {teacher.salaryStatus}
                          </span>
                        </div>

                        <div className="text-xs text-[#123B2A]/70 space-y-1 pt-1 border-t border-[#19A66A]/10">
                          <div><strong>Classes:</strong> {teacher.classes.join(', ')}</div>
                          <div><strong>Qualification:</strong> {teacher.qualification}</div>
                          <div><strong>Attendance:</strong> <span className="text-emerald-700 font-bold">{teacher.attendance}%</span></div>
                          <div><strong>Salary:</strong> Rs. {teacher.monthlySalary.toLocaleString()} / mo</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: SMART ATTENDANCE */}
              {activeTab === 'attendance' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/90 border border-[#19A66A]/20 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="text-base font-bold text-[#123B2A]">Daily Smart Attendance Register</h3>
                        <p className="text-xs text-[#123B2A]/60">Date: Today • Class: Grade 8 - Section A</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setAttendanceMarked(true);
                            setTimeout(() => setAttendanceMarked(false), 4000);
                          }}
                          className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#19A66A] hover:bg-[#158f5b] rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Absent SMS To Parents</span>
                        </button>
                      </div>
                    </div>

                    {attendanceMarked && (
                      <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Instant SMS sent to 55 absent students' parents via School Markaz SMS gateway!</span>
                      </div>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      <div className="p-3 bg-[#DDF7E8]/60 rounded-xl text-center">
                        <div className="text-[10px] text-[#123B2A]/60">Total Strength</div>
                        <div className="text-lg font-bold text-[#123B2A]">1,250</div>
                      </div>
                      <div className="p-3 bg-emerald-100/70 rounded-xl text-center">
                        <div className="text-[10px] text-emerald-800 font-medium">Present Today</div>
                        <div className="text-lg font-bold text-emerald-800">1,175 (94%)</div>
                      </div>
                      <div className="p-3 bg-rose-100/70 rounded-xl text-center">
                        <div className="text-[10px] text-rose-800 font-medium">Absent</div>
                        <div className="text-lg font-bold text-rose-800">55 (4.4%)</div>
                      </div>
                      <div className="p-3 bg-amber-100/70 rounded-xl text-center">
                        <div className="text-[10px] text-amber-800 font-medium">On Leave</div>
                        <div className="text-lg font-bold text-amber-800">20 (1.6%)</div>
                      </div>
                    </div>
                  </div>

                  {/* Attendance Breakdown by Class */}
                  <div className="rounded-xl bg-white/90 border border-[#19A66A]/20 overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F4FFF8] text-[#123B2A]/70 text-[11px] uppercase">
                        <tr>
                          <th className="py-2.5 px-3">Class Level</th>
                          <th className="py-2.5 px-3">Total Strength</th>
                          <th className="py-2.5 px-3">Present</th>
                          <th className="py-2.5 px-3">Absent</th>
                          <th className="py-2.5 px-3">Attendance %</th>
                          <th className="py-2.5 px-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#19A66A]/10">
                        {MOCK_ATTENDANCE_SUMMARY.map((row) => (
                          <tr key={row.grade} className="hover:bg-[#DDF7E8]/20">
                            <td className="py-2 px-3 font-semibold text-[#123B2A]">{row.grade}</td>
                            <td className="py-2 px-3">{row.totalStudents}</td>
                            <td className="py-2 px-3 text-emerald-700 font-bold">{row.present}</td>
                            <td className="py-2 px-3 text-rose-600 font-semibold">{row.absent}</td>
                            <td className="py-2 px-3 font-bold">{row.percentage}%</td>
                            <td className="py-2 px-3 text-right">
                              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                Completed
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 5: EXAMS & RESULTS */}
              {activeTab === 'exams' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-white/90 p-3.5 rounded-xl border border-[#19A66A]/20">
                    <div>
                      <h3 className="text-base font-bold text-[#123B2A]">Examinations & Progress Reports (DMC)</h3>
                      <p className="text-xs text-[#123B2A]/60">Mid-Term Examination 2026 • Top Rankers & Positions</p>
                    </div>
                    <button
                      onClick={() => alert('Print DMC Report Cards: Generates computerized multi-subject progress cards with school watermark.')}
                      className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#19A66A] hover:bg-[#158f5b] rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print All Result Cards</span>
                    </button>
                  </div>

                  <div className="rounded-xl bg-white/90 border border-[#19A66A]/20 overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F4FFF8] text-[#123B2A]/70 text-[11px] uppercase">
                        <tr>
                          <th className="py-2.5 px-3">Position</th>
                          <th className="py-2.5 px-3">Student Name</th>
                          <th className="py-2.5 px-3">Roll No</th>
                          <th className="py-2.5 px-3">Grade</th>
                          <th className="py-2.5 px-3">Obtained / Total</th>
                          <th className="py-2.5 px-3">Percentage</th>
                          <th className="py-2.5 px-3">Grade Letter</th>
                          <th className="py-2.5 px-3 text-right">DMC Sheet</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#19A66A]/10">
                        {MOCK_EXAM_RESULTS.map((exam) => (
                          <tr key={exam.rollNo} className="hover:bg-[#DDF7E8]/20">
                            <td className="py-2.5 px-3">
                              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold inline-flex items-center justify-center text-[10px]">
                                #{exam.rank}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 font-semibold text-[#123B2A]">{exam.studentName}</td>
                            <td className="py-2.5 px-3 font-mono text-[#123B2A]/70">{exam.rollNo}</td>
                            <td className="py-2.5 px-3">{exam.grade}</td>
                            <td className="py-2.5 px-3 font-medium">{exam.obtainedMarks} / {exam.totalMarks}</td>
                            <td className="py-2.5 px-3 font-bold text-emerald-700">{exam.percentage}%</td>
                            <td className="py-2.5 px-3">
                              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                {exam.gradeLetter}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              <button
                                onClick={() => alert(`Showing DMC for ${exam.studentName}: Percentage: ${exam.percentage}%, Grade: ${exam.gradeLetter}`)}
                                className="text-[#19A66A] font-semibold hover:underline cursor-pointer"
                              >
                                View DMC
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 6: FEES MANAGEMENT */}
              {activeTab === 'fees' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 bg-white/90 rounded-xl border border-[#19A66A]/20">
                      <div className="text-xs text-[#123B2A]/60">Total Monthly Dues</div>
                      <div className="text-lg font-bold text-[#123B2A]">Rs. 1,250,000</div>
                      <div className="text-[10px] text-[#19A66A]">September 2026 Billing</div>
                    </div>
                    <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
                      <div className="text-xs text-emerald-800">Total Collected</div>
                      <div className="text-lg font-bold text-emerald-800">Rs. 1,125,000</div>
                      <div className="text-[10px] text-emerald-600">90% Recovery Rate</div>
                    </div>
                    <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200">
                      <div className="text-xs text-amber-800">Pending Balance</div>
                      <div className="text-lg font-bold text-amber-800">Rs. 125,000</div>
                      <div className="text-[10px] text-amber-600">10% Remaining to recover</div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white/90 border border-[#19A66A]/20 overflow-hidden">
                    <div className="p-3 bg-[#DDF7E8]/40 border-b border-[#19A66A]/15 flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[#123B2A]">3-Copy Bank Challans & Receipts</h4>
                      <button
                        onClick={() => alert('Batch 3-Copy Bank Challan Generator: Ready for print on A4 (School Copy, Bank Copy, Student Copy).')}
                        className="text-xs font-bold text-white bg-[#19A66A] hover:bg-[#158f5b] px-3 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                      >
                        <Printer className="w-3 h-3" />
                        <span>Print Batch Challans</span>
                      </button>
                    </div>

                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F4FFF8] text-[#123B2A]/70 text-[11px] uppercase">
                        <tr>
                          <th className="py-2.5 px-3">Challan #</th>
                          <th className="py-2.5 px-3">Student Name</th>
                          <th className="py-2.5 px-3">Class</th>
                          <th className="py-2.5 px-3">Amount</th>
                          <th className="py-2.5 px-3">Due Date</th>
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#19A66A]/10">
                        {MOCK_CHALLANS.map((ch) => (
                          <tr key={ch.id} className="hover:bg-[#DDF7E8]/20">
                            <td className="py-2 px-3 font-mono font-bold text-[#19A66A]">{ch.challanNo}</td>
                            <td className="py-2 px-3 font-semibold text-[#123B2A]">{ch.studentName}</td>
                            <td className="py-2 px-3">{ch.grade}</td>
                            <td className="py-2 px-3 font-bold">Rs. {ch.amount.toLocaleString()}</td>
                            <td className="py-2 px-3 text-[#123B2A]/70">{ch.dueDate}</td>
                            <td className="py-2 px-3">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  ch.status === 'Paid'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : ch.status === 'Pending'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}
                              >
                                {ch.status}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-right">
                              <button
                                onClick={() => setShowChallanModal(ch.studentName)}
                                className="text-xs font-semibold text-[#19A66A] hover:underline cursor-pointer"
                              >
                                View Voucher
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 7: TEACHERS PAYROLL */}
              {activeTab === 'payroll' && (
                <div className="space-y-4">
                  <div className="bg-white/90 p-3.5 rounded-xl border border-[#19A66A]/20 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-[#123B2A]">Faculty & Staff Payroll Ledger</h3>
                      <p className="text-xs text-[#123B2A]/60">September 2026 • Salary slips, allowances & deductions</p>
                    </div>
                    <div className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-lg">
                      Disbursed: Rs. 125,000 / 125,000
                    </div>
                  </div>

                  <div className="rounded-xl bg-white/90 border border-[#19A66A]/20 overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F4FFF8] text-[#123B2A]/70 text-[11px] uppercase">
                        <tr>
                          <th className="py-2.5 px-3">Staff Member</th>
                          <th className="py-2.5 px-3">Department</th>
                          <th className="py-2.5 px-3">Basic Salary</th>
                          <th className="py-2.5 px-3">Allowances</th>
                          <th className="py-2.5 px-3">Net Payable</th>
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3 text-right">Slip</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#19A66A]/10">
                        {MOCK_TEACHERS.map((tc) => (
                          <tr key={tc.id} className="hover:bg-[#DDF7E8]/20">
                            <td className="py-2.5 px-3 font-semibold text-[#123B2A]">{tc.name}</td>
                            <td className="py-2.5 px-3 text-[#123B2A]/70">{tc.subject}</td>
                            <td className="py-2.5 px-3">Rs. {(tc.monthlySalary - 4000).toLocaleString()}</td>
                            <td className="py-2.5 px-3 text-emerald-700 font-medium">+Rs. 4,000</td>
                            <td className="py-2.5 px-3 font-bold text-[#123B2A]">Rs. {tc.monthlySalary.toLocaleString()}</td>
                            <td className="py-2.5 px-3">
                              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                {tc.salaryStatus}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              <button
                                onClick={() => alert(`Generating Salary Slip for ${tc.name}`)}
                                className="text-xs font-semibold text-[#19A66A] hover:underline cursor-pointer"
                              >
                                Print Slip
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 8: INCOME & EXPENSES */}
              {activeTab === 'income-expenses' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
                      <div className="text-xs text-emerald-800">Total Monthly Income</div>
                      <div className="text-xl font-bold text-emerald-900">Rs. 450,000</div>
                      <div className="text-[10px] text-emerald-700">Fees + Admissions + Stationery</div>
                    </div>
                    <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-200">
                      <div className="text-xs text-rose-800">Total Monthly Expenses</div>
                      <div className="text-xl font-bold text-rose-900">Rs. 180,000</div>
                      <div className="text-[10px] text-rose-700">Payroll + Utilities + Printing</div>
                    </div>
                    <div className="p-3.5 bg-[#DDF7E8] rounded-xl border border-[#19A66A]/30">
                      <div className="text-xs text-[#123B2A] font-medium">Net Operational Surplus</div>
                      <div className="text-xl font-bold text-[#123B2A]">Rs. 270,000</div>
                      <div className="text-[10px] text-[#19A66A] font-bold">Profitable & Healthy</div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white/90 border border-[#19A66A]/20 overflow-hidden">
                    <div className="p-3 bg-[#DDF7E8]/40 border-b border-[#19A66A]/15 font-bold text-sm text-[#123B2A]">
                      Recent Income & Expense Vouchers
                    </div>
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F4FFF8] text-[#123B2A]/70 text-[11px] uppercase">
                        <tr>
                          <th className="py-2.5 px-3">Date</th>
                          <th className="py-2.5 px-3">Type</th>
                          <th className="py-2.5 px-3">Description</th>
                          <th className="py-2.5 px-3">Category</th>
                          <th className="py-2.5 px-3">Amount</th>
                          <th className="py-2.5 px-3">Payment Method</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#19A66A]/10">
                        {MOCK_CASHFLOW.map((cf) => (
                          <tr key={cf.id} className="hover:bg-[#DDF7E8]/20">
                            <td className="py-2 px-3 text-[#123B2A]/70">{cf.date}</td>
                            <td className="py-2 px-3">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  cf.type === 'Income'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {cf.type}
                              </span>
                            </td>
                            <td className="py-2 px-3 font-semibold text-[#123B2A]">{cf.title}</td>
                            <td className="py-2 px-3 text-[#123B2A]/70">{cf.category}</td>
                            <td className={`py-2 px-3 font-bold ${cf.type === 'Income' ? 'text-emerald-700' : 'text-rose-600'}`}>
                              {cf.type === 'Income' ? '+' : '-'}Rs. {cf.amount.toLocaleString()}
                            </td>
                            <td className="py-2 px-3 text-[#123B2A]/60">{cf.paymentMethod}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 9: STATIONERY MANAGEMENT */}
              {activeTab === 'stationery' && (
                <div className="space-y-4">
                  <div className="bg-white/90 p-3.5 rounded-xl border border-[#19A66A]/20 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[#123B2A]">Stationery & Inventory Stock</h3>
                      <p className="text-xs text-[#123B2A]/60">Track books, homework diaries, uniform items and exam sheets</p>
                    </div>
                    <button
                      onClick={() => alert('New Stock Entry: Adds new batch of notebooks, uniform badges or answer sheets.')}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-[#19A66A] hover:bg-[#158f5b] rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Inventory Item</span>
                    </button>
                  </div>

                  <div className="rounded-xl bg-white/90 border border-[#19A66A]/20 overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F4FFF8] text-[#123B2A]/70 text-[11px] uppercase">
                        <tr>
                          <th className="py-2.5 px-3">Item Name</th>
                          <th className="py-2.5 px-3">Category</th>
                          <th className="py-2.5 px-3">Units in Stock</th>
                          <th className="py-2.5 px-3">Unit Price</th>
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3 text-right">Quick Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#19A66A]/10">
                        {MOCK_STATIONERY.map((st) => (
                          <tr key={st.id} className="hover:bg-[#DDF7E8]/20">
                            <td className="py-2.5 px-3 font-semibold text-[#123B2A]">{st.name}</td>
                            <td className="py-2.5 px-3 text-[#123B2A]/70">{st.category}</td>
                            <td className="py-2.5 px-3 font-mono font-bold text-[#123B2A]">{st.inStock} pcs</td>
                            <td className="py-2.5 px-3 font-medium">Rs. {st.unitPrice}</td>
                            <td className="py-2.5 px-3">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  st.status === 'In Stock'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {st.status}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              <button
                                onClick={() => alert(`Issue ${st.name} to student POS`)}
                                className="text-xs font-semibold text-[#19A66A] hover:underline cursor-pointer"
                              >
                                Issue / Sell
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 10: REPORTS & ANALYTICS */}
              {activeTab === 'reports' && (
                <div className="space-y-4">
                  <div className="bg-white/90 p-4 rounded-xl border border-[#19A66A]/20 space-y-2">
                    <h3 className="text-base font-bold text-[#123B2A]">Printable School Management Reports</h3>
                    <p className="text-xs text-[#123B2A]/60">Generate 1-click comprehensive institutional reports in PDF and Excel formats</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      { title: 'Student Strength & Defaulters List', desc: 'Class-wise student count with pending fees breakdown.', icon: FileText },
                      { title: 'Monthly Teacher Attendance Sheet', desc: 'Faculty presence, late arrivals and leave summary.', icon: CalendarCheck },
                      { title: 'Institutional Profit & Loss Ledger', desc: 'Consolidated cashflow and auditor balance sheet.', icon: TrendingUp },
                      { title: 'Exam DMC & Result Broadsheet', desc: 'Grade positions, subject-wise marks and overall merit list.', icon: Award },
                      { title: 'Stationery Sales & Stock Audit', desc: 'Consumable inventory audit and student sales receipts.', icon: PackageCheck },
                      { title: 'Family-wise Consolidated Fee Ledger', desc: 'Siblings discount and unified fee challan records.', icon: Wallet },
                    ].map((rep, idx) => {
                      const Icon = rep.icon;
                      return (
                        <div key={idx} className="p-4 bg-white/90 rounded-xl border border-[#19A66A]/20 shadow-xs space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-[#DDF7E8] text-[#19A66A] flex items-center justify-center">
                              <Icon className="w-4 h-4" />
                            </div>
                            <h4 className="text-xs font-bold text-[#123B2A]">{rep.title}</h4>
                          </div>
                          <p className="text-[11px] text-[#123B2A]/70">{rep.desc}</p>
                          <div className="pt-2 border-t border-[#19A66A]/10 flex gap-2">
                            <button
                              onClick={() => alert(`Exporting ${rep.title} to PDF...`)}
                              className="px-2.5 py-1 text-[11px] font-bold text-white bg-[#19A66A] rounded hover:bg-[#158f5b] cursor-pointer"
                            >
                              Download PDF
                            </button>
                            <button
                              onClick={() => alert(`Exporting ${rep.title} to Excel...`)}
                              className="px-2.5 py-1 text-[11px] font-semibold text-[#123B2A] bg-[#DDF7E8]/60 rounded hover:bg-[#DDF7E8] cursor-pointer"
                            >
                              Excel
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 11: COMMUNICATION & SMS */}
              {activeTab === 'communication' && (
                <div className="space-y-4">
                  <div className="bg-white/90 p-4 rounded-xl border border-[#19A66A]/20 space-y-3">
                    <h3 className="text-base font-bold text-[#123B2A]">Broadcast Announcements & SMS Gateway</h3>
                    <p className="text-xs text-[#123B2A]/60">Send alerts to parents, teachers or individual classes with one click</p>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#123B2A]">Recipient Group</label>
                      <select className="w-full text-xs p-2 rounded-lg border border-[#19A66A]/25 bg-white">
                        <option>All Parents (1,250 Contacts)</option>
                        <option>Fee Defaulter Parents Only (32 Contacts)</option>
                        <option>All Teachers & Staff (85 Contacts)</option>
                        <option>Grade 10 Parents (Board Exam Prep Alert)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#123B2A]">Message Text (SMS & Mobile App Notification)</label>
                      <textarea
                        rows={3}
                        defaultValue="Respected Parents, Please be informed that the school will remain closed on Monday on account of public holiday. Online homework has been assigned on School Markaz App."
                        className="w-full text-xs p-2.5 rounded-lg border border-[#19A66A]/25 bg-white focus:outline-hidden focus:border-[#19A66A]"
                      />
                    </div>

                    <button
                      onClick={() => alert('Broadcast Alert Dispatched successfully to 1,250 parents!')}
                      className="px-4 py-2 text-xs font-bold text-white bg-[#19A66A] hover:bg-[#158f5b] rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Instant Broadcast</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 12: SETTINGS */}
              {activeTab === 'settings' && (
                <div className="space-y-4">
                  <div className="bg-white/90 p-4 rounded-xl border border-[#19A66A]/20 space-y-4">
                    <h3 className="text-base font-bold text-[#123B2A]">School Profile & ERP Configuration</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="font-bold text-[#123B2A] block mb-1">School Full Name</label>
                        <input
                          type="text"
                          defaultValue="Al-Hira Public Model High School"
                          className="w-full p-2 border border-[#19A66A]/25 rounded-lg bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-[#123B2A] block mb-1">School Registration / Affiliation No</label>
                        <input
                          type="text"
                          defaultValue="REG-B-10492-2018"
                          className="w-full p-2 border border-[#19A66A]/25 rounded-lg bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-[#123B2A] block mb-1">Current Academic Term</label>
                        <input
                          type="text"
                          defaultValue="Session 2025 - 2026"
                          className="w-full p-2 border border-[#19A66A]/25 rounded-lg bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-[#123B2A] block mb-1">Fee Challan Bank Name</label>
                        <input
                          type="text"
                          defaultValue="Habib Bank Limited (HBL) - Branch 0142"
                          className="w-full p-2 border border-[#19A66A]/25 rounded-lg bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* Student Profile Quick View Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#123B2A]/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-[#19A66A]/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#19A66A]/15">
              <div className="flex items-center gap-3">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${selectedStudent.avatarColor}`}>
                  {selectedStudent.name.charAt(0)}
                </span>
                <div>
                  <h3 className="font-bold text-[#123B2A] text-base">{selectedStudent.name}</h3>
                  <p className="text-xs text-[#19A66A] font-semibold">{selectedStudent.grade} - Section {selectedStudent.section}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-[#123B2A]/50 hover:text-[#123B2A] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-[#123B2A]/80">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span>Roll Number:</span>
                <strong className="text-[#123B2A]">{selectedStudent.rollNo}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span>Father / Guardian:</span>
                <strong className="text-[#123B2A]">{selectedStudent.guardianName}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span>Contact Phone:</span>
                <strong className="text-[#123B2A]">{selectedStudent.phone}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span>Attendance Record:</span>
                <strong className="text-emerald-700 font-bold">{selectedStudent.attendance}% Present</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span>Monthly Tuition Fee:</span>
                <strong className="text-[#123B2A]">Rs. {selectedStudent.monthlyFee.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between py-1">
                <span>Fee Status:</span>
                <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                  selectedStudent.feeStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {selectedStudent.feeStatus}
                </span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  setSelectedStudent(null);
                  setShowChallanModal(selectedStudent.name);
                }}
                className="flex-1 py-2 text-xs font-bold text-white bg-[#19A66A] hover:bg-[#158f5b] rounded-xl text-center cursor-pointer"
              >
                Print Fee Challan
              </button>
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 text-xs font-semibold text-[#123B2A] bg-gray-100 hover:bg-gray-200 rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3-Part Bank Fee Challan Preview Modal */}
      {showChallanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#123B2A]/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full border border-[#19A66A]/30 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#19A66A]/15">
              <div>
                <h3 className="font-bold text-[#123B2A] text-base">Standard 3-Copy Bank Fee Challan</h3>
                <p className="text-xs text-[#19A66A]">Student: {showChallanModal} • Month: September 2026</p>
              </div>
              <button
                onClick={() => setShowChallanModal(null)}
                className="text-[#123B2A]/50 hover:text-[#123B2A] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* 3 Columns Voucher Representation */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] font-sans">
              {['School Copy', 'Bank Copy', 'Student Copy'].map((copyTitle) => (
                <div key={copyTitle} className="p-3 rounded-xl border border-dashed border-[#19A66A]/30 bg-[#F4FFF8]/50 space-y-1.5">
                  <div className="text-center pb-1 border-b border-[#19A66A]/20">
                    <div className="font-extrabold text-xs text-[#123B2A]">SCHOOL MARKAZ</div>
                    <div className="text-[10px] text-[#19A66A] font-semibold">{copyTitle}</div>
                  </div>
                  <div className="space-y-1 text-[#123B2A]/80">
                    <div><strong>Challan:</strong> SMK-2026-0921</div>
                    <div><strong>Name:</strong> {showChallanModal}</div>
                    <div><strong>Due Date:</strong> 10-Sep-2026</div>
                    <div className="pt-1 border-t border-gray-200">
                      <div>Tuition Fee: Rs. 3,500</div>
                      <div>Exam Fund: Rs. 300</div>
                      <div className="font-bold text-[#123B2A] pt-1">Total: Rs. 3,800</div>
                    </div>
                  </div>
                  <div className="pt-2 text-center text-[9px] text-[#123B2A]/50">
                    Authorized Bank Stamp
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <button
                onClick={() => alert('Printing 3-Copy Fee Challan...')}
                className="px-4 py-2 text-xs font-bold text-white bg-[#19A66A] hover:bg-[#158f5b] rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Challan</span>
              </button>
              <button
                onClick={() => setShowChallanModal(null)}
                className="px-4 py-2 text-xs font-semibold text-[#123B2A] bg-gray-100 hover:bg-gray-200 rounded-xl cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
