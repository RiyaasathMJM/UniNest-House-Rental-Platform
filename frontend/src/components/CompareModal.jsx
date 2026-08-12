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
        className="modal-content max-w-5xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={20} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">Side-by-Side Property Comparison</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 font-semibold">
              {compareListings.length} / 3 Selected
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClearCompare}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
            >
              <Trash2 size={13} /> Clear All
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="p-3 text-xs font-semibold text-slate-400 w-1/4">Features & Specs</th>
                {compareListings.map((item) => (
                  <th key={item.id} className="p-3 text-center w-1/4 align-top">
                    <div className="space-y-2 relative">
                      <button
                        onClick={() => onRemoveFromCompare(item.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white flex items-center justify-center text-xs transition-colors"
                        title="Remove from comparison"
                      >
                        <X size={12} />
                      </button>
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-24 object-cover rounded-xl border border-slate-800"
                      />
                      <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                      <button
                        onClick={() => {
                          onClose();
                          onSelectListing(item);
                        }}
                        className="btn btn-primary text-xs w-full py-1.5 rounded-lg flex items-center justify-center gap-1"
                      >
                        <span>View Details</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs">
              
              {/* Monthly Rent */}
              <tr>
                <td className="p-3 font-semibold text-slate-300 bg-slate-900/40">Monthly Rent</td>
                {compareListings.map((item) => (
                  <td key={item.id} className="p-3 text-center font-bold text-sky-400 text-sm">
                    Rs. {item.monthlyRent.toLocaleString()}
                  </td>
                ))}
              </tr>

              {/* Security Deposit */}
              <tr>
                <td className="p-3 font-semibold text-slate-300">Security Deposit</td>
                {compareListings.map((item) => (
                  <td key={item.id} className="p-3 text-center text-slate-400">
                    Rs. {item.securityDeposit.toLocaleString()}
                  </td>
                ))}
              </tr>

              {/* Property Type */}
              <tr>
                <td className="p-3 font-semibold text-slate-300 bg-slate-900/40">Property Type</td>
                {compareListings.map((item) => (
                  <td key={item.id} className="p-3 text-center text-slate-200 font-medium">
                    {item.type}
                  </td>
                ))}
              </tr>

              {/* Walking Distance */}
              <tr>
                <td className="p-3 font-semibold text-slate-300">Faculty Distance</td>
                {compareListings.map((item) => (
                  <td key={item.id} className="p-3 text-center">
                    <span className="badge badge-distance">
                      <Footprints size={11} /> {item.walkingTimeMinutes} min walk ({item.distanceKm} km)
                    </span>
                  </td>
                ))}
              </tr>

              {/* Gender Preference */}
              <tr>
                <td className="p-3 font-semibold text-slate-300 bg-slate-900/40">Gender Preference</td>
                {compareListings.map((item) => (
                  <td key={item.id} className="p-3 text-center font-semibold text-purple-300">
                    {item.genderPreference}
                  </td>
                ))}
              </tr>

              {/* Included Bills */}
              <tr>
                <td className="p-3 font-semibold text-slate-300">Wi-Fi Included?</td>
                {compareListings.map((item) => (
                  <td key={item.id} className="p-3 text-center">
                    {item.billsIncluded.wifi ? (
                      <span className="text-emerald-400 font-bold flex items-center justify-center gap-1">
                        <Check size={14} /> Included
                      </span>
                    ) : (
                      <span className="text-slate-500">Not Included</span>
                    )}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-300 bg-slate-900/40">Water Bill Included?</td>
                {compareListings.map((item) => (
                  <td key={item.id} className="p-3 text-center">
                    {item.billsIncluded.water ? (
                      <span className="text-emerald-400 font-bold flex items-center justify-center gap-1">
                        <Check size={14} /> Included
                      </span>
                    ) : (
                      <span className="text-slate-500">Not Included</span>
                    )}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-300">Electricity Bill Included?</td>
                {compareListings.map((item) => (
                  <td key={item.id} className="p-3 text-center">
                    {item.billsIncluded.electricity ? (
                      <span className="text-emerald-400 font-bold flex items-center justify-center gap-1">
                        <Check size={14} /> Included
                      </span>
                    ) : (
                      <span className="text-slate-500">Sub-meter</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Landlord Verification */}
              <tr>
                <td className="p-3 font-semibold text-slate-300 bg-slate-900/40">Landlord Verified</td>
                {compareListings.map((item) => (
                  <td key={item.id} className="p-3 text-center">
                    {item.verified ? (
                      <span className="badge badge-verified inline-flex">
                        <ShieldCheck size={12} /> Verified Owner
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[11px]">Unverified</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Rating */}
              <tr>
                <td className="p-3 font-semibold text-slate-300">Student Rating</td>
                {compareListings.map((item) => (
                  <td key={item.id} className="p-3 text-center font-bold text-amber-400">
                    <span className="inline-flex items-center gap-1">
                      <Star size={13} className="fill-amber-400" /> {item.rating} ({item.reviewCount})
                    </span>
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
