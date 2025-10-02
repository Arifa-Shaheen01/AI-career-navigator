import React, { useState } from 'react';
import type { UserProfile, Page, Program } from './types';
import LandingPage from './components/LandingPage';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import Auth from './components/Auth';
import Blog from './components/Blog';
import ProgramDetailsPage from './components/ProgramDetailsPage';

function App() {
  const [page, setPage] = useState<Page>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setPage('dashboard');
  };
  
  const handleLogout = () => {
    setUserProfile(null);
    setIsAdminLoggedIn(false);
    setPage('landing');
  }

  const handleAdminLogin = (username, password) => {
    // Dummy authentication
    if (username === 'admin' && password === 'password') {
      setIsAdminLoggedIn(true);
      setPage('admin');
      return true;
    }
    return false;
  }
  
  const handleUserAuthSuccess = () => {
    setPage('onboarding');
  };

  const handleSelectProgram = (program: Program) => {
    setSelectedProgram(program);
    setPage('program_details');
  };

  const navigate = (newPage: Page) => {
    if (newPage === 'admin') {
      if (isAdminLoggedIn) {
        setPage('admin');
      } else {
        setPage('admin_login');
      }
    } else if (newPage === 'dashboard' && !userProfile) {
      setPage('auth');
    } else {
      setPage(newPage);
    }
  };

  const renderPage = () => {
    switch (page) {
      case 'auth':
        return <Auth onAuthSuccess={handleUserAuthSuccess} navigate={navigate} />;
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'dashboard':
        // userProfile is guaranteed to be non-null here due to navigate logic
        return <Dashboard userProfile={userProfile!} />;
      case 'admin':
        return isAdminLoggedIn ? <AdminPanel onSelectProgram={handleSelectProgram} /> : <AdminLogin onLogin={handleAdminLogin} />;
      case 'admin_login':
        return <AdminLogin onLogin={handleAdminLogin} />;
      case 'blog':
        return <Blog />;
      case 'program_details':
        if (!selectedProgram) {
          // Fallback if somehow this page is reached without a selected program
          setPage('admin');
          return null;
        }
        return <ProgramDetailsPage program={selectedProgram} onBack={() => setPage('admin')} />;
      case 'landing':
      default:
        return <LandingPage onGetStarted={() => setPage('auth')} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header 
        isLoggedIn={!!userProfile}
        isAdminLoggedIn={isAdminLoggedIn}
        currentPage={page} 
        navigate={navigate}
        onLogout={handleLogout}
      />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;