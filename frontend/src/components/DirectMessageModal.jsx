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
        className="modal-content max-w-md h-[550px] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Chat Header */}
        <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={listing.landlord.avatar}
              alt={listing.landlord.name}
              className="w-10 h-10 rounded-full object-cover border border-sky-400"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white">{listing.landlord.name}</h3>
                <span className="badge badge-verified text-[9px]">Owner</span>
              </div>
              <p className="text-[11px] text-emerald-400">Online • Active Response</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages Stream */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-slate-950/60">
          <div className="text-center my-2">
            <span className="text-[10px] text-slate-500 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
              Direct Conversation regarding: {listing.title}
            </span>
          </div>

          {filteredMessages.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs">
              No previous messages. Start the conversation!
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
                      ? 'bg-sky-600 text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className="text-[9px] opacity-75 block text-right font-mono">{m.timestamp}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            placeholder="Type your message to house owner..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            className="input-control text-xs py-2.5"
          />
          <button type="submit" className="btn btn-primary px-3 text-xs">
            <Send size={15} />
          </button>
        </form>

      </div>
    </div>
  );
}
