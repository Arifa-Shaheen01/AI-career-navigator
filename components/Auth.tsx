import React, { useState } from 'react';
import type { Page } from '../types';
import { BookOpen } from './Icons';

interface AuthProps {
  onAuthSuccess: () => void;
  navigate: (page: Page) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess, navigate }) => {
    const [isLoginView, setIsLoginView] = useState(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Dummy auth logic
        onAuthSuccess();
    };

    const inputClasses = "w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-indigo-500 focus:border-indigo-500";

    return (
        <div className="max-w-md mx-auto mt-10">
            <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-8">
                <div className="flex flex-col items-center mb-6">
                    <BookOpen className="h-12 w-12 text-indigo-500 mb-2" />
                    <h2 className="text-2xl font-bold text-center">{isLoginView ? 'Welcome Back' : 'Create Account'}</h2>
                    <p className="text-slate-600 text-sm mt-1">{isLoginView ? 'Login to continue your journey' : 'Sign up to get started'}</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLoginView && (
                        <div>
                            <label htmlFor="name-signup" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <input type="text" name="name-signup" id="name-signup" required className={inputClasses} placeholder="e.g., Ananya Sharma" />
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <input type="email" name="email" id="email" required className={inputClasses} placeholder="you@example.com" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input type="password" name="password" id="password" required className={inputClasses} placeholder="••••••••" />
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors">
                            {isLoginView ? 'Login' : 'Sign Up'}
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center text-sm">
                    <p className="text-slate-600">
                        {isLoginView ? "Don't have an account?" : "Already have an account?"}
                        <button onClick={() => setIsLoginView(!isLoginView)} className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
                            {isLoginView ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 text-center text-sm">
                    <button onClick={() => navigate('admin_login')} className="text-slate-500 hover:text-indigo-600 transition-colors">
                        Login as Admin
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Auth;