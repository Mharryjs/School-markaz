import React, { useState } from 'react';
import {
  Shield,
  User,
  Mail,
  Phone,
  Building,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  Lock,
  Save,
  Check,
  Clock,
  FileCheck,
  AlertCircle,
  GraduationCap
} from 'lucide-react';
import { AdminUser } from '../../types';

interface AdminProfileTabProps {
  adminUser: AdminUser;
  showToast: (msg: string) => void;
  onUpdateAdminUser: (updatedUser: Partial<AdminUser>) => void;
}

export const AdminProfileTab: React.FC<AdminProfileTabProps> = ({
  adminUser,
  showToast,
  onUpdateAdminUser,
}) => {
  // Editable profile information
  const [displayName, setDisplayName] = useState(adminUser.displayName || 'Mharryjs');
  const [email, setEmail] = useState(adminUser.email || 'mharryjs123@gmail.com');
  const [phone, setPhone] = useState('+92 300 9876543');
  const [designation, setDesignation] = useState('Super Administrator & Campus Principal');
  const [institution, setInstitution] = useState('Al-Hadi Science & Arts Model Academy');
  const [officeRoom, setOfficeRoom] = useState('Executive Wing, Block A - Chamber 101');
  const [joinedDate] = useState('15 August 2021');

  // Password Security Form with Eye toggles
  const [currentPassword, setCurrentPassword] = useState('Mharryjs123))@');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle Profile Details Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim() || !email.trim()) {
      showToast('Name and email cannot be empty');
      return;
    }
    onUpdateAdminUser({ displayName: displayName.trim(), email: email.trim() });
    showToast('Administrator profile details updated successfully');
  };

  // Handle Password Change with Eye Icon toggles
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      showToast('Please enter your current password');
      return;
    }
    if (!newPassword || newPassword.length < 8) {
      showToast('New password must be at least 8 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match. Please verify.');
      return;
    }

    setCurrentPassword(newPassword);
    setNewPassword('');
    setConfirmPassword('');
    showToast('Password changed successfully! Encryption key updated.');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDF7E8] text-[#123B2A] text-xs font-bold uppercase tracking-wider mb-2">
          <Shield className="w-3.5 h-3.5 text-[#19A66A]" />
          <span>Security & Profile Governance</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-[#123B2A]">
          Administrator Profile & Credentials
        </h1>
        <p className="text-xs sm:text-sm text-[#123B2A]/70 mt-0.5">
          Manage master administrative credentials, contact endpoints, and system role authorization.
        </p>
      </div>

      {/* Hero Profile Glass Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_0_rgba(25,166,106,0.06)] relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Avatar with Status Ring */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#19A66A] to-emerald-400 text-white font-extrabold text-3xl flex items-center justify-center shadow-lg shadow-[#19A66A]/25">
              {displayName.charAt(0).toUpperCase() || 'M'}
            </div>
            <span
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow-xs"
              title="Online Active Session"
            />
          </div>

          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
              <h2 className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                {displayName}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#DDF7E8] text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider">
                Super Admin
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">
                2FA Verified
              </span>
            </div>

            <p className="text-xs font-semibold text-[#19A66A]">
              {designation}
            </p>
            <p className="text-xs text-[#123B2A]/70 mt-0.5">
              {institution} • Registered Member Since {joinedDate}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 pt-3 border-t border-[#19A66A]/15 text-xs text-[#123B2A]/80">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#19A66A]" />
                {email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#19A66A]" />
                {phone}
              </span>
              <span className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#19A66A]" />
                {officeRoom}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Editable Profile Information */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_0_rgba(25,166,106,0.06)] space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#19A66A]/15">
            <User className="w-4 h-4 text-[#19A66A]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#123B2A]">
              Administrator Personal Details
            </h3>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#123B2A] mb-1">
                Display Name <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none focus:border-[#19A66A]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#123B2A] mb-1">
                Official Email Address <span className="text-rose-600">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none focus:border-[#19A66A]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#123B2A] mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-[#123B2A] mb-1">Designation</label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#123B2A] mb-1">Campus Institution Name</label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-[#123B2A] mb-1">Office Room / Wing</label>
              <input
                type="text"
                value={officeRoom}
                onChange={(e) => setOfficeRoom(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Details</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Password & Security with Eye Icons */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_0_rgba(25,166,106,0.06)] space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#19A66A]/15">
            <KeyRound className="w-4 h-4 text-[#19A66A]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#123B2A]">
              Security & Password Management
            </h3>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
            {/* Current Password with Eye */}
            <div>
              <label className="block font-bold text-[#123B2A] mb-1">
                Current Password <span className="text-rose-600">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current master password"
                  className="w-full px-3.5 py-2.5 pr-11 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none focus:border-[#19A66A]"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 p-1 text-gray-500 hover:text-[#19A66A] transition-colors cursor-pointer"
                  title={showCurrentPassword ? 'Hide password' : 'Show password'}
                  aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password with Eye */}
            <div>
              <label className="block font-bold text-[#123B2A] mb-1">
                New Secure Password <span className="text-rose-600">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new 8+ character password"
                  className="w-full px-3.5 py-2.5 pr-11 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none focus:border-[#19A66A]"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 p-1 text-gray-500 hover:text-[#19A66A] transition-colors cursor-pointer"
                  title={showNewPassword ? 'Hide password' : 'Show password'}
                  aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                >
                  {showNewPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password with Eye */}
            <div>
              <label className="block font-bold text-[#123B2A] mb-1">
                Confirm New Password <span className="text-rose-600">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full px-3.5 py-2.5 pr-11 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none focus:border-[#19A66A]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 p-1 text-gray-500 hover:text-[#19A66A] transition-colors cursor-pointer"
                  title={showConfirmPassword ? 'Hide password' : 'Show password'}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#F4FFF8] border border-[#19A66A]/20 text-[11px] text-[#123B2A]/70 space-y-1">
              <div className="font-bold text-[#123B2A]">Password Guidelines:</div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-[#19A66A]" /> Minimum 8 alphanumeric characters
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-[#19A66A]" /> Use mix of uppercase letters & numbers
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#123B2A] hover:bg-[#19A66A] text-white font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Update Admin Password</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_0_rgba(25,166,106,0.06)]">
        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-[#19A66A]/15">
          <Shield className="w-4 h-4 text-[#19A66A]" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#123B2A]">
            Authorized System Modules & Privileges
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
          {[
            'New Admissions Portal',
            'Student Bio-Data Register',
            'Faculty Payroll & Disbursal',
            '3-Copy Fee Bank Challans',
            'Detailed Marks Certificate (DMC)',
            'Daily Attendance & Roll Call',
            'Income & Expense Ledger',
            'Stationery & Uniform POS',
            'Institutional Board Reports',
            'Website Demo Inquiries',
            'SMS Notification Gateway',
            'Institutional Global Config',
          ].map((mod, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-white/80 border border-[#19A66A]/20 flex items-center justify-between"
            >
              <span className="font-semibold text-[#123B2A]">{mod}</span>
              <CheckCircle2 className="w-4 h-4 text-[#19A66A] shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
