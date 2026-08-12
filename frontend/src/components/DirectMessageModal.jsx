import React, { useState } from 'react';
import { X, Send, ShieldCheck, User } from 'lucide-react';

export default function DirectMessageModal({
  listing,
  messages,
  onSendMessage,
  onClose
}) {
  if (!listing) return null;

  const [inputMsg, setInputMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    
    onSendMessage({
      id: `msg-${Date.now()}`,
      listingId: listing.id,
      sender: 'student',
      senderName: 'Kavinda Fernando',
      text: inputMsg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    setInputMsg('');
  };

  const filteredMessages = messages.filter(m => m.listingId === listing.id);

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div 
        className="modal-content max-w-md h-[550px] flex flex-col justify-between bg-white border border-slate-200 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Chat Header */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={listing.landlord.avatar}
              alt={listing.landlord.name}
              className="w-10 h-10 rounded-full object-cover border border-sky-500 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-extrabold text-slate-900">{listing.landlord.name}</h3>
                <span className="badge badge-verified text-[9px]">Owner</span>
              </div>
              <p className="text-[11px] text-emerald-700 font-bold">Online • Fast Response</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold flex items-center justify-center text-xs transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages Stream */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-slate-50/70">
          <div className="text-center my-2">
            <span className="text-[10px] text-slate-500 font-bold bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
              Direct Conversation regarding: {listing.title}
            </span>
          </div>

          {filteredMessages.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs font-medium">
              No previous messages. Start the conversation with the house owner!
            </div>
          ) : (
            filteredMessages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'student' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs space-y-1 ${
                    m.sender === 'student'
                      ? 'bg-sky-600 text-white rounded-br-none font-medium shadow-sm'
                      : 'bg-white text-slate-800 rounded-bl-none border border-slate-200 font-medium shadow-sm'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className="text-[9px] opacity-75 block text-right font-mono font-bold">{m.timestamp}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 bg-slate-50 border-t border-slate-200 flex gap-2">
          <input
            type="text"
            placeholder="Type your message to house owner..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            className="input-control text-xs py-2.5 bg-white border-slate-300 text-slate-900 font-medium"
          />
          <button type="submit" className="btn btn-primary px-3 text-xs font-bold">
            <Send size={15} />
          </button>
        </form>

      </div>
    </div>
  );
}

