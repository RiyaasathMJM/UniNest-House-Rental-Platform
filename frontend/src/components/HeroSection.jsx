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
  const activeUniObj = UNIVERSITIES.find(u => u.id === selectedUniversity);

  return (
    <section className="relative overflow-hidden pt-8 pb-12 border-b border-slate-800/80 bg-gradient-to-b from-slate-900/90 via-slate-900 to-slate-950">
      
      {/* Glow Effects background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-sky-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="app-container relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold shadow-sm animate-fade-in">
            <Sparkles size={14} className="text-sky-400" />
            <span>Dedicated Accommodation Portal for University Students</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Find <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Verified Boarding & Annexes</span> Near Campus
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Transparent pricing, walking distance calculation to faculties, and direct contact with verified house owners — no hidden agent commissions.
          </p>

          {/* Interactive Search Bar Panel */}
          <div className="glass-panel p-3 sm:p-4 rounded-2xl shadow-2xl border-slate-700/60 max-w-3xl mx-auto space-y-3 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              
              {/* Keyword Input */}
              <div className="sm:col-span-7 relative">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by faculty, street, annex, or amenity..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-control pl-10 pr-4 py-3 bg-slate-900/90 text-sm font-medium border-slate-700/80 rounded-xl"
                />
              </div>

              {/* University Selector */}
              <div className="sm:col-span-5 relative">
                <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sky-400" />
                <select
                  value={selectedUniversity}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                  className="input-control pl-10 pr-8 py-3 bg-slate-900/90 text-sm font-semibold border-slate-700/80 rounded-xl cursor-pointer"
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
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
              <span className="text-slate-400 font-semibold mr-1">Quick Filters:</span>
              
              <button
                onClick={() => setQuickFilter(quickFilter === 'walking' ? 'all' : 'walking')}
                className={`px-3 py-1.5 rounded-full font-medium transition-all flex items-center gap-1.5 ${
                  quickFilter === 'walking'
                    ? 'bg-sky-500 text-white font-bold shadow-md shadow-sky-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50'
                }`}
              >
                <Footprints size={13} />
                <span>Walking Distance (&lt;500m)</span>
              </button>

              <button
                onClick={() => setQuickFilter(quickFilter === 'girls' ? 'all' : 'girls')}
                className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                  quickFilter === 'girls'
                    ? 'bg-purple-500 text-white font-bold shadow-md shadow-purple-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50'
                }`}
              >
                <span>Girls Only</span>
              </button>

              <button
                onClick={() => setQuickFilter(quickFilter === 'bills' ? 'all' : 'bills')}
                className={`px-3 py-1.5 rounded-full font-medium transition-all flex items-center gap-1.5 ${
                  quickFilter === 'bills'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50'
                }`}
              >
                <DollarSign size={13} />
                <span>All Bills Included</span>
              </button>

              <button
                onClick={() => setQuickFilter(quickFilter === 'budget' ? 'all' : 'budget')}
                className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                  quickFilter === 'budget'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50'
                }`}
              >
                <span>Under Rs. 20,000/mo</span>
              </button>
              
            </div>

          </div>

          {/* Key Value Propositions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-left border-t border-slate-800/50">
            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Verified Owners</h4>
                <p className="text-[11px] text-slate-400">Owner ID verified</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                <Footprints size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Faculty Distance</h4>
                <p className="text-[11px] text-slate-400">Calculated in walking mins</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Zero Commission</h4>
                <p className="text-[11px] text-slate-400">Direct student & owner link</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <DollarSign size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Clear Utility Terms</h4>
                <p className="text-[11px] text-slate-400">Water, WiFi & Power specs</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
