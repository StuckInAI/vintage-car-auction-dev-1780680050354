export type CarCondition = 'excellent' | 'good' | 'fair' | 'poor' | 'for-parts';
export type Transmission = 'manual' | 'automatic' | 'semi-automatic';
export type FuelType = 'gasoline' | 'diesel' | 'electric' | 'hybrid' | 'other';
export type BodyStyle = 'sedan' | 'coupe' | 'convertible' | 'wagon' | 'suv' | 'truck' | 'roadster' | 'other';
export type Drivetrain = 'rwd' | 'fwd' | 'awd' | '4wd';
export type AuctionStatus = 'active' | 'upcoming' | 'ended' | 'sold' | 'reserve-not-met';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface CarListing {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: CarCondition;
  transmission: Transmission;
  fuelType: FuelType;
  bodyStyle: BodyStyle;
  drivetrain: Drivetrain;
  color: string;
  location: string;
  description: string;
  images: string[];
  features: string[];
  sellerId: string;
  sellerName: string;
  createdAt: string;
}

export interface Bid {
  id: string;
  auctionId: string;
  bidderId: string;
  bidderName: string;
  amount: number;
  createdAt: string;
}

export interface AuctionListing {
  id: string;
  car: CarListing;
  startingBid: number;
  currentBid: number;
  reservePrice?: number;
  startTime: string;
  endTime: string;
  status: AuctionStatus;
  bids: Bid[];
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
