import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FilterSidebar from './components/FilterSidebar';
import ListingCard from './components/ListingCard';
import ListingDetailModal from './components/ListingDetailModal';
import CompareModal from './components/CompareModal';
import BookingModal from './components/BookingModal';
import DirectMessageModal from './components/DirectMessageModal';
import LandlordDashboard from './components/LandlordDashboard';
import AddListingModal from './components/AddListingModal';
import StudentDashboard from './components/StudentDashboard';
import Footer from './components/Footer';
import LoginScreen from './components/LoginScreen';

import { 
  MOCK_LISTINGS, 
  INITIAL_APPLICATIONS, 
  INITIAL_MESSAGES, 
  UNIVERSITIES 
} from './data/mockData';
import { Sparkles, Footprints, ShieldCheck, Heart, SlidersHorizontal, ArrowUpRight } from 'lucide-react';

export default function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Navigation & Role State
  const [userRole, setUserRole] = useState('student'); // 'student' | 'landlord'
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'student-portal' | 'landlord'

  // Search & Filter State
  const [selectedUniversity, setSelectedUniversity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickFilter, setQuickFilter] = useState('all'); // 'all' | 'walking' | 'girls' | 'bills' | 'budget'

  const defaultFilters = {
    maxPrice: 50000,
    maxDistance: 'all', // 'all', '0.5', '1.0'
    propertyTypes: [],
    genderPreference: 'all', // 'all', 'Boys Only', 'Girls Only'
    billsIncludedOnly: false,
    amenities: []
  };

  const [filters, setFilters] = useState(defaultFilters);

  // Core App Data State
  const [listings, setListings] = useState(MOCK_LISTINGS);
  const [savedIds, setSavedIds] = useState(['lst-101']);
  const [compareIds, setCompareIds] = useState(['lst-101', 'lst-102']);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  // Modals
  const [selectedListing, setSelectedListing] = useState(null);
  const [bookingListing, setBookingListing] = useState(null);
  const [chatListing, setChatListing] = useState(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isAddListingModalOpen, setIsAddListingModalOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Filter Logic Computation
  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      // University Campus Filter
      if (selectedUniversity !== 'all' && item.universityId !== selectedUniversity) {
        return false;
      }

      // Keyword Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesAddress = item.address.toLowerCase().includes(q);
        const matchesFaculty = item.nearbyFaculty.toLowerCase().includes(q);
        const matchesType = item.type.toLowerCase().includes(q);
        const matchesAmenity = item.amenities.some(a => a.toLowerCase().includes(q));
        if (!matchesTitle && !matchesAddress && !matchesFaculty && !matchesType && !matchesAmenity) {
          return false;
        }
      }

      // Quick Tag Chips
      if (quickFilter === 'walking' && item.walkingTimeMinutes > 5) return false;
      if (quickFilter === 'girls' && item.genderPreference !== 'Girls Only') return false;
      if (quickFilter === 'bills' && (!item.billsIncluded.water || !item.billsIncluded.wifi || !item.billsIncluded.electricity)) return false;
      if (quickFilter === 'budget' && item.monthlyRent > 20000) return false;

      // Price Filter
      if (item.monthlyRent > filters.maxPrice) return false;

      // Distance Radius Filter
      if (filters.maxDistance !== 'all') {
        const maxDist = parseFloat(filters.maxDistance);
        if (item.distanceKm > maxDist) return false;
      }

      // Property Type Checkboxes
      if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(item.type)) {
        return false;
      }

      // Gender Preference
      if (filters.genderPreference !== 'all' && item.genderPreference !== filters.genderPreference) {
        return false;
      }

      // Utility Bills Included Only
      if (filters.billsIncludedOnly) {
        if (!item.billsIncluded.water || !item.billsIncluded.wifi || !item.billsIncluded.electricity) {
          return false;
        }
      }

      // Amenities Checklist
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(am => item.amenities.includes(am));
        if (!hasAllAmenities) return false;
      }

      return true;
    });
  }, [listings, selectedUniversity, searchQuery, quickFilter, filters]);

  // Actions
  const handleToggleSave = (id) => {
    setSavedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleToggleCompare = (id) => {
    setCompareIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 listings at a time.");
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleAddListing = (newListing) => {
    setListings(prev => [newListing, ...prev]);
    alert("✨ Accommodation Published Successfully! It is now visible to all students.");
  };

  const handleDeleteListing = (id) => {
    if (confirm("Are you sure you want to remove this property listing?")) {
      setListings(prev => prev.filter(l => l.id !== id));
    }
  };

  const handleSubmitApplication = (newApp) => {
    setApplications(prev => [newApp, ...prev]);
  };

  const handleUpdateApplicationStatus = (id, newStatus) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const handleSendMessage = (newMsg) => {
    setMessages(prev => [...prev, newMsg]);
  };

  const compareListings = useMemo(() => {
    return listings.filter(l => compareIds.includes(l.id));
  }, [listings, compareIds]);

  const savedListings = useMemo(() => {
    return listings.filter(l => savedIds.includes(l.id));
  }, [listings, savedIds]);

  const handleLogin = (role, username) => {
    setUserRole(role);
    setActiveTab(role === 'landlord' ? 'landlord' : 'explore');
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-sky-500 selection:text-white">
      
      {/* Header Navigation */}
      <Navbar
        userRole={userRole}
        onLogout={() => setIsAuthenticated(false)}
        selectedUniversity={selectedUniversity}
        setSelectedUniversity={setSelectedUniversity}
        savedIds={savedIds}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        compareListCount={compareIds.length}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddListing={() => setIsAddListingModalOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1">
        
        {userRole === 'landlord' ? (
          /* HOUSE OWNER VIEW ONLY */
          <div className="app-container py-8">
            <LandlordDashboard
              listings={listings}
              applications={applications}
              messages={messages}
              onUpdateApplicationStatus={handleUpdateApplicationStatus}
              onOpenAddListing={() => setIsAddListingModalOpen(true)}
              onDeleteListing={handleDeleteListing}
              onOpenChatModal={(l) => setChatListing(l)}
            />
          </div>
        ) : activeTab === 'student-portal' ? (
          /* STUDENT DASHBOARD VIEW */
          <div className="app-container py-8">
            <StudentDashboard
              savedListings={savedListings}
              applications={applications}
              messages={messages}
              onSelectListing={(l) => setSelectedListing(l)}
              onOpenChatModal={(l) => setChatListing(l)}
              onRemoveBookmark={handleToggleSave}
            />
          </div>
        ) : (
          /* STUDENT EXPLORER & SEARCH VIEW */
          <div>
            {/* Student Hero Banner */}
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedUniversity={selectedUniversity}
              setSelectedUniversity={setSelectedUniversity}
              quickFilter={quickFilter}
              setQuickFilter={setQuickFilter}
            />

            {/* Content Explorer Section */}
            <div className="app-container py-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Filter Sidebar */}
                <div className="lg:col-span-3">
                  <FilterSidebar
                    filters={filters}
                    setFilters={setFilters}
                    onReset={() => {
                      setFilters(defaultFilters);
                      setQuickFilter('all');
                      setSearchQuery('');
                      setSelectedUniversity('all');
                    }}
                  />
                </div>

                {/* Right Listings Grid */}
                <div className="lg:col-span-9 space-y-6">
                  
                  {/* Results Count & Sort Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <span>Available Student Accommodations</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200">
                          {filteredListings.length} Found
                        </span>
                      </h2>
                      <p className="text-xs text-slate-500 font-medium">
                        {selectedUniversity === 'all' 
                          ? 'Showing listings across all university campus areas' 
                          : `Filtered near ${UNIVERSITIES.find(u => u.id === selectedUniversity)?.name}`}
                      </p>
                    </div>

                    {userRole === 'student' && compareIds.length > 0 && (
                      <button
                        onClick={() => setIsCompareModalOpen(true)}
                        className="btn btn-outline text-xs px-3.5 py-2 border-sky-300 text-sky-700 hover:bg-sky-50 font-bold flex items-center gap-1.5"
                      >
                        <SlidersHorizontal size={14} />
                        <span>Compare ({compareIds.length}/3)</span>
                      </button>
                    )}
                  </div>

                  {/* Listings Grid */}
                  {filteredListings.length === 0 ? (
                    <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center space-y-4 shadow-sm">
                      <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
                        <Footprints size={32} />
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-900">No Matching Accommodations Found</h3>
                      <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
                        Try adjusting your budget slider, distance radius, or clearing search filters to see more student rooms.
                      </p>
                      <button
                        onClick={() => {
                          setFilters(defaultFilters);
                          setQuickFilter('all');
                          setSearchQuery('');
                          setSelectedUniversity('all');
                        }}
                        className="btn btn-primary text-xs px-4 py-2 font-bold"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="listings-grid">
                      {filteredListings.map((listing) => (
                        <ListingCard
                          key={listing.id}
                          listing={listing}
                          isSaved={savedIds.includes(listing.id)}
                          onToggleSave={handleToggleSave}
                          onSelectListing={(l) => setSelectedListing(l)}
                          isCompared={userRole === 'student' && compareIds.includes(listing.id)}
                          onToggleCompare={userRole === 'student' ? handleToggleCompare : null}
                        />
                      ))}
                    </div>
                  )}

                </div>

              </div>
            </div>
          </div>
        )}

      </main>

      {/* Floating Side-by-Side Compare Sticky Bar (Student Only) */}
      {userRole === 'student' && compareIds.length > 0 && !isCompareModalOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-xl border border-sky-400 p-3.5 px-6 rounded-2xl shadow-2xl flex items-center gap-4 animate-pop-in">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-sky-600" />
            <span className="text-xs font-bold text-slate-900">{compareIds.length} Accommodations Selected</span>
          </div>

          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="btn btn-primary text-xs px-4 py-2 font-bold shadow-md"
          >
            Compare Side-by-Side →
          </button>
        </div>
      )}

      {/* Bookmarks Drawer Modal */}
      {isBookmarksOpen && (
        <div className="modal-overlay animate-fade-in" onClick={() => setIsBookmarksOpen(false)}>
          <div className="modal-content max-w-md bg-white border border-slate-200" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart size={18} className="text-rose-500 fill-rose-500" />
                <h3 className="text-base font-bold text-slate-900">Saved Accommodation Units</h3>
              </div>
              <button
                onClick={() => setIsBookmarksOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs hover:bg-slate-300 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {savedListings.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-6 font-medium">No saved accommodations yet.</p>
              ) : (
                savedListings.map((l) => (
                  <div key={l.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{l.title}</h4>
                      <p className="text-[11px] text-sky-700 font-extrabold">Rs. {l.monthlyRent.toLocaleString()}/mo</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsBookmarksOpen(false);
                        setSelectedListing(l);
                      }}
                      className="btn btn-primary text-[11px] px-3 py-1.5 font-bold"
                    >
                      View Unit
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Listing Details Modal */}
      {selectedListing && (
        <ListingDetailModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onOpenBookingModal={(l) => setBookingListing(l)}
          onOpenChatModal={(l) => setChatListing(l)}
        />
      )}

      {/* Compare Modal */}
      {isCompareModalOpen && (
        <CompareModal
          compareListings={compareListings}
          onClose={() => setIsCompareModalOpen(false)}
          onRemoveFromCompare={(id) => handleToggleCompare(id)}
          onClearCompare={() => setCompareIds([])}
          onSelectListing={(l) => setSelectedListing(l)}
        />
      )}

      {/* Booking / Schedule Viewing Application Modal */}
      {bookingListing && (
        <BookingModal
          listing={bookingListing}
          onClose={() => setBookingListing(null)}
          onSubmitApplication={handleSubmitApplication}
        />
      )}

      {/* Direct Landlord Chat Modal */}
      {chatListing && (
        <DirectMessageModal
          listing={chatListing}
          messages={messages}
          onSendMessage={handleSendMessage}
          onClose={() => setChatListing(null)}
        />
      )}

      {/* Landlord Add Listing Modal */}
      {isAddListingModalOpen && (
        <AddListingModal
          onClose={() => setIsAddListingModalOpen(false)}
          onAddListing={handleAddListing}
        />
      )}

      {/* Footer */}
      <Footer />

    </div>
  );
}
