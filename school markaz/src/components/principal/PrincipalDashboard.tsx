import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  Users,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileText,
  Bell,
  Clock,
  LogOut,
  UserCheck,
  Building,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  Edit3,
  Save,
  Check,
  Stamp,
  Sparkles
} from 'lucide-react';
import { AuthUser } from '../../types';
import { useSchool } from '../../context/SchoolContext';

interface PrincipalDashboardProps {
  user: AuthUser;
  onLogout: () => void;
  onNavigateHome: () => void;
}

export const PrincipalDashboard: React.FC<PrincipalDashboardProps> = ({
  user,
  onLogout,
  onNavigateHome,
}) => {
  const { settings, stats, teachersList, studentsList } = useSchool();
  const [activeTab, setActiveTab] = useState<'overview' | 'supervision' | 'approvals' | 'circulars' | 'profile'>('profile');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sir's Profile State
  const [principalProfile, setPrincipalProfile] = useState<AuthUser>({
    ...user,
    displayName: user.displayName || 'Sir Kamran Badini',
    designation: user.designation || 'Principal & Head of Institution',
    department: user.department || 'Executive Directorate & Campus Administration',
    phone: user.phone || '+92 301 9876543',
    qualification: user.qualification || 'M.Phil Educational Management & M.Sc Physics',
    signature: user.signature || 'Sir Kamran Badini (Principal Seal)',
    bio: user.bio || 'Directing academic excellence, faculty performance, student discipline, and strategic campus governance with 22 years of institutional leadership.',
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState<AuthUser>(principalProfile);

  // Executive Approvals state
  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 'APP-01',
      type: 'Faculty Leave',
      applicant: 'Madam Ayesha Khan (Senior Science Faculty)',
      detail: 'Requesting 1-day medical leave on Sept 12, 2026. Replacement teacher: Sir Tariq Jamil.',
      date: 'Today, 08:30 AM',
      status: 'Pending',
    },
    {
      id: 'APP-02',
      type: 'Fee Concession (50%)',
      applicant: 'Guardian of Hamza Ahmed (Grade 9-A)',
      detail: 'Orphan scholarship request with verified B-Form and family income statement.',
      date: 'Yesterday',
      status: 'Pending',
    },
    {
      id: 'APP-03',
      type: 'Board Examination DMC Finalization',
      applicant: 'Controller of Examinations',
      detail: 'Grade 10-B Secondary School Certificate Mid-Term marks compilation ready for sign-off.',
      date: '2 days ago',
      status: 'Pending',
    },
  ]);

  // Official Circulars state
  const [circulars, setCirculars] = useState([
    {
      id: 'CIR-01',
      title: 'Mid-Term Examination 2026 Date Sheet & Protocols',
      date: '05 Sept 2026',
      audience: 'All Students & Parents',
      priority: 'High',
      content: 'Exams commence from Sept 15. All fee dues must be cleared before roll number slip issuance.',
    },
    {
      id: 'CIR-02',
      title: 'Mandatory Faculty Pedagogical Training Session',
      date: '02 Sept 2026',
      audience: 'Teaching Faculty',
      priority: 'Normal',
      content: 'Workshop on conceptual STEM teaching methodologies in the Main Auditorium this Saturday at 2:00 PM.',
    },
  ]);

  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeContent, setNewNoticeContent] = useState('');
  const [newNoticeAudience, setNewNoticeAudience] = useState('All Students & Parents');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setPrincipalProfile(tempProfile);
    setIsEditingProfile(false);
    showToast("Principal's official profile updated successfully!");
  };

  const handleApprovalAction = (id: string, action: 'Approved' | 'Rejected') => {
    setPendingApprovals((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: action } : app))
    );
    showToast(`Request ${id} marked as ${action} by Sir (Principal).`);
  };

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle.trim() || !newNoticeContent.trim()) return;

    const newCir = {
      id: `CIR-${Date.now().toString().slice(-4)}`,
      title: newNoticeTitle.trim(),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      audience: newNoticeAudience,
      priority: 'High',
      content: newNoticeContent.trim(),
    };

    setCirculars([newCir, ...circulars]);
    setNewNoticeTitle('');
    setNewNoticeContent('');
    showToast('Executive circular published to all students, parents, and faculty!');
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
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-[#123B2A]/15 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#123B2A] to-[#0B2317] text-[#F4D068] flex items-center justify-center font-bold shadow-md shadow-[#0B2317]/25 overflow-hidden ring-2 ring-[#D4AF37]/40">
            {settings.logo ? (
              <img src={settings.logo} alt={settings.schoolName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <Award className="w-5 h-5 text-[#D4AF37]" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-['Outfit'] font-extrabold text-base sm:text-lg text-[#123B2A] leading-tight">
                {settings.schoolName}
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#FDF6B2] text-[#723B13] border border-[#F1C40F]/40">
                Executive Directorate • Sir's Office
              </span>
            </div>
            <p className="text-[11px] text-[#123B2A]/70">
              Campus Directorate • Head of Institution Console
            </p>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white border border-[#D4AF37]/40 text-xs font-bold text-[#123B2A] shadow-xs cursor-pointer transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-[#123B2A] text-[#F4D068] flex items-center justify-center font-extrabold text-[11px] border border-[#D4AF37]/50">
              K
            </div>
            <div className="text-left hidden md:block">
              <div className="leading-tight">{principalProfile.displayName}</div>
              <div className="text-[9px] text-[#B7791F] font-bold">Principal & Campus Director</div>
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
        <aside className="w-full md:w-64 bg-white/75 backdrop-blur-md border-r border-[#19A66A]/20 p-4 shrink-0 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-1">
            <div className="p-3 mb-4 rounded-2xl bg-gradient-to-br from-amber-50 to-emerald-50 border border-amber-200 text-xs">
              <div className="font-bold text-[#123B2A] flex items-center gap-1.5">
                <Stamp className="w-4 h-4 text-[#D4AF37]" />
                <span>Executive Office Active</span>
              </div>
              <div className="text-[11px] text-[#123B2A]/70 mt-1">
                Direct authority over faculty supervision, academic approvals, and institutional circulars.
              </div>
            </div>

            <div className="text-[11px] font-bold uppercase tracking-wider text-[#123B2A]/50 px-3 py-1">
              Principal Directorate
            </div>

            {[
              { id: 'profile', label: "Sir's Official Profile", icon: UserCheck },
              { id: 'overview', label: 'Executive Dashboard', icon: Building },
              { id: 'approvals', label: 'Approvals & Sanctions', icon: ShieldCheck, badge: pendingApprovals.filter(p => p.status === 'Pending').length },
              { id: 'supervision', label: 'Faculty Supervision', icon: Users },
              { id: 'circulars', label: 'Official Circulars & Notices', icon: Bell },
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
                      ? 'bg-gradient-to-r from-[#123B2A] to-[#0B2317] text-[#F4D068] shadow-sm shadow-[#0B2317]/25'
                      : 'text-[#123B2A]/80 hover:bg-[#DDF7E8]/70 hover:text-[#123B2A]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#F4D068]' : 'text-[#19A66A]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 ? (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-[#123B2A]">
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-[#F4D068]' : 'text-gray-300'}`} />
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#19A66A]/15 text-[11px] text-[#123B2A]/60 text-center">
            <p>Principal's Executive Office</p>
            <p className="text-[10px] text-emerald-800 font-semibold mt-0.5">Designed & Developed by Mharryjs</p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* TAB 1: SIR'S PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                    Sir (Principal) Executive Profile
                  </h2>
                  <p className="text-xs text-[#123B2A]/70 mt-1">
                    Head of Institution credential file, institutional registration, leadership tenure, and digital seal.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setTempProfile(principalProfile);
                    setIsEditingProfile(!isEditingProfile);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#123B2A] hover:bg-[#0B2317] text-[#F4D068] text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-[#123B2A]/30 transition-all cursor-pointer self-start"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditingProfile ? 'Cancel Editing' : "Edit Sir's Profile"}</span>
                </button>
              </div>

              {/* Profile Card Header */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-xl border border-white/80 shadow-[0_12px_40px_rgba(18,59,42,0.08)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-amber-50 rounded-full blur-3xl -z-10 pointer-events-none" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#123B2A] via-[#0F3524] to-[#0B2317] text-[#F4D068] flex items-center justify-center font-bold text-3xl shadow-xl shadow-[#0B2317]/30 ring-4 ring-white shrink-0 border border-[#D4AF37]/50">
                    K
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                        {principalProfile.displayName}
                      </h3>
                      <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]">
                        Head of Institution (Sir)
                      </span>
                      <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Campus Directorate
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-[#123B2A]">
                      {principalProfile.designation} • {principalProfile.qualification}
                    </p>
                    <p className="text-xs text-[#123B2A]/80 leading-relaxed max-w-2xl pt-1">
                      {principalProfile.bio}
                    </p>
                  </div>
                </div>

                {/* Directorate Details */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#19A66A]/15">
                  <div className="p-3.5 rounded-2xl bg-[#F4FFF8] border border-[#19A66A]/20">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Executive Direct Line</div>
                    <div className="text-xs font-bold text-[#123B2A] mt-0.5">{principalProfile.phone}</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#F4FFF8] border border-[#19A66A]/20">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Official Email</div>
                    <div className="text-xs font-bold text-[#123B2A] truncate mt-0.5">{principalProfile.email}</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#F4FFF8] border border-[#19A66A]/20">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Campus Registration</div>
                    <div className="text-xs font-bold text-emerald-800 mt-0.5">{settings.campusCode || 'CAMPUS-01-MAIN'}</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#F4FFF8] border border-[#19A66A]/20">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Digital Seal Status</div>
                    <div className="text-xs font-bold text-[#D4AF37] flex items-center gap-1 mt-0.5">
                      <Stamp className="w-3.5 h-3.5" />
                      <span>Authorized</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Profile Form */}
              {isEditingProfile && (
                <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-amber-300 shadow-xl animate-in slide-in-from-top-2">
                  <h4 className="text-base font-bold font-['Outfit'] text-[#123B2A] mb-4">
                    Update Executive Directorate Details
                  </h4>
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#123B2A] mb-1">Full Name & Title</label>
                        <input
                          type="text"
                          value={tempProfile.displayName}
                          onChange={(e) => setTempProfile({ ...tempProfile, displayName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#123B2A] mb-1">Executive Phone</label>
                        <input
                          type="text"
                          value={tempProfile.phone}
                          onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#123B2A] mb-1">Official Designation</label>
                        <input
                          type="text"
                          value={tempProfile.designation}
                          onChange={(e) => setTempProfile({ ...tempProfile, designation: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#123B2A] mb-1">Degrees & Qualifications</label>
                        <input
                          type="text"
                          value={tempProfile.qualification}
                          onChange={(e) => setTempProfile({ ...tempProfile, qualification: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#123B2A] mb-1">Principal's Institutional Vision</label>
                      <textarea
                        rows={3}
                        value={tempProfile.bio}
                        onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-emerald-600"
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
                        className="px-5 py-2 rounded-xl bg-[#123B2A] hover:bg-[#0B2317] text-[#F4D068] text-xs font-bold shadow-md shadow-[#123B2A]/25 flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: EXECUTIVE OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div>
                <h2 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                  Executive Campus Overview
                </h2>
                <p className="text-xs text-[#123B2A]/70 mt-1">
                  Macro institutional metrics for enrollment, faculty attendance, fee recovery, and pending approvals.
                </p>
              </div>

              {/* 4 Big KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-md">
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Total Enrollment</div>
                  <div className="text-2xl font-extrabold text-[#123B2A] mt-1">{stats.totalStudents}</div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-1">Full-time registered students</div>
                </div>

                <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-md">
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Teaching Faculty</div>
                  <div className="text-2xl font-extrabold text-teal-800 mt-1">{teachersList.length}</div>
                  <div className="text-[11px] text-teal-700 font-semibold mt-1">100% on duty today</div>
                </div>

                <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-md">
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Student Attendance</div>
                  <div className="text-2xl font-extrabold text-emerald-700 mt-1">{stats.presentPercentage}%</div>
                  <div className="text-[11px] text-gray-500 mt-1">{stats.presentTodayCount} Present • {stats.absentTodayCount} Absent</div>
                </div>

                <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-md">
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Fees Recovered</div>
                  <div className="text-2xl font-extrabold text-[#123B2A] mt-1">Rs. {stats.collectedFeesAmount.toLocaleString()}</div>
                  <div className="text-[11px] text-amber-700 font-semibold mt-1">Rs. {stats.pendingFeesAmount.toLocaleString()} pending</div>
                </div>
              </div>

              {/* Pending Action Items */}
              <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-extrabold font-['Outfit'] text-base text-[#123B2A]">
                    Sanctions Awaiting Principal Sign-Off
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('approvals')}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900"
                  >
                    View All Approvals →
                  </button>
                </div>

                <div className="space-y-3">
                  {pendingApprovals.filter(p => p.status === 'Pending').map((item) => (
                    <div key={item.id} className="p-4 rounded-2xl bg-[#F4FFF8] border border-[#19A66A]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md font-bold bg-amber-100 text-amber-800 text-[10px]">
                            {item.type}
                          </span>
                          <span className="font-bold text-[#123B2A]">{item.applicant}</span>
                        </div>
                        <p className="text-gray-600 mt-1">{item.detail}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleApprovalAction(item.id, 'Approved')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApprovalAction(item.id, 'Rejected')}
                          className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: APPROVALS & SANCTIONS */}
          {activeTab === 'approvals' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div>
                <h2 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                  Executive Approvals & Sanctions
                </h2>
                <p className="text-xs text-[#123B2A]/70 mt-1">
                  Authorize teacher leave applications, fee concessions for deserving pupils, and DMC examination cards.
                </p>
              </div>

              <div className="space-y-4">
                {pendingApprovals.map((app) => (
                  <div key={app.id} className="p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-md">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-teal-700">{app.id}</span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#DDF7E8] text-[#123B2A]">
                            {app.type}
                          </span>
                          <span className="text-xs font-bold text-[#123B2A]">{app.applicant}</span>
                        </div>
                        <div className="text-[11px] text-gray-500 mt-1">Received: {app.date}</div>
                      </div>

                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold self-start sm:self-center ${
                        app.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'Rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    <p className="text-xs text-[#123B2A]/80 py-3 leading-relaxed">
                      {app.detail}
                    </p>

                    {app.status === 'Pending' && (
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => handleApprovalAction(app.id, 'Rejected')}
                          className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-all cursor-pointer"
                        >
                          Reject Request
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApprovalAction(app.id, 'Approved')}
                          className="px-5 py-2 rounded-xl bg-[#123B2A] hover:bg-[#0B2317] text-[#F4D068] text-xs font-bold shadow-md shadow-[#123B2A]/20 flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Stamp className="w-3.5 h-3.5" />
                          <span>Authorize & Apply Principal Seal</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FACULTY SUPERVISION */}
          {activeTab === 'supervision' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div>
                <h2 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                  Faculty Supervision & Roster
                </h2>
                <p className="text-xs text-[#123B2A]/70 mt-1">
                  Principal oversight of all teachers, subject specializations, monthly salary, and performance ratings.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-md">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-200 text-[#123B2A]/60">
                        <th className="pb-3 font-bold">Faculty Member</th>
                        <th className="pb-3 font-bold">Subject / Wing</th>
                        <th className="pb-3 font-bold">Qualification</th>
                        <th className="pb-3 font-bold">Monthly Salary</th>
                        <th className="pb-3 font-bold">Principal Rating</th>
                        <th className="pb-3 font-bold">Observation Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {teachersList.map((t) => (
                        <tr key={t.id} className="hover:bg-[#F4FFF8]/60 transition-colors">
                          <td className="py-3 font-bold text-[#123B2A]">
                            <div>{t.name}</div>
                            <div className="text-[10px] text-gray-500 font-mono">{t.phone}</div>
                          </td>
                          <td className="py-3 text-teal-700 font-semibold">{t.subject}</td>
                          <td className="py-3 text-gray-600">{t.qualification}</td>
                          <td className="py-3 font-mono font-bold text-emerald-800">
                            Rs. {t.monthlySalary.toLocaleString()}
                          </td>
                          <td className="py-3">
                            <span className="px-2.5 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800 text-[11px]">
                              A+ (Distinction)
                            </span>
                          </td>
                          <td className="py-3 text-gray-500 text-[11px]">
                            {t.subject.includes('Math') ? 'Excellent board syllabus completion' : 'Strong laboratory practical work'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: OFFICIAL CIRCULARS & NOTICES */}
          {activeTab === 'circulars' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div>
                <h2 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                  Official Executive Circulars & Directives
                </h2>
                <p className="text-xs text-[#123B2A]/70 mt-1">
                  Issue binding institutional circulars to parents, students, and teaching staff under the Principal's authority.
                </p>
              </div>

              {/* Compose Notice Form */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-xl border border-white/80 shadow-lg">
                <h4 className="text-sm font-bold font-['Outfit'] text-[#123B2A] mb-3">
                  Draft New Institutional Circular
                </h4>
                <form onSubmit={handleCreateNotice} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#123B2A] mb-1">Circular Heading / Subject</label>
                      <input
                        type="text"
                        required
                        value={newNoticeTitle}
                        onChange={(e) => setNewNoticeTitle(e.target.value)}
                        placeholder="e.g. Winter Vacation Schedule & Homework Packs"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#123B2A] mb-1">Target Audience</label>
                      <select
                        value={newNoticeAudience}
                        onChange={(e) => setNewNoticeAudience(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-emerald-600"
                      >
                        <option value="All Students & Parents">All Students & Parents</option>
                        <option value="Teaching Faculty Only">Teaching Faculty Only</option>
                        <option value="Secondary Wing (Grades 9 & 10)">Secondary Wing (Grades 9 & 10)</option>
                        <option value="Administrative Staff & Accounts">Administrative Staff & Accounts</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#123B2A] mb-1">Directive Details & Instructions</label>
                    <textarea
                      required
                      rows={3}
                      value={newNoticeContent}
                      onChange={(e) => setNewNoticeContent(e.target.value)}
                      placeholder="Enter the official notification details..."
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#123B2A] hover:bg-[#0B2317] text-[#F4D068] text-xs font-bold shadow-md shadow-[#123B2A]/20 flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Stamp className="w-4 h-4" />
                    <span>Publish Official Circular</span>
                  </button>
                </form>
              </div>

              {/* Published Circulars */}
              <div className="space-y-4">
                {circulars.map((cir) => (
                  <div key={cir.id} className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-md">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-amber-700">{cir.id}</span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#DDF7E8] text-[#123B2A]">
                            {cir.audience}
                          </span>
                        </div>
                        <h4 className="text-base font-extrabold text-[#123B2A] mt-1">{cir.title}</h4>
                      </div>
                      <div className="text-xs text-gray-500 font-medium">Issued: {cir.date}</div>
                    </div>
                    <p className="text-xs text-[#123B2A]/80 py-3 leading-relaxed">
                      {cir.content}
                    </p>
                    <div className="pt-2 flex items-center justify-between text-[11px] text-gray-500 border-t border-gray-100">
                      <span>Authority: Principal Executive Directorate</span>
                      <span className="font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Signed & Dispatched</span>
                      </span>
                    </div>
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
