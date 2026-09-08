import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SchoolSettings,
  StudentRecord,
  TeacherRecord,
  FeeChallan,
  ExamResult,
  IncomeExpenseRecord,
  StationeryItem,
  PayrollRecord,
  ReportItem,
  LoginActivityRecord,
  SchoolRecentActivity,
} from '../types';
import {
  MOCK_STUDENTS,
  MOCK_TEACHERS,
  FEE_CHALLANS,
  EXAM_RESULTS,
  INCOME_EXPENSES,
  STATIONERY_ITEMS,
} from '../data/schoolData';
import { recordServerLoginActivity, fetchServerLoginActivities } from '../services/auth';

export const DEFAULT_SCHOOL_SETTINGS: SchoolSettings = {
  schoolName: 'Al-Hadi Science & Arts Model Academy',
  logo: '',
  logoType: 'emoji',
  address: 'Plot 42, Education Boulevard, Sector H-8/4, Islamabad, Pakistan',
  phone: '+92 51 9283741',
  email: 'admissions@alhadiacademy.edu.pk',
  website: 'https://alhadiacademy.edu.pk',
  principalName: 'Prof. Tariq Jamil Hashmi',
  academicSession: '2026 - 2027',
  motto: 'Knowledge, Discipline, Faith & Excellence',
  primaryColor: '#19A66A',
  secondaryColor: '#123B2A',
  appearanceMode: 'glass',
  sidebarAppearance: 'glass',
  dashboardBranding: 'Enterprise Campus Edition',
  campusCode: 'CAMPUS-01-MAIN',
  registrationNo: '4482-ED / ICT',
};

const DEFAULT_REPORTS: ReportItem[] = [
  {
    id: 'REP-01',
    title: 'Monthly Fee Recovery Audit',
    desc: 'Complete reconciliation of paid vs pending student dues by grade and section.',
    file: 'Fee_Audit_Sept2026.pdf',
    category: 'Finance',
    dateGenerated: '2026-09-01',
    size: '2.4 MB',
  },
  {
    id: 'REP-02',
    title: 'Faculty Attendance & Salary Register',
    desc: 'Monthly teacher attendance metrics paired with disbursed payroll slips.',
    file: 'Payroll_Sept2026.xlsx',
    category: 'Payroll',
    dateGenerated: '2026-09-01',
    size: '1.8 MB',
  },
  {
    id: 'REP-03',
    title: 'Annual Income vs Expense Balance Sheet',
    desc: 'Tax-ready financial statement verified against bank statement reconciliations.',
    file: 'Annual_Financials_2026.pdf',
    category: 'Accounts',
    dateGenerated: '2026-08-30',
    size: '3.1 MB',
  },
  {
    id: 'REP-04',
    title: 'Mid-Term Academic DMC Summary',
    desc: 'Class-wise student ranking, passing percentages, and subject grade distributions.',
    file: 'Exam_Summary_DMC.pdf',
    category: 'Academic',
    dateGenerated: '2026-08-25',
    size: '4.2 MB',
  },
];

const DEFAULT_LOGIN_ACTIVITY: LoginActivityRecord[] = [
  {
    id: 'LOG-01',
    userName: 'mharryjs123@gmail.com',
    role: 'Super Administrator',
    timestamp: '2026-09-07 14:15 PKT',
    ipAddress: '182.185.142.90 (Islamabad, PK)',
    device: 'Chrome 128 / macOS',
    status: 'Success',
  },
  {
    id: 'LOG-02',
    userName: 'tariq.jamil@alhadi.edu.pk',
    role: 'Senior Faculty',
    timestamp: '2026-09-07 11:30 PKT',
    ipAddress: '39.40.12.18 (Rawalpindi, PK)',
    device: 'Mobile Safari / iOS 18',
    status: 'Success',
  },
  {
    id: 'LOG-03',
    userName: 'accounts@alhadi.edu.pk',
    role: 'Bursar & Accounts Officer',
    timestamp: '2026-09-07 09:05 PKT',
    ipAddress: '182.185.142.90 (Islamabad, PK)',
    device: 'Edge 127 / Windows 11',
    status: 'Success',
  },
  {
    id: 'LOG-04',
    userName: 'unknown_admin@test.com',
    role: 'Guest / Anonymous',
    timestamp: '2026-09-06 23:42 PKT',
    ipAddress: '103.255.4.12',
    device: 'Firefox / Linux',
    status: 'Failed',
  },
];

const DEFAULT_RECENT_ACTIVITIES: SchoolRecentActivity[] = [
  {
    id: 'ACT-01',
    time: '12 mins ago',
    action: 'Fee Challan #2026-0914 settled via HBL Corporate Portal',
    category: 'Fees',
    badgeColor: 'bg-emerald-100 text-emerald-800',
  },
  {
    id: 'ACT-02',
    time: '45 mins ago',
    action: 'Grade 8-A Mid-Term Chemistry exam marks finalized',
    category: 'Exams',
    badgeColor: 'bg-teal-100 text-teal-800',
  },
  {
    id: 'ACT-03',
    time: '2 hours ago',
    action: 'New Admission: Syed Daniyal enrolled into Grade 9-C',
    category: 'Admissions',
    badgeColor: 'bg-green-100 text-green-800',
  },
  {
    id: 'ACT-04',
    time: '4 hours ago',
    action: 'Faculty monthly payroll disbursed for 85 staff members',
    category: 'Payroll',
    badgeColor: 'bg-blue-100 text-blue-800',
  },
];

const DEFAULT_ATTENDANCE_SHEET: { [id: string]: 'P' | 'A' | 'L' } = {
  'SM-ST-101': 'P',
  'SM-ST-102': 'P',
  'SM-ST-103': 'P',
  'SM-ST-104': 'A',
  'SM-ST-105': 'P',
  'SM-ST-106': 'L',
  'SM-ST-107': 'P',
  'SM-ST-108': 'P',
};

export interface SchoolContextType {
  settings: SchoolSettings;
  updateSettings: (newSettings: Partial<SchoolSettings>) => void;
  uploadLogo: (dataUrl: string) => void;
  removeLogo: () => void;

  // Operational state
  isDemoDataActive: boolean;
  studentsList: StudentRecord[];
  teachersList: TeacherRecord[];
  staffCount: number;
  attendanceSheet: { [id: string]: 'P' | 'A' | 'L' };
  challansList: FeeChallan[];
  examResults: ExamResult[];
  payrollList: PayrollRecord[];
  incomeExpenses: IncomeExpenseRecord[];
  stationeryList: StationeryItem[];
  reportsList: ReportItem[];
  loginActivities: LoginActivityRecord[];
  recentActivities: SchoolRecentActivity[];

  // Mutations
  addStudent: (st: StudentRecord, challan?: FeeChallan) => void;
  addTeacher: (tc: TeacherRecord) => void;
  toggleAttendance: (studentId: string, status: 'P' | 'A' | 'L') => void;
  toggleFeeStatus: (challanId: string) => void;
  toggleTeacherSalary: (teacherId: string) => void;
  addIncomeExpense: (rec: IncomeExpenseRecord) => void;
  addStationeryItem: (item: StationeryItem) => void;
  sellStationeryItem: (itemId: string, quantity?: number) => void;
  recordLoginActivity: (act: Omit<LoginActivityRecord, 'id'>) => void;

  // Reset Actions
  resetStudents: () => void;
  resetTeachers: () => void;
  resetStaff: () => void;
  resetAttendance: () => void;
  resetFees: () => void;
  resetExams: () => void;
  resetPayroll: () => void;
  resetIncome: () => void;
  resetExpenses: () => void;
  resetStationery: () => void;
  resetReports: () => void;
  resetLoginActivity: () => void;
  resetAllSchoolData: () => void;
  loadDemoData: () => void;

  // Live Computed Stats
  stats: {
    totalStudents: number;
    totalTeachers: number;
    totalStaff: number;
    presentTodayCount: number;
    absentTodayCount: number;
    presentPercentage: number;
    pendingFeesAmount: number;
    collectedFeesAmount: number;
    pendingChallansCount: number;
    activeExamsCount: number;
    totalMonthlyPayroll: number;
    totalIncome: number;
    totalExpenses: number;
    netBalance: number;
    totalStationeryItems: number;
  };
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

const SETTINGS_STORAGE_KEY = 'school_markaz_school_settings';
const OPERATIONAL_DATA_KEY = 'school_markaz_operational_data';

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Central School Configuration
  const [settings, setSettings] = useState<SchoolSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SCHOOL_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Error reading saved school settings:', e);
    }
    return DEFAULT_SCHOOL_SETTINGS;
  });

  // 2. Operational Data State
  const [studentsList, setStudentsList] = useState<StudentRecord[]>(() => {
    try {
      const saved = localStorage.getItem(OPERATIONAL_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.studentsList !== undefined) return parsed.studentsList;
      }
    } catch {}
    return MOCK_STUDENTS;
  });

  const [teachersList, setTeachersList] = useState<TeacherRecord[]>(() => {
    try {
      const saved = localStorage.getItem(OPERATIONAL_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.teachersList !== undefined) return parsed.teachersList;
      }
    } catch {}
    return MOCK_TEACHERS;
  });

  const [staffCount, setStaffCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(OPERATIONAL_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.staffCount !== undefined) return parsed.staffCount;
      }
    } catch {}
    return 24;
  });

  const [attendanceSheet, setAttendanceSheet] = useState<{ [id: string]: 'P' | 'A' | 'L' }>(() => {
    try {
      const saved = localStorage.getItem(OPERATIONAL_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.attendanceSheet !== undefined) return parsed.attendanceSheet;
      }
    } catch {}
    return DEFAULT_ATTENDANCE_SHEET;
  });

  const [challansList, setChallansList] = useState<FeeChallan[]>(() => {
    try {
      const saved = localStorage.getItem(OPERATIONAL_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.challansList !== undefined) return parsed.challansList;
      }
    } catch {}
    return FEE_CHALLANS;
  });

  const [examResults, setExamResults] = useState<ExamResult[]>(() => {
    try {
      const saved = localStorage.getItem(OPERATIONAL_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.examResults !== undefined) return parsed.examResults;
      }
    } catch {}
    return EXAM_RESULTS;
  });

  const [payrollList, setPayrollList] = useState<PayrollRecord[]>(() => {
    try {
      const saved = localStorage.getItem(OPERATIONAL_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.payrollList !== undefined) return parsed.payrollList;
      }
    } catch {}
    return MOCK_TEACHERS.map((t) => ({
      id: `PAY-${t.id}`,
      teacherId: t.id,
      teacherName: t.name,
      designation: `${t.subject} Specialist`,
      month: 'September 2026',
      basicPay: Math.max(0, t.monthlySalary - 4000),
      allowances: 4000,
      deductions: 0,
      netPayable: t.monthlySalary,
      status: t.salaryStatus,
      disbursedDate: t.salaryStatus === 'Disbursed' ? '2026-09-01' : undefined,
    }));
  });

  const [incomeExpenses, setIncomeExpenses] = useState<IncomeExpenseRecord[]>(() => {
    try {
      const saved = localStorage.getItem(OPERATIONAL_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.incomeExpenses !== undefined) return parsed.incomeExpenses;
      }
    } catch {}
    return INCOME_EXPENSES;
  });

  const [stationeryList, setStationeryList] = useState<StationeryItem[]>(() => {
    try {
      const saved = localStorage.getItem(OPERATIONAL_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.stationeryList !== undefined) return parsed.stationeryList;
      }
    } catch {}
    return STATIONERY_ITEMS;
  });

  const [reportsList, setReportsList] = useState<ReportItem[]>(() => {
    try {
      const saved = localStorage.getItem(OPERATIONAL_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.reportsList !== undefined) return parsed.reportsList;
      }
    } catch {}
    return DEFAULT_REPORTS;
  });

  const [loginActivities, setLoginActivities] = useState<LoginActivityRecord[]>(() => {
    try {
      const saved = localStorage.getItem(OPERATIONAL_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.loginActivities !== undefined) return parsed.loginActivities;
      }
    } catch {}
    return DEFAULT_LOGIN_ACTIVITY;
  });

  const [recentActivities, setRecentActivities] = useState<SchoolRecentActivity[]>(() => {
    try {
      const saved = localStorage.getItem(OPERATIONAL_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.recentActivities !== undefined) return parsed.recentActivities;
      }
    } catch {}
    return DEFAULT_RECENT_ACTIVITIES;
  });

  // Sync server login activities on mount
  useEffect(() => {
    fetchServerLoginActivities().then((serverActivities) => {
      if (serverActivities && serverActivities.length > 0) {
        setLoginActivities((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newEntries = serverActivities.filter((s) => !existingIds.has(s.id));
          return [...newEntries, ...prev];
        });
      }
    });
  }, []);

  // Track if current mode has active demo records
  const isDemoDataActive = studentsList.length > 0 || teachersList.length > 0;

  // Persist settings whenever changed
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to persist school settings:', e);
    }

    // Dynamic browser title synchronization
    if (settings.schoolName) {
      document.title = `${settings.schoolName} - School Management System`;
    }
  }, [settings]);

  // Persist operational data whenever state changes
  useEffect(() => {
    try {
      const payload = {
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
      };
      localStorage.setItem(OPERATIONAL_DATA_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Failed to persist operational data:', e);
    }
  }, [
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
  ]);

  // Update Settings
  const updateSettings = (newSettings: Partial<SchoolSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      return updated;
    });
  };

  // Upload Logo
  const uploadLogo = (dataUrl: string) => {
    setSettings((prev) => ({
      ...prev,
      logo: dataUrl,
      logoType: 'image',
    }));
  };

  // Remove Logo
  const removeLogo = () => {
    setSettings((prev) => ({
      ...prev,
      logo: '',
      logoType: 'emoji',
    }));
  };

  // Mutations
  const addStudent = (st: StudentRecord, challan?: FeeChallan) => {
    setStudentsList((prev) => [st, ...prev]);
    if (challan) {
      setChallansList((prev) => [challan, ...prev]);
    }
    setRecentActivities((prev) => [
      {
        id: `ACT-${Date.now()}`,
        time: 'Just now',
        action: `New Student admitted: ${st.name} (${st.grade})`,
        category: 'Admissions',
        badgeColor: 'bg-emerald-100 text-emerald-800',
      },
      ...prev,
    ]);
  };

  const addTeacher = (tc: TeacherRecord) => {
    setTeachersList((prev) => [tc, ...prev]);
    setPayrollList((prev) => [
      {
        id: `PAY-${tc.id}`,
        teacherId: tc.id,
        teacherName: tc.name,
        designation: `${tc.subject} Specialist`,
        month: 'September 2026',
        basicPay: Math.max(0, tc.monthlySalary - 4000),
        allowances: 4000,
        deductions: 0,
        netPayable: tc.monthlySalary,
        status: tc.salaryStatus,
      },
      ...prev,
    ]);
    setRecentActivities((prev) => [
      {
        id: `ACT-${Date.now()}`,
        time: 'Just now',
        action: `Faculty registered: ${tc.name} (${tc.subject})`,
        category: 'Faculty',
        badgeColor: 'bg-teal-100 text-teal-800',
      },
      ...prev,
    ]);
  };

  const toggleAttendance = (studentId: string, status: 'P' | 'A' | 'L') => {
    setAttendanceSheet((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const toggleFeeStatus = (challanId: string) => {
    setChallansList((prev) =>
      prev.map((c) =>
        c.id === challanId
          ? { ...c, status: c.status === 'Paid' ? 'Pending' : 'Paid' }
          : c
      )
    );
  };

  const toggleTeacherSalary = (teacherId: string) => {
    setTeachersList((prev) =>
      prev.map((t) =>
        t.id === teacherId
          ? { ...t, salaryStatus: t.salaryStatus === 'Disbursed' ? 'Pending' : 'Disbursed' }
          : t
      )
    );
    setPayrollList((prev) =>
      prev.map((p) =>
        p.teacherId === teacherId
          ? {
              ...p,
              status: p.status === 'Disbursed' ? 'Pending' : 'Disbursed',
              disbursedDate: p.status === 'Pending' ? new Date().toISOString().split('T')[0] : undefined,
            }
          : p
      )
    );
  };

  const addIncomeExpense = (rec: IncomeExpenseRecord) => {
    setIncomeExpenses((prev) => [rec, ...prev]);
    setRecentActivities((prev) => [
      {
        id: `ACT-${Date.now()}`,
        time: 'Just now',
        action: `Voucher: ${rec.type} Rs. ${rec.amount.toLocaleString()} for ${rec.title}`,
        category: 'Finance',
        badgeColor: rec.type === 'Income' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800',
      },
      ...prev,
    ]);
  };

  const addStationeryItem = (item: StationeryItem) => {
    setStationeryList((prev) => [item, ...prev]);
  };

  const sellStationeryItem = (itemId: string, quantity = 1) => {
    setStationeryList((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newStock = Math.max(0, item.inStock - quantity);
          return {
            ...item,
            inStock: newStock,
            status: newStock === 0 ? 'Out of Stock' : newStock <= item.minimumRequired ? 'Low Stock' : 'In Stock',
          };
        }
        return item;
      })
    );
  };

  const recordLoginActivity = (act: Omit<LoginActivityRecord, 'id'>) => {
    const newLog: LoginActivityRecord = {
      id: `LOG-${Date.now()}`,
      ...act,
    };
    setLoginActivities((prev) => [newLog, ...prev]);
    recordServerLoginActivity(newLog);
  };

  // Granular Reset Functions
  const resetStudents = () => {
    setStudentsList([]);
    setAttendanceSheet({});
    setRecentActivities((prev) => [
      {
        id: `ACT-${Date.now()}`,
        time: 'Just now',
        action: 'Student directory and records cleared',
        category: 'Reset',
        badgeColor: 'bg-amber-100 text-amber-800',
      },
      ...prev,
    ]);
  };

  const resetTeachers = () => {
    setTeachersList([]);
    setPayrollList([]);
  };

  const resetStaff = () => {
    setStaffCount(0);
  };

  const resetAttendance = () => {
    setAttendanceSheet({});
  };

  const resetFees = () => {
    setChallansList([]);
  };

  const resetExams = () => {
    setExamResults([]);
  };

  const resetPayroll = () => {
    setPayrollList([]);
  };

  const resetIncome = () => {
    setIncomeExpenses((prev) => prev.filter((i) => i.type !== 'Income'));
  };

  const resetExpenses = () => {
    setIncomeExpenses((prev) => prev.filter((i) => i.type !== 'Expense'));
  };

  const resetStationery = () => {
    setStationeryList([]);
  };

  const resetReports = () => {
    setReportsList([]);
  };

  const resetLoginActivity = () => {
    setLoginActivities([]);
  };

  // FULL MASTER RESET (Zeroes out all records and stats, keeping Admin user intact)
  const resetAllSchoolData = () => {
    setStudentsList([]);
    setTeachersList([]);
    setStaffCount(0);
    setAttendanceSheet({});
    setChallansList([]);
    setExamResults([]);
    setPayrollList([]);
    setIncomeExpenses([]);
    setStationeryList([]);
    setReportsList([]);
    setLoginActivities([]);
    setRecentActivities([]);
  };

  // LOAD DEMO DATA (Restores rich, realistic sample records for demonstration)
  const loadDemoData = () => {
    setStudentsList(MOCK_STUDENTS);
    setTeachersList(MOCK_TEACHERS);
    setStaffCount(24);
    setAttendanceSheet(DEFAULT_ATTENDANCE_SHEET);
    setChallansList(FEE_CHALLANS);
    setExamResults(EXAM_RESULTS);
    setPayrollList(
      MOCK_TEACHERS.map((t) => ({
        id: `PAY-${t.id}`,
        teacherId: t.id,
        teacherName: t.name,
        designation: `${t.subject} Specialist`,
        month: 'September 2026',
        basicPay: Math.max(0, t.monthlySalary - 4000),
        allowances: 4000,
        deductions: 0,
        netPayable: t.monthlySalary,
        status: t.salaryStatus,
        disbursedDate: t.salaryStatus === 'Disbursed' ? '2026-09-01' : undefined,
      }))
    );
    setIncomeExpenses(INCOME_EXPENSES);
    setStationeryList(STATIONERY_ITEMS);
    setReportsList(DEFAULT_REPORTS);
    setLoginActivities(DEFAULT_LOGIN_ACTIVITY);
    setRecentActivities(DEFAULT_RECENT_ACTIVITIES);
  };

  // Computed Live Stats
  const totalStudents = studentsList.length;
  const totalTeachers = teachersList.length;
  const totalStaff = staffCount;

  // Attendance stats
  let presentCount = 0;
  let absentCount = 0;
  let totalAttended = 0;

  if (studentsList.length > 0) {
    // If we have students, calculate from attendanceSheet or scale proportionally
    studentsList.forEach((st) => {
      const status = attendanceSheet[st.id] || (st.attendance > 90 ? 'P' : 'A');
      if (status === 'P') presentCount++;
      else if (status === 'A') absentCount++;
      else presentCount++; // leave counts as non-absent
      totalAttended++;
    });
  }

  const presentPercentage =
    totalAttended > 0 ? Math.round((presentCount / totalAttended) * 1000) / 10 : 0;

  // Fee stats
  let pendingFeesAmount = 0;
  let collectedFeesAmount = 0;
  let pendingChallansCount = 0;

  challansList.forEach((ch) => {
    if (ch.status === 'Paid') {
      collectedFeesAmount += ch.amount;
    } else {
      pendingFeesAmount += ch.amount;
      pendingChallansCount++;
    }
  });

  // Payroll stats
  const totalMonthlyPayroll = teachersList.reduce((acc, t) => acc + (t.monthlySalary || 0), 0);

  // Income & Expenses
  let totalIncome = 0;
  let totalExpenses = 0;

  incomeExpenses.forEach((item) => {
    if (item.type === 'Income') totalIncome += item.amount;
    else totalExpenses += item.amount;
  });

  const netBalance = totalIncome - totalExpenses;
  const totalStationeryItems = stationeryList.length;
  const activeExamsCount = examResults.length > 0 ? 3 : 0;

  const stats = {
    totalStudents,
    totalTeachers,
    totalStaff,
    presentTodayCount: presentCount,
    absentTodayCount: absentCount,
    presentPercentage,
    pendingFeesAmount,
    collectedFeesAmount,
    pendingChallansCount,
    activeExamsCount,
    totalMonthlyPayroll,
    totalIncome,
    totalExpenses,
    netBalance,
    totalStationeryItems,
  };

  return (
    <SchoolContext.Provider
      value={{
        settings,
        updateSettings,
        uploadLogo,
        removeLogo,
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
        recordLoginActivity,
        resetStudents,
        resetTeachers,
        resetStaff,
        resetAttendance,
        resetFees,
        resetExams,
        resetPayroll,
        resetIncome,
        resetExpenses,
        resetStationery,
        resetReports,
        resetLoginActivity,
        resetAllSchoolData,
        loadDemoData,
        stats,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = (): SchoolContextType => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};
