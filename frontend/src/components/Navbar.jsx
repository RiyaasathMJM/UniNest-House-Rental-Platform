import React from 'react';
import { 
  GraduationCap, 
  Search, 
  Bookmark, 
  UserCheck, 
  Building2, 
  PlusCircle, 
  MapPin, 
  Menu, 
  X,
  SlidersHorizontal
} from 'lucide-react';
import { UNIVERSITIES } from '../data/mockData';

export default function Navbar({
  userRole,
  setUserRole,
  selectedUniversity,
  setSelectedUniversity,
  savedIds,
  onOpenBookmarks,
  onOpenCompare,
  compareListCount,
  activeTab,
  setActiveTab,
  onOpenAddListing
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="glass-nav sticky top-0 z-50 transition-all">
      <div className="app-container">
        <div className="flex items-center justify-between h-20 px-2">
          
          {/* Brand Logo & Tagline */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('explore')}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap size={26} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-white font-heading">
                  Uni<span className="text-sky-400">Lodge</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  Campus Housing
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Verified Student Rentals & Annexes</p>
            </div>
          </div>

          {/* Center University Selector Dropdown */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 rounded-full px-4 py-1.5 shadow-inner">
            <MapPin size={16} className="text-sky-400" />
            <span className="text-xs text-slate-400 font-medium">Campus:</span>
            <select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              className="bg-transparent text-sm font-semibold text-slate-200 outline-none cursor-pointer hover:text-sky-400 transition-colors"
            >
              <option value="all" className="bg-slate-900 text-slate-200">All University Campuses</option>
              {UNIVERSITIES.map((uni) => (
                <option key={uni.id} value={uni.id} className="bg-slate-900 text-slate-200">
                  {uni.name} ({uni.code})
                </option>
              ))}
            </select>
          </div>

          {/* Right Action Items & Role Toggle */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Compare Drawer Trigger */}
            {compareListCount > 0 && (
              <button
                onClick={onOpenCompare}
                className="btn btn-secondary text-xs relative border border-sky-500/30 text-sky-300 bg-sky-500/10 hover:bg-sky-500/20"
              >
                <SlidersHorizontal size={15} />
                <span>Compare</span>
                <span className="w-5 h-5 rounded-full bg-sky-500 text-white font-bold text-[11px] flex items-center justify-center ml-1">
                  {compareListCount}
                </span>
              </button>
            )}

            {/* Bookmarks Counter */}
            <button
              onClick={onOpenBookmarks}
              className="btn btn-secondary relative p-2.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl"
              title="Saved Properties"
            >
              <Bookmark size={19} className={savedIds.length > 0 ? "fill-sky-400 text-sky-400" : ""} />
              {savedIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[11px] flex items-center justify-center animate-pulse">
                  {savedIds.length}
                </span>
              )}
            </button>

            {/* Role Switcher Pill */}
            <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  setUserRole('student');
                  setActiveTab('explore');
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  userRole === 'student'
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <GraduationCap size={14} />
                <span>Student</span>
              </button>
              <button
                onClick={() => {
                  setUserRole('landlord');
                  setActiveTab('landlord');
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  userRole === 'landlord'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Building2 size={14} />
                <span>House Owner</span>
              </button>
            </div>

            {/* Landlord Add Listing CTA */}
            {userRole === 'landlord' ? (
              <button
                onClick={onOpenAddListing}
                className="btn btn-accent text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
              >
                <PlusCircle size={16} />
                <span>Post Listing</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('student-portal')}
                className={`btn text-xs px-3.5 py-2 rounded-xl border ${
                  activeTab === 'student-portal'
                    ? 'bg-sky-500/20 text-sky-400 border-sky-500/40'
                    : 'btn-outline'
                }`}
              >
                <UserCheck size={15} />
                <span>My Dashboard</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenBookmarks}
              className="p-2 text-slate-300 relative"
            >
              <Bookmark size={22} className={savedIds.length > 0 ? "fill-sky-400 text-sky-400" : ""} />
              {savedIds.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                  {savedIds.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-4 animate-fade-in">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Select Campus Premises</label>
            <select
              value={selectedUniversity}
              onChange={(e) => {
                setSelectedUniversity(e.target.value);
                setMobileMenuOpen(false);
              }}
              className="input-control text-sm"
            >
              <option value="all">All University Campuses</option>
              {UNIVERSITIES.map((uni) => (
                <option key={uni.id} value={uni.id}>{uni.name} ({uni.code})</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between p-2 bg-slate-800 rounded-xl">
            <span className="text-xs font-semibold text-slate-300">Switch Operating Mode:</span>
            <div className="flex gap-1">
              <button
                onClick={() => {
                  setUserRole('student');
                  setActiveTab('explore');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                  userRole === 'student' ? 'bg-sky-500 text-white' : 'text-slate-400'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => {
                  setUserRole('landlord');
                  setActiveTab('landlord');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                  userRole === 'landlord' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Owner
              </button>
            </div>
          </div>

          {userRole === 'landlord' ? (
            <button
              onClick={() => {
                onOpenAddListing();
                setMobileMenuOpen(false);
              }}
              className="btn btn-accent w-full text-sm py-2.5"
            >
              <PlusCircle size={16} /> Post New Listing
            </button>
          ) : (
            <button
              onClick={() => {
                setActiveTab('student-portal');
                setMobileMenuOpen(false);
              }}
              className="btn btn-primary w-full text-sm py-2.5"
            >
              <UserCheck size={16} /> My Student Dashboard
            </button>
          )}
        </div>
      )}
    </header>
  );
}
