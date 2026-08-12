import React from 'react';
import { Filter, RotateCcw, Check, Sparkles, SlidersHorizontal } from 'lucide-react';
import { PROPERTY_TYPES, AMENITIES_LIST } from '../data/mockData';

export default function FilterSidebar({
  filters,
  setFilters,
  onReset
}) {
  const handlePropertyTypeToggle = (typeId) => {
    setFilters(prev => {
      const exists = prev.propertyTypes.includes(typeId);
      const updated = exists 
        ? prev.propertyTypes.filter(t => t !== typeId)
        : [...prev.propertyTypes, typeId];
      return { ...prev, propertyTypes: updated };
    });
  };

  const handleAmenityToggle = (amenity) => {
    setFilters(prev => {
      const exists = prev.amenities.includes(amenity);
      const updated = exists 
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: updated };
    });
  };

  return (
    <aside className="glass-panel p-5 space-y-6 sticky top-24 border-slate-800">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-white font-bold text-base">
          <Filter size={18} className="text-sky-400" />
          <span>Refine Listings</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-sky-400 flex items-center gap-1 transition-colors"
          title="Reset all filters"
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
      </div>

      {/* Budget Range Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-300 font-semibold">Max Monthly Rent:</span>
          <span className="text-sky-400 font-bold text-sm">Rs. {filters.maxPrice.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="10000"
          max="50000"
          step="1000"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
        />
        <div className="flex justify-between text-[11px] text-slate-500 font-mono">
          <span>Rs. 10k</span>
          <span>Rs. 30k</span>
          <span>Rs. 50k</span>
        </div>
      </div>

      {/* Distance to Campus Radius */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 block">Distance to Main Campus:</label>
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          {[
            { id: 'all', label: 'Any' },
            { id: '0.5', label: '< 500m' },
            { id: '1.0', label: '< 1 km' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilters({ ...filters, maxDistance: item.id })}
              className={`py-1.5 px-2 rounded-lg font-medium border text-center transition-all ${
                filters.maxDistance === item.id
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/50 font-bold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type Checkboxes */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 block">Accommodation Type:</label>
        <div className="space-y-1.5">
          {PROPERTY_TYPES.map((pt) => {
            const isSelected = filters.propertyTypes.includes(pt.id);
            return (
              <label
                key={pt.id}
                onClick={() => handlePropertyTypeToggle(pt.id)}
                className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-slate-800/80 border-sky-500/40 text-slate-100 font-semibold' 
                    : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{pt.label}</span>
                <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                  isSelected ? 'bg-sky-500 border-sky-500 text-white' : 'border-slate-700'
                }`}>
                  {isSelected && <Check size={12} />}
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Gender Preference */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 block">Gender Preference:</label>
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          {[
            { id: 'all', label: 'All' },
            { id: 'Boys Only', label: 'Boys' },
            { id: 'Girls Only', label: 'Girls' }
          ].map((g) => (
            <button
              key={g.id}
              onClick={() => setFilters({ ...filters, genderPreference: g.id })}
              className={`py-1.5 px-2 rounded-lg font-medium border text-center transition-all ${
                filters.genderPreference === g.id
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 font-bold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Utility Bills Included */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 block">Bills Included Filter:</label>
        <label
          onClick={() => setFilters({ ...filters, billsIncludedOnly: !filters.billsIncludedOnly })}
          className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer transition-all ${
            filters.billsIncludedOnly 
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-semibold'
              : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>All Utility Bills Included</span>
          <div className={`w-4 h-4 rounded flex items-center justify-center border ${
            filters.billsIncludedOnly ? 'bg-emerald-500 border-emerald-500 text-slate-950 font-bold' : 'border-slate-700'
          }`}>
            {filters.billsIncludedOnly && <Check size={12} />}
          </div>
        </label>
      </div>

      {/* Amenities Checklist */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <label className="text-xs font-semibold text-slate-300 block">Required Amenities:</label>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {AMENITIES_LIST.map((am) => {
            const isSelected = filters.amenities.includes(am);
            return (
              <label
                key={am}
                onClick={() => handleAmenityToggle(am)}
                className="flex items-center gap-2 p-1.5 rounded text-xs text-slate-300 hover:bg-slate-800/50 cursor-pointer"
              >
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                  isSelected ? 'bg-sky-500 border-sky-500 text-white' : 'border-slate-700'
                }`}>
                  {isSelected && <Check size={10} />}
                </div>
                <span className={isSelected ? 'text-white font-medium' : 'text-slate-400'}>{am}</span>
              </label>
            );
          })}
        </div>
      </div>

    </aside>
  );
}
