
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
              py-4 px-2 rounded-none border text-xs font-black transition-all uppercase tracking-widest
              ${isOccupied 
                ? 'bg-zinc-950 border-zinc-900 text-zinc-800 cursor-not-allowed line-through' 
                : isSelected
                  ? 'bg-[#FFC107] border-[#FFC107] text-black shadow-[0_0_15px_rgba(255,193,7,0.3)] scale-[1.05] z-10'
                  : 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-600'
              }
            `}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
};

export default TimeGrid;
