
import React from 'react';
import { Scissors, Calendar, User, Settings } from 'lucide-react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-zinc-950 shadow-2xl shadow-black relative overflow-x-hidden">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 flex justify-between items-center sticky top-0 bg-zinc-950/80 backdrop-blur-md z-40 border-b border-zinc-900">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-amber-500">TrimTime</h1>
          <p className="text-xs text-zinc-500 font-medium tracking-widest uppercase">Precision Grooming</p>
        </div>
        <button 
          onClick={() => onViewChange(activeView === 'customer' ? 'barber' : 'customer')}
          className="p-2 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors"
        >
          {activeView === 'customer' ? <Settings size={18} /> : <User size={18} />}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-6 pb-24 overflow-y-auto">
        {children}
      </main>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-zinc-900/90 backdrop-blur-lg border-t border-zinc-800 px-6 py-4 flex justify-around items-center z-50">
        <button 
          onClick={() => onViewChange('customer')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeView === 'customer' ? 'text-amber-500' : 'text-zinc-500'}`}
        >
          <Calendar size={20} />
          <span className="text-[10px] font-bold">BOOKING</span>
        </button>
        <div className="w-12 h-12 -mt-10 bg-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20 text-black">
          <Scissors size={24} />
        </div>
        <button 
          onClick={() => onViewChange('barber')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeView === 'barber' ? 'text-amber-500' : 'text-zinc-500'}`}
        >
          <Settings size={20} />
          <span className="text-[10px] font-bold">BARBER</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
