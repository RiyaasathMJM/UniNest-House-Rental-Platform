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
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-50 via-white to-blue-50 border border-sky-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="badge badge-verified"><GraduationCap size={13} /> Verified Student Profile</span>
            <span className="text-xs text-slate-500 font-bold">Student Housing Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Student Housing Portal</h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl">
            Track your viewing applications, review bookmarked boarding houses, and chat directly with verified landlords.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="px-5 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
            <span className="text-xs text-slate-500 font-bold block">Saved Units</span>
            <span className="text-2xl font-extrabold text-sky-600">{savedListings.length}</span>
          </div>
          <div className="px-5 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
            <span className="text-xs text-slate-500 font-bold block">Sent Applications</span>
            <span className="text-2xl font-extrabold text-emerald-600">{applications.length}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 text-sm font-bold gap-6">
        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 transition-colors flex items-center gap-2 ${
            activeTab === 'applications'
              ? 'text-sky-600 border-b-2 border-sky-600'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Clock size={16} />
          <span>My Rental Applications ({applications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 transition-colors flex items-center gap-2 ${
            activeTab === 'saved'
              ? 'text-sky-600 border-b-2 border-sky-600'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Bookmark size={16} />
          <span>Saved Boarding Houses ({savedListings.length})</span>
        </button>
      </div>

      {/* Applications Tab */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Application Status Tracking</h3>

          {applications.length === 0 ? (
            <div className="p-10 rounded-2xl bg-white border border-slate-200 text-center text-slate-600 text-sm space-y-2 shadow-sm">
              <p className="font-bold text-slate-800">You haven't submitted any viewing or rental applications yet.</p>
              <p className="text-xs text-slate-500">Explore listings near your campus and click "Schedule Viewing / Apply".</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-sky-300 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-base">{app.listingTitle}</h4>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        app.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : app.status === 'Declined'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 font-medium">
                      Target Move-in Date: <strong className="text-slate-900">{app.moveInDate}</strong> • Request: {app.requestType || 'Rental Application'}
                    </p>

                    <p className="text-xs text-slate-500 font-mono">
                      Student Registration ID: {app.studentIdNum || 'STU-2026-984'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    {app.status === 'Approved' && (
                      <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
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
          <h3 className="text-lg font-bold text-slate-900">Saved Accommodations</h3>

          {savedListings.length === 0 ? (
            <div className="p-10 rounded-2xl bg-white border border-slate-200 text-center text-slate-600 text-sm font-medium shadow-sm">
              No saved accommodation listings yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedListings.map((lst) => (
                <div key={lst.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex gap-4 items-center hover:border-sky-300 transition-all">
                  <img
                    src={lst.images[0]}
                    alt={lst.title}
                    className="w-24 h-24 rounded-xl object-cover border border-slate-200"
                  />
                  <div className="flex-1 space-y-1">
                    <span className="badge badge-verified text-[10px]">{lst.type}</span>
                    <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{lst.title}</h4>
                    <p className="text-xs text-slate-600 flex items-center gap-1 font-medium">
                      <MapPin size={13} className="text-sky-600" /> {lst.nearbyFaculty}
                    </p>
                    <div className="text-sm font-extrabold text-sky-700">
                      Rs. {lst.monthlyRent.toLocaleString()} / mo
                    </div>
                  </div>
                  <div className="space-y-2 shrink-0">
                    <button
                      onClick={() => onSelectListing(lst)}
                      className="btn btn-primary text-xs px-3.5 py-2 w-full font-bold"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onRemoveBookmark(lst.id)}
                      className="btn btn-outline text-xs px-3.5 py-1.5 w-full text-slate-600 hover:text-rose-600 hover:border-rose-300 font-bold"
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
