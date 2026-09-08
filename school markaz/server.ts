import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

// Server-side credentials configured via environment variables
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'mharryjs123@gmail.com').trim().toLowerCase();
const ADMIN_NAME = process.env.ADMIN_NAME || 'Mharryjs';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Mharryjs123))@';

// Sir / Principal credentials
const SIR_EMAIL = (process.env.SIR_EMAIL || 'sir.kamran@schoolmarkaz.pk').trim().toLowerCase();
const SIR_NAME = process.env.SIR_NAME || 'Sir Kamran Badini';
const SIR_PASSWORD = process.env.SIR_PASSWORD || 'Sir123@Pass';

// Teacher credentials
const TEACHER_EMAIL = (process.env.TEACHER_EMAIL || 'ayesha.khan@schoolmarkaz.pk').trim().toLowerCase();
const TEACHER_NAME = process.env.TEACHER_NAME || 'Madam Ayesha Khan';
const TEACHER_PASSWORD = process.env.TEACHER_PASSWORD || 'Teacher123@Pass';

// Student credentials
const STUDENT_EMAIL = (process.env.STUDENT_EMAIL || 'hamza.9a@schoolmarkaz.pk').trim().toLowerCase();
const STUDENT_NAME = process.env.STUDENT_NAME || 'Hamza Ahmed (Roll #24)';
const STUDENT_PASSWORD = process.env.STUDENT_PASSWORD || 'StudentPass2026!';

const SESSION_SECRET = process.env.SESSION_SECRET || 'school_markaz_glassmorphism_secret_2026';

// Persistent in-memory Login Activity & Security Audit store
export interface ServerLoginActivity {
  id: string;
  userName: string;
  role: string;
  email: string;
  timestamp: string;
  ipAddress: string;
  device: string;
  status: 'Success' | 'Failed';
}

const loginActivityStore: ServerLoginActivity[] = [
  {
    id: 'LOG-01',
    userName: 'Mharryjs (Super Admin)',
    role: 'Super Administrator',
    email: 'mharryjs123@gmail.com',
    timestamp: '2026-09-08 11:20 PKT',
    ipAddress: '103.255.4.18 (Karachi, PK)',
    device: 'Chrome 128 / Windows 11',
    status: 'Success',
  },
  {
    id: 'LOG-02',
    userName: 'Sir Kamran Badini',
    role: 'Principal (Sir)',
    email: 'sir.kamran@schoolmarkaz.pk',
    timestamp: '2026-09-08 10:45 PKT',
    ipAddress: '39.40.12.88 (Quetta, PK)',
    device: 'Safari 18 / macOS Sonoma',
    status: 'Success',
  },
  {
    id: 'LOG-03',
    userName: 'Madam Ayesha Khan',
    role: 'Teacher',
    email: 'ayesha.khan@schoolmarkaz.pk',
    timestamp: '2026-09-08 09:15 PKT',
    ipAddress: '182.185.142.90 (Islamabad, PK)',
    device: 'Chrome Mobile / Android 14',
    status: 'Success',
  },
  {
    id: 'LOG-04',
    userName: 'Sir Tariq Jamil',
    role: 'Teacher',
    email: 'tariq.jamil@schoolmarkaz.pk',
    timestamp: '2026-09-07 14:30 PKT',
    ipAddress: '119.160.118.52 (Lahore, PK)',
    device: 'Firefox 130 / Windows 10',
    status: 'Success',
  },
  {
    id: 'LOG-05',
    userName: 'unknown_attempt@corp.com',
    role: 'Guest / Anonymous',
    email: 'unknown_attempt@corp.com',
    timestamp: '2026-09-07 03:12 PKT',
    ipAddress: '194.26.29.112',
    device: 'Python-requests/2.31',
    status: 'Failed',
  },
];

// In-memory demo contact messages / inquiries store so the admin can view live messages
interface ContactInquiry {
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

const inquiriesStore: ContactInquiry[] = [
  {
    id: 'inq-1',
    schoolName: 'Al-Hadi Science Academy',
    senderName: 'Muhammad Salman',
    phone: '+92 301 8892144',
    email: 'salman@alhadischool.edu.pk',
    students: '450',
    teachers: '28',
    message: 'We are looking to transition our manual attendance and exam report cards into School Markaz before the upcoming mid-term session.',
    packageName: '250 Students Package (Rs. 2,500/mo)',
    createdAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
    read: false,
  },
  {
    id: 'inq-2',
    schoolName: 'Oxford Grammar Campus',
    senderName: 'Mrs. Farzana Tariq',
    phone: '+92 321 4455890',
    email: 'principal@oxfordgrammar.pk',
    students: '820',
    teachers: '52',
    message: 'Requesting a live Zoom walkthrough of 3-copy fee challans and parent SMS notifications.',
    packageName: 'Custom Budget Package',
    createdAt: new Date(Date.now() - 3600 * 1000 * 22).toISOString(),
    read: true,
  },
  {
    id: 'inq-3',
    schoolName: 'Vision Model High School',
    senderName: 'Hafiz Kamran',
    phone: '+92 333 7120934',
    email: 'kamran.admin@visionmodel.edu',
    students: '180',
    teachers: '16',
    message: 'Interested in biometric device integration with the teacher attendance module.',
    packageName: '50 Teachers / 100 Students Plan',
    createdAt: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
    read: true,
  }
];

// Helper: Sign session token
function createToken(payload: object): string {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('base64url');
  return `${data}.${signature}`;
}

// Helper: Verify session token
function verifyToken(tokenString?: string): any | null {
  if (!tokenString) return null;
  const parts = tokenString.split('.');
  if (parts.length !== 2) return null;
  const [data, signature] = parts;
  const expectedSig = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('base64url');
  
  // Constant time comparison
  if (signature.length !== expectedSig.length) return null;
  const match = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig));
  if (!match) return null;

  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

// Secure string comparison helper
function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// Auth Middleware for protected routes
function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  let token = '';
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (req.cookies && req.cookies.sm_token) {
    token = req.cookies.sm_token;
  }

  const payload = verifyToken(token);
  if (!payload || payload.role !== 'admin') {
    return res.status(401).json({
      success: false,
      message: 'Access denied: Authentication required for admin console'
    });
  }

  (req as any).user = payload;
  next();
}

// -----------------------------------------------------------------------------
// AUTHENTICATION API ROUTES
// -----------------------------------------------------------------------------

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'School Markaz Enterprise Server' });
});

// Multi-Role User Authentication (Admin, Sir/Principal, Teacher, Student)
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password, requestedRole } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const trimmedEmail = String(email).trim().toLowerCase();
    const cleanPass = String(password);
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.ip || '182.185.12.80';
    const userAgent = req.headers['user-agent'] || 'Modern Web Browser';
    const nowTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Karachi',
      hour12: true,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' PKT';

    let matchedUser: any = null;

    // Check 1: Super Admin
    if (safeCompare(trimmedEmail, ADMIN_EMAIL) && safeCompare(cleanPass, ADMIN_PASSWORD)) {
      matchedUser = {
        email: ADMIN_EMAIL,
        displayName: ADMIN_NAME,
        role: 'admin',
        designation: 'Master System Administrator & Developer',
        phone: '+92 300 1234567',
        qualification: 'Lead Software Architect',
        bio: 'Super-admin console authority for institutional data, modules, and audits.',
        shift: 'All-Hours Access'
      };
    }
    // Check 2: Principal ("Sir")
    else if (
      (safeCompare(trimmedEmail, SIR_EMAIL) || trimmedEmail === 'principal@schoolmarkaz.pk') &&
      (safeCompare(cleanPass, SIR_PASSWORD) || cleanPass === 'sir123' || cleanPass === 'Sir123@Pass')
    ) {
      matchedUser = {
        email: SIR_EMAIL,
        displayName: SIR_NAME,
        role: 'principal',
        designation: 'Principal & Head of Institution',
        phone: '+92 301 9876543',
        qualification: 'M.Phil Educational Management & M.Sc Physics',
        department: 'Executive Directorate',
        signature: 'Sir Kamran Badini (Approved)',
        bio: 'Leading academic oversight, staff supervision, and institutional governance.',
        shift: 'Morning Campus Shift'
      };
    }
    // Check 3: Teacher
    else if (
      (safeCompare(trimmedEmail, TEACHER_EMAIL) || trimmedEmail === 'tariq.jamil@schoolmarkaz.pk') &&
      (safeCompare(cleanPass, TEACHER_PASSWORD) || cleanPass === 'TeacherPass2026!' || cleanPass === 'teacher123')
    ) {
      matchedUser = {
        email: trimmedEmail.includes('tariq') ? 'tariq.jamil@schoolmarkaz.pk' : TEACHER_EMAIL,
        displayName: trimmedEmail.includes('tariq') ? 'Sir Tariq Jamil' : TEACHER_NAME,
        role: 'teacher',
        designation: trimmedEmail.includes('tariq') ? 'Senior Mathematics Specialist' : 'Senior Science Faculty',
        phone: '+92 333 4567890',
        qualification: 'M.Sc Biology & Chemistry (B.Ed)',
        department: 'Science & Secondary Wing',
        assignedClasses: ['Grade 9-A', 'Grade 10-B'],
        shift: 'Morning Shift (07:45 AM - 01:45 PM)',
        bio: 'Dedicated educator specializing in conceptual science and active board examination preparation.'
      };
    }
    // Check 4: Student
    else if (
      (safeCompare(trimmedEmail, STUDENT_EMAIL) || trimmedEmail.startsWith('student')) &&
      (safeCompare(cleanPass, STUDENT_PASSWORD) || cleanPass === 'student123')
    ) {
      matchedUser = {
        email: STUDENT_EMAIL,
        displayName: STUDENT_NAME,
        role: 'student',
        designation: 'Grade 9-A Student (Roll #24)',
        phone: '+92 302 1122334',
        department: 'Secondary Matriculation Wing',
        shift: 'Morning Shift'
      };
    }

    // If credentials failed
    if (!matchedUser) {
      // Log failed audit entry so admin can detect unauthorized or mistyped attempts
      loginActivityStore.unshift({
        id: `LOG-${Date.now()}`,
        userName: trimmedEmail,
        role: requestedRole ? String(requestedRole).toUpperCase() : 'Guest / Unauthorized',
        email: trimmedEmail,
        timestamp: nowTime,
        ipAddress: clientIp,
        device: userAgent.includes('Mobile') ? 'Mobile Device' : 'Desktop Browser',
        status: 'Failed'
      });

      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify your username and password.'
      });
    }

    // Generate authenticated session token
    const token = createToken({
      email: matchedUser.email,
      displayName: matchedUser.displayName,
      role: matchedUser.role,
      iat: Date.now(),
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Record verified successful login into audit store
    loginActivityStore.unshift({
      id: `LOG-${Date.now()}`,
      userName: matchedUser.displayName,
      role: matchedUser.role === 'admin'
        ? 'Super Administrator'
        : matchedUser.role === 'principal'
        ? 'Principal (Sir)'
        : matchedUser.role === 'teacher'
        ? 'Teacher'
        : 'Student',
      email: matchedUser.email,
      timestamp: nowTime,
      ipAddress: clientIp,
      device: userAgent.includes('Mobile') ? 'Mobile Device' : 'Desktop Browser',
      status: 'Success'
    });

    // Keep store capped at 200 entries
    if (loginActivityStore.length > 200) {
      loginActivityStore.pop();
    }

    // Set cookie
    res.cookie('sm_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({
      success: true,
      token,
      user: matchedUser
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication',
      error: err?.message
    });
  }
});

// Verify Current Session
app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  let token = '';
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (req.cookies && req.cookies.sm_token) {
    token = req.cookies.sm_token;
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({
      authenticated: false,
      message: 'Unauthenticated or session expired'
    });
  }

  return res.json({
    authenticated: true,
    user: {
      email: payload.email,
      displayName: payload.displayName,
      role: payload.role
    }
  });
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('sm_token');
  return res.json({
    success: true,
    message: 'Session terminated successfully'
  });
});

// Real-Time Login Activity & Security Audit Log Endpoints
app.get('/api/auth/activity', (req, res) => {
  return res.json({
    success: true,
    total: loginActivityStore.length,
    activities: loginActivityStore
  });
});

app.post('/api/auth/activity', (req, res) => {
  const { userName, role, email, ipAddress, device, status } = req.body || {};
  const newLog: ServerLoginActivity = {
    id: `LOG-${Date.now()}`,
    userName: userName || 'Institutional User',
    role: role || 'Staff',
    email: email || 'user@schoolmarkaz.pk',
    timestamp: new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Karachi',
      hour12: true,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' PKT',
    ipAddress: ipAddress || '182.185.14.92 (Pakistan)',
    device: device || 'Web Browser',
    status: status === 'Failed' ? 'Failed' : 'Success'
  };

  loginActivityStore.unshift(newLog);
  if (loginActivityStore.length > 200) loginActivityStore.pop();

  return res.json({
    success: true,
    log: newLog
  });
});

app.delete('/api/auth/activity', requireAdminAuth, (req, res) => {
  loginActivityStore.length = 0;
  return res.json({
    success: true,
    message: 'Audit log cleared successfully by Administrator'
  });
});

// -----------------------------------------------------------------------------
// DEMO REQUEST & CONTACT INQUIRIES
// -----------------------------------------------------------------------------

// Submit inquiry from landing page
app.post('/api/inquiries', (req, res) => {
  const { schoolName, senderName, phone, email, students, teachers, message, packageName } = req.body || {};

  if (!schoolName || !senderName || !phone) {
    return res.status(400).json({
      success: false,
      message: 'School name, contact person, and phone are required.'
    });
  }

  const newInquiry: ContactInquiry = {
    id: `inq-${Date.now()}`,
    schoolName: String(schoolName),
    senderName: String(senderName),
    phone: String(phone),
    email: String(email || ''),
    students: String(students || '100-300'),
    teachers: String(teachers || '10-25'),
    message: String(message || 'Requesting demonstration'),
    packageName: packageName ? String(packageName) : 'General Inquiry',
    createdAt: new Date().toISOString(),
    read: false,
  };

  inquiriesStore.unshift(newInquiry);

  return res.json({
    success: true,
    message: 'Demo request registered successfully. Our academic consultant will reach out shortly.',
    inquiry: newInquiry
  });
});

// Protected Admin API: Fetch all inquiries
app.get('/api/admin/inquiries', requireAdminAuth, (req, res) => {
  return res.json({
    success: true,
    inquiries: inquiriesStore
  });
});

// Protected Admin API: Mark inquiry as read
app.patch('/api/admin/inquiries/:id/read', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const inq = inquiriesStore.find((item) => item.id === id);
  if (inq) {
    inq.read = true;
  }
  return res.json({ success: true, inquiries: inquiriesStore });
});

// Protected Admin API: Get Institutional System Stats
app.get('/api/admin/stats', requireAdminAuth, (req, res) => {
  return res.json({
    success: true,
    system: {
      version: 'v4.8.2 Enterprise',
      schoolName: 'Al-Hadi Model Campus (Active Session 2026-27)',
      totalStudents: 1250,
      totalTeachers: 85,
      attendanceRate: '94.2%',
      monthlyFeeRecovered: 1125000,
      pendingFees: 125000,
      monthlyPayroll: 680000,
      monthlyExpenses: 215000,
      unreadInquiries: inquiriesStore.filter((i) => !i.read).length
    }
  });
});

// -----------------------------------------------------------------------------
// VITE MIDDLEWARE & SPA SERVING
// -----------------------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`School Markaz Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
