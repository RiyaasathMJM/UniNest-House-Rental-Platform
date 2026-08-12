import React, { useState } from 'react';
import { X, Calendar, User, Mail, Phone, BookOpen, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function BookingModal({
  listing,
  onClose,
  onSubmitApplication
}) {
  if (!listing) return null;

  const [formData, setFormData] = useState({
    studentName: 'Kavinda Fernando',
    studentEmail: 'kavinda.cs21@sci.cmb.ac.lk',
    studentPhone: '+94 71 111 2233',
    university: 'University of Colombo',
    faculty: 'UCSC (Computing)',
    studentIdNum: '2021/CS/084',
    moveInDate: '2026-09-01',
    requestType: 'Viewing & Rental Application',
    notes: 'I am a 3rd year student. Looking for a quiet space close to campus.'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitApplication({
      id: `app-${Date.now()}`,
      listingId: listing.id,
      listingTitle: listing.title,
      ...formData,
      status: 'Pending'
    });
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div 
        className="modal-content max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="sticky top-0 z-30 bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-sky-400" />
            <h2 className="text-base font-bold text-white">Student Accommodation Application</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4 animate-pop-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-xl font-bold text-white">Application Sent Successfully!</h3>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              Your viewing request and student details have been dispatched to <span className="text-sky-400 font-semibold">{listing.landlord.name}</span>.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono">
              Listing: {listing.title}
            </div>
            <button
              onClick={onClose}
              className="btn btn-primary w-full py-2.5 text-xs font-bold"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            
            {/* Listing Summary Box */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white text-xs line-clamp-1">{listing.title}</h4>
                <p className="text-[11px] text-slate-400">Rs. {listing.monthlyRent.toLocaleString()} / month</p>
              </div>
              <span className="badge badge-verified text-[10px]">Owner: {listing.landlord.name}</span>
            </div>

            {/* Application Type */}
            <div className="space-y-1">
              <label className="text-slate-300 font-semibold block">Request Type:</label>
              <select
                value={formData.requestType}
                onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                className="input-control text-xs"
              >
                <option value="Viewing & Rental Application">Schedule Viewing + Submit Rental Application</option>
                <option value="In-Person Viewing Only">Schedule In-Person Viewing Only</option>
                <option value="Direct Room Booking">Direct Room Reservation</option>
              </select>
            </div>

            {/* Student Name */}
            <div className="space-y-1">
              <label className="text-slate-300 font-semibold block">Student Full Name *</label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="input-control pl-9 text-xs"
                />
              </div>
            </div>

            {/* University & ID */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold block">University & Faculty *</label>
                <input
                  type="text"
                  required
                  value={formData.faculty}
                  onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                  className="input-control text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold block">Student ID / Reg No. *</label>
                <input
                  type="text"
                  required
                  value={formData.studentIdNum}
                  onChange={(e) => setFormData({ ...formData, studentIdNum: e.target.value })}
                  className="input-control text-xs"
                />
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold block">Phone Number *</label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.studentPhone}
                    onChange={(e) => setFormData({ ...formData, studentPhone: e.target.value })}
                    className="input-control pl-9 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold block">Preferred Move-in Date *</label>
                <input
                  type="date"
                  required
                  value={formData.moveInDate}
                  onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                  className="input-control text-xs"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <label className="text-slate-300 font-semibold block">Notes to Landlord / House Owner</label>
              <textarea
                rows="3"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="input-control text-xs"
                placeholder="Mention preferred quiet hours, move-in duration, or special requests..."
              />
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="btn btn-primary w-full py-3 text-xs font-bold flex items-center justify-center gap-2"
            >
              <Send size={15} /> Submit Application to Owner
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
