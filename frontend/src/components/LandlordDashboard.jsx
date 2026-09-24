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
  RotateCcw,
  Compass,
  Search,
  Footprints,
  SlidersHorizontal
} from 'lucide-react';
import { UNIVERSITIES, PROPERTY_TYPES } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

export default function LandlordDashboard({
  listings = [],
  applications = [],
  messages = [],
  onUpdateApplicationStatus,
  onOpenAddListing,

  onEditListing,
  onDeleteListing,
  onOpenChatModal,
  onSelectListing
}) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('applications');

  // Search & Filter State for All Houses in Listing tab
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const pendingApps = applications.filter(a => a.status === 'Pending');
  const approvedApps = applications.filter(a => a.status === 'Approved');

  // Filtered listings for "All Houses in Listing" tab
  const filteredAllListings = listings.filter(item => {
    if (selectedUniversity !== 'all' && item.universityId !== selectedUniversity) {
      return false;
    }
    if (selectedType !== 'all' && item.type !== selectedType) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = item.title?.toLowerCase().includes(q);
      const matchesAddress = item.address?.toLowerCase().includes(q);
      const matchesFaculty = item.nearbyFaculty?.toLowerCase().includes(q);
      const matchesType = item.type?.toLowerCase().includes(q);
      const matchesLandlord = item.landlord?.name?.toLowerCase().includes(q);
      if (!matchesTitle && !matchesAddress && !matchesFaculty && !matchesType && !matchesLandlord) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-white to-teal-50 border border-emerald-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 font-bold">{t('landlordPortalTag', 'House Owner Portal')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{t('landlordDashboardTitle', 'House Owner Management Dashboard')}</h1>
          <p className="text-xs sm:text-sm text-slate-700 font-medium max-w-xl">
            {t('landlordSub', 'Manage your student accommodation listings, explore all market listings, verify student tenant applications, check Google Maps locations, and chat directly with inquiry students.')}
          </p>
        </div>

        <button
          onClick={onOpenAddListing}
          className="btn btn-accent px-5 py-3 text-sm font-extrabold shadow-md shadow-emerald-600/20 shrink-0"
        >
          <PlusCircle size={18} /> {t('postNewAccom', 'Post New Accommodation')}
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 cursor-pointer hover:border-emerald-300 transition-all" onClick={() => setActiveTab('listings')}>
          <div className="flex items-center justify-between text-slate-700 font-extrabold">
            <span className="text-xs">{t('myActiveListings', 'My Active Listings')}</span>
            <Building2 size={18} className="text-emerald-600" />
          </div>
          <span className="text-3xl font-extrabold text-slate-900">{listings.length}</span>
          <p className="text-[11px] text-slate-600 font-semibold">Accommodation units online</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 cursor-pointer hover:border-emerald-300 transition-all" onClick={() => setActiveTab('applications')}>
          <div className="flex items-center justify-between text-slate-700 font-extrabold">
            <span className="text-xs">{t('pendingApplications', 'Pending Applications')}</span>
            <Clock size={18} className="text-amber-600" />
          </div>
          <span className="text-3xl font-extrabold text-amber-600">{pendingApps.length}</span>
          <p className="text-[11px] text-slate-600 font-semibold">Requires your review</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 cursor-pointer hover:border-emerald-300 transition-all" onClick={() => setActiveTab('applications')}>
          <div className="flex items-center justify-between text-slate-700 font-extrabold">
            <span className="text-xs">{t('approvedTenants', 'Approved Tenants')}</span>
            <CheckCircle2 size={18} className="text-sky-600" />
          </div>
          <span className="text-3xl font-extrabold text-sky-700">{approvedApps.length}</span>
          <p className="text-[11px] text-slate-600 font-semibold">Confirmed move-ins</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 cursor-pointer hover:border-emerald-300 transition-all" onClick={() => setActiveTab('all-listings')}>
          <div className="flex items-center justify-between text-slate-700 font-extrabold">
            <span className="text-xs">{t('allPlatformHouses', 'All Platform Houses')}</span>
            <Compass size={18} className="text-purple-600" />
          </div>
          <span className="text-3xl font-extrabold text-purple-700">{listings.length}</span>
          <p className="text-[11px] text-slate-600 font-semibold">Total houses in market listing</p>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 text-sm font-extrabold gap-6 overflow-x-auto pb-0.5">
        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'applications'
              ? 'text-emerald-700 border-b-2 border-emerald-600 font-extrabold'
              : 'text-slate-700 hover:text-slate-900 font-bold'
          }`}
        >
          <Users size={16} />
          <span>{t('tabApplications', 'Student Applications')}</span>
          {pendingApps.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold text-[11px] flex items-center justify-center shadow-sm">
              {pendingApps.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`pb-3 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'messages'
              ? 'text-emerald-700 border-b-2 border-emerald-600 font-extrabold'
              : 'text-slate-700 hover:text-slate-900 font-bold'
          }`}
        >
          <MessageSquare size={16} />
          <span>{t('tabMessages', 'Direct Student Inquiries')} ({messages.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-3 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'listings'
              ? 'text-emerald-700 border-b-2 border-emerald-600 font-extrabold'
              : 'text-slate-700 hover:text-slate-900 font-bold'
          }`}
        >
          <Building2 size={16} />
          <span>{t('tabMyListings', 'My Listings')} ({listings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('all-listings')}
          className={`pb-3 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'all-listings'
              ? 'text-emerald-700 border-b-2 border-emerald-600 font-extrabold'
              : 'text-slate-700 hover:text-slate-900 font-bold'
          }`}
        >
          <Compass size={16} />
          <span className="flex items-center gap-1.5">
            <span>{t('tabAllListings', 'All Houses in Listing')}</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              {listings.length}
            </span>
          </span>
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
                    className="w-24 h-24 rounded-xl object-cover border border-slate-200 shrink-0 cursor-pointer"
                    onClick={() => onSelectListing && onSelectListing(lst)}
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
                    
                    <h4 
                      onClick={() => onSelectListing && onSelectListing(lst)}
                      className="font-extrabold text-slate-900 text-sm line-clamp-1 cursor-pointer hover:text-emerald-700 transition-colors"
                    >
                      {lst.title}
                    </h4>
                    <p className="text-xs text-slate-700 flex items-center gap-1 font-bold">
                      <MapPin size={13} className="text-sky-600" /> {lst.nearbyFaculty}
                    </p>
                    <div className="text-sm font-extrabold text-sky-800">
                      Rs. {lst.monthlyRent.toLocaleString()} / mo
                    </div>
                  </div>

                  <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <button
                      onClick={() => onSelectListing && onSelectListing(lst)}
                      className="btn btn-accent text-xs px-3 py-1.5 font-extrabold flex items-center justify-center gap-1"
                    >
                      <Eye size={13} /> View Unit
                    </button>
                    {onEditListing && (
                      <button
                        onClick={() => onEditListing(lst)}
                        className="btn btn-outline text-xs px-3 py-1.5 border-sky-300 text-sky-700 hover:bg-sky-50 font-extrabold flex items-center justify-center gap-1"
                        title="Edit accommodation details"
                      >
                        <Pencil size={13} /> Edit
                      </button>
                    )}
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

      {/* Tab Content 4: All Houses in Listing (Market Explorer) */}
      {activeTab === 'all-listings' && (
        <div className="space-y-6">
          
          {/* Header & Filter Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Compass className="text-emerald-600" size={20} />
                  <span>All Platform Accommodation Listings</span>
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  Browse, search, and inspect all student housing units published on UniNest (similar to student housing view).
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  Showing <strong className="text-emerald-700">{filteredAllListings.length}</strong> of {listings.length} houses
                </span>
                {onOpenAddListing && (
                  <button onClick={onOpenAddListing} className="btn btn-accent text-xs px-3.5 py-2 font-extrabold shrink-0">
                    + Post New Listing
                  </button>
                )}
              </div>
            </div>

            {/* Filter Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              
              {/* Search input */}
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search house, location, faculty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 text-xs font-semibold text-slate-800 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 outline-none focus:border-emerald-500"
                />
              </div>

              {/* Campus filter */}
              <div>
                <select
                  value={selectedUniversity}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                  className="w-full bg-slate-50 text-xs font-semibold text-slate-800 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="all">All University Campuses</option>
                  {(UNIVERSITIES || []).map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type Filter */}
              <div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-slate-50 text-xs font-semibold text-slate-800 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="all">All Property Types</option>
                  {(PROPERTY_TYPES || []).map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset Filters button */}
              <div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedUniversity('all');
                    setSelectedType('all');
                  }}
                  className="w-full btn btn-outline text-xs py-2.5 border-slate-300 text-slate-700 hover:bg-slate-100 font-bold"
                >
                  Reset Search Filters
                </button>
              </div>

            </div>
          </div>

          {/* Listings Cards Grid - Student Dashboard Style */}
          {filteredAllListings.length === 0 ? (
            <div className="p-10 rounded-2xl bg-white border border-slate-200 text-center text-slate-600 text-sm font-semibold shadow-sm space-y-2">
              <p className="text-slate-900 font-extrabold">No accommodation houses matched your search criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedUniversity('all');
                  setSelectedType('all');
                }}
                className="btn btn-accent text-xs px-4 py-2 font-bold"
              >
                Clear Search & Show All
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredAllListings.map((lst) => {
                const googleMapsQuery = encodeURIComponent(lst.googleMapsUrl || `${lst.title}, ${lst.address || lst.nearbyFaculty}`);
                const googleMapsLink = lst.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${googleMapsQuery}`;

                return (
                  <div
                    key={lst.id}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg overflow-hidden group"
                  >
                    {/* Top Image Section */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                      <img
                        src={lst.images[0]}
                        alt={lst.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                        <span className="badge badge-verified text-[10px] shadow-sm">
                          {lst.type}
                        </span>
                        {lst.genderPreference && (
                          <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-[10px] text-white font-bold">
                            {lst.genderPreference}
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-bold text-white z-10">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-900/85 backdrop-blur-md border border-emerald-300 text-emerald-100 flex items-center gap-1">
                          <Footprints size={11} /> {lst.walkingTimeMinutes || 5} min walk
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-slate-200">
                          {lst.landlord?.name ? `Owner: ${lst.landlord.name}` : 'Owner Listed'}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <h4
                          onClick={() => onSelectListing && onSelectListing(lst)}
                          className="font-extrabold text-slate-900 text-base line-clamp-1 group-hover:text-emerald-700 cursor-pointer transition-colors"
                        >
                          {lst.title}
                        </h4>
                        
                        <p className="text-xs text-slate-600 flex items-center gap-1 font-bold">
                          <MapPin size={13} className="text-emerald-600 shrink-0" /> {lst.nearbyFaculty}
                        </p>

                        <div className="flex flex-wrap items-center gap-1 pt-1 text-[10px]">
                          {(lst.amenities || []).slice(0, 3).map((am) => (
                            <span key={am} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold border border-slate-200">
                              {am}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div>
                          <div className="text-base font-extrabold text-emerald-800">
                            Rs. {lst.monthlyRent.toLocaleString()} <span className="text-[11px] font-normal text-slate-500">/mo</span>
                          </div>
                          <p className="text-[10px] text-slate-500">Deposit: Rs. {(lst.securityDeposit || lst.monthlyRent).toLocaleString()}</p>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <a
                            href={googleMapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors border border-slate-200"
                            title="Open Google Maps Location"
                          >
                            <MapPin size={14} />
                          </a>

                          <button
                            onClick={() => onSelectListing && onSelectListing(lst)}
                            className="btn btn-accent text-xs px-3 py-1.5 font-extrabold flex items-center gap-1"
                          >
                            <Eye size={13} /> View Unit
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

    </div>
  );
}

