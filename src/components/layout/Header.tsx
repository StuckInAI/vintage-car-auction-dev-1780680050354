import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User, Gavel, Car, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import VCCPLogo from '@/components/common/VCCPLogo';
import styles from './Header.module.css';
import clsx from 'clsx';

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link to="/" className={styles.logoLink}>
          <VCCPLogo size="small" />
        </Link>

        <nav className={clsx(styles.nav, menuOpen && styles.navOpen)}>
          <Link
            to="/listings"
            className={clsx(styles.navLink, isActive('/listings') && styles.navLinkActive)}
            onClick={() => setMenuOpen(false)}
          >
            <Car size={16} />
            Browse Cars
          </Link>
          <Link
            to="/sell"
            className={clsx(styles.navLink, isActive('/sell') && styles.navLinkActive)}
            onClick={() => setMenuOpen(false)}
          >
            List Your Car
          </Link>
          <Link
            to="/auctions"
            className={clsx(styles.navLink, isActive('/auctions') && styles.navLinkActive)}
            onClick={() => setMenuOpen(false)}
          >
            <Gavel size={16} />
            Live Auctions
          </Link>
        </nav>

        <div className={styles.headerActions}>
          {currentUser ? (
            <div className={styles.userMenu}>
              <button
                className={styles.userButton}
                onClick={() => setUserMenuOpen(v => !v)}
              >
                <User size={16} />
                <span>{currentUser.name.split(' ')[0]}</span>
                <ChevronDown size={14} />
              </button>
              {userMenuOpen && (
                <div className={styles.userDropdown}>
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>{currentUser.name}</span>
                    <span className={styles.userEmail}>{currentUser.email}</span>
                  </div>
                  <button className={styles.logoutBtn} onClick={handleLogout}>
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className={styles.loginBtn}>Sign In</Link>
              <Link to="/register" className={styles.registerBtn}>Join Free</Link>
            </>
          )}
          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
