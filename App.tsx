
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Layout from './components/Layout';
import TimeGrid from './components/TimeGrid';
import BookingSummary from './components/BookingSummary';
import { SERVICES, BARBER_CONFIG } from './constants';
import { Service, Booking, ViewType } from './types';
import { bookingService } from './services/bookingService';
import { ChevronRight, MapPin, CheckCircle, Smartphone, ChevronLeft, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('customer');
  const [selectedLocation, setSelectedLocation] = useState(BARBER_CONFIG.locations[0]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0); // 0: Landing, 1: Services, 2: Time, 3: Summary

  const scrollRef = useRef<HTMLDivElement>(null);

  const refreshBookings = useCallback(() => {
    setBookings(bookingService.getBookings());
  }, []);

  useEffect(() => {
    refreshBookings();
    window.addEventListener('storage', refreshBookings);
    return () => window.removeEventListener('storage', refreshBookings);
  }, [refreshBookings]);

  const handleConfirm = () => {
    if (!selectedService || !selectedTime) return;
    const dateStr = selectedDate.toISOString().split('T')[0];
    const msg = `Lekker Nev! Booking: ${selectedService.name} on ${dateStr} at ${selectedTime}. Customer: ${customerName}. Vibe the vibe!`;
    const whatsappUrl = `https://wa.me/${BARBER_CONFIG.phone}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
    
    bookingService.addBooking({
      id: Math.random().toString(36).substr(2, 9),
      serviceId: selectedService.id,
      date: dateStr,
      time: selectedTime,
      customerName,
      customerPhone,
      status: 'confirmed'
    });

    setStep(0);
    setSelectedService(null);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const renderLanding = () => (
    <div className="space-y-12 pb-10">
      {/* Location Toggle */}
      <div className="px-6 mt-4">
        <div className="flex bg-zinc-900 rounded-lg p-1">
          {BARBER_CONFIG.locations.map(loc => (
            <button
              key={loc.id}
              onClick={() => setSelectedLocation(loc)}
              className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${selectedLocation.id === loc.id ? 'bg-[#2a2a2a] text-white' : 'text-zinc-500'}`}
            >
              {loc.name}
            </button>
          ))}
        </div>
      </div>

      {/* Legendary Styles Section */}
      <div className="space-y-8">
        <div className="px-6 space-y-4">
          <h2 className="text-5xl font-black tracking-tighter leading-[0.9] text-white">
            See Our<br />Legendary<br />Styles
          </h2>
          <p className="text-sm text-zinc-500 max-w-[240px] leading-relaxed">
            Check out our Legendary styles that would best suite you.
          </p>
          <div className="flex items-center justify-between pt-2">
            <button className="flex items-center gap-2 text-sm font-black uppercase tracking-wider border-b-2 border-white pb-1">
              View More Styles <ArrowRight size={16} />
            </button>
            <div className="flex gap-2">
              <button 
                onClick={() => scroll('left')}
                className="w-12 h-12 border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-12 h-12 border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Style Cards Carousel */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto px-6 gap-4 no-scrollbar snap-x snap-mandatory"
        >
          <div className="min-w-[280px] h-[400px] relative overflow-hidden rounded-[2rem] snap-start group bg-zinc-900">
            <img 
              src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=600" 
              className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110" 
              alt="Adult Haircut Fade"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-8">
              <p className="text-xs font-black uppercase tracking-widest text-white mb-1">Adult Haircut • Fade</p>
              <p className="text-4xl font-black text-white italic">R200</p>
            </div>
          </div>
          <div className="min-w-[280px] h-[400px] relative overflow-hidden rounded-[2rem] snap-start group bg-zinc-900">
            <img 
              src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=600" 
              className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110" 
              alt="Beard Shave Clipper"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-8">
              <p className="text-xs font-black uppercase tracking-widest text-white mb-1">Beard Shave • Clipper</p>
              <p className="text-4xl font-black text-white italic">R40</p>
            </div>
          </div>
          <div className="min-w-[280px] h-[400px] relative overflow-hidden rounded-[2rem] snap-start group bg-zinc-900">
            <img 
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600" 
              className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110" 
              alt="The Scholar"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-8">
              <p className="text-xs font-black uppercase tracking-widest text-white mb-1">The Scholar • Student</p>
              <p className="text-4xl font-black text-white italic">R150</p>
            </div>
          </div>
        </div>
      </div>

      {/* Opening Times & Location Info */}
      <div className="px-6 grid grid-cols-2 gap-8 py-4">
        <div className="space-y-4">
          <h4 className="text-lg font-bold border-b border-zinc-900 pb-2">Opening Times</h4>
          <div className="space-y-2 text-[11px] font-medium text-zinc-400">
            {selectedLocation.hours.map(h => (
              <div key={h.day} className={`flex justify-between items-center ${h.status === 'current' ? 'text-white' : ''}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${h.status === 'active' || h.status === 'current' ? 'bg-green-500' : 'bg-zinc-700'}`} />
                  <span>{h.day.slice(0, 3)}</span>
                </div>
                <span>{h.time}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-lg font-bold border-b border-zinc-900 pb-2">The Spot</h4>
          <div className="text-[11px] text-zinc-400 space-y-4 leading-relaxed">
            <p>{selectedLocation.address}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white">
                <CheckCircle size={14} className="text-white" />
                <span className="font-bold uppercase text-[9px]">Instant Confirm</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <div className="w-3.5 h-3.5 flex items-center justify-center font-black text-[10px]">P</div>
                <span className="font-bold uppercase text-[9px]">Parking On-Site</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-6">
        <button 
          onClick={() => setStep(1)}
          className="w-full bg-white text-black py-5 rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all active:scale-95"
        >
          Book an Appointment
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );

  const renderServiceMenu = () => {
    const categories = [
      { name: 'Hair', services: SERVICES.filter(s => ['scholar', 'fade', 'buzz'].includes(s.id)) },
      { name: 'Beard', services: SERVICES.filter(s => s.id === 'beard') },
      { name: 'Combo', services: SERVICES.filter(s => s.id === 'full') }
    ];

    return (
      <div className="space-y-8 pb-10">
        {/* Sub Header */}
        <div className="bg-[#b32b2b] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-4 left-4">
            <button onClick={() => setStep(0)} className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <ChevronLeft size={20} />
            </button>
          </div>
          <div className="w-16 h-16 bg-[#b2c2ae] mb-4"></div>
          <h2 className="text-3xl font-brand italic uppercase tracking-tighter">{selectedLocation.name}</h2>
          <div className="flex items-center gap-2 text-[10px] font-bold text-yellow-400 mt-1 uppercase">
            <MapPin size={10} />
            <span>Glenwood & Durban North</span>
          </div>
        </div>

        {/* Menu Sections */}
        {categories.map(cat => (
          <div key={cat.name} className="px-6 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-8 bg-yellow-400"></div>
              <h3 className="text-3xl font-brand italic uppercase">{cat.name}</h3>
            </div>
            <div className="space-y-4">
              {cat.services.map(s => (
                <div key={s.id} className="bg-zinc-900/50 p-6 rounded-none border border-zinc-900 group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-black uppercase tracking-widest">{s.name}</h4>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase mt-1">{s.duration} mins • {s.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-black uppercase text-zinc-500 block mb-1">From</span>
                      <span className="text-2xl font-black text-yellow-400 italic leading-none">R{s.price}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setSelectedService(s); setStep(2); }}
                    className={`w-full py-3 font-black uppercase text-xs tracking-widest transition-all ${s.id === 'full' ? 'bg-[#FFC107] text-black' : 'bg-white text-black hover:bg-zinc-200'}`}
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Shop Details Summary */}
        <div className="px-6">
          <div className="bg-zinc-900 p-8 space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest">Shop Details</h4>
            <div className="space-y-5">
              <div className="flex items-center gap-4 text-zinc-400">
                <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-black">
                  <CheckCircle size={14} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-4 text-zinc-400">
                <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-black">
                  <Smartphone size={14} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">Kid-friendly Atmosphere</span>
              </div>
              <div className="flex items-center gap-4 text-zinc-400">
                <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-black">
                  <MapPin size={14} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">Street & Private Parking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      {activeView === 'customer' ? (
        <>
          {step === 0 && renderLanding()}
          {step === 1 && renderServiceMenu()}
          {step === 2 && (
            <div className="p-6 space-y-8">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-zinc-500 uppercase text-[10px] font-black"><ChevronLeft size={16}/> Back to Menu</button>
              <h2 className="text-2xl font-brand italic uppercase text-center">Select Time</h2>
              <div className="bg-zinc-900 p-6">
                <TimeGrid 
                  selectedDate={selectedDate} 
                  selectedTime={selectedTime} 
                  onTimeSelect={(t) => { setSelectedTime(t); setStep(3); }}
                  bookings={bookings}
                />
              </div>
            </div>
          )}
          {step === 3 && selectedService && selectedTime && (
            <div className="p-6 space-y-8">
               <button onClick={() => setStep(2)} className="flex items-center gap-2 text-zinc-500 uppercase text-[10px] font-black"><ChevronLeft size={16}/> Back to Time</button>
               <BookingSummary 
                service={selectedService}
                time={selectedTime}
                date={selectedDate.toISOString().split('T')[0]}
                customerName={customerName}
                customerPhone={customerPhone}
                notes={notes}
                onNameChange={setCustomerName}
                onPhoneChange={setCustomerPhone}
                onNotesChange={setNotes}
                onConfirm={handleConfirm}
              />
            </div>
          )}
        </>
      ) : (
        <div className="p-6">
          <h2 className="text-3xl font-brand italic uppercase border-b border-zinc-900 pb-4 mb-6">Barber Login</h2>
          <div className="bg-zinc-900 p-8 text-center text-zinc-500 italic">Restricted portal for Nev's internal systems.</div>
        </div>
      )}
    </Layout>
  );
};

export default App;
