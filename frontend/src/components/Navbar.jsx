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
  SlidersHorizontal,
  LayoutDashboard,
  LogOut,
  Compass
} from 'lucide-react';
import { UNIVERSITIES } from '../data/mockData';

export default function Navbar({
  userRole,
  onLogout,
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
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl transition-all border-b border-slate-800/90 shadow-lg shadow-slate-950/20 text-white">
      <div className="app-container">
        <div className="flex items-center justify-between h-20 px-4 sm:px-6 gap-6">
          
          {/* Left: Brand Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            onClick={() => setActiveTab(userRole === 'landlord' ? 'landlord' : 'explore')}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/25 group-hover:scale-105 transition-transform">
              <GraduationCap size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-white font-heading">
                  Uni<span className="text-sky-400">Nest</span>
                </span>
                <span className={`text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full border ${
                  userRole === 'landlord' 
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : 'bg-sky-500/15 text-sky-300 border-sky-500/30'
                }`}>
                  {userRole === 'landlord' ? 'House Owner Portal' : 'Student Housing'}
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block font-medium">
                {userRole === 'landlord' ? 'Landlord Property Management' : 'Student Rentals & Annexes'}
              </p>
            </div>
          </div>

          {/* Center: Campus Selector (Student Mode) */}
          {userRole === 'student' && (
            <div className="hidden lg:flex items-center relative min-w-[280px] max-w-[340px]">
              <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sky-400 pointer-events-none z-10" />
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="w-full bg-slate-800/90 text-sm font-semibold text-slate-100 border border-slate-700 rounded-xl pl-10 pr-8 py-2.5 outline-none cursor-pointer hover:border-sky-400 transition-all shadow-inner"
              >
                <option value="all" className="bg-slate-900 text-slate-100">All University Campuses</option>
                {UNIVERSITIES.map((uni) => (
                  <option key={uni.id} value={uni.id} className="bg-slate-900 text-slate-100">
                    {uni.name} ({uni.code})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Right: Role-Specific Action Items */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            
            {userRole === 'student' ? (
              /* STUDENT-ONLY NAVBAR ACTIONS */
              <>
                {/* Explore Accommodations Button */}
                <button
                  onClick={() => setActiveTab('explore')}
                  className={`btn text-xs px-3.5 py-2.5 rounded-xl border transition-all flex items-center gap-1.5 font-extrabold ${
                    activeTab === 'explore'
                      ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/20'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Compass size={15} />
                  <span>Find Housing</span>
                </button>

                {/* Compare Tool */}
                {compareListCount > 0 && (
                  <button
                    onClick={onOpenCompare}
                    className="btn text-xs border border-sky-400/40 text-sky-300 bg-sky-500/15 hover:bg-sky-500/25 px-3 py-2 rounded-xl font-extrabold"
                  >
                    <SlidersHorizontal size={15} />
                    <span>Compare ({compareListCount})</span>
                  </button>
                )}

                {/* Saved Bookmarks */}
                <button
                  onClick={onOpenBookmarks}
                  className="btn relative p-2.5 text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-xl border border-slate-700"
                  title="Saved Accommodations"
                >
                  <Bookmark size={19} className={savedIds.length > 0 ? "fill-sky-400 text-sky-400" : ""} />
                  {savedIds.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white font-bold text-[11px] flex items-center justify-center shadow-md">
                      {savedIds.length}
                    </span>
                  )}
                </button>

                {/* Student Dashboard CTA */}
                <button
                  onClick={() => setActiveTab('student-portal')}
                  className={`btn text-xs px-4 py-2.5 rounded-xl font-extrabold border transition-all flex items-center gap-2 ${
                    activeTab === 'student-portal'
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25 border-sky-400'
                      : 'bg-slate-800/80 text-slate-200 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <UserCheck size={16} />
                  <span>My Student Dashboard</span>
                </button>

                {/* Account Switcher / Logout */}
                <button
                  onClick={onLogout}
                  className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-rose-400 hover:border-rose-500/40 hover:bg-rose-950/40 transition-colors"
                  title="Switch Role / Logout"
                >
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              /* HOUSE OWNER-ONLY NAVBAR ACTIONS */
              <>
                <button
                  onClick={() => setActiveTab('landlord')}
                  className={`btn text-xs px-4 py-2.5 rounded-xl font-extrabold border transition-all flex items-center gap-2 ${
                    activeTab === 'landlord'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25 border-emerald-400'
                      : 'bg-slate-800/80 text-slate-200 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <LayoutDashboard size={16} />
                  <span>House Owner Dashboard</span>
                </button>

                <button
                  onClick={() => setActiveTab('explore')}
                  className={`btn text-xs px-3.5 py-2.5 rounded-xl font-extrabold border transition-all flex items-center gap-1.5 ${
                    activeTab === 'explore'
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-800/80 text-slate-200 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <Compass size={15} />
                  <span>All Market Houses</span>
                </button>

                <button
                  onClick={onOpenAddListing}
                  className="btn bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 font-extrabold shadow-md shadow-emerald-500/25 border border-emerald-400"
                >
                  <PlusCircle size={16} />
                  <span>Post New Listing</span>
                </button>

                {/* Account Switcher / Logout */}
                <button
                  onClick={onLogout}
                  className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-rose-400 hover:border-rose-500/40 hover:bg-rose-950/40 transition-colors"
                  title="Switch Role / Logout"
                >
                  <LogOut size={16} />
                </button>
              </>
            )}

          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            {userRole === 'student' && (
              <button
                onClick={onOpenBookmarks}
                className="p-2 text-slate-200 relative"
              >
                <Bookmark size={22} className={savedIds.length > 0 ? "fill-sky-400 text-sky-400" : ""} />
                {savedIds.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center">
                    {savedIds.length}
                  </span>
                )}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3 animate-fade-in shadow-xl text-white">
          {userRole === 'student' ? (
            <>
              <button
                onClick={() => {
                  setActiveTab('explore');
                  setMobileMenuOpen(false);
                }}
                className="btn bg-slate-800 border-slate-700 text-white w-full text-sm py-2.5 font-bold"
              >
                <Compass size={16} /> Explore Accommodations
              </button>

              <button
                onClick={() => {
                  setActiveTab('student-portal');
                  setMobileMenuOpen(false);
                }}
                className="btn bg-sky-600 text-white w-full text-sm py-2.5 font-bold"
              >
                <UserCheck size={16} /> My Student Dashboard
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setActiveTab('landlord');
                  setMobileMenuOpen(false);
                }}
                className="btn bg-emerald-600 text-white w-full text-sm py-2.5 font-bold"
              >
                <LayoutDashboard size={16} /> House Owner Dashboard
              </button>

              <button
                onClick={() => {
                  onOpenAddListing();
                  setMobileMenuOpen(false);
                }}
                className="btn bg-slate-800 border-emerald-500/50 text-emerald-300 w-full text-sm py-2.5 font-bold"
              >
                <PlusCircle size={16} /> Post New Listing
              </button>
            </>
          )}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onLogout();
            }}
            className="w-full py-2.5 text-xs text-slate-400 hover:text-rose-400 font-semibold border-t border-slate-800 flex items-center justify-center gap-1.5"
          >
            <LogOut size={14} /> Switch Account / Logout
          </button>
        </div>
      )}
    </header>
  );
}


