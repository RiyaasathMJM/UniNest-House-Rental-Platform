import React from 'react';
import { 
  Heart, 
  MapPin, 
  Footprints, 
  Star, 
  ShieldCheck, 
  Wifi, 
  Zap, 
  Droplets,
  SlidersHorizontal,
  CheckCircle2
} from 'lucide-react';

export default function ListingCard({
  listing,
  isSaved,
  onToggleSave,
  onSelectListing,
  isCompared,
  onToggleCompare
}) {
  const {
    id,
    title,
    type,
    monthlyRent,
    securityDeposit,
    distanceKm,
    walkingTimeMinutes,
    nearbyFaculty,
    billsIncluded,
    genderPreference,
    verified,
    rating,
    reviewCount,
    images,
    amenities,
    landlord
  } = listing;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-sky-300 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl group">
      
      {/* Top Image Section */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <div className="flex flex-wrap items-center gap-1.5 pointer-events-auto">
            {verified && (
              <span className="badge badge-verified shadow-sm backdrop-blur-md">
                <ShieldCheck size={12} /> Verified
              </span>
            )}
            <span className="badge badge-distance shadow-sm backdrop-blur-md">
              <Footprints size={12} /> {walkingTimeMinutes} min walk
            </span>
          </div>

          {/* Save / Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(id);
            }}
            className="pointer-events-auto w-9 h-9 rounded-full bg-white/90 hover:bg-white backdrop-blur-md flex items-center justify-center text-slate-600 hover:text-rose-500 border border-slate-200 shadow-md transition-all active:scale-95"
            title={isSaved ? "Remove from bookmarks" : "Save accommodation"}
          >
            <Heart size={18} className={isSaved ? "fill-rose-500 text-rose-500" : ""} />
          </button>
        </div>

        {/* Bottom Image Overlay Badges */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-bold text-white z-10">
          <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md border border-white/20">
            {type}
          </span>
          <span className={`px-2.5 py-1 rounded-md backdrop-blur-md border ${
            genderPreference === 'Girls Only' 
              ? 'bg-purple-900/85 border-purple-300 text-purple-100' 
              : genderPreference === 'Boys Only'
              ? 'bg-blue-900/85 border-blue-300 text-blue-100'
              : 'bg-slate-900/85 border-white/20 text-slate-100'
          }`}>
            {genderPreference}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          
          {/* Title & Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 
              onClick={() => onSelectListing(listing)}
              className="text-base font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1 cursor-pointer"
            >
              {title}
            </h3>
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md text-amber-700 text-xs font-bold shrink-0 border border-amber-200">
              <Star size={12} className="fill-amber-400 text-amber-500" />
              <span>{rating}</span>
            </div>
          </div>

          {/* Proximity / Faculty */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <MapPin size={14} className="text-sky-600 shrink-0" />
            <span className="truncate">{nearbyFaculty}</span>
          </div>

          {/* Key Amenities Micro Bar */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] pt-1">
            {amenities.slice(0, 3).map((am) => (
              <span key={am} className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                {am}
              </span>
            ))}
            {amenities.length > 3 && (
              <span className="text-slate-500 font-bold text-[10px]">+ {amenities.length - 3} more</span>
            )}
          </div>

        </div>

        {/* Utility Bills Inclusions Strip */}
        <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <span className="text-slate-500 font-bold text-[11px]">Included Bills:</span>
          <div className="flex items-center gap-2.5 font-bold">
            <span className={`flex items-center gap-1 ${billsIncluded.wifi ? 'text-emerald-700' : 'text-slate-400 line-through'}`}>
              <Wifi size={12} /> Wi-Fi
            </span>
            <span className={`flex items-center gap-1 ${billsIncluded.water ? 'text-emerald-700' : 'text-slate-400 line-through'}`}>
              <Droplets size={12} /> Water
            </span>
            <span className={`flex items-center gap-1 ${billsIncluded.electricity ? 'text-emerald-700' : 'text-slate-400 line-through'}`}>
              <Zap size={12} /> Power
            </span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-slate-900">Rs. {monthlyRent.toLocaleString()}</span>
              <span className="text-xs text-slate-500 font-semibold">/ month</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Deposit: Rs. {securityDeposit.toLocaleString()}</p>
          </div>

          <div className="flex items-center gap-2">
            
            {/* Compare Button */}
            <button
              onClick={() => onToggleCompare(id)}
              className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                isCompared
                  ? 'bg-sky-50 text-sky-700 border-sky-400'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
              title="Compare side-by-side"
            >
              <SlidersHorizontal size={14} />
            </button>

            {/* View Details */}
            <button
              onClick={() => onSelectListing(listing)}
              className="btn btn-primary text-xs px-3.5 py-2.5 rounded-xl font-bold"
            >
              View Unit
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}

