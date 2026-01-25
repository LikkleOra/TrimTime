
import React from 'react';
import { Service } from '../types';
import { Send, User, Phone, StickyNote } from 'lucide-react';

interface BookingSummaryProps {
  service: Service;
  time: string;
  date: string;
  customerName: string;
  customerPhone: string;
  notes: string;
  onNameChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
  onNotesChange: (val: string) => void;
  onConfirm: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  service, time, date, customerName, customerPhone, notes,
  onNameChange, onPhoneChange, onNotesChange, onConfirm
}) => {
  const isFormValid = customerName.trim() && customerPhone.trim();

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
      <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">{service.name}</h3>
          <span className="text-amber-500 font-bold">${service.price}</span>
        </div>
        <div className="flex gap-4 text-xs text-zinc-400 font-medium uppercase tracking-wider">
          <span>{date}</span>
          <span>{time}</span>
          <span>{service.duration} Min</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <label className="text-xs font-bold text-zinc-500 uppercase ml-1 mb-1 block">Full Name</label>
          <div className="relative">
            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
            <input 
              type="text" 
              placeholder="Ex: John Doe"
              value={customerName}
              onChange={(e) => onNameChange(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        <div className="relative">
          <label className="text-xs font-bold text-zinc-500 uppercase ml-1 mb-1 block">Phone Number</label>
          <div className="relative">
            <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
            <input 
              type="tel" 
              placeholder="Ex: 555-0199"
              value={customerPhone}
              onChange={(e) => onPhoneChange(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        <div className="relative">
          <label className="text-xs font-bold text-zinc-500 uppercase ml-1 mb-1 block">Notes (Optional)</label>
          <div className="relative">
            <StickyNote size={16} className="absolute left-4 top-4 text-zinc-600" />
            <textarea 
              placeholder="Specific requests or reference image link..."
              value={notes}
              onChange={(e) => onNotesChange(e.target.value)}
              rows={3}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      <button
        disabled={!isFormValid}
        onClick={onConfirm}
        className={`
          w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all
          ${isFormValid 
            ? 'bg-amber-500 text-black hover:bg-amber-400 active:scale-[0.98]' 
            : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
          }
        `}
      >
        <Send size={20} />
        CONFIRM & WHATSAPP
      </button>
      <p className="text-[10px] text-center text-zinc-500 px-4">
        By confirming, you will be redirected to WhatsApp to send the booking details to the barber directly.
      </p>
    </div>
  );
};

export default BookingSummary;
