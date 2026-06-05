export type FuelType = 'gasoline' | 'diesel' | 'electric' | 'hybrid' | 'other';
export type TransmissionType = 'automatic' | 'manual' | 'semi-automatic';
export type ConditionType = 'excellent' | 'good' | 'fair' | 'poor' | 'for-parts';
export type BodyStyle = 'sedan' | 'coupe' | 'convertible' | 'wagon' | 'suv' | 'truck' | 'van' | 'roadster' | 'other';
export type DrivetrainType = 'rwd' | 'fwd' | 'awd' | '4wd';
export type ColorType = string;

export interface CarListing {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  condition: ConditionType;
  bodyStyle: BodyStyle;
  drivetrain: DrivetrainType;
  exteriorColor: string;
  interiorColor: string;
  engineSize: string;
  horsepower: number;
  vin: string;
  description: string;
  features: string[];
  images: string[];
  location: string;
  sellerName: string;
  sellerPhone: string;
  sellerEmail: string;
  createdAt: string;
  isAuction: boolean;
}

export interface AuctionListing {
  id: string;
  carId: string;
  car: CarListing;
  sellerId: string;
  sellerName: string;
  startingBid: number;
  reservePrice: number;
  currentBid: number;
  highestBidderId: string;
  highestBidderName: string;
  bids: Bid[];
  startTime: string;
  endTime: string;
  durationHours: number;
  status: 'upcoming' | 'active' | 'ended' | 'sold' | 'reserve-not-met';
  createdAt: string;
}

export interface Bid {
  id: string;
  auctionId: string;
  bidderId: string;
  bidderName: string;
  amount: number;
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'both';
  createdAt: string;
}

export interface FilterState {
  make: string;
  model: string;
  yearMin: string;
  yearMax: string;
  priceMin: string;
  priceMax: string;
  mileageMax: string;
  fuelType: string;
  transmission: string;
  condition: string;
  bodyStyle: string;
  drivetrain: string;
  location: string;
  sortBy: string;
}
