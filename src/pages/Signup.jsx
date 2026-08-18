import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Skeleton only — will call POST /api/auth/register once the REST API exists (M2).
    navigate('/');
  };

  return (
    <AuthLayout tagline="One board, every teammate's changes, synced the moment they happen.">
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>Create your account</h2>
      <p style={{ color: 'var(--slate)', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
        Set up your workspace in under a minute.
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Input
          label="Full name"
          name="name"
          placeholder="Tharushi Perera"
          value={form.name}
          onChange={handleChange}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="you@team.com"
          value={form.email}
          onChange={handleChange}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="At least 8 characters"
          value={form.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="accent" full>Create account</Button>
      </form>
      <p style={{ fontSize: '0.85rem', color: 'var(--slate)', marginTop: '1.5rem' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: 'var(--ink)', fontWeight: 700, textDecoration: 'underline' }}>
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
