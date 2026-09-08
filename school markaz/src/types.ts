export interface StudentRecord {
  id: string;
  name: string;
  rollNo: string;
  grade: string;
  section: string;
  guardianName: string;
  phone: string;
  attendance: number;
  feeStatus: 'Paid' | 'Pending' | 'Partial';
  monthlyFee: number;
  avatarColor: string;
}

export interface TeacherRecord {
  id: string;
  name: string;
  subject: string;
  classes: string[];
  phone: string;
  attendance: number;
  salaryStatus: 'Disbursed' | 'Pending';
  monthlySalary: number;
  qualification: string;
}

export interface AttendanceRecord {
  date: string;
  grade: string;
  totalStudents: number;
  present: number;
  absent: number;
  leave: number;
  percentage: number;
}

export interface FeeChallan {
  id: string;
  challanNo: string;
  studentName: string;
  grade: string;
  month: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Partial';
}

export interface ExamResult {
  studentName: string;
  rollNo: string;
  grade: string;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  gradeLetter: string;
  rank: number;
}

export interface IncomeExpenseRecord {
  id: string;
  type: 'Income' | 'Expense';
  category: string;
  title: string;
  amount: number;
  date: string;
  paymentMethod: string;
}

export interface StationeryItem {
  id: string;
  name: string;
  category: string;
  inStock: number;
  unitPrice: number;
  minimumRequired: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface PackagePlan {
  id: string;
  name: string;
  tagline?: string;
  price: string;
  period?: string;
  studentLimit: string;
  teacherLimit: string;
  popular?: boolean;
  features: string[];
  buttonText: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type UserRole = 'admin' | 'principal' | 'teacher' | 'student';

export interface AuthUser {
  id?: string;
  username?: string;
  email: string;
  displayName: string;
  role: UserRole;
  designation?: string;
  phone?: string;
  avatarUrl?: string;
  department?: string;
  assignedClasses?: string[];
  joinedDate?: string;
  qualification?: string;
  bio?: string;
  signature?: string;
  shift?: string;
}

export interface AdminUser {
  email: string;
  displayName: string;
  role: 'admin';
  phone?: string;
  designation?: string;
  bio?: string;
}

export interface AdminInquiry {
  id: string;
  schoolName: string;
  senderName: string;
  phone: string;
  email: string;
  students: string;
  teachers: string;
  message: string;
  packageName?: string;
  createdAt: string;
  read: boolean;
}

export interface SchoolSettings {
  schoolName: string;
  logo: string;
  logoType: 'emoji' | 'image';
  address: string;
  phone: string;
  email: string;
  website: string;
  principalName: string;
  academicSession: string;
  motto: string;
  primaryColor: string;
  secondaryColor: string;
  appearanceMode: 'light' | 'dark' | 'glass';
  sidebarAppearance: 'glass' | 'solid' | 'minimal';
  dashboardBranding: string;
  campusCode: string;
  registrationNo: string;
}

export interface PayrollRecord {
  id: string;
  teacherId: string;
  teacherName: string;
  designation: string;
  month: string;
  basicPay: number;
  allowances: number;
  deductions: number;
  netPayable: number;
  status: 'Disbursed' | 'Pending';
  disbursedDate?: string;
}

export interface ReportItem {
  id: string;
  title: string;
  desc: string;
  file: string;
  category: string;
  dateGenerated: string;
  size: string;
}

export interface LoginActivityRecord {
  id: string;
  userName: string;
  role: string;
  timestamp: string;
  ipAddress: string;
  device: string;
  status: 'Success' | 'Failed';
}

export type LoginActivity = LoginActivityRecord;

export interface SchoolRecentActivity {
  id: string;
  time: string;
  action: string;
  category: string;
  badgeColor: string;
}
