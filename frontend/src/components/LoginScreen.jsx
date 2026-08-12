import React, { useState } from 'react';
import { GraduationCap, Home, ArrowRight, ShieldCheck, User, Lock, Eye, EyeOff, KeyRound } from 'lucide-react';

export default function LoginScreen({ onLogin }) {
  const [role, setRole] = useState('student'); // 'student' | 'landlord'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleQuickFill = (targetRole) => {
    setRole(targetRole);
    if (targetRole === 'student') {
      setUsername('student@uninest.lk');
      setPassword('student123');
    } else {
      setUsername('owner@uninest.lk');
      setPassword('owner123');
    }
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username/email and password.');
      return;
    }

    // Pass the selected role and username upstream
    onLogin(role, username);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-200/40 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-200/40 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md animate-fade-in space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-emerald-500 mb-2 shadow-lg shadow-sky-500/20 text-white">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-emerald-600">UniNest</span>
          </h1>
          <p className="text-slate-600 text-sm font-medium">
            Sign in to access verified student housing & listings
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 space-y-5">
          
          {/* Role Toggle Selector */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => { setRole('student'); setError(''); }}
              className={`py-2.5 px-3 rounded-lg text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
                role === 'student'
                  ? 'bg-white text-sky-700 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 font-bold'
              }`}
            >
              <GraduationCap size={16} className={role === 'student' ? 'text-sky-600' : ''} />
              <span>Student</span>
            </button>
            <button
              type="button"
              onClick={() => { setRole('landlord'); setError(''); }}
              className={`py-2.5 px-3 rounded-lg text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
                role === 'landlord'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 font-bold'
              }`}
            >
              <Home size={16} className={role === 'landlord' ? 'text-emerald-600' : ''} />
              <span>House Owner</span>
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username / Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-extrabold text-slate-700">
                Username or University Email
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={role === 'student' ? 'e.g. student@uninest.lk' : 'e.g. owner@uninest.lk'}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-extrabold text-slate-700">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset link will be sent to registered email in full backend release."); }} className="text-[11px] font-bold text-sky-600 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs font-medium text-slate-600 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-sky-600 focus:ring-sky-500" />
                <span>Remember me</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-xl text-xs font-extrabold text-white shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 ${
                role === 'student'
                  ? 'bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 shadow-sky-500/25'
                  : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-emerald-500/25'
              }`}
            >
              <span>Sign In as {role === 'student' ? 'Student' : 'House Owner'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Demo Credentials Helper */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 mb-2">
              <KeyRound size={13} className="text-amber-500" />
              <span>Demo Quick-Fill:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('student')}
                className="p-2 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200/60 text-[11px] text-left transition-colors"
              >
                <div className="font-extrabold text-sky-800">Student Demo</div>
                <div className="text-[10px] text-sky-600 font-mono">student / student123</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('landlord')}
                className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 text-[11px] text-left transition-colors"
              >
                <div className="font-extrabold text-emerald-800">Owner Demo</div>
                <div className="text-[10px] text-emerald-600 font-mono">owner / owner123</div>
              </button>
            </div>
          </div>

        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
          <ShieldCheck size={15} className="text-emerald-600" />
          <span>Secure Verified Access</span>
        </div>

      </div>
    </div>
  );
}


