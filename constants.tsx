
import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: 'fade',
    name: 'Skin Fade',
    price: 35,
    duration: 45,
    description: 'Precision clipper work with smooth transition.'
  },
  {
    id: 'trim',
    name: 'Beard Trim & Shape',
    price: 20,
    duration: 20,
    description: 'Line up and conditioning for a sharp look.'
  },
  {
    id: 'full',
    name: 'Full Service',
    price: 55,
    duration: 75,
    description: 'Haircut, beard trim, and hot towel shave.'
  },
  {
    id: 'scissor',
    name: 'Classic Scissor Cut',
    price: 30,
    duration: 45,
    description: 'Traditional hand-crafted style.'
  }
];

export const WORKING_HOURS = {
  start: 9, // 9 AM
  end: 18,  // 6 PM
  interval: 30 // 30 min intervals
};

export const BARBER_CONFIG = {
  name: 'Alex the Barber',
  phone: '1234567890', // For WhatsApp
  shopName: 'TrimTime Studios'
};
