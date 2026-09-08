import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, LogIn, Shield, LogOut, LayoutDashboard, GraduationCap } from 'lucide-react';
import { AdminUser, AuthUser } from '../types';
import { useSchool } from '../context/SchoolContext';

interface NavbarProps {
  onOpenLogin: () => void;
  onSelectPackage?: (pkgName: string) => void;
  adminUser?: AdminUser | null;
  currentUser?: AuthUser | null;
  onOpenAdminDashboard?: () => void;
  onOpenDashboard?: (role: string) => void;
  onLogoutAdmin?: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLogin,
  adminUser,
  currentUser,
  onOpenAdminDashboard,
  onOpenDashboard,
  onLogoutAdmin,
  onLogout,
}) => {
  const activeUser = currentUser || adminUser;
  const { settings } = useSchool();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Features', href: '#features' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Apps', href: '#apps' },
    { label: 'Packages', href: '#packages' },
    { label: 'Demo', href: '#video-demo' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FFFFFF]/90 backdrop-blur-md shadow-sm border-b border-[#19A66A]/15 py-3'
          : 'bg-[#FFFFFF]/65 backdrop-blur-md border-b border-[#19A66A]/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2.5 group cursor-pointer"
            id="nav-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#19A66A] to-[#123B2A] flex items-center justify-center text-white text-xl shadow-md shadow-[#19A66A]/20 transition-transform group-hover:scale-105 overflow-hidden">
              {settings.logo ? (
                <img
                  src={settings.logo}
                  alt={settings.schoolName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <GraduationCap className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold font-['Outfit'] tracking-tight text-[#123B2A] flex items-center gap-1.5 line-clamp-1">
                {settings.schoolName}
              </span>
              <span className="hidden sm:block text-[11px] font-medium text-[#19A66A] tracking-wider uppercase">
                {settings.dashboardBranding || 'School Management System'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/50 px-3 py-1.5 rounded-full border border-[#19A66A]/15 shadow-xs">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3.5 py-1.5 text-sm font-medium text-[#123B2A]/80 hover:text-[#19A66A] hover:bg-[#DDF7E8]/60 rounded-full transition-colors"
                id={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {activeUser ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenDashboard) {
                      onOpenDashboard((activeUser as any).role || 'admin');
                    } else if (onOpenAdminDashboard) {
                      onOpenAdminDashboard();
                    }
                  }}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl border transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                    (activeUser as any).role === 'principal'
                      ? 'bg-[#123B2A] text-[#F4D068] border-[#D4AF37]/50 hover:bg-[#0B2317]'
                      : (activeUser as any).role === 'teacher'
                      ? 'bg-teal-600 text-white border-teal-500 hover:bg-teal-700'
                      : (activeUser as any).role === 'student'
                      ? 'bg-blue-600 text-white border-blue-500 hover:bg-blue-700'
                      : 'bg-[#DDF7E8] text-[#123B2A] border-[#19A66A]/30 hover:bg-[#c9f1dc]'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>
                    {(activeUser as any).role === 'principal'
                      ? `Sir (${activeUser.displayName || 'Principal'})`
                      : (activeUser as any).role === 'teacher'
                      ? `Teacher (${activeUser.displayName || 'Faculty'})`
                      : (activeUser as any).role === 'student'
                      ? `Student (${activeUser.displayName || 'Pupil'})`
                      : `Admin (${activeUser.displayName || 'Mharryjs'})`}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={onLogout || onLogoutAdmin}
                  className="p-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl border border-rose-200 transition-all cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                id="nav-login-btn"
                type="button"
                className="px-4 py-2 text-sm font-semibold text-[#123B2A] hover:text-[#19A66A] hover:bg-[#DDF7E8]/60 rounded-xl border border-transparent hover:border-[#19A66A]/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-[#19A66A]" />
                Login
              </button>
            )}

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              id="nav-get-started-btn"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#19A66A] hover:bg-[#158f5b] rounded-xl shadow-sm shadow-[#19A66A]/30 hover:shadow-md hover:shadow-[#19A66A]/40 transition-all flex items-center gap-1.5 group cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            {adminUser ? (
              <button
                onClick={onOpenAdminDashboard}
                className="px-2.5 py-1.5 text-xs font-bold text-[#19A66A] bg-[#DDF7E8] rounded-lg border border-[#19A66A]/30 flex items-center gap-1"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="p-2 text-xs font-semibold text-[#19A66A] bg-[#DDF7E8]/60 rounded-lg border border-[#19A66A]/20 flex items-center gap-1"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            )}
            <button
              type="button"
              id="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#123B2A] hover:text-[#19A66A] hover:bg-[#DDF7E8]/50 rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="sm:hidden px-4 pt-3 pb-6 bg-[#FFFFFF]/95 backdrop-blur-xl border-b border-[#19A66A]/20 shadow-xl space-y-2 mt-2"
        >
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-sm font-medium text-[#123B2A] hover:text-[#19A66A] hover:bg-[#DDF7E8] rounded-lg transition-colors flex items-center"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-[#19A66A]/15 flex flex-col gap-2">
            {adminUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminDashboard?.();
                }}
                className="w-full py-2.5 text-center text-sm font-semibold text-emerald-800 bg-[#DDF7E8] rounded-xl border border-[#19A66A]/30"
              >
                Open Admin Dashboard ({adminUser.displayName || 'Mharryjs'})
              </button>
            ) : null}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-[#19A66A] hover:bg-[#158f5b] rounded-xl shadow-sm transition-colors"
            >
              Get Started / Request Demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
