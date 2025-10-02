import React from 'react';
import type { Page } from '../types';
import { BookOpen } from './Icons';

interface HeaderProps {
  isLoggedIn: boolean;
  isAdminLoggedIn: boolean;
  currentPage: Page;
  navigate: (page: Page) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, isAdminLoggedIn, currentPage, navigate, onLogout }) => {
  const navItemClasses = (page: Page) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      currentPage === page
        ? 'bg-indigo-100 text-indigo-600'
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
    }`;
    
  const buttonBaseClasses = 'px-3 py-2 rounded-md text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors';

  return (
    <header className="sticky top-0 bg-white/90 backdrop-blur-lg z-50 border-b border-slate-200">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('landing')}>
            <BookOpen className="h-8 w-8 text-indigo-500" />
            <span className="text-xl font-bold ml-2 text-slate-900">AI Career Navigator</span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <button onClick={() => navigate('dashboard')} className={navItemClasses('dashboard')}>
              Dashboard
            </button>
            <button onClick={() => navigate('blog')} className={navItemClasses('blog')}>
              Blog
            </button>
            {isLoggedIn ? (
              <button onClick={onLogout} className={buttonBaseClasses}>
                Logout
              </button>
            ) : (
               <button onClick={() => navigate('auth')} className={navItemClasses('auth')}>
                Login
              </button>
            )}
            {isAdminLoggedIn && (
               <button onClick={() => navigate('admin')} className={navItemClasses('admin')}>
                Admin
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;