import React, { useState } from 'react';
import {
  X,
  GraduationCap,
  Shield,
  Award,
  Users,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  KeyRound,
  UserCheck
} from 'lucide-react';
import { loginUser } from '../services/auth';
import { AuthUser, UserRole } from '../types';
import { useSchool } from '../context/SchoolContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (role: UserRole, user: AuthUser) => void;
}

const DEMO_CREDENTIALS: Record<UserRole, { email: string; pass: string; title: string; subtitle: string }> = {
  admin: {
    email: 'mharryjs123@gmail.com',
    pass: 'Mharryjs123))@',
    title: 'Super Admin (Mharryjs)',
    subtitle: 'System Architect & Root Administrator',
  },
  principal: {
    email: 'sir.kamran@schoolmarkaz.pk',
    pass: 'Sir123@Pass',
    title: 'Sir / Principal',
    subtitle: 'Head of Institution & Executive Office',
  },
  teacher: {
    email: 'ayesha.khan@schoolmarkaz.pk',
    pass: 'Teacher123@Pass',
    title: 'Senior Teacher',
    subtitle: 'Faculty Wing & Attendance Incharge',
  },
  student: {
    email: 'hamza.9a@schoolmarkaz.pk',
    pass: 'StudentPass2026!',
    title: 'Student Portal',
    subtitle: 'Academic Progress & DMC Report Card',
  },
};

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { settings, recordLoginActivity } = useSchool();
  const [role, setRole] = useState<UserRole>('admin');
  const [email, setEmail] = useState(DEMO_CREDENTIALS.admin.email);
  const [password, setPassword] = useState(DEMO_CREDENTIALS.admin.pass);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthUser | null>(null);

  if (!isOpen) return null;

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setErrorMessage(null);
    setEmail(DEMO_CREDENTIALS[selectedRole].email);
    setPassword(DEMO_CREDENTIALS[selectedRole].pass);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await loginUser(email, password, role);

      if (res.success && res.user) {
        setAuthenticatedUser(res.user);
        setLoginSuccess(true);

        // Record real-time login activity in SchoolContext
        recordLoginActivity({
          userName: res.user.displayName,
          role: res.user.role === 'admin'
            ? 'Super Administrator'
            : res.user.role === 'principal'
            ? 'Principal (Sir)'
            : res.user.role === 'teacher'
            ? 'Teacher'
            : 'Student',
          timestamp: new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Karachi',
            hour12: true,
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }) + ' PKT',
          ipAddress: '182.185.14.90 (Active Session)',
          device: navigator.userAgent.includes('Mobile') ? 'Mobile Device' : 'Desktop Browser',
          status: 'Success',
        });

        setTimeout(() => {
          setLoginSuccess(false);
          onSuccess(res.user!.role, res.user!);
          onClose();
        }, 750);
      } else {
        setErrorMessage(res.message || 'Invalid username or password. Please verify your credentials.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Connection error with School Markaz auth server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B2317]/50 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white/85 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-[0_20px_70px_-10px_rgba(11,35,23,0.35)] border border-white/80 transition-all">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-[#123B2A] rounded-full hover:bg-white/80 transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#19A66A] to-[#123B2A] text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#19A66A]/30 ring-4 ring-white/60">
            {settings.logo ? (
              <img
                src={settings.logo}
                alt={settings.schoolName}
                className="w-full h-full object-cover rounded-2xl"
                referrerPolicy="no-referrer"
              />
            ) : (
              <GraduationCap className="w-8 h-8 text-[#E2F7EB]" />
            )}
          </div>
          <h3 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A] tracking-tight">
            {settings.schoolName}
          </h3>
          <p className="text-xs text-[#123B2A]/75 mt-1 font-medium">
            Institutional Secure Multi-Role Portal • Academic Session {settings.academicSession}
          </p>
        </div>

        {/* 4-Way Role Selector with 3D Depth */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {/* 1. Admin */}
          <button
            type="button"
            onClick={() => handleRoleSelect('admin')}
            className={`p-2.5 rounded-2xl text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer border ${
              role === 'admin'
                ? 'bg-gradient-to-b from-[#19A66A] to-[#147a4f] text-white border-[#19A66A] shadow-md shadow-[#19A66A]/30 scale-[1.02]'
                : 'bg-white/60 text-[#123B2A]/80 border-white/60 hover:bg-white/90 hover:border-[#19A66A]/30'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span className="text-[11px]">Admin (Mharryjs)</span>
          </button>

          {/* 2. Sir / Principal */}
          <button
            type="button"
            onClick={() => handleRoleSelect('principal')}
            className={`p-2.5 rounded-2xl text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer border ${
              role === 'principal'
                ? 'bg-gradient-to-b from-[#123B2A] to-[#0B2317] text-[#F4D068] border-[#123B2A] shadow-md shadow-[#0B2317]/30 scale-[1.02]'
                : 'bg-white/60 text-[#123B2A]/80 border-white/60 hover:bg-white/90 hover:border-[#123B2A]/30'
            }`}
          >
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[11px]">Sir (Principal)</span>
          </button>

          {/* 3. Teacher */}
          <button
            type="button"
            onClick={() => handleRoleSelect('teacher')}
            className={`p-2.5 rounded-2xl text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer border ${
              role === 'teacher'
                ? 'bg-gradient-to-b from-[#0F766E] to-[#115E59] text-white border-[#0F766E] shadow-md shadow-[#0F766E]/30 scale-[1.02]'
                : 'bg-white/60 text-[#123B2A]/80 border-white/60 hover:bg-white/90 hover:border-[#0F766E]/30'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="text-[11px]">Teacher</span>
          </button>

          {/* 4. Student */}
          <button
            type="button"
            onClick={() => handleRoleSelect('student')}
            className={`p-2.5 rounded-2xl text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer border ${
              role === 'student'
                ? 'bg-gradient-to-b from-[#2563EB] to-[#1D4ED8] text-white border-[#2563EB] shadow-md shadow-[#2563EB]/30 scale-[1.02]'
                : 'bg-white/60 text-[#123B2A]/80 border-white/60 hover:bg-white/90 hover:border-[#2563EB]/30'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span className="text-[11px]">Student</span>
          </button>
        </div>

        {/* Selected Role Badge Description */}
        <div className="mb-5 px-3.5 py-2.5 rounded-xl bg-[#F4FFF8] border border-[#19A66A]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#19A66A]" />
            <div>
              <div className="text-xs font-bold text-[#123B2A]">
                {DEMO_CREDENTIALS[role].title}
              </div>
              <div className="text-[10px] text-[#123B2A]/70">
                {DEMO_CREDENTIALS[role].subtitle}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setEmail(DEMO_CREDENTIALS[role].email);
              setPassword(DEMO_CREDENTIALS[role].pass);
            }}
            className="text-[10px] font-bold text-[#19A66A] hover:text-[#123B2A] flex items-center gap-1 px-2 py-1 rounded-lg bg-white border border-[#19A66A]/30 hover:bg-[#DDF7E8] transition-colors cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span>Reset Demo</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50/95 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Transition View */}
        {loginSuccess ? (
          <div className="text-center py-6 space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#123B2A]">
                Welcome, {authenticatedUser?.displayName || 'User'}!
              </h4>
              <p className="text-xs text-gray-600 mt-0.5">
                Authenticating session and opening your {role.toUpperCase()} workspace...
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#123B2A] mb-1">
                Authorized Username / Email
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@schoolmarkaz.pk"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-[#19A66A]/30 text-xs text-[#123B2A] placeholder:text-gray-400 focus:outline-none focus:border-[#19A66A] focus:bg-white focus:ring-2 focus:ring-[#19A66A]/20 transition-all font-medium"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#123B2A]">
                  Password
                </label>
                <span className="text-[10px] text-gray-500 flex items-center gap-1 font-medium">
                  <KeyRound className="w-3 h-3 text-[#19A66A]" />
                  <span>Encrypted Token</span>
                </span>
              </div>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-white/80 backdrop-blur-sm border border-[#19A66A]/30 text-xs text-[#123B2A] placeholder:text-gray-400 focus:outline-none focus:border-[#19A66A] focus:bg-white focus:ring-2 focus:ring-[#19A66A]/20 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 p-1 text-gray-400 hover:text-[#19A66A] transition-colors cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#19A66A] to-[#123B2A] hover:from-[#158f5b] hover:to-[#0B2317] text-white text-xs font-bold shadow-lg shadow-[#19A66A]/25 hover:shadow-xl hover:shadow-[#19A66A]/35 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 transform active:scale-[0.99]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </div>
              ) : (
                <>
                  <span>Sign In as {DEMO_CREDENTIALS[role].title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <div className="pt-2 text-[11px] text-center text-[#123B2A]/60 flex items-center justify-center gap-1.5">
              <Lock className="w-3 h-3 text-[#19A66A]" />
              <span>
                All login actions are audited & visible in the Admin Security Log.
              </span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
