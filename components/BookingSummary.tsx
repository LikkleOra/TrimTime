
import React from 'react';
import { Service } from '../types';
import { Phone, MessageSquare } from 'lucide-react';

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
    <div className="space-y-8 animate-in slide-in-from-bottom duration-500 pb-10">
      {/* Receipt Card */}
      <div className="bg-[#111] border-2 border-[#FFC107] p-8 space-y-8 relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-mono-brand font-bold uppercase tracking-tighter">Booking Summary</h3>
            <p className="text-[10px] font-mono-brand text-zinc-500 uppercase mt-1">Ref: #NZ-2941-DN</p>
          </div>
          <span className="bg-black text-white px-3 py-1 text-[9px] font-mono-brand font-bold uppercase">Durban North</span>
        </div>

        {/* Location Section */}
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center">
             <div className="w-4 h-4 border border-zinc-700"></div>
          </div>
          <div>
            <p className="text-[10px] font-mono-brand text-zinc-500 uppercase">Location</p>
            <p className="text-sm font-bold leading-snug">28 Mackeurtan Avenue, Durban North</p>
          </div>
        </div>

        <div className="border-t border-dashed border-zinc-800" />

        {/* Service Details */}
        <div className="space-y-4">
          <div>
            <p className="text-[9px] font-mono-brand text-zinc-500 uppercase tracking-widest">Service</p>
            <div className="flex justify-between items-end mt-1">
              <div>
                <h4 className="text-lg font-bold font-mono-brand">{service.name}</h4>
                <p className="text-[10px] font-mono-brand italic text-zinc-500">{service.duration} Mins • All professionals</p>
              </div>
              <span className="text-lg font-bold font-mono-brand tracking-tighter">R {service.price.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-1 pt-4 border-t border-zinc-900">
            <div className="flex justify-between text-[11px] font-mono-brand text-zinc-500 uppercase">
              <span>Subtotal</span>
              <span>R {service.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[11px] font-mono-brand text-zinc-500 uppercase">
              <span>Tax (Incl.)</span>
              <span>R 0.00</span>
            </div>
          </div>

          <div className="border-t-2 border-white pt-4 flex justify-between items-end">
            <span className="text-2xl font-bold font-mono-brand uppercase">Total</span>
            <span className="text-2xl font-bold font-mono-brand tracking-tighter">R {service.price.toFixed(2)}</span>
          </div>
        </div>

        <div className="border-t border-dashed border-zinc-800" />

        {/* Date Time Section */}
        <div className="flex justify-between text-[9px] font-mono-brand font-bold uppercase text-zinc-400">
          <span>Date: {date}</span>
          <span>Time: {time} PM</span>
        </div>

        {/* Barcode Element */}
        <div className="space-y-4 text-center">
          <div className="barcode-pattern" />
          <p className="text-[9px] font-mono-brand text-zinc-500 uppercase tracking-[0.3em]">Fadezone Grooming Systems</p>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-4 px-2">
        <input 
          type="text" 
          placeholder="ENTER YOUR NAME"
          value={customerName}
          onChange={(e) => onNameChange(e.target.value.toUpperCase())}
          className="w-full bg-zinc-900 border border-zinc-800 p-4 text-xs font-black tracking-widest uppercase focus:outline-none focus:border-[#FFC107] transition-all"
        />
        <input 
          type="tel" 
          placeholder="PHONE NUMBER"
          value={customerPhone}
          onChange={(e) => onPhoneChange(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 p-4 text-xs font-black tracking-widest uppercase focus:outline-none focus:border-[#FFC107] transition-all"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 px-2">
        <button className="w-20 h-16 bg-[#1a1a1a] flex items-center justify-center rounded-xl border border-zinc-800">
          <Phone size={24} className="text-white" />
        </button>
        <button 
          disabled={!isFormValid}
          onClick={onConfirm}
          className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-xl text-[13px] font-black uppercase tracking-widest transition-all ${isFormValid ? 'bg-[#25D366] text-white shadow-[0_10px_20px_rgba(37,211,102,0.2)]' : 'bg-zinc-900 text-zinc-700'}`}
        >
          <MessageSquare size={20} fill="white" />
          Confirm Via WhatsApp
        </button>
      </div>

      {/* Bottom Features */}
      <div className="flex justify-between px-6 py-4">
        <div className="flex items-center gap-2 text-[8px] font-black text-zinc-600 uppercase">
           <div className="w-4 h-4 border border-zinc-800 flex items-center justify-center">✓</div>
           Instant Confirm
        </div>
        <div className="flex items-center gap-2 text-[8px] font-black text-zinc-600 uppercase">
           <div className="w-4 h-4 border border-zinc-800 flex items-center justify-center">☺</div>
           Kid Friendly
        </div>
        <div className="flex items-center gap-2 text-[8px] font-black text-zinc-600 uppercase">
           <div className="w-4 h-4 border border-zinc-800 flex items-center justify-center font-bold">P</div>
           Parking
        </div>
      </div>

      <div className="text-[8px] text-center text-zinc-700 font-bold uppercase tracking-widest leading-relaxed px-12">
        By confirming you agree to our 24h cancellation policy. Late arrivals may forfeit their slot.
      </div>
    </div>
  );
};

export default BookingSummary;
