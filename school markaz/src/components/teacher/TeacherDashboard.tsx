import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  CalendarCheck,
  Award,
  Clock,
  LogOut,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Save,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  BookOpen,
  Calendar,
  FileText,
  Send,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Edit3
} from 'lucide-react';
import { AuthUser } from '../../types';
import { useSchool } from '../../context/SchoolContext';

interface TeacherDashboardProps {
  user: AuthUser;
  onLogout: () => void;
  onNavigateHome: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  user,
  onLogout,
  onNavigateHome,
}) => {
  const { settings, studentsList, attendanceSheet, toggleAttendance } = useSchool();
  const [activeTab, setActiveTab] = useState<'attendance' | 'marks' | 'timetable' | 'profile' | 'leave'>('profile');
  const [selectedClass, setSelectedClass] = useState<string>('Grade 9-A');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Profile editable state
  const [teacherProfile, setTeacherProfile] = useState<AuthUser>({
    ...user,
    displayName: user.displayName || 'Madam Ayesha Khan',
    designation: user.designation || 'Senior Science Faculty & Class 9-A Incharge',
    department: user.department || 'Science & Secondary Wing',
    phone: user.phone || '+92 333 4567890',
    qualification: user.qualification || 'M.Sc Biology & Chemistry (B.Ed Honors)',
    assignedClasses: user.assignedClasses || ['Grade 9-A', 'Grade 10-B'],
    shift: user.shift || 'Morning Shift (07:45 AM - 01:45 PM)',
    bio: user.bio || '12 years teaching secondary sciences with consistent 95%+ Board examination distinction rate.',
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState<AuthUser>(teacherProfile);

  // Leave application state
  const [leaveReason, setLeaveReason] = useState('Medical Appointment / Dental Checkup');
  const [leaveDays, setLeaveDays] = useState('1');
  const [leaveDate, setLeaveDate] = useState(new Date().toISOString().split('T')[0]);
  const [leaveList, setLeaveList] = useState<Array<{ id: string; date: string; days: string; reason: string; status: 'Pending' | 'Approved' | 'Rejected'; approver: string }>>([
    {
      id: 'LV-102',
      date: '2026-09-02',
      days: '1 day',
      reason: 'Family emergency / sibling wedding ceremony',
      status: 'Approved',
      approver: 'Sir Kamran Badini (Principal)',
    },
  ]);

  // Exam marks local state
  const [testScores, setTestScores] = useState<{ [studentId: string]: number }>({
    'SM-ST-101': 88,
    'SM-ST-102': 94,
    'SM-ST-103': 76,
    'SM-ST-104': 68,
    'SM-ST-105': 91,
    'SM-ST-106': 82,
    'SM-ST-107': 85,
    'SM-ST-108': 90,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setTeacherProfile(tempProfile);
    setIsEditingProfile(false);
    showToast('Teacher profile updated and synchronized successfully!');
  };

  const handleMarkAllPresent = () => {
    studentsList.forEach((st) => {
      toggleAttendance(st.id, 'P');
    });
    showToast('All students marked Present for today!');
  };

  const handleScoreChange = (id: string, score: number) => {
    setTestScores((prev) => ({ ...prev, [id]: score }));
  };

  const handleSaveMarks = () => {
    showToast('Mid-Term Examination marks synchronized with examination cell!');
  };

  const handleSubmitLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveReason.trim()) return;

    const newLeave = {
      id: `LV-${Date.now().toString().slice(-4)}`,
      date: leaveDate,
      days: `${leaveDays} ${Number(leaveDays) > 1 ? 'days' : 'day'}`,
      reason: leaveReason.trim(),
      status: 'Pending' as const,
      approver: 'Pending Principal (Sir) Review',
    };

    setLeaveList([newLeave, ...leaveList]);
    setLeaveReason('');
    showToast('Official leave application submitted to Sir (Principal) for executive approval!');
  };

  return (
    <div className="min-h-screen bg-[#F4FFF8] flex flex-col font-['Plus_Jakarta_Sans'] text-[#123B2A]">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl bg-white border border-[#19A66A]/30 text-[#123B2A] text-xs font-semibold shadow-xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#19A66A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#19A66A]/20 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F766E] to-[#115E59] text-white flex items-center justify-center font-bold shadow-md shadow-[#0F766E]/20 overflow-hidden">
            {settings.logo ? (
              <img src={settings.logo} alt={settings.schoolName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <Users className="w-5 h-5 text-teal-100" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-['Outfit'] font-extrabold text-base sm:text-lg text-[#123B2A] leading-tight">
                {settings.schoolName}
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DDF7E8] text-[#123B2A] border border-[#19A66A]/30">
                Teacher Faculty Portal
              </span>
            </div>
            <p className="text-[11px] text-[#123B2A]/70">
              Assigned Wing: {teacherProfile.department} • Session {settings.academicSession}
            </p>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white border border-[#19A66A]/30 text-xs font-bold text-[#123B2A] shadow-xs cursor-pointer transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-extrabold text-[11px]">
              {teacherProfile.displayName?.slice(0, 1) || 'T'}
            </div>
            <div className="text-left hidden md:block">
              <div className="leading-tight">{teacherProfile.displayName}</div>
              <div className="text-[9px] text-teal-600 font-semibold">{teacherProfile.designation}</div>
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

      {/* Main Content Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-full md:w-64 bg-white/70 backdrop-blur-md border-r border-[#19A66A]/20 p-4 shrink-0 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-1">
            <div className="p-3 mb-4 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200/60 text-xs">
              <div className="font-bold text-[#123B2A] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Faculty Authenticated</span>
              </div>
              <div className="text-[11px] text-[#123B2A]/70 mt-1">
                Welcome back, {teacherProfile.displayName}. Your daily attendance & marks duties are active.
              </div>
            </div>

            <div className="text-[11px] font-bold uppercase tracking-wider text-[#123B2A]/50 px-3 py-1">
              Teacher Navigation
            </div>

            {[
              { id: 'profile', label: 'My Teacher Profile', icon: UserCheck },
              { id: 'attendance', label: 'Class Attendance & Roll Call', icon: CalendarCheck },
              { id: 'marks', label: 'Gradebook & Exam Marks', icon: Award },
              { id: 'timetable', label: 'My Weekly Timetable', icon: Clock },
              { id: 'leave', label: 'Leave Request to Sir (Principal)', icon: FileText },
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
                      ? 'bg-[#0F766E] text-white shadow-sm shadow-[#0F766E]/20'
                      : 'text-[#123B2A]/80 hover:bg-[#DDF7E8]/70 hover:text-[#123B2A]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#0F766E]'}`} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-300'}`} />
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#19A66A]/15 text-[11px] text-[#123B2A]/60 text-center">
            <p>School Markaz Faculty Suite</p>
            <p className="text-[10px] text-teal-700 font-semibold mt-0.5">Designed & Developed by Mharryjs</p>
          </div>
        </aside>

        {/* Right Main Panel */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* TAB 1: TEACHER PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                    Teacher Official Profile
                  </h2>
                  <p className="text-xs text-[#123B2A]/70 mt-1">
                    Institutional faculty credential record, qualifications, assigned classes, and payroll status.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setTempProfile(teacherProfile);
                    setIsEditingProfile(!isEditingProfile);
                  }}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-teal-600/30 transition-all cursor-pointer self-start"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditingProfile ? 'Cancel Editing' : 'Edit Contact & Bio'}</span>
                </button>
              </div>

              {/* Profile Card Header with 3D Depth */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-[0_10px_35px_rgba(15,118,110,0.08)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl -z-10 pointer-events-none" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-teal-600 to-emerald-800 text-white flex items-center justify-center font-bold text-3xl shadow-xl shadow-teal-700/25 ring-4 ring-white shrink-0">
                    {teacherProfile.displayName?.slice(0, 1) || 'A'}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                        {teacherProfile.displayName}
                      </h3>
                      <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-teal-100 text-teal-800 border border-teal-300">
                        Senior Faculty
                      </span>
                      <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Verified Staff
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-teal-700">
                      {teacherProfile.designation} • {teacherProfile.qualification}
                    </p>
                    <p className="text-xs text-[#123B2A]/75 leading-relaxed max-w-2xl pt-1">
                      {teacherProfile.bio}
                    </p>
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#19A66A]/15">
                  <div className="p-3 rounded-2xl bg-[#F4FFF8] border border-[#19A66A]/20">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Official Email</div>
                    <div className="text-xs font-bold text-[#123B2A] truncate mt-0.5">{teacherProfile.email}</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#F4FFF8] border border-[#19A66A]/20">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Contact Phone</div>
                    <div className="text-xs font-bold text-[#123B2A] mt-0.5">{teacherProfile.phone}</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#F4FFF8] border border-[#19A66A]/20">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Assigned Classes</div>
                    <div className="text-xs font-bold text-[#123B2A] mt-0.5">
                      {teacherProfile.assignedClasses?.join(', ') || 'Grade 9-A, 10-B'}
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#F4FFF8] border border-[#19A66A]/20">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Monthly Salary</div>
                    <div className="text-xs font-bold text-emerald-700 mt-0.5">Rs. 58,000 (Disbursed)</div>
                  </div>
                </div>
              </div>

              {/* Edit Profile Form (conditional) */}
              {isEditingProfile && (
                <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl border border-teal-300 shadow-xl animate-in slide-in-from-top-2">
                  <h4 className="text-base font-bold font-['Outfit'] text-[#123B2A] mb-4">
                    Update Faculty Details
                  </h4>
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#123B2A] mb-1">Full Name</label>
                        <input
                          type="text"
                          value={tempProfile.displayName}
                          onChange={(e) => setTempProfile({ ...tempProfile, displayName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#123B2A] mb-1">Contact Phone</label>
                        <input
                          type="text"
                          value={tempProfile.phone}
                          onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#123B2A] mb-1">Designation</label>
                        <input
                          type="text"
                          value={tempProfile.designation}
                          onChange={(e) => setTempProfile({ ...tempProfile, designation: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#123B2A] mb-1">Qualification</label>
                        <input
                          type="text"
                          value={tempProfile.qualification}
                          onChange={(e) => setTempProfile({ ...tempProfile, qualification: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#123B2A] mb-1">Professional Bio</label>
                      <textarea
                        rows={3}
                        value={tempProfile.bio}
                        onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-600/25 flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Profile Changes</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CLASS ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                    Class Roll Call Attendance
                  </h2>
                  <p className="text-xs text-[#123B2A]/70 mt-1">
                    Take instant 30-second daily attendance for your designated section. Click P / A / L for each student.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white border border-[#19A66A]/30 text-xs font-bold text-[#123B2A] focus:outline-none"
                  >
                    <option value="Grade 9-A">Grade 9-A (Science)</option>
                    <option value="Grade 10-B">Grade 10-B (Matric)</option>
                  </select>

                  <button
                    type="button"
                    onClick={handleMarkAllPresent}
                    className="px-4 py-2 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white text-xs font-bold shadow-sm shadow-[#19A66A]/20 transition-all cursor-pointer"
                  >
                    Mark All Present
                  </button>
                </div>
              </div>

              {/* Roster Table */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-md">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-200 text-[#123B2A]/60">
                        <th className="pb-3 font-bold">Roll #</th>
                        <th className="pb-3 font-bold">Student Name</th>
                        <th className="pb-3 font-bold">Class & Section</th>
                        <th className="pb-3 font-bold">Guardian Contact</th>
                        <th className="pb-3 font-bold text-center">Status (P / A / L)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {studentsList.map((st) => {
                        const currentStatus = attendanceSheet[st.id] || 'P';
                        return (
                          <tr key={st.id} className="hover:bg-[#F4FFF8]/60 transition-colors">
                            <td className="py-3 font-mono font-bold text-teal-700">{st.rollNo}</td>
                            <td className="py-3 font-bold text-[#123B2A]">{st.name}</td>
                            <td className="py-3 text-gray-600">{st.grade} ({st.section})</td>
                            <td className="py-3 text-gray-500 font-mono text-[11px]">{st.phone}</td>
                            <td className="py-3 text-center">
                              <div className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
                                <button
                                  type="button"
                                  onClick={() => toggleAttendance(st.id, 'P')}
                                  className={`w-7 h-7 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                                    currentStatus === 'P'
                                      ? 'bg-emerald-600 text-white shadow-xs'
                                      : 'text-gray-600 hover:bg-white'
                                  }`}
                                  title="Mark Present"
                                >
                                  P
                                </button>
                                <button
                                  type="button"
                                  onClick={() => toggleAttendance(st.id, 'A')}
                                  className={`w-7 h-7 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                                    currentStatus === 'A'
                                      ? 'bg-rose-600 text-white shadow-xs'
                                      : 'text-gray-600 hover:bg-white'
                                  }`}
                                  title="Mark Absent"
                                >
                                  A
                                </button>
                                <button
                                  type="button"
                                  onClick={() => toggleAttendance(st.id, 'L')}
                                  className={`w-7 h-7 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                                    currentStatus === 'L'
                                      ? 'bg-amber-500 text-white shadow-xs'
                                      : 'text-gray-600 hover:bg-white'
                                  }`}
                                  title="Mark Leave"
                                >
                                  L
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MARKS & EXAM RESULTS */}
          {activeTab === 'marks' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                    Mid-Term Examination Gradebook
                  </h2>
                  <p className="text-xs text-[#123B2A]/70 mt-1">
                    Enter and submit student test marks for Biology & Chemistry (Total Marks: 100).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveMarks}
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save & Sync Marks</span>
                </button>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-md">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-200 text-[#123B2A]/60">
                        <th className="pb-3 font-bold">Roll #</th>
                        <th className="pb-3 font-bold">Student Name</th>
                        <th className="pb-3 font-bold">Subject</th>
                        <th className="pb-3 font-bold">Total</th>
                        <th className="pb-3 font-bold">Obtained Score</th>
                        <th className="pb-3 font-bold">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {studentsList.map((st) => {
                        const score = testScores[st.id] !== undefined ? testScores[st.id] : 80;
                        const grade = score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 60 ? 'C' : 'D';
                        return (
                          <tr key={st.id} className="hover:bg-[#F4FFF8]/60 transition-colors">
                            <td className="py-3 font-mono font-bold text-teal-700">{st.rollNo}</td>
                            <td className="py-3 font-bold text-[#123B2A]">{st.name}</td>
                            <td className="py-3 text-gray-600">Biology & Science</td>
                            <td className="py-3 font-mono text-gray-500">100</td>
                            <td className="py-3">
                              <input
                                type="number"
                                min={0}
                                max={100}
                                value={score}
                                onChange={(e) => handleScoreChange(st.id, Number(e.target.value))}
                                className="w-20 px-2.5 py-1 rounded-lg border border-gray-300 font-mono text-xs font-bold focus:outline-none focus:border-teal-500"
                              />
                            </td>
                            <td className="py-3">
                              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                                grade === 'A+' ? 'bg-emerald-100 text-emerald-800' :
                                grade === 'A' ? 'bg-teal-100 text-teal-800' :
                                grade === 'B' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {grade}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TIMETABLE */}
          {activeTab === 'timetable' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div>
                <h2 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                  My Weekly Teaching Timetable
                </h2>
                <p className="text-xs text-[#123B2A]/70 mt-1">
                  Schedule for Monday through Saturday across Science and Secondary lecture rooms.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { period: 'Period 1 (08:00 AM - 08:45 AM)', class: 'Grade 9-A', room: 'Lab 1', topic: 'Cell Structure & Plant Physiology' },
                  { period: 'Period 2 (08:50 AM - 09:35 AM)', class: 'Grade 10-B', room: 'Hall B', topic: 'Chemical Equilibrium & Kinetics' },
                  { period: 'Period 3 (09:40 AM - 10:25 AM)', class: 'Free / Paper Checking', room: 'Faculty Room', topic: 'Mid-term DMC evaluations' },
                  { period: 'Break (10:25 AM - 10:55 AM)', class: 'Campus Recess', room: 'Staff Cafeteria', topic: 'Refreshment & Assembly Duty' },
                  { period: 'Period 4 (11:00 AM - 11:45 AM)', class: 'Grade 8-C', room: 'Room 14', topic: 'Human Digestive Anatomy' },
                  { period: 'Period 5 (11:50 AM - 12:35 PM)', class: 'Grade 9-A (Practical)', room: 'Bio Lab', topic: 'Microscope slide preparation' },
                ].map((slot, i) => (
                  <div key={i} className="p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-sm hover:shadow-md transition-all">
                    <div className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">{slot.period}</div>
                    <div className="text-base font-extrabold text-[#123B2A] mt-1">{slot.class}</div>
                    <div className="text-xs text-gray-500 font-medium mt-0.5">Location: {slot.room}</div>
                    <div className="text-xs text-teal-800 bg-teal-50 px-2.5 py-1.5 rounded-xl mt-3 font-semibold border border-teal-100">
                      {slot.topic}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: LEAVE APPLICATION TO PRINCIPAL (SIR) */}
          {activeTab === 'leave' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                  Leave Application to Sir (Principal)
                </h2>
                <p className="text-xs text-[#123B2A]/70 mt-1">
                  Submit official institutional leave directly to the Principal's executive approval desk.
                </p>
              </div>

              {/* Submit Form */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-xl border border-white/80 shadow-lg">
                <form onSubmit={handleSubmitLeave} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#123B2A] mb-1">Effective Leave Date</label>
                      <input
                        type="date"
                        required
                        value={leaveDate}
                        onChange={(e) => setLeaveDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#123B2A] mb-1">Number of Days</label>
                      <select
                        value={leaveDays}
                        onChange={(e) => setLeaveDays(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-teal-500"
                      >
                        <option value="1">1 Day</option>
                        <option value="2">2 Days</option>
                        <option value="3">3 Days</option>
                        <option value="5">1 Week (Medical Certificate Required)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#123B2A] mb-1">Reason for Leave</label>
                    <textarea
                      required
                      rows={3}
                      value={leaveReason}
                      onChange={(e) => setLeaveReason(e.target.value)}
                      placeholder="State reason for absence and replacement teacher arrangement..."
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-600/25 flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Application to Sir (Principal)</span>
                  </button>
                </form>
              </div>

              {/* Leave History Table */}
              <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-md">
                <h4 className="text-sm font-bold text-[#123B2A] mb-3">Previous Leave Applications</h4>
                <div className="space-y-3">
                  {leaveList.map((item) => (
                    <div key={item.id} className="p-4 rounded-2xl bg-[#F4FFF8] border border-[#19A66A]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <div className="font-bold text-[#123B2A]">{item.reason}</div>
                        <div className="text-gray-500 text-[11px] mt-0.5">
                          Date: {item.date} • Duration: {item.days} • Approver: {item.approver}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold self-start sm:self-center ${
                        item.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
