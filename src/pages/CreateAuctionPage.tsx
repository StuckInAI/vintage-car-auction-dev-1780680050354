import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuctions } from '@/hooks/useAuctions';
import { useListings } from '@/hooks/useListings';
import { MAKES } from '@/lib/utils';

export default function CreateAuctionPage() {
  const { addAuction } = useAuctions();
  const { listings } = useListings();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    carId: '',
    make: '',
    model: '',
    year: '',
    startingBid: '',
    reservePrice: '',
    durationHours: '48',
  });

  const update = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const selectedCar = listings.find(l => l.id === form.carId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const endTime = new Date(now.getTime() + Number(form.durationHours) * 60 * 60 * 1000).toISOString();
    const car = selectedCar || {
      id: '',
      title: `${form.year} ${form.make} ${form.model}`,
      make: form.make,
      model: form.model,
      year: Number(form.year),
    };
    addAuction({
      car: car as any,
      startingBid: Number(form.startingBid),
      currentBid: Number(form.startingBid),
      reservePrice: form.reservePrice ? Number(form.reservePrice) : undefined,
      startTime: now.toISOString(),
      endTime,
      status: 'active',
      bids: [],
    });
    navigate('/auctions');
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
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--color-text)', marginBottom: 8 }}>Create Auction</h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 32 }}>Set up a timed auction for your classic car.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {listings.length > 0 && (
          <div>
            <label style={labelStyle}>Select from your listings (optional)</label>
            <select style={inputStyle} value={form.carId} onChange={e => update('carId', e.target.value)}>
              <option value="">— Enter car details manually —</option>
              {listings.map(l => <option key={l.id} value={l.id}>{l.title}</option>)}
            </select>
          </div>
        )}

        {!selectedCar && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Make *</label>
              <select style={inputStyle} value={form.make} onChange={e => update('make', e.target.value)} required={!selectedCar}>
                <option value="">Select Make</option>
                {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Model *</label>
              <input style={inputStyle} type="text" placeholder="e.g. Mustang" value={form.model} onChange={e => update('model', e.target.value)} required={!selectedCar} />
            </div>
            <div>
              <label style={labelStyle}>Year *</label>
              <input style={inputStyle} type="number" placeholder="e.g. 1967" value={form.year} onChange={e => update('year', e.target.value)} required={!selectedCar} min={1900} max={1999} />
            </div>
          </div>
        )}

        {selectedCar && (
          <div style={{ padding: '12px 16px', background: 'rgba(184,134,11,0.1)', border: '1px solid rgba(184,134,11,0.3)', borderRadius: 'var(--radius-md)', color: 'var(--color-primary-light)' }}>
            Selected: <strong>{selectedCar.title}</strong>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={labelStyle}>Starting Bid (USD) *</label>
            <input style={inputStyle} type="number" placeholder="e.g. 5000" value={form.startingBid} onChange={e => update('startingBid', e.target.value)} required min={1} />
          </div>
          <div>
            <label style={labelStyle}>Reserve Price (optional)</label>
            <input style={inputStyle} type="number" placeholder="e.g. 25000" value={form.reservePrice} onChange={e => update('reservePrice', e.target.value)} min={1} />
          </div>
          <div>
            <label style={labelStyle}>Duration (hours) *</label>
            <select style={inputStyle} value={form.durationHours} onChange={e => update('durationHours', e.target.value)}>
              <option value="1">1 hour</option>
              <option value="6">6 hours</option>
              <option value="12">12 hours</option>
              <option value="24">24 hours</option>
              <option value="48">48 hours</option>
              <option value="72">72 hours</option>
              <option value="168">7 days</option>
            </select>
          </div>
        </div>

        <button type="submit" style={{ padding: '14px 32px', background: 'var(--color-primary)', color: 'var(--color-secondary)', fontWeight: 700, fontSize: 16, borderRadius: 'var(--radius-md)', cursor: 'pointer', alignSelf: 'flex-start' }}>
          Launch Auction
        </button>
      </form>
    </div>
  );
}
