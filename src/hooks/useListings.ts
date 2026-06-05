import { useState, useEffect, useCallback } from 'react';
import { CarListing } from '@/types';
import { getListings, addListing } from '@/lib/storage';

export function useListings() {
  const [listings, setListings] = useState<CarListing[]>([]);

  useEffect(() => {
    setListings(getListings());
  }, []);

  const refresh = useCallback(() => {
    setListings(getListings());
  }, []);

  const add = useCallback((listing: CarListing) => {
    addListing(listing);
    setListings(getListings());
  }, []);

  return { listings, refresh, add };
}
