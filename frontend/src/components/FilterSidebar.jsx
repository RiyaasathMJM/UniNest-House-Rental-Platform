import React from 'react';
import { Filter, RotateCcw, Check, Sparkles, SlidersHorizontal } from 'lucide-react';
import { PROPERTY_TYPES, AMENITIES_LIST } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

export default function FilterSidebar({
  filters,
  setFilters,
  onReset
}) {
  const { t } = useLanguage();

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
    <aside className="bg-white p-5 space-y-6 sticky top-24 border border-slate-200 rounded-2xl shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
          <Filter size={18} className="text-sky-600" />
          <span>{t('filterHeading', 'Filter Accommodations')}</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-500 hover:text-sky-600 font-semibold flex items-center gap-1 transition-colors"
          title={t('resetFilters', 'Reset all filters')}
        >
          <RotateCcw size={13} />
          <span>{t('resetFilters', 'Reset')}</span>
        </button>
      </div>

      {/* Budget Range Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-700 font-bold">{t('maxMonthlyRent', 'Max Monthly Rent')}:</span>
          <span className="text-sky-700 font-extrabold text-sm">Rs. {filters.maxPrice.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="10000"
          max="50000"
          step="1000"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
        />
        <div className="flex justify-between text-[11px] text-slate-500 font-bold font-mono">
          <span>Rs. 10k</span>
          <span>Rs. 30k</span>
          <span>Rs. 50k</span>
        </div>
      </div>

      {/* Distance to Campus Radius */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 block">{t('maxDistance', 'Max Distance from Campus')}:</label>
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          {[
            { id: 'all', label: 'Any' },
            { id: '0.5', label: '< 500m' },
            { id: '1.0', label: '< 1 km' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilters({ ...filters, maxDistance: item.id })}
              className={`py-1.5 px-2 rounded-xl font-bold border text-center transition-all ${
                filters.maxDistance === item.id
                  ? 'bg-sky-50 text-sky-700 border-sky-400 shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type Checkboxes */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 block">{t('propertyType', 'Property Type')}:</label>
        <div className="space-y-1.5">
          {PROPERTY_TYPES.map((pt) => {
            const isSelected = filters.propertyTypes.includes(pt.id);
            return (
              <label
                key={pt.id}
                onClick={() => handlePropertyTypeToggle(pt.id)}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-sky-50 border-sky-400 text-slate-900 font-bold shadow-sm' 
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{pt.label}</span>
                <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                  isSelected ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300 bg-white'
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
        <label className="text-xs font-bold text-slate-700 block">{t('genderPref', 'Gender Preference')}:</label>
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          {[
            { id: 'all', label: t('anyGender', 'Any') },
            { id: 'Boys Only', label: t('boysOnly', 'Boys') },
            { id: 'Girls Only', label: t('girlsOnly', 'Girls') }
          ].map((g) => (
            <button
              key={g.id}
              onClick={() => setFilters({ ...filters, genderPreference: g.id })}
              className={`py-1.5 px-2 rounded-xl font-bold border text-center transition-all ${
                filters.genderPreference === g.id
                  ? 'bg-purple-50 text-purple-700 border-purple-300 shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Utility Bills Included */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 block">{t('billsIncludedOnly', 'Bills Included Filter')}:</label>
        <label
          onClick={() => setFilters({ ...filters, billsIncludedOnly: !filters.billsIncludedOnly })}
          className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
            filters.billsIncludedOnly 
              ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold shadow-sm'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>{t('filterBills', 'All Utility Bills Included')}</span>
          <div className={`w-4 h-4 rounded flex items-center justify-center border ${
            filters.billsIncludedOnly ? 'bg-emerald-600 border-emerald-600 text-white font-bold' : 'border-slate-300 bg-white'
          }`}>
            {filters.billsIncludedOnly && <Check size={12} />}
          </div>
        </label>
      </div>

      {/* Amenities Checklist */}
      <div className="space-y-2 pt-3 border-t border-slate-200">
        <label className="text-xs font-bold text-slate-700 block">Required Amenities:</label>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {AMENITIES_LIST.map((am) => {
            const isSelected = filters.amenities.includes(am);
            return (
              <label
                key={am}
                onClick={() => handleAmenityToggle(am)}
                className="flex items-center gap-2 p-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-100 cursor-pointer font-medium"
              >
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                  isSelected ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300 bg-white'
                }`}>
                  {isSelected && <Check size={10} />}
                </div>
                <span className={isSelected ? 'text-slate-900 font-bold' : 'text-slate-600'}>{am}</span>
              </label>
            );
          })}
        </div>
      </div>

    </aside>
  );
}

