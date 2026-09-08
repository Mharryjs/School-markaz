import React, { useState, useRef } from 'react';
import {
  Building2,
  Image as ImageIcon,
  Palette,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Upload,
  Trash2,
  Eye,
  RefreshCw,
  Users,
  GraduationCap,
  CalendarCheck,
  CreditCard,
  Award,
  Banknote,
  TrendingUp,
  Package,
  FileText,
  Shield,
  HelpCircle,
  Sparkles,
  Check,
  X,
  Phone,
  Mail,
  Globe,
  MapPin,
  Compass,
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { SchoolSettings } from '../../types';

interface SchoolSettingsTabProps {
  showToast: (msg: string) => void;
}

export const SchoolSettingsTab: React.FC<SchoolSettingsTabProps> = ({ showToast }) => {
  const {
    settings,
    updateSettings,
    uploadLogo,
    removeLogo,
    stats,
    isDemoDataActive,
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
  } = useSchool();

  // Sub-navigation inside School Settings
  const [activeSubTab, setActiveSubTab] = useState<'info' | 'logo' | 'appearance' | 'reset'>('info');

  // Local form state for School Info
  const [formData, setFormData] = useState<SchoolSettings>({ ...settings });

  // Confirmation Modal state for Master Reset
  const [isResetAllModalOpen, setIsResetAllModalOpen] = useState(false);

  // Single module confirmation modal state
  const [moduleToReset, setModuleToReset] = useState<{
    id: string;
    title: string;
    desc: string;
    count: number;
    action: () => void;
  } | null>(null);

  // File input ref for logo upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoUrlInput, setLogoUrlInput] = useState('');

  // Handle input changes
  const handleChange = (field: keyof SchoolSettings, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Save Info
  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    showToast(`✓ School information saved. Updated to "${formData.schoolName}" across system.`);
  };

  // Handle File Upload for Logo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('Logo file size must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          uploadLogo(reader.result);
          setFormData((prev) => ({ ...prev, logo: reader.result as string, logoType: 'image' }));
          showToast('✓ School logo updated and applied across all views.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Logo URL apply
  const handleApplyLogoUrl = () => {
    if (!logoUrlInput.trim()) return;
    uploadLogo(logoUrlInput.trim());
    setFormData((prev) => ({ ...prev, logo: logoUrlInput.trim(), logoType: 'image' }));
    setLogoUrlInput('');
    showToast('✓ School logo updated from URL.');
  };

  // Handle Remove Logo
  const handleRemoveLogo = () => {
    removeLogo();
    setFormData((prev) => ({ ...prev, logo: '', logoType: 'emoji' }));
    showToast('✓ Custom logo removed. Reverted to default crest.');
  };

  // Confirm and execute Master Reset
  const handleConfirmResetAll = () => {
    resetAllSchoolData();
    setIsResetAllModalOpen(false);
    showToast('✓ School data reset successfully. All records zeroed.');
  };

  // Confirm and execute single module reset
  const handleConfirmModuleReset = () => {
    if (moduleToReset) {
      moduleToReset.action();
      showToast(`✓ ${moduleToReset.title} reset to 0 successfully.`);
      setModuleToReset(null);
    }
  };

  // Handle Load Demo Data
  const handleLoadDemo = () => {
    loadDemoData();
    showToast('✓ Demo data restored with 1,250 students, 85 teachers & financial records.');
  };

  // Preset Colors
  const primaryPresets = [
    { name: 'Emerald Green (Default)', hex: '#19A66A' },
    { name: 'Teal Academy', hex: '#0D9488' },
    { name: 'Royal Navy', hex: '#1E40AF' },
    { name: 'Imperial Indigo', hex: '#4F46E5' },
    { name: 'Amber Gold', hex: '#D97706' },
  ];

  const secondaryPresets = [
    { name: 'Deep Forest (Default)', hex: '#123B2A' },
    { name: 'Dark Slate', hex: '#0F172A' },
    { name: 'Deep Navy', hex: '#1E1B4B' },
    { name: 'Rich Charcoal', hex: '#111827' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-[#123B2A]">
            School Settings & Control Center
          </h1>
          <p className="text-xs sm:text-sm text-[#123B2A]/70">
            Centrally manage institutional identity, official logo, theme appearance, and live data resets.
          </p>
        </div>

        {/* Quick Mode Indicator & Actions */}
        <div className="flex items-center gap-2">
          {isDemoDataActive ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100/90 text-emerald-900 border border-[#19A66A]/30 text-xs font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Demo School Active
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100/90 text-amber-900 border border-amber-300 text-xs font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Empty School (0 Records)
            </span>
          )}

          <button
            type="button"
            onClick={() => setActiveSubTab('reset')}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Hub</span>
          </button>
        </div>
      </div>

      {/* Transparent Glassmorphism Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/60 backdrop-blur-md border border-[#19A66A]/20 overflow-x-auto">
        {[
          { id: 'info', label: '1. School Information', icon: Building2 },
          { id: 'logo', label: '2. School Logo & Crest', icon: ImageIcon },
          { id: 'appearance', label: '3. School Appearance', icon: Palette },
          { id: 'reset', label: '4. Reset School Data', icon: RotateCcw, highlight: true },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#19A66A] text-white shadow-md shadow-[#19A66A]/20'
                  : tab.highlight
                  ? 'bg-rose-50/80 text-rose-700 hover:bg-rose-100 border border-rose-200/60'
                  : 'text-[#123B2A]/70 hover:bg-white hover:text-[#123B2A]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================= */}
      {/* 1. SCHOOL INFORMATION TAB */}
      {/* ============================================================= */}
      {activeSubTab === 'info' && (
        <form onSubmit={handleSaveInfo} className="space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#19A66A]/25 bg-white/80 backdrop-blur-xl shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b border-[#19A66A]/15 pb-4">
              <div>
                <h2 className="text-lg font-bold font-['Outfit'] text-[#123B2A] flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#19A66A]" />
                  <span>Institutional Credentials & Bio</span>
                </h2>
                <p className="text-xs text-[#123B2A]/60 mt-0.5">
                  Updates to school name, address, and credentials dynamically propagate to all headers, sidebars, printouts, and reports.
                </p>
              </div>
              <button
                type="submit"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Information</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
              {/* School Name */}
              <div className="sm:col-span-2">
                <label className="block font-bold text-[#123B2A] mb-1.5">
                  School Name <span className="text-rose-500">*</span>
                  <span className="font-normal text-[#123B2A]/60 ml-2">(Updates everywhere)</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.schoolName}
                  onChange={(e) => handleChange('schoolName', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#19A66A]/30"
                  placeholder="e.g. Al-Hadi Science & Arts Model Academy"
                />
              </div>

              {/* Campus Code */}
              <div>
                <label className="block font-bold text-[#123B2A] mb-1.5">Campus Code</label>
                <input
                  type="text"
                  value={formData.campusCode}
                  onChange={(e) => handleChange('campusCode', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none focus:ring-2 focus:ring-[#19A66A]/30"
                  placeholder="e.g. CAMPUS-01-MAIN"
                />
              </div>

              {/* Principal Name */}
              <div>
                <label className="block font-bold text-[#123B2A] mb-1.5">Principal / Headmaster Name</label>
                <input
                  type="text"
                  value={formData.principalName}
                  onChange={(e) => handleChange('principalName', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none focus:ring-2 focus:ring-[#19A66A]/30"
                  placeholder="e.g. Prof. Tariq Jamil Hashmi"
                />
              </div>

              {/* Academic Session */}
              <div>
                <label className="block font-bold text-[#123B2A] mb-1.5">Active Academic Session</label>
                <input
                  type="text"
                  value={formData.academicSession}
                  onChange={(e) => handleChange('academicSession', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none focus:ring-2 focus:ring-[#19A66A]/30"
                  placeholder="e.g. 2026 - 2027"
                />
              </div>

              {/* Government Registration Number */}
              <div>
                <label className="block font-bold text-[#123B2A] mb-1.5">Board / Govt Registration #</label>
                <input
                  type="text"
                  value={formData.registrationNo}
                  onChange={(e) => handleChange('registrationNo', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none focus:ring-2 focus:ring-[#19A66A]/30"
                  placeholder="e.g. 4482-ED / ICT"
                />
              </div>

              {/* Official Phone */}
              <div>
                <label className="block font-bold text-[#123B2A] mb-1.5">
                  Official Contact Phone / Landline
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none focus:ring-2 focus:ring-[#19A66A]/30"
                    placeholder="+92 51 9283741"
                  />
                  <Phone className="w-4 h-4 text-[#19A66A] absolute left-3 top-3" />
                </div>
              </div>

              {/* Official Email */}
              <div>
                <label className="block font-bold text-[#123B2A] mb-1.5">Official Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none focus:ring-2 focus:ring-[#19A66A]/30"
                    placeholder="admissions@school.edu.pk"
                  />
                  <Mail className="w-4 h-4 text-[#19A66A] absolute left-3 top-3" />
                </div>
              </div>

              {/* Website */}
              <div>
                <label className="block font-bold text-[#123B2A] mb-1.5">School Official Website</label>
                <div className="relative">
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none focus:ring-2 focus:ring-[#19A66A]/30"
                    placeholder="https://myschool.edu.pk"
                  />
                  <Globe className="w-4 h-4 text-[#19A66A] absolute left-3 top-3" />
                </div>
              </div>

              {/* School Motto */}
              <div className="sm:col-span-2">
                <label className="block font-bold text-[#123B2A] mb-1.5">
                  School Motto / Slogan
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.motto}
                    onChange={(e) => handleChange('motto', e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none focus:ring-2 focus:ring-[#19A66A]/30"
                    placeholder="e.g. Knowledge, Discipline, Faith & Excellence"
                  />
                  <Compass className="w-4 h-4 text-[#19A66A] absolute left-3 top-3" />
                </div>
              </div>

              {/* Complete Address */}
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block font-bold text-[#123B2A] mb-1.5">
                  Campus Physical Address (Printed on challans & certificates)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/90 border border-[#19A66A]/30 text-[#123B2A] font-medium focus:outline-none focus:ring-2 focus:ring-[#19A66A]/30"
                    placeholder="e.g. Plot 42, Education Boulevard, Sector H-8/4, Islamabad"
                  />
                  <MapPin className="w-4 h-4 text-[#19A66A] absolute left-3 top-3" />
                </div>
              </div>
            </div>

            {/* Live Synchronized Preview Pill */}
            <div className="p-4 rounded-2xl bg-[#F4FFF8] border border-[#19A66A]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#19A66A] to-[#123B2A] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  {formData.logo ? (
                    <img
                      src={formData.logo}
                      alt="Logo"
                      className="w-full h-full object-cover rounded-xl"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    '🎓'
                  )}
                </div>
                <div>
                  <div className="font-bold text-sm text-[#123B2A]">{formData.schoolName}</div>
                  <div className="text-[11px] text-[#123B2A]/70">
                    {formData.campusCode} • {formData.academicSession} • "{formData.motto}"
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 shrink-0">
                ✓ Live Preview Synced
              </span>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white text-xs font-bold transition-all shadow-md shadow-[#19A66A]/25 cursor-pointer flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Save All School Information</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ============================================================= */}
      {/* 2. SCHOOL LOGO MANAGEMENT TAB */}
      {/* ============================================================= */}
      {activeSubTab === 'logo' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#19A66A]/25 bg-white/80 backdrop-blur-xl shadow-lg space-y-6">
            <div className="border-b border-[#19A66A]/15 pb-4">
              <h2 className="text-lg font-bold font-['Outfit'] text-[#123B2A] flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#19A66A]" />
                <span>Official Institutional Logo & Crest</span>
              </h2>
              <p className="text-xs text-[#123B2A]/60 mt-0.5">
                Upload your school's graphic emblem. It will instantly replace the default crest across the navbar, login gates, fee challans, DMC cards, and reports.
              </p>
            </div>

            {/* Logo Preview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Active Logo Visual Box */}
              <div className="glass-card rounded-2xl p-6 border border-[#19A66A]/20 bg-white flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-[#123B2A]/60 uppercase tracking-wider mb-4">
                  Current Active Emblem
                </span>

                <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-[#19A66A] to-[#123B2A] p-1 flex items-center justify-center shadow-xl shadow-[#19A66A]/20 relative overflow-hidden group">
                  {settings.logo ? (
                    <img
                      src={settings.logo}
                      alt={settings.schoolName}
                      className="w-full h-full object-cover rounded-2xl bg-white"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full rounded-2xl bg-[#19A66A]/20 backdrop-blur-sm flex items-center justify-center text-5xl">
                      🎓
                    </div>
                  )}
                </div>

                <div className="mt-4 font-bold text-xs text-[#123B2A]">
                  {settings.logo ? 'Custom Logo Uploaded' : 'Default Academy Crest'}
                </div>
                <div className="text-[11px] text-[#123B2A]/60 mt-0.5">
                  {settings.schoolName}
                </div>

                {settings.logo && (
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="mt-4 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Logo</span>
                  </button>
                )}
              </div>

              {/* Upload Controls */}
              <div className="md:col-span-2 space-y-4">
                {/* File Upload Zone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#19A66A]/40 hover:border-[#19A66A] rounded-2xl p-6 sm:p-8 bg-[#F4FFF8]/50 hover:bg-[#F4FFF8] transition-all flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/svg+xml, image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div className="w-12 h-12 rounded-2xl bg-white text-[#19A66A] shadow-md flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-bold text-[#123B2A]">
                    Click to Upload School Logo
                  </div>
                  <p className="text-xs text-[#123B2A]/60 mt-1 max-w-sm">
                    Supports PNG, JPG, SVG or WEBP (Max 2MB). Transparent background works best.
                  </p>
                  <span className="mt-3 px-3 py-1 rounded-full bg-white text-[#19A66A] border border-[#19A66A]/20 text-[11px] font-bold shadow-xs">
                    Browse Computer Files
                  </span>
                </div>

                {/* Or Enter Web Image URL */}
                <div className="p-4 rounded-2xl bg-white border border-[#19A66A]/20">
                  <label className="block text-xs font-bold text-[#123B2A] mb-1.5">
                    Or Enter Public Image / Logo URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://example.com/logo.png"
                      value={logoUrlInput}
                      onChange={(e) => setLogoUrlInput(e.target.value)}
                      className="flex-1 px-3.5 py-2 rounded-xl bg-gray-50 border border-[#19A66A]/30 text-xs text-[#123B2A] focus:outline-none focus:ring-2 focus:ring-[#19A66A]/30"
                    />
                    <button
                      type="button"
                      onClick={handleApplyLogoUrl}
                      disabled={!logoUrlInput.trim()}
                      className="px-4 py-2 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      Apply URL
                    </button>
                  </div>
                </div>

                {/* Transparent Glassmorphism Multi-Context Preview */}
                <div className="p-4 rounded-2xl bg-white/70 border border-[#19A66A]/20">
                  <div className="text-xs font-bold text-[#123B2A] mb-2 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#19A66A]" />
                    <span>Cross-System Appearance Preview</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px]">
                    {/* Light Glass Navbar Preview */}
                    <div className="p-2.5 rounded-xl bg-white/90 border border-[#19A66A]/20 flex items-center gap-2 shadow-xs">
                      <div className="w-6 h-6 rounded-lg bg-[#19A66A] text-white flex items-center justify-center font-bold text-xs overflow-hidden">
                        {settings.logo ? (
                          <img src={settings.logo} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          '🎓'
                        )}
                      </div>
                      <span className="font-bold truncate text-[#123B2A]">{settings.schoolName}</span>
                    </div>

                    {/* Dark Card Preview */}
                    <div className="p-2.5 rounded-xl bg-[#123B2A] text-white flex items-center gap-2 shadow-xs">
                      <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center font-bold text-xs overflow-hidden">
                        {settings.logo ? (
                          <img src={settings.logo} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          '🎓'
                        )}
                      </div>
                      <span className="font-bold truncate text-white">{settings.schoolName}</span>
                    </div>

                    {/* Printable Challan Stamp Preview */}
                    <div className="p-2.5 rounded-xl bg-[#F4FFF8] border border-[#19A66A]/30 flex items-center gap-2 shadow-xs">
                      <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs overflow-hidden">
                        {settings.logo ? (
                          <img src={settings.logo} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          '🎓'
                        )}
                      </div>
                      <span className="font-bold text-[#19A66A] truncate">Fee Challan</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* 3. SCHOOL APPEARANCE & BRANDING TAB */}
      {/* ============================================================= */}
      {activeSubTab === 'appearance' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#19A66A]/25 bg-white/80 backdrop-blur-xl shadow-lg space-y-6">
            <div className="border-b border-[#19A66A]/15 pb-4">
              <h2 className="text-lg font-bold font-['Outfit'] text-[#123B2A] flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#19A66A]" />
                <span>Visual Appearance & Theme Palette</span>
              </h2>
              <p className="text-xs text-[#123B2A]/60 mt-0.5">
                Customize palette accents, glass opacity, and dashboard branding while preserving the high-contrast light green transparent glassmorphism design.
              </p>
            </div>

            {/* Primary Theme Colors */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#123B2A] mb-2">
                  Primary Accent Color (Current: {settings.primaryColor})
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {primaryPresets.map((color) => {
                    const isSelected = settings.primaryColor.toLowerCase() === color.hex.toLowerCase();
                    return (
                      <button
                        key={color.hex}
                        type="button"
                        onClick={() => {
                          updateSettings({ primaryColor: color.hex });
                          showToast(`Primary color updated to ${color.name}`);
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#19A66A] ring-2 ring-[#19A66A]/30 bg-white shadow-sm'
                            : 'border-[#19A66A]/20 bg-white/60 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div
                            className="w-6 h-6 rounded-xl shadow-xs"
                            style={{ backgroundColor: color.hex }}
                          />
                          {isSelected && <Check className="w-4 h-4 text-[#19A66A]" />}
                        </div>
                        <span className="text-[11px] font-bold text-[#123B2A] leading-tight">
                          {color.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Secondary Contrast Color */}
              <div>
                <label className="block text-xs font-bold text-[#123B2A] mb-2">
                  Secondary Dark Neutral (Current: {settings.secondaryColor})
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {secondaryPresets.map((color) => {
                    const isSelected = settings.secondaryColor.toLowerCase() === color.hex.toLowerCase();
                    return (
                      <button
                        key={color.hex}
                        type="button"
                        onClick={() => {
                          updateSettings({ secondaryColor: color.hex });
                          showToast(`Secondary neutral updated to ${color.name}`);
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#19A66A] ring-2 ring-[#19A66A]/30 bg-white shadow-sm'
                            : 'border-[#19A66A]/20 bg-white/60 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div
                            className="w-6 h-6 rounded-xl shadow-xs"
                            style={{ backgroundColor: color.hex }}
                          />
                          {isSelected && <Check className="w-4 h-4 text-[#19A66A]" />}
                        </div>
                        <span className="text-[11px] font-bold text-[#123B2A] leading-tight">
                          {color.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Appearance Mode */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-[#123B2A] mb-2">
                  Appearance Architecture
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'glass',
                      title: 'Transparent Glassmorphism (Default)',
                      desc: 'Translucent mint blur, soft borders & organic glow',
                    },
                    {
                      id: 'light',
                      title: 'Crisp Solid Light',
                      desc: 'High-contrast white card borders with crisp shadows',
                    },
                    {
                      id: 'dark',
                      title: 'Executive Midnight Slate',
                      desc: 'Darkened administrative canvas with emerald accents',
                    },
                  ].map((mode) => {
                    const isSelected = settings.appearanceMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => {
                          updateSettings({ appearanceMode: mode.id as any });
                          showToast(`Appearance mode set to ${mode.title}`);
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#19A66A] ring-2 ring-[#19A66A]/30 bg-[#F4FFF8] shadow-sm'
                            : 'border-[#19A66A]/20 bg-white hover:bg-[#F4FFF8]/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-[#123B2A]">{mode.title}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#19A66A]" />}
                        </div>
                        <p className="text-[11px] text-[#123B2A]/60 leading-relaxed">{mode.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar Style */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-[#123B2A] mb-2">
                  Sidebar Visual Style
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'glass',
                      title: 'Frosted Translucent Glass',
                      desc: 'Backdrop blur 16px with subtle emerald border',
                    },
                    {
                      id: 'solid',
                      title: 'Solid Pure White',
                      desc: 'Clean opaque white background for bright environments',
                    },
                    {
                      id: 'minimal',
                      title: 'Minimal Borderless',
                      desc: 'Modern borderless layout with generous padding',
                    },
                  ].map((style) => {
                    const isSelected = settings.sidebarAppearance === style.id;
                    return (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => {
                          updateSettings({ sidebarAppearance: style.id as any });
                          showToast(`Sidebar style updated to ${style.title}`);
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#19A66A] ring-2 ring-[#19A66A]/30 bg-[#F4FFF8] shadow-sm'
                            : 'border-[#19A66A]/20 bg-white hover:bg-[#F4FFF8]/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-[#123B2A]">{style.title}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#19A66A]" />}
                        </div>
                        <p className="text-[11px] text-[#123B2A]/60 leading-relaxed">{style.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dashboard Sub-Branding Title */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-[#123B2A] mb-1.5">
                  Dashboard Sub-Branding Tagline
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={settings.dashboardBranding}
                    onChange={(e) => updateSettings({ dashboardBranding: e.target.value })}
                    className="max-w-md w-full px-3.5 py-2 rounded-xl bg-white border border-[#19A66A]/30 text-xs text-[#123B2A] focus:outline-none focus:ring-2 focus:ring-[#19A66A]/30"
                    placeholder="e.g. Enterprise Campus Edition"
                  />
                  <button
                    type="button"
                    onClick={() => showToast('Branding tagline saved')}
                    className="px-4 py-2 rounded-xl bg-[#19A66A] hover:bg-[#158f5b] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* 4. DEDICATED RESET SCHOOL DATA SECTION */}
      {/* ============================================================= */}
      {activeSubTab === 'reset' && (
        <div className="space-y-6">
          {/* Main Master Reset Control Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-rose-300/80 bg-white/90 backdrop-blur-xl shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-200 pb-5">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 shadow-sm">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold font-['Outfit'] text-rose-900">
                    Institutional Data & Statistics Reset
                  </h2>
                  <p className="text-xs text-rose-800/80 mt-1 max-w-2xl leading-relaxed">
                    Clear all sample/demo records to start fresh with a clean school (zero records), or restore demo data anytime with 1-click for testing.
                  </p>
                </div>
              </div>

              {/* Master Actions */}
              <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
                <button
                  type="button"
                  onClick={handleLoadDemo}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  title="Restore realistic demo data for testing"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Load Demo Data</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsResetAllModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold transition-all shadow-md shadow-rose-600/30 flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>RESET ALL SCHOOL DATA</span>
                </button>
              </div>
            </div>

            {/* Admin Security Guarantee Notice */}
            <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-xs text-[#123B2A] flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#19A66A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-900 block font-bold mb-0.5">
                  CRITICAL ADMIN ACCOUNT SAFETY RULE
                </strong>
                <p className="text-emerald-800 leading-relaxed text-[11px]">
                  Resetting school data will <strong>NEVER</strong> delete your Administrator account (email: <strong>{settings.email || 'mharryjs123@gmail.com'}</strong>), role permissions, or system credentials. Your admin session remains fully active so you can register fresh real students and staff immediately.
                </p>
              </div>
            </div>

            {/* Live Zero State Overview Pills */}
            <div className="p-4 rounded-2xl bg-[#F4FFF8] border border-[#19A66A]/20">
              <div className="text-xs font-bold text-[#123B2A] uppercase tracking-wider mb-3">
                Live Data Status After Master Reset (All Set to 0):
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 text-xs text-center">
                <div className="p-2.5 rounded-xl bg-white border border-[#19A66A]/20">
                  <span className="text-[#123B2A]/60 block text-[10px]">Total Students</span>
                  <strong className="text-base text-[#123B2A] font-extrabold font-['Outfit']">
                    {stats.totalStudents}
                  </strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#19A66A]/20">
                  <span className="text-[#123B2A]/60 block text-[10px]">Total Teachers</span>
                  <strong className="text-base text-[#123B2A] font-extrabold font-['Outfit']">
                    {stats.totalTeachers}
                  </strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#19A66A]/20">
                  <span className="text-[#123B2A]/60 block text-[10px]">Total Staff</span>
                  <strong className="text-base text-[#123B2A] font-extrabold font-['Outfit']">
                    {stats.totalStaff}
                  </strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#19A66A]/20">
                  <span className="text-[#123B2A]/60 block text-[10px]">Present / Absent</span>
                  <strong className="text-base text-emerald-700 font-extrabold font-['Outfit']">
                    {stats.presentTodayCount} / {stats.absentTodayCount}
                  </strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#19A66A]/20">
                  <span className="text-[#123B2A]/60 block text-[10px]">Pending Fees</span>
                  <strong className="text-base text-amber-700 font-extrabold font-['Outfit']">
                    Rs. {stats.pendingFeesAmount.toLocaleString()}
                  </strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#19A66A]/20">
                  <span className="text-[#123B2A]/60 block text-[10px]">Active Exams</span>
                  <strong className="text-base text-[#19A66A] font-extrabold font-['Outfit']">
                    {stats.activeExamsCount}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Granular Module-by-Module Reset Options (12 Dedicated Modules) */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#19A66A]/25 bg-white/80 backdrop-blur-xl shadow-lg space-y-5">
            <div>
              <h3 className="text-base font-bold font-['Outfit'] text-[#123B2A] flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#19A66A]" />
                <span>Individual Module Reset Controls</span>
              </h3>
              <p className="text-xs text-[#123B2A]/60 mt-0.5">
                Target specific modules to clear data without wiping other school records.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  id: 'students',
                  title: 'Reset Students',
                  desc: 'Clears student roster, enrollment bio-data, and parent contacts.',
                  count: stats.totalStudents,
                  unit: 'students',
                  icon: GraduationCap,
                  action: resetStudents,
                },
                {
                  id: 'teachers',
                  title: 'Reset Teachers',
                  desc: 'Removes faculty roster, assigned subjects, and qualifications.',
                  count: stats.totalTeachers,
                  unit: 'teachers',
                  icon: Users,
                  action: resetTeachers,
                },
                {
                  id: 'staff',
                  title: 'Reset Staff',
                  desc: 'Zeroes non-teaching staff, administration, and support crew.',
                  count: stats.totalStaff,
                  unit: 'staff members',
                  icon: Building2,
                  action: resetStaff,
                },
                {
                  id: 'attendance',
                  title: 'Reset Attendance',
                  desc: 'Clears daily 30-sec roll call attendance sheet & stats.',
                  count: stats.presentTodayCount + stats.absentTodayCount,
                  unit: 'roll calls',
                  icon: CalendarCheck,
                  action: resetAttendance,
                },
                {
                  id: 'fees',
                  title: 'Reset Fees',
                  desc: 'Clears 3-copy fee challans, paid vouchers, and arrears.',
                  count: stats.pendingChallansCount,
                  unit: 'challans',
                  icon: CreditCard,
                  action: resetFees,
                },
                {
                  id: 'exams',
                  title: 'Reset Exams',
                  desc: 'Clears examination results, grade distributions, and DMC cards.',
                  count: stats.activeExamsCount,
                  unit: 'exam sets',
                  icon: Award,
                  action: resetExams,
                },
                {
                  id: 'payroll',
                  title: 'Reset Payroll',
                  desc: 'Clears monthly faculty salary disbursement registers and pay slips.',
                  count: stats.totalTeachers,
                  unit: 'pay slips',
                  icon: Banknote,
                  action: resetPayroll,
                },
                {
                  id: 'income',
                  title: 'Reset Income',
                  desc: 'Zeroes revenue vouchers, student fees, and stationery sales.',
                  count: stats.totalIncome,
                  unit: 'Rs.',
                  icon: TrendingUp,
                  action: resetIncome,
                },
                {
                  id: 'expenses',
                  title: 'Reset Expenses',
                  desc: 'Zeroes campus operational bills, utility vouchers, and vendor pay.',
                  count: stats.totalExpenses,
                  unit: 'Rs.',
                  icon: TrendingUp,
                  action: resetExpenses,
                },
                {
                  id: 'stationery',
                  title: 'Reset Stationery',
                  desc: 'Empties stationery inventory, uniform stock, and POS registers.',
                  count: stats.totalStationeryItems,
                  unit: 'items',
                  icon: Package,
                  action: resetStationery,
                },
                {
                  id: 'reports',
                  title: 'Reset Reports',
                  desc: 'Removes pre-generated PDF audit sheets and Excel exports.',
                  count: 4,
                  unit: 'documents',
                  icon: FileText,
                  action: resetReports,
                },
                {
                  id: 'login-activity',
                  title: 'Reset Login Activity',
                  desc: 'Clears historical login audit trail, IP traces, and security logs.',
                  count: 4,
                  unit: 'audit logs',
                  icon: Shield,
                  action: resetLoginActivity,
                },
              ].map((mod) => {
                const Icon = mod.icon;
                return (
                  <div
                    key={mod.id}
                    className="p-4 rounded-2xl bg-white border border-[#19A66A]/20 hover:border-rose-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-2 rounded-xl bg-[#F4FFF8] text-[#19A66A]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-[#123B2A]/80">
                          {mod.unit === 'Rs.' ? `Rs. ${mod.count.toLocaleString()}` : `${mod.count} ${mod.unit}`}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold font-['Outfit'] text-[#123B2A]">
                        {mod.title}
                      </h4>
                      <p className="text-[11px] text-[#123B2A]/60 mt-1 leading-relaxed">
                        {mod.desc}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setModuleToReset({
                          id: mod.id,
                          title: mod.title,
                          desc: mod.desc,
                          count: mod.count,
                          action: mod.action,
                        })
                      }
                      className="mt-3 w-full py-1.5 rounded-xl bg-gray-50 hover:bg-rose-50 border border-gray-200 hover:border-rose-200 text-[11px] font-bold text-gray-700 hover:text-rose-700 transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>{mod.title}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* MASTER RESET CONFIRMATION MODAL */}
      {/* ============================================================= */}
      {isResetAllModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#123B2A]/50 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-rose-300">
            <button
              onClick={() => setIsResetAllModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-200">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold font-['Outfit'] text-[#123B2A]">
                Confirm Complete School Data Reset?
              </h3>
              <p className="text-xs text-[#123B2A]/70 mt-2 max-w-md mx-auto leading-relaxed">
                Are you sure you want to reset all school data? This will remove all students, teachers, attendance, fees, exams and other demo records.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 mb-6 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-amber-950">
                <Shield className="w-4 h-4 text-emerald-700" />
                <span>Admin Account Will Remain Fully Safe</span>
              </div>
              <p className="text-[11px] text-amber-800">
                Your Administrator account, login permissions, and school branding will remain untouched. Only operational records will be wiped to 0. You can restore sample data anytime using the "Load Demo Data" button.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsResetAllModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#123B2A] text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmResetAll}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold transition-all shadow-md shadow-rose-600/30 cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Data</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* SINGLE MODULE RESET CONFIRMATION MODAL */}
      {/* ============================================================= */}
      {moduleToReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#123B2A]/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-[#19A66A]/30">
            <button
              onClick={() => setModuleToReset(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-3">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-['Outfit'] text-[#123B2A]">
                Confirm {moduleToReset.title}?
              </h3>
              <p className="text-xs text-[#123B2A]/70 mt-1">
                {moduleToReset.desc} This action will clear all current records for this specific module.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModuleToReset(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#123B2A] text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmModuleReset}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
