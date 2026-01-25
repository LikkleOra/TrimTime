
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import TimeGrid from './components/TimeGrid';
import BookingSummary from './components/BookingSummary';
import { SERVICES, BARBER_CONFIG } from './constants';
import { Service, Booking, ViewType } from './types';
import { bookingService } from './services/bookingService';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle, Trash2, Clock, MapPin } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('customer');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Service, 2: Time, 3: Details

  // Sync bookings from "DB"
  const refreshBookings = useCallback(() => {
    setBookings(bookingService.getBookings());
  }, []);

  useEffect(() => {
    refreshBookings();
    window.addEventListener('storage', refreshBookings);
    return () => window.removeEventListener('storage', refreshBookings);
  }, [refreshBookings]);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleConfirm = () => {
    if (!selectedService || !selectedTime || !customerName || !customerPhone) return;

    const dateStr = selectedDate.toISOString().split('T')[0];
    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      serviceId: selectedService.id,
      date: dateStr,
      time: selectedTime,
      customerName,
      customerPhone,
      notes,
      status: 'confirmed'
    };

    bookingService.addBooking(newBooking);
    
    // Generate WhatsApp Message
    const msg = `Hi ${BARBER_CONFIG.name}! I'd like to book a ${selectedService.name} on ${dateStr} at ${selectedTime}. 
Notes: ${notes || 'None'}. 
My name is ${customerName}. 
Looking forward to it!`;
    
    const whatsappUrl = `https://wa.me/${BARBER_CONFIG.phone}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');

    // Reset Flow
    alert('Booking confirmed! Redirecting to WhatsApp...');
    resetFlow();
  };

  const resetFlow = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedTime(null);
    setCustomerName('');
    setCustomerPhone('');
    setNotes('');
  };

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
    setSelectedTime(null);
  };

  const renderBarberView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Today's Lineup</h2>
        <span className="bg-zinc-900 text-zinc-400 px-3 py-1 rounded-full text-xs font-bold">
          {bookings.filter(b => b.date === new Date().toISOString().split('T')[0]).length} Appointments
        </span>
      </div>

      <div className="space-y-3">
        {bookings.length === 0 ? (
          <div className="text-center py-20 text-zinc-600 italic">No bookings found in the clipboard.</div>
        ) : (
          [...bookings].sort((a, b) => a.time.localeCompare(b.time)).map(booking => (
            <div key={booking.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-between group">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-amber-500 font-bold border border-zinc-700">
                  {booking.time}
                </div>
                <div>
                  <h4 className="font-bold text-white leading-tight">{booking.customerName}</h4>
                  <p className="text-xs text-zinc-500">{SERVICES.find(s => s.id === booking.serviceId)?.name}</p>
                </div>
              </div>
              <button 
                onClick={() => bookingService.deleteBooking(booking.id)}
                className="p-2 text-zinc-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderCustomerView = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="relative overflow-hidden rounded-3xl h-48 bg-zinc-900 mb-8 group">
              <img src="https://picsum.photos/seed/barber/800/400" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" alt="Barber shop" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent flex flex-col justify-end p-6">
                <h2 className="text-3xl font-extrabold text-white">Select Style</h2>
                <div className="flex items-center gap-2 text-zinc-400 text-xs mt-1">
                  <MapPin size={12} className="text-amber-500" />
                  <span>Downtown Studio, Level 2</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {SERVICES.map(service => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className="w-full p-5 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-between hover:border-amber-500/50 transition-all text-left active:scale-[0.99]"
                >
                  <div className="flex-1 pr-4">
                    <h4 className="text-lg font-bold text-white mb-1">{service.name}</h4>
                    <p className="text-xs text-zinc-500 line-clamp-1">{service.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-500 font-extrabold text-xl">${service.price}</p>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">{service.duration} MIN</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="flex items-center justify-between">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                <ChevronLeft size={20} />
                <span className="text-sm font-bold uppercase">Back</span>
              </button>
              <h2 className="text-xl font-bold">Pick a Time</h2>
              <div className="w-10"></div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-3xl shadow-xl">
              <div className="flex items-center justify-between mb-6 bg-zinc-950 p-3 rounded-2xl border border-zinc-800">
                <button onClick={() => changeDate(-1)} className="p-2 text-zinc-400 hover:text-amber-500"><ChevronLeft size={24} /></button>
                <div className="text-center">
                  <p className="text-amber-500 text-xs font-black uppercase tracking-widest">{selectedDate.toLocaleString('default', { month: 'long' })}</p>
                  <p className="text-xl font-extrabold text-white">{selectedDate.getDate()}</p>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase">{selectedDate.toLocaleString('default', { weekday: 'long' })}</p>
                </div>
                <button onClick={() => changeDate(1)} className="p-2 text-zinc-400 hover:text-amber-500"><ChevronRight size={24} /></button>
              </div>

              <TimeGrid 
                selectedDate={selectedDate} 
                selectedTime={selectedTime} 
                onTimeSelect={handleTimeSelect}
                bookings={bookings}
              />
            </div>
          </div>
        );
      case 3:
        return selectedService && selectedTime ? (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="flex items-center justify-between">
              <button onClick={() => setStep(2)} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                <ChevronLeft size={20} />
                <span className="text-sm font-bold uppercase">Back</span>
              </button>
              <h2 className="text-xl font-bold">Your Details</h2>
              <div className="w-10"></div>
            </div>

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
        ) : null;
    }
  };

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      {activeView === 'customer' ? renderCustomerView() : renderBarberView()}
    </Layout>
  );
};

export default App;
