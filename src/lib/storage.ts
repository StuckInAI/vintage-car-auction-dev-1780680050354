import { CarListing, AuctionListing, User } from '@/types';

const KEYS = {
  listings: 'vccp_listings',
  auctions: 'vccp_auctions',
  users: 'vccp_users',
  currentUser: 'vccp_current_user',
};

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage quota exceeded or unavailable
  }
}

// ── Listings ──────────────────────────────────────────────────────────────────

const SEED_LISTINGS: CarListing[] = [
  {
    id: 'listing-1',
    title: '1967 Ford Mustang Fastback',
    make: 'Ford',
    model: 'Mustang',
    year: 1967,
    price: 58000,
    mileage: 72400,
    condition: 'excellent',
    transmission: 'manual',
    fuelType: 'gasoline',
    bodyStyle: 'coupe',
    drivetrain: 'rwd',
    color: 'Candy Apple Red',
    location: 'Austin, TX',
    description: 'Numbers-matching 390 FE V8 with 4-speed Toploader. Restored to factory spec with modern disc brake upgrade. Documented history.',
    images: [],
    features: ['Power steering', 'Pony interior', 'Fold-down rear seat', 'Rally-Pac gauge cluster'],
    sellerId: 'user-seed',
    sellerName: 'Classic Auto Broker',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 'listing-2',
    title: '1969 Chevrolet Camaro Z/28',
    make: 'Chevrolet',
    model: 'Camaro',
    year: 1969,
    price: 89000,
    mileage: 44200,
    condition: 'excellent',
    transmission: 'manual',
    fuelType: 'gasoline',
    bodyStyle: 'coupe',
    drivetrain: 'rwd',
    color: 'Hugger Orange',
    location: 'Nashville, TN',
    description: 'Rare Z/28 with DZ 302 V8. Frame-off restoration completed 2021. NCRS documented. Correct Muncie 4-speed.',
    images: [],
    features: ['DZ 302 V8', 'Muncie 4-speed', 'Front disc brakes', 'Special instrumentation'],
    sellerId: 'user-seed',
    sellerName: 'Southern Classics',
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: 'listing-3',
    title: '1957 Chevrolet Bel Air',
    make: 'Chevrolet',
    model: 'Bel Air',
    year: 1957,
    price: 72000,
    mileage: 58900,
    condition: 'good',
    transmission: 'automatic',
    fuelType: 'gasoline',
    bodyStyle: 'sedan',
    drivetrain: 'rwd',
    color: 'Cascade Green / India Ivory',
    location: 'Scottsdale, AZ',
    description: 'Two-tone beauty with 283 V8 and Powerglide. New chrome throughout. Interior professionally re-done in period-correct vinyl.',
    images: [],
    features: ['283 V8', 'Powerglide auto', 'Full chrome restoration', 'Power windows'],
    sellerId: 'user-seed',
    sellerName: 'Desert Classic Cars',
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
  {
    id: 'listing-4',
    title: '1970 Dodge Challenger R/T',
    make: 'Dodge',
    model: 'Challenger',
    year: 1970,
    price: 115000,
    mileage: 31800,
    condition: 'excellent',
    transmission: 'manual',
    fuelType: 'gasoline',
    bodyStyle: 'coupe',
    drivetrain: 'rwd',
    color: 'Plum Crazy Purple',
    location: 'Detroit, MI',
    description: 'Matching numbers 440 Six Pack with Pistol Grip 4-speed. One of 1,640 produced in this color. Broadcast sheet present.',
    images: [],
    features: ['440 Six Pack', 'Pistol Grip 4-speed', 'Shaker hood', 'Dana 60 rear axle'],
    sellerId: 'user-seed',
    sellerName: 'Mopar Mike Motors',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'listing-5',
    title: '1965 Jaguar E-Type Series 1',
    make: 'Jaguar',
    model: 'E-Type',
    year: 1965,
    price: 145000,
    mileage: 48300,
    condition: 'excellent',
    transmission: 'manual',
    fuelType: 'gasoline',
    bodyStyle: 'roadster',
    drivetrain: 'rwd',
    color: 'Opalescent Silver Blue',
    location: 'San Francisco, CA',
    description: 'Matching numbers 4.2 litre inline-6. UK-delivered car imported 1967. Recent full mechanical restoration by Jaguar specialist.',
    images: [],
    features: ['4.2 litre inline-6', 'Close-ratio 4-speed', 'Disc brakes all round', 'Wire wheels'],
    sellerId: 'user-seed',
    sellerName: 'British Iron Imports',
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: 'listing-6',
    title: '1969 Plymouth Road Runner',
    make: 'Plymouth',
    model: 'Road Runner',
    year: 1969,
    price: 67500,
    mileage: 62100,
    condition: 'good',
    transmission: 'automatic',
    fuelType: 'gasoline',
    bodyStyle: 'coupe',
    drivetrain: 'rwd',
    color: 'B5 Blue',
    location: 'Charlotte, NC',
    description: '383 Magnum V8 with TorqueFlite automatic. Correct Beep-Beeep horn. Numbers matching with build sheet. Recent full paint correction.',
    images: [],
    features: ['383 Magnum V8', 'TorqueFlite auto', 'Dana 60 Sure-Grip', 'Rallye instrument cluster'],
    sellerId: 'user-seed',
    sellerName: 'Carolina Muscle Cars',
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
  },
];

export function getListings(): CarListing[] {
  const stored = readJSON<CarListing[]>(KEYS.listings, []);
  if (stored.length === 0) {
    writeJSON(KEYS.listings, SEED_LISTINGS);
    return SEED_LISTINGS;
  }
  return stored;
}

export function saveListings(listings: CarListing[]): void {
  writeJSON(KEYS.listings, listings);
}

// ── Auctions ──────────────────────────────────────────────────────────────────

const SEED_AUCTIONS: AuctionListing[] = [
  {
    id: 'auction-1',
    car: {
      id: 'listing-1',
      title: '1967 Ford Mustang Fastback',
      make: 'Ford',
      model: 'Mustang',
      year: 1967,
      price: 58000,
      mileage: 72400,
      condition: 'excellent',
      transmission: 'manual',
      fuelType: 'gasoline',
      bodyStyle: 'coupe',
      drivetrain: 'rwd',
      color: 'Candy Apple Red',
      location: 'Austin, TX',
      description: 'Numbers-matching 390 FE V8.',
      images: [],
      features: [],
      sellerId: 'user-seed',
      sellerName: 'Classic Auto Broker',
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
    startingBid: 35000,
    currentBid: 47500,
    reservePrice: 55000,
    startTime: new Date(Date.now() - 86400000).toISOString(),
    endTime: new Date(Date.now() + 6 * 3600000).toISOString(),
    status: 'active',
    bids: [
      { id: 'bid-1', auctionId: 'auction-1', bidderId: 'user-a', bidderName: 'James H.', amount: 40000, createdAt: new Date(Date.now() - 3600000).toISOString() },
      { id: 'bid-2', auctionId: 'auction-1', bidderId: 'user-b', bidderName: 'Maria C.', amount: 45000, createdAt: new Date(Date.now() - 1800000).toISOString() },
      { id: 'bid-3', auctionId: 'auction-1', bidderId: 'user-a', bidderName: 'James H.', amount: 47500, createdAt: new Date(Date.now() - 600000).toISOString() },
    ],
  },
  {
    id: 'auction-2',
    car: {
      id: 'listing-4',
      title: '1970 Dodge Challenger R/T',
      make: 'Dodge',
      model: 'Challenger',
      year: 1970,
      price: 115000,
      mileage: 31800,
      condition: 'excellent',
      transmission: 'manual',
      fuelType: 'gasoline',
      bodyStyle: 'coupe',
      drivetrain: 'rwd',
      color: 'Plum Crazy Purple',
      location: 'Detroit, MI',
      description: 'Matching numbers 440 Six Pack.',
      images: [],
      features: [],
      sellerId: 'user-seed',
      sellerName: 'Mopar Mike Motors',
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
    startingBid: 75000,
    currentBid: 92000,
    startTime: new Date(Date.now() - 2 * 86400000).toISOString(),
    endTime: new Date(Date.now() + 14 * 3600000).toISOString(),
    status: 'active',
    bids: [
      { id: 'bid-4', auctionId: 'auction-2', bidderId: 'user-c', bidderName: 'Robert P.', amount: 80000, createdAt: new Date(Date.now() - 5 * 3600000).toISOString() },
      { id: 'bid-5', auctionId: 'auction-2', bidderId: 'user-d', bidderName: 'Susan K.', amount: 92000, createdAt: new Date(Date.now() - 2 * 3600000).toISOString() },
    ],
  },
  {
    id: 'auction-3',
    car: {
      id: 'listing-5',
      title: '1965 Jaguar E-Type Series 1',
      make: 'Jaguar',
      model: 'E-Type',
      year: 1965,
      price: 145000,
      mileage: 48300,
      condition: 'excellent',
      transmission: 'manual',
      fuelType: 'gasoline',
      bodyStyle: 'roadster',
      drivetrain: 'rwd',
      color: 'Opalescent Silver Blue',
      location: 'San Francisco, CA',
      description: 'Matching numbers 4.2 litre inline-6.',
      images: [],
      features: [],
      sellerId: 'user-seed',
      sellerName: 'British Iron Imports',
      createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    },
    startingBid: 100000,
    currentBid: 100000,
    startTime: new Date(Date.now() + 2 * 86400000).toISOString(),
    endTime: new Date(Date.now() + 4 * 86400000).toISOString(),
    status: 'upcoming',
    bids: [],
  },
];

export function getAuctions(): AuctionListing[] {
  const stored = readJSON<AuctionListing[]>(KEYS.auctions, []);
  if (stored.length === 0) {
    writeJSON(KEYS.auctions, SEED_AUCTIONS);
    return SEED_AUCTIONS;
  }
  return stored;
}

export function saveAuctions(auctions: AuctionListing[]): void {
  writeJSON(KEYS.auctions, auctions);
}

// ── Users ─────────────────────────────────────────────────────────────────────

export function getUsers(): User[] {
  return readJSON<User[]>(KEYS.users, []);
}

export function saveUsers(users: User[]): void {
  writeJSON(KEYS.users, users);
}

export function getCurrentUser(): User | null {
  return readJSON<User | null>(KEYS.currentUser, null);
}

export function saveCurrentUser(user: User): void {
  writeJSON(KEYS.currentUser, user);
}

export function clearCurrentUser(): void {
  try {
    localStorage.removeItem(KEYS.currentUser);
  } catch {
    // ignore
  }
}
