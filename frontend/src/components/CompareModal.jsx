import React from 'react';
import { X, Check, Footprints, ShieldCheck, Star, SlidersHorizontal, Trash2, ArrowRight } from 'lucide-react';

export default function CompareModal({
  compareListings,
  onClose,
  onRemoveFromCompare,
  onClearCompare,
  onSelectListing
}) {
  if (compareListings.length === 0) return null;

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div 
        className="modal-content max-w-5xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="sticky top-0 z-30 bg-slate-50/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={20} className="text-sky-600" />
            <h2 className="text-lg font-extrabold text-slate-900">Side-by-Side Property Comparison</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 font-extrabold border border-sky-200">
              {compareListings.length} / 3 Selected
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClearCompare}
              className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
            >
              <Trash2 size={13} /> Clear All
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-3 text-xs font-extrabold text-slate-500 w-1/4">Features & Specs</th>
                {compareListings.map((item) => (
                  <th key={item.id} className="p-3 text-center w-1/4 align-top">
                    <div className="space-y-2 relative">
                      <button
                        onClick={() => onRemoveFromCompare(item.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white flex items-center justify-center text-xs transition-colors shadow-sm font-bold"
                        title="Remove from comparison"
                      >
                        <X size={12} />
                      </button>
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-24 object-cover rounded-xl border border-slate-200 shadow-sm"
                      />
                      <h4 className="text-sm font-extrabold text-slate-900 line-clamp-1">{item.title}</h4>
                      <button
                        onClick={() => {
                          onClose();
                          onSelectListing(item);
                        }}
                        className="btn btn-primary text-xs w-full py-1.5 rounded-xl flex items-center justify-center gap-1 font-bold"
                      >
                        <span>View Details</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              
              {/* Monthly Rent */}
              <tr>
                <td className="p-3 font-extrabold text-slate-900 bg-slate-50">Monthly Rent</td>
                {compareListings.map((item) => (
                  <td key={item.id} className="p-3 text-center font-extrabold text-sky-700 text-sm">
                    Rs. {item.monthlyRent.toLocaleString()}
                  </td>
                ))}
              </tr>

              {/* Security Deposit */}
              <tr>
                <td className="p-3 font-bold text-slate-700">Security Deposit</td>
                {compareListings.map((item) => (
                  <td key={item.id} className="p-3 text-center text-slate-600 font-medium">
                    Rs. {item.securityDeposit.toLocaleString()}
                  </td>
                ))}
              </tr>

              {/* Property Type */}
              <tr>
                <td className="p-3 font-extrabold text-slate-900 bg-slate-50">Property Type</td>
                {compareListings.map((item) => (
                  <td key={item.id} className="p-3 text-center text-slate-800 font-bold">
                    {item.type}
                  </td>
                ))}
              </tr>

              {/* Walking Distance */}
              <tr>
                <td className="p-3 font-bold text-slate-700">Faculty Distance</td>
                {compareListings.map((item) => (
                  <td key={item.id} className="p-3 text-center">
                    <span className="badge badge-distance shadow-sm">
                      <Footprints size={11} /> {item.walkingTimeMinutes} min walk ({item.distanceKm} km)
                    </span>
                  </td>
                ))}
              </tr>

              {/* Gender Preference */}
              <tr>
                <td className="p-3 font-extrabold text-slate-900 bg-slate-50">Gender Preference</td>
                {compareListings.map((item) => (
                  <td key={item.id} className="p-3 text-center font-extrabold text-purple-700">
                    {item.genderPreference}
                  </td>
                ))}
              </tr>

              {/* Included Bills */}
              <tr>
                <td className="p-3 font-bold text-slate-700">Wi-Fi Included?</td>
                {compareListings.map((item) => (
                  <td key={item.id} className="p-3 text-center">
                    {item.billsIncluded.wifi ? (
                      <span className="text-emerald-700 font-extrabold flex items-center justify-center gap-1">
                        <Check size={14} /> Included
                      </span>
                    ) : (
                      <span className="text-slate-400 font-medium">Not Included</span>
                    )}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-extrabold text-slate-900 bg-slate-50">Water Bill Included?</td>
                {compareListings.map((item) => (
                  <td key={item.id} className="p-3 text-center">
                    {item.billsIncluded.water ? (
                      <span className="text-emerald-700 font-extrabold flex items-center justify-center gap-1">
                        <Check size={14} /> Included
                      </span>
                    ) : (
                      <span className="text-slate-400 font-medium">Not Included</span>
                    )}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-bold text-slate-700">Electricity Bill Included?</td>
                {compareListings.map((item) => (
                  <td key={item.id} className="p-3 text-center">
                    {item.billsIncluded.electricity ? (
                      <span className="text-emerald-700 font-extrabold flex items-center justify-center gap-1">
                        <Check size={14} /> Included
                      </span>
                    ) : (
                      <span className="text-slate-400 font-medium">Sub-meter</span>
                    )}
                  </td>
                ))}
              </tr>



            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

