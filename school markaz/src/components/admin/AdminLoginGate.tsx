import React, { useState } from 'react';
import { GraduationCap, ShieldCheck, Lock, ArrowRight, AlertCircle, ArrowLeft, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { loginAdmin } from '../../services/auth';
import { AdminUser } from '../../types';
import { useSchool } from '../../context/SchoolContext';

interface AdminLoginGateProps {
  onLoginSuccess: (user: AdminUser) => void;
  onBackHome: () => void;
}

export const AdminLoginGate: React.FC<AdminLoginGateProps> = ({ onLoginSuccess, onBackHome }) => {
  const { settings } = useSchool();
  const [email, setEmail] = useState('mharryjs123@gmail.com');
  const [password, setPassword] = useState('Mharryjs123))@');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await loginAdmin(email, password);
      if (result.success && result.user) {
        setIsSuccess(true);
        setTimeout(() => {
          onLoginSuccess(result.user!);
        }, 600);
      } else {
        setError(result.message || 'Invalid administrative credentials');
      }
    } catch (err: any) {
      setError(err?.message || 'Server connection failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4FFF8] via-white to-[#DDF7E8]/40 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      
      {/* Decorative ambient glass spheres */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#19A66A]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#19A66A]/15 blur-3xl pointer-events-none" />

      {/* Back button */}
      <div className="w-full max-w-md mb-4 flex justify-between items-center z-10">
        <button
          onClick={onBackHome}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white border border-[#19A66A]/20 text-xs font-semibold text-[#123B2A] transition-all shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#19A66A]" />
          <span>Back to School Markaz</span>
        </button>
        <span className="text-[11px] font-semibold text-[#123B2A]/60 bg-[#DDF7E8]/60 px-2.5 py-1 rounded-full border border-[#19A66A]/20">
          SSL Encrypted 256-Bit
        </span>
      </div>

      {/* Main Glass Card */}
      <div className="w-full max-w-md bg-white/85 backdrop-blur-xl border border-[#19A66A]/25 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10">
        
        {/* Header with Icon */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#19A66A] to-[#123B2A] text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#19A66A]/25 overflow-hidden">
            {settings.logo ? (
              <img src={settings.logo} alt={settings.schoolName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <GraduationCap className="w-8 h-8" />
            )}
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DDF7E8] text-[#123B2A] text-[11px] font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#19A66A]" />
            {settings.dashboardBranding || 'Restricted Admin Console'}
          </div>
          <h1 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
            {settings.schoolName}
          </h1>
          <p className="text-xs text-[#123B2A]/70 mt-1">
            Sign in with verified institutional credentials to access the management portal.
          </p>
        </div>

        {/* Error Notice */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="leading-tight">{error}</div>
          </div>
        )}

        {/* Success Notice */}
        {isSuccess ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#19A66A] mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-[#123B2A]">Welcome, Mharryjs!</h3>
            <p className="text-xs text-emerald-700 font-medium">
              Administrative token authenticated. Loading School Markaz console...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#123B2A] mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@schoolmarkaz.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-xs font-medium text-[#123B2A] focus:outline-none focus:border-[#19A66A] focus:ring-2 focus:ring-[#19A66A]/20 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#123B2A]">
                  Admin Password
                </label>
                <span className="text-[11px] text-[#19A66A] font-semibold">
                  Secure Server Auth
                </span>
              </div>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-2.5 pr-11 rounded-xl bg-white/70 backdrop-blur-sm border border-[#19A66A]/30 text-xs font-medium text-[#123B2A] focus:outline-none focus:border-[#19A66A] focus:ring-2 focus:ring-[#19A66A]/20 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 p-1 text-gray-500 hover:text-[#19A66A] transition-colors cursor-pointer"
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
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#19A66A] to-[#147a4f] hover:from-[#158f5b] hover:to-[#106541] text-white text-xs font-bold shadow-md shadow-[#19A66A]/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Verifying credentials on server...</span>
              ) : (
                <>
                  <span>Sign In As Administrator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <div className="pt-3 border-t border-[#19A66A]/15 text-center">
              <p className="text-[11px] text-[#123B2A]/60">
                Authorized access only for Campus Administrators.
              </p>
              <div className="mt-2 p-2 rounded-lg bg-[#F4FFF8] border border-[#19A66A]/20 text-[10px] text-[#123B2A]/70 flex items-center justify-between">
                <span>Default Admin: <strong>mharryjs123@gmail.com</strong></span>
                <span className="text-emerald-700 font-bold">Encrypted</span>
              </div>
            </div>
          </form>
        )}

      </div>

      <div className="text-center mt-6 text-xs text-[#123B2A]/50 z-10">
        © 2026 School Markaz • Enterprise Cloud Infrastructure
      </div>
    </div>
  );
};
