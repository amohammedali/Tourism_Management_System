export interface Destination {
  id: number;
  name: string;
  location: string;
  type: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  tags: string[];
}

export interface TourPackage {
  id: number;
  name: string;
  destination: string;
  duration: string;
  pricePerPerson: number;
  description: string;
}

export interface StoredUser {
  name: string;
  email: string;
  password: string;
}

export interface StoredBooking {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  travelers: number;
  requests?: string;
  tour: TourPackage;
  total: number;
  createdAt: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: 1,
    name: 'Santorini',
    location: 'Greece',
    type: 'Beach',
    price: 1299,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800',
    description: 'Iconic white-domed churches, volcanic beaches, and sunsets that paint the sky in gold and crimson.',
    tags: ['Top Pick', 'Beach']
  },
  {
    id: 2,
    name: 'Kyoto',
    location: 'Japan',
    type: 'Cultural',
    price: 989,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
    description: 'Ancient temples, bamboo forests, and geisha districts wrapped in quiet elegance and timeless tradition.',
    tags: ['Cultural']
  },
  {
    id: 3,
    name: 'Machu Picchu',
    location: 'Peru',
    type: 'Heritage',
    price: 1450,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&q=80&w=800',
    description: 'The legendary Incan citadel perched high in the Andes, shrouded in mist and ancient mystery.',
    tags: ['UNESCO', 'Heritage']
  },
  {
    id: 4,
    name: 'Bali',
    location: 'Indonesia',
    type: 'Beach',
    price: 750,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
    description: 'Terraced rice paddies, sacred temples, surf breaks, and a vibrant spirit that soothes the soul.',
    tags: ['Popular', 'Beach']
  },
  {
    id: 5,
    name: 'Patagonia',
    location: 'Argentina',
    type: 'Adventure',
    price: 1800,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1517230181600-d1019487f7c3?auto=format&fit=crop&q=80&w=800',
    description: 'Jagged peaks, turquoise lakes, and glaciers stretching to the horizon - the ultimate wilderness.',
    tags: ['Adventure']
  },
  {
    id: 6,
    name: 'Rajasthan',
    location: 'India',
    type: 'Heritage',
    price: 620,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
    description: 'Golden forts, desert dunes, vibrant bazaars, and the grand legacy of maharajas come alive here.',
    tags: ['Heritage', 'Cultural']
  },
  {
    id: 7,
    name: 'Amalfi Coast',
    location: 'Italy',
    type: 'Beach',
    price: 1150,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800',
    description: 'Clifftop villages, azure waters, lemon groves, and the most scenic coastal drive in Europe.',
    tags: ['Scenic', 'Beach']
  },
  {
    id: 8,
    name: 'Himalayas Trek',
    location: 'Nepal',
    type: 'Mountains',
    price: 990,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800',
    description: "Breathtaking high-altitude trails, Sherpa villages, and views of the world's tallest peaks.",
    tags: ['Trekking', 'Mountains']
  }
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 1,
    name: 'Classic Explorer',
    destination: 'Santorini, Greece',
    duration: '7 days',
    pricePerPerson: 1299,
    description: 'Guided island-hopping with accommodation and meals.'
  },
  {
    id: 2,
    name: 'Temple Trail',
    destination: 'Kyoto, Japan',
    duration: '5 days',
    pricePerPerson: 989,
    description: 'Immersive cultural walks through ancient Kyoto.'
  },
  {
    id: 3,
    name: 'Andean Discovery',
    destination: 'Machu Picchu, Peru',
    duration: '8 days',
    pricePerPerson: 1450,
    description: 'Expert-guided trek to the Inca citadel.'
  },
  {
    id: 4,
    name: 'Island Bliss',
    destination: 'Bali, Indonesia',
    duration: '6 days',
    pricePerPerson: 750,
    description: 'Beaches, temples, and Balinese spa retreats.'
  },
  {
    id: 5,
    name: 'Wild Patagonia',
    destination: 'Patagonia, Argentina',
    duration: '10 days',
    pricePerPerson: 1800,
    description: 'Wilderness camping and glacier trekking.'
  }
];

export const DEFAULT_USERS: StoredUser[] = [
  {
    name: 'Demo User',
    email: 'demo@wandervista.com',
    password: 'password123'
  }
];
