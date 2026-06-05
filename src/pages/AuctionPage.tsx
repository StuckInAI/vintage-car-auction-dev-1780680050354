import { Link } from 'react-router-dom';
import { useAuctions } from '@/hooks/useAuctions';
import AuctionCard from '@/components/common/AuctionCard';
import { Gavel, Plus } from 'lucide-react';

export default function AuctionPage() {
  const { auctions } = useAuctions();

  const active = auctions.filter(a => a.status === 'active');
  const upcoming = auctions.filter(a => a.status === 'upcoming');
  const ended = auctions.filter(a => a.status === 'ended' || a.status === 'sold' || a.status === 'reserve-not-met');

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--color-text)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Gavel size={28} style={{ color: 'var(--color-primary)' }} />
            Live Auctions
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Bid on rare vintage and classic automobiles</p>
        </div>
        <Link
          to="/auctions/create"
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px', background: 'var(--color-primary)', color: 'var(--color-secondary)', fontWeight: 700, borderRadius: 'var(--radius-md)', fontSize: 14 }}
        >
          <Plus size={16} /> Create Auction
        </Link>
      </div>

      {active.length > 0 && (
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#ff6b78', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            🔴 Live Now ({active.length})
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
            {active.map(a => <AuctionCard key={a.id} auction={a} />)}
          </div>
        </section>
      )}

      {upcoming.length > 0 && (
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-warning)', marginBottom: 16 }}>
            ⏳ Upcoming ({upcoming.length})
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
            {upcoming.map(a => <AuctionCard key={a.id} auction={a} />)}
          </div>
        </section>
      )}

      {ended.length > 0 && (
        <section>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 16 }}>
            Completed Auctions ({ended.length})
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
            {ended.map(a => <AuctionCard key={a.id} auction={a} />)}
          </div>
        </section>
      )}

      {auctions.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--color-text-muted)' }}>
          <Gavel size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
          <h2 style={{ marginBottom: 8 }}>No auctions yet</h2>
          <p>Be the first to create an auction!</p>
        </div>
      )}
    </div>
  );
}
