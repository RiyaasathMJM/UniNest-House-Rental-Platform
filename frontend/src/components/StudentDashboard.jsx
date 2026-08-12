import React, { useState } from 'react';
import { 
  GraduationCap, 
  Bookmark, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  Phone, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';

export default function StudentDashboard({
  savedListings,
  applications,
  messages,
  onSelectListing,
  onOpenChatModal,
  onRemoveBookmark
}) {
  const [activeTab, setActiveTab] = useState('applications');

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Student Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/80 via-slate-900 to-slate-900 border border-sky-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="badge badge-verified"><GraduationCap size={13} /> Verified Student Profile</span>
            <span className="text-xs text-slate-400">Student Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Student Housing Portal</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Track your viewing applications, review bookmarked boarding houses, and chat directly with verified landlords.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block">Saved Units</span>
            <span className="text-xl font-bold text-sky-400">{savedListings.length}</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block">Sent Applications</span>
            <span className="text-xl font-bold text-emerald-400">{applications.length}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 text-sm font-semibold gap-6">
        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 transition-colors flex items-center gap-2 ${
            activeTab === 'applications'
              ? 'text-sky-400 border-b-2 border-sky-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Clock size={16} />
          <span>My Rental Applications ({applications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 transition-colors flex items-center gap-2 ${
            activeTab === 'saved'
              ? 'text-sky-400 border-b-2 border-sky-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bookmark size={16} />
          <span>Saved Boarding Houses ({savedListings.length})</span>
        </button>
      </div>

      {/* Applications Tab */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Application Status Tracking</h3>

          {applications.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-400 text-sm space-y-2">
              <p>You haven't submitted any viewing or rental applications yet.</p>
              <p className="text-xs text-slate-500">Explore listings near your campus and click "Schedule Viewing / Apply".</p>
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-base">{app.listingTitle}</h4>
                      <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                        app.status === 'Approved'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : app.status === 'Declined'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400">
                      Target Move-in Date: <strong className="text-slate-200">{app.moveInDate}</strong> • Request: {app.requestType}
                    </p>

                    <p className="text-xs text-slate-500 font-mono">
                      Student Registration ID: {app.studentIdNum}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    {app.status === 'Approved' && (
                      <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 size={16} /> Approved by Owner!
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Saved Tab */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Saved Accommodations</h3>

          {savedListings.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-400 text-sm">
              No saved accommodation listings yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedListings.map((lst) => (
                <div key={lst.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex gap-4 items-center">
                  <img
                    src={lst.images[0]}
                    alt={lst.title}
                    className="w-24 h-24 rounded-lg object-cover border border-slate-800"
                  />
                  <div className="flex-1 space-y-1">
                    <span className="badge badge-verified text-[10px]">{lst.type}</span>
                    <h4 className="font-bold text-white text-sm line-clamp-1">{lst.title}</h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin size={13} className="text-sky-400" /> {lst.nearbyFaculty}
                    </p>
                    <div className="text-sm font-extrabold text-sky-400">
                      Rs. {lst.monthlyRent.toLocaleString()} / mo
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => onSelectListing(lst)}
                      className="btn btn-primary text-xs px-3 py-1.5 w-full"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onRemoveBookmark(lst.id)}
                      className="btn btn-outline text-xs px-3 py-1 w-full text-slate-400 hover:text-rose-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
