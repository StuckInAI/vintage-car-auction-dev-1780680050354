import { Link } from 'react-router-dom';
import { MapPin, Gauge, Fuel, Calendar } from 'lucide-react';
import { CarListing } from '@/types';
import { formatPrice, formatMileage } from '@/lib/utils';
import styles from './CarCard.module.css';

type CarCardProps = {
  car: CarListing;
};

const PLACEHOLDER_COLORS: Record<string, string> = {
  'Ford': '#003087',
  'Chevrolet': '#CC0000',
  'Dodge': '#CC0000',
  'Jaguar': '#005A2B',
  'Plymouth': '#CC0000',
  'default': '#2a2a4a',
};

export default function CarCard({ car }: CarCardProps) {
  const bgColor = PLACEHOLDER_COLORS[car.make] || PLACEHOLDER_COLORS['default'];

  return (
    <Link to={`/listings/${car.id}`} className={styles.card}>
      <div className={styles.imageContainer} style={{ background: bgColor }}>
        <div className={styles.imagePlaceholder}>
          <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.carIcon}>
            <rect x="10" y="35" width="100" height="22" rx="4" fill="rgba(255,255,255,0.15)"/>
            <path d="M22 35 L32 18 L88 18 L100 35 Z" fill="rgba(255,255,255,0.2)"/>
            <path d="M36 20 L40 35 L84 35 L88 20 Z" fill="rgba(0,0,0,0.3)"/>
            <circle cx="28" cy="57" r="9" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
            <circle cx="28" cy="57" r="4" fill="rgba(255,255,255,0.3)"/>
            <circle cx="92" cy="57" r="9" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
            <circle cx="92" cy="57" r="4" fill="rgba(255,255,255,0.3)"/>
            <rect x="10" y="37" width="4" height="6" rx="1" fill="rgba(230,57,70,0.8)"/>
            <ellipse cx="108" cy="40" rx="5" ry="3" fill="rgba(255,255,255,0.7)"/>
          </svg>
          <div className={styles.carMakeBadge}>{car.make}</div>
        </div>
        <div className={styles.yearBadge}>{car.year}</div>
        <div className={styles.priceBadge}>{formatPrice(car.price)}</div>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.carTitle}>{car.title}</h3>
        <div className={styles.carMeta}>
          <span className={styles.metaItem}>
            <Calendar size={12} />
            {car.year}
          </span>
          <span className={styles.metaItem}>
            <Gauge size={12} />
            {formatMileage(car.mileage)}
          </span>
          <span className={styles.metaItem}>
            <Fuel size={12} />
            {car.fuelType}
          </span>
        </div>
        <div className={styles.cardDetails}>
          <span className={styles.detailTag}>{car.condition}</span>
          <span className={styles.detailTag}>{car.transmission}</span>
          <span className={styles.detailTag}>{car.bodyStyle}</span>
        </div>
        <div className={styles.cardFooter}>
          <span className={styles.location}>
            <MapPin size={12} />
            {car.location}
          </span>
        </div>
      </div>
    </Link>
  );
}
