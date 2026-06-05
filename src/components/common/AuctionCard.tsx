import { Link } from 'react-router-dom';
import { Clock, TrendingUp, Gavel } from 'lucide-react';
import { AuctionListing } from '@/types';
import { formatPrice } from '@/lib/utils';
import AuctionTimer from './AuctionTimer';
import styles from './AuctionCard.module.css';
import clsx from 'clsx';

type AuctionCardProps = {
  auction: AuctionListing;
};

export default function AuctionCard({ auction }: AuctionCardProps) {
  const statusColors: Record<string, string> = {
    active: styles.statusActive,
    upcoming: styles.statusUpcoming,
    ended: styles.statusEnded,
    sold: styles.statusSold,
    'reserve-not-met': styles.statusReserveNotMet,
  };

  return (
    <Link to={`/auctions/${auction.id}`} className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.carInfo}>
          <h3 className={styles.carTitle}>{auction.car.title}</h3>
          <span className={styles.carYear}>{auction.car.year}</span>
        </div>
        <span className={clsx(styles.status, statusColors[auction.status] || styles.statusEnded)}>
          {auction.status === 'active' && '🔴 LIVE'}
          {auction.status === 'upcoming' && '⏳ UPCOMING'}
          {auction.status === 'ended' && 'ENDED'}
          {auction.status === 'sold' && '✅ SOLD'}
          {auction.status === 'reserve-not-met' && '⚠️ RESERVE NOT MET'}
        </span>
      </div>

      <div className={styles.bidSection}>
        <div className={styles.bidInfo}>
          <div className={styles.bidLabel}>
            <TrendingUp size={14} />
            Current Bid
          </div>
          <div className={styles.bidAmount}>{formatPrice(auction.currentBid)}</div>
        </div>
        <div className={styles.bidInfo}>
          <div className={styles.bidLabel}>
            <Gavel size={14} />
            Starting Bid
          </div>
          <div className={styles.bidAmountSmall}>{formatPrice(auction.startingBid)}</div>
        </div>
      </div>

      {auction.status === 'active' && (
        <div className={styles.timerSection}>
          <Clock size={14} />
          <AuctionTimer endTime={auction.endTime} compact />
        </div>
      )}

      <div className={styles.cardFooter}>
        <span className={styles.bidsCount}>{auction.bids.length} bid{auction.bids.length !== 1 ? 's' : ''}</span>
        {auction.status === 'active' && (
          <span className={styles.bidNow}>Bid Now →</span>
        )}
      </div>
    </Link>
  );
}
