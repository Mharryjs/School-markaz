import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveDashboardShowcase } from './components/InteractiveDashboardShowcase';
import { ProductModules } from './components/ProductModules';
import { MobileAppsSection } from './components/MobileAppsSection';
import { VideoDemoSection } from './components/VideoDemoSection';
import { FeaturesGrid } from './components/FeaturesGrid';
import { PackagesSection } from './components/PackagesSection';
import { HowItWorks } from './components/HowItWorks';
import { WhySchoolMarkaz } from './components/WhySchoolMarkaz';
import { RoleExperience } from './components/RoleExperience';
import { RealisticAnalytics } from './components/RealisticAnalytics';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { ContactDemoSection } from './components/ContactDemoSection';
import { CallToActionSection } from './components/CallToActionSection';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginGate } from './components/admin/AdminLoginGate';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { PrincipalDashboard } from './components/principal/PrincipalDashboard';
import { StudentDashboard } from './components/student/StudentDashboard';
import { verifyCurrentSession, logoutAdmin } from './services/auth';
import { AuthUser, UserRole } from './types';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isVerifyingSession, setIsVerifyingSession] = useState(true);

  const [selectedPackage, setSelectedPackage] = useState<string>('250 Students Package (Rs. 2,500/mo) - Popular');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Check auth session on load
  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = await verifyCurrentSession();
        if (session.authenticated && session.user) {
          setCurrentUser(session.user);
        } else {
          setCurrentUser(null);
        }
      } catch {
        setCurrentUser(null);
      } finally {
        setIsVerifyingSession(false);
      }
    };
    initAuth();

    // Listen to browser forward/back buttons
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    // If currently in any portal view, return to landing page first
    if (
      currentRoute.startsWith('/admin') ||
      currentRoute.startsWith('/principal') ||
      currentRoute.startsWith('/teacher') ||
      currentRoute.startsWith('/student')
    ) {
      navigateTo('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackage = (packageName: string) => {
    setSelectedPackage(packageName);
    scrollToSection('contact');
  };

  const handleLoginSuccess = (role: UserRole, user: AuthUser) => {
    setCurrentUser(user);
    if (role === 'admin') {
      navigateTo('/admin/dashboard');
    } else if (role === 'principal') {
      navigateTo('/principal/dashboard');
    } else if (role === 'teacher') {
      navigateTo('/teacher/dashboard');
    } else if (role === 'student') {
      navigateTo('/student/dashboard');
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setCurrentUser(null);
    navigateTo('/');
  };

  const handleOpenDashboardByRole = (role: string) => {
    if (role === 'admin') navigateTo('/admin/dashboard');
    else if (role === 'principal') navigateTo('/principal/dashboard');
    else if (role === 'teacher') navigateTo('/teacher/dashboard');
    else if (role === 'student') navigateTo('/student/dashboard');
    else navigateTo('/admin/dashboard');
  };

  // ---------------------------------------------------------------------------
  // 1. PROTECTED ADMIN ROUTE (/admin or /admin/dashboard)
  // ---------------------------------------------------------------------------
  if (currentRoute.startsWith('/admin')) {
    if (isVerifyingSession) {
      return (
        <div className="min-h-screen bg-[#F4FFF8] flex items-center justify-center p-4 font-['Plus_Jakarta_Sans']">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#19A66A] text-white flex items-center justify-center mx-auto animate-pulse">
              🎓
            </div>
            <div className="text-sm font-bold text-[#123B2A]">
              Verifying School Markaz Session...
            </div>
          </div>
        </div>
      );
    }

    if (currentUser && currentUser.role === 'admin') {
      return (
        <AdminDashboard
          adminUser={currentUser as any}
          onLogout={handleLogout}
          onNavigateHome={() => navigateTo('/')}
        />
      );
    }

    return (
      <AdminLoginGate
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          navigateTo('/admin/dashboard');
        }}
        onBackHome={() => navigateTo('/')}
      />
    );
  }

  // ---------------------------------------------------------------------------
  // 2. PRINCIPAL ROUTE (/principal or /principal/dashboard)
  // ---------------------------------------------------------------------------
  if (currentRoute.startsWith('/principal')) {
    const principalUser: AuthUser = (currentUser && currentUser.role === 'principal')
      ? currentUser
      : {
          username: 'sir.kamran@schoolmarkaz.pk',
          displayName: 'Sir Kamran Badini',
          role: 'principal',
          designation: 'Principal & Head of Institution',
          department: 'Executive Directorate',
          phone: '+92 301 9876543',
          email: 'sir.kamran@schoolmarkaz.pk',
          qualification: 'M.Phil Educational Leadership & M.Sc Physics',
          bio: 'Directing academic excellence, student discipline, faculty governance, and institutional vision with 22 years of campus leadership.',
        };

    return (
      <PrincipalDashboard
        user={principalUser}
        onLogout={handleLogout}
        onNavigateHome={() => navigateTo('/')}
      />
    );
  }

  // ---------------------------------------------------------------------------
  // 3. TEACHER ROUTE (/teacher or /teacher/dashboard)
  // ---------------------------------------------------------------------------
  if (currentRoute.startsWith('/teacher')) {
    const teacherUser: AuthUser = (currentUser && currentUser.role === 'teacher')
      ? currentUser
      : {
          username: 'ayesha.khan@schoolmarkaz.pk',
          displayName: 'Madam Ayesha Khan',
          role: 'teacher',
          designation: 'Senior Science Faculty & Class 9-A Incharge',
          department: 'Secondary Science Wing',
          phone: '+92 333 4567890',
          email: 'ayesha.khan@schoolmarkaz.pk',
          qualification: 'M.Sc Biology & Chemistry (B.Ed Honors)',
          assignedClasses: ['Grade 9-A', 'Grade 10-B'],
          bio: 'Senior Science Faculty incharge of Grade 9-A & 10-B laboratory sciences with 12 years of distinction-level board results.',
        };

    return (
      <TeacherDashboard
        user={teacherUser}
        onLogout={handleLogout}
        onNavigateHome={() => navigateTo('/')}
      />
    );
  }

  // ---------------------------------------------------------------------------
  // 4. STUDENT ROUTE (/student or /student/dashboard)
  // ---------------------------------------------------------------------------
  if (currentRoute.startsWith('/student')) {
    const studentUser: AuthUser = (currentUser && currentUser.role === 'student')
      ? currentUser
      : {
          username: 'hamza.9a@schoolmarkaz.pk',
          displayName: 'Hamza Ahmed',
          role: 'student',
          designation: 'Student (Roll #24)',
          department: 'Secondary Matriculation Wing',
          phone: '+92 302 1122334',
          email: 'hamza.9a@schoolmarkaz.pk',
          bio: 'Enrolled in Grade 9-A (Science Matriculation Section). Consistently in top 3 academic positions.',
        };

    return (
      <StudentDashboard
        user={studentUser}
        onLogout={handleLogout}
        onNavigateHome={() => navigateTo('/')}
      />
    );
  }

  // ---------------------------------------------------------------------------
  // 5. PUBLIC LANDING PAGE
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#123B2A] selection:bg-[#DDF7E8] selection:text-[#123B2A]">
      {/* 1. Sticky Glass Navigation */}
      <Navbar
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onSelectPackage={handleSelectPackage}
        currentUser={currentUser}
        onOpenDashboard={handleOpenDashboardByRole}
        onLogout={handleLogout}
      />

      {/* 2. Main Hero Section with Floating Glass Mockup */}
      <HeroSection
        onWatchDemo={() => scrollToSection('video-demo')}
        onGetStarted={() => scrollToSection('contact')}
      />

      {/* 3. Interactive Dashboard Showcase (Real Software Simulator) */}
      <InteractiveDashboardShowcase />

      {/* 4. Product Modules: "Everything Your School Needs" */}
      <ProductModules />

      {/* 5. Dedicated Mobile Apps (3 Realistic Smartphone Mockups) */}
      <MobileAppsSection />

      {/* 6. Video Demo: "See School Markaz In Action" */}
      <VideoDemoSection
        onBookDemo={() => scrollToSection('contact')}
      />

      {/* 7. Comprehensive Features Grid (12 Feature Cards) */}
      <FeaturesGrid />

      {/* 8. Pricing Packages: Transparent & Affordable in PKR */}
      <PackagesSection
        onSelectPackage={handleSelectPackage}
        selectedPackage={selectedPackage}
      />

      {/* 9. Step-by-Step Implementation: How It Works */}
      <HowItWorks
        onStartNow={() => scrollToSection('contact')}
      />

      {/* 10. Why School Markaz: Institutional Advantages */}
      <WhySchoolMarkaz />

      {/* 11. Role Experience: Portals for Admin, Principal, Teacher, Student */}
      <RoleExperience onNavigateTo={navigateTo} />

      {/* 12. Realistic Analytics & Statistical Proof */}
      <RealisticAnalytics />

      {/* 13. Testimonials: Real Principal & Administrator Voices */}
      <TestimonialsSection />

      {/* 14. Frequently Asked Questions */}
      <FAQSection />

      {/* 15. Contact & Free 14-Day Pilot Form */}
      <ContactDemoSection
        selectedPackage={selectedPackage}
      />

      {/* 16. Final Call to Action */}
      <CallToActionSection
        onOpenModal={() => setIsLoginModalOpen(true)}
        onContact={() => scrollToSection('contact')}
      />

      {/* 17. Comprehensive Footer with Creator Credit */}
      <Footer
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
      />

      {/* Unified 4-Role Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
}
