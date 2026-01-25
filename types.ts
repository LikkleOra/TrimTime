
export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  description: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  customerName: string;
  customerPhone: string;
  notes?: string;
  status: 'confirmed' | 'pending';
}

export interface TimeSlot {
  time: string;
  isBooked: boolean;
}

export type ViewType = 'customer' | 'barber';
