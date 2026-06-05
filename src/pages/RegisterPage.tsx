import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import VCCPLogo from '@/components/common/VCCPLogo';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    const ok = register(name, email, password);
    if (ok) {
      navigate('/');
    } else {
      setError('An account with this email already exists.');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    background: 'var(--color-bg-input)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text)',
    fontSize: 15,
    boxSizing: 'border-box',
  } as React.CSSProperties;

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 420, background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <VCCPLogo size="small" />
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-text)', marginBottom: 8, textAlign: 'center' }}>Create Account</h1>
        <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: 28, fontSize: 14 }}>Join the VCCP community today</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, color: 'var(--color-text-muted)', display: 'block', marginBottom: 6 }}>Full Name</label>
            <input style={inputStyle} type="text" placeholder="John Smith" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label style={{ fontSize: 13, color: 'var(--color-text-muted)', display: 'block', marginBottom: 6 }}>Email</label>
            <input style={inputStyle} type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label style={{ fontSize: 13, color: 'var(--color-text-muted)', display: 'block', marginBottom: 6 }}>Password</label>
            <input style={inputStyle} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div>
            <label style={{ fontSize: 13, color: 'var(--color-text-muted)', display: 'block', marginBottom: 6 }}>Confirm Password</label>
            <input style={inputStyle} type="password" placeholder="••••••••" value={confirm} onChange={e => setConfirm(e.target.value)} required />
          </div>
          {error && <p style={{ color: '#ff6b78', fontSize: 13 }}>{error}</p>}
          <button type="submit" style={{ padding: '12px', background: 'var(--color-primary)', color: 'var(--color-secondary)', fontWeight: 700, fontSize: 15, borderRadius: 'var(--radius-md)', cursor: 'pointer', marginTop: 4 }}>
            Create Account
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: 'var(--color-text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--color-primary-light)', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
