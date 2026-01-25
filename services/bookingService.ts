
import { Booking } from '../types';

const STORAGE_KEY = 'trimtime_bookings';

export const bookingService = {
  getBookings: (): Booking[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  addBooking: (booking: Booking): void => {
    const bookings = bookingService.getBookings();
    bookings.push(booking);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    // Dispatch custom event for real-time simulation in same browser
    window.dispatchEvent(new Event('storage'));
  },

  deleteBooking: (id: string): void => {
    const bookings = bookingService.getBookings();
    const updated = bookings.filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  }
};
