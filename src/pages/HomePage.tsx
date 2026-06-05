import { Link } from 'react-router-dom';
import { Gavel, Car, Shield, TrendingUp, Star, ArrowRight } from 'lucide-react';
import VCCPLogo from '@/components/common/VCCPLogo';
import CarCard from '@/components/common/CarCard';
import AuctionCard from '@/components/common/AuctionCard';
import { useListings } from '@/hooks/useListings';
import { useAuctions } from '@/hooks/useAuctions';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { listings } = useListings();
  const { auctions } = useAuctions();

  const featuredListings = listings.slice(0, 3);
  const activeAuctions = auctions.filter(a => a.status === 'active').slice(0, 2);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <VCCPLogo size="large" />
          <h1 className={styles.heroTitle}>
            The Premier Marketplace for<br />
            <span className={styles.heroAccent}>Vintage & Classic Automobiles</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Buy, Sell, and Auction the World's Finest Classic Cars.
            Trusted by Collectors Worldwide.
          </p>
          <div className={styles.heroActions}>
            <Link to="/listings" className={styles.heroBtnPrimary}>
              <Car size={18} />
              Browse Collection
            </Link>
            <Link to="/auctions" className={styles.heroBtnSecondary}>
              <Gavel size={18} />
              Live Auctions
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.statNum}>{listings.length}+</span>
              <span className={styles.statLabel}>Cars Listed</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.statNum}>{auctions.length}+</span>
              <span className={styles.statLabel}>Auctions</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.statNum}>100%</span>
              <span className={styles.statLabel}>Authentic</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}><Car size={28} /></div>
              <h3>Buy Classic Cars</h3>
              <p>Browse thousands of vintage and classic vehicles from top collectors and dealers.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}><Gavel size={28} /></div>
              <h3>Live Auctions</h3>
              <p>Participate in real-time auctions with live bidding, reserve prices, and countdown timers.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}><TrendingUp size={28} /></div>
              <h3>Sell Your Car</h3>
              <p>List your classic car with comprehensive details, photos, and full specifications.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}><Shield size={28} /></div>
              <h3>Trusted Platform</h3>
              <p>Authenticated sellers, verified listings, and secure transactions on every deal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      {featuredListings.length > 0 && (
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>Featured Listings</h2>
                <p className={styles.sectionSubtitle}>Handpicked classics from our collection</p>
              </div>
              <Link to="/listings" className={styles.viewAll}>
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className={styles.carGrid}>
              {featuredListings.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Active Auctions */}
      {activeAuctions.length > 0 && (
        <section className={styles.sectionDark}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>🔴 Live Auctions</h2>
                <p className={styles.sectionSubtitle}>Bid now — these auctions are ending soon</p>
              </div>
              <Link to="/auctions" className={styles.viewAll}>
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className={styles.auctionGrid}>
              {activeAuctions.map(auction => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Browse by Make */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Browse by Make</h2>
              <p className={styles.sectionSubtitle}>Find your dream car by manufacturer</p>
            </div>
          </div>
          <div className={styles.makeGrid}>
            {['Ford', 'Chevrolet', 'Dodge', 'Jaguar', 'Plymouth', 'Porsche', 'Ferrari', 'Mercedes-Benz'].map(make => (
              <Link
                key={make}
                to={`/listings?make=${make}`}
                className={styles.makeCard}
              >
                <div className={styles.makeCarIcon}>
                  <svg viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="25" width="70" height="18" rx="4" fill="currentColor" opacity="0.2"/>
                    <path d="M14 25 L22 12 L58 12 L68 25 Z" fill="currentColor" opacity="0.3"/>
                    <circle cx="20" cy="43" r="6" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
                    <circle cx="60" cy="43" r="6" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
                  </svg>
                </div>
                <span>{make}</span>
                <span className={styles.makeCount}>
                  {listings.filter(l => l.make === make).length} cars
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <Star size={32} className={styles.ctaIcon} />
            <h2>Ready to Sell Your Classic?</h2>
            <p>List your vehicle with VCCP and reach thousands of passionate collectors worldwide.</p>
            <div className={styles.ctaActions}>
              <Link to="/sell" className={styles.ctaBtnPrimary}>List for Sale</Link>
              <Link to="/auctions/create" className={styles.ctaBtnSecondary}>Create Auction</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
