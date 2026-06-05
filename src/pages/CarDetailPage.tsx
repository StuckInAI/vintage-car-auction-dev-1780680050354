import { useParams, Link } from 'react-router-dom';
import { useListings } from '@/hooks/useListings';
import { formatPrice, formatMileage } from '@/lib/utils';
import { MapPin, Gauge, Fuel, Calendar, ArrowLeft } from 'lucide-react';

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { listings } = useListings();
  const car = listings.find(c => c.id === id);

  if (!car) {
    return (
      <div style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
        <h2>Car not found</h2>
        <Link to="/listings" style={{ color: 'var(--color-primary-light)' }}>Back to Listings</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px' }}>
      <Link to="/listings" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--color-text-muted)', marginBottom: 24 }}>
        <ArrowLeft size={16} /> Back to Listings
      </Link>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--color-text)', marginBottom: 8 }}>{car.title}</h1>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-text-muted)', fontSize: 14 }}><Calendar size={14}/>{car.year}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-text-muted)', fontSize: 14 }}><Gauge size={14}/>{formatMileage(car.mileage)}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-text-muted)', fontSize: 14 }}><Fuel size={14}/>{car.fuelType}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-text-muted)', fontSize: 14 }}><MapPin size={14}/>{car.location}</span>
      </div>
      <div style={{ fontSize: 40, fontWeight: 900, color: 'var(--color-primary-light)', marginBottom: 24 }}>{formatPrice(car.price)}</div>
      <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 24, marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)', marginBottom: 12 }}>Description</h2>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{car.description}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
        {[
          { label: 'Make', value: car.make },
          { label: 'Model', value: car.model },
          { label: 'Year', value: String(car.year) },
          { label: 'Condition', value: car.condition },
          { label: 'Transmission', value: car.transmission },
          { label: 'Body Style', value: car.bodyStyle },
          { label: 'Drivetrain', value: car.drivetrain },
          { label: 'Color', value: car.color },
        ].map(({ label, value }) => (
          <div key={label} style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '12px 16px' }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text)', textTransform: 'capitalize' }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
