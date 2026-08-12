import React, { useState } from 'react';
import { 
  Building2, 
  PlusCircle, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  FileText, 
  MessageSquare, 
  Trash2, 
  Eye, 
  TrendingUp,
  MapPin
} from 'lucide-react';

export default function LandlordDashboard({
  listings,
  applications,
  onUpdateApplicationStatus,
  onOpenAddListing,
  onDeleteListing
}) {
  const [activeTab, setActiveTab] = useState('applications');

  const pendingApps = applications.filter(a => a.status === 'Pending');
  const approvedApps = applications.filter(a => a.status === 'Approved');

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-white to-teal-50 border border-emerald-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="badge badge-verified"><ShieldCheck size={13} /> Verified Property Owner</span>
            <span className="text-xs text-slate-500 font-bold">Landlord Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">House Owner Management Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl">
            Manage your student accommodation listings, verify student tenant applications, and respond to inquiries.
          </p>
        </div>

        <button
          onClick={onOpenAddListing}
          className="btn btn-accent px-5 py-3 text-sm font-bold shadow-md shadow-emerald-600/20 shrink-0"
        >
          <PlusCircle size={18} /> Post New Accommodation
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 font-bold">
            <span className="text-xs">Active Listings</span>
            <Building2 size={18} className="text-emerald-600" />
          </div>
          <span className="text-3xl font-extrabold text-slate-900">{listings.length}</span>
          <p className="text-[11px] text-slate-500 font-medium">Accommodation units online</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 font-bold">
            <span className="text-xs">Pending Applications</span>
            <Clock size={18} className="text-amber-600" />
          </div>
          <span className="text-3xl font-extrabold text-amber-600">{pendingApps.length}</span>
          <p className="text-[11px] text-slate-500 font-medium">Requires your review</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 font-bold">
            <span className="text-xs">Approved Tenants</span>
            <CheckCircle2 size={18} className="text-sky-600" />
          </div>
          <span className="text-3xl font-extrabold text-sky-600">{approvedApps.length}</span>
          <p className="text-[11px] text-slate-500 font-medium">Confirmed move-ins</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 font-bold">
            <span className="text-xs">Total Yield Potential</span>
            <TrendingUp size={18} className="text-purple-600" />
          </div>
          <span className="text-2xl font-extrabold text-purple-700">
            Rs. {listings.reduce((sum, l) => sum + l.monthlyRent, 0).toLocaleString()}
          </span>
          <p className="text-[11px] text-slate-500 font-medium">Combined monthly yield</p>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 text-sm font-bold gap-6">
        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 transition-colors flex items-center gap-2 relative ${
            activeTab === 'applications'
              ? 'text-emerald-600 border-b-2 border-emerald-600'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Users size={16} />
          <span>Student Applications</span>
          {pendingApps.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold text-[11px] flex items-center justify-center shadow-sm">
              {pendingApps.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-3 transition-colors flex items-center gap-2 ${
            activeTab === 'listings'
              ? 'text-emerald-600 border-b-2 border-emerald-600'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Building2 size={16} />
          <span>My Listings ({listings.length})</span>
        </button>
      </div>

      {/* Tab Content 1: Applications */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Student Viewing & Booking Applications</h3>
          
          {applications.length === 0 ? (
            <div className="p-10 rounded-2xl bg-white border border-slate-200 text-center text-slate-500 text-sm font-medium shadow-sm">
              No student applications received yet.
            </div>
          ) : (
            <div className="space-y-3.5">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-emerald-300 transition-all"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-base">{app.studentName}</h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200">
                        {app.faculty || app.university || 'University Student'}
                      </span>
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

                    <p className="text-xs text-slate-600 font-semibold">
                      Applied for: <span className="text-sky-700 font-bold">{app.listingTitle}</span>
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium pt-1">
                      <span>Student ID: <strong className="text-slate-800">{app.studentIdNum || 'STU-2026-984'}</strong></span>
                      <span>Target Move-in: <strong className="text-slate-800">{app.moveInDate}</strong></span>
                      <span>Phone: <strong className="text-slate-800">{app.studentPhone || '+94 77 123 4567'}</strong></span>
                    </div>

                    {app.notes && (
                      <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-xl mt-1 border border-slate-200">
                        "{app.notes}"
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  {app.status === 'Pending' && (
                    <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
                      <button
                        onClick={() => onUpdateApplicationStatus(app.id, 'Approved')}
                        className="btn btn-accent text-xs px-4 py-2 flex-1 md:flex-none flex items-center justify-center gap-1.5 font-bold"
                      >
                        <CheckCircle2 size={15} /> Accept Application
                      </button>
                      <button
                        onClick={() => onUpdateApplicationStatus(app.id, 'Declined')}
                        className="btn btn-outline text-xs px-3.5 py-2 text-rose-600 border-rose-200 hover:bg-rose-50 flex-1 md:flex-none flex items-center justify-center gap-1.5 font-bold"
                      >
                        <XCircle size={15} /> Decline
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content 2: My Listings */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Your Listed Accommodations</h3>
            <button onClick={onOpenAddListing} className="btn btn-accent text-xs px-3.5 py-2 font-bold">
              + Add Property
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listings.map((lst) => (
              <div key={lst.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex gap-4 items-center hover:border-emerald-300 transition-all">
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
                <button
                  onClick={() => onDeleteListing(lst.id)}
                  className="p-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-600 hover:text-white transition-colors"
                  title="Delete listing"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
