import { Link } from 'react-router-dom';
import VCCPLogo from '@/components/common/VCCPLogo';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <VCCPLogo size="small" />
          <p className={styles.tagline}>The Premier Marketplace for Vintage & Classic Cars</p>
          <p className={styles.copy}>© {new Date().getFullYear()} VCCP — Vintage Classic Car Portal. All rights reserved.</p>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.footerCol}>
            <h4>Browse</h4>
            <Link to="/listings">All Listings</Link>
            <Link to="/listings?make=Ford">Ford</Link>
            <Link to="/listings?make=Chevrolet">Chevrolet</Link>
            <Link to="/listings?make=Dodge">Dodge</Link>
            <Link to="/listings?make=Jaguar">Jaguar</Link>
          </div>
          <div className={styles.footerCol}>
            <h4>Sell</h4>
            <Link to="/sell">List Your Car</Link>
            <Link to="/auctions/create">Create Auction</Link>
            <Link to="/auctions">Live Auctions</Link>
          </div>
          <div className={styles.footerCol}>
            <h4>Account</h4>
            <Link to="/login">Sign In</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
