import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Footprints, 
  ShieldCheck, 
  Star, 
  Check, 
  Wifi, 
  Zap, 
  Droplets, 
  Clock, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Send,
  UserCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function ListingDetailModal({
  listing,
  onClose,
  onOpenBookingModal,
  onOpenChatModal
}) {
  if (!listing) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const {
    id,
    title,
    type,
    monthlyRent,
    securityDeposit,
    distanceKm,
    walkingTimeMinutes,
    nearbyFaculty,
    address,
    billsIncluded,
    genderPreference,
    maxOccupants,
    verified,
    rating,
    reviewCount,
    images,
    amenities,
    houseRules,
    description,
    landlord
  } = listing;

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div 
        className="modal-content max-w-4xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Close Header */}
        <div className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="badge badge-verified"><ShieldCheck size={12} /> Verified Listing</span>
            <span className="text-xs text-slate-400 font-mono">ID: {id}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Main Photo Gallery */}
          <div className="space-y-3">
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={images[activeImageIdx]}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs text-white font-medium">
                Photo {activeImageIdx + 1} of {images.length}
              </div>
            </div>

            {/* Thumbnail Selectors */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-24 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIdx === idx ? 'border-sky-400 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Key Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 text-xs font-bold border border-sky-500/20">
                  {type}
                </span>
                <span className="px-2.5 py-1 rounded bg-purple-500/10 text-purple-300 text-xs font-bold border border-purple-500/20">
                  {genderPreference}
                </span>
                <span className="text-xs text-slate-400">Max {maxOccupants} Occupants</span>
              </div>

              <h2 className="text-2xl font-bold text-white leading-snug">{title}</h2>

              <div className="flex items-center gap-2 text-sm text-slate-300">
                <MapPin size={16} className="text-sky-400 shrink-0" />
                <span>{address}</span>
              </div>

              {/* Distance Highlight Banner */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-sky-500/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                    <Footprints size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{walkingTimeMinutes} Mins Walk ({distanceKm} km)</h4>
                    <p className="text-slate-400">Direct distance to {nearbyFaculty}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                    <CheckCircle2 size={13} /> Ideal for Students
                  </span>
                </div>
              </div>

            </div>

            {/* Price Card & Action Sticky Box */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Monthly Rent</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">Rs. {monthlyRent.toLocaleString()}</span>
                  <span className="text-xs text-slate-400">/mo</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Refundable Deposit: Rs. {securityDeposit.toLocaleString()}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    onClose();
                    onOpenBookingModal(listing);
                  }}
                  className="btn btn-primary w-full py-3 text-sm font-bold shadow-lg shadow-sky-500/20"
                >
                  <Calendar size={16} /> Schedule Viewing / Apply
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenChatModal(listing);
                  }}
                  className="btn btn-outline w-full py-2.5 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <MessageSquare size={15} /> Message Landlord
                </button>
              </div>

              <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                <ShieldCheck size={13} className="text-emerald-400" />
                <span>Zero Booking Fees • Direct Owner Contact</span>
              </div>
            </div>

          </div>

          {/* Transparent Utility Bills Terms */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap size={16} className="text-amber-400" /> Transparent Utility Terms
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              
              <div className={`p-3 rounded-lg border ${billsIncluded.wifi ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-900 border-slate-800'}`}>
                <div className="flex items-center gap-2 font-bold mb-1">
                  <Wifi size={15} className={billsIncluded.wifi ? 'text-emerald-400' : 'text-slate-500'} />
                  <span className={billsIncluded.wifi ? 'text-emerald-300' : 'text-slate-400'}>Wi-Fi Connection</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {billsIncluded.wifi ? 'Included in Rent (High-Speed Fiber)' : 'Student handles ISP subscription'}
                </p>
              </div>

              <div className={`p-3 rounded-lg border ${billsIncluded.water ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-900 border-slate-800'}`}>
                <div className="flex items-center gap-2 font-bold mb-1">
                  <Droplets size={15} className={billsIncluded.water ? 'text-emerald-400' : 'text-slate-500'} />
                  <span className={billsIncluded.water ? 'text-emerald-300' : 'text-slate-400'}>Water Supply</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {billsIncluded.water ? 'Fully Included in Rent' : 'Split equally among occupants'}
                </p>
              </div>

              <div className={`p-3 rounded-lg border ${billsIncluded.electricity ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-900 border-slate-800'}`}>
                <div className="flex items-center gap-2 font-bold mb-1">
                  <Zap size={15} className={billsIncluded.electricity ? 'text-emerald-400' : 'text-slate-500'} />
                  <span className={billsIncluded.electricity ? 'text-emerald-300' : 'text-slate-400'}>Electricity Bill</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {billsIncluded.electricity ? 'Fully Included in Rent' : 'Calculated by individual sub-meter'}
                </p>
              </div>

            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-white">About Property</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{description}</p>
          </div>

          {/* Amenities Grid */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white">Included Facilities & Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {amenities.map((am) => (
                <div key={am} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                    <Check size={12} />
                  </div>
                  <span>{am}</span>
                </div>
              ))}
            </div>
          </div>

          {/* House Rules */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertCircle size={16} className="text-purple-400" /> House Rules & Guidelines
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {houseRules.map((rule, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Landlord Profile Card */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={landlord.avatar}
                alt={landlord.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-sky-400"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-base">{landlord.name}</h4>
                  {landlord.verified && (
                    <span className="badge badge-verified text-[10px]">Verified Landlord</span>
                  )}
                </div>
                <p className="text-xs text-slate-400">Response Rate: <span className="text-emerald-400 font-semibold">{landlord.responseRate}</span></p>
                <p className="text-xs text-slate-500">Member since {landlord.joinedYear}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={`tel:${landlord.phone}`}
                className="btn btn-outline text-xs px-3 py-2 flex-1 sm:flex-none"
              >
                <Phone size={14} /> Call Owner
              </a>
              <button
                onClick={() => {
                  onClose();
                  onOpenChatModal(listing);
                }}
                className="btn btn-accent text-xs px-3.5 py-2 flex-1 sm:flex-none"
              >
                <MessageSquare size={14} /> Direct Chat
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
