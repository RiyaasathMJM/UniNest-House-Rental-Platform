import React from 'react';
import { Search, ShieldCheck, MapPin, Footprints, DollarSign, CheckCircle2, Sparkles } from 'lucide-react';
import { UNIVERSITIES } from '../data/mockData';

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  selectedUniversity,
  setSelectedUniversity,
  quickFilter,
  setQuickFilter
}) {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 border-b border-slate-200 bg-gradient-to-b from-sky-50/80 via-white to-slate-50">
      
      {/* Glow Effects background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-sky-200/30 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-emerald-200/30 blur-[100px] rounded-full pointer-events-none" />

      <div className="app-container relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold shadow-sm animate-fade-in">
            <Sparkles size={14} className="text-sky-600" />
            <span>Dedicated Accommodation Portal for University Students</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Find <span className="bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">Boarding & Annexes</span> Near Campus
          </h1>

          <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Transparent pricing, walking distance calculation to faculties, and direct contact with house owners — no hidden agent commissions.
          </p>

          {/* Interactive Search Bar Panel */}
          <div className="glass-panel p-4 sm:p-5 rounded-2xl shadow-xl border-slate-200 bg-white/95 max-w-3xl mx-auto space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              
              {/* Keyword Input */}
              <div className="sm:col-span-7 relative flex items-center">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                <input
                  type="text"
                  placeholder="Search by faculty, street, annex, or amenity..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 text-sm font-semibold border border-slate-300 rounded-xl outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>

              {/* University Selector */}
              <div className="sm:col-span-5 relative flex items-center">
                <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-600 pointer-events-none z-10" />
                <select
                  value={selectedUniversity}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                  className="w-full pl-11 pr-8 py-3.5 bg-slate-50 text-sm font-semibold border border-slate-300 rounded-xl outline-none cursor-pointer hover:border-sky-500 focus:bg-white transition-all text-slate-900"
                >
                  <option value="all">All Universities</option>
                  {UNIVERSITIES.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.code})
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Quick Filter Tag Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-500 font-bold mr-1">Quick Filters:</span>
              
              <button
                onClick={() => setQuickFilter(quickFilter === 'walking' ? 'all' : 'walking')}
                className={`px-3.5 py-1.5 rounded-full font-bold transition-all flex items-center gap-1.5 ${
                  quickFilter === 'walking'
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <Footprints size={13} />
                <span>Walking Distance (&lt;500m)</span>
              </button>

              <button
                onClick={() => setQuickFilter(quickFilter === 'girls' ? 'all' : 'girls')}
                className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${
                  quickFilter === 'girls'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <span>Girls Only</span>
              </button>

              <button
                onClick={() => setQuickFilter(quickFilter === 'bills' ? 'all' : 'bills')}
                className={`px-3.5 py-1.5 rounded-full font-bold transition-all flex items-center gap-1.5 ${
                  quickFilter === 'bills'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <DollarSign size={13} />
                <span>All Bills Included</span>
              </button>

              <button
                onClick={() => setQuickFilter(quickFilter === 'budget' ? 'all' : 'budget')}
                className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${
                  quickFilter === 'budget'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <span>Under Rs. 20,000/mo</span>
              </button>
              
            </div>

          </div>

          {/* Key Value Propositions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-left border-t border-slate-200/80">
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Direct Contact</h4>
                <p className="text-[11px] text-slate-500 font-medium">Connect directly with owners</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
                <Footprints size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Faculty Distance</h4>
                <p className="text-[11px] text-slate-500 font-medium">Calculated in walking mins</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Zero Commission</h4>
                <p className="text-[11px] text-slate-500 font-medium">Direct student & owner link</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                <DollarSign size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Clear Utility Terms</h4>
                <p className="text-[11px] text-slate-500 font-medium">Water, WiFi & Power specs</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

