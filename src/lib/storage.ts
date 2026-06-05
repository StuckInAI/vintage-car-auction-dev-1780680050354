import { CarListing, AuctionListing, User, Bid } from '@/types';

const KEYS = {
  LISTINGS: 'vccp_listings',
  AUCTIONS: 'vccp_auctions',
  USERS: 'vccp_users',
  CURRENT_USER: 'vccp_current_user',
};

export function getListings(): CarListing[] {
  try {
    const data = localStorage.getItem(KEYS.LISTINGS);
    return data ? JSON.parse(data) : getSampleListings();
  } catch {
    return getSampleListings();
  }
}

export function saveListings(listings: CarListing[]): void {
  localStorage.setItem(KEYS.LISTINGS, JSON.stringify(listings));
}

export function addListing(listing: CarListing): void {
  const listings = getListings();
  listings.unshift(listing);
  saveListings(listings);
}

export function getListingById(id: string): CarListing | null {
  const listings = getListings();
  return listings.find(l => l.id === id) || null;
}

export function getAuctions(): AuctionListing[] {
  try {
    const data = localStorage.getItem(KEYS.AUCTIONS);
    const auctions: AuctionListing[] = data ? JSON.parse(data) : getSampleAuctions();
    return auctions.map(a => ({
      ...a,
      status: computeAuctionStatus(a),
    }));
  } catch {
    return getSampleAuctions();
  }
}

function computeAuctionStatus(auction: AuctionListing): AuctionListing['status'] {
  const now = Date.now();
  const start = new Date(auction.startTime).getTime();
  const end = new Date(auction.endTime).getTime();
  if (now < start) return 'upcoming';
  if (now >= start && now < end) return 'active';
  if (now >= end) {
    if (auction.currentBid >= auction.reservePrice && auction.bids.length > 0) return 'sold';
    if (auction.bids.length > 0 && auction.currentBid < auction.reservePrice) return 'reserve-not-met';
    return 'ended';
  }
  return auction.status;
}

export function saveAuctions(auctions: AuctionListing[]): void {
  localStorage.setItem(KEYS.AUCTIONS, JSON.stringify(auctions));
}

export function addAuction(auction: AuctionListing): void {
  const auctions = getAuctions();
  auctions.unshift(auction);
  saveAuctions(auctions);
}

export function getAuctionById(id: string): AuctionListing | null {
  const auctions = getAuctions();
  return auctions.find(a => a.id === id) || null;
}

export function updateAuction(updated: AuctionListing): void {
  const auctions = getAuctions();
  const idx = auctions.findIndex(a => a.id === updated.id);
  if (idx !== -1) {
    auctions[idx] = { ...updated, status: computeAuctionStatus(updated) };
    saveAuctions(auctions);
  }
}

export function placeBid(auctionId: string, bid: Bid): AuctionListing | null {
  const auctions = getAuctions();
  const idx = auctions.findIndex(a => a.id === auctionId);
  if (idx === -1) return null;
  const auction = auctions[idx];
  if (bid.amount <= auction.currentBid) return null;
  auction.currentBid = bid.amount;
  auction.highestBidderId = bid.bidderId;
  auction.highestBidderName = bid.bidderName;
  auction.bids = [bid, ...auction.bids];
  auctions[idx] = auction;
  saveAuctions(auctions);
  return auction;
}

export function getUsers(): User[] {
  try {
    const data = localStorage.getItem(KEYS.USERS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveUsers(users: User[]): void {
  localStorage.setItem(KEYS.USERS, JSON.stringify(users));
}

export function registerUser(user: User, password: string): boolean {
  const users = getUsers();
  const existing = users.find(u => u.email === user.email);
  if (existing) return false;
  users.push(user);
  saveUsers(users);
  const creds = getCredentials();
  creds[user.email] = password;
  saveCredentials(creds);
  return true;
}

function getCredentials(): Record<string, string> {
  try {
    const data = localStorage.getItem('vccp_creds');
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveCredentials(creds: Record<string, string>): void {
  localStorage.setItem('vccp_creds', JSON.stringify(creds));
}

export function loginUser(email: string, password: string): User | null {
  const creds = getCredentials();
  if (creds[email] !== password) return null;
  const users = getUsers();
  return users.find(u => u.email === email) || null;
}

export function getCurrentUser(): User | null {
  try {
    const data = localStorage.getItem(KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(KEYS.CURRENT_USER);
  }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function getSampleListings(): CarListing[] {
  const listings: CarListing[] = [
    {
      id: 'sample1',
      title: '1967 Ford Mustang Fastback',
      make: 'Ford',
      model: 'Mustang',
      year: 1967,
      price: 65000,
      mileage: 82000,
      fuelType: 'gasoline',
      transmission: 'manual',
      condition: 'excellent',
      bodyStyle: 'coupe',
      drivetrain: 'rwd',
      exteriorColor: 'Highland Green',
      interiorColor: 'Black',
      engineSize: '390 V8',
      horsepower: 325,
      vin: '7R02S123456',
      description: 'Iconic 1967 Ford Mustang Fastback in stunning Highland Green. Numbers matching 390 V8 engine with 4-speed manual transmission. Full frame-off restoration completed in 2021.',
      features: ['Air Conditioning', 'Power Steering', 'Rally Pac Gauge Package', 'Pony Interior', 'Fold-Down Rear Seat'],
      images: [],
      location: 'Los Angeles, CA',
      sellerName: 'James Whitfield',
      sellerPhone: '(555) 234-5678',
      sellerEmail: 'james@vccp.com',
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      isAuction: false,
    },
    {
      id: 'sample2',
      title: '1969 Chevrolet Camaro Z/28',
      make: 'Chevrolet',
      model: 'Camaro',
      year: 1969,
      price: 89500,
      mileage: 55000,
      fuelType: 'gasoline',
      transmission: 'manual',
      condition: 'excellent',
      bodyStyle: 'coupe',
      drivetrain: 'rwd',
      exteriorColor: 'Fathom Green',
      interiorColor: 'Black',
      engineSize: '302 V8',
      horsepower: 290,
      vin: '124379N123456',
      description: 'Rare 1969 Chevrolet Camaro Z/28 in desirable Fathom Green. Original DZ 302 engine, Muncie 4-speed. Documented with Protect-O-Plate and original window sticker.',
      features: ['Front Disc Brakes', 'Rally Wheels', 'Sports Car Suspension', 'Rear Spoiler', 'Houndstooth Interior'],
      images: [],
      location: 'Chicago, IL',
      sellerName: 'Robert Donovan',
      sellerPhone: '(555) 345-6789',
      sellerEmail: 'robert@vccp.com',
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      isAuction: false,
    },
    {
      id: 'sample3',
      title: '1957 Chevrolet Bel Air',
      make: 'Chevrolet',
      model: 'Bel Air',
      year: 1957,
      price: 72000,
      mileage: 64000,
      fuelType: 'gasoline',
      transmission: 'automatic',
      condition: 'excellent',
      bodyStyle: 'sedan',
      drivetrain: 'rwd',
      exteriorColor: 'Onyx Black / India Ivory',
      interiorColor: 'Red and White',
      engineSize: '283 V8',
      horsepower: 220,
      vin: 'VC57B123456',
      description: 'Pristine 1957 Chevrolet Bel Air two-tone in classic black and ivory. Fuel-injected 283 V8 with Powerglide automatic. Absolutely stunning show quality restoration.',
      features: ['Fuel Injection', 'Continental Kit', 'Fender Skirts', 'Signal Seeking Radio', 'Power Windows', 'Air Conditioning'],
      images: [],
      location: 'Nashville, TN',
      sellerName: 'Mary Grace Thompson',
      sellerPhone: '(555) 456-7890',
      sellerEmail: 'mary@vccp.com',
      createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
      isAuction: false,
    },
    {
      id: 'sample4',
      title: '1970 Dodge Challenger R/T',
      make: 'Dodge',
      model: 'Challenger',
      year: 1970,
      price: 125000,
      mileage: 42000,
      fuelType: 'gasoline',
      transmission: 'manual',
      condition: 'excellent',
      bodyStyle: 'coupe',
      drivetrain: 'rwd',
      exteriorColor: 'Plum Crazy Purple',
      interiorColor: 'Black',
      engineSize: '440 Six Pack',
      horsepower: 390,
      vin: 'JS23U0B123456',
      description: 'One of the most desirable muscle cars ever built. 1970 Dodge Challenger R/T in iconic Plum Crazy Purple with 440 Six Pack engine. Numbers matching with documented history.',
      features: ['Six Pack Carburetion', 'Dana 60 Rear Axle', 'Pistol Grip Shifter', 'Elastomeric Bumpers', 'Shaker Hood Scoop'],
      images: [],
      location: 'Detroit, MI',
      sellerName: 'Carlos Reyes',
      sellerPhone: '(555) 567-8901',
      sellerEmail: 'carlos@vccp.com',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      isAuction: false,
    },
    {
      id: 'sample5',
      title: '1963 Jaguar E-Type Series 1',
      make: 'Jaguar',
      model: 'E-Type',
      year: 1963,
      price: 185000,
      mileage: 38000,
      fuelType: 'gasoline',
      transmission: 'manual',
      condition: 'excellent',
      bodyStyle: 'roadster',
      drivetrain: 'rwd',
      exteriorColor: 'British Racing Green',
      interiorColor: 'Tan',
      engineSize: '3.8L Inline 6',
      horsepower: 265,
      vin: '878901',
      description: 'Extraordinarily well-preserved 1963 Jaguar E-Type Series 1 roadster. Called the most beautiful car ever made by Enzo Ferrari himself. Original engine, matching numbers throughout.',
      features: ['Triple Weber Carburettors', 'Independent Rear Suspension', 'Disc Brakes All Around', 'Chrome Wire Wheels', 'Leather Interior'],
      images: [],
      location: 'New York, NY',
      sellerName: 'William Ashford',
      sellerPhone: '(555) 678-9012',
      sellerEmail: 'william@vccp.com',
      createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      isAuction: false,
    },
    {
      id: 'sample6',
      title: '1971 Plymouth Hemi Cuda',
      make: 'Plymouth',
      model: "Hemi 'Cuda",
      year: 1971,
      price: 2200000,
      mileage: 19000,
      fuelType: 'gasoline',
      transmission: 'manual',
      condition: 'excellent',
      bodyStyle: 'coupe',
      drivetrain: 'rwd',
      exteriorColor: 'Moulin Rouge',
      interiorColor: 'Black',
      engineSize: '426 Hemi',
      horsepower: 425,
      vin: 'BS23V1B123456',
      description: "Extremely rare 1971 Plymouth Hemi 'Cuda, one of only 108 built with the 426 Hemi engine. This is considered the holy grail of American muscle cars. Documented, numbers matching.",
      features: ['426 Hemi Engine', 'Pistol Grip 4-Speed', 'Rallye Instrument Cluster', 'Shaker Hood', 'Elastomeric Front Bumper'],
      images: [],
      location: 'Scottsdale, AZ',
      sellerName: 'VCCP Broker Services',
      sellerPhone: '(555) 789-0123',
      sellerEmail: 'broker@vccp.com',
      createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      isAuction: false,
    },
  ];
  saveListings(listings);
  return listings;
}

function getSampleAuctions(): AuctionListing[] {
  const listings = getListings();
  const car1 = listings.find(l => l.id === 'sample1') || listings[0];
  const car2 = listings.find(l => l.id === 'sample4') || listings[1];

  const now = Date.now();
  const auctions: AuctionListing[] = [
    {
      id: 'auction1',
      carId: car1.id,
      car: car1,
      sellerId: 'seller1',
      sellerName: car1.sellerName,
      startingBid: 45000,
      reservePrice: 60000,
      currentBid: 52500,
      highestBidderId: 'bidder1',
      highestBidderName: 'Anonymous Bidder',
      bids: [
        { id: 'bid1', auctionId: 'auction1', bidderId: 'bidder1', bidderName: 'Anonymous Bidder', amount: 52500, timestamp: new Date(now - 3600000).toISOString() },
        { id: 'bid2', auctionId: 'auction1', bidderId: 'bidder2', bidderName: 'Classic Car Fan', amount: 50000, timestamp: new Date(now - 7200000).toISOString() },
        { id: 'bid3', auctionId: 'auction1', bidderId: 'bidder1', bidderName: 'Anonymous Bidder', amount: 47000, timestamp: new Date(now - 10800000).toISOString() },
      ],
      startTime: new Date(now - 3600000 * 5).toISOString(),
      endTime: new Date(now + 3600000 * 7).toISOString(),
      durationHours: 12,
      status: 'active',
      createdAt: new Date(now - 3600000 * 6).toISOString(),
    },
    {
      id: 'auction2',
      carId: car2.id,
      car: car2,
      sellerId: 'seller2',
      sellerName: car2.sellerName,
      startingBid: 80000,
      reservePrice: 120000,
      currentBid: 95000,
      highestBidderId: 'bidder3',
      highestBidderName: 'MuscleCar Collector',
      bids: [
        { id: 'bid4', auctionId: 'auction2', bidderId: 'bidder3', bidderName: 'MuscleCar Collector', amount: 95000, timestamp: new Date(now - 1800000).toISOString() },
        { id: 'bid5', auctionId: 'auction2', bidderId: 'bidder4', bidderName: 'Vintage Auto', amount: 90000, timestamp: new Date(now - 3600000).toISOString() },
      ],
      startTime: new Date(now - 3600000 * 2).toISOString(),
      endTime: new Date(now + 3600000 * 22).toISOString(),
      durationHours: 24,
      status: 'active',
      createdAt: new Date(now - 3600000 * 3).toISOString(),
    },
  ];
  saveAuctions(auctions);
  return auctions;
}
