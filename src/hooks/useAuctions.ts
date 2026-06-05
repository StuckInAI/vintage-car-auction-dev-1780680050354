import { useState, useEffect, useCallback } from 'react';
import { AuctionListing, Bid } from '@/types';
import { getAuctions, addAuction, getAuctionById, placeBid, generateId } from '@/lib/storage';
import { getCurrentUser } from '@/lib/storage';

export function useAuctions() {
  const [auctions, setAuctions] = useState<AuctionListing[]>([]);

  useEffect(() => {
    setAuctions(getAuctions());
    const interval = setInterval(() => {
      setAuctions(getAuctions());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const refresh = useCallback(() => {
    setAuctions(getAuctions());
  }, []);

  const add = useCallback((auction: AuctionListing) => {
    addAuction(auction);
    setAuctions(getAuctions());
  }, []);

  const bid = useCallback((auctionId: string, amount: number): { success: boolean; message: string } => {
    const user = getCurrentUser();
    if (!user) return { success: false, message: 'You must be logged in to bid.' };
    const auction = getAuctionById(auctionId);
    if (!auction) return { success: false, message: 'Auction not found.' };
    if (auction.status !== 'active') return { success: false, message: 'This auction is not active.' };
    if (amount <= auction.currentBid) {
      return { success: false, message: `Bid must be greater than current bid of $${auction.currentBid.toLocaleString()}.` };
    }
    if (amount < auction.startingBid) {
      return { success: false, message: `Bid must be at least the starting bid of $${auction.startingBid.toLocaleString()}.` };
    }
    if (user.id === auction.sellerId) {
      return { success: false, message: 'You cannot bid on your own auction.' };
    }
    const newBid: Bid = {
      id: generateId(),
      auctionId,
      bidderId: user.id,
      bidderName: user.name,
      amount,
      timestamp: new Date().toISOString(),
    };
    const updated = placeBid(auctionId, newBid);
    if (updated) {
      setAuctions(getAuctions());
      return { success: true, message: 'Bid placed successfully!' };
    }
    return { success: false, message: 'Failed to place bid.' };
  }, []);

  return { auctions, refresh, add, bid };
}
