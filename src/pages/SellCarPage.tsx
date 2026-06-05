import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useListings } from '@/hooks/useListings';
import { MAKES } from '@/lib/utils';

export default function SellCarPage() {
  const { addListing } = useListings();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    condition: 'good',
    transmission: 'manual',
    fuelType: 'gasoline',
    bodyStyle: 'sedan',
    drivetrain: 'rwd',
    color: '',
    location: '',
    description: '',
  });

  const update = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = `${form.year} ${form.make} ${form.model}`;
    addListing({
      title,
      make: form.make,
      model: form.model,
      year: Number(form.year),
      price: Number(form.price),
      mileage: Number(form.mileage),
      condition: form.condition as any,
      transmission: form.transmission as any,
      fuelType: form.fuelType as any,
      bodyStyle: form.bodyStyle as any,
      drivetrain: form.drivetrain as any,
      color: form.color,
      location: form.location,
      description: form.description,
    });
    navigate('/listings');
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    background: 'var(--color-bg-input)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text)',
    fontSize: 14,
  } as React.CSSProperties;

  const labelStyle = { fontSize: 12, color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: 0.5, display: 'block', marginBottom: 6 };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--color-text)', marginBottom: 8 }}>List Your Car</h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 32 }}>Fill in the details below to list your vintage or classic car for sale.</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <label style={labelStyle}>Make *</label>
            <select style={inputStyle} value={form.make} onChange={e => update('make', e.target.value)} required>
              <option value="">Select Make</option>
              {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Model *</label>
            <input style={inputStyle} type="text" placeholder="e.g. Mustang" value={form.model} onChange={e => update('model', e.target.value)} required />
          </div>
          <div>
            <label style={labelStyle}>Year *</label>
            <input style={inputStyle} type="number" placeholder="e.g. 1967" value={form.year} onChange={e => update('year', e.target.value)} required min={1900} max={1999} />
          </div>
          <div>
            <label style={labelStyle}>Price (USD) *</label>
            <input style={inputStyle} type="number" placeholder="e.g. 45000" value={form.price} onChange={e => update('price', e.target.value)} required min={0} />
          </div>
          <div>
            <label style={labelStyle}>Mileage *</label>
            <input style={inputStyle} type="number" placeholder="e.g. 52000" value={form.mileage} onChange={e => update('mileage', e.target.value)} required min={0} />
          </div>
          <div>
            <label style={labelStyle}>Color</label>
            <input style={inputStyle} type="text" placeholder="e.g. Candy Apple Red" value={form.color} onChange={e => update('color', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Condition</label>
            <select style={inputStyle} value={form.condition} onChange={e => update('condition', e.target.value)}>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
              <option value="for-parts">For Parts</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Transmission</label>
            <select style={inputStyle} value={form.transmission} onChange={e => update('transmission', e.target.value)}>
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
              <option value="semi-automatic">Semi-Automatic</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Fuel Type</label>
            <select style={inputStyle} value={form.fuelType} onChange={e => update('fuelType', e.target.value)}>
              <option value="gasoline">Gasoline</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Body Style</label>
            <select style={inputStyle} value={form.bodyStyle} onChange={e => update('bodyStyle', e.target.value)}>
              <option value="sedan">Sedan</option>
              <option value="coupe">Coupe</option>
              <option value="convertible">Convertible</option>
              <option value="wagon">Wagon</option>
              <option value="suv">SUV</option>
              <option value="truck">Truck</option>
              <option value="roadster">Roadster</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Drivetrain</label>
            <select style={inputStyle} value={form.drivetrain} onChange={e => update('drivetrain', e.target.value)}>
              <option value="rwd">RWD</option>
              <option value="fwd">FWD</option>
              <option value="awd">AWD</option>
              <option value="4wd">4WD</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Location</label>
            <input style={inputStyle} type="text" placeholder="City, State" value={form.location} onChange={e => update('location', e.target.value)} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Description</label>
          <textarea
            style={{ ...inputStyle, minHeight: 120, resize: 'vertical' }}
            placeholder="Describe your car's history, features, and condition..."
            value={form.description}
            onChange={e => update('description', e.target.value)}
          />
        </div>
        <button type="submit" style={{ padding: '14px 32px', background: 'var(--color-primary)', color: 'var(--color-secondary)', fontWeight: 700, fontSize: 16, borderRadius: 'var(--radius-md)', cursor: 'pointer', alignSelf: 'flex-start' }}>
          List Car for Sale
        </button>
      </form>
    </div>
  );
}
