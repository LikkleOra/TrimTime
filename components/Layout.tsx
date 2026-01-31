
import React from 'react';
import { Scissors, Calendar, User, Info, MessageSquare } from 'lucide-react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-[#0a0a0a] text-white shadow-2xl relative overflow-x-hidden">
      {/* Header - Brand Identity */}
      <header className="px-6 py-8 flex flex-col items-center border-b border-zinc-900 bg-black/50 backdrop-blur-sm">
        <div className="w-14 h-14 bg-[#FFC107] rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(255,193,7,0.2)]">
          <Scissors size={28} className="text-black" />
        </div>
        <h1 className="text-3xl font-brand italic tracking-tighter uppercase leading-none">
          NEV THE BARBER
        </h1>
        <p className="text-[10px] text-zinc-500 font-bold tracking-[0.3em] uppercase mt-2">
          Industrial Grooming Excellence
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar">
        {children}
      </main>

      {/* Support FAB */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-zinc-900 border border-[#FFC107] rounded-full flex items-center justify-center shadow-2xl z-40 hover:scale-105 transition-transform">
        <MessageSquare size={24} className="text-white" fill="white" />
      </button>

      {/* Bottom Nav */}
      <nav className="sticky bottom-0 left-0 right-0 bg-[#050505] border-t border-zinc-900 px-6 py-4 flex justify-between items-center z-50">
        <button 
          onClick={() => onViewChange('customer')}
          className={`flex flex-col items-center gap-1 transition-all ${activeView === 'customer' ? 'text-[#FFC107]' : 'text-zinc-600'}`}
        >
          <Scissors size={20} className={activeView === 'customer' ? 'stroke-[3px]' : 'stroke-[1.5px]'} />
          <span className="text-[8px] font-black uppercase tracking-widest">Services</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-600">
          <Calendar size={20} />
          <span className="text-[8px] font-black uppercase tracking-widest">My Bookings</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-600">
          <Info size={20} />
          <span className="text-[8px] font-black uppercase tracking-widest">About</span>
        </button>
        <button 
          onClick={() => onViewChange('barber')}
          className={`flex flex-col items-center gap-1 transition-all ${activeView === 'barber' ? 'text-[#FFC107]' : 'text-zinc-600'}`}
        >
          <User size={20} className={activeView === 'barber' ? 'stroke-[3px]' : 'stroke-[1.5px]'} />
          <span className="text-[8px] font-black uppercase tracking-widest">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
