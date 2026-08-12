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
    <div className="glass-panel group overflow-hidden border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl">
      
      {/* Top Image Section */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-900">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap items-center gap-1.5 pointer-events-auto">
            {verified && (
              <span className="badge badge-verified shadow-md backdrop-blur-md">
                <ShieldCheck size={12} /> Verified
              </span>
            )}
            <span className="badge badge-distance backdrop-blur-md">
              <Footprints size={12} /> {walkingTimeMinutes} min walk
            </span>
          </div>

          {/* Save / Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(id);
            }}
            className="pointer-events-auto w-9 h-9 rounded-full bg-slate-950/70 hover:bg-slate-900 backdrop-blur-md flex items-center justify-center text-slate-300 hover:text-white border border-white/10 transition-all active:scale-95"
            title={isSaved ? "Remove from bookmarks" : "Save accommodation"}
          >
            <Heart size={18} className={isSaved ? "fill-rose-500 text-rose-500" : "hover:text-rose-400"} />
          </button>
        </div>

        {/* Bottom Image Overlay Badges */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold text-white">
          <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700/60">
            {type}
          </span>
          <span className={`px-2.5 py-1 rounded-md backdrop-blur-md border ${
            genderPreference === 'Girls Only' 
              ? 'bg-purple-950/80 border-purple-500/40 text-purple-300' 
              : genderPreference === 'Boys Only'
              ? 'bg-blue-950/80 border-blue-500/40 text-blue-300'
              : 'bg-slate-900/80 border-slate-700/60 text-slate-300'
          }`}>
            {genderPreference}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          
          {/* Title & Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 
              onClick={() => onSelectListing(listing)}
              className="text-base font-bold text-white group-hover:text-sky-400 transition-colors line-clamp-1 cursor-pointer"
            >
              {title}
            </h3>
            <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded text-amber-400 text-xs font-bold shrink-0 border border-amber-500/20">
              <Star size={12} className="fill-amber-400" />
              <span>{rating}</span>
            </div>
          </div>

          {/* Proximity / Faculty */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <MapPin size={14} className="text-sky-400 shrink-0" />
            <span className="truncate">{nearbyFaculty}</span>
          </div>

          {/* Key Amenities Micro Bar */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] pt-1">
            {amenities.slice(0, 3).map((am) => (
              <span key={am} className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50">
                {am}
              </span>
            ))}
            {amenities.length > 3 && (
              <span className="text-slate-500 font-medium">+ {amenities.length - 3} more</span>
            )}
          </div>

        </div>

        {/* Utility Bills Inclusions Strip */}
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
          <span className="text-slate-400 text-[11px]">Included Bills:</span>
          <div className="flex items-center gap-2 font-medium">
            <span className={`flex items-center gap-1 ${billsIncluded.wifi ? 'text-emerald-400' : 'text-slate-600 line-through'}`}>
              <Wifi size={12} /> Wi-Fi
            </span>
            <span className={`flex items-center gap-1 ${billsIncluded.water ? 'text-emerald-400' : 'text-slate-600 line-through'}`}>
              <Droplets size={12} /> Water
            </span>
            <span className={`flex items-center gap-1 ${billsIncluded.electricity ? 'text-emerald-400' : 'text-slate-600 line-through'}`}>
              <Zap size={12} /> Power
            </span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-white">Rs. {monthlyRent.toLocaleString()}</span>
              <span className="text-xs text-slate-400 font-normal">/ month</span>
            </div>
            <p className="text-[10px] text-slate-500">Deposit: Rs. {securityDeposit.toLocaleString()}</p>
          </div>

          <div className="flex items-center gap-2">
            
            {/* Compare Checkbox */}
            <button
              onClick={() => onToggleCompare(id)}
              className={`p-2 rounded-lg text-xs font-semibold border transition-all ${
                isCompared
                  ? 'bg-sky-500/20 text-sky-400 border-sky-500/50'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title="Compare side-by-side"
            >
              <SlidersHorizontal size={14} />
            </button>

            {/* View Details */}
            <button
              onClick={() => onSelectListing(listing)}
              className="btn btn-primary text-xs px-3 py-2 rounded-lg"
            >
              View & Book
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}
