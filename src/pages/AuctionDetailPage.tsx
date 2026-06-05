import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuctions } from '@/hooks/useAuctions';
import { useAuth } from '@/hooks/useAuth';
import AuctionTimer from '@/components/common/AuctionTimer';
import { formatPrice } from '@/lib/utils';
import { ArrowLeft, Gavel, TrendingUp } from 'lucide-react';

export default function AuctionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { auctions, placeBid } = useAuctions();
  const { currentUser } = useAuth();
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const auction = auctions.find(a => a.id === id);

  if (!auction) {
    return (
      <div style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
        <h2>Auction not found</h2>
        <Link to="/auctions" style={{ color: 'var(--color-primary-light)' }}>Back to Auctions</Link>
      </div>
    );
  }

  const handleBid = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const amount = Number(bidAmount);
    if (!currentUser) {
      setError('Please sign in to place a bid.');
      return;
    }
    if (amount <= auction.currentBid) {
      setError(`Bid must be higher than ${formatPrice(auction.currentBid)}`);
      return;
    }
    placeBid(auction.id, amount, currentUser.id, currentUser.name);
    setSuccess(`Bid of ${formatPrice(amount)} placed successfully!`);
    setBidAmount('');
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
      <Link to="/auctions" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--color-text-muted)', marginBottom: 24 }}>
        <ArrowLeft size={16} /> Back to Auctions
      </Link>

      <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--color-text)', marginBottom: 8 }}>{auction.car.title}</h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 32 }}>{auction.car.year} · {auction.car.make} {auction.car.model}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <TrendingUp size={14} /> Current Bid
          </div>
          <div style={{ fontSize: 40, fontWeight: 900, color: 'var(--color-primary-light)' }}>{formatPrice(auction.currentBid)}</div>
          <div style={{ fontSize: 13, color: 'var(--color-text-muted)', marginTop: 4 }}>{auction.bids.length} bid{auction.bids.length !== 1 ? 's' : ''}</div>
        </div>

        {auction.status === 'active' && (
          <div style={{ background: 'rgba(230,57,70,0.1)', border: '1px solid rgba(230,57,70,0.3)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Time Remaining</div>
            <AuctionTimer endTime={auction.endTime} large />
          </div>
        )}
      </div>

      {auction.status === 'active' && (
        <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Gavel size={18} /> Place Your Bid
          </h2>
          <form onSubmit={handleBid} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input
              type="number"
              placeholder={`Min ${formatPrice(auction.currentBid + 1)}`}
              value={bidAmount}
              onChange={e => setBidAmount(e.target.value)}
              style={{ flex: 1, minWidth: 180, padding: '10px 14px', background: 'var(--color-bg-input)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', color: 'var(--color-text)', fontSize: 16 }}
            />
            <button type="submit" style={{ padding: '10px 28px', background: 'var(--color-primary)', color: 'var(--color-secondary)', fontWeight: 700, fontSize: 15, borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
              Place Bid
            </button>
          </form>
          {error && <p style={{ color: '#ff6b78', marginTop: 10, fontSize: 14 }}>{error}</p>}
          {success && <p style={{ color: 'var(--color-success)', marginTop: 10, fontSize: 14 }}>{success}</p>}
        </div>
      )}

      {auction.bids.length > 0 && (
        <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)', marginBottom: 16 }}>Bid History</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[...auction.bids].reverse().map((bid, i) => (
              <div key={bid.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: i === 0 ? 'rgba(184,134,11,0.1)' : 'transparent', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: 14, color: 'var(--color-text)' }}>{bid.bidderName}</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-primary-light)' }}>{formatPrice(bid.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
