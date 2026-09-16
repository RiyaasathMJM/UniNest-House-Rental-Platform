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
  AlertCircle,
  ExternalLink,
  Navigation
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

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + ', Sri Lanka')}`;
  const embedMapsUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address + ', Sri Lanka')}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div 
        className="modal-content max-w-4xl max-h-[92vh] overflow-y-auto bg-white border border-slate-200 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Close Header */}
        <div className="sticky top-0 z-30 bg-slate-50/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-mono font-bold">ID: {id}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Main Photo Gallery */}
          <div className="space-y-3">
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
              <img
                src={images[activeImageIdx]}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs text-white font-bold">
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
                    className={`w-24 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIdx === idx ? 'border-sky-500 scale-105 shadow-md' : 'border-slate-200 opacity-60 hover:opacity-100'
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
                <span className="px-2.5 py-1 rounded-md bg-sky-50 text-sky-700 text-xs font-extrabold border border-sky-200">
                  {type}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-extrabold border border-purple-200">
                  {genderPreference}
                </span>
                <span className="text-xs text-slate-500 font-bold">Max {maxOccupants} Occupants</span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 leading-snug">{title}</h2>

              <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                <MapPin size={16} className="text-sky-600 shrink-0" />
                <span>{address}</span>
              </div>

              {/* Distance Highlight Banner */}
              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Footprints size={20} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">{walkingTimeMinutes} Mins Walk ({distanceKm} km)</h4>
                    <p className="text-slate-600 font-medium">Calculated walking distance to {nearbyFaculty}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-emerald-700 font-extrabold text-xs flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    <CheckCircle2 size={13} /> Ideal Location
                  </span>
                </div>
              </div>

            </div>

            {/* Price Card & Action Sticky Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-sm">
              <div>
                <span className="text-xs text-slate-500 block font-bold">Monthly Rent</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-900">Rs. {monthlyRent.toLocaleString()}</span>
                  <span className="text-xs text-slate-500 font-semibold">/mo</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 font-medium">Refundable Deposit: Rs. {securityDeposit.toLocaleString()}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200">
                <button
                  onClick={() => {
                    onClose();
                    onOpenBookingModal(listing);
                  }}
                  className="btn btn-primary w-full py-3 text-sm font-bold shadow-md shadow-sky-600/20"
                >
                  <Calendar size={16} /> Schedule Viewing / Apply
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenChatModal(listing);
                  }}
                  className="btn btn-outline w-full py-2.5 text-xs font-bold border-slate-300 text-slate-700 hover:bg-slate-200 flex items-center justify-center gap-2"
                >
                  <MessageSquare size={15} /> Message Landlord
                </button>
              </div>

              <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1 font-medium">
                <ShieldCheck size={13} className="text-emerald-600" />
                <span>Zero Broker Commission</span>
              </div>
            </div>

          </div>

          {/* GOOGLE MAP LOCATION VIEWER FEATURE */}
          <div className="space-y-3 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Google Map Location View</h3>
                  <p className="text-xs text-slate-500 font-medium">{address}</p>
                </div>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary text-xs px-3.5 py-2 font-bold flex items-center gap-1.5 shrink-0"
              >
                <Navigation size={14} />
                <span>Open in Google Maps</span>
                <ExternalLink size={13} />
              </a>
            </div>

            {/* Embedded Google Map Iframe */}
            <div className="w-full h-72 rounded-xl overflow-hidden border border-slate-200 shadow-inner relative bg-slate-100">
              <iframe
                title={`Google Map view for ${title}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={embedMapsUrl}
              ></iframe>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1 font-medium">
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <CheckCircle2 size={13} /> GPS Pin location near {nearbyFaculty}
              </span>
              <span>{walkingTimeMinutes} minutes walking route</span>
            </div>
          </div>

          {/* Transparent Utility Bills Terms */}
          <div className="space-y-3 p-4.5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Zap size={16} className="text-amber-500" /> Transparent Utility Terms
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              
              <div className={`p-3.5 rounded-xl border ${billsIncluded.wifi ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center gap-2 font-bold mb-1">
                  <Wifi size={15} className={billsIncluded.wifi ? 'text-emerald-700' : 'text-slate-400'} />
                  <span className={billsIncluded.wifi ? 'text-emerald-900' : 'text-slate-600'}>Wi-Fi Connection</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  {billsIncluded.wifi ? 'Included in Rent (High-Speed Fiber)' : 'Student handles ISP subscription'}
                </p>
              </div>

              <div className={`p-3.5 rounded-xl border ${billsIncluded.water ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center gap-2 font-bold mb-1">
                  <Droplets size={15} className={billsIncluded.water ? 'text-emerald-700' : 'text-slate-400'} />
                  <span className={billsIncluded.water ? 'text-emerald-900' : 'text-slate-600'}>Water Supply</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  {billsIncluded.water ? 'Fully Included in Rent' : 'Split equally among occupants'}
                </p>
              </div>

              <div className={`p-3.5 rounded-xl border ${billsIncluded.electricity ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center gap-2 font-bold mb-1">
                  <Zap size={15} className={billsIncluded.electricity ? 'text-emerald-700' : 'text-slate-400'} />
                  <span className={billsIncluded.electricity ? 'text-emerald-900' : 'text-slate-600'}>Electricity Bill</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  {billsIncluded.electricity ? 'Fully Included in Rent' : 'Calculated by individual sub-meter'}
                </p>
              </div>

            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-base font-extrabold text-slate-900">About Property</h3>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">{description}</p>
          </div>

          {/* Amenities Grid */}
          <div className="space-y-3">
            <h3 className="text-base font-extrabold text-slate-900">Included Facilities & Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {amenities.map((am) => (
                <div key={am} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-semibold">
                  <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                    <Check size={12} />
                  </div>
                  <span>{am}</span>
                </div>
              ))}
            </div>
          </div>

          {/* House Rules */}
          <div className="space-y-3 p-4.5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle size={16} className="text-purple-600" /> House Rules & Guidelines
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
              {houseRules.map((rule, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Landlord Profile Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={landlord.avatar}
                alt={landlord.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-sky-500 shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-slate-900 text-base">{landlord.name}</h4>
                </div>
                <p className="text-xs text-slate-600 font-medium">Response Rate: <span className="text-emerald-700 font-bold">{landlord.responseRate}</span></p>
                <p className="text-xs text-slate-500">Member since {landlord.joinedYear}</p>
              </div>
            </div>

            <div className="w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onOpenChatModal(listing);
                }}
                className="btn btn-primary text-xs px-5 py-3 font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20 w-full sm:w-auto"
              >
                <MessageSquare size={16} /> Send Direct Message to Owner
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

