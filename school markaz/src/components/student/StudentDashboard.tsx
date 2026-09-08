import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  CalendarCheck,
  CreditCard,
  Clock,
  LogOut,
  UserCheck,
  CheckCircle2,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  Download,
  Printer,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { AuthUser } from '../../types';
import { useSchool } from '../../context/SchoolContext';

interface StudentDashboardProps {
  user: AuthUser;
  onLogout: () => void;
  onNavigateHome: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  onLogout,
  onNavigateHome,
}) => {
  const { settings, challansList } = useSchool();
  const [activeTab, setActiveTab] = useState<'profile' | 'dmc' | 'fees' | 'attendance' | 'timetable'>('profile');

  // Student Profile Data
  const student = {
    name: user.displayName || 'Hamza Ahmed',
    rollNo: '24',
    class: 'Grade 9-A',
    wing: 'Secondary Matriculation Wing',
    bForm: '37405-8912344-1',
    guardian: 'Muhammad Ahmed (Father)',
    guardianPhone: '+92 302 1122334',
    email: user.email || 'hamza.9a@schoolmarkaz.pk',
    address: 'Street 14, Sector G-9/2, Islamabad',
    admissionDate: '15 April 2024',
    attendanceRate: '94.8%',
  };

  // DMC Subjects & Scores
  const dmcScores = [
    { subject: 'English Compulsory', total: 75, obtained: 68, grade: 'A' },
    { subject: 'Urdu Literature', total: 75, obtained: 65, grade: 'A' },
    { subject: 'Mathematics (Advanced)', total: 75, obtained: 73, grade: 'A+' },
    { subject: 'Physics (Theory + Practical)', total: 75, obtained: 70, grade: 'A+' },
    { subject: 'Chemistry', total: 75, obtained: 67, grade: 'A' },
    { subject: 'Biology', total: 75, obtained: 71, grade: 'A+' },
    { subject: 'Pakistan Studies', total: 50, obtained: 46, grade: 'A+' },
    { subject: 'Islamic Studies / Ethics', total: 50, obtained: 48, grade: 'A+' },
  ];

  const totalPossible = dmcScores.reduce((acc, s) => acc + s.total, 0);
  const totalObtained = dmcScores.reduce((acc, s) => acc + s.obtained, 0);
  const overallPercentage = ((totalObtained / totalPossible) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-[#F4FFF8] flex flex-col font-['Plus_Jakarta_Sans'] text-[#123B2A]">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#19A66A]/20 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white flex items-center justify-center font-bold shadow-md shadow-[#2563EB]/20 overflow-hidden">
            {settings.logo ? (
              <img src={settings.logo} alt={settings.schoolName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <GraduationCap className="w-6 h-6 text-blue-100" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-['Outfit'] font-extrabold text-base sm:text-lg text-[#123B2A] leading-tight">
                {settings.schoolName}
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-200">
                Student & Parent Academic Portal
              </span>
            </div>
            <p className="text-[11px] text-[#123B2A]/70">
              {student.class} • Roll #{student.rollNo} • Session {settings.academicSession}
            </p>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white border border-blue-200 text-xs font-bold text-[#123B2A] shadow-xs cursor-pointer transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-extrabold text-[11px]">
              H
            </div>
            <div className="text-left hidden md:block">
              <div className="leading-tight">{student.name}</div>
              <div className="text-[9px] text-blue-700 font-bold">Class {student.class}</div>
            </div>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-white/70 backdrop-blur-md border-r border-[#19A66A]/20 p-4 shrink-0 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-1">
            <div className="p-3 mb-4 rounded-2xl bg-gradient-to-br from-blue-50 to-emerald-50 border border-blue-200/60 text-xs">
              <div className="font-bold text-[#123B2A] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Pupil Verified</span>
              </div>
              <div className="text-[11px] text-[#123B2A]/70 mt-1">
                Student: {student.name} (Roll #{student.rollNo})
              </div>
            </div>

            <div className="text-[11px] font-bold uppercase tracking-wider text-[#123B2A]/50 px-3 py-1">
              Student Navigation
            </div>

            {[
              { id: 'profile', label: 'My Academic Profile', icon: UserCheck },
              { id: 'dmc', label: 'Mid-Term DMC Card', icon: Award },
              { id: 'fees', label: 'Fee Challan Voucher', icon: CreditCard },
              { id: 'attendance', label: 'Attendance Record', icon: CalendarCheck },
              { id: 'timetable', label: 'Class Timetable', icon: Clock },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/20'
                      : 'text-[#123B2A]/80 hover:bg-[#DDF7E8]/70 hover:text-[#123B2A]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#2563EB]'}`} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-300'}`} />
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#19A66A]/15 text-[11px] text-[#123B2A]/60 text-center">
            <p>School Markaz Student Portal</p>
            <p className="text-[10px] text-blue-700 font-semibold mt-0.5">Designed & Developed by Mharryjs</p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* TAB 1: STUDENT PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div>
                <h2 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                  Student Academic Profile
                </h2>
                <p className="text-xs text-[#123B2A]/70 mt-1">
                  Official pupil registration, B-Form identity, guardian contact, and institutional record.
                </p>
              </div>

              {/* Profile Card with 3D Depth */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-xl border border-white/80 shadow-lg relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-800 text-white flex items-center justify-center font-bold text-3xl shadow-xl shadow-blue-600/25 ring-4 ring-white shrink-0">
                    H
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                        {student.name}
                      </h3>
                      <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                        Roll #{student.rollNo}
                      </span>
                      <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Enrolled Active
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-blue-700">
                      {student.class} • {student.wing}
                    </p>
                    <p className="text-xs text-[#123B2A]/75">
                      Guardian: {student.guardian} • NADRA B-Form: {student.bForm}
                    </p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#19A66A]/15">
                  <div className="p-3 rounded-2xl bg-[#F4FFF8] border border-[#19A66A]/20">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Guardian Phone</div>
                    <div className="text-xs font-bold text-[#123B2A] mt-0.5">{student.guardianPhone}</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#F4FFF8] border border-[#19A66A]/20">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Admission Date</div>
                    <div className="text-xs font-bold text-[#123B2A] mt-0.5">{student.admissionDate}</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#F4FFF8] border border-[#19A66A]/20">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Attendance Rate</div>
                    <div className="text-xs font-bold text-emerald-700 mt-0.5">{student.attendanceRate}</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#F4FFF8] border border-[#19A66A]/20">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Tuition Fee Status</div>
                    <div className="text-xs font-bold text-emerald-700 mt-0.5">Paid (Sept 2026)</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DMC CARD */}
          {activeTab === 'dmc' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                    Mid-Term Examination DMC Certificate
                  </h2>
                  <p className="text-xs text-[#123B2A]/70 mt-1">
                    Official Detailed Marks Certificate authorized by Controller of Examinations & Principal.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-blue-600/20 cursor-pointer self-start"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Official DMC</span>
                </button>
              </div>

              {/* DMC Sheet */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#123B2A]/20 shadow-xl space-y-6">
                <div className="text-center pb-4 border-b-2 border-[#123B2A]/20">
                  <h3 className="text-xl font-extrabold font-['Outfit'] text-[#123B2A]">
                    {settings.schoolName}
                  </h3>
                  <div className="text-xs font-bold text-[#19A66A] uppercase tracking-wider mt-0.5">
                    DETAILED MARKS CERTIFICATE (DMC) • MID-TERM 2026
                  </div>
                  <div className="text-[11px] text-gray-500 mt-1">
                    Candidate: {student.name} • Roll No: {student.rollNo} • Class: {student.class}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b-2 border-gray-200 text-[#123B2A]">
                        <th className="pb-2 font-extrabold">Subject Title</th>
                        <th className="pb-2 font-extrabold text-center">Total Marks</th>
                        <th className="pb-2 font-extrabold text-center">Obtained Marks</th>
                        <th className="pb-2 font-extrabold text-center">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {dmcScores.map((s, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="py-2.5 font-bold text-[#123B2A]">{s.subject}</td>
                          <td className="py-2.5 text-center font-mono">{s.total}</td>
                          <td className="py-2.5 text-center font-mono font-bold text-blue-700">{s.obtained}</td>
                          <td className="py-2.5 text-center">
                            <span className="px-2 py-0.5 rounded font-bold text-[11px] bg-emerald-100 text-emerald-800">
                              {s.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-[#123B2A] font-bold text-xs">
                        <td className="pt-3 font-extrabold">GRAND TOTAL</td>
                        <td className="pt-3 text-center font-mono">{totalPossible}</td>
                        <td className="pt-3 text-center font-mono text-emerald-800 font-extrabold">{totalObtained}</td>
                        <td className="pt-3 text-center font-extrabold text-emerald-800">
                          {overallPercentage}% (Grade A+)
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="pt-8 flex items-center justify-between text-xs border-t border-gray-200">
                  <div className="text-center">
                    <div className="h-8 flex items-end justify-center font-serif text-gray-500 italic">Ayesha Khan</div>
                    <div className="font-bold border-t border-gray-400 pt-1">Class Teacher</div>
                  </div>
                  <div className="text-center">
                    <div className="h-8 flex items-end justify-center font-serif text-[#D4AF37] italic font-bold">Sir Kamran Badini</div>
                    <div className="font-bold border-t border-gray-400 pt-1">Principal / Head of Institution</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FEES & CHALLANS */}
          {activeTab === 'fees' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                  Student Fee Challan Voucher
                </h2>
                <p className="text-xs text-[#123B2A]/70 mt-1">
                  Monthly fee challan with Bank, School, and Parent copy layout.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#19A66A]/30 shadow-lg space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Payment Status: Paid
                    </span>
                    <h4 className="text-lg font-bold text-[#123B2A] mt-1">Challan #2026-0914 (September 2026)</h4>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Amount Settled</div>
                    <div className="text-xl font-extrabold text-emerald-800">Rs. 3,500</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="font-bold text-gray-600">Bank Copy</div>
                    <div className="text-gray-500 text-[11px] mt-1">HBL Main Boulevard Branch (Stamp Verified)</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="font-bold text-gray-600">School Copy</div>
                    <div className="text-gray-500 text-[11px] mt-1">Accounts Office ledger record synced</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="font-bold text-gray-600">Student Copy</div>
                    <div className="text-gray-500 text-[11px] mt-1">Paid on 02 Sept 2026 via Online HBL Portal</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                  Student Attendance History
                </h2>
                <p className="text-xs text-[#123B2A]/70 mt-1">
                  Daily presence log registered during 30-sec morning roll call.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <div className="text-xs text-emerald-800 font-bold">Days Present</div>
                  <div className="text-2xl font-extrabold text-emerald-900 mt-1">22 Days</div>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                  <div className="text-xs text-amber-800 font-bold">Approved Leave</div>
                  <div className="text-2xl font-extrabold text-amber-900 mt-1">1 Day</div>
                </div>
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center">
                  <div className="text-xs text-rose-800 font-bold">Absences</div>
                  <div className="text-2xl font-extrabold text-rose-900 mt-1">0 Days</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: TIMETABLE */}
          {activeTab === 'timetable' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                  Class 9-A Daily Lecture Schedule
                </h2>
                <p className="text-xs text-[#123B2A]/70 mt-1">
                  Daily routine for Grade 9-A (Science Matriculation).
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { time: '08:00 AM - 08:45 AM', subject: 'Biology', teacher: 'Madam Ayesha Khan', room: 'Lab 1' },
                  { time: '08:50 AM - 09:35 AM', subject: 'Mathematics', teacher: 'Sir Tariq Jamil', room: 'Room 9-A' },
                  { time: '09:40 AM - 10:25 AM', subject: 'Physics', teacher: 'Sir Kamran Badini', room: 'Physics Lab' },
                  { time: '10:25 AM - 10:55 AM', subject: 'Break & Refreshment', teacher: 'Campus Grounds', room: 'Cafeteria' },
                  { time: '11:00 AM - 11:45 AM', subject: 'English Grammar', teacher: 'Sir Bilal Qureshi', room: 'Room 9-A' },
                  { time: '11:50 AM - 12:35 PM', subject: 'Chemistry Practical', teacher: 'Madam Ayesha Khan', room: 'Chemistry Lab' },
                ].map((p, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/80 border border-white/80 shadow-xs flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-[#123B2A]">{p.subject}</div>
                      <div className="text-gray-500 text-[11px] mt-0.5">Faculty: {p.teacher} • Venue: {p.room}</div>
                    </div>
                    <span className="px-3 py-1 rounded-xl bg-blue-50 text-blue-800 font-mono font-bold">
                      {p.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
