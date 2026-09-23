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
  MapPin,
  ExternalLink,
  Pencil,
  RotateCcw
} from 'lucide-react';

export default function LandlordDashboard({
  listings,
  applications,
  messages = [],
  onUpdateApplicationStatus,
  onOpenAddListing,

  onEditListing,
  onDeleteListing,
  onOpenChatModal
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
            <span className="text-xs text-slate-600 font-bold">House Owner Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">House Owner Management Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-700 font-medium max-w-xl">
            Manage your student accommodation listings, verify student tenant applications, check Google Maps locations, and chat directly with inquiry students.
          </p>
        </div>

        <button
          onClick={onOpenAddListing}
          className="btn btn-accent px-5 py-3 text-sm font-extrabold shadow-md shadow-emerald-600/20 shrink-0"
        >
          <PlusCircle size={18} /> Post New Accommodation
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-700 font-extrabold">
            <span className="text-xs">Active Listings</span>
            <Building2 size={18} className="text-emerald-600" />
          </div>
          <span className="text-3xl font-extrabold text-slate-900">{listings.length}</span>
          <p className="text-[11px] text-slate-600 font-semibold">Accommodation units online</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-700 font-extrabold">
            <span className="text-xs">Pending Applications</span>
            <Clock size={18} className="text-amber-600" />
          </div>
          <span className="text-3xl font-extrabold text-amber-600">{pendingApps.length}</span>
          <p className="text-[11px] text-slate-600 font-semibold">Requires your review</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-700 font-extrabold">
            <span className="text-xs">Approved Tenants</span>
            <CheckCircle2 size={18} className="text-sky-600" />
          </div>
          <span className="text-3xl font-extrabold text-sky-700">{approvedApps.length}</span>
          <p className="text-[11px] text-slate-600 font-semibold">Confirmed move-ins</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-700 font-extrabold">
            <span className="text-xs">Total Yield Potential</span>
            <TrendingUp size={18} className="text-purple-600" />
          </div>
          <span className="text-2xl font-extrabold text-purple-700">
            Rs. {listings.reduce((sum, l) => sum + l.monthlyRent, 0).toLocaleString()}
          </span>
          <p className="text-[11px] text-slate-600 font-semibold">Combined monthly yield</p>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 text-sm font-extrabold gap-6">
        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 transition-colors flex items-center gap-2 relative ${
            activeTab === 'applications'
              ? 'text-emerald-700 border-b-2 border-emerald-600 font-extrabold'
              : 'text-slate-700 hover:text-slate-900'
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
          onClick={() => setActiveTab('messages')}
          className={`pb-3 transition-colors flex items-center gap-2 ${
            activeTab === 'messages'
              ? 'text-emerald-700 border-b-2 border-emerald-600 font-extrabold'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          <MessageSquare size={16} />
          <span>Direct Student Inquiries ({messages.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-3 transition-colors flex items-center gap-2 ${
            activeTab === 'listings'
              ? 'text-emerald-700 border-b-2 border-emerald-600 font-extrabold'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          <Building2 size={16} />
          <span>My Listings ({listings.length})</span>
        </button>
      </div>

      {/* Tab Content 1: Applications */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <h3 className="text-lg font-extrabold text-slate-900">Student Viewing & Booking Applications</h3>
          
          {applications.length === 0 ? (
            <div className="p-10 rounded-2xl bg-white border border-slate-200 text-center text-slate-700 text-sm font-semibold shadow-sm">
              No student applications received yet.
            </div>
          ) : (
            <div className="space-y-3.5">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-emerald-400 transition-all"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-slate-900 text-base">{app.studentName}</h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 text-xs font-extrabold border border-sky-200">
                        {app.faculty || app.university || 'University Student'}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                        app.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                          : app.status === 'Declined'
                          ? 'bg-rose-50 text-rose-800 border border-rose-300'
                          : 'bg-amber-50 text-amber-900 border border-amber-300'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-800 font-bold">
                      Applied for: <span className="text-sky-800">{app.listingTitle}</span>
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700 font-semibold pt-1">
                      <span>Student ID: <strong className="text-slate-900">{app.studentIdNum || 'STU-2026-984'}</strong></span>
                      <span>Target Move-in: <strong className="text-slate-900">{app.moveInDate}</strong></span>
                    </div>

                    {app.notes && (
                      <p className="text-xs text-slate-800 italic bg-slate-50 p-2.5 rounded-xl mt-1 border border-slate-200 font-medium">
                        "{app.notes}"
                      </p>
                    )}
                  </div>

                  {/* Actions: Message & Approval */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0 w-full md:w-auto">
                    {onOpenChatModal && (
                      <button
                        onClick={() => onOpenChatModal({ id: app.listingId || 'lst-101', title: app.listingTitle, landlord: { name: app.studentName } })}
                        className="btn btn-outline text-xs px-3.5 py-2 text-sky-700 border-sky-300 hover:bg-sky-50 font-extrabold flex items-center justify-center gap-1.5"
                      >
                        <MessageSquare size={14} /> Message Student
                      </button>
                    )}

                    {app.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => onUpdateApplicationStatus(app.id, 'Approved')}
                          className="btn btn-accent text-xs px-4 py-2 flex items-center justify-center gap-1.5 font-extrabold shadow-sm"
                        >
                          <CheckCircle2 size={15} /> Accept Application
                        </button>
                        <button
                          onClick={() => onUpdateApplicationStatus(app.id, 'Declined')}
                          className="btn btn-outline text-xs px-3 py-2 text-rose-600 border-rose-300 hover:bg-rose-50 flex items-center justify-center gap-1.5 font-extrabold"
                        >
                          <XCircle size={15} /> Decline
                        </button>
                      </>
                    )}

                    {app.status === 'Approved' && (
                      <>
                        <button
                          onClick={() => onUpdateApplicationStatus(app.id, 'Pending')}
                          className="btn btn-outline text-xs px-3 py-2 text-amber-700 border-amber-300 hover:bg-amber-50 font-extrabold flex items-center justify-center gap-1.5"
                          title="Undo approval and reset application to pending state"
                        >
                          <RotateCcw size={14} /> Undo Decision
                        </button>
                        <button
                          onClick={() => onUpdateApplicationStatus(app.id, 'Declined')}
                          className="btn btn-outline text-xs px-3 py-2 text-rose-600 border-rose-300 hover:bg-rose-50 font-extrabold flex items-center justify-center gap-1.5"
                          title="Switch decision to declined"
                        >
                          <XCircle size={14} /> Change to Decline
                        </button>
                      </>
                    )}

                    {app.status === 'Declined' && (
                      <>
                        <button
                          onClick={() => onUpdateApplicationStatus(app.id, 'Pending')}
                          className="btn btn-outline text-xs px-3 py-2 text-amber-700 border-amber-300 hover:bg-amber-50 font-extrabold flex items-center justify-center gap-1.5"
                          title="Undo decline and reset application to pending state"
                        >
                          <RotateCcw size={14} /> Undo Decision
                        </button>
                        <button
                          onClick={() => onUpdateApplicationStatus(app.id, 'Approved')}
                          className="btn btn-accent text-xs px-3.5 py-2 font-extrabold flex items-center justify-center gap-1.5 shadow-sm"
                          title="Switch decision to accepted"
                        >
                          <CheckCircle2 size={14} /> Change to Accept
                        </button>
                      </>
                    )}

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content 2: Direct Inquiries */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          <h3 className="text-lg font-extrabold text-slate-900">Direct Student Inquiries & Messages</h3>

          {messages.length === 0 ? (
            <div className="p-10 rounded-2xl bg-white border border-slate-200 text-center text-slate-700 text-sm font-semibold shadow-sm">
              No direct student messages received yet.
            </div>
          ) : (
            <div className="space-y-3.5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-emerald-400 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center border border-emerald-300">
                        {msg.senderName ? msg.senderName.charAt(0) : 'S'}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-base">{msg.senderName || 'Interested Student'}</h4>
                      <span className="text-[11px] font-bold text-slate-500">{msg.timestamp || 'Just now'}</span>
                    </div>

                    <p className="text-xs text-slate-800 font-medium italic bg-slate-50 p-2.5 rounded-xl border border-slate-200 mt-1">
                      "{msg.text}"
                    </p>
                  </div>

                  {onOpenChatModal && (
                    <button
                      onClick={() => onOpenChatModal({ id: msg.listingId || 'lst-101', title: msg.listingTitle || 'Property Inquiry', landlord: { name: msg.senderName || 'Student' } })}
                      className="btn btn-accent text-xs px-4 py-2 font-extrabold flex items-center gap-1.5 shrink-0"
                    >
                      <MessageSquare size={14} /> Open Chat
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content 3: My Listings */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-slate-900">Your Listed Accommodations</h3>
            <button onClick={onOpenAddListing} className="btn btn-accent text-xs px-3.5 py-2 font-extrabold">
              + Add Property
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listings.map((lst) => {
              const googleMapsQuery = encodeURIComponent(lst.googleMapsUrl || `${lst.title}, ${lst.address || lst.nearbyFaculty}`);
              const googleMapsLink = lst.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${googleMapsQuery}`;

              return (
                <div key={lst.id} className="p-4.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:border-emerald-400 transition-all">
                  <img
                    src={lst.images[0]}
                    alt={lst.title}
                    className="w-24 h-24 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="badge badge-verified text-[10px]">{lst.type}</span>
                      <a
                        href={googleMapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 hover:bg-emerald-100 transition-colors"
                        title="Open location on Google Maps"
                      >
                        <MapPin size={12} />
                        <span>Google Location</span>
                        <ExternalLink size={10} />
                      </a>
                    </div>
                    
                    <h4 className="font-extrabold text-slate-900 text-sm line-clamp-1">{lst.title}</h4>
                    <p className="text-xs text-slate-700 flex items-center gap-1 font-bold">
                      <MapPin size={13} className="text-sky-600" /> {lst.nearbyFaculty}
                    </p>
                    <div className="text-sm font-extrabold text-sky-800">
                      Rs. {lst.monthlyRent.toLocaleString()} / mo
                    </div>
                  </div>

                  <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <button
                      onClick={() => onEditListing && onEditListing(lst)}
                      className="btn btn-outline text-xs px-3 py-1.5 border-sky-300 text-sky-700 hover:bg-sky-50 font-extrabold flex items-center justify-center gap-1"
                      title="Edit accommodation details"
                    >
                      <Pencil size={13} /> Edit
                    </button>
                    <div className="flex gap-2">
                      <a
                        href={googleMapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline text-xs px-3 py-1.5 border-emerald-300 text-emerald-800 hover:bg-emerald-50 font-extrabold flex items-center justify-center gap-1 flex-1 sm:flex-initial"
                      >
                        <MapPin size={13} /> Maps
                      </a>
                      <button
                        onClick={() => onDeleteListing(lst.id)}
                        className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-600 hover:text-white transition-colors flex items-center justify-center shrink-0"
                        title="Delete listing"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
