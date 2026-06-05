import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import VCCPLogo from '@/components/common/VCCPLogo';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const ok = login(email, password);
    if (ok) {
      navigate('/');
    } else {
      setError('Invalid email or password.');
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
        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-text)', marginBottom: 8, textAlign: 'center' }}>Welcome Back</h1>
        <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: 28, fontSize: 14 }}>Sign in to your VCCP account</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, color: 'var(--color-text-muted)', display: 'block', marginBottom: 6 }}>Email</label>
            <input style={inputStyle} type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label style={{ fontSize: 13, color: 'var(--color-text-muted)', display: 'block', marginBottom: 6 }}>Password</label>
            <input style={inputStyle} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <p style={{ color: '#ff6b78', fontSize: 13 }}>{error}</p>}
          <button type="submit" style={{ padding: '12px', background: 'var(--color-primary)', color: 'var(--color-secondary)', fontWeight: 700, fontSize: 15, borderRadius: 'var(--radius-md)', cursor: 'pointer', marginTop: 4 }}>
            Sign In
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: 'var(--color-text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--color-primary-light)', fontWeight: 600 }}>Register free</Link>
        </p>
      </div>
    </div>
  );
}
