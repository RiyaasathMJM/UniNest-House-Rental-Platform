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
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="badge badge-verified"><ShieldCheck size={13} /> Verified Property Owner</span>
            <span className="text-xs text-slate-400">Landlord Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">House Owner Management Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Manage your student accommodation listings, verify student tenant applications, and respond to inquiries.
          </p>
        </div>

        <button
          onClick={onOpenAddListing}
          className="btn btn-accent px-5 py-3 text-sm font-bold shadow-lg shadow-emerald-500/20 shrink-0"
        >
          <PlusCircle size={18} /> Post New Accommodation
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Active Listings</span>
            <Building2 size={18} className="text-emerald-400" />
          </div>
          <span className="text-2xl font-extrabold text-white">{listings.length}</span>
          <p className="text-[11px] text-slate-500">Accommodation units online</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Pending Applications</span>
            <Clock size={18} className="text-amber-400" />
          </div>
          <span className="text-2xl font-extrabold text-amber-400">{pendingApps.length}</span>
          <p className="text-[11px] text-slate-500">Requires your review</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Approved Tenants</span>
            <CheckCircle2 size={18} className="text-sky-400" />
          </div>
          <span className="text-2xl font-extrabold text-sky-400">{approvedApps.length}</span>
          <p className="text-[11px] text-slate-500">Confirmed move-ins</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Revenue Potential</span>
            <TrendingUp size={18} className="text-purple-400" />
          </div>
          <span className="text-2xl font-extrabold text-purple-300">
            Rs. {listings.reduce((sum, l) => sum + l.monthlyRent, 0).toLocaleString()}
          </span>
          <p className="text-[11px] text-slate-500">Combined monthly yield</p>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 text-sm font-semibold gap-6">
        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 transition-colors flex items-center gap-2 relative ${
            activeTab === 'applications'
              ? 'text-emerald-400 border-b-2 border-emerald-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users size={16} />
          <span>Student Applications</span>
          {pendingApps.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[11px] flex items-center justify-center">
              {pendingApps.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-3 transition-colors flex items-center gap-2 ${
            activeTab === 'listings'
              ? 'text-emerald-400 border-b-2 border-emerald-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building2 size={16} />
          <span>My Listings ({listings.length})</span>
        </button>
      </div>

      {/* Tab Content 1: Applications */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Student Viewing & Booking Applications</h3>
          
          {applications.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-400 text-sm">
              No student applications received yet.
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-slate-700 transition-all"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-base">{app.studentName}</h4>
                      <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 text-xs font-semibold border border-sky-500/20">
                        {app.faculty}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        app.status === 'Approved'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : app.status === 'Declined'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-medium">
                      Applied for: <span className="text-sky-400 font-semibold">{app.listingTitle}</span>
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                      <span>Student ID: <strong className="text-slate-200">{app.studentIdNum}</strong></span>
                      <span>Target Move-in: <strong className="text-slate-200">{app.moveInDate}</strong></span>
                      <span>Phone: <strong className="text-slate-200">{app.studentPhone}</strong></span>
                    </div>

                    {app.notes && (
                      <p className="text-xs text-slate-400 italic bg-slate-950/60 p-2 rounded-lg mt-1 border border-slate-800">
                        "{app.notes}"
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  {app.status === 'Pending' && (
                    <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
                      <button
                        onClick={() => onUpdateApplicationStatus(app.id, 'Approved')}
                        className="btn btn-accent text-xs px-4 py-2 flex-1 md:flex-none flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 size={15} /> Accept Application
                      </button>
                      <button
                        onClick={() => onUpdateApplicationStatus(app.id, 'Declined')}
                        className="btn btn-outline text-xs px-3 py-2 text-rose-400 border-rose-500/30 hover:bg-rose-500/10 flex-1 md:flex-none flex items-center justify-center gap-1.5"
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
            <h3 className="text-lg font-bold text-white">Your Listed Accommodations</h3>
            <button onClick={onOpenAddListing} className="btn btn-accent text-xs px-3 py-1.5">
              + Add Property
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listings.map((lst) => (
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
                <button
                  onClick={() => onDeleteListing(lst.id)}
                  className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
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
