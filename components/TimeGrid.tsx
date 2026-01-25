
import React from 'react';
import { WORKING_HOURS } from '../constants';
import { Booking } from '../types';

interface TimeGridProps {
  selectedDate: Date;
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
  bookings: Booking[];
}

const TimeGrid: React.FC<TimeGridProps> = ({ selectedDate, selectedTime, onTimeSelect, bookings }) => {
  const generateSlots = () => {
    const slots: string[] = [];
    const { start, end, interval } = WORKING_HOURS;
    
    for (let hour = start; hour < end; hour++) {
      for (let min = 0; min < 60; min += interval) {
        const h = hour.toString().padStart(2, '0');
        const m = min.toString().padStart(2, '0');
        slots.push(`${h}:${m}`);
      }
    }
    return slots;
  };

  const slots = generateSlots();
  const dateStr = selectedDate.toISOString().split('T')[0];

  return (
    <div className="grid grid-cols-3 gap-3">
      {slots.map((time) => {
        const isOccupied = bookings.some(b => b.date === dateStr && b.time === time);
        const isSelected = selectedTime === time;

        return (
          <button
            key={time}
            disabled={isOccupied}
            onClick={() => onTimeSelect(time)}
            className={`
              py-3 px-2 rounded-xl border text-sm font-semibold transition-all
              ${isOccupied 
                ? 'bg-zinc-900 border-zinc-800 text-zinc-600 cursor-not-allowed line-through' 
                : isSelected
                  ? 'bg-amber-500 border-amber-400 text-black ring-2 ring-amber-500/30 shadow-lg'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-amber-500/50'
              }
            `}
          >
            {time}
            {isOccupied && <span className="block text-[8px] mt-1 font-bold uppercase opacity-50">Booked</span>}
          </button>
        );
      })}
    </div>
  );
};

export default TimeGrid;
