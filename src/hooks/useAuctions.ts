import { useState, useEffect } from 'react';
import { AuctionListing, Bid } from '@/types';
import { getAuctions, saveAuctions } from '@/lib/storage';

export function useAuctions() {
  const [auctions, setAuctions] = useState<AuctionListing[]>(() => getAuctions());

  useEffect(() => {
    saveAuctions(auctions);
  }, [auctions]);

  const addAuction = (data: Omit<AuctionListing, 'id'>) => {
    const newAuction: AuctionListing = {
      ...data,
      id: `auction-${Date.now()}`,
    };
    setAuctions(prev => [newAuction, ...prev]);
    return newAuction;
  };

  const placeBid = (auctionId: string, amount: number, bidderId: string, bidderName: string) => {
    const bid: Bid = {
      id: `bid-${Date.now()}`,
      auctionId,
      bidderId,
      bidderName,
      amount,
      createdAt: new Date().toISOString(),
    };
    setAuctions(prev =>
      prev.map(a =>
        a.id === auctionId
          ? { ...a, currentBid: amount, bids: [...a.bids, bid] }
          : a
      )
    );
  };

  return { auctions, addAuction, placeBid };
}
