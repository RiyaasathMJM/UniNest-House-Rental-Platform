import React from 'react';
import { GraduationCap, Home, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginScreen({ onLogin }) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-emerald-400 mb-4 shadow-lg shadow-sky-500/20">
            <span className="text-4xl">🎓</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">UniLodge</span>
          </h1>
          <p className="text-slate-400 text-sm">
            The premium student housing platform. Please select your role to continue.
          </p>
        </div>

        {/* Login Cards Container */}
        <div className="space-y-4">
          
          {/* Student Login Option */}
          <button
            onClick={() => onLogin('student')}
            className="w-full group glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-sky-500/50 hover:bg-slate-900/60 transition-all duration-300 text-left flex items-center gap-4 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/10"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <GraduationCap size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-white group-hover:text-sky-400 transition-colors">I am a Student</h3>
              <p className="text-xs text-slate-400 mt-0.5">Find verified boarding & annexes</p>
            </div>
            <ArrowRight size={20} className="text-slate-600 group-hover:text-sky-400 transition-colors group-hover:translate-x-1" />
          </button>

          {/* Landlord Login Option */}
          <button
            onClick={() => onLogin('landlord')}
            className="w-full group glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-emerald-500/50 hover:bg-slate-900/60 transition-all duration-300 text-left flex items-center gap-4 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Home size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">I am a Landlord</h3>
              <p className="text-xs text-slate-400 mt-0.5">Manage and list properties</p>
            </div>
            <ArrowRight size={20} className="text-slate-600 group-hover:text-emerald-400 transition-colors group-hover:translate-x-1" />
          </button>

        </div>

        {/* Security Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Secure Verified Access</span>
        </div>

      </div>
    </div>
  );
}
