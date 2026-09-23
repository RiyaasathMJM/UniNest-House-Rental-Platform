import React, { useState } from 'react';
import { X, Building2, MapPin, Footprints, DollarSign, Check, Plus, Upload, Camera, Navigation, Trash2, Image as ImageIcon } from 'lucide-react';
import { UNIVERSITIES, PROPERTY_TYPES, AMENITIES_LIST } from '../data/mockData';

export default function AddListingModal({
  onClose,
  onAddListing,
  editingListing = null,
  onUpdateListing = null
}) {
  const isEditMode = Boolean(editingListing);

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    title: editingListing?.title || '',
    type: editingListing?.type || 'Annex',
    universityId: editingListing?.universityId || 'u-colombo',
    address: editingListing?.address || '',
    lat: editingListing?.lat || '6.9010',
    lng: editingListing?.lng || '79.8600',
    googleMapsUrl: editingListing?.googleMapsUrl || '',
    distanceKm: editingListing?.distanceKm ?? 0.5,
    walkingTimeMinutes: editingListing?.walkingTimeMinutes ?? 6,
    nearbyFaculty: editingListing?.nearbyFaculty || 'Faculty of Science',
    monthlyRent: editingListing?.monthlyRent ?? 20000,
    securityDeposit: editingListing?.securityDeposit ?? 20000,
    billsIncluded: editingListing?.billsIncluded || {
      water: true,
      electricity: false,
      wifi: true
    },
    genderPreference: editingListing?.genderPreference || 'Any',
    maxOccupants: editingListing?.maxOccupants ?? 1,
    imageUrl: editingListing?.images?.[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80',
    amenities: editingListing?.amenities || ['High-Speed Wi-Fi', 'Study Desk & Chair', 'Attached Bathroom'],
    houseRules: editingListing?.houseRules || ['Curfew at 10:00 PM', 'No Smoking inside premises'],
    description: editingListing?.description || ''
  });

  const [uploadedPhotos, setUploadedPhotos] = useState(
    editingListing?.images && editingListing.images.length > 0
      ? editingListing.images
      : ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80']
  );
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const handleAmenityToggle = (am) => {
    setFormData(prev => {
      const exists = prev.amenities.includes(am);
      const updated = exists ? prev.amenities.filter(a => a !== am) : [...prev.amenities, am];
      return { ...prev, amenities: updated };
    });
  };

  const handlePhotoFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhotos(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemovePhoto = (index) => {
    setUploadedPhotos(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleDetectGPSLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your device browser.");
      return;
    }
    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        setFormData(prev => ({
          ...prev,
          lat,
          lng,
          address: prev.address || `GPS Pin (${lat}, ${lng})`,
          googleMapsUrl: `https://www.google.com/maps?q=${lat},${lng}`
        }));
        setIsDetectingLocation(false);
      },
      (err) => {
        console.warn("Geolocation error:", err.message);
        setIsDetectingLocation(false);
        alert("Unable to detect GPS coordinates automatically. You can enter address or map link manually below.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalImages = uploadedPhotos.length > 0 
      ? uploadedPhotos 
      : [formData.imageUrl || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80'];

    if (isEditMode && onUpdateListing) {
      const updatedListing = {
        ...editingListing,
        ...formData,
        distanceKm: Number(formData.distanceKm),
        walkingTimeMinutes: Number(formData.walkingTimeMinutes),
        monthlyRent: Number(formData.monthlyRent),
        securityDeposit: Number(formData.securityDeposit),
        images: finalImages
      };
      onUpdateListing(editingListing.id, updatedListing);
    } else {
      const newListing = {
        id: `lst-${Date.now()}`,
        ...formData,
        distanceKm: Number(formData.distanceKm),
        walkingTimeMinutes: Number(formData.walkingTimeMinutes),
        monthlyRent: Number(formData.monthlyRent),
        securityDeposit: Number(formData.securityDeposit),
        verified: true,
        rating: 5.0,
        reviewCount: 1,
        images: finalImages,
        landlord: {
          id: 'l-owner-self',
          name: 'House Owner (You)',
          phone: '+94 77 000 1122',
          email: 'owner@unilodge.lk',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
          verified: true,
          responseRate: '100%',
          joinedYear: '2026'
        }
      };
      onAddListing(newListing);
    }
    onClose();
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div 
        className="modal-content max-w-2xl bg-white border border-slate-200 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50/95 backdrop-blur-md border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 size={20} className="text-emerald-600" />
            <h2 className="text-base font-extrabold text-slate-900">
              {isEditMode ? 'Edit Accommodation Listing' : 'Post New Student Accommodation'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold flex items-center justify-center text-xs transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Wizard Steps Tracker */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold">
          {[
            { num: 1, label: '1. Basic Info' },
            { num: 2, label: '2. Location' },
            { num: 3, label: '3. Rent & Terms' },
            { num: 4, label: '4. Facilities' }
          ].map(s => (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`pb-1 transition-colors ${
                step === s.num ? 'text-emerald-700 border-b-2 border-emerald-600 font-extrabold' : 'text-slate-500'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1">
                <label className="text-slate-700 font-bold block">Listing Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Annex Room near UCSC Gate"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-control text-xs bg-slate-50 text-slate-900 border-slate-300 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Property Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="input-control text-xs bg-slate-50 text-slate-900 border-slate-300 font-medium"
                  >
                    {PROPERTY_TYPES.map(pt => (
                      <option key={pt.id} value={pt.id}>{pt.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Gender Preference *</label>
                  <select
                    value={formData.genderPreference}
                    onChange={(e) => setFormData({ ...formData, genderPreference: e.target.value })}
                    className="input-control text-xs bg-slate-50 text-slate-900 border-slate-300 font-medium"
                  >
                    <option value="Any">Any Student</option>
                    <option value="Boys Only">Boys Only</option>
                    <option value="Girls Only">Girls Only</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-bold block">Detailed Description *</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Describe room condition, study desk size, ventilation, and nearby conveniences..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-control text-xs bg-slate-50 text-slate-900 border-slate-300 font-medium"
                />
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn btn-primary w-full py-2.5 font-bold"
              >
                Next: Location & Proximity →
              </button>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              
              {/* Quick GPS Geolocation Button */}
              <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-extrabold text-sky-900 text-xs flex items-center gap-1.5">
                    <MapPin size={14} className="text-sky-600" /> Set House Location on Website
                  </span>
                  <p className="text-[11px] text-sky-700 font-medium">Use device GPS or enter address to set exact map coordinates</p>
                </div>
                <button
                  type="button"
                  onClick={handleDetectGPSLocation}
                  disabled={isDetectingLocation}
                  className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition-all shrink-0 active:scale-95 disabled:opacity-50"
                >
                  {isDetectingLocation ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Navigation size={13} />
                  )}
                  <span>{isDetectingLocation ? 'Detecting...' : 'Use My GPS Location'}</span>
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-bold block">Target University Campus *</label>
                <select
                  value={formData.universityId}
                  onChange={(e) => setFormData({ ...formData, universityId: e.target.value })}
                  className="input-control text-xs bg-slate-50 text-slate-900 border-slate-300 font-medium"
                >
                  {UNIVERSITIES.map(u => (
                    <option key={u.id} value={u.id}>{u.name} ({u.code})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-bold block">Full Street Address *</label>
                <input
                  type="text"
                  required
                  placeholder="No, Street Name, Town"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="input-control text-xs bg-slate-50 text-slate-900 border-slate-300 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-bold block">Google Maps Location Link (Optional)</label>
                <input
                  type="url"
                  placeholder="https://maps.google.com/?q=..."
                  value={formData.googleMapsUrl}
                  onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                  className="input-control text-xs bg-slate-50 text-slate-900 border-slate-300 font-medium"
                />
              </div>

              {/* Embedded Live Google Maps Setter Preview Box */}
              <div className="space-y-1.5 pt-1">
                <label className="text-slate-700 font-extrabold block text-[11px] flex items-center justify-between">
                  <span>Interactive Map Preview (Set Location):</span>
                  <span className="text-slate-500 font-normal text-[10px]">Updates automatically from address</span>
                </label>
                <div className="w-full h-44 rounded-xl overflow-hidden border border-slate-300 shadow-inner bg-slate-100 relative">
                  <iframe
                    title="Live Location Setter Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent((formData.address || 'Colombo, Sri Lanka') + ', Sri Lanka')}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Nearest Faculty / Gate *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. UCSC Gate or Engineering Faculty"
                    value={formData.nearbyFaculty}
                    onChange={(e) => setFormData({ ...formData, nearbyFaculty: e.target.value })}
                    className="input-control text-xs bg-slate-50 text-slate-900 border-slate-300 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Walking Minutes *</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    required
                    value={formData.walkingTimeMinutes}
                    onChange={(e) => setFormData({ ...formData, walkingTimeMinutes: e.target.value })}
                    className="input-control text-xs bg-slate-50 text-slate-900 border-slate-300 font-medium"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-outline flex-1 py-2.5 font-bold border-slate-300 text-slate-700"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="btn btn-primary flex-1 py-2.5 font-bold"
                >
                  Next: Pricing & Bills →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Rent & Bills */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Monthly Rent (LKR) *</label>
                  <input
                    type="number"
                    required
                    value={formData.monthlyRent}
                    onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
                    className="input-control text-xs font-bold text-sky-700 bg-slate-50 border-slate-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Security Deposit (LKR) *</label>
                  <input
                    type="number"
                    required
                    value={formData.securityDeposit}
                    onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })}
                    className="input-control text-xs font-bold bg-slate-50 text-slate-900 border-slate-300"
                  />
                </div>
              </div>

              {/* Bills Inclusion Toggles */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="text-slate-900 font-extrabold block">Included Utility Bills:</label>
                
                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer font-medium text-slate-800">
                  <span>High-Speed Wi-Fi Included</span>
                  <input
                    type="checkbox"
                    checked={formData.billsIncluded.wifi}
                    onChange={(e) => setFormData({
                      ...formData,
                      billsIncluded: { ...formData.billsIncluded, wifi: e.target.checked }
                    })}
                    className="accent-emerald-600 w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer font-medium text-slate-800">
                  <span>Water Bill Included</span>
                  <input
                    type="checkbox"
                    checked={formData.billsIncluded.water}
                    onChange={(e) => setFormData({
                      ...formData,
                      billsIncluded: { ...formData.billsIncluded, water: e.target.checked }
                    })}
                    className="accent-emerald-600 w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer font-medium text-slate-800">
                  <span>Electricity Bill Included</span>
                  <input
                    type="checkbox"
                    checked={formData.billsIncluded.electricity}
                    onChange={(e) => setFormData({
                      ...formData,
                      billsIncluded: { ...formData.billsIncluded, electricity: e.target.checked }
                    })}
                    className="accent-emerald-600 w-4 h-4"
                  />
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn btn-outline flex-1 py-2.5 font-bold border-slate-300 text-slate-700"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="btn btn-primary flex-1 py-2.5 font-bold"
                >
                  Next: Amenities & Photos →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Amenities & Device Photos */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              
              {/* Device Photo Upload Box */}
              <div className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <label className="text-slate-900 font-extrabold block text-xs flex items-center gap-1.5">
                  <Camera size={16} className="text-emerald-600" /> Accommodation Photos (Upload from Device) *
                </label>
                
                <input
                  type="file"
                  id="device-photo-upload"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoFileUpload}
                  className="hidden"
                />

                <label
                  htmlFor="device-photo-upload"
                  className="w-full flex items-center justify-center gap-2 p-3.5 bg-white hover:bg-slate-100 border-2 border-dashed border-emerald-400 rounded-xl cursor-pointer text-emerald-800 font-extrabold text-xs transition-all shadow-sm active:scale-98"
                >
                  <Upload size={18} className="text-emerald-600" />
                  <span>Click to Pick & Upload Photos from Device</span>
                </label>

                {/* Uploaded Thumbnails List */}
                {uploadedPhotos.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 pt-2">
                    {uploadedPhotos.map((photo, idx) => (
                      <div key={idx} className="relative h-20 rounded-xl overflow-hidden border border-slate-300 group bg-slate-200">
                        <img src={photo} alt={`Upload ${idx+1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(idx)}
                          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-md transition-all text-xs"
                          title="Remove photo"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Image URL fallback */}
              <div className="space-y-1">
                <label className="text-slate-600 font-semibold block text-[11px]">Or Provide Photo Image URL:</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.imageUrl}
                  onChange={(e) => {
                    setFormData({ ...formData, imageUrl: e.target.value });
                    if (e.target.value && !uploadedPhotos.includes(e.target.value)) {
                      setUploadedPhotos(prev => [e.target.value, ...prev]);
                    }
                  }}
                  className="input-control text-xs font-mono bg-slate-50 text-slate-900 border-slate-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-700 font-bold block">Select Facilities & Amenities:</label>
                <div className="grid grid-cols-2 gap-1.5 max-h-40 overflow-y-auto pr-1">
                  {AMENITIES_LIST.map((am) => {
                    const selected = formData.amenities.includes(am);
                    return (
                      <label
                        key={am}
                        onClick={() => handleAmenityToggle(am)}
                        className={`p-2.5 rounded-xl border cursor-pointer text-xs flex items-center justify-between font-bold ${
                          selected ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        <span>{am}</span>
                        {selected && <Check size={12} className="text-emerald-700" />}
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="btn btn-outline flex-1 py-2.5 font-bold border-slate-300 text-slate-700"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="btn btn-accent flex-1 py-2.5 font-bold shadow-md shadow-emerald-600/20"
                >
                  {isEditMode ? 'Save Changes ✨' : 'Publish Listing Now ✨'}
                </button>
              </div>
            </div>
          )}

        </form>

      </div>
    </div>
  );
}

