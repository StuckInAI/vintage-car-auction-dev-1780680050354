import { useState, useEffect } from 'react';
import { CarListing } from '@/types';
import { getListings, saveListings } from '@/lib/storage';

export function useListings() {
  const [listings, setListings] = useState<CarListing[]>(() => getListings());

  useEffect(() => {
    saveListings(listings);
  }, [listings]);

  const addListing = (data: Omit<CarListing, 'id' | 'createdAt' | 'sellerId' | 'sellerName' | 'images' | 'features'>) => {
    const newListing: CarListing = {
      ...data,
      id: `listing-${Date.now()}`,
      createdAt: new Date().toISOString(),
      sellerId: 'user-local',
      sellerName: 'Local User',
      images: [],
      features: [],
    };
    setListings(prev => [newListing, ...prev]);
    return newListing;
  };

  return { listings, addListing };
}
