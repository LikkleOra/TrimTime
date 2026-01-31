
import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: 'scholar',
    name: 'THE SCHOLAR',
    price: 150,
    duration: 30,
    description: 'High schoolers & students'
  },
  {
    id: 'fade',
    name: 'THE FADE',
    price: 220,
    duration: 45,
    description: 'Skin fade or taper'
  },
  {
    id: 'buzz',
    name: 'BUZZ CUT',
    price: 130,
    duration: 20,
    description: 'One length all over'
  },
  {
    id: 'beard',
    name: 'THE BEARD',
    price: 110,
    duration: 30,
    description: 'Shape, trim & hot towel'
  },
  {
    id: 'full',
    name: 'THE FULL WORKS',
    price: 320,
    duration: 60,
    description: 'Haircut, Beard & Wash'
  }
];

export const WORKING_HOURS = {
  start: 7, 
  end: 17,  
  interval: 30 
};

export const BARBER_CONFIG = {
  name: 'Nev',
  phone: '27721234567',
  shopName: 'Nev the Barber',
  locations: [
    { 
      id: 'dn',
      name: 'Durban North', 
      address: '28 Mackeurtan Avenue, Durban North',
      hours: [
        { day: 'Monday', time: '07:00 - 12:00', status: 'active' },
        { day: 'Tuesday', time: '07:00 - 17:00', status: 'active' },
        { day: 'Wednesday', time: '07:00 - 17:00', status: 'active' },
        { day: 'Thursday', time: '07:00 - 17:00', status: 'active' },
        { day: 'Friday', time: '07:00 - 15:30', status: 'current' },
        { day: 'Saturday', time: '07:30 - 13:00', status: 'active' },
        { day: 'Sunday', time: 'CLOSED', status: 'closed' }
      ]
    },
    { 
      id: 'gw',
      name: 'Glenwood', 
      address: '123 Helen Joseph Rd, Glenwood',
      hours: [] // Assume similar
    }
  ]
};
