import {
  StudentRecord,
  TeacherRecord,
  AttendanceRecord,
  FeeChallan,
  ExamResult,
  IncomeExpenseRecord,
  StationeryItem,
  PackagePlan,
  FAQItem
} from '../types';

export const SCHOOL_STATS = {
  totalStudents: 1250,
  totalTeachers: 85,
  presentTodayPercentage: 94,
  presentTodayCount: 1175,
  absentTodayCount: 75,
  pendingFeesAmount: 125000,
  collectedFeesAmount: 1125000,
  monthlyIncome: 450000,
  monthlyExpenses: 180000,
  netBalance: 270000,
  totalClasses: 18,
  activeExams: 3,
};

export const MOCK_STUDENTS: StudentRecord[] = [
  {
    id: 'SM-ST-101',
    name: 'Muhammad Ahmed',
    rollNo: '8A-12',
    grade: 'Grade 8',
    section: 'A',
    guardianName: 'Tariq Ahmed',
    phone: '+92 300 1234567',
    attendance: 96,
    feeStatus: 'Paid',
    monthlyFee: 3500,
    avatarColor: 'bg-emerald-100 text-emerald-800',
  },
  {
    id: 'SM-ST-102',
    name: 'Ayesha Khan',
    rollNo: '7B-09',
    grade: 'Grade 7',
    section: 'B',
    guardianName: 'Imran Khan',
    phone: '+92 321 9876543',
    attendance: 91,
    feeStatus: 'Pending',
    monthlyFee: 3200,
    avatarColor: 'bg-teal-100 text-teal-800',
  },
  {
    id: 'SM-ST-103',
    name: 'Bilal Tariq',
    rollNo: '10A-04',
    grade: 'Grade 10',
    section: 'A',
    guardianName: 'Tariq Mehmood',
    phone: '+92 333 4567890',
    attendance: 98,
    feeStatus: 'Paid',
    monthlyFee: 4000,
    avatarColor: 'bg-green-100 text-green-800',
  },
  {
    id: 'SM-ST-104',
    name: 'Fatima Noor',
    rollNo: '9C-15',
    grade: 'Grade 9',
    section: 'C',
    guardianName: 'Noor ul Hassan',
    phone: '+92 345 6789012',
    attendance: 93,
    feeStatus: 'Paid',
    monthlyFee: 3800,
    avatarColor: 'bg-mint-100 text-emerald-900',
  },
  {
    id: 'SM-ST-105',
    name: 'Zeeshan Ali',
    rollNo: '6A-22',
    grade: 'Grade 6',
    section: 'A',
    guardianName: 'Ali Asghar',
    phone: '+92 312 3456789',
    attendance: 88,
    feeStatus: 'Pending',
    monthlyFee: 3000,
    avatarColor: 'bg-amber-100 text-amber-900',
  },
  {
    id: 'SM-ST-106',
    name: 'Zainab Bibi',
    rollNo: '8B-18',
    grade: 'Grade 8',
    section: 'B',
    guardianName: 'Muhammad Rasheed',
    phone: '+92 301 8765432',
    attendance: 95,
    feeStatus: 'Paid',
    monthlyFee: 3500,
    avatarColor: 'bg-emerald-100 text-emerald-800',
  },
  {
    id: 'SM-ST-107',
    name: 'Hamza Farooq',
    rollNo: '10B-08',
    grade: 'Grade 10',
    section: 'B',
    guardianName: 'Farooq Azam',
    phone: '+92 322 1122334',
    attendance: 92,
    feeStatus: 'Partial',
    monthlyFee: 4000,
    avatarColor: 'bg-blue-100 text-blue-800',
  },
  {
    id: 'SM-ST-108',
    name: 'Maryam Naveed',
    rollNo: '7A-03',
    grade: 'Grade 7',
    section: 'A',
    guardianName: 'Naveed Akhtar',
    phone: '+92 306 9988776',
    attendance: 97,
    feeStatus: 'Paid',
    monthlyFee: 3200,
    avatarColor: 'bg-teal-100 text-teal-800',
  },
];

export const MOCK_TEACHERS: TeacherRecord[] = [
  {
    id: 'SM-TC-01',
    name: 'Sir Rizwan Siddiqui',
    subject: 'Mathematics',
    classes: ['Grade 9-A', 'Grade 10-A', 'Grade 10-B'],
    phone: '+92 300 4455667',
    attendance: 98,
    salaryStatus: 'Disbursed',
    monthlySalary: 48000,
    qualification: 'M.Sc Mathematics (PU)',
  },
  {
    id: 'SM-TC-02',
    name: 'Maam Sadia Rehman',
    subject: 'Biology & Chemistry',
    classes: ['Grade 9-B', 'Grade 9-C', 'Grade 10-A'],
    phone: '+92 333 7788990',
    attendance: 96,
    salaryStatus: 'Disbursed',
    monthlySalary: 45000,
    qualification: 'M.Phil Biochemistry',
  },
  {
    id: 'SM-TC-03',
    name: 'Sir Tariq Jamil',
    subject: 'Physics & Computer Science',
    classes: ['Grade 8-A', 'Grade 9-A', 'Grade 10-B'],
    phone: '+92 345 2233445',
    attendance: 94,
    salaryStatus: 'Disbursed',
    monthlySalary: 46000,
    qualification: 'BS Computer Science',
  },
  {
    id: 'SM-TC-04',
    name: 'Maam Anum Fatima',
    subject: 'English Literature',
    classes: ['Grade 6-A', 'Grade 7-A', 'Grade 8-B'],
    phone: '+92 321 5566778',
    attendance: 95,
    salaryStatus: 'Disbursed',
    monthlySalary: 42000,
    qualification: 'M.A English',
  },
  {
    id: 'SM-TC-05',
    name: 'Qari Abdul Waheed',
    subject: 'Islamiat & Arabic',
    classes: ['Grade 6 to 10'],
    phone: '+92 313 8899001',
    attendance: 99,
    salaryStatus: 'Disbursed',
    monthlySalary: 38000,
    qualification: 'Dars-e-Nizami, M.A Islamic Studies',
  },
];

export const MOCK_ATTENDANCE_SUMMARY: AttendanceRecord[] = [
  { date: 'Today', grade: 'All School', totalStudents: 1250, present: 1175, absent: 55, leave: 20, percentage: 94 },
  { date: 'Grade 10', grade: 'Grade 10', totalStudents: 180, present: 173, absent: 5, leave: 2, percentage: 96 },
  { date: 'Grade 9', grade: 'Grade 9', totalStudents: 210, present: 198, absent: 9, leave: 3, percentage: 94 },
  { date: 'Grade 8', grade: 'Grade 8', totalStudents: 230, present: 216, absent: 10, leave: 4, percentage: 93.9 },
  { date: 'Grade 7', grade: 'Grade 7', totalStudents: 220, present: 206, absent: 11, leave: 3, percentage: 93.6 },
  { date: 'Grade 6', grade: 'Grade 6', totalStudents: 210, present: 194, absent: 12, leave: 4, percentage: 92.3 },
];

export const MOCK_CHALLANS: FeeChallan[] = [
  { id: 'CH-9021', challanNo: 'SMK-2026-0921', studentName: 'Muhammad Ahmed', grade: 'Grade 8-A', month: 'September 2026', amount: 3500, dueDate: '10 Sep 2026', status: 'Paid' },
  { id: 'CH-9022', challanNo: 'SMK-2026-0922', studentName: 'Ayesha Khan', grade: 'Grade 7-B', month: 'September 2026', amount: 3200, dueDate: '10 Sep 2026', status: 'Pending' },
  { id: 'CH-9023', challanNo: 'SMK-2026-0923', studentName: 'Bilal Tariq', grade: 'Grade 10-A', month: 'September 2026', amount: 4000, dueDate: '10 Sep 2026', status: 'Paid' },
  { id: 'CH-9024', challanNo: 'SMK-2026-0924', studentName: 'Zeeshan Ali', grade: 'Grade 6-A', month: 'September 2026', amount: 3000, dueDate: '10 Sep 2026', status: 'Pending' },
  { id: 'CH-9025', challanNo: 'SMK-2026-0925', studentName: 'Hamza Farooq', grade: 'Grade 10-B', month: 'September 2026', amount: 4000, dueDate: '10 Sep 2026', status: 'Partial' },
];

export const MOCK_EXAM_RESULTS: ExamResult[] = [
  { studentName: 'Bilal Tariq', rollNo: '10A-04', grade: 'Grade 10', totalMarks: 550, obtainedMarks: 524, percentage: 95.2, gradeLetter: 'A+', rank: 1 },
  { studentName: 'Fatima Noor', rollNo: '9C-15', grade: 'Grade 9', totalMarks: 550, obtainedMarks: 512, percentage: 93.0, gradeLetter: 'A+', rank: 2 },
  { studentName: 'Muhammad Ahmed', rollNo: '8A-12', grade: 'Grade 8', totalMarks: 500, obtainedMarks: 461, percentage: 92.2, gradeLetter: 'A+', rank: 1 },
  { studentName: 'Zainab Bibi', rollNo: '8B-18', grade: 'Grade 8', totalMarks: 500, obtainedMarks: 445, percentage: 89.0, gradeLetter: 'A', rank: 3 },
  { studentName: 'Ayesha Khan', rollNo: '7B-09', grade: 'Grade 7', totalMarks: 500, obtainedMarks: 428, percentage: 85.6, gradeLetter: 'A', rank: 4 },
];

export const MOCK_CASHFLOW: IncomeExpenseRecord[] = [
  { id: 'CF-1', type: 'Income', category: 'Monthly Tuition Fees', title: 'Tuition Fee Batch Grade 8 & 9', amount: 285000, date: '05 Sep 2026', paymentMethod: 'Bank Transfer & Cash' },
  { id: 'CF-2', type: 'Income', category: 'New Admissions', title: 'Admission & Prospectus Fees (14 students)', amount: 110000, date: '03 Sep 2026', paymentMethod: 'Online Portal' },
  { id: 'CF-3', type: 'Income', category: 'Stationery Sales', title: 'Uniform Badges, Notebooks & ID cards', amount: 55000, date: '02 Sep 2026', paymentMethod: 'Counter Cash' },
  { id: 'CF-4', type: 'Expense', category: 'Teacher & Staff Payroll', title: 'Faculty Advance & Staff Salaries', amount: 125000, date: '01 Sep 2026', paymentMethod: 'Direct Bank Pay' },
  { id: 'CF-5', type: 'Expense', category: 'Utilities & Generator', title: 'Electricity Bill & Fuel Generator', amount: 32000, date: '04 Sep 2026', paymentMethod: 'Bank Draft' },
  { id: 'CF-6', type: 'Expense', category: 'Stationery Restock', title: 'Examination Answer Sheets & Registers', amount: 23000, date: '06 Sep 2026', paymentMethod: 'Vendor Cheque' },
];

export const MOCK_STATIONERY: StationeryItem[] = [
  { id: 'ST-01', name: 'School Homework Diary (2026)', category: 'Diaries', inStock: 340, unitPrice: 180, minimumRequired: 50, status: 'In Stock' },
  { id: 'ST-02', name: 'Standard Exam Answer Sheet Booklet', category: 'Examination', inStock: 1250, unitPrice: 25, minimumRequired: 300, status: 'In Stock' },
  { id: 'ST-03', name: 'Official Student ID Card Badge Holder', category: 'Accessories', inStock: 45, unitPrice: 85, minimumRequired: 80, status: 'Low Stock' },
  { id: 'ST-04', name: 'Chemistry & Physics Practical Notebooks', category: 'Laboratory', inStock: 190, unitPrice: 220, minimumRequired: 40, status: 'In Stock' },
  { id: 'ST-05', name: 'Report Card Folder & DMC Sleeves', category: 'Certificates', inStock: 520, unitPrice: 65, minimumRequired: 100, status: 'In Stock' },
];

export const FEE_CHALLANS = MOCK_CHALLANS;
export const EXAM_RESULTS = MOCK_EXAM_RESULTS;
export const INCOME_EXPENSES = MOCK_CASHFLOW;
export const STATIONERY_ITEMS = MOCK_STATIONERY;


export const MODULES_LIST = [
  {
    id: 'student-mgmt',
    title: 'Student Management',
    desc: 'Manage student profiles, classes, sections, academic records and related information.',
    icon: 'GraduationCap',
    badge: 'Core Module',
    features: ['Bio-data & Guardian Info', 'Roll No & Section Assignment', 'Document Attachments', 'Promotion History']
  },
  {
    id: 'teacher-mgmt',
    title: 'Teacher Management',
    desc: 'Manage teacher profiles, classes, assignments and records.',
    icon: 'Users',
    badge: 'Faculty',
    features: ['Teacher Profiles & Qualifications', 'Subject & Class Allocation', 'Workload Distribution', 'Performance Tracking']
  },
  {
    id: 'smart-attendance',
    title: 'Smart Attendance',
    desc: 'Track student and teacher attendance quickly and accurately.',
    icon: 'CalendarCheck',
    badge: 'Daily Ops',
    features: ['One-Click Class Attendance', 'Instant Absent SMS to Parents', 'Staff Biometric/App Sync', 'Monthly Attendance Sheets']
  },
  {
    id: 'exam-mgmt',
    title: 'Exam Management',
    desc: 'Create exams, manage marks and organize student results.',
    icon: 'Award',
    badge: 'Academics',
    features: ['Exam Datesheet Builder', 'Marks & Grade Entry', 'Automated DMC & Result Cards', 'Top Position Badges']
  },
  {
    id: 'fee-mgmt',
    title: 'Fee Management',
    desc: 'Track fees, payments, pending balances and payment history.',
    icon: 'Receipt',
    badge: 'Finance',
    features: ['3-Copy Bank Challan Printing', 'Automatic Late Fee Calculations', 'Pending Balance SMS Reminders', 'Partial Payment Support']
  },
  {
    id: 'payroll-mgmt',
    title: 'Teachers Payroll',
    desc: 'Manage salaries, payroll records and payment history.',
    icon: 'CreditCard',
    badge: 'HR & Payroll',
    features: ['Monthly Salary Slip Generation', 'Deductions, Leaves & Bonuses', 'Bank Transfer Summaries', 'Staff Advance Records']
  },
  {
    id: 'income-expense',
    title: 'Income & Expense',
    desc: 'Monitor school income, expenses and financial activity.',
    icon: 'TrendingUp',
    badge: 'Accounts',
    features: ['Category-wise Expense Logs', 'Real-time Profit & Loss Ledger', 'Cash-in-hand & Bank Accounts', 'Tax & Audit Reports']
  },
  {
    id: 'stationery-mgmt',
    title: 'Stationery Management',
    desc: 'Track stationery stock, usage and inventory.',
    icon: 'PackageCheck',
    badge: 'Inventory',
    features: ['Books, Uniform & Diaries Stock', 'Student Point-of-Sale Billing', 'Low Stock Auto-Alerts', 'Vendor Purchase Orders']
  },
  {
    id: 'reports-analytics',
    title: 'Reports & Analytics',
    desc: 'Generate useful reports and monitor school performance.',
    icon: 'BarChart3',
    badge: 'Executive',
    features: ['Student Strength & Attrition', 'Fee Defaulters Comprehensive List', 'Teacher Attendance Summaries', 'Export to PDF & Excel']
  },
  {
    id: 'secure-db',
    title: 'Secure Database',
    desc: 'Keep school information organized and protected.',
    icon: 'ShieldCheck',
    badge: 'Security',
    features: ['Automated Cloud Backups', 'Role-Based Access Control', 'Multi-layer Data Encryption', '99.9% Uptime Guarantee']
  },
];

export const FEATURES_12 = [
  { title: 'Perfect Exam Module', icon: 'FileText', desc: 'Create datesheets, record test marks, compute positions and print computerized progress report cards with one click.' },
  { title: 'Smart Attendance System', icon: 'UserCheck', desc: 'Mark class attendance in 30 seconds. Automatically send instant absent SMS alerts directly to parents.' },
  { title: 'Teachers Payroll Management', icon: 'Wallet', desc: 'Accurately manage salary structures, automatic leave deductions, allowances, advances and printable payslips.' },
  { title: 'Income & Expense Management', icon: 'PieChart', desc: 'Monitor utility bills, rent, maintenance, bus fuel and school revenue in an organized single ledger.' },
  { title: 'Stationery Management', icon: 'Layers', desc: 'Track stock of school uniforms, notebooks, ties, diaries and exam sheets with integrated sales billing.' },
  { title: 'Fast & Secure Database', icon: 'Database', desc: 'Cloud hosted with continuous automated backups ensuring zero data loss and instant lightning-fast search.' },
  { title: 'Student Management', icon: 'BookOpen', desc: 'Full profile bio-data, academic history, class allocation, parent contacts and guardian emergency numbers.' },
  { title: 'Teacher Management', icon: 'Briefcase', desc: 'Assign class teachers, distribute timetable subjects, manage staff leaves and record qualifications.' },
  { title: 'Fee Management', icon: 'Banknote', desc: 'Generate single or batch 3-part bank fee challans with custom discounts, late fines and instant receipts.' },
  { title: 'Reports & Analytics', icon: 'Activity', desc: 'Visual dashboards for student retention, class-wise fee collections, expense breakdowns and teacher ratios.' },
  { title: 'Communication', icon: 'MessageSquare', desc: 'Send bulk announcements, holiday notices, emergency school closures and homework updates to parents.' },
  { title: 'School Administration', icon: 'Settings', desc: 'Complete administrative control with role permissions, custom academic sessions and multi-campus support.' },
];

export const PACKAGES_LIST: PackagePlan[] = [
  {
    id: 'pkg-1',
    name: 'Starter School',
    price: 'Rs. 1,000',
    period: '/ month',
    studentLimit: 'Up to 100 Students',
    teacherLimit: 'Up to 50 Teachers',
    features: [
      'Student Management',
      'Teacher Management',
      'Attendance Tracking',
      'Exams & Marks Entry',
      'Fees Challan & Receipt',
      'Basic Performance Reports',
      'Single Admin Login',
      'Standard Email Support'
    ],
    buttonText: 'Choose Package',
  },
  {
    id: 'pkg-2',
    name: 'Standard Campus',
    price: 'Rs. 2,500',
    period: '/ month',
    studentLimit: 'Up to 250 Students',
    teacherLimit: 'Unlimited Teachers',
    popular: true,
    features: [
      'Everything in Starter School',
      'Payroll Management for Staff',
      'Income & Expenses Module',
      'Stationery & Stock Tracker',
      'SMS & WhatsApp Alert System',
      'Multi-user Role Permissions',
      'Comprehensive PDF DMC Printing',
      'Priority WhatsApp Support'
    ],
    buttonText: 'Choose Package',
  },
  {
    id: 'pkg-3',
    name: 'Premium Custom Package',
    tagline: 'Tailored for Medium & Large Schools',
    price: 'Custom Pricing',
    studentLimit: 'Flexible Student Limits',
    teacherLimit: 'Flexible Teacher Limits',
    features: [
      'Select exact student count needed',
      'Select teacher & staff limits',
      'Dedicated Mobile Apps for Parents',
      'Teacher Android App with Portal',
      'Automated Biometric Machine Sync',
      'Custom School Watermark & Logo on Reports',
      'Dedicated Account Manager',
      'Free Onsite / Remote Staff Training'
    ],
    buttonText: 'Request Custom Package',
  },
  {
    id: 'pkg-4',
    name: 'Custom Budget Package',
    tagline: 'Built Around Your Budget',
    price: 'Affordable Custom',
    studentLimit: 'Tailored to your needs',
    teacherLimit: 'Negotiable limits',
    features: [
      'Get a package designed for your budget',
      'Pay annually for extra discounts',
      'Turn on/off specific modules as needed',
      'Free historical data migration from Excel',
      'No hidden setup fees or charges',
      '24/7 Server uptime monitoring'
    ],
    buttonText: 'Talk To Us',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Create Your School',
    desc: 'Register your school name, logo, campus address, grading system and academic session in under 3 minutes.',
  },
  {
    step: '02',
    title: 'Configure Teachers & Students',
    desc: 'Quickly import student and teacher records via Excel or enter them with our fast registration forms.',
  },
  {
    step: '03',
    title: 'Start Managing Your School',
    desc: 'Mark daily attendance, print fee challans, log expenses and organize examinations effortlessly.',
  },
  {
    step: '04',
    title: 'Monitor Everything From One Dashboard',
    desc: 'View real-time fee recovery, academic graphs, teacher attendance and financial health anytime, anywhere.',
  },
];

export const WHY_CHOOSE_ITEMS = [
  {
    num: '01',
    title: 'One Centralized System',
    desc: 'Eliminate chaotic paperwork, registers and disconnected Excel sheets. Every department operates from a unified single software.',
    stat: '100%',
    statLabel: 'Unified Operations'
  },
  {
    num: '02',
    title: 'Fast Performance',
    desc: 'Built on high-speed optimized architecture that loads instant queries even across thousands of students and historical records.',
    stat: '<0.2s',
    statLabel: 'Page Load Speed'
  },
  {
    num: '03',
    title: 'Secure Database',
    desc: 'Enterprise-grade encryption and daily automated cloud snapshots ensure your student data and financial ledgers are 100% protected.',
    stat: '99.9%',
    statLabel: 'Cloud Reliability'
  },
  {
    num: '04',
    title: 'Multiple User Apps',
    desc: 'Dedicated portals and apps tailored specifically for School Principals, Teachers, Parents and Students with personalized views.',
    stat: '3 Apps',
    statLabel: 'Admin, Teacher, Student'
  },
  {
    num: '05',
    title: 'Smart School Management',
    desc: 'Automates manual calculations for student grades, late fee fines, teacher leave deductions and stationery reorder thresholds.',
    stat: '15+ hrs',
    statLabel: 'Saved Weekly by Admin'
  },
  {
    num: '06',
    title: 'Professional Reports',
    desc: 'Export beautifully formatted PDF DMC result cards, 3-copy fee challans, monthly cashflow summaries and student rosters.',
    stat: '40+',
    statLabel: 'One-Click Report Types'
  },
];

export const TESTIMONIALS = [
  {
    quote: 'School Markaz has made our daily school management much easier. Everything is organized in one place — from fee challans to teacher salaries.',
    author: 'Prof. Muhammad Akram',
    designation: 'Principal, Al-Hira Model High School',
    location: 'Lahore',
    badge: '1,400+ Students',
    rating: 5
  },
  {
    quote: 'Managing attendance, fees and exams has become much faster and more convenient. Fee recovery improved by 35% in our first two months alone.',
    author: 'Haji Abdul Qadeer',
    designation: 'Director, Quaid-e-Azam Public Academy',
    location: 'Rawalpindi',
    badge: '850+ Students',
    rating: 5
  },
  {
    quote: 'The separate apps for teachers and students make communication much easier. Our teachers enter exam marks on their phones without paper DMC delays.',
    author: 'Farzana Parveen',
    designation: 'Administrator, Oxford Cambridge Grammar School',
    location: 'Faisalabad',
    badge: '1,100+ Students',
    rating: 5
  },
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'What is School Markaz?',
    answer: 'School Markaz is a modern, comprehensive School Management Software designed to handle all aspects of school administration digitally. It brings student admissions, teacher management, smart attendance, computerized examinations, fee collection, staff payroll, income & expenses, and stationery stock into one easy-to-use cloud platform.',
  },
  {
    question: 'Who can use School Markaz?',
    answer: 'School Markaz is built for private schools, public schools, academies, colleges, and educational chains of all sizes. It provides tailored interfaces for School Owners/Principals, Accounts Officers, Teachers, and Students/Parents.',
  },
  {
    question: 'Can I choose my student and teacher limits?',
    answer: 'Yes! We offer flexible plans. You can start with our Starter (100 students / 50 teachers) or Standard plan (250 students), or request a Custom Package where you choose the exact student and teacher capacity needed for your institution.',
  },
  {
    question: 'Do you provide mobile apps?',
    answer: 'Yes! School Markaz provides dedicated mobile experiences for School Admins, Teachers (to mark attendance & enter marks), and Students/Parents (to track attendance, check result cards, and view fee receipts).',
  },
  {
    question: 'Is the database secure?',
    answer: 'Absolutely. School Markaz uses secure cloud infrastructure with encrypted connections, automated daily database backups, and granular role-based permissions to ensure your confidential school data is never compromised.',
  },
  {
    question: 'Can I request a custom package?',
    answer: 'Yes, our team works closely with school administrations to build packages tailored precisely around your institution’s size and budget. Just click "Request Custom Package" or contact us via WhatsApp.',
  },
  {
    question: 'How can I request a demo?',
    answer: 'You can request a live personalized demo by filling out our demo request form on this website or clicking "Chat On WhatsApp". Our product specialists will provide a complete walkthrough and set up a free trial for your school.',
  },
  {
    question: 'How does the pricing work?',
    answer: 'Our pricing is transparent with simple monthly or discounted annual subscriptions. There are no hidden charges. All essential updates, maintenance, and software support are included in your subscription.',
  },
];
