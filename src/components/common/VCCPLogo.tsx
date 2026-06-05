import styles from './VCCPLogo.module.css';
import clsx from 'clsx';

type VCCPLogoProps = {
  size?: 'small' | 'medium' | 'large';
  variant?: 'light' | 'dark';
};

export default function VCCPLogo({ size = 'medium', variant = 'light' }: VCCPLogoProps) {
  return (
    <div className={clsx(styles.logo, styles[size], styles[variant])}>
      <div className={styles.emblem}>
        <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.carSvg}>
          {/* Car body */}
          <rect x="5" y="22" width="50" height="12" rx="3" fill="currentColor" opacity="0.9"/>
          {/* Cabin */}
          <path d="M15 22 L20 12 L40 12 L48 22 Z" fill="currentColor"/>
          {/* Windshield */}
          <path d="M22 14 L24 22 L38 22 L40 14 Z" fill="rgba(0,0,0,0.4)"/>
          {/* Wheels */}
          <circle cx="15" cy="34" r="5" fill="#1a1a2e" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="15" cy="34" r="2" fill="currentColor" opacity="0.5"/>
          <circle cx="45" cy="34" r="5" fill="#1a1a2e" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="45" cy="34" r="2" fill="currentColor" opacity="0.5"/>
          {/* Headlight */}
          <ellipse cx="54" cy="25" rx="3" ry="2" fill="#fff" opacity="0.8"/>
          {/* Tail light */}
          <rect x="5" y="24" width="3" height="4" rx="1" fill="#e63946" opacity="0.9"/>
        </svg>
      </div>
      <div className={styles.textBlock}>
        <span className={styles.brand}>VCCP</span>
        {size !== 'small' && (
          <span className={styles.subtitle}>Vintage Classic Car Portal</span>
        )}
      </div>
    </div>
  );
}
