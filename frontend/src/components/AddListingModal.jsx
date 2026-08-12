import React, { useState } from 'react';
import { X, Building2, MapPin, Footprints, DollarSign, Check, Plus, ShieldCheck } from 'lucide-react';
import { UNIVERSITIES, PROPERTY_TYPES, AMENITIES_LIST } from '../data/mockData';

export default function AddListingModal({
  onClose,
  onAddListing
}) {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    title: '',
    type: 'Annex',
    universityId: 'u-colombo',
    address: '',
    googleMapsUrl: '',
    distanceKm: 0.5,
    walkingTimeMinutes: 6,
    nearbyFaculty: 'Faculty of Science',
    monthlyRent: 20000,
    securityDeposit: 20000,
    billsIncluded: {
      water: true,
      electricity: false,
      wifi: true
    },
    genderPreference: 'Any',
    maxOccupants: 1,
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80',
    amenities: ['High-Speed Wi-Fi', 'Study Desk & Chair', 'Attached Bathroom'],
    houseRules: ['Curfew at 10:00 PM', 'No Smoking inside premises'],
    description: ''
  });

  const handleAmenityToggle = (am) => {
    setFormData(prev => {
      const exists = prev.amenities.includes(am);
      const updated = exists ? prev.amenities.filter(a => a !== am) : [...prev.amenities, am];
      return { ...prev, amenities: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      images: [formData.imageUrl],
      landlord: {
        id: 'l-owner-self',
        name: 'Verified Landlord (You)',
        phone: '+94 77 000 1122',
        email: 'owner@unilodge.lk',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        verified: true,
        responseRate: '100%',
        joinedYear: '2026'
      }
    };
    onAddListing(newListing);
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
            <h2 className="text-base font-extrabold text-slate-900">Post New Student Accommodation</h2>
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

          {/* Step 4: Amenities & Photo URL */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1">
                <label className="text-slate-700 font-bold block">Accommodation Photo URL *</label>
                <input
                  type="text"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
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
                  Publish Listing Now ✨
                </button>
              </div>
            </div>
          )}

        </form>

      </div>
    </div>
  );
}

