import React from 'react';
import { GraduationCap, ShieldCheck, Heart, MapPin, Mail, Phone, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      
      {/* Top Value Strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/40 py-8">
        <div className="app-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Verified Landlords</h4>
                <p className="text-slate-400 text-xs">National ID & property document checked</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <GraduationCap size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Student Protection</h4>
                <p className="text-slate-400 text-xs">Transparent pricing with no broker commissions</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                <Lock size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Direct Contact</h4>
                <p className="text-slate-400 text-xs">Instant messaging & schedule viewings directly</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="app-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white font-bold">
                <GraduationCap size={20} />
              </div>
              <span className="text-lg font-bold text-white font-heading">Uni<span className="text-sky-400">Lodge</span></span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              The leading digital house rental platform designed to connect university students directly with house owners near university premises.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Popular University Hubs</h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li className="hover:text-sky-400 transition-colors">University of Colombo (Reid Avenue, Thurstan)</li>
              <li className="hover:text-sky-400 transition-colors">University of Peradeniya (Galaha Rd, Kandy)</li>
              <li className="hover:text-sky-400 transition-colors">University of Moratuwa (Katubedda)</li>
              <li className="hover:text-sky-400 transition-colors">University of Kelaniya (Dalugama)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Accommodation Types</h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li className="hover:text-sky-400 transition-colors">Single Student Annexes</li>
              <li className="hover:text-sky-400 transition-colors">Girls Boarding Houses</li>
              <li className="hover:text-sky-400 transition-colors">Boys Shared Boarding</li>
              <li className="hover:text-sky-400 transition-colors">Self-contained Studio Apartments</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Support & Safety</h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li className="hover:text-sky-400 transition-colors">Student Safety Guidelines</li>
              <li className="hover:text-sky-400 transition-colors">Landlord Verification Portal</li>
              <li className="hover:text-sky-400 transition-colors">Rental Agreement Templates</li>
              <li className="hover:text-sky-400 transition-colors">Report Unverified Listing</li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-xs gap-4">
          <p>© 2026 UniLodge Student Housing Platform. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Designed for University Students & House Owners
          </p>
        </div>
      </div>
    </footer>
  );
}
