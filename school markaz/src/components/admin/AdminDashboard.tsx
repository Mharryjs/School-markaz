import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  CalendarCheck,
  Award,
  CreditCard,
  Banknote,
  TrendingUp,
  Package,
  BarChart3,
  Mail,
  Settings,
  LogOut,
  Bell,
  Search,
  Plus,
  Printer,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Receipt,
  Building,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Shield,
  Download,
  Filter,
  Check,
  X,
  Send,
  MessageSquare,
  PhoneCall,
  UserPlus,
  UserCheck,
  User,
  ShieldCheck
} from 'lucide-react';
import { AdminUser, AdminInquiry, StudentRecord, TeacherRecord, FeeChallan, ExamResult, IncomeExpenseRecord, StationeryItem } from '../../types';
import { logoutAdmin } from '../../services/auth';
import { fetchAdminInquiries, markInquiryAsRead } from '../../services/api';
import { NewAdmissionTab } from './NewAdmissionTab';
import { AdminProfileTab } from './AdminProfileTab';
import { LoginActivityTab } from './tabs/LoginActivityTab';
import { SchoolSettingsTab } from './SchoolSettingsTab';
import { useSchool } from '../../context/SchoolContext';

interface AdminDashboardProps {
  adminUser: AdminUser;
  onLogout: () => void;
  onNavigateHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminUser,
  onLogout,
  onNavigateHome,
}) => {
  const {
    settings,
    updateSettings,
    stats,
    isDemoDataActive,
    studentsList,
    teachersList,
    staffCount,
    attendanceSheet,
    challansList,
    examResults,
    payrollList,
    incomeExpenses,
    stationeryList,
    reportsList,
    loginActivities,
    recentActivities,
    addStudent,
    addTeacher,
    toggleAttendance,
    toggleFeeStatus,
    toggleTeacherSalary,
    addIncomeExpense,
    addStationeryItem,
    sellStationeryItem,
    resetAllSchoolData,
    loadDemoData,
  } = useSchool();

  // Current active navigation tab
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'new-admission'
    | 'students'
    | 'profile'
    | 'login-activity'
    | 'teachers'
    | 'attendance'
    | 'exams'
    | 'fees'
    | 'payroll'
    | 'income-expenses'
    | 'stationery'
    | 'reports'
    | 'messages'
    | 'settings'
  >('overview');

  // Live admin user state for profile updates
  const [currentUser, setCurrentUser] = useState<AdminUser>(adminUser);

  // Inquiries from public website form
  const [inquiriesList, setInquiriesList] = useState<AdminInquiry[]>([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(false);

  // Filters and searches
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('September 2026');

  // Attendance state for attendance module
  const [attendanceDate] = useState('2026-09-07');

  // Modals & notices
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);
  const [selectedStudentForDMC, setSelectedStudentForDMC] = useState<StudentRecord | null>(null);

  // Form states for new student
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGrade, setNewStudentGrade] = useState('Grade 8');
  const [newStudentRoll, setNewStudentRoll] = useState('8A-25');
  const [newStudentFather, setNewStudentFather] = useState('');
  const [newStudentPhone, setNewStudentPhone] = useState('+92 300 ');
  const [newStudentFee, setNewStudentFee] = useState('3500');

  // Form states for new faculty
  const [newFacultyName, setNewFacultyName] = useState('');
  const [newFacultySubject, setNewFacultySubject] = useState('Physics / Science');
  const [newFacultyClasses, setNewFacultyClasses] = useState('Grade 8, Grade 9');
  const [newFacultyQualification, setNewFacultyQualification] = useState('M.Sc Physics');
  const [newFacultySalary, setNewFacultySalary] = useState('48000');
  const [newFacultyPhone, setNewFacultyPhone] = useState('+92 300 9876543');

  // Form states for new financial voucher
  const [newVoucherType, setNewVoucherType] = useState<'Income' | 'Expense'>('Expense');
  const [newVoucherCategory, setNewVoucherCategory] = useState('Campus Maintenance');
  const [newVoucherTitle, setNewVoucherTitle] = useState('');
  const [newVoucherAmount, setNewVoucherAmount] = useState('8500');
  const [newVoucherMethod, setNewVoucherMethod] = useState('Cash');

  // Form states for new stationery stock
  const [newStockName, setNewStockName] = useState('');
  const [newStockCategory, setNewStockCategory] = useState('Stationery');
  const [newStockUnits, setNewStockUnits] = useState('50');
  const [newStockPrice, setNewStockPrice] = useState('350');

  // Load inquiries
  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    setIsLoadingInquiries(true);
    const inqs = await fetchAdminInquiries();
    setInquiriesList(inqs);
    setIsLoadingInquiries(false);
  };

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => {
      setNotificationToast(null);
    }, 3500);
  };

  const handleLogoutClick = async () => {
    await logoutAdmin();
    showToast('Admin session logged out successfully');
    onLogout();
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName) return;

    const newRecord: StudentRecord = {
      id: `SM-ST-${Date.now().toString().slice(-4)}`,
      name: newStudentName.trim(),
      rollNo: newStudentRoll.trim() || `8A-${studentsList.length + 1}`,
      grade: newStudentGrade,
      section: 'A',
      guardianName: newStudentFather.trim() || 'Guardian',
      phone: newStudentPhone.trim() || '+92 300 0000000',
      attendance: 100,
      feeStatus: 'Paid',
      monthlyFee: Number(newStudentFee) || 3500,
      avatarColor: 'bg-emerald-100 text-emerald-800',
    };

    addStudent(newRecord);
    setActiveModal(null);
    setNewStudentName('');
    setNewStudentFather('');
    showToast(`Student "${newStudentName}" registered successfully with Roll No ${newRecord.rollNo}`);
  };

  const handleStudentAdmitted = (student: StudentRecord, challan: FeeChallan) => {
    addStudent(student, challan);
  };

  const handleUpdateAdminUser = (updated: Partial<AdminUser>) => {
    setCurrentUser((prev) => ({ ...prev, ...updated }));
  };

  const handleAddFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFacultyName.trim()) return;

    const newTeacher: TeacherRecord = {
      id: `SM-T-${Date.now().toString().slice(-4)}`,
      name: newFacultyName.trim(),
      subject: newFacultySubject,
      classes: newFacultyClasses.split(',').map((c) => c.trim()),
      qualification: newFacultyQualification,
      monthlySalary: Number(newFacultySalary) || 45000,
      salaryStatus: 'Disbursed',
      phone: newFacultyPhone.trim() || '+92 300 0000000',
      attendance: 100,
    };

    addTeacher(newTeacher);
    setActiveModal(null);
    setNewFacultyName('');
    showToast(`Faculty "${newFacultyName}" added to academic roster`);
  };

  const handleAddVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVoucherTitle.trim()) return;

    const newRec: IncomeExpenseRecord = {
      id: `IE-${Date.now().toString().slice(-4)}`,
      type: newVoucherType,
      category: newVoucherCategory,
      title: newVoucherTitle.trim(),
      amount: Number(newVoucherAmount) || 5000,
      date: new Date().toISOString().split('T')[0],
      paymentMethod: newVoucherMethod,
    };

    addIncomeExpense(newRec);
    setActiveModal(null);
    setNewVoucherTitle('');
    showToast(`Financial voucher "${newVoucherTitle}" recorded successfully`);
  };

  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStockName.trim()) return;

    const newItem: StationeryItem = {
      id: `ST-${Date.now().toString().slice(-4)}`,
      name: newStockName.trim(),
      category: newStockCategory,
      inStock: Number(newStockUnits) || 50,
      unitPrice: Number(newStockPrice) || 200,
      minimumRequired: 20,
      status: Number(newStockUnits) > 20 ? 'In Stock' : 'Low Stock',
    };

    addStationeryItem(newItem);
    setActiveModal(null);
    setNewStockName('');
    showToast(`Stock item "${newStockName}" updated in store inventory`);
  };

  const handleMarkInquiryRead = async (id: string) => {
    const updated = await markInquiryAsRead(id);
    setInquiriesList(updated);
    showToast('Inquiry marked as contacted');
  };

  const handleToggleFeeStatus = (id: string) => {
    toggleFeeStatus(id);
    showToast('Challan status updated');
  };

  const handleToggleSalary = (id: string) => {
    toggleTeacherSalary(id);
    showToast('Faculty payroll record updated');
  };

  // Unread messages count
  const unreadCount = inquiriesList.filter((i) => !i.read).length;

  return (
    <div className="min-h-screen bg-[#F4FFF8] flex flex-col font-['Plus_Jakarta_Sans'] text-[#123B2A]">
      
      {/* Toast Notification */}
      {notificationToast && (
        <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl bg-white border border-[#19A66A]/30 text-[#123B2A] text-xs font-semibold shadow-xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#19A66A]" />
          <span>{notificationToast}</span>
        </div>
      )}

      {/* Top Glass Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#19A66A]/20 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#19A66A] to-[#123B2A] text-white flex items-center justify-center font-bold shadow-md shadow-[#19A66A]/20 overflow-hidden">
            {settings.logo ? (
              <img
                src={settings.logo}
                alt={settings.schoolName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <GraduationCap className="w-6 h-6" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base font-['Outfit'] text-[#123B2A] tracking-tight line-clamp-1 max-w-[200px] sm:max-w-md">
                {settings.schoolName}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#DDF7E8] text-[#123B2A] text-[10px] font-bold uppercase tracking-wider shrink-0">
                {settings.dashboardBranding || 'Admin Console'}
              </span>
            </div>
            <div className="text-[11px] text-[#123B2A]/70 flex items-center gap-1.5">
              <span>{settings.campusCode || 'CAMPUS-01-MAIN'}</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">Session {settings.academicSession}</span>
            </div>
          </div>
        </div>

        {/* Right: User Info & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveTab('new-admission')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            title="Open New Admission Portal"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ New Admission</span>
          </button>

          <button
            onClick={onNavigateHome}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4FFF8] hover:bg-[#DDF7E8] border border-[#19A66A]/20 text-xs font-semibold text-[#123B2A] transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#19A66A]" />
            <span>Public Website</span>
          </button>

          {/* Messages Alert */}
          <button
            onClick={() => setActiveTab('messages')}
            className="relative p-2 rounded-xl bg-[#F4FFF8] hover:bg-[#DDF7E8] border border-[#19A66A]/20 text-[#123B2A] transition-all cursor-pointer"
            title="Inquiries & Messages"
          >
            <Mail className="w-4 h-4 text-[#19A66A]" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Admin Profile Pill (Clickable -> Opens Profile Tab) */}
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-xl border transition-all cursor-pointer text-left ${
              activeTab === 'profile'
                ? 'bg-[#DDF7E8] border-[#19A66A]/40 ring-1 ring-[#19A66A]/30'
                : 'bg-white/60 hover:bg-[#DDF7E8]/60 border-[#19A66A]/20'
            }`}
            title="Open Admin Profile Settings"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#19A66A] to-emerald-400 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {(currentUser.displayName || 'M').charAt(0).toUpperCase()}
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-[#123B2A] leading-tight flex items-center gap-1">
                <span>{currentUser.displayName || 'Mharryjs'}</span>
                <span className="text-[10px] text-[#19A66A] font-semibold">(Profile)</span>
              </div>
              <div className="text-[10px] text-[#123B2A]/60 font-medium">
                {currentUser.email}
              </div>
            </div>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogoutClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold transition-all cursor-pointer shadow-xs"
            title="Log out of admin session"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-600" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Sticky/Scrollable Glass Sidebar */}
        <aside className="w-full md:w-64 bg-white/70 backdrop-blur-md border-r border-[#19A66A]/20 p-4 shrink-0 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-1">
            {/* Quick Action Top Button */}
            <div className="pb-3 mb-2 border-b border-[#19A66A]/15">
              <button
                type="button"
                onClick={() => setActiveTab('new-admission')}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                  activeTab === 'new-admission'
                    ? 'bg-[#19A66A] text-white shadow-md shadow-[#19A66A]/20'
                    : 'bg-gradient-to-r from-[#DDF7E8] to-[#EEFAF3] hover:from-[#c9f1dc] hover:to-[#DDF7E8] text-[#123B2A] border border-[#19A66A]/30'
                }`}
              >
                <UserPlus className="w-4 h-4 text-[#19A66A]" />
                <span>+ New Admission</span>
              </button>
            </div>

            <div className="text-[11px] font-bold uppercase tracking-wider text-[#123B2A]/50 px-3 py-1">
              Modules & Management
            </div>

            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'new-admission', label: 'New Admission', icon: UserPlus },
              { id: 'students', label: 'Students Roster', icon: GraduationCap },
              { id: 'profile', label: 'Admin Profile', icon: UserCheck },
              {
                id: 'login-activity',
                label: 'Login Activity & Audits',
                icon: ShieldCheck,
                badge: loginActivities.length > 0 ? loginActivities.length : undefined,
              },
              { id: 'teachers', label: 'Faculty & Teachers', icon: Users },
              { id: 'attendance', label: 'Roll Call Attendance', icon: CalendarCheck },
              { id: 'exams', label: 'Exams & DMC', icon: Award },
              { id: 'fees', label: 'Fees & Challans', icon: CreditCard },
              { id: 'payroll', label: 'Staff Payroll', icon: Banknote },
              { id: 'income-expenses', label: 'Income & Expenses', icon: TrendingUp },
              { id: 'stationery', label: 'Stationery Store', icon: Package },
              { id: 'reports', label: 'Institutional Reports', icon: BarChart3 },
              {
                id: 'messages',
                label: 'Demo Inquiries',
                icon: Mail,
                badge: unreadCount > 0 ? unreadCount : undefined,
              },
              { id: 'settings', label: 'School Settings', icon: Settings },
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
                      ? 'bg-[#19A66A] text-white shadow-sm shadow-[#19A66A]/20'
                      : 'text-[#123B2A]/80 hover:bg-[#DDF7E8]/70 hover:text-[#123B2A]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#19A66A]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-white text-[#19A66A]'
                          : 'bg-rose-500 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick System Badge */}
          <div className="mt-6 pt-4 border-t border-[#19A66A]/15 px-2">
            <div className="p-3 rounded-2xl bg-[#F4FFF8] border border-[#19A66A]/20 text-[11px]">
              <div className="flex items-center justify-between text-[#123B2A]/70 mb-1">
                <span>Database Sync</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active
                </span>
              </div>
              <div className="text-[10px] text-[#123B2A]/50">
                School Markaz v4.8.2 Enterprise
              </div>
            </div>
          </div>
        </aside>

        {/* Main Work Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-65px)]">
          
          {/* ============================================================= */}
          {/* NEW ADMISSION PORTAL TAB */}
          {/* ============================================================= */}
          {activeTab === 'new-admission' && (
            <NewAdmissionTab
              studentsCount={studentsList.length}
              onStudentAdmitted={handleStudentAdmitted}
              onViewAllStudents={() => setActiveTab('students')}
              showToast={showToast}
            />
          )}

          {/* ============================================================= */}
          {/* ADMIN PROFILE & CREDENTIALS TAB */}
          {/* ============================================================= */}
          {activeTab === 'profile' && (
            <AdminProfileTab
              adminUser={currentUser}
              showToast={showToast}
              onUpdateAdminUser={handleUpdateAdminUser}
            />
          )}

          {/* ============================================================= */}
          {/* LOGIN ACTIVITY & SECURITY AUDITS TAB */}
          {/* ============================================================= */}
          {activeTab === 'login-activity' && (
            <LoginActivityTab
              loginActivities={loginActivities}
              showToast={showToast}
            />
          )}

          {/* ============================================================= */}
          {/* 1. OVERVIEW TAB */}
          {/* ============================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Header Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-[#123B2A]">
                    Campus Executive Overview
                  </h1>
                  <p className="text-xs sm:text-sm text-[#123B2A]/70">
                    Welcome back, <strong>{currentUser.displayName || adminUser.displayName}</strong>. Real-time institutional health for {settings.schoolName} ({settings.campusCode || 'Campus-01'}).
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('new-admission')}
                    className="px-3.5 py-2 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Admission</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('fees')}
                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#DDF7E8] border border-[#19A66A]/25 text-[#123B2A] text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-[#19A66A]" />
                    <span>Fee Register</span>
                  </button>
                </div>
              </div>

              {/* 4 Large KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass-card rounded-2xl p-5 border border-[#19A66A]/25 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#123B2A]/70 uppercase tracking-wider">Total Students</span>
                    <div className="p-2 rounded-xl bg-[#DDF7E8] text-[#19A66A]">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold font-['Outfit'] text-[#123B2A]">
                    {stats.totalStudents.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                    <span>{studentsList.length} active enrollments</span>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-5 border border-[#19A66A]/25 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#123B2A]/70 uppercase tracking-wider">Faculty & Staff</span>
                    <div className="p-2 rounded-xl bg-[#DDF7E8] text-[#19A66A]">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold font-['Outfit'] text-[#123B2A]">
                    {stats.totalTeachers + staffCount}
                  </div>
                  <div className="text-[11px] text-[#123B2A]/70 font-semibold mt-1">
                    {stats.totalTeachers} Faculty • {staffCount} Admin Staff
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-5 border border-[#19A66A]/25 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#123B2A]/70 uppercase tracking-wider">Today's Attendance</span>
                    <div className="p-2 rounded-xl bg-[#DDF7E8] text-[#19A66A]">
                      <CalendarCheck className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold font-['Outfit'] text-[#19A66A]">
                    {stats.presentPercentage}%
                  </div>
                  <div className="text-[11px] text-[#123B2A]/70 font-semibold mt-1">
                    {stats.presentTodayCount} Present • {stats.absentTodayCount} Absent
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-5 border border-[#19A66A]/25 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#123B2A]/70 uppercase tracking-wider">Fee Collection</span>
                    <div className="p-2 rounded-xl bg-[#DDF7E8] text-[#19A66A]">
                      <CreditCard className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold font-['Outfit'] text-[#123B2A]">
                    Rs. {(stats.collectedFeesAmount >= 1000000) ? `${(stats.collectedFeesAmount / 1000000).toFixed(2)}M` : stats.collectedFeesAmount.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-amber-700 font-semibold mt-1">
                    Rs. {stats.pendingFeesAmount.toLocaleString()} Pending ({stats.pendingChallansCount} Challans)
                  </div>
                </div>
              </div>

              {/* Two Column Section: Quick Operations & Recent Inquiries */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left 2 Cols: Live Class Attendance & Recent Students */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Quick Operation Cards */}
                  <div className="glass-card rounded-3xl p-6 border border-[#19A66A]/20">
                    <h3 className="text-base font-bold font-['Outfit'] text-[#123B2A] mb-4 flex items-center justify-between">
                      <span>Live Quick Actions</span>
                      <span className="text-xs text-[#19A66A] font-medium">1-Click Fast Triggers</span>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <button
                        onClick={() => setActiveModal('new-student')}
                        className="p-3.5 rounded-2xl bg-white hover:bg-[#DDF7E8] border border-[#19A66A]/25 text-left transition-all cursor-pointer group"
                      >
                        <GraduationCap className="w-5 h-5 text-[#19A66A] mb-2 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-[#123B2A]">New Admission</div>
                        <div className="text-[10px] text-[#123B2A]/60 mt-0.5">Register Bio-data</div>
                      </button>

                      <button
                        onClick={() => setActiveTab('attendance')}
                        className="p-3.5 rounded-2xl bg-white hover:bg-[#DDF7E8] border border-[#19A66A]/25 text-left transition-all cursor-pointer group"
                      >
                        <CalendarCheck className="w-5 h-5 text-[#19A66A] mb-2 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-[#123B2A]">Roll Call</div>
                        <div className="text-[10px] text-[#123B2A]/60 mt-0.5">Class Attendance</div>
                      </button>

                      <button
                        onClick={() => setActiveTab('fees')}
                        className="p-3.5 rounded-2xl bg-white hover:bg-[#DDF7E8] border border-[#19A66A]/25 text-left transition-all cursor-pointer group"
                      >
                        <CreditCard className="w-5 h-5 text-[#19A66A] mb-2 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-[#123B2A]">Issue Challan</div>
                        <div className="text-[10px] text-[#123B2A]/60 mt-0.5">3-Copy Bank Slip</div>
                      </button>

                      <button
                        onClick={() => setActiveTab('exams')}
                        className="p-3.5 rounded-2xl bg-white hover:bg-[#DDF7E8] border border-[#19A66A]/25 text-left transition-all cursor-pointer group"
                      >
                        <Award className="w-5 h-5 text-[#19A66A] mb-2 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-[#123B2A]">DMC Generator</div>
                        <div className="text-[10px] text-[#123B2A]/60 mt-0.5">Print Report Cards</div>
                      </button>
                    </div>
                  </div>

                  {/* Student Ledger Quick Preview */}
                  <div className="glass-card rounded-3xl p-6 border border-[#19A66A]/20">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-base font-bold font-['Outfit'] text-[#123B2A]">
                          Recent Enrolled Students
                        </h3>
                        <p className="text-xs text-[#123B2A]/60">Academic session register</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('students')}
                        className="text-xs font-bold text-[#19A66A] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>View All ({studentsList.length})</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#19A66A]/20 text-[#123B2A]/60 font-semibold pb-2">
                            <th className="pb-2.5">Roll No</th>
                            <th className="pb-2.5">Student</th>
                            <th className="pb-2.5">Grade</th>
                            <th className="pb-2.5">Fee Status</th>
                            <th className="pb-2.5 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#19A66A]/10">
                          {studentsList.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="py-8 text-center text-[#123B2A]/60">
                                <GraduationCap className="w-7 h-7 text-[#19A66A]/40 mx-auto mb-1.5" />
                                <p className="font-semibold text-xs text-[#123B2A]">No students enrolled</p>
                                <p className="text-[11px] text-[#123B2A]/60 mt-0.5">
                                  Use "New Admission" or "Load Demo Data" in School Settings.
                                </p>
                              </td>
                            </tr>
                          ) : (
                            studentsList.slice(0, 5).map((st) => (
                              <tr key={st.id} className="hover:bg-[#F4FFF8]/60 transition-colors">
                                <td className="py-2.5 font-bold text-[#19A66A]">{st.rollNo}</td>
                                <td className="py-2.5 font-medium text-[#123B2A]">{st.name}</td>
                                <td className="py-2.5 text-[#123B2A]/70">{st.grade} ({st.section})</td>
                                <td className="py-2.5">
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                      st.feeStatus === 'Paid'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-amber-100 text-amber-800'
                                    }`}
                                  >
                                    {st.feeStatus}
                                  </span>
                                </td>
                                <td className="py-2.5 text-right">
                                  <button
                                    onClick={() => {
                                      setSelectedStudentForDMC(st);
                                      setActiveTab('exams');
                                    }}
                                    className="text-[11px] font-bold text-[#19A66A] hover:text-[#123B2A] cursor-pointer"
                                  >
                                    View DMC
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Right 1 Col: Institutional Health & Live Messages */}
                <div className="space-y-6">
                  {/* Website Inquiries Card */}
                  <div className="glass-card rounded-3xl p-6 border border-[#19A66A]/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#19A66A]" />
                        <h3 className="text-sm font-bold font-['Outfit'] text-[#123B2A]">
                          Website Demo Inquiries
                        </h3>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {unreadCount} New
                      </span>
                    </div>

                    <div className="space-y-3">
                      {inquiriesList.slice(0, 3).map((inq) => (
                        <div
                          key={inq.id}
                          onClick={() => setActiveTab('messages')}
                          className="p-3 rounded-2xl bg-white hover:bg-[#DDF7E8]/60 border border-[#19A66A]/20 cursor-pointer transition-all"
                        >
                          <div className="flex items-center justify-between text-xs font-bold text-[#123B2A]">
                            <span>{inq.schoolName}</span>
                            <span className="text-[10px] text-[#19A66A] font-semibold">
                              {inq.students} Students
                            </span>
                          </div>
                          <div className="text-[11px] text-[#123B2A]/70 mt-1 line-clamp-1">
                            "{inq.message}"
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-[#123B2A]/50 mt-2 pt-2 border-t border-[#19A66A]/10">
                            <span>{inq.senderName}</span>
                            <span>{inq.phone}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveTab('messages')}
                      className="w-full mt-4 py-2 rounded-xl bg-[#F4FFF8] hover:bg-[#DDF7E8] border border-[#19A66A]/20 text-xs font-bold text-[#123B2A] transition-all cursor-pointer"
                    >
                      View All Messages
                    </button>
                  </div>

                  {/* Financial Snapshot */}
                  <div className="glass-card rounded-3xl p-6 border border-[#19A66A]/20">
                    <h3 className="text-sm font-bold font-['Outfit'] text-[#123B2A] mb-3 flex items-center justify-between">
                      <span>Monthly Financial Health</span>
                      <span className={`text-xs font-bold ${stats.netBalance >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {stats.netBalance >= 0 ? `+Rs. ${stats.netBalance.toLocaleString()} Surplus` : `-Rs. ${Math.abs(stats.netBalance).toLocaleString()} Deficit`}
                      </span>
                    </h3>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between p-2 rounded-xl bg-white/70">
                        <span className="text-[#123B2A]/70">Monthly Fee Inflow</span>
                        <span className="font-bold text-[#19A66A]">Rs. {stats.collectedFeesAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between p-2 rounded-xl bg-white/70">
                        <span className="text-[#123B2A]/70">Staff Payroll Disbursed</span>
                        <span className="font-bold text-[#123B2A]">Rs. {stats.totalMonthlyPayroll.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between p-2 rounded-xl bg-white/70">
                        <span className="text-[#123B2A]/70">Campus Operations & Expenses</span>
                        <span className="font-bold text-[#123B2A]">Rs. {stats.totalExpenses.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('income-expenses')}
                      className="w-full mt-4 py-2 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      Open Financial Ledger
                    </button>
                  </div>

                  {/* Live Security & Login Activity Feed Card */}
                  <div className="glass-card rounded-3xl p-6 border border-[#19A66A]/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#19A66A]" />
                        <h3 className="text-sm font-bold font-['Outfit'] text-[#123B2A]">
                          Recent Logins & Security
                        </h3>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#DDF7E8] text-[#123B2A] border border-[#19A66A]/30">
                        Audited
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {loginActivities.slice(0, 3).map((act, idx) => (
                        <div
                          key={idx}
                          onClick={() => setActiveTab('login-activity')}
                          className="p-3 rounded-2xl bg-white hover:bg-[#DDF7E8]/50 border border-[#19A66A]/15 cursor-pointer transition-all text-xs"
                        >
                          <div className="flex items-center justify-between font-bold text-[#123B2A]">
                            <span className="truncate">{act.userName}</span>
                            <span className="text-[10px] text-[#19A66A] font-semibold bg-[#DDF7E8] px-2 py-0.5 rounded-full">
                              {act.role}
                            </span>
                          </div>
                          <div className="text-[10px] text-gray-500 mt-1 flex items-center justify-between">
                            <span>{act.timestamp}</span>
                            <span>{act.device}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveTab('login-activity')}
                      className="w-full mt-4 py-2 rounded-xl bg-[#F4FFF8] hover:bg-[#DDF7E8] border border-[#19A66A]/20 text-xs font-bold text-[#123B2A] transition-all cursor-pointer"
                    >
                      View All Security Audits ({loginActivities.length})
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 2. STUDENTS TAB */}
          {/* ============================================================= */}
          {activeTab === 'students' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                    Student Bio-Data Register
                  </h1>
                  <p className="text-xs text-[#123B2A]/70">
                    Managing {studentsList.length} enrolled students across KG to Grade 10 with complete parent contacts and fee records.
                  </p>
                </div>
                <button
                  onClick={() => setActiveModal('new-student')}
                  className="px-4 py-2.5 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register New Student</span>
                </button>
              </div>

              {/* Filters */}
              <div className="glass-card rounded-2xl p-4 border border-[#19A66A]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    placeholder="Search by student name, roll no, father..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#19A66A]/30 text-xs text-[#123B2A] focus:outline-none focus:border-[#19A66A]"
                  />
                  <Search className="w-4 h-4 text-[#19A66A] absolute left-3 top-2.5" />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs font-bold text-[#123B2A]/70">Grade:</span>
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white border border-[#19A66A]/30 text-xs font-bold text-[#123B2A] focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Grades (KG-10)</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 6">Grade 6</option>
                  </select>
                </div>
              </div>

              {/* Students Table */}
              <div className="glass-card rounded-3xl p-6 border border-[#19A66A]/20 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#19A66A]/20 text-[#123B2A]/60 font-bold pb-2 uppercase tracking-wider">
                        <th className="pb-3">Roll No</th>
                        <th className="pb-3">Student Name</th>
                        <th className="pb-3">Father / Guardian</th>
                        <th className="pb-3">Class & Sec</th>
                        <th className="pb-3">Phone</th>
                        <th className="pb-3">Attendance</th>
                        <th className="pb-3">Monthly Fee</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#19A66A]/10">
                      {(() => {
                        const filtered = studentsList.filter((st) => {
                          const matchesQuery =
                            st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            st.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            st.guardianName.toLowerCase().includes(searchQuery.toLowerCase());
                          const matchesGrade =
                            selectedGrade === 'All' || st.grade === selectedGrade;
                          return matchesQuery && matchesGrade;
                        });

                        if (filtered.length === 0) {
                          return (
                            <tr>
                              <td colSpan={9} className="py-12 text-center text-[#123B2A]/60">
                                <GraduationCap className="w-10 h-10 text-[#19A66A]/40 mx-auto mb-2" />
                                <p className="font-bold text-sm text-[#123B2A]">No students found</p>
                                <p className="text-xs text-[#123B2A]/60 mt-1">
                                  {studentsList.length === 0
                                    ? 'No students registered. Click "Register New Student" or "Load Demo Data" in School Settings.'
                                    : 'No students matched your search criteria.'}
                                </p>
                              </td>
                            </tr>
                          );
                        }

                        return filtered.map((st) => (
                          <tr key={st.id} className="hover:bg-[#F4FFF8]/60 transition-colors">
                            <td className="py-3 font-extrabold text-[#19A66A]">{st.rollNo}</td>
                            <td className="py-3 font-bold text-[#123B2A]">{st.name}</td>
                            <td className="py-3 text-[#123B2A]/80">{st.guardianName}</td>
                            <td className="py-3 text-[#123B2A]/70 font-semibold">{st.grade} - {st.section}</td>
                            <td className="py-3 text-[#123B2A]/70">{st.phone}</td>
                            <td className="py-3">
                              <span className="font-bold text-emerald-700">{st.attendance}%</span>
                            </td>
                            <td className="py-3 font-semibold text-[#123B2A]">Rs. {st.monthlyFee.toLocaleString()}</td>
                            <td className="py-3">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                  st.feeStatus === 'Paid'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {st.feeStatus}
                              </span>
                            </td>
                            <td className="py-3 text-right space-x-2">
                              <button
                                onClick={() => {
                                  setSelectedStudentForDMC(st);
                                  setActiveTab('exams');
                                }}
                                className="px-2.5 py-1 rounded-lg bg-[#DDF7E8] text-[#123B2A] text-[11px] font-bold hover:bg-[#19A66A] hover:text-white transition-all cursor-pointer"
                              >
                                DMC
                              </button>
                            </td>
                          </tr>
                        ));
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 3. TEACHERS TAB */}
          {/* ============================================================= */}
          {activeTab === 'teachers' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                    Faculty & Teacher Roster
                  </h1>
                  <p className="text-xs text-[#123B2A]/70">
                    {teachersList.length} teaching professionals with assigned subjects, timetables, and salary disbursements.
                  </p>
                </div>
                <button
                  onClick={() => setActiveModal('new-faculty')}
                  className="px-4 py-2.5 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Faculty</span>
                </button>
              </div>

              <div className="glass-card rounded-3xl p-6 border border-[#19A66A]/20 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#19A66A]/20 text-[#123B2A]/60 font-bold pb-2 uppercase tracking-wider">
                        <th className="pb-3">Faculty Member</th>
                        <th className="pb-3">Subject / Dept</th>
                        <th className="pb-3">Classes Assigned</th>
                        <th className="pb-3">Qualification</th>
                        <th className="pb-3">Monthly Pay</th>
                        <th className="pb-3">Attendance</th>
                        <th className="pb-3">Salary Status</th>
                        <th className="pb-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#19A66A]/10">
                      {teachersList.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-12 text-center text-[#123B2A]/60">
                            <Users className="w-10 h-10 text-[#19A66A]/40 mx-auto mb-2" />
                            <p className="font-bold text-sm text-[#123B2A]">No Faculty Members Found</p>
                            <p className="text-xs text-[#123B2A]/60 mt-1">
                              Click "Add New Faculty" or "Load Demo Data" in School Settings to populate roster.
                            </p>
                          </td>
                        </tr>
                      ) : (
                        teachersList.map((t) => (
                          <tr key={t.id} className="hover:bg-[#F4FFF8]/60 transition-colors">
                            <td className="py-3">
                              <div className="font-bold text-[#123B2A]">{t.name}</div>
                              <div className="text-[10px] text-[#123B2A]/60">{t.phone}</div>
                            </td>
                            <td className="py-3 font-semibold text-[#19A66A]">{t.subject}</td>
                            <td className="py-3 text-[#123B2A]/70">{t.classes.join(', ')}</td>
                            <td className="py-3 text-[#123B2A]/80">{t.qualification}</td>
                            <td className="py-3 font-bold text-[#123B2A]">Rs. {t.monthlySalary.toLocaleString()}</td>
                            <td className="py-3 font-bold text-emerald-700">{t.attendance}%</td>
                            <td className="py-3">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                  t.salaryStatus === 'Disbursed'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {t.salaryStatus}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => handleToggleSalary(t.id)}
                                className="px-2.5 py-1 rounded-lg bg-white border border-[#19A66A]/30 text-[#123B2A] text-[11px] font-bold hover:bg-[#DDF7E8] transition-all cursor-pointer"
                              >
                                Toggle Pay
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 4. ATTENDANCE TAB */}
          {/* ============================================================= */}
          {activeTab === 'attendance' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                    Smart 30-Second Roll Call
                  </h1>
                  <p className="text-xs text-[#123B2A]/70">
                    Live class attendance register with one-click Present, Absent, and Leave status recording.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => showToast('Dispatched automated SMS notifications to 1 absent student guardian')}
                    className="px-3.5 py-2 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send SMS To Absentees</span>
                  </button>
                </div>
              </div>

              {/* Status bar */}
              <div className="p-4 rounded-2xl bg-white border border-[#19A66A]/20 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#123B2A]">Selected Class:</span>
                  <span className="px-3 py-1 rounded-xl bg-[#DDF7E8] text-[#123B2A] text-xs font-bold">
                    Grade 8 - Section A
                  </span>
                  <span className="text-xs text-[#123B2A]/70">Date: <strong>{attendanceDate}</strong></span>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold">
                  <span className="text-emerald-700">Present: 6</span>
                  <span className="text-rose-600">Absent: 1</span>
                  <span className="text-amber-600">Leave: 1</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    87.5% Rate
                  </span>
                </div>
              </div>

              {/* Interactive Roll Call Table */}
              <div className="glass-card rounded-3xl p-6 border border-[#19A66A]/20">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#19A66A]/20 text-[#123B2A]/60 font-bold pb-2 uppercase tracking-wider">
                        <th className="pb-3">Roll No</th>
                        <th className="pb-3">Student Name</th>
                        <th className="pb-3">Father Name</th>
                        <th className="pb-3 text-center">Current Status</th>
                        <th className="pb-3 text-right">Mark Attendance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#19A66A]/10">
                      {studentsList.map((st) => {
                        const status = attendanceSheet[st.id] || 'P';
                        return (
                          <tr key={st.id} className="hover:bg-[#F4FFF8]/60 transition-colors">
                            <td className="py-3 font-bold text-[#19A66A]">{st.rollNo}</td>
                            <td className="py-3 font-bold text-[#123B2A]">{st.name}</td>
                            <td className="py-3 text-[#123B2A]/70">{st.guardianName}</td>
                            <td className="py-3 text-center">
                              <span
                                className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                                  status === 'P'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : status === 'A'
                                    ? 'bg-rose-100 text-rose-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {status === 'P' ? 'PRESENT' : status === 'A' ? 'ABSENT' : 'LEAVE'}
                              </span>
                            </td>
                            <td className="py-3 text-right space-x-1.5">
                              <button
                                onClick={() => toggleAttendance(st.id, 'P')}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  status === 'P'
                                    ? 'bg-[#19A66A] text-white'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-emerald-50'
                                }`}
                              >
                                P
                              </button>
                              <button
                                onClick={() => toggleAttendance(st.id, 'A')}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  status === 'A'
                                    ? 'bg-rose-600 text-white'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-rose-50'
                                }`}
                              >
                                A
                              </button>
                              <button
                                onClick={() => toggleAttendance(st.id, 'L')}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  status === 'L'
                                    ? 'bg-amber-500 text-white'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-amber-50'
                                }`}
                              >
                                L
                              </button>
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

          {/* ============================================================= */}
          {/* 5. EXAMS & DMC TAB */}
          {/* ============================================================= */}
          {activeTab === 'exams' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                    Examination & DMC Generator
                  </h1>
                  <p className="text-xs text-[#123B2A]/70">
                    Official School Markaz Detailed Marks Certificate report cards with automated positions and grades.
                  </p>
                </div>
                <button
                  onClick={() => showToast('Printing class report cards in batch...')}
                  className="px-4 py-2.5 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Batch Print DMCs</span>
                </button>
              </div>

              {/* Sample Official DMC Preview Box */}
              <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-[#19A66A]/30 bg-white/95 shadow-xl">
                {/* School Header */}
                <div className="text-center pb-6 border-b border-[#19A66A]/20">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDF7E8] text-[#123B2A] text-[10px] font-bold uppercase tracking-wider mb-2">
                    Official Detailed Marks Certificate (DMC)
                  </div>
                  {settings.logo && (
                    <img
                      src={settings.logo}
                      alt={settings.schoolName}
                      className="w-12 h-12 object-contain mx-auto mb-2 rounded-xl shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <h2 className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-[#123B2A] uppercase">
                    {settings.schoolName}
                  </h2>
                  <p className="text-xs text-[#123B2A]/70">
                    Mid-Term Examination Session {settings.academicSession} • Government Registration # {settings.registrationNo || '4482-ED'}
                  </p>
                  {settings.motto && (
                    <p className="text-[11px] italic text-[#19A66A] mt-0.5 font-medium">
                      "{settings.motto}"
                    </p>
                  )}
                </div>

                {/* Student Details Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-[#19A66A]/15 text-xs">
                  <div>
                    <span className="text-[#123B2A]/60 block">Student Name:</span>
                    <span className="font-bold text-[#123B2A] text-sm">
                      {selectedStudentForDMC ? selectedStudentForDMC.name : 'Muhammad Ahmed'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#123B2A]/60 block">Roll Number:</span>
                    <span className="font-bold text-[#19A66A] text-sm">
                      {selectedStudentForDMC ? selectedStudentForDMC.rollNo : '8A-12'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#123B2A]/60 block">Grade / Section:</span>
                    <span className="font-bold text-[#123B2A] text-sm">Grade 8 - Section A</span>
                  </div>
                  <div>
                    <span className="text-[#123B2A]/60 block">Class Position:</span>
                    <span className="font-extrabold text-emerald-700 text-sm">1st Position (93.6%)</span>
                  </div>
                </div>

                {/* Marks Table */}
                <div className="py-4 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#19A66A]/20 text-[#123B2A]/70 font-bold uppercase">
                        <th className="pb-2">Subject</th>
                        <th className="pb-2">Total Marks</th>
                        <th className="pb-2">Obtained Marks</th>
                        <th className="pb-2">Percentage</th>
                        <th className="pb-2">Grade</th>
                        <th className="pb-2 text-right">Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#19A66A]/10">
                      {[
                        { subject: 'English Language', total: 100, obtained: 92, grade: 'A+' },
                        { subject: 'Mathematics', total: 100, obtained: 98, grade: 'A+' },
                        { subject: 'General Science', total: 100, obtained: 95, grade: 'A+' },
                        { subject: 'Computer Science', total: 100, obtained: 94, grade: 'A+' },
                        { subject: 'Urdu Literature', total: 100, obtained: 89, grade: 'A' },
                      ].map((sub, idx) => (
                        <tr key={idx}>
                          <td className="py-2.5 font-bold text-[#123B2A]">{sub.subject}</td>
                          <td className="py-2.5 text-[#123B2A]/70">{sub.total}</td>
                          <td className="py-2.5 font-bold text-[#19A66A]">{sub.obtained}</td>
                          <td className="py-2.5 font-semibold text-[#123B2A]">{sub.obtained}%</td>
                          <td className="py-2.5 font-bold text-emerald-700">{sub.grade}</td>
                          <td className="py-2.5 text-right font-medium text-emerald-800">Excellent</td>
                        </tr>
                      ))}
                      <tr className="font-bold border-t-2 border-[#19A66A]/30 bg-[#F4FFF8]">
                        <td className="py-3 font-extrabold text-[#123B2A]">GRAND TOTAL</td>
                        <td className="py-3">500</td>
                        <td className="py-3 text-[#19A66A] text-sm font-extrabold">468</td>
                        <td className="py-3 text-[#123B2A]">93.6%</td>
                        <td className="py-3 text-emerald-700 font-extrabold">A+ (Distinction)</td>
                        <td className="py-3 text-right text-emerald-700">Promoted</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Signatures */}
                <div className="grid grid-cols-3 gap-6 pt-10 text-center text-xs font-semibold text-[#123B2A]/80">
                  <div className="border-t border-gray-400 pt-2">Class Teacher</div>
                  <div className="border-t border-gray-400 pt-2">Controller of Exams</div>
                  <div className="border-t border-gray-400 pt-2">Principal Signature</div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 6. FEES & CHALLANS TAB */}
          {/* ============================================================= */}
          {activeTab === 'fees' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                    Fee & 3-Copy Bank Challan Register
                  </h1>
                  <p className="text-xs text-[#123B2A]/70">
                    Automated bank vouchers (School Copy, Bank Copy, Student Copy) with due dates and arrears calculation.
                  </p>
                </div>
                <button
                  onClick={() => {
                    showToast('Sending 3-copy fee challans for Grade 8 to printer...');
                    window.print();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Monthly Challans</span>
                </button>
              </div>

              {/* Challan Summary cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass-card rounded-2xl p-4 border border-[#19A66A]/20">
                  <div className="text-xs font-semibold text-[#123B2A]/70">Total Fee Billed</div>
                  <div className="text-2xl font-bold font-['Outfit'] text-[#123B2A] mt-1">
                    Rs. {(stats.collectedFeesAmount + stats.pendingFeesAmount).toLocaleString()}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">Active Academic Billing</div>
                </div>
                <div className="glass-card rounded-2xl p-4 border border-[#19A66A]/20">
                  <div className="text-xs font-semibold text-[#123B2A]/70">Recovered (Bank & Cash)</div>
                  <div className="text-2xl font-bold font-['Outfit'] text-[#19A66A] mt-1">
                    Rs. {stats.collectedFeesAmount.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-[#19A66A] font-semibold mt-0.5">
                    {stats.collectedFeesAmount + stats.pendingFeesAmount > 0
                      ? `${Math.round((stats.collectedFeesAmount / (stats.collectedFeesAmount + stats.pendingFeesAmount)) * 100)}% Recovery Rate`
                      : '0% Recovery Rate'}
                  </div>
                </div>
                <div className="glass-card rounded-2xl p-4 border border-[#19A66A]/20">
                  <div className="text-xs font-semibold text-[#123B2A]/70">Outstanding Arrears</div>
                  <div className="text-2xl font-bold font-['Outfit'] text-amber-600 mt-1">
                    Rs. {stats.pendingFeesAmount.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-amber-700 font-semibold mt-0.5">
                    {stats.pendingChallansCount} Students Pending
                  </div>
                </div>
              </div>

              {/* Challans List */}
              <div className="glass-card rounded-3xl p-6 border border-[#19A66A]/20">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#19A66A]/20 text-[#123B2A]/60 font-bold pb-2 uppercase tracking-wider">
                        <th className="pb-3">Challan #</th>
                        <th className="pb-3">Student Name</th>
                        <th className="pb-3">Grade</th>
                        <th className="pb-3">Billing Month</th>
                        <th className="pb-3">Due Date</th>
                        <th className="pb-3">Amount</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#19A66A]/10">
                      {challansList.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-12 text-center text-[#123B2A]/60">
                            <CreditCard className="w-10 h-10 text-[#19A66A]/40 mx-auto mb-2" />
                            <p className="font-bold text-sm text-[#123B2A]">No Fee Challans Issued</p>
                            <p className="text-xs text-[#123B2A]/60 mt-1">
                              Challans are generated automatically or when demo data is active in School Settings.
                            </p>
                          </td>
                        </tr>
                      ) : (
                        challansList.map((ch) => (
                          <tr key={ch.id} className="hover:bg-[#F4FFF8]/60 transition-colors">
                            <td className="py-3 font-bold text-[#19A66A]">{ch.challanNo}</td>
                            <td className="py-3 font-bold text-[#123B2A]">{ch.studentName}</td>
                            <td className="py-3 text-[#123B2A]/70 font-medium">{ch.grade}</td>
                            <td className="py-3 text-[#123B2A]/70">{ch.month}</td>
                            <td className="py-3 text-[#123B2A]/70">{ch.dueDate}</td>
                            <td className="py-3 font-extrabold text-[#123B2A]">Rs. {ch.amount.toLocaleString()}</td>
                            <td className="py-3">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                  ch.status === 'Paid'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {ch.status}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => handleToggleFeeStatus(ch.id)}
                                className="px-2.5 py-1 rounded-lg bg-white border border-[#19A66A]/30 text-[#123B2A] text-[11px] font-bold hover:bg-[#DDF7E8] transition-all cursor-pointer"
                              >
                                {ch.status === 'Paid' ? 'Mark Pending' : 'Record Payment'}
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 7. STAFF PAYROLL TAB */}
          {/* ============================================================= */}
          {activeTab === 'payroll' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                    Staff Payroll & Salary Management
                  </h1>
                  <p className="text-xs text-[#123B2A]/70">
                    Monthly faculty salary disbursement, deductions, bonus adjustments, and 1-click pay slips.
                  </p>
                </div>
                <button
                  onClick={() => showToast('Batch salary disbursement vouchers generated for HBL Corporate Banking')}
                  className="px-4 py-2.5 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Banknote className="w-4 h-4" />
                  <span>Disburse All Salaries</span>
                </button>
              </div>

              <div className="glass-card rounded-3xl p-6 border border-[#19A66A]/20">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#19A66A]/20 text-[#123B2A]/60 font-bold pb-2 uppercase tracking-wider">
                        <th className="pb-3">Faculty / Staff</th>
                        <th className="pb-3">Designation</th>
                        <th className="pb-3">Basic Pay</th>
                        <th className="pb-3">Allowances</th>
                        <th className="pb-3">Deductions</th>
                        <th className="pb-3">Net Payable</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right">Pay Slip</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#19A66A]/10">
                      {teachersList.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-12 text-center text-[#123B2A]/60">
                            <Banknote className="w-10 h-10 text-[#19A66A]/40 mx-auto mb-2" />
                            <p className="font-bold text-sm text-[#123B2A]">No Staff Payroll Records Found</p>
                            <p className="text-xs text-[#123B2A]/60 mt-1">
                              Staff members registered in Faculty Roster or demo data will appear here.
                            </p>
                          </td>
                        </tr>
                      ) : (
                        teachersList.map((t) => (
                          <tr key={t.id} className="hover:bg-[#F4FFF8]/60 transition-colors">
                            <td className="py-3 font-bold text-[#123B2A]">{t.name}</td>
                            <td className="py-3 text-[#123B2A]/70">{t.subject} Specialist</td>
                            <td className="py-3">Rs. {(t.monthlySalary - 4000).toLocaleString()}</td>
                            <td className="py-3 text-emerald-700 font-semibold">+Rs. 4,000</td>
                            <td className="py-3 text-rose-600 font-semibold">Rs. 0</td>
                            <td className="py-3 font-extrabold text-[#19A66A]">Rs. {t.monthlySalary.toLocaleString()}</td>
                            <td className="py-3">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                  t.salaryStatus === 'Disbursed'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {t.salaryStatus}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => showToast(`Printed official pay slip for ${t.name}`)}
                                className="px-2.5 py-1 rounded-lg bg-white border border-[#19A66A]/30 text-[#123B2A] text-[11px] font-bold hover:bg-[#DDF7E8] transition-all cursor-pointer"
                              >
                                Print Slip
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 8. INCOME & EXPENSES TAB */}
          {/* ============================================================= */}
          {activeTab === 'income-expenses' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                    Income & Expense Financial Ledger
                  </h1>
                  <p className="text-xs text-[#123B2A]/70">
                    Audit-compliant accounts tracking daily receipts, vendor vouchers, utilities, and stationery sales.
                  </p>
                </div>
                <button
                  onClick={() => setActiveModal('new-voucher')}
                  className="px-4 py-2.5 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Voucher</span>
                </button>
              </div>

              {/* Transactions Ledger */}
              <div className="glass-card rounded-3xl p-6 border border-[#19A66A]/20">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#19A66A]/20 text-[#123B2A]/60 font-bold pb-2 uppercase tracking-wider">
                        <th className="pb-3">Type</th>
                        <th className="pb-3">Category</th>
                        <th className="pb-3">Description</th>
                        <th className="pb-3">Date</th>
                        <th className="pb-3">Payment Method</th>
                        <th className="pb-3 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#19A66A]/10">
                      {incomeExpenses.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-[#123B2A]/60">
                            <Receipt className="w-10 h-10 text-[#19A66A]/40 mx-auto mb-2" />
                            <p className="font-bold text-sm text-[#123B2A]">No Ledger Transactions Found</p>
                            <p className="text-xs text-[#123B2A]/60 mt-1">
                              Add a voucher or load demo data in School Settings to populate financial ledger.
                            </p>
                          </td>
                        </tr>
                      ) : (
                        incomeExpenses.map((rec) => (
                          <tr key={rec.id} className="hover:bg-[#F4FFF8]/60 transition-colors">
                            <td className="py-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  rec.type === 'Income'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {rec.type}
                              </span>
                            </td>
                            <td className="py-3 font-semibold text-[#123B2A]">{rec.category}</td>
                            <td className="py-3 text-[#123B2A]/80">{rec.title}</td>
                            <td className="py-3 text-[#123B2A]/60">{rec.date}</td>
                            <td className="py-3 text-[#123B2A]/70">{rec.paymentMethod}</td>
                            <td className={`py-3 text-right font-extrabold ${rec.type === 'Income' ? 'text-emerald-700' : 'text-rose-700'}`}>
                              {rec.type === 'Income' ? '+' : '-'}Rs. {rec.amount.toLocaleString()}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 9. STATIONERY STORE TAB */}
          {/* ============================================================= */}
          {activeTab === 'stationery' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                    Stationery & Uniform Inventory
                  </h1>
                  <p className="text-xs text-[#123B2A]/70">
                    Track stock for school uniforms, notebooks, syllabus sets, diaries, and badges with automatic reorder triggers.
                  </p>
                </div>
                <button
                  onClick={() => setActiveModal('new-stock')}
                  className="px-4 py-2.5 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Receive New Stock</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {stationeryList.map((item) => (
                  <div key={item.id} className="glass-card rounded-2xl p-5 border border-[#19A66A]/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#19A66A] uppercase">{item.category}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === 'In Stock'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#123B2A] font-['Outfit']">{item.name}</h3>
                    <div className="mt-3 flex items-center justify-between text-xs text-[#123B2A]/80">
                      <span>Available Stock:</span>
                      <strong className="text-sm text-[#123B2A]">{item.inStock} units</strong>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#123B2A]/80 mt-1">
                      <span>Unit Retail Price:</span>
                      <strong className="text-[#19A66A]">Rs. {item.unitPrice}</strong>
                    </div>
                    <button
                      onClick={() => {
                        sellStationeryItem(item.id, 1);
                        showToast(`POS Sold: 1 unit of ${item.name} recorded (Rs. ${item.unitPrice})`);
                      }}
                      className="w-full mt-4 py-2 rounded-xl bg-[#F4FFF8] hover:bg-[#DDF7E8] border border-[#19A66A]/25 text-xs font-bold text-[#123B2A] transition-all cursor-pointer"
                    >
                      Quick POS Sale
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 10. REPORTS & ANALYTICS TAB */}
          {/* ============================================================= */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                    Institutional Reports & Audits
                  </h1>
                  <p className="text-xs text-[#123B2A]/70">
                    Export high-resolution PDF and Excel summaries for school board meetings and financial audits.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Monthly Fee Recovery Audit',
                    desc: 'Complete reconciliation of paid vs pending student dues by grade and section.',
                    file: 'Fee_Audit_Sept2026.pdf',
                  },
                  {
                    title: 'Faculty Attendance & Salary Register',
                    desc: 'Monthly teacher attendance metrics paired with disbursed payroll slips.',
                    file: 'Payroll_Sept2026.xlsx',
                  },
                  {
                    title: 'Annual Income vs Expense Balance Sheet',
                    desc: 'Tax-ready financial statement verified against bank statement reconciliations.',
                    file: 'Annual_Financials_2026.pdf',
                  },
                  {
                    title: 'Mid-Term Academic DMC Summary',
                    desc: 'Class-wise student ranking, passing percentages, and subject grade distributions.',
                    file: 'Exam_Summary_DMC.pdf',
                  },
                ].map((rep, idx) => (
                  <div key={idx} className="glass-card rounded-2xl p-5 border border-[#19A66A]/20 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#19A66A] mb-1">
                        <FileText className="w-4 h-4" />
                        <span>Ready For Download</span>
                      </div>
                      <h3 className="text-base font-bold font-['Outfit'] text-[#123B2A]">{rep.title}</h3>
                      <p className="text-xs text-[#123B2A]/70 mt-1 leading-relaxed">{rep.desc}</p>
                    </div>
                    <button
                      onClick={() => showToast(`Generating and downloading: ${rep.file}`)}
                      className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-[#DDF7E8] border border-[#19A66A]/30 text-xs font-bold text-[#123B2A] transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#19A66A]" />
                      <span>Download {rep.file}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* 11. MESSAGES & INQUIRIES TAB */}
          {/* ============================================================= */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                    Website Demo Requests & Inquiries
                  </h1>
                  <p className="text-xs text-[#123B2A]/70">
                    Live leads and consultation requests submitted by school owners from the website demo form.
                  </p>
                </div>
                <button
                  onClick={loadInquiries}
                  className="px-3 py-2 rounded-xl bg-white hover:bg-[#DDF7E8] border border-[#19A66A]/30 text-xs font-bold text-[#123B2A] flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-[#19A66A] ${isLoadingInquiries ? 'animate-spin' : ''}`} />
                  <span>Refresh Feed</span>
                </button>
              </div>

              {inquiriesList.length === 0 ? (
                <div className="glass-card rounded-3xl p-12 text-center text-xs text-[#123B2A]/60">
                  No demo inquiries yet. Submit a test form on the public website to see it arrive here instantly.
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiriesList.map((inq) => (
                    <div
                      key={inq.id}
                      className={`glass-card rounded-3xl p-6 border transition-all ${
                        !inq.read
                          ? 'border-[#19A66A] bg-white shadow-md'
                          : 'border-[#19A66A]/20 bg-white/70'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <Building className="w-5 h-5 text-[#19A66A]" />
                          <h3 className="text-base font-bold font-['Outfit'] text-[#123B2A]">
                            {inq.schoolName}
                          </h3>
                          {!inq.read && (
                            <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                              NEW LEAD
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#123B2A]/60">
                          {new Date(inq.createdAt).toLocaleDateString()} at{' '}
                          {new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-[#19A66A]/10 text-xs mb-3">
                        <div>
                          <span className="text-[#123B2A]/60 block text-[10px]">Contact Person:</span>
                          <strong className="text-[#123B2A]">{inq.senderName}</strong>
                        </div>
                        <div>
                          <span className="text-[#123B2A]/60 block text-[10px]">Phone Number:</span>
                          <strong className="text-[#19A66A]">{inq.phone}</strong>
                        </div>
                        <div>
                          <span className="text-[#123B2A]/60 block text-[10px]">Campus Strength:</span>
                          <strong className="text-[#123B2A]">{inq.students} Students • {inq.teachers} Staff</strong>
                        </div>
                        <div>
                          <span className="text-[#123B2A]/60 block text-[10px]">Requested Plan:</span>
                          <strong className="text-emerald-700">{inq.packageName || 'General Demo'}</strong>
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-[#F4FFF8] border border-[#19A66A]/20 text-xs text-[#123B2A]/85 italic mb-4">
                        "{inq.message}"
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-xs"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp Lead</span>
                          </a>
                          <a
                            href={`tel:${inq.phone}`}
                            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#DDF7E8] border border-[#19A66A]/30 text-[#123B2A] text-xs font-bold inline-flex items-center gap-1.5 transition-all"
                          >
                            <PhoneCall className="w-3.5 h-3.5 text-[#19A66A]" />
                            <span>Call Direct</span>
                          </a>
                        </div>

                        {!inq.read && (
                          <button
                            onClick={() => handleMarkInquiryRead(inq.id)}
                            className="px-3 py-1.5 rounded-xl bg-[#DDF7E8] text-[#123B2A] text-xs font-bold hover:bg-[#19A66A] hover:text-white transition-all cursor-pointer"
                          >
                            Mark As Contacted
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============================================================= */}
          {/* 12. SETTINGS TAB */}
          {/* ============================================================= */}
          {activeTab === 'settings' && (
            <SchoolSettingsTab showToast={showToast} />
          )}

        </main>
      </div>

      {/* New Student Modal */}
      {activeModal === 'new-student' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#123B2A]/40 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#19A66A]/25">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <h3 className="text-xl font-bold font-['Outfit'] text-[#123B2A]">
                New Student Admission
              </h3>
              <p className="text-xs text-[#123B2A]/70">
                Register student bio-data into School Markaz official directory.
              </p>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#123B2A] mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zeeshan Haider"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#19A66A]/30 focus:outline-none focus:border-[#19A66A]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#123B2A] mb-1">Roll Number *</label>
                  <input
                    type="text"
                    required
                    value={newStudentRoll}
                    onChange={(e) => setNewStudentRoll(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#19A66A]/30 focus:outline-none focus:border-[#19A66A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#123B2A] mb-1">Grade / Class</label>
                  <select
                    value={newStudentGrade}
                    onChange={(e) => setNewStudentGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#19A66A]/30 focus:outline-none"
                  >
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 6">Grade 6</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#123B2A] mb-1">Monthly Tuition Fee (Rs.)</label>
                  <input
                    type="number"
                    value={newStudentFee}
                    onChange={(e) => setNewStudentFee(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#19A66A]/30 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#123B2A] mb-1">Father / Guardian Name</label>
                <input
                  type="text"
                  placeholder="e.g. Haider Ali"
                  value={newStudentFather}
                  onChange={(e) => setNewStudentFather(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#19A66A]/30 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#123B2A] mb-1">Parent Mobile Contact (SMS)</label>
                <input
                  type="text"
                  value={newStudentPhone}
                  onChange={(e) => setNewStudentPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#19A66A]/30 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white font-bold shadow-md shadow-[#19A66A]/20"
                >
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Faculty Modal */}
      {activeModal === 'new-faculty' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#123B2A]/40 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#19A66A]/25">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <h3 className="text-xl font-bold font-['Outfit'] text-[#123B2A]">
                Add Faculty Member
              </h3>
              <p className="text-xs text-[#123B2A]/70">
                Enroll teaching staff to academic departments with salary schedule.
              </p>
            </div>

            <form onSubmit={handleAddFaculty} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#123B2A] mb-1">Teacher Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sir Naveed Qureshi"
                    value={newFacultyName}
                    onChange={(e) => setNewFacultyName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#19A66A]/30 focus:outline-none focus:border-[#19A66A]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#123B2A] mb-1">Subject Specialization *</label>
                  <input
                    type="text"
                    required
                    value={newFacultySubject}
                    onChange={(e) => setNewFacultySubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#19A66A]/30 focus:outline-none focus:border-[#19A66A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#123B2A] mb-1">Assigned Classes</label>
                  <input
                    type="text"
                    value={newFacultyClasses}
                    onChange={(e) => setNewFacultyClasses(e.target.value)}
                    placeholder="e.g. Grade 8, Grade 9"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#19A66A]/30 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#123B2A] mb-1">Highest Degree</label>
                  <input
                    type="text"
                    value={newFacultyQualification}
                    onChange={(e) => setNewFacultyQualification(e.target.value)}
                    placeholder="e.g. M.Sc / M.Phil"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#19A66A]/30 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#123B2A] mb-1">Monthly Gross Pay (Rs.)</label>
                  <input
                    type="number"
                    value={newFacultySalary}
                    onChange={(e) => setNewFacultySalary(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#19A66A]/30 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#123B2A] mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={newFacultyPhone}
                    onChange={(e) => setNewFacultyPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#19A66A]/30 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white font-bold shadow-md shadow-[#19A66A]/20"
                >
                  Save Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Financial Voucher Modal */}
      {activeModal === 'new-voucher' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#123B2A]/40 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#19A66A]/25">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <h3 className="text-xl font-bold font-['Outfit'] text-[#123B2A]">
                Record Financial Voucher
              </h3>
              <p className="text-xs text-[#123B2A]/70">
                Log campus income receipt or expense disbursement into audited ledger.
              </p>
            </div>

            <form onSubmit={handleAddVoucher} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#123B2A] mb-1">Voucher Type</label>
                  <select
                    value={newVoucherType}
                    onChange={(e) => setNewVoucherType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#19A66A]/30 focus:outline-none"
                  >
                    <option value="Expense">Expense (-)</option>
                    <option value="Income">Income (+)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#123B2A] mb-1">Category</label>
                  <input
                    type="text"
                    value={newVoucherCategory}
                    onChange={(e) => setNewVoucherCategory(e.target.value)}
                    placeholder="e.g. Utilities, Maintenance"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#19A66A]/30 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#123B2A] mb-1">Description / Narration *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Science Lab Chemical Replenishment Bill"
                  value={newVoucherTitle}
                  onChange={(e) => setNewVoucherTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#19A66A]/30 focus:outline-none focus:border-[#19A66A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#123B2A] mb-1">Amount (Rs.) *</label>
                  <input
                    type="number"
                    required
                    value={newVoucherAmount}
                    onChange={(e) => setNewVoucherAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#19A66A]/30 focus:outline-none focus:border-[#19A66A]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#123B2A] mb-1">Payment Method</label>
                  <select
                    value={newVoucherMethod}
                    onChange={(e) => setNewVoucherMethod(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#19A66A]/30 focus:outline-none"
                  >
                    <option value="Cash">Cash in Hand</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cross Cheque">Cross Cheque</option>
                    <option value="Online / Easypaisa">Online / Easypaisa</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white font-bold shadow-md shadow-[#19A66A]/20"
                >
                  Post Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Stationery Stock Modal */}
      {activeModal === 'new-stock' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#123B2A]/40 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#19A66A]/25">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <h3 className="text-xl font-bold font-['Outfit'] text-[#123B2A]">
                Receive Store Inventory
              </h3>
              <p className="text-xs text-[#123B2A]/70">
                Add uniform sets, copies, or exam sheets to school store stock.
              </p>
            </div>

            <form onSubmit={handleAddStock} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#123B2A] mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. School Markaz Student Diary 2026-27"
                  value={newStockName}
                  onChange={(e) => setNewStockName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#19A66A]/30 focus:outline-none focus:border-[#19A66A]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-[#123B2A] mb-1">Category</label>
                  <select
                    value={newStockCategory}
                    onChange={(e) => setNewStockCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#19A66A]/30 focus:outline-none"
                  >
                    <option value="Stationery">Stationery</option>
                    <option value="Uniform">Uniform</option>
                    <option value="Books">Books</option>
                    <option value="Badge">Badges</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#123B2A] mb-1">Received Units</label>
                  <input
                    type="number"
                    required
                    value={newStockUnits}
                    onChange={(e) => setNewStockUnits(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#19A66A]/30 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#123B2A] mb-1">Price (Rs.)</label>
                  <input
                    type="number"
                    required
                    value={newStockPrice}
                    onChange={(e) => setNewStockPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#19A66A]/30 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white font-bold shadow-md shadow-[#19A66A]/20"
                >
                  Add to Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
