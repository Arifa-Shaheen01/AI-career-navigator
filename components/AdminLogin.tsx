import React, { useState } from 'react';
import { BookOpen } from './Icons';

interface AdminLoginProps {
  onLogin: (username, password) => boolean;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onLogin(username, password);
    if (!success) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <BookOpen className="h-12 w-12 text-indigo-500 mb-2" />
          <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label htmlFor="password"className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;